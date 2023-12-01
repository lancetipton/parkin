// import expect from 'expect'
import expect from '@storybook/expect'
import { ParkinTest } from './test'
import { globalTypes } from './utils'
import { resolveGlobalObj } from '../utils/globalScope'

/**
 * Creates a new instance of the Test class, and adds it's methods to the global scope
 * This allows accessing the methods directly, similar to how they're handled in other test frameworks
 */
const setGlobals = (force?:boolean, cache:boolean=false) => {
  const PTE = new ParkinTest()
  const globalObj = resolveGlobalObj()
  const forceGlobal = force || process.env.PARKIN_TEST_GLOBALS_OVERRIDE

  if(!globalObj.expect || forceGlobal) globalObj.expect = expect

  if (!globalObj.PTE || forceGlobal) globalObj.PTE = PTE
  if (!globalObj.ParkinTest || forceGlobal) globalObj.ParkinTest = ParkinTest


  let globalCache = {}

  Object.values(globalTypes).map(name => {
    if(!globalObj[name] || forceGlobal){
      if(cache && globalObj[name]) globalCache[name] = globalObj[name]

      globalObj[name] = PTE[name].bind(PTE)
    }
  })

  if(!cache) return

  return () => {
    Object.values(globalTypes).map(name => {
      if(globalCache[name]) globalObj[name] = globalCache[name]
    })
  }
}

/**
 * Call the method immediately on import
 */
setGlobals()

/**
 * Allow force overwriting the global methods from code
 *
 */
export const setParkinTestGlobals = (force = true, cache:boolean=false) => setGlobals(force, cache)
