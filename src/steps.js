import { matcher } from './matcher'
import { constants } from './constants'
import { throwNoMatchingStep } from './errors'
import { capitalize, eitherArr, isStr } from '@keg-hub/jsutils'
const { REGEX_VARIANT, EXPRESSION_VARIANT, STEP_TYPES } = constants

/**
 * Sanitize the step definition text to be used as the name
 * @function
 * @private
 * @param {Object} step - Parsed step definition object
 *
 * @returns {string} Sanitized string version of the step definition text
 */
const sanitize = step => {
  let name = step.match.toString()
  if (name[0] === '^') name = name.substr(1)
  if (name.charAt(name.length - 1) === '$') name = name.slice(0, -1)

  return name.replace(/\(\?:([^\|]+)+\|+([^\)]+)?\)/, '$1')
}

/**
 * Builds the text content of a step definition call
 * @function
 * @private
 * @param {Object} step - Parsed step definition object
 * @param {string} step.type - Type of step definition this step belongs to
 * @param {string} step.match - Text used to match with a features step
 * @param {function} step.method - Called when a features step matches match property
 * @param {string} step.variant - Syntax used in the match property
 *
 * @returns {string} - Built text content of the step definition
 */
const getContent = step => {
  const match =
    step.variant === REGEX_VARIANT ? step.match.toString() : `"${step.match}"`

  return `${capitalize(step.type)}(${match}, ${step.method.toString()})`
}

/**
 * Registers a step definition by type
 * @function
 * @private
 * @param {string} internalType - Internal references to the step definition type
 * @param {string} type - Type of step definition to search when matching
 * @param {string} match - Text used to match with a features step
 * @param {function} method - Called when a features step matches match property
 *
 * @returns {void}
 */
const registerFromCall = function (internalType, type, match, method) {

  const step = {
    type,
    match,
    method,
    // TODO: add token parsing
    tokens: [],
    variant: match.toString().indexOf('/') === 0
      ? REGEX_VARIANT
      : EXPRESSION_VARIANT,
  }

  step.name = sanitize(step)
  // The name should always be unique, so we can use that as a consistent uuid
  step.uuid = step.name
  step.content = getContent(step)

  this[internalType].push(step)

  return step
}

/**
 * Registers a parsed step definition object
 * @function
 * @private
 * @param {Array|Object} definitions - Array of parsed definition objects
 *                                    Or a single parsed definition object
 *
 * @returns {void}
 */
const registerFromParse = function (definitions) {
  // Loop over the passed in definitions
  return eitherArr(definitions, [definitions]).map(definition => {
    // Create a dynamic function calling the definition.content
    // The definition.content should be a call to a global Given, When, Then method
    // Which is injected from the Steps class instance ( this )
    const step = Function(`return (Given, When, Then, And, But) => {
        return ${definition.content}
      }`)()(this.Given, this.When, this.Then, this.And, this.But)

    // Merge the returned step with the initial definition
    return { ...step, ...definition }
  })
}

/**
 * Join all step types together into a single array
 * @function
 * @private
 * @param {Object} instance - Steps calls instance
 *
 * @returns {Array} - Joined steps
 */
const joinAllSteps = (instance) => {
  return instance.types.reduce(
    (stepDefs, type) => stepDefs.concat(instance[`_${type}`]),
    []
  )
}

/**
 * Allows registering step definition matchs and functions
 * Which are used to map to steps of a parsed feature file
 * @class
 * @public
 * @param {Object} world - Holds configuration for the running test environment
 *
 * @returns {Object} Instance of the Steps class
 */
export class Steps {
  /**
   * Allowed step definition types
   * @memberof Steps
   * @type {Array}
   * @private
   */
  types = STEP_TYPES

  constructor(world) {
    this._world = world || {}
    const self = this
    /**
     * Creates helpers for registering step definitions by type
     * @memberof Steps
     * @function
     * @public
     * @param {string} match - Text used to matched with a features step
     * @param {function} method - Function called when a features step text matches the text param
     * @example
     * const steps = new Steps({})
     * steps.Given(`text`, ()=> {})
     *
     * @returns {void}
     */
    this.types.map(type => {
      const internalType = `_${type}`
      this[internalType] = []
      this[capitalize(type)] = (match, method) => {
        return self.register(internalType, type, match, method)
      }
    })
  }

  /**
   * Gets a list of all step definitions registered with the parkin instance
   * @memberof Steps
   * @function
   * @public
   *
   * @returns {Array} - List of all registered step definitions
   */
  list = () => {
    return joinAllSteps(this)
  }

  /**
   * Gets a list of all step definitions registered with the parkin instance
   * @memberof Steps
   * @function
   * @public
   *
   * @returns {Array} - List of all registered step definitions
   */
  typeList = () => {
    return this.types.reduce((stepDefs, type) => {
      const internalType = `_${type}`
      stepDefs[internalType] = [ ...this[internalType] ]
      return stepDefs
    }, {})
  }

  /**
   * Finds a matching step definition from the passed in list and text can calls it
   * This is the method the actually calls a step definition function
   * @memberof Steps
   * @function
   * @public
   * @param {Array<Object>} list - Group of registered step definition
   * @param {string} text - Feature step text to compare with step definition text
   *
   * @returns {*} - Response from the step definition function
   */
  resolve = text => {
    // Join all step types together when finding a match
    // Cucumber treats all step definition types as the same when matching to step text
    const list = this.getSteps()

    // Call the matcher to find a matching step definition
    const { match, step } = matcher(list, text)

    // If not step of match, then throw
    // No matching step definition exists
    if (!match || !step) return throwNoMatchingStep(text)

    // Add the steps world to the match arguments
    match.push(this._world)

    // Call the step function passing the match array as arguments
    return step.method(...match)
  }

  /**
   * Registers a step definition by type based on passed in args
   * @memberof Steps
   * @function
   * @public
   * @param {Array} args - All arguments passed to the method
   * @param {string|Array|Object} args.0 - Type of step definition to search when matching
   *                                        Or an array of parsed definition objects
   *                                        Or a single parsed definition object
   * @param {string} args.1 - Text used to matched with a features step
   * @param {function} args.2 - Function called when a features step text matches the text param
   *
   * @returns {void}
   */
  register = (...args) => {
    return isStr(args[0])
      ? registerFromCall.apply(this, args)
      : registerFromParse.apply(this, args)
  }

  /**
   * Clears out all registered step definitions for all types
   * @memberof Steps
   * @function
   * @public
   *
   * @returns {void}
   */
  clear = () => {
    this.types.map(type => (this[`_${type}`] = []))
  }
}
