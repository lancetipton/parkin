import { uuid } from '@keg-hub/jsutils'

/*
 * Regular expressions for matching feature file keywords
 * @Object
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

/*
 * Regular expressions and types for matching step keywords
 * @Array
 */
const RegStepTags = [
  { regex: RX_GIVEN, type: 'given' },
  { regex: RX_WHEN, type: 'when' },
  { regex: RX_THEN, type: 'then' },
  { regex: RX_AND, type: 'and', alt: 'when' },
  { regex: RX_BUT, type: 'but', alt: 'when' },
  { regex: RX_ASTERISK, type: 'and', alt: 'when' },
]

/*
 * Regular expressions and types for matching feature meta data keywords
 * @Array
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
const featureFactory = (feature, text) => {
  return { feature, uuid: uuid(), tags: [], comments: {}, scenarios: [], text }
}

/*
 * Helper factory function to build a scenario object
 * @function
 * @private
 * @param {string} scenario - Text containing the scenario keyword and text
 *
 * @returns {Object} - Parsed scenario object
 */
const scenarioFactory = scenario => {
  return { scenario, uuid: uuid(), steps: [] }
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
const stepFactory = (type, step, altType) => {
  const built = { step, type, uuid: uuid() }
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
const addReason = (feature, reason) => {
  reason
    ? !feature.reason
        ? (feature.reason = reason)
        : (feature.reason += `\n${reason}`)
    : null
}


/**
 * @TODO: Implement doc string parsing
 * Check for doc strings in the steps
 * The string should be passed to the step def as the last argument
 * Space inside the doc string should be left as is
 * @function
 * @private
 * @param {Object} step - Current step being parsed into an object
 * @param {string} line - Current line being parsed
 * @param {string} text - Full text content of the feature file
 *
 * @return {Object} Current step being parsed with the doc string added
 */
const checkDocString = (step, line, text) => {
  // TODO: doc string parsing
  // if(!RX_DOCQUOTES.test(line) || !RX_DOCTICKS.test(line)) return step

  return step
}

/**
 * @TODO: Implement data table parsing
 * Check for a data table in the in the steps content
 * The string should be passed to the step def as the last argument
 * Each line of the data stable should be split in to arguments seperated by |
 * @function
 * @private
 * @param {Object} step - Current step being parsed into an object
 * @param {string} line - Current line being parsed
 * @param {string} text - Full text content of the feature file
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
const checkStepTag = (scenario, line) => {
  return RegStepTags.reduce((added, regTag) => {
    // If the line was already added, just return
    if(added) return added

    // Check if the line is a step tag
    const hasTag = regTag.regex.test(line)
    // If if is, add the extracted line to the steps of the current scenario
    hasTag && scenario.steps.push(stepFactory(
      regTag.type,
      getRXMatch(line, regTag.regex, 1),
      regTag.alt
    ))

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
const featureMeta = (feature, line) => {
  return featureMetaTags.reduce((added, regTag) => {
    if(added) return added
    
    const hasTag = regTag.regex.test(line)
  
    return hasTag
      ? regTag.key === 'reason'
        ? addReason(feature, getRXMatch(line, regTag.regex, 0))
        : (feature[regTag.key] = getRXMatch(line, regTag.regex, 0))
      : hasTag

  }, false)
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
const featureTag = (feature, line) => {
  if(!RX_TAG.test(line)) return false

  const tags = getRXMatch(line, RX_TAG, 0)
  feature.tags = feature.tags.concat(tags.split(' '))

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
  if(!RX_COMMENT.test(line)) return false

  const comment = getRXMatch(line, RX_COMMENT, 1)
  feature.comments[index] = comment

  return true
}

/**
 * Check for new feature, or add feature text to current feature
 * @function
 * @private
 * @param {Array} featuresGroup - All Parsed features as an array
 * @param {Object} feature - Current feature being parsed into an object
 * @param {string} line - Current line being parsed
 * @param {string} text - Full text content of the feature file
 *
 * @return {Object} Current feature being parsed
 */
const ensureFeature = (featuresGroup, feature, line, text) => {
  // Check for Feature: keyword text
  if(!RX_FEATURE.test(line)) return feature

  // Get the text from the line
  const featureText = getRXMatch(line, RX_FEATURE, 1)

  // If the text was not yet added, then add it
  // Then ensure the feature was added to the full group
  if (!feature.feature) {
    feature.feature = featureText
    !featuresGroup.includes(feature) &&
      featuresGroup.push(feature)

    return feature
  }

  // Otherwise create a new feature, with the feature text
  return featureFactory(featureText, text)
}

/**
 * Check for new feature scenario, and add scenario to feature object
 * @function
 * @private
 * @param {Object} feature - Current feature being parsed into an object
 * @param {Object} scenario - Current scenario being parsed into an object
 * @param {string} line - Current line being parsed
 *
 * @return {Object} Current scenario being parsed
 */
const ensureScenario = (feature, scenario, line) => {
  // Check for "Scenario:" or "Example:" keywords
  if(!RX_SCENARIO.test(line) && !RX_EXAMPLE.test(line)) return scenario

  // Check for "Scenario:", if not found then check for "Example:"
  let scenarioText = getRXMatch(line, RX_SCENARIO, 1)
  scenarioText = scenarioText || getRXMatch(line, RX_EXAMPLE, 1)

  // Check if the scenario text was already added, and add it if needed
  // Otherwise create a new scenario with the scenario text
  !scenario.scenario
    ? (scenario.scenario = scenarioText)
    : (scenario = scenarioFactory(scenarioText))

  // Add the scenario if needed to the current feature
  !feature.scenarios.includes(scenario) &&
    feature.scenarios.push(scenario)

  return scenario
}

/**
 * @TODO: Implement background parsing
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
const checkBackground = (feature, scenario, background, line) => {
  // TODO: Implement background parsing
  // if(!RX_BACKGROUND.test(line)) return background

  return background
}

/*
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
  let feature = featureFactory(false, text)

  /*
   * Loop over each line of text, and compose the line with corresponding regex to find a match
   */
  return lines.reduce((featuresGroup, line, index) => {

    /*
     * Check for new feature, or parse the current features text
     */
    feature = ensureFeature(featuresGroup, feature, line, text)

    /*
     * Check for new feature scenario, and add scenario to feature object
     */
    scenario = ensureScenario(feature, scenario, line)

    /*
     * Check for new feature scenario, and add scenario to feature object
     */
    // background = checkBackground(feature, scenario, background, line)

    /*
     * Check for feature and scenario content and parse the line when matched
     */
    featureTag(feature, line) ||
      featureComment(feature, line, index) ||
      featureMeta(feature, line) ||
      checkStepTag(scenario, line)

    return featuresGroup
  }, features)
}
