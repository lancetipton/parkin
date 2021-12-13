import { checkCall, noOpObj, noOp } from '@keg-hub/jsutils'

/**
 * Helpers to ensure the right code is run in the right environments
 * @function
 * @export
 * @public
 *
 * @returns {Boolean} True if a global object exists
 */
export const hasWindow = Boolean(typeof window !== 'undefined')
export const hasGlobal = Boolean(typeof global !== 'undefined')
export const hasModule = Boolean(typeof module === 'object')
export const hasRequire = Boolean(typeof require === 'function')
export const hasJasmine = Boolean(
  hasGlobal && typeof global.jasmine !== 'undefined'
)

/**
 * Resolve the jasmine object if it exists
 * @function
 * @export
 * @public
 *
 * @returns {Object} Resolved jasmine object with the getEnv property
 */
export const resolveJasmine = () =>
  hasJasmine ? checkCall(() => global.jasmine) : { getEnv: () => noOpObj }

/**
 * Resolve the module object if it exists
 * @function
 * @export
 * @public
 *
 * @returns {Object} Resolved module object with the exports property
 */
export const resolveModule = () =>
  hasModule ? checkCall(() => module) : { exports: {} }

/**
 * Resolve the require function if it exists
 * @function
 * @export
 * @public
 *
 * @returns {Object} Resolved module object with the exports property
 */
export const resolveRequire = () =>
  hasRequire ? checkCall(() => require) : noOp

/**
 * Resolve the global object based on if the window or global objects exit
 * @function
 * @export
 * @public
 *
 * @returns {Object} Resolved global object (window||global|noOpObj)
 */
export const resolveGlobalObj = () => {
  try {
    return hasWindow
      ? checkCall(() => window)
      : hasGlobal
      ? checkCall(() => global)
      : noOpObj
  } catch (err) {
    return noOpObj
  }
}
