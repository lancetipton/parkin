import type { TFeatureAst } from '../types'

import { EAstObject } from '../types'
import { parseError } from './parseError'
import { strToId, getRXMatch } from '../utils/helpers'

/**
 * Regular expressions for matching feature file keywords
 * @type {object}
 */
const RX_FEATURE = /^\s*Feature:(.*)$/
const RX_HAS_FEATURE = /\s*Feature:(.*)/

/*
 * Helper factory function to build a feature object
 * @function
 *
 */
export const featureFactory = (
  feature:string|false,
  content:string,
  index?:number
) => {
  return {
    index,
    content,
    feature,
    rules: [],
    empty: [],
    reason: [],
    comments: [],
    scenarios: [],
    type: EAstObject.feature,
    ...(feature && { uuid: strToId(feature, `feature-`) })
  } as TFeatureAst
}


/**
 * Check for new feature, or add feature text to current feature
 * @function
 *
 */
export const ensureFeature = (
  featuresGroup:TFeatureAst[],
  feature:TFeatureAst,
  line:string,
  content:string,
  index:number
) => {

  // Ensure feature text exists
  const hasFeature = Boolean(feature.feature || RX_HAS_FEATURE.test(content))

  // If no feature text is found, or the feature already has errors
  // Then don't continue to parse the feature
  if(!hasFeature || feature?.errors?.length){
    !feature?.errors?.length
      && parseError(feature, EAstObject.feature, index, `Could not find Feature text in file`)

    !featuresGroup.includes(feature)
      && featuresGroup.push(feature)

    return feature
  }

  // Check for Feature: keyword text
  if (!RX_FEATURE.test(line)) return feature

  // Get the text from the line
  const featureText = getRXMatch(line, RX_FEATURE, 1)

  // If the text was not yet added, then add it
  // Then ensure the feature was added to the full group
  if (!feature.feature) {
    feature.feature = featureText

    // Ensure the index is added if needed
    if (!feature.index) feature.index = index
    if (!feature.uuid) feature.uuid = strToId(feature.feature, `feature-`)

    !featuresGroup.includes(feature) && featuresGroup.push(feature)

    return feature
  }

  // Otherwise create a new feature, with the feature text and content
  const builtFeature = featureFactory(featureText, content, index)
  featuresGroup.push(builtFeature)

  return builtFeature
}

