import type { TFeatureAst, TRuleAst, TBackgroundAst } from '../types'

import { EAstObject } from '../types'
import { uuid, isStr, isBool } from '@keg-hub/jsutils'
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
export const backgroundFactory = (background:string|false, index?:number) => {
  return {
    index,
    steps: [],
    background,
    type: EAstObject.background,
    ...(background && { uuid: uuid() }),
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

  // Check if the background text was already added, and add it if needed
  // Otherwise create a new background with the background text
  isBool(background.background)
    ? (background.background = backgroundText)
    : (background = backgroundFactory(backgroundText, index))

  // Ensure the line index is added
  !background.index && (background.index = index)
  // Add the uuid from the background text if it doesn't exist
  !background.uuid &&
    (background.uuid = uuid())

  // Get the start whitespace, used when assembling the feature
  background.whitespace = getStartWhiteSpace(line)

  parent.background = background

  return background
}
