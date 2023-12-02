import type {
  TStepDef,
  TFindOpts,
  TTokenOpts,
  TStepDefsArr,
  TWorldConfig,
  TNoExtMatchResp
} from '../types'
import type { Parkin } from '../parkin'

import { constants } from '../constants'
import { tokenizeStep } from './tokens'
import { emptyArr } from '@keg-hub/jsutils/emptyArr'
import { emptyObj } from '@keg-hub/jsutils/emptyObj'
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

  parts = (defMatchStr:string, opts?:TTokenOpts) => getRegexParts(
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
    opts?:TTokenOpts
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

  // TODO: when adding refs to other features / steps to run
  // Here would be a good place to start
  // Could parse the text, looking for a $ref to other steps to run
  // If found, then run those steps instead

  if(!text.trim()) return emptyObj as TNoExtMatchResp

  const defLength = definitions.length

  /**
   * TODO: investigate how to improve this to speed it up
   * Currently loops through all steps until the correct one is found
   * See if there's a way to filter which defs are looked at based on the step text
   */
  for (let idx = 0; idx < defLength; idx++) {
    const definition = definitions[idx]

    if(!definition.match) continue
    const found = definition.variant !== REGEX_VARIANT
      ? matchExpression(definition, text, $world, opts) as TNoExtMatchResp
      : matchRegex(definition, text) as TNoExtMatchResp

    if(found.match) return found as TNoExtMatchResp
  }

   return emptyObj as TNoExtMatchResp
}
