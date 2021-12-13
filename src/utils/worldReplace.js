import { constants } from '../constants'
import { get, isFunc, exists } from '@keg-hub/jsutils'
import { RX_WORLD_REPLACE } from '../matcher/patterns'
const { WORLD_AT_RUNTIME } = constants

/**
 * Finds all matching $world strings in the passed in text
 * Then replaces them with content from the world object
 * If the world value does not exist, the text is left as is
 * If there is text matching `$::world`, the `::` replaced as `$world`
 * This allows variables in step definitions to be replaced at run time
 * 
 * @param {string} text - String to have `$world` text replaced
 * @param {Object} world - Parking global config object
 *
 * @returns {string} - text, with the `$world` text replaced
 */
export const worldReplace = (text, world) => {
  // Wrapped in a try/catch because errors are swolled inside the text.replace function
  try {
    const replace = text.replace(RX_WORLD_REPLACE, match => {
      const cleaned = match.trim()
  
      if(cleaned.indexOf(WORLD_AT_RUNTIME) === 0)
        return cleaned.replace(WORLD_AT_RUNTIME, `$`)
  
      const location = cleaned.replace(/^\$world\./, '')
      const replaceWith = get(world, location)
  
      return isFunc(replaceWith)
        ? replaceWith(world, path)
        : exists(replaceWith)
          ? replaceWith
          : match
    })

    return replace
  }
  catch(err){
    console.log(`Error running $world replace on text content`)
    console.error(err.stack)

    return text
  }
}

