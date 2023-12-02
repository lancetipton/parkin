import type {
  TStepDef,
  TTempContainer,
} from '../types'


import { tempRegister } from './tempRegister'
import { EStepMethodType, EStepType } from '../types'
import { eitherArr } from '@keg-hub/jsutils/eitherArr'
import { capitalize } from '@keg-hub/jsutils/capitalize'
import {
  resolveModule,
  resolveRequire,
  resolveGlobalObj,
} from '../utils/globalScope'


/**
 * Registers a parsed step definition object
 * @function
 * @private
 * @param {Array|string} definitions - Array of strings or single string
 *                                     of the text content form a definition file
 *
 * @returns {void}
 */
export const registerFromParse = function (definitions:string|string[]) {
  // TRegisterArgs
  // Ensures a consistent index due to being an array
  const DEF_TYPES:EStepMethodType[] = this.types.map((type:EStepType) => capitalize(type))

  // Build a container for holding the newly added definitions
  // Looks like the object below
  // { Given: [], When: [], Then: [], But: [], And: [] }
  const container = DEF_TYPES.reduce((built:TTempContainer, type) => {
    built[type] = []
    return built
  }, {} as TTempContainer)

  // Loop over the passed in definitions
  eitherArr<string[]>(definitions, [definitions]).map(definition => {
    // Create a dynamic function calling the definition
    // The definition should be a call to a global Given, When, Then methods
    // Which is comes from the tempRegister method for each type
    Function(`return (global, require, module, ${DEF_TYPES.join(',')}) => {
          return (function(global) { ${definition} }).call(global, global)
        }`)()(
      // Pass in the global object so we can bind the dynamic function to it
      // Allows referencing values on the global scope directly
      // For example myGlobalFunction() instead of window.myGlobalFunction()
      resolveGlobalObj(),
      resolveRequire(),
      resolveModule(),
      // Call the tempRegister for each type,
      // Then spread the response as arguments to the dynamic function
      ...DEF_TYPES.map(type => tempRegister(this, type, container))
    )
  })

  // Return the container which should now hold all newly registered definitions ONLY
  return container
}
