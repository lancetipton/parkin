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
const RX_GIVEN = /^\s*Given (.*)$/
const RX_WHEN = /^\s*When(.*)$/
const RX_THEN = /^\s*Then (.*)$/
const RX_AND = /^\s*And (.*)$/
const RX_BUT = /^\s*But (.*)$/

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
const extract = (line, regex, index) => line.match(regex)[index].trim()

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
    * Checks for feature file meta-data
    */
    if (RX_TAG.test(line)){
      const tags = extract(line, RX_TAG, 0)
      feature.tags = feature.tags.concat(tags.split(' '))
    }

    else if(RX_COMMENT.test(line)){
      const comment = extract(line, RX_COMMENT, 1)
      feature.comments[index] = comment
    }

    /*
    * Check for new feature, or feature text
    */
    else if (RX_FEATURE.test(line)) {
      if(!feature.feature){
        feature.feature = extract(line, RX_FEATURE, 1)
        !featuresGroup.includes(feature) && featuresGroup.push(feature)
      }
      else feature = featureFactory(extract(line, RX_FEATURE, 1), text)
    }

    /*
    * Checks for feature descriptive content
    */
    else if (RX_AS.test(line))
      feature.perspective = extract(line, RX_AS, 0)

    else if (RX_I_WANT.test(line))
      feature.desire = extract(line, RX_I_WANT, 0)

    else if (RX_SO_THAT.test(line))
      addReason(feature, extract(line, RX_SO_THAT, 0))

    else if (RX_IN_ORDER.test(line))
      addReason(feature, extract(line, RX_IN_ORDER, 0))

    /*
    * Check for new feature scenario, and add scenario to feature object
    */
    else if (RX_SCENARIO.test(line)) {
      if(!scenario.scenario) scenario.scenario = extract(line, RX_SCENARIO, 1)
      else scenario = scenarioFactory(extract(line, RX_SCENARIO, 1))

      !feature.scenarios.includes(scenario) && feature.scenarios.push(scenario)
    }

    /*
    * Checks for steps, and add to current scenario
    */
    else if (RX_GIVEN.test(line))
      scenario.steps.push(stepFactory('given', extract(line, RX_GIVEN, 1)))

    else if (RX_WHEN.test(line))
      scenario.steps.push(stepFactory('when', extract(line, RX_WHEN, 1)))

    else if (RX_THEN.test(line))
      scenario.steps.push(stepFactory('then', extract(line, RX_THEN, 1)))

    else if (RX_AND.test(line))
      scenario.steps.push(stepFactory('and', extract(line, RX_AND, 1), `when`))

    else if (RX_BUT.test(line))
      scenario.steps.push(stepFactory('but', extract(line, RX_BUT, 1), `then`))

    return featuresGroup
  }, features)

}

