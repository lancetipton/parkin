import type { TFeatureAst, TAssembleFeatureOpts, TAssembleFeatureArgOpts } from '../types'

import { addMeta } from './addMeta'
import { addTags } from './addTags'
import { addRules } from './addRules'
import { formatAssembled } from './format'
import { addScenarios } from './addScenarios'
import { addBackground } from './addBackground'
import { addFeatureEmpty } from './addEmpty'
import { throwFeatureNotAnObj } from '../utils/errors'
import {
  eitherArr,
  isBool,
  isObj,
  emptyObj,
  deepMerge
} from '@keg-hub/jsutils'

const activeBreaks = {
  rule: true,
  scenario: true,
  background: true,
  ruleScenario:true,
  ruleBackground:true
}

/**
 * Default assemble options
 */
const assembleOpts:TAssembleFeatureOpts = {
  empty: true,
  indexes: true,
  breaks: {
    ...activeBreaks,
    ruleBackground:false
  }
}

/**
 * Merges the assemble options with the default options
 * Ensure breaks property is set to a breaks object
 */
const mergeOptions = (opts:TAssembleFeatureArgOpts) => {
  return {
    ...assembleOpts,
    ...opts,
    breaks: isBool(opts.breaks)
      ? activeBreaks
      : isObj(opts.breaks)
        ? { ...assembleOpts.breaks, ...opts.breaks }
        : assembleOpts.breaks
  } as TAssembleFeatureOpts
}

/**
 * Converts parsed feature models back into a formatted strings
 * @function
 * @public
 * @export
 *
 */
export const assembleFeature = (
  toAssemble:TFeatureAst|TFeatureAst[],
  opts:TAssembleFeatureArgOpts=emptyObj as TAssembleFeatureArgOpts
):string[] => {

  const options = mergeOptions(opts)

  return eitherArr<TFeatureAst[]>(toAssemble, [toAssemble]).map((feature) => {
    let assembled = []
    !isObj(feature) && throwFeatureNotAnObj(feature)

    addTags(assembled, feature, options)
    addMeta(assembled, feature, options)
    options.empty && addFeatureEmpty(assembled, feature, options)

    addBackground(assembled, feature, options)

    addRules(assembled, feature, options)

    addScenarios(assembled, feature, options)

    return formatAssembled(assembled, options)
  })
}
