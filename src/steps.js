import { matcher } from './matcher'
import { constants } from './constants'
import { throwNoMatchingStep } from './utils/errors'
import { capitalize, eitherArr, isStr, noOpObj } from '@keg-hub/jsutils'
import {
  resolveGlobalObj,
  resolveModule,
  resolveRequire,
} from './utils/globalScope'
import { sanitizeForId, sanitize, validateDefinition } from './utils/helpers'

const { REGEX_VARIANT, EXPRESSION_VARIANT, STEP_TYPES } = constants

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
const registerFromCall = function (
  internalType,
  type,
  match,
  method,
  meta = noOpObj
) {
  const definition = {
    type,
    meta,
    match,
    method,
    // TODO: add token parsing
    tokens: [],
    variant:
      match.toString().indexOf('/') === 0 ? REGEX_VARIANT : EXPRESSION_VARIANT,
  }

  definition.name = sanitize(definition)
  // The name should always be unique, so we can use that as a consistent uuid
  definition.uuid = sanitizeForId(`${type}-${definition.name}`)
  definition.content = getContent(definition)

  const definitions = this.list()
  const newDefinition = validateDefinition(definition, definitions)

  newDefinition && this[internalType].push(newDefinition)

  return newDefinition
}

/**
 * Helper method to wrap the default register method of a step definition
 * Allows capturing the definition when it's registered
 * Contains only newly registered definitions, NOT all definitions
 * @function
 * @private
 * @param {Object} parent - Parent class to register the definitions to (Step class instance)
 * @param {string} type - Type of step definition to register
 * @param {Object} container - Holds the newly registered definitions
 *
 * @returns {function} - Method to register step definitions by type
 */
const tempRegister = (parent, type, container) => {
  /**
   * Captures a registered step definition and adds it the the container object
   * @function
   * @internal
   * @param {string} match - Text used to matched with a features step
   * @param {function} method - Called when a features step matches the text param
   * @param {Object} meta - Object describing the functionality of the step definition
   *
   * @returns {Object} newly registered definition model
   */
  return (...args) => {
    const definition = parent[type](...args)
    container[type].push(definition)

    return definition
  }
}

/**
 * Registers a parsed step definition object
 * @function
 * @private
 * @param {Array|string} definitions - Array of strings or single string
 *                                     of the text content form a definition file
 *
 * @returns {void}
 */
const registerFromParse = function (definitions) {
  // Ensures a consistent index due to being an array
  const DEF_TYPES = this.types.map(type => capitalize(type))

  // Build a container for holding the newly added definitions
  // Looks like the object below
  // { Given: [], When: [], Then: [], But: [], And: [] }
  const container = DEF_TYPES.reduce((built, type) => {
    built[type] = []
    return built
  }, {})

  // Loop over the passed in definitions
  eitherArr(definitions, [definitions]).map(definition => {
    // Create a dynamic function calling the definition
    // The definition should be a call to a global Given, When, Then methods
    // Which is comes from the tempRegister method for each type
    Function(`return (global, require, module, ${DEF_TYPES.join(',')}) => {
          return (function(global) { ${definition} }).call(global, global)
        }`)()(
      // Pass in the global object so we can bind the dynamic function to it
      // Allows referencing values on the global scope directly
      // For example myGlobalFunction() instead of window.myGlobalFunction()
      resolveGlobalObj(),
      resolveRequire(),
      resolveModule(),
      // Call the tempRegister for each type,
      // Then spread the response as arguments to the dynamic function
      ...DEF_TYPES.map(type => tempRegister(this, type, container))
    )
  })

  // Return the container which should now hold all newly registered definitions ONLY
  return container
}

/**
 * Join all step types together into a single array
 * @function
 * @private
 * @param {Object} instance - Steps calls instance
 *
 * @returns {Array} - Joined steps
 */
const joinAllSteps = instance => {
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
      this[capitalize(type)] = (match, method, meta) => {
        return self.register(internalType, type, match, method, meta)
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
      stepDefs[internalType] = [...this[internalType]]
      return stepDefs
    }, {})
  }

  /**
   * Finds a matching step definition from the passed in text
   * Steps must be registered with this instance to be found
   * @memberof Steps
   * @function
   * @public
   * @param {string} text - Feature step text to compare with definition match text
   *
   * @returns {Object} - Contains a match property as an array of arguments
   *                     And the definition property as the found registered definition
   */
  match = text => {
    // Join all step types together when finding a match
    // Cucumber treats all step definition types as the same when matching to step text
    const list = this.list()

    // Call the matcher to find a matching step definition
    const found = matcher(list, text, this._world)

    // If no matching step definition exists, then return false
    if (!found.match || !found.definition) return false

    // Add the Step instance's world to the match arguments
    // Always added as the last argument
    found.match.push(this._world)

    return found
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
    // Try to find a step definition match to the passed in text
    const found = this.match(text)

    // If found, call the step function passing the match array as arguments
    // Otherwise throw a no match error
    return found
      ? found.definition.method(...found.match)
      : throwNoMatchingStep(
        `Matching definition could not be found for step: "${text}"`
      )
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
