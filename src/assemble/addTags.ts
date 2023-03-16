import type { TFeatureAst, TTagsParentAst, TTagsAst, TAssembleFeatureOpts } from '../types'

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
  parent:TTagsParentAst,
  opts:TAssembleFeatureOpts,
  whitespace?:string
) => {
  if(!parent.tags || !parent.tags?.tokens?.length) return

  const { indexes=true } = opts

  addContent(
    assembled,
    `${parent.tags.whitespace || whitespace || ``}${parent.tags.tokens.join(' ')}`,
    indexes && parent.tags.index
  )
}
