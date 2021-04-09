import { parseFeature } from './parse'
import { getTestMethod, skipTestsOnFail } from './utils/testMethods'
import { throwMissingSteps, throwMissingFeatureText } from './utils/errors'
import {
  isArr,
  capitalize,
  isObj,
  isStr,
  noOpObj,
  eitherArr,
} from '@keg-hub/jsutils'

/**
 * Resolves and parses features based on the data type passed in
 * Ensures an array of parsed features is returned
 * @function
 * @public
 * @param {Object|Array<string|Object>|string} data - Feature content
 *
 * @returns {Array} - passed in data converted into parsed Features
 */
const resolveFeatures = data => {
  return isStr(data)
    ? parseFeature(data)
    : isObj(data)
      ? [data]
      : isArr(data)
        ? data.reduce(
            (features, feature) => features.concat(resolveFeatures(feature)),
            []
          )
        : throwMissingFeatureText()
}

/**
 * Calls the `it` global passing in a registered step function based on the step text
 * @function
 * @private
 * @param {Object} stepsInstance - Instance of the Steps class
 * @param {Object} step - Parsed Step mode object
 * @param {boolean} testMode - Allows testing the runner methods, without running the tests
 *
 * @returns {Void}
 */
const runStep = async (stepsInstance, step, testMode) => {
  const test = getTestMethod('test', testMode)
  test(`${capitalize(step.type)} ${step.step}`, async () => {
    return await stepsInstance.resolve(step.step)
  })
}

/**
 * Loops through the parents steps and calls the matching definition method
 * @function
 * @private
 * @param {Object} parent - Parent object containing the steps to run
 * @param {Object} title - Text passed as the first argument to the describe method
 * @param {Object} stepsInstance - Instance of the Steps class
 * @param {boolean} testMode - Allows testing the runner methods, without running the tests
 *
 * @returns {Array} - Responses from the parents steps
 */
const loopSteps = (parent, title, stepsInstance, testMode) => {
  const describe = getTestMethod('describe', testMode)

  let responses = []
  describe(title, () => {
    // Map over the steps and call them
    // Store the returned promise in the responses array
    const responses = parent.steps.map(step =>
      runStep(stepsInstance, step, testMode)
    )

    // Ensure we resolve all promises inside the describe block
    Promise.all(responses)
  })

  return responses
}

/**
 * Loops through the passed in scenarios steps and calls runStep for each
 * @function
 * @private
 * @param {Object} stepsInstance - Instance of the Steps class
 * @param {Object} scenario - Parsed feature scenario object containing the steps to run
 * @param {boolean} testMode - Allows testing the runner methods, without running the tests
 *
 * @returns {Void}
 */
const runScenario = (stepsInstance, scenario, background, index, testMode) => {
  // If there's a background, run the background steps first
  background &&
    loopSteps(
      background,
      `Background: For Scenario ${index}`,
      stepsInstance,
      testMode
    )

  // Next run the scenario steps once the background completes
  return loopSteps(
    scenario,
    `Scenario: ${scenario.scenario}`,
    stepsInstance,
    testMode
  )
}

/**
 * @param {string} tags
 * @return {Array<string>?} A match of all words starting with '@', the tag indicator.
 * Returns false if input is invalid.
 */
const parseFeatureTags = tags => {
  return isStr(tags) && tags.match(/[@]\w*/g)
}

/**
 * @param {string?} name - name of item (feature|scenario) to check
 * @param {string | Array<string>} tags - tags of item (feature|scenario) to check
 * @param {string?} filterOptions.name - name filter
 * @param {string | Array<string>} filterOptions.tags - tags filter
 * @return {Boolean} - true if feature matches the filter options
 */
const itemMatch = (name = '', tags = [], filterOptions = {}) => {
  const { name: filterName, tags: filterTags } = filterOptions

  const parsedTags = isStr(filterTags)
    ? parseFeatureTags(filterTags)
    : eitherArr(filterTags, [])

  const nameMatch = !filterName || name.includes(filterName)
  const tagMatch =
    !parsedTags.length ||
    parsedTags.every(clientTag => tags.includes(clientTag))

  return nameMatch && tagMatch
}

/**
 * Filters features and scenarios based on the passed in filterOptions
 * @function
 * @private
 * @param {Array} features - Features to be run
 * @param {Object} tags - Tags to filter which Features and scenarios will be run
 *  * @param {string?} filterOptions.name - name of feature
 * @param {string | Array<string>} filterOptions.tags - feature tags to match
 *
 * @returns {Array} - Filtered features that should be run
 */
const filterFeatures = (features, filterOptions = {}) => {
  return features.reduce((filtered, feature) => {
    const isMatchingFeature = itemMatch(
      feature.feature,
      feature.tags,
      filterOptions
    )
    if (isMatchingFeature) {
      filtered.push(feature)
      return filtered
    }

    // check for matching scenarios, where scenarios inherit their parent feature's tags
    const matchingScenarios = feature.scenarios.filter(scenario =>
      itemMatch(
        scenario.scenario,
        [ ...(scenario.tags || []), ...(feature.tags || []) ],
        filterOptions
      )
    )
    if (matchingScenarios.length) {
      filtered.push({
        ...feature,
        scenarios: matchingScenarios,
      })
    }
    return filtered
  }, [])
}

/**
 * Parses and runs the steps of a feature text string
 * Uses the registered steps of the passed in Steps class instance to evaluate the feature steps
 * @class
 * @public
 * @param {Object} stepsInstance - Instance of the Steps class
 * @param {Hooks} hooksInstance - instance of the Hooks class, storing the client's registered test callbacks
 *
 * @returns {Object} Instance of the Runner class
 */
export class Runner {
  constructor(steps, hooks) {
    !steps && throwMissingSteps()
    !hooks && throwMissingHooks()

    this.steps = steps
    this.hooks = hooks
  }

  /**
   * Gets the features to be run for a test
   * @param {string|Array<Object>|Object} data - Feature data as a string or parsed Feature model
   * @param {Object} options - Define how the steps are run
   * @param {Array<string>? | string?} options.tags - Tags to filter which features or scenarios are run
   * @param {string?} options.name - Name of feature
   */
  getFeatures = (data, options) => {
    const features = resolveFeatures(data)
    return filterFeatures(features, options)
  }

  /**
   * Parses and runs the steps of a feature text string
   * Matches each step to a registered steps of the Steps class instance
   * @memberof Runner
   * @function
   * @public
   * @param {string|Array<Object>|Object} data - Feature data as a string or parsed Feature model
   * @param {Object} options - Define how the steps are run
   * @param {Array<string>? | string?} options.tags - Tags to filter which features or scenarios are run
   * @param {string?} options.name - Name of feature
   *
   * @returns {boolean} - whether any tests ran
   */
  run = async (data, options = noOpObj) => {
    // Set if were running tests for Parkin, or external tests
    // Only used for testing purposes
    const testMode = this.run.PARKIN_TEST_MODE

    // Setup step skip on failed
    skipTestsOnFail(testMode)

    const describe = getTestMethod('describe', testMode)
    const beforeAll = getTestMethod('beforeAll', testMode)
    const afterAll = getTestMethod('afterAll', testMode)
    const beforeEach = getTestMethod('beforeEach', testMode)
    const afterEach = getTestMethod('afterEach', testMode)

    // Get all the features to be run
    // Then filter them based on any options tags
    const features = this.getFeatures(data, options)
    if (!features.length) return false

    // Ensures all tests resolve before ending by
    // Using promises to resolve each feature / scenario / step
    const promises = await features.map(async feature => {
      let responses = []

      beforeAll(this.hooks.getRegistered('beforeAll'))
      afterAll(this.hooks.getRegistered('afterAll'))
      beforeEach(this.hooks.getRegistered('beforeEach'))
      afterEach(this.hooks.getRegistered('afterEach'))

      // Map over the features scenarios and call their steps
      // Store the returned promise in the responses array
      describe(`Feature: ${feature.feature}`, () => {
        responses = feature.scenarios.map((scenario, index) =>
          runScenario(
            this.steps,
            scenario,
            feature.background,
            index + 1,
            testMode
          )
        )

        // Ensure we resolve all promises inside the describe block
        Promise.all(responses)
      })

      return responses
    })

    // Ensure all promises are resolved before returning
    await Promise.all(promises)

    return true
  }
}
