import { capitalize, eitherArr, isStr } from '@keg-hub/jsutils'
import { throwNoMatchingStep } from './errors'
import { constants } from './constants'
const { REGEX_VARIANT, EXPRESSION_VARIANT } = constants

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
 * Finds a matching registered step definition from the passed in list and text
 * @todo - Update to parse expression and regex vars from the text param
 * @function
 * @private
 * @param {Array<Object>} list - Registered step definition
 * @param {string} text - Feature step text to compare with step definition text
 *
 * @returns {Object} Found matching step definition and matched arguments
 */
const findMatch = (list, text) => {
  return list.reduce((found, step) => {
    if (found.match || !step.match) return found

    let regex = step.match

    // If step variant is not regex
    // Then find all expressions in the match string
    // And convert them into into regex
    step.variant !== REGEX_VARIANT &&
      step.match.replace(/\s*{(.*?)}\s*/g, (...args) => {
        const [match] = args
        const [ start, end ] = regex.split(match.trim())
        regex = start + `\\s*(.*)\\s*` + end
      })

    const match = text.match(new RegExp(regex))

    // If NO match, just return found variable
    // If there is a match,
    // Get all matching items except for the first one
    // Which is the original string
    return !match ? found : { step, match: match.slice(1, match.length) }
  }, {})
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
    variant:
      match.toString().indexOf('/') === 0 ? REGEX_VARIANT : EXPRESSION_VARIANT,
  }

  step.name = sanitize(step)
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
      }`)()(this.Given, this.When, this.Then, this.When, this.When)

    // Merge the returned step with the initial definition
    return { ...step, ...definition }
  })
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
   * @todo - Add 'but' and 'and' types, which resolve to `when` and `then`
   * @memberof Steps
   * @Array
   * @private
   */
  types = [ 'given', 'when', 'then', 'and', 'but' ]

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
      const internalType =
        type === 'and' || type === 'but' ? `_when` : `_${type}`
      this[internalType] = []
      this[capitalize(type)] = (match, method) => {
        return self.register(internalType, type, match, method)
      }
    })
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
  resolve = (list, text) => {
    const { match, step } = findMatch(list, text)
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
   * @param {string|Array|Object} args[0] - Type of step definition to search when matching
   *                                        Or an array of parsed definition objects
   *                                        Or a single parsed definition object
   * @param {string} args[1] - Text used to matched with a features step
   * @param {function} args[2] - Function called when a features step text matches the text param
   *
   * @returns {void}
   */
  register = (...args) => {
    return isStr(args[0])
      ? registerFromCall.apply(this, args)
      : registerFromParse.apply(this, args)
  }
}
