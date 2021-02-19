import { parse } from './parse'
import { constants } from './constants'
import { isArr, capitalize, isObj, isStr, get, noOp, noOpObj, noPropArr } from '@keg-hub/jsutils'
import {
  throwMissingSteps,
  throwMissingFeatureText,
  testMethodFill,
} from './errors'
const { STEP_TYPES } = constants

/**
 * Resolves a test method from the global scope
 * Returns a NOOP when getTestMethod.PARKIN_TEST_MODE is true
 * This allows testing the runner methods, without running the tests
 * @function
 * @private
 * @param {string} type - Name of test method to get from the global scope
 * @param {boolean} testMode - Allows testing the runner methods, without running the tests
 *
 * @returns {function} - Test method
 */
const getTestMethod = (type, testMode) => {
  // To write tests for the runner, we have to override the default test methods
  // This allows testing the runner methods, without running the tests
  return testMode ? noOp : (global[type] || testMethodFill(type))
}

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
    ? parse.feature(data)
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
  // eslint-disable-next-line jest/no-test-callback
  test(`${capitalize(step.type)} ${step.step}`, async done => {
    await stepsInstance.resolve(step.step)
    done()
  })
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
const runScenario = (stepsInstance, scenario, testMode) => {
  const describe = getTestMethod('describe', testMode)

  // Holder for the steps of each scenario
  let responses = []
  describe(`Scenario: ${scenario.scenario}`, () => {
    // Map over the steps and call them
    // Store the returned promise in the responses array
    responses = scenario.steps.map(
      async step => await runStep(stepsInstance, step, testMode)
    )

    // Ensure we resolve all promises inside the describe block
    Promise.all(responses)
  })

  return responses
}

/**
 * Filters the passed in items based on the passed in tag array
 * @function
 * @private
 * @param {Array} items - Items to filter based on the tags array
 * @param {Array} tags - Tags to filter which items will be returned
 *
 * @returns {Array} - Items with a tag matching a tag in the tags array
 */
const getTaggedItems = (items, tags) => {
  return items.filter(item => {
    if(!isArr(item.tags) || !item.tags.length) return false

    const itemTags = item.tags.map(tag => tag.replace('@', ''))
    return tags.find(tag => itemTags.includes(tag.replace('@', '')))
  }, [])
}

/**
 * Filters features and scenarios based on the passed in tag options
 * @function
 * @private
 * @param {Array} features - Features to be run
 * @param {Array} tags - Tags to filter which Features and scenarios will be run
 *
 * @returns {Array} - Filtered features that should be run
 */
const filterFromTags = (features, tags) => {
  // If no tags, then run all features
  return !tags || isArr(tags) && !tags.length
    ? features
    // Get all the tagged features, removing any non-tagged features
    : getTaggedItems(features, tags)
        .reduce((filtered, feature) => {
          // Get all tagged scenarios, removing any non-tagged scenarios
          const tagScenarios = getTaggedItems(feature.scenarios, tags)

          // If tagged scenarios were 
          //  * FOUND - Only include the matching tagged scenarios
          //  * NOT FOUND - All scenarios will be run, because the feature had a matching tag
          tagScenarios.length
            ? filtered.push({ ...features, scenarios: tagScenarios })
            : filtered.push(feature)

          return filtered
        }, [])
}

/**
 * Parses and runs the steps of a feature text string
 * Uses the registered steps of the passed in Steps class instance to evaluate the feature steps
 * @class
 * @public
 * @param {Object} stepsInstance - Instance of the Steps class
 *
 * @returns {Object} Instance of the Runner class
 */
export class Runner {
  constructor(steps) {
    !steps && throwMissingSteps()

    this.steps = steps
  }

  /**
   * Parses and runs the steps of a feature text string
   * Matches each step to a registered steps of the Steps class instance
   * @memberof Runner
   * @function
   * @public
   * @param {string|Array<Object>|Object} data - Feature data as a string or parsed Feature model
   * @param {Object} options - Define how the steps are run
   * @param {Object} options.tags - Tags to filter which features or scenarios are run
   *
   * @returns {void}
   */
  run = async (data, options=noOpObj) => {
    // Set if were running tests for Parkin, or external tests
    // Only used for testing purposes
    const testMode = this.run.PARKIN_TEST_MODE
    const describe = getTestMethod('describe', testMode)

    // Get all the features to be run
    // Then filter them based on any options tags
    const features = filterFromTags(resolveFeatures(data), options.tags)

    // Ensures all tests resolve before ending by
    // Using promises to resolve each feature / scenario / step
    const promises = await features.map(async feature => {
      let responses = []
      // Map over the features scenarios and call their steps
      // Store the returned promise in the responses array
      describe(`Feature: ${feature.feature}`, () => {
        responses = feature.scenarios.map(
          async scenario => await runScenario(this.steps, scenario, testMode)
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
