import { exists } from '@keg-hub/jsutils'


/**
 * Adds content to the assembled array based on the passed in index
 * If no index exists, then the content is added to the end
 * If the index already exists, then the content is spliced into the array at the index
 * @function
 * @private
 *
 */
export const addContent = (
  assembled:string[],
  content:string,
  index?:number
) => {
  !exists(index)
    ? assembled.push(content)
    : exists(assembled[index])
      ? assembled.splice(index, 0, content)
      : (assembled[index] = content)
}
