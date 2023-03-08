import type { TFeatureAst, TAssembleFeatureOpts } from '../types'

import { addMeta } from './addMeta'
import { addTags } from './addTags'
import { addEmpty } from './addEmpty'
import { addRules } from './addRules'
import { formatAssembled } from './format'
import { addScenarios } from './addScenarios'
import { addBackground } from './addBackground'
import { eitherArr, isObj, emptyObj } from '@keg-hub/jsutils'
import { throwFeatureNotAnObj } from '../utils/errors'

/**
 * Default assemble options
 */
const assembleOpts = {
  empty: true,
  indexes: true,
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
  opts:TAssembleFeatureOpts=emptyObj
):string[] => {
  const options = {...assembleOpts, ...opts}

  return eitherArr<TFeatureAst[]>(toAssemble, [toAssemble]).map((feature) => {
    let assembled = []
    !isObj(feature) && throwFeatureNotAnObj(feature)

    addTags(assembled, feature.tags)
    addMeta(assembled, feature, options)
    options.empty && addEmpty(assembled, feature, options)
    addBackground(assembled, feature, options)

    addRules(assembled, feature, options)
    addScenarios(assembled, feature, options)

    return formatAssembled(assembled, options)
  })
}
