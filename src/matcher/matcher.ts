import type { TMatchResp, TStepDefsArr, TWorldConfig } from '../types'
import type { Parkin } from '../parkin'

import { constants } from '../constants'
import { tokenizeStep } from './tokens'
import { emptyObj, emptyArr } from '@keg-hub/jsutils'
import { matchRegex, getRegexParts } from './regex'
import { getParamTypes, registerParamType } from './paramTypes'
import { findAsRegex, extractParameters, matchExpression } from './expression'

const { REGEX_VARIANT } = constants

/**
 * Class for accessing matcher methods and param types
 * <br/>Gives access to underlying matcher methods to be called directly
 */
export class Matcher {
  
  parkin:Parkin
  
  constructor(parkin?:Parkin){
    this.parkin = parkin
  }

  find = (
    text:string,
    definitions?:TStepDefsArr,
    $world?:TWorldConfig
  ) => {
    return matcher(
      definitions || this.parkin?.steps?.list?.() || emptyArr,
      text,
      $world || this?.parkin?.world || { $alias: {} } as TWorldConfig
    )
  }
  regex = matchRegex
  parts = getRegexParts
  types = getParamTypes
  stepTokens = tokenizeStep
  extract = extractParameters
  expression = matchExpression
  expressionFind = findAsRegex
  register = registerParamType
}

/**
 * Finds a matching registered definition from the passed in definitions and text
 * Treats all non-regex step variants as expressions
 * @function
 * @public
 */
export const matcher = (
  definitions:TStepDefsArr,
  text:string,
  $world:TWorldConfig
) => {
  return definitions.reduce((found, definition) => {
    return found.match || !definition.match
      ? found as TMatchResp
      : definition.variant !== REGEX_VARIANT
        ? matchExpression(definition, text, $world) as TMatchResp
        : matchRegex(definition, text) as TMatchResp
  }, emptyObj as TMatchResp)
}
