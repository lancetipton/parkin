import type {
  TStepDef,
  TStepMeta,
  TWorldConfig,
  TStepDefMethod,
} from './types'

import { matcher } from './matcher'
import { constants } from './constants'
import { throwNoMatchingStep } from './utils/errors'
import { EStepMethodType, EStepType } from './types'
import { capitalize, eitherArr, isStr, noOpObj } from '@keg-hub/jsutils'
import { sanitizeForId, sanitize, validateDefinition } from './utils/helpers'
import {
  resolveModule,
  resolveRequire,
  resolveGlobalObj,
} from './utils/globalScope'

const { REGEX_VARIANT, EXPRESSION_VARIANT, STEP_TYPES } = constants

type TRegisterArgs = [
  string|TStepDef[]|TStepDef,
  string,
  string,
  TStepDefMethod,
  TStepMeta|undefined
]
type TTempRegisterArgs = [
  match:string,
  method:TStepDefMethod,
  meta:TStepMeta
]

type TTempContainer = Record<EStepMethodType, TStepDef[]>

/**
 * Builds the text content of a step definition call
 * @function
 * @private
 *
 */
const getContent = (def:TStepDef) => {
  const match =
    def.variant === REGEX_VARIANT ? def.match.toString() : `"${def.match}"`

  return `${capitalize(def.type)}(${match}, ${def.method.toString()})`
}

/**
 * Registers a step definition by type
 * @function
 * @private
 *
 */
const registerFromCall = function (
  internalType:EStepType,
  type:EStepType,
  match:string,
  method:TStepDefMethod,
  meta:TStepMeta = noOpObj
) {
  const definition:Partial<TStepDef> = {
    type,
    meta,
    match,
    method,
    // TODO: add token parsing
    tokens: [],
    variant:
      match.toString().indexOf('/') === 0 ? REGEX_VARIANT : EXPRESSION_VARIANT,
  }

  definition.name = sanitize(definition as TStepDef)
  // The name should always be unique, so we can use that as a consistent uuid
  definition.uuid = sanitizeForId(`${type}-${definition.name}`)
  definition.content = getContent(definition as TStepDef)

  const definitions = this.list()
  const newDefinition = validateDefinition(definition as TStepDef, definitions)

  newDefinition && this[internalType].push(newDefinition)

  return newDefinition
}

/**
 * Helper method to wrap the default register method of a step definition
 * Allows capturing the definition when it's registered
 * Contains only newly registered definitions, NOT all definitions
 * @function
 * @private
 *
 */
const tempRegister = (
  parent:Steps,
  type:EStepMethodType,
  container:TTempContainer
) => {
  /**
   * Captures a registered step definition and adds it the the container object
   * @function
   * @internal
   *
   */
  return (...args:TTempRegisterArgs) => {
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
const registerFromParse = function (definitions:string|string[]) {
  // TRegisterArgs
  // Ensures a consistent index due to being an array
  const DEF_TYPES:EStepMethodType[] = this.types.map((type:EStepType) => capitalize(type))

  // Build a container for holding the newly added definitions
  // Looks like the object below
  // { Given: [], When: [], Then: [], But: [], And: [] }
  const container = DEF_TYPES.reduce((built:TTempContainer, type) => {
    built[type] = []
    return built
  }, {} as TTempContainer)

  // Loop over the passed in definitions
  eitherArr<string[]>(definitions, [definitions]).map(definition => {
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
 *
 */
const joinAllSteps = (instance:Steps):TStepDef[] => {
  return instance.types.reduce(
    (stepDefs, type:EStepType) => stepDefs.concat(instance[`_${type}`]),
    []
  )
}

/**
 * Allows registering step definition matchs and functions
 * Which are used to map to steps of a parsed feature file
 * @class
 * @public
 *
 */
export class Steps {

  private _world:TWorldConfig

  /**
   * Allowed step definition types
   * @memberof Steps
   * @type {Array}
   * @private
   */
  types:EStepType[] = STEP_TYPES


  constructor(world:TWorldConfig={ $alias: {} }) {
    this._world = world

    const self = this
    /**
     * Creates helpers for registering step definitions by type
     * @memberof Steps
     * @function
     * @public
     * @example
     * const steps = new Steps({})
     * steps.Given(`text`, ()=> {})
     *
     */
    this.types.map((type:EStepType) => {
      const internalType = `_${type}`
      this[internalType] = []
      this[capitalize(type)] = (match:string, method:TStepDefMethod, meta:TStepMeta) => {
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
   */
  typeList = ():Record<EStepType, TStepDef> => {
    return this.types.reduce((stepDefs, type) => {
      const internalType = `_${type}`
      stepDefs[internalType] = [...this[internalType]]
      return stepDefs
    }, {} as Record<EStepType, TStepDef>)
  }

  /**
   * Finds a matching step definition from the passed in text
   * Steps must be registered with this instance to be found
   * @memberof Steps
   * @function
   * @public
   *
   */
  match = (text:string) => {
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
   *
   */
  resolve = (text:string) => {
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
   *
   */
  register = (...args:TRegisterArgs) => {
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
   */
  clear = () => {
    this.types.map(type => (this[`_${type}`] = []))
  }
}
