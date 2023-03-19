import type {
  TStepDef,
  TFindOpts,
  TMatchResp,
  TStepDefsArr,
  TWorldConfig
} from '../types'
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
  options:TFindOpts=emptyObj
  
  constructor(parkin?:Parkin, options?:TFindOpts){
    this.parkin = parkin
    this.options = options
  }

  /**
   * Finds a matching step definitions form the passed in text
   * If no options are passed;
   * All definition expression must be replaced in text
   * @member {Matcher}
   *
   */
  find = (
    text:string,
    definitions?:TStepDefsArr,
    $world?:TWorldConfig,
    opts?:TFindOpts
  ) => {
    const defs = definitions
      || this.parkin?.steps?.list?.()
      || emptyArr

    const world = $world
      || this?.parkin?.world
      || { $alias: {} } as TWorldConfig

    return matcher(defs, text, world, opts || this.options)
  }

  /**
   * Finds a matching step definitions form the passed in text
   * Defaults partial option to true, to allow finding partial matches
   * @member {Matcher}
   *
   */
  search = (
    text:string,
    opts:TFindOpts={ partial: true }
  ) => this.find(text, undefined, undefined, opts)

  parts = (defMatchStr:string, opts?:TFindOpts) => getRegexParts(
    defMatchStr,
    opts || this.options
  )

  extract = (
    text:string,
    stepMatcher:string,
    wordMatches:string[],
    opts?:TFindOpts
  ) => extractParameters(
    text,
    stepMatcher,
    wordMatches,
    opts || this.options
  )

  expression = (
    def:TStepDef,
    text:string,
    $world?:TWorldConfig,
    opts:TFindOpts=emptyObj
  ) => matchExpression(
    def,
    text,
    $world || this?.parkin?.world,
    opts || this.options
  )

  stepTokens = (
    step:string,
    def:TStepDef,
    opts?:TFindOpts
  ) => tokenizeStep(
    step,
    def,
    opts || this.options
  )

  expressionFind = (
    def:TStepDef,
    text:string,
    opts:TFindOpts=emptyObj
  ) =>  findAsRegex(
      def,
      text,
      opts || this.options
  )

  regex = matchRegex
  types = getParamTypes
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
  $world:TWorldConfig,
  opts:TFindOpts=emptyObj
) => {
  return definitions.reduce((found, definition) => {
    return found.match || !definition.match
      ? found as TMatchResp
      : definition.variant !== REGEX_VARIANT
        ? matchExpression(definition, text, $world, opts) as TMatchResp
        : matchRegex(definition, text) as TMatchResp
  }, emptyObj as TMatchResp)
}
