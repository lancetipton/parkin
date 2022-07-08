import { constants } from './constants'
import { isFunc, noPropArr, noOp } from '@keg-hub/jsutils'
import { throwInvalidHookType } from './utils/errors'

const { HOOK_TYPES } = constants

/**
 * Allows registering hook functions, which are then called when
 * the runner runs a feature
 * @class
 * @public
 * @returns {Object} Instance of the Hooks class
 */
export class Hooks {
  /**
   * Allowed hook types
   * @memberof Hooks
   * @type {Array}
   * @private
   */
  types = HOOK_TYPES

  /**
   * Parkin instance the hooks are tied to
   * @memberof Hooks
   * @type {Object}
   * @private
   */
  instance = undefined

  constructor(world, instance) {
    this._registeredHooks = {}
    this.instance = instance

    /**
     * Creates helpers for registering hooks
     * @memberof Hooks
     * @function
     * @public
     * @param {function} method - Function to be registered to the hook. They will be called when the runner runs a feature
     * @example
     * const hooks = new Hooks()
     * hooks.beforeAll(() => setupEnvironment())
     *
     * @returns {void}
     */
    this.types.map(type => {
      this[type] = clientHookFn => {
        if (!isFunc(clientHookFn)) return
        this._registeredHooks[type] = this._registeredHooks[type] || []
        this._registeredHooks[type].push(clientHookFn)
      }
    })
  }

  /**
   * @param {string} type
   *
   * @return {Function} A wrapper function that calls all the registered hooks in series
   */
  getRegistered = type => {
    const foundHooks = this.types.includes(type)
      ? this._registeredHooks[type] || noPropArr
      : throwInvalidHookType(HOOK_TYPES.join(', '), type)

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
