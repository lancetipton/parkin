import { uuid } from '@keg-hub/jsutils'

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
const RX_GIVEN = /^\s*Given (.*)$/
const RX_WHEN = /^\s*When(.*)$/
const RX_THEN = /^\s*Then (.*)$/
const RX_AND = /^\s*And (.*)$/
const RX_BUT = /^\s*But (.*)$/
const RX_ASTERISK = /^\s*\* (.*)$/
const RX_DOCQUOTES = /^\s*"""\s*(.*)$/
const RX_DOCTICKS = /^\s*```\s*(.*)$/
const RX_DATATABLE = /^\s*\|\s*(.*)\|\s*$/

/**
 * Regular expressions and types for matching step keywords
 * @type {Array}
 * @private
 */
const RegStepTags = [
  { regex: RX_GIVEN, type: 'given' },
  { regex: RX_WHEN, type: 'when' },
  { regex: RX_THEN, type: 'then' },
  { regex: RX_AND, type: 'and', alt: 'when' },
  { regex: RX_BUT, type: 'but', alt: 'when' },
  { regex: RX_ASTERISK, type: 'and', alt: 'when' },
]

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
 * Extracts keywords from a text string
 * @function
 * @private
 * @param {string} line - Text content to extract the keyword from
 * @param {Object} regex - Regex object used for finding a keyword
 * @param {number} index - Current inject of the line being parsed
 *
 * @returns {string} - Found keyword text from the line argument
 */
const getRXMatch = (line, regex, index) => line.match(regex)[index].trim()

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
    uuid: uuid(),
    comments: [],
    scenarios: [],
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
  return { scenario, uuid: uuid(), steps: [], tags: [], index }
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
  return { background, uuid: uuid(), steps: [], index }
}

/*
 * Helper factory function to build a step object
 * @function
 * @private
 * @param {string} type - The type of step definition
 * @param {string} step - Text containing the step text
 * @param {string} altType - The alternate type of the step definition ( And || But )
 *
 * @returns {Object} - Parsed step object
 */
const stepFactory = (type, step, altType, index) => {
  const built = { step, type, uuid: uuid(), index }
  altType && (built.altType = altType)

  // TODO: Investigate calling checkDocString and checkDataTable here
  // For doc string and data table variables of steps
  // Will need to pass in the full text
  // Then pase from the current line down to the end of the doc string or data table

  return built
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
 * Check for doc strings in the steps
 * The string should be passed to the step def as the last argument
 * Space inside the doc string should be left as is
 * @function
 * @private
 * @param {Object} step - Current step being parsed into an object
 * @param {string} line - Current line being parsed
 * @param {string} text - Full text content of the feature file
 *
 * @todo Implement doc string parsing
 *
 * @return {Object} Current step being parsed with the doc string added
 */
const checkDocString = (step, line, text) => {
  // TODO: doc string parsing
  // if(!RX_DOCQUOTES.test(line) || !RX_DOCTICKS.test(line)) return step

  return step
}

/**
 * Check for a data table in the in the steps content
 * The string should be passed to the step def as the last argument
 * Each line of the data stable should be split in to arguments seperated by |
 * @function
 * @private
 * @param {Object} step - Current step being parsed into an object
 * @param {string} line - Current line being parsed
 * @param {string} text - Full text content of the feature file
 *
 * @todo Implement data table parsing
 *
 * @return {Object} Current step being parsed with the doc string added
 */
const checkDataTable = (step, line, text) => {
  // TODO: data table parsing
  // if(!RX_DATATABLE.test(line)) return step

  return step
}

/**
 * Checks each step tag type, and adds it to current scenario when it exists
 * @function
 * @private
 * @param {Object} scenario - Parsed scenario object of the current scenario
 * @param {string} line - Current line being parsed
 *
 * @return {boolean} - True if a line was added to the current scenario object
 */
const checkStepTag = (scenario, line, index) => {
  return RegStepTags.reduce((added, regTag) => {
    // If the line was already added, just return
    if (added) return added

    // Check if the line is a step tag
    const hasTag = regTag.regex.test(line)
    // If if is, add the extracted line to the steps of the current scenario
    hasTag &&
      scenario.steps.push(
        stepFactory(
          regTag.type,
          getRXMatch(line, regTag.regex, 1),
          regTag.alt,
          index
        )
      )

    // Return if the line was added to the steps
    return hasTag
  }, false)
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
    if(!metaAdded && hasTag) metaAdded = true

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
  if(!RX_BACKGROUND.test(line)) return background

  // Check for "Scenario:", if not found then check for "Example:"
  let backgroundText = getRXMatch(line, RX_SCENARIO, 1)
  backgroundText = backgroundText || getRXMatch(line, RX_EXAMPLE, 1)

  // Check if the background text was already added, and add it if needed
  // Otherwise create a new background with the background text
  !background.background
    ? (background.background = backgroundText || '')
    : (background = backgroundFactory(backgroundText, index))

  // Ensure the line index is added
  !background.index && (background.index = index)

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
const setActiveParent = (activeParent, feature, scenario, background, nextLine) => {
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
export const feature = text => {
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
    if(featureComment(feature, line, index) || featureMeta(feature, line, index))
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
    if(checkStepTag(activeParent, line, index))
      return featuresGroup

    /*
     * Get the next line for tag reference checking
     */
    const nextLine = lines[index + 1]

    /*
     * Get the currently active parent based on the next line to be parsed
     * This allows setting the active parent before the next iteration
     */
    activeParent = setActiveParent(
      activeParent,
      feature,
      scenario,
      background,
      nextLine
    )

    // Check for tags after the next active parent has been set
    checkTag(activeParent, feature, line, index)

    return featuresGroup
  }, features)
}
