import { constants } from '../constants'
import { noOpObj } from '@keg-hub/jsutils'
import { matchRegex, getRegexParts } from './regex'
import { getParamTypes, registerParamType } from './paramTypes'
import { extractParameters, matchExpression } from './expression'

const { REGEX_VARIANT } = constants

/**
 * Class for accessing matcher methods and param types
 * <br/>Gives access to underlying matcher methods to be called directly
 */
export class Matcher {
  find = matcher
  regex = matchRegex
  parts = getRegexParts
  types = getParamTypes
  extract = extractParameters
  expression = matchExpression
  register = registerParamType
}

/**
 * Finds a matching registered definition from the passed in definitions and text
 * Treats all non-regex step variants as expressions
 * @function
 * @public
 * @export
 * @param {Array<Object>} definitions - All Registered definitions
 * @param {string} text - Feature step text to compare with definition text
 *
 * @returns {Object} Found matching definition and matched arguments
 */
export const matcher = (definitions, text, $world) => {
  return definitions.reduce((found, definition) => {
    return found.match || !definition.match
      ? found
      : definition.variant !== REGEX_VARIANT
        ? matchExpression(definition, text, $world)
        : matchRegex(definition, text, $world)
  }, noOpObj)
}
