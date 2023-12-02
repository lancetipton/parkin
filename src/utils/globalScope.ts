import type { TRequire, TModule, TJasmine } from '../types'


import { noOp } from '@keg-hub/jsutils/noOp'
import { emptyObj } from '@keg-hub/jsutils/emptyObj'
import { checkCall } from '@keg-hub/jsutils/checkCall'

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
 */
export const resolveJasmine = ():TJasmine =>
  hasJasmine ? checkCall(() => global.jasmine as unknown as TJasmine) : { getEnv: () => emptyObj, testPath: `` }

/**
 * Resolve the module object if it exists
 * @function
 * @export
 * @public
 *
 */
export const resolveModule = ():TModule =>
  hasModule ? checkCall(() => module) : { exports: {} }

/**
 * Resolve the require function if it exists
 * @function
 * @export
 * @public
 *
 */
export const resolveRequire = ():TRequire =>
  hasRequire ? checkCall(() => require) : noOp

/**
 * Resolve the global object based on if the window or global objects exit
 * @function
 * @export
 * @public
 *
 */
export const resolveGlobalObj = ():Record<any, any> => {
  try {
    return hasWindow
      ? checkCall(() => window)
      : hasGlobal
        ? checkCall(() => global)
        : emptyObj
  }
  catch (err) {
    return emptyObj
  }
}
