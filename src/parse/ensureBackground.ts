import type {
  TRuleAst,
  TFeatureAst,
  TBackgroundAst,
  TBackgroundParentAst,
} from '../types'

import { EAstObject } from '../types'
import { idFromIdx } from './idFromIdx'
import { isStr, isBool } from '@keg-hub/jsutils'
import { getRXMatch, getStartWhiteSpace } from '../utils/helpers'

/**
 * Regular expressions for matching feature file keywords
 * @type {object}
 */
const RX_BACKGROUND = /^\s*Background:(.*)$/


/*
 * Helper factory function to build a background object
 * @function
 * @private
 *
 */
export const backgroundFactory = (
  background:string|false,
  parent?:TBackgroundParentAst,
  index?:number
) => {
  const type = EAstObject.background

  return {
    type,
    index,
    steps: [],
    background,
    ...(background && parent && { uuid: idFromIdx({ index: 0, type, parent })}),
  } as TBackgroundAst
}

/**
 * Check for background in a feature, These steps should run before all steps of a scenario
 * Should be added to each scenario, where a background exists in the feature
 * @function
 * @private
 *
 */
export const ensureBackground = (
  feature:TFeatureAst,
  rule:TRuleAst,
  background:TBackgroundAst,
  line:string,
  index:number
) => {
  if (!RX_BACKGROUND.test(line)) return background

  // Get text after the "Background:" key word
  const existingBgText = getRXMatch(line, RX_BACKGROUND, 1)

  // Generate the background text from the parent uuid and background keyword
  // background's don't have a text title, so we have to generate one when parsing
  const parent = rule?.uuid ? rule : feature
  const backgroundText = isStr(existingBgText) ? existingBgText.trim() : ''

  // The initial background is created with out the background text
  // So check here if it should be added, or create a new background
  isBool(background.background)
    ? (background.background = backgroundText)
    : (background = backgroundFactory(backgroundText, parent, index))

  !background.index && (background.index = index)
  !background.uuid
    && (background.uuid = idFromIdx({
        parent,
        index: 0,
        type: background.type
      }))

  // Get the start whitespace, used when assembling the feature
  background.whitespace = getStartWhiteSpace(line)

  parent.background = background

  return background
}
