import { addContent } from './addContent'
import { isArr } from '@keg-hub/jsutils'


/**
 * Converts a array of tags into a string and adds them to the assembled array
 * @function
 * @private
 *
 */
export const addTags = (
  assembled:string[],
  tags?:string[],
  spacer:string = ''
) => {
  isArr(tags) &&
    tags.length &&
    addContent(assembled, `${spacer}${tags.join(' ')}`)
}
