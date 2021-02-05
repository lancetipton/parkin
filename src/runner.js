import { parse } from './parse'
import { isArr, capitalize } from '@keg-hub/jsutils'
import {
  throwMissingSteps,
  throwMissingFeatureText,
} from './errors'

/*
 * Helper method to use the a test method can not be found on the global scope
 * @function
 * @private
 * @param {string} type - Name of test method to get from the global scope
 *
 * @returns {function} - Test method
 */
const testMethodFill = type => {
  /*
   * Internal method that throws an error when a test method does not exist on the global scope
   * @function
   * @private
   * @inner
   *
   * @returns {void}
   */
  return () => {
    throw new Error(``
      + `Test method ${type} does not exist on the global scope.\n`
      + `Please ensure ${type} exists before calling the run method!\n`
    )
  }
}

/*
 * Resolves a test method from the global scope
 * @function
 * @private
 * @param {string} type - Name of test method to get from the global scope
 *
 * @returns {function} - Test method
 */
const getTestMethod = type => (global[type] || testMethodFill(type))

/*
 * Allowed feature step types
 * @TODO - Add 'but' and 'and'
 * @Object
 * @private
 */
const stepTypes = ['given', 'when', 'then']

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
const runStep = (stepsInstance, type, text) => {
  const test = getTestMethod('test')
  return test(
    `${capitalize(type)} ${text}`,
    stepsInstance.resolve(stepsInstance[`_${type}`], text)
  )
}

/*
 * Loops through the passed in scenarios steps and calls runStep for each
 * @function
 * @private
 * @param {Object} stepsInstance - Instance of the Steps class
 * @param {Object} scenario - Parsed feature scenario object containing the steps to run 
 * @param {Object} testMethods - Test methods resolved from the global scope
 *
 * @returns {Void}
 */
const runScenario = (stepsInstance, scenario) => {
  const describe = getTestMethod('describe')

  return describe(`Scenario: ${scenario.scenario}`, () => {
    stepTypes.map(type => (
      isArr(scenario[type]) &&
        scenario[type].map(text => runStep(stepsInstance, type, text))
    ))
  })
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

  constructor(steps){
    !steps && throwMissingSteps()

    this.steps = steps
  }

  /*
  * Parses and runs the steps of a feature text string
  * Matches each step to a registered steps of the Steps class instance
  * @memberof Runner
  * @function
  * @public
  * @param {Object} stepsInstance - Instance of the Steps class
  *
  * @returns {void}
  */
  run = featureText => {
    !isStr(featureText) && throwMissingFeatureText()
  
    const features = parse(featureText)
    const describe = getTestMethod('describe')

    features.map(feature => {
      describe(`Feature: ${feature.feature}`, () => {
        feature.scenarios.map(scenario => runScenario(this.steps, scenario, testMethods))
      })
    })
  }

}