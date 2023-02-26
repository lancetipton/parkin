import expect from 'expect'
import { ParkinTest } from './test'
import { globalTypes } from './utils'
import { resolveGlobalObj } from '../utils/globalScope'

/**
 * Creates a new instance of the Test class, and adds it's methods to the global scope
 * This allows accessing the methods directly, similar to how they're handled in other test frameworks
 */
const setGlobals = (force?:boolean) => {
  const PTE = new ParkinTest()
  const globalObj = resolveGlobalObj()
  const forceGlobal = force || process.env.PARKIN_TEST_GLOBALS_OVERRIDE

  if(!globalObj.expect || forceGlobal) globalObj.expect = expect

  if (!globalObj.PTE || forceGlobal) globalObj.PTE = PTE
  if (!globalObj.ParkinTest || forceGlobal) globalObj.ParkinTest = ParkinTest


  Object.values(globalTypes).map(
    name =>
      (!globalObj[name] || forceGlobal) &&
      (globalObj[name] = PTE[name].bind(PTE))
  )
}

/**
 * Call the method immediately on import
 */
setGlobals()

/**
 * Allow force overwriting the global methods from code
 *
 */
export const setParkinTestGlobals = (force = true) => setGlobals(force)
