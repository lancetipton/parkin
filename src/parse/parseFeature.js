import { sanitizeForId, getRXMatch } from '../utils/helpers'
import { parseStep } from './parseStep'

/**
 * Regular expressions for matching feature file keywords
 * @type {object}
 */
const RX_NEWLINE = /\r?\n/g
const RX_TAG = /^\s*@(.*)$/
const RX_COMMENT = /^\s*#(.*)$/
const RX_FEATURE = /^\s*Feature:(.*)$/
const RX_AS = /^\s*As (.*)$/
const RX_I_WANT = /^\s*I want (.*)$/
const RX_SO_THAT = /^\s*So that (.*)$/
const RX_IN_ORDER = /^\s*In order (.*)$/
const RX_SCENARIO = /^\s*Scenario:(.*)$/
const RX_EXAMPLE = /^\s*Example:(.*)$/
const RX_BACKGROUND = /^\s*Background:(.*)$/

/**
 * Regular expressions and types for matching feature meta data keywords
 * @type {Array}
 * @private
 */
const featureMetaTags = [
  { regex: RX_AS, key: 'perspective' },
  { regex: RX_I_WANT, key: 'desire' },
  { regex: RX_SO_THAT, key: 'reason' },
  { regex: RX_IN_ORDER, key: 'reason' },
]

/*
 * Helper factory function to build a feature object
 * @function
 * @private
 * @param {string} feature - Text containing the feature keyword and text
 * @param {number} text - The entire text of a feature file
 *
 * @returns {Object} - Parsed feature object
 */
const featureFactory = (feature, content, index) => {
  return {
    index,
    content,
    feature,
    tags: [],
    reason: [],
    comments: [],
    scenarios: [],
    // The feature name should always be unique, so use that as a re-usable id
    ...(feature && { uuid: sanitizeForId(feature) }),
  }
}

/*
 * Helper factory function to build a scenario object
 * @function
 * @private
 * @param {string} scenario - Text containing the scenario keyword and text
 *
 * @returns {Object} - Parsed scenario object
 */
const scenarioFactory = (scenario, index) => {
  return {
    index,
    scenario,
    tags: [],
    steps: [],
    ...(scenario && { uuid: sanitizeForId(scenario) }),
  }
}

/*
 * Helper factory function to build a background object
 * @function
 * @private
 * @param {string} scenario - Text containing the scenario keyword and text
 *
 * @returns {Object} - Parsed scenario object
 */
const backgroundFactory = (background, index) => {
  return {
    index,
    steps: [],
    background,
    ...(background && { uuid: sanitizeForId(background) }),
  }
}

/*
 * Helper function to add reason text to a feature when it exists
 * @function
 * @private
 * @param {Object} feature - Parse feature object
 * @param {string} reason - Text containing the reason from the parsed feature file
 *
 * @returns {void}
 */
const addReason = (feature, reason, index) => {
  reason && feature.reason.push({ content: reason, index })
}

/**
 * Checks for feature descriptive content
 * @function
 * @private
 * @param {Object} feature - Current feature being parsed into an object
 * @param {string} line - Current line being parsed
 *
 * @return {boolean} - True if a line was added to the current feature object
 */
const featureMeta = (feature, line, index) => {
  let metaAdded = false
  featureMetaTags.reduce((added, regTag) => {
    if (added) return added

    const hasTag = regTag.regex.test(line)
    if (!metaAdded && hasTag) metaAdded = true

    return hasTag
      ? regTag.key === 'reason'
          ? addReason(feature, getRXMatch(line, regTag.regex, 0), index)
          : (feature[regTag.key] = {
              content: getRXMatch(line, regTag.regex, 0),
              index,
            })
      : hasTag
  }, false)

  return metaAdded
}

/*
 * Checks for feature file meta-data
 * @function
 * @private
 * @param {Object} feature - Current feature being parsed into an object
 * @param {string} line - Current line being parsed
 *
 * @return {boolean} - True if a line was added to the current feature object
 */
const checkTag = (parent, feature, line, index) => {
  if (!RX_TAG.test(line)) return false

  // background can not have tags, so add them to the feature instead
  const tagParent = parent.background ? feature : parent

  const tags = getRXMatch(line, RX_TAG, 0)

  // Join the tags with the tagParents current tags
  tagParent.tags = (tagParent.tags || []).concat(tags.split(' '))

  return true
}

/*
 * Checks for feature file comments
 * @function
 * @private
 * @param {Object} feature - Current feature being parsed into an object
 * @param {string} line - Current line being parsed
 * @param {number} index - Location of the current feature in the features group array
 *
 * @return {boolean} - True if a line was added to the current feature object
 */
const featureComment = (feature, line, index) => {
  if (!RX_COMMENT.test(line)) return false

  // const comment = getRXMatch(line, RX_COMMENT, 1)
  // Don't use getRXMatch because we want the full white space
  // Because comments are added globally and not by line
  // This could cause some issues if the user starts using different white space settings
  // But not much we can do about it
  const comment = line.match(RX_COMMENT)[0]

  feature.comments.push({ content: comment, index })

  return true
}

/**
 * Check for new feature, or add feature text to current feature
 * @function
 * @private
 * @param {Array} featuresGroup - All Parsed features as an array
 * @param {Object} feature - Current feature being parsed into an object
 * @param {string} line - Current line being parsed
 * @param {string} content - Full text content of the feature file
 * @param {number} index - The current line number of the feature text content
 *
 * @return {Object} Current feature being parsed
 */
const ensureFeature = (featuresGroup, feature, line, content, index) => {
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
    if (!feature.uuid) feature.uuid = sanitizeForId(feature.feature)

    !featuresGroup.includes(feature) && featuresGroup.push(feature)

    return feature
  }

  // Otherwise create a new feature, with the feature text and content
  return featureFactory(featureText, content, index)
}

/**
 * Check for new feature scenario, and add scenario to feature object
 * @function
 * @private
 * @param {Object} feature - Current feature being parsed into an object
 * @param {Object} scenario - Current scenario being parsed into an object
 * @param {string} line - Current line being parsed
 * @param {number} index - The current line number of the feature text content
 *
 * @return {Object} Current scenario being parsed
 */
const ensureScenario = (feature, scenario, line, index) => {
  // Check for "Scenario:" or "Example:" keywords
  if (!RX_SCENARIO.test(line) && !RX_EXAMPLE.test(line)) return scenario

  // Check for "Scenario:", if not found then check for "Example:"
  let scenarioText = getRXMatch(line, RX_SCENARIO, 1)
  scenarioText = scenarioText || getRXMatch(line, RX_EXAMPLE, 1)

  // Check if the scenario text was already added, and add it if needed
  // Otherwise create a new scenario with the scenario text
  !scenario.scenario
    ? (scenario.scenario = scenarioText)
    : (scenario = scenarioFactory(scenarioText, index))

  // Ensure the line index is added
  !scenario.index && (scenario.index = index)
  // Add the uuid from the scenario text if it doesn't exist
  !scenario.uuid && (scenario.uuid = sanitizeForId(scenario.scenario))

  // Add the scenario if needed to the current feature
  !feature.scenarios.includes(scenario) && feature.scenarios.push(scenario)

  return scenario
}

/**
 * Check for background in a feature, These steps should run before all steps of a scenario
 * Should be added to each scenario, where a background exists in the feature
 * @function
 * @private
 * @param {Object} feature - Current feature being parsed into an object
 * @param {Object} scenario - Current scenario being parsed into an object
 * @param {string} line - Current line being parsed
 *
 * @return {Object} Current background being parsed
 */
const ensureBackground = (feature, background, line, index) => {
  if (!RX_BACKGROUND.test(line)) return background

  // Generate the background text from the feature uuid and background keyword
  // background's don't have a text title, so we have to generate one when parsing
  const backgroundText = `${feature.uuid}-background`

  // Check if the background text was already added, and add it if needed
  // Otherwise create a new background with the background text
  !background.background
    ? (background.background = backgroundText || '')
    : (background = backgroundFactory(backgroundText, index))

  // Ensure the line index is added
  !background.index && (background.index = index)
  // Add the uuid from the background text if it doesn't exist
  !background.uuid && (background.uuid = sanitizeForId(background.background))

  feature.background = background

  return background
}

/**
 * Determine the active parent base on the nextLine to be evaluated
 * If a new parent is not found, then returns the current activeParent
 * @function
 * @private
 * @param {Object} activeParent - Current parent object to have properties added to it
 * @param {Object} feature - Feature model object
 * @param {Object} scenario - Scenario model object
 * @param {Object} background - Background model object
 * @param {string} nextLine - Next line of the text to be evaluated
 *
 * @returns {Object} - Found active parent based on the nextLine
 */
const setActiveParent = (
  activeParent,
  feature,
  scenario,
  background,
  nextLine
) => {
  return RX_SCENARIO.test(nextLine) || RX_EXAMPLE.test(nextLine)
    ? scenario
    : RX_FEATURE.test(nextLine)
      ? feature
      : RX_BACKGROUND.test(nextLine)
        ? background
        : activeParent
}

/**
 * Parses a feature files text content into an object
 * @function
 * @public
 * @export
 * @param {string} text - Text content of a feature file
 *
 * @returns {Object} - Parsed feature file as an object
 */
export const parseFeature = text => {
  const features = []
  const lines = (text || '').toString().split(RX_NEWLINE)
  let scenario = scenarioFactory(false)
  let background = backgroundFactory(false)
  let feature = featureFactory(false, text)
  let activeParent = feature

  /*
   * Loop over each line of text, and compose the line with corresponding regex to find a match
   */
  return lines.reduce((featuresGroup, line, index) => {
    /*
     * Check for new feature, or parse the current features text
     */
    feature = ensureFeature(featuresGroup, feature, line, text, index)

    /*
     * Check for child content of the feature or activeParent and parse the line when matched
     */
    if (
      featureComment(feature, line, index) ||
      featureMeta(feature, line, index)
    )
      return featuresGroup

    /*
     * Check for new feature scenario, and add scenario to feature object
     */
    scenario = ensureScenario(feature, scenario, line, index)

    /*
     * Check for new feature scenario, and add scenario to feature object
     */
    background = ensureBackground(feature, background, line, index)

    // Check for stepTags before check for the next active parent
    // This way We don't add a step to the wrong parent
    if (parseStep(activeParent, lines, line, index)) return featuresGroup

    /*
     * Get the currently active parent based on the next line to be parsed
     * This allows setting the active parent before the next iteration
     */
    activeParent = setActiveParent(
      activeParent,
      feature,
      scenario,
      background,
      line
    )

    // Check for tags after the next active parent has been set
    checkTag(activeParent, feature, line, index)

    return featuresGroup
  }, features)
}
