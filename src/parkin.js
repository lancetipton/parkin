import { Steps } from './steps'
import { parse } from './parse'
import { Runner } from './runner'
import { registerParamType } from './matcher'
import { isObj, capitalize } from '@keg-hub/jsutils'

/**
 * @typedef
 * Parkin#Given - Register Given step definitions
 * Parkin#When - Register When step definitions
 * Parkin#Then - Register Then step definitions
 * Parkin#run - Run step definitions against feature
 * Parkin#parse - Object containing parse helper methods
 * Parkin#parse#feature - Parse feature file text into a feature object
 * Parkin#parse#definition - Parse definition file text into a step definition objects
 * Parkin#registerSteps - Register step definitions to be accessible when running features
 * Parkin#paramTypes - Object containing param type helper methods
 * Parkin#paramTypes#register - Register custom paramTypes for step definitions
 */

/**
 * Main class for handling feature files in the browser
 * Use the Steps, Runner and parser to allow executing feature file tests
 * @class
 * @public
 * @param {Object} world - Holds configuration for the running test environment
 * @param {Object} steps - Object with step type keys containing step definitions
 *
 * @returns {Object} Instance of the Parkin class
 */
export class Parkin {
  constructor(world, steps) {
    this.steps = new Steps(world)
    this.runner = new Runner(this.steps)

    // Map the runners run method to the Parkin class instance
    // So it to be called directly
    this.run = this.runner.run

    // Map the parse method to the Parkin class instance
    // So it to be called directly
    this.parse = parse

    // Add the paramTypes register method
    // Allows registering custom paramTypes
    this.paramTypes = { register: registerParamType }

    // Register in steps passed in on initialization
    isObj(steps) && this.registerSteps(steps)

    // Add the steps type register functions to the Parkin class instance
    // So they can be called directly
    this.steps.types.map(type => {
      this[capitalize(type)] = (matcher, method) =>
        this.steps.register(`_${type}`, type, matcher, method)
    })
  }

  /**
   * Helper for registering step definitions after the Parkin class instance has ben created
   * @memberof Parkin
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
    Object.entries(steps).map((type, typedSteps) =>
      // Loop each step type ( Given, When, Then )
      Object.entries(typedSteps).map((matcher, method) =>
        // Register the step based by type with the Step class instance
        this.steps[capitalize(type)](matcher, method)
      )
    )
  }
}
