import { Test } from './test'
import { globalTypes } from './utils'
import { resolveGlobalObj } from '../utils/globalScope'

/**
 * Creates a new instance of the Test class, and adds it's methods to the global scope
 * This allows accessing the methods directly, similar to how they're handled in other test frameworks
 */
const PKTest = new Test()
const globalObj = resolveGlobalObj()
Object.values(globalTypes).map(name => globalObj[name] = PKTest[name].bind(PKTest))

