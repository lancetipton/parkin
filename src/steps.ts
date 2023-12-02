import type {
  TStepAst,
  TStepDef,
  TStepMeta,
  TStepDefs,
  TFindOpts,
  TMatchResp,
  TAddStepDefs,
  TWorldConfig,
  TStepDefMethod,
  TStepResolveOpts,
} from './types'

import { EStepType } from './types'
import { matcher } from './matcher'
import { constants } from './constants'
import { isArr } from '@keg-hub/jsutils/isArr'
import { isStr } from '@keg-hub/jsutils/isStr'
import { throwMissingDef } from './utils/errors'
import { replaceWorld } from './utils/worldReplace'
import { validateDefinition } from './utils/helpers'
import { ensureArr } from '@keg-hub/jsutils/ensureArr'
import { capitalize } from '@keg-hub/jsutils/capitalize'
import { buildDefinitionCtx } from './utils/buildDefinitionCtx'
import { joinAllDefs, registerFromParse, registerFromCall } from './definitions'

const { STEP_TYPES } = constants

type TRegisterArgs = [
  string|TStepDef[]|TStepDef,
  string,
  string,
  TStepDefMethod,
  TStepMeta|undefined
]

/**
 * Allows registering step definition matchs and functions
 * Which are used to map to steps of a parsed feature file
 * @class
 * @public
 *
 */
export class Steps {

  _world:TWorldConfig

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
    return joinAllDefs(this)
  }

  /**
   * Gets a list of all step definitions registered with the parkin instance
   * @memberof Steps
   * @function
   * @public
   *
   */
  typeList = ():TStepDefs => {
    return this.types.reduce((stepDefs, type) => {
      const internalType = `_${type}`
      stepDefs[type] = [...this[internalType]]
      return stepDefs
    }, {} as TStepDefs)
  }

  /**
   * Finds a matching step definition from the passed in text
   * Steps must be registered with this instance to be found
   * Includes helpers to replace the step text with content from the world
   * And adds the step definition ctx as the last argument passed to the matching def
   * @memberof Steps
   * @function
   * @public
   *
   */
  match = (
    text:string,
    step?:TStepAst,
    options?:TStepResolveOpts
  ) => {
    // Join all step types together when finding a match
    // Treat all step definition types as the same when matching to step text
    const list = this.list()

    // Call the matcher to find a matching step definition
    const found = matcher(
      list,
      replaceWorld(text, this._world, options?.worldReplace),
      this._world,
      options
    )

    // If no matching step definition exists, then return false
    if(!found.match || !found.definition) return false

    const ctx = buildDefinitionCtx(this._world, step, options)
    found.match.push(ctx)

    return found as TMatchResp
  }

  /**
   * Finds a matching step definition from the passed in text
   * Steps must be registered with this instance to be found
   * @memberof Steps
   * @function
   * @public
   *
   */
  find = (text:string, options?:TFindOpts) => {
    // Join all step types together when finding a match
    // Treat all step definition types as the same when matching to step text
    const list = this.list()

    // Call the matcher to find a matching step definition
    const found = matcher(
      list,
      text,
      this._world,
      options,
    )

    return !found.match || !found.definition
      ? false
      : found

  }

  /**
   * Finds a matching step definition from the passed in list and text can calls it
   * This is the method the actually calls a step definition function
   * @memberof Steps
   * @function
   * @public
   *
   */
  resolve = (text:string, step?:TStepAst, options?:TStepResolveOpts) => {
    // Try to find a step definition match to the passed in text
    const found = this.match(text, step, options)

    // If found, call the step function passing the match array as arguments
    // Otherwise throw a no match error
    return found
      ? found.definition.method(...found.match)
      : throwMissingDef(text)
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


  add = (...defs:TAddStepDefs[]) => {
    const definitions = this.list()
    defs.forEach(def => {
      const defsObj = isArr(def) || (def?.match && def?.uuid)
        ? ensureArr(def)
        : def

      Object.values(defsObj)
        .map(def => {
          if(!def.type) return console.warn(`A definition type is required when adding a definition`, def)

          const internalType = `_${def.type}`
          const newDefinition = validateDefinition(def, definitions)
          newDefinition && this[internalType].push(newDefinition)
        })
    })
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
