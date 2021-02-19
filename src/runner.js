import { parse } from './parse'
import { constants } from './constants'
import { isArr, capitalize, isObj, isStr } from '@keg-hub/jsutils'
import {
  throwMissingSteps,
  throwMissingFeatureText,
  testMethodFill,
} from './errors'
const { STEP_TYPES } = constants

/*
 * Resolves a test method from the global scope
 * @function
 * @private
 * @param {string} type - Name of test method to get from the global scope
 *
 * @returns {function} - Test method
 */
const getTestMethod = type => global[type] || testMethodFill(type)

/*
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

/*
 * Calls the `it` global passing in a registered step function based on the step text
 * @function
 * @private
 * @param {Object} stepsInstance - Instance of the Steps class
 * @param {string} type - Type of step being run
 * @param {string} text - Text of the step from the parsed feature text
 *
 * @returns {Void}
 */
const runStep = async (stepsInstance, step) => {
  const test = getTestMethod('test')
  // eslint-disable-next-line jest/no-test-callback
  test(`${capitalize(step.type)} ${step.step}`, async done => {
    await stepsInstance.resolve(step.step)
    done()
  })
}

/*
 * Loops through the passed in scenarios steps and calls runStep for each
 * @function
 * @private
 * @param {Object} stepsInstance - Instance of the Steps class
 * @param {Object} scenario - Parsed feature scenario object containing the steps to run
 *
 * @returns {Void}
 */
const runScenario = (stepsInstance, scenario) => {
  const describe = getTestMethod('describe')

  // Holder for the steps of each scenario
  let responses = []
  describe(`Scenario: ${scenario.scenario}`, () => {
    // Map over the steps and call them
    // Store the returned promise in the responses array
    responses = scenario.steps.map(
      async step => await runStep(stepsInstance, step)
    )

    // Ensure we resolve all promises inside the describe block
    Promise.all(responses)
  })

  return responses
}

/*
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

  /*
   * Parses and runs the steps of a feature text string
   * Matches each step to a registered steps of the Steps class instance
   * @memberof Runner
   * @function
   * @public
   * @param {string|Array<Object>|Object} data - Feature data as a string or parsed Feature model
   *
   * @returns {void}
   */
  run = async data => {
    const features = resolveFeatures(data)
    const describe = getTestMethod('describe')

    // Ensures all tests resolve before ending by
    // Using promises to resolve each feature / scenario / step
    const promises = await features.map(async feature => {
      let responses = []
      // Map over the features scenarios and call their steps
      // Store the returned promise in the responses array
      describe(`Feature: ${feature.feature}`, () => {
        responses = feature.scenarios.map(
          async scenario => await runScenario(this.steps, scenario)
        )

        // Ensure we resolve all promises inside the describe block
        Promise.all(responses)
      })

      return responses
    })

    await Promise.all(promises)

    return true
  }
}
