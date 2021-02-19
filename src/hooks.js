import { isFunc, noOp } from '@keg-hub/jsutils'
import { constants } from './constants'

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

  constructor () {
    this._registeredHooks = {}

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
      this[type] = (clientHookFn) => {
        if (!isFunc(clientHookFn)) return
        this._registeredHooks[type] = clientHookFn
      }
    })
  }

  /**
   * @param {string} type 
   * @return {Function} the function registered to the hook type, or a noOp function by default
   */
  getRegistered = type => {
    if (!this.types.includes(type))
      throw new Error(
        `Expected client hook type to be one of ', ${HOOK_TYPES.join(', ')}.
         Found: ${type}`
      )
    
    return this._registeredHooks[type] || noOp
  }
}