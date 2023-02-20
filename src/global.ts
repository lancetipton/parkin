import { Parkin, PKInstance } from './parkin'
import { resolveGlobalObj } from './utils/globalScope'

/**
 * Creates a new instance of the Parkin class, and adds it's methods to the global scope
 * This allows accessing the methods directly
 */
const setGlobals = (force?:boolean) => {
  const globalObj = resolveGlobalObj()
  const forceGlobal = force || process.env.PARKIN_TEST_GLOBALS_OVERRIDE

  if (!globalObj.Parkin || forceGlobal) globalObj.Parkin = Parkin
  if (!globalObj.PK || forceGlobal) globalObj.PK = PKInstance
}

/**
 * Call the method immediately on import
 */
setGlobals()

/**
 * Allow force overwriting the global methods from code
 *
 */
export const setParkinGlobals = (force:boolean = true) => setGlobals(force)
