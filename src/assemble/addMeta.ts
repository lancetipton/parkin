import type { TFeatureAst, TBlockAst, TAssembleFeatureOpts } from '../types'

import { constants } from '../constants'
import { EFeatureTypes } from '../types'
import { addContent } from './addContent'
import { eitherArr } from '@keg-hub/jsutils'
const { FEATURE_META } = constants


/**
 * Converts a features meta data into strings and adds them to the assembled array
 * @function
 * @private
 *
 */
export const addMeta = (
  assembled:string[],
  feature:TFeatureAst,
  opts:TAssembleFeatureOpts
) => {
  const { indexes=true } = opts

  FEATURE_META.map((key:string) => {
    switch (key) {
    case 'feature':
      addContent(
        assembled,
        `${EFeatureTypes.Feature}: ${feature[key]}`,
        indexes && feature.index
      )
      break
    case 'comments':
      const comments = feature[key]
      comments
        && eitherArr<TBlockAst[]>(comments, [comments])
            .map(item => addContent(assembled, item.content, indexes && item.index))
      break
    case 'reason':
    case 'desire':
    case 'perspective':
      const other = feature[key]
      other
        && eitherArr<TBlockAst[]>(other, [other])
            .map(item => addContent(assembled, `  ${item.content}`, indexes && item.index))
      break
    }
  })
}

