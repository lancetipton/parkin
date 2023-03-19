import type { TFeatureAst } from '../types'

import { fromIndex } from './fromIndex'
import { throwFeatureNotAnObj } from '../utils/errors'
import { isObj, eitherArr } from '@keg-hub/jsutils'
import { featureToIndexes } from './featureToIndexes'

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
    !isObj(feature) && throwFeatureNotAnObj(feature)
    const indexes = featureToIndexes(feature)

    return fromIndex(indexes)
  })
}
