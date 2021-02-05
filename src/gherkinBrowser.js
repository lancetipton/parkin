import { Steps } from './steps'
import { parse } from './parse'
import { Runner } from './runner'
import { isObj, capitalize } from '@keg-hub/jsutils'

/**
 * @typedef
 * GherkinBrowser#Given - Register Given step definitions
 * GherkinBrowser#When - Register When step definitions
 * GherkinBrowser#Then - Register Then step definitions
 * GherkinBrowser#run - Run step definitions against feature
 * GherkinBrowser#parse - Parse feature file text into a feature object
 * GherkinBrowser#registerSteps - Register step definitions to be accessible when running features
*/

/**
 * Main class for handling feature files in the browser
 * Use the Steps, Runner and parser to allow executing feature file tests
 * @class
 * @public
 * @param {Object} world - Holds configuration for the running test environment
 * @param {Object} steps - Object with step type keys containing step definitions
 *
 * @returns {Object} Instance of the GherkinBrowser class
 */
export class GherkinBrowser{

  constructor(world, steps){
    this.steps = new Steps(world)
    this.runner = new Runner(this.steps)

    // Map the runners run method to the GherkinBrowser class instance
    // So it to be called directly
    this.run = this.runner.run

    // Map the parse method to the GherkinBrowser class instance
    // So it to be called directly
    this.parse = parse
    
    // Register in steps passed in on initialization
    isObj(steps) && this.registerSteps(steps)
    
    // Add the steps type register functions to the GherkinBrowser class instance
    // So they can be called directly
    this.steps.types.map(type => {
      this[capitalize(type)] = (matcher, func) => this.steps.register(`_${type}`, matcher, func)
    })

  }

  /**
   * Helper for registering step definitions after the GherkinBrowser class instance has ben created
   * @memberof GherkinBrowser
   * @function
   * @public
   * @param {Object} steps - Object with step type keys containing step definitions
   * @example
   *   // Example steps object passed in as the first argument
   *   const steps = {
   *     given: {
   *       // Key / Value pair of matcher text and corresponding function
   *       `I goto page {url}`: () => {},
   *     },
   *     when: { ... },
   *     then: { ... }
   *   }
   *
   * @returns {void}
   */
  registerSteps = steps => {
    // Loop the steps object
    Object.entries(steps)
      .map((type, typedSteps) => (
        // Loop each step type ( Given, When, Then )
        Object.entries(typedSteps)
          .map((matcher, func) => (
            // Register the step based by type with the Step class instance
            this.steps[capitalize(type)](matcher, func)
          ))
      ))
  }

}