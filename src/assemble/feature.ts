import type { TFeatureAst, TAssembleOpts } from '../types'

import { fromIndex } from './fromIndex'
import { formatFeature } from './formatters'
import { featureToIndexes } from './featureToIndexes'
import { throwFeatureNotAnObj } from '../utils/errors'
import { isObj, eitherArr, emptyObj } from '@keg-hub/jsutils'

/**
 * Converts parsed feature models back into a formatted strings
 * @function
 * @public
 * @export
 *
 */
export const assembleFeature = (
  toAssemble:TFeatureAst|TFeatureAst[],
  opts:TAssembleOpts=emptyObj
):string[] => {
  return eitherArr<TFeatureAst[]>(toAssemble, [toAssemble]).map((feature) => {
    !isObj(feature) && throwFeatureNotAnObj(feature)
    const updated = formatFeature(feature, opts)
    const indexes = featureToIndexes(updated)

    return fromIndex(indexes)
  })
}
