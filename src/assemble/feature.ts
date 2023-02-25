import type { TFeatureAst } from '../types'

import { addMeta } from './addMeta'
import { addTags } from './addTags'
import { addEmpty } from './addEmpty'
import { addRules } from './addRules'
import { formatAssembled } from './format'
import { addScenarios } from './addScenarios'
import { addBackground } from './addBackground'
import { eitherArr, isObj } from '@keg-hub/jsutils'
import { throwFeatureNotAnObj } from '../utils/errors'


/**
 * Converts parsed feature models back into a formatted strings
 * @function
 * @public
 * @export
 *
 */
export const assembleFeature = (
  toAssemble:TFeatureAst|TFeatureAst[]
):string[] => {
  return eitherArr<TFeatureAst[]>(toAssemble, [toAssemble]).map((feature) => {
    let assembled = []
    !isObj(feature) && throwFeatureNotAnObj(feature)

    addTags(assembled, feature.tags)
    addMeta(assembled, feature)
    addEmpty(assembled, feature)
    addBackground(assembled, feature)
    addRules(assembled, feature)
    addScenarios(assembled, feature)

    return formatAssembled(assembled)
  })
}
