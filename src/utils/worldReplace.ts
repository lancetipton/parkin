import type { TWorldConfig } from '../types'

import { constants } from '../constants'
import { get, isFunc, exists } from '@keg-hub/jsutils'
import { throwWorldReplace, throwAliasReplace } from './errors'
import {
  RX_WORLD_MATCH,
  RX_ALIAS_MATCH,
  RX_ALIAS_REPLACE,
  RX_WORLD_REPLACE,
} from '../matcher/patterns'
const {
  ALIAS_REF,
  WORLD_REF,
  ALIAS_WORLD_KEY,
  WORLD_AT_RUNTIME,
  ALIAS_REF_AT_RUNTIME,
} = constants

/**
 * Attempts to replace the matching content with location data from the world object
 * If the value is a function, the function is called
 * Otherwise the existing value ise used
 * If nothing exists at the location, the original match is returned
 *
 */
const attemptReplace = (
  match:string,
  world:TWorldConfig,
  location:string
) => {
  const replaceWith = get(world, location)
  return isFunc(replaceWith)
    ? replaceWith(world, location)
    : exists(replaceWith)
      ? replaceWith
      : match
}

/**
 * Finds all matching $$alias strings in the passed in text
 * Then replaces them with content from the world.$alias object
 * If the world.$alias value does not exist, the text is left as is
 * If there is text matching `$$:alias`, the `:` is removed
 * This allows variables in step definitions to be replaced at run time
 *
 */
export const aliasReplace = (text:string, world:TWorldConfig) => {
  // Track the current match, for extra information if the replace throws
  let currentMatch:string
  try {
    return text.replace(RX_ALIAS_MATCH, match => {
      currentMatch = match
      const cleaned = match.trim()

      // ALIAS_REF ( $$ ) requires adding an extra `$` when doing the replace
      // This is because the $ char has a special function in the string.replace method
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
      const replaced =
        cleaned.indexOf(ALIAS_REF_AT_RUNTIME) === 0
          ? cleaned.replace(ALIAS_REF_AT_RUNTIME, `$${ALIAS_REF}`)
          : attemptReplace(
            match,
            world,
            cleaned.replace(RX_ALIAS_REPLACE, `${ALIAS_WORLD_KEY}.`)
          )

      return replaced
    })
  }
  catch (err) {
    throwAliasReplace(err, currentMatch)
  }
}

/**
 * Finds all matching $world strings in the passed in text
 * Then replaces them with content from the world object
 * If the world value does not exist, the text is left as is
 * If there is text matching `$:world`, the `:` replaced as `$world`
 * This allows variables in step definitions to be replaced at run time
 *
 */
export const worldReplace = (text:string, world:TWorldConfig) => {
  // Track the current match, for extra information if the replace throws
  let currentMatch
  // Wrapped in a try/catch because
  // Errors are swallowed inside the text.replace function for some reason
  try {
    return text.replace(RX_WORLD_MATCH, match => {
      currentMatch = match
      const cleaned = match.trim()

      return cleaned.indexOf(WORLD_AT_RUNTIME) === 0
        ? cleaned.replace(WORLD_AT_RUNTIME, WORLD_REF)
        : attemptReplace(match, world, cleaned.replace(RX_WORLD_REPLACE, ''))
    })
  }
  catch (err) {
    throwWorldReplace(err, currentMatch)
  }
}

/**
 * Helper to call aliasReplace, and worldReplace in a single call
 *
 */
export const replaceWorld = (text:string, world:TWorldConfig) => {
  return worldReplace(aliasReplace(text, world), world)
}
