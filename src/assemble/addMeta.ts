import type { TFeatureAst, TAstBlock } from '../types'

import { constants } from '../constants'
import { addContent } from './addContent'
import { eitherArr, isArr } from '@keg-hub/jsutils'

const { FEATURE_META } = constants


/**
 * Converts a features meta data into strings and adds them to the assembled array
 * @function
 * @private
 *
 */
export const addMeta = (
  assembled:string[],
  feature:TFeatureAst
) => {
  FEATURE_META.map((key:string) => {
    switch (key) {
    case 'feature':
      addContent(assembled, `Feature: ${feature[key]}`, feature.index)
      break
    case 'comments':
      const comments = feature[key]
      comments
        && eitherArr<TAstBlock[]>(comments, [comments])
            .map(item => addContent(assembled, item.content, item.index))
      break
    case 'reason':
    case 'desire':
    case 'perspective':
      const other = feature[key]
      other
        && eitherArr<TAstBlock[]>(other, [other])
            .map(item => addContent(assembled, `  ${item.content}`, item.index))
      break
    }
  })
}

