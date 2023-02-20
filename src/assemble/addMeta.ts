import { constants } from '../constants'
import { addContent } from './addContent'
import { isArr } from '@keg-hub/jsutils'

const { FEATURE_META } = constants


/**
 * Converts a features meta data into strings and adds them to the assembled array
 * @function
 * @private
 *
 */
export const addMeta = (
  assembled:string[],
  feature:Record<any, any>
) => {
  FEATURE_META.map((key:string) => {
    switch (key) {
    case 'feature':
      addContent(assembled, `Feature: ${feature[key]}`, feature.index)
      break
    case 'comments':
      isArr(feature[key]) &&
          feature[key].map(item =>
            addContent(assembled, item.content, item.index)
          )
      break
    case 'reason':
      isArr(feature[key]) &&
          feature[key].map(item =>
            addContent(assembled, `  ${item.content}`, item.index)
          )
      break
    case 'desire':
    case 'perspective':
      feature[key] &&
          addContent(assembled, `  ${feature[key].content}`, feature[key].index)
      break
    }
  })
}

