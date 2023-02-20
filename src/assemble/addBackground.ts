import type { TFeatureAst } from '../types'

import { addTags } from './addTags'
import { addSteps } from './addSteps'
import { addContent } from './addContent'


/**
 * Converts a features background into strings and adds them to the assembled array
 * @function
 * @private
 *
 */
export const addBackground = (
  assembled:string[],
  feature:TFeatureAst
) => {
  const { background } = feature
  if(!background) return

  addTags(assembled, background.tags, `  `)
  addContent(assembled, `  Background: ${background.background}`, background.index)
  addSteps(assembled, background)

}
