import type { TBackgroundParentAst } from '../types'

import { addTags } from './addTags'
import { addSteps } from './addSteps'
import { EFeatureTypes } from '../types'
import { addContent } from './addContent'


/**
 * Converts a parents background into strings and adds them to the assembled array
 * @function
 * @private
 *
 */
export const addBackground = (
  assembled:string[],
  parent:TBackgroundParentAst
) => {
  const { background } = parent
  if(!background) return

  const whitespace = background.whitespace || `  `

  addTags(assembled, background.tags, whitespace)
  addContent(assembled, `${whitespace}${EFeatureTypes.Background}:`, background.index)
  addSteps(assembled, background)

}
