import { addMeta } from './addMeta'
import { addTags } from './addTags'
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
  toAssemble:Record<any, any>|Record<any, any>[]
):string[] => {
  return eitherArr(toAssemble, [toAssemble]).map((feature:Record<any, any>) => {
    let assembled = []
    !isObj(feature) && throwFeatureNotAnObj(feature)

    addTags(assembled, feature.tags)
    addMeta(assembled, feature)
    addBackground(assembled, feature)
    addRules(assembled, feature)
    addScenarios(assembled, feature)

    return formatAssembled(assembled)
  })
}
