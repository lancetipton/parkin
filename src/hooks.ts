import type { Parkin } from './parkin'
import type { TWorldConfig } from './types'

import { EHookType } from './types'
import { constants } from './constants'
import { noOp } from '@keg-hub/jsutils/noOp'
import { isFunc } from '@keg-hub/jsutils/isFunc'
import { throwInvalidHookType } from './utils/errors'
import { noPropArr } from '@keg-hub/jsutils/noPropArr'

const { HOOK_TYPES } = constants

type THookMethod = (parkin:Parkin) => void|Promise<void>
type TRegisteredHooks = Record<EHookType, THookMethod[]>
type THookFactory = (clientHookFn:THookMethod) => void

/**
 * Allows registering hook functions, which are then called when
 * the runner runs a feature
 * @class
 * @public
 *
 */
export class Hooks {

  afterAll:THookFactory=noOp
  beforeAll:THookFactory=noOp
  afterEach:THookFactory=noOp
  beforeEach:THookFactory=noOp

  /**
   * Allowed hook types
   * @memberof Hooks
   * @type {Array}
   * @private
   */
  private types:EHookType[] = HOOK_TYPES

  /**
   * Parkin instance the hooks are tied to
   * @memberof Hooks
   * @type {Object}
   * @private
   */
  instance:Parkin = undefined

  private  _registeredHooks:TRegisteredHooks = {} as TRegisteredHooks

  constructor(world:TWorldConfig, instance:Parkin) {
    this.instance = instance

    /**
     * Creates helpers for registering hooks
     * @memberof Hooks
     * @function
     * @public
     * @example
     * const hooks = new Hooks()
     * hooks.beforeAll(() => setupEnvironment())
     *
     */
    this.types.map((type:EHookType) => {
      this[type] = (clientHookFn:THookMethod) => {
        if (!isFunc(clientHookFn)) return
        this._registeredHooks[type] = this._registeredHooks[type] || []
        this._registeredHooks[type].push(clientHookFn)
      }
    })
  }

  /**
   * Gets the registered hook callback method based on the passed in type
   */
  getRegistered = (type:EHookType) => {
    const foundHooks = this.types.includes(type)
      ? this._registeredHooks[type] || noPropArr as THookMethod[]
      : throwInvalidHookType(HOOK_TYPES.join(', '), type)

    if(!foundHooks) return

    return foundHooks.length
      ? async () => {
          return foundHooks.reduce(async (toResolve, hook) => {
            await toResolve
            return await hook(this.instance)
          }, Promise.resolve())
        }
      : noOp
  }
}
