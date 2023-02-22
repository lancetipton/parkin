import type { TFeatureAst } from '../types'

import { sanitizeForId, getRXMatch } from '../utils/helpers'

/**
 * Regular expressions for matching feature file keywords
 * @type {object}
 */
const RX_FEATURE = /^\s*Feature:(.*)$/

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
    tags: [],
    rules: [],
    reason: [],
    comments: [],
    scenarios: [],
    // The feature name should always be unique, so use that as a re-usable id
    ...(feature && { uuid: sanitizeForId(feature, index) }),
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
    if (!feature.uuid) feature.uuid = sanitizeForId(feature.feature, index)

    !featuresGroup.includes(feature) && featuresGroup.push(feature)

    return feature
  }

  // Otherwise create a new feature, with the feature text and content
  const builtFeature = featureFactory(featureText, content, index)
  featuresGroup.push(builtFeature)

  return builtFeature
}

