import type { TBackgroundParentAst, TAssembleFeatureOpts } from '../types'

import { addTags } from './addTags'
import { addSteps } from './addSteps'
import { addEmpty } from './addEmpty'
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
  parent:TBackgroundParentAst,
  opts:TAssembleFeatureOpts
) => {

  const { background } = parent
  if(!background) return

  const { breaks, indexes=true } = opts
  const whitespace = background.whitespace || `  `

  breaks?.background && addEmpty(assembled, opts)

  addTags(assembled, background, opts, whitespace)
  addContent(assembled, `${whitespace}${EFeatureTypes.Background}:`, indexes && background.index)
  addSteps(assembled, background, opts)

}
