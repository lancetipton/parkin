import { Steps } from './steps'
import { parse } from './parse'
import { Runner } from './runner'
import { assemble } from './assemble'
import { registerParamType } from './matcher'
import { isObj, capitalize } from '@keg-hub/jsutils'

/**
 * @typedef
 * Parkin#Given - Register Given step definitions
 * Parkin#When - Register When step definitions
 * Parkin#Then - Register Then step definitions
 * Parkin#And - Register And step definitions
 * Parkin#But - Register But step definitions
 * Parkin#assemble - Object containing assemble helper methods
 * Parkin#assemble#feature - Assemble feature models into feature text
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

    /**
     * Runs the step definition methods matching the steps of a feature
     * @memberof Parkin
     * @alias instance&period;run
     * @function
     * @public
     *
     * @returns {function} - Run tests method for executing a features steps
     */
    this.run = this.runner.run

    /**
     * Access parse object containing feature and definition parse methods
     * @memberof Parkin
     * @alias instance&period;parse
     * @function
     * @public
     *
     * @property {function} feature - Method to parse a feature string into an object
     * @property {function} definition - Method to parse a definition string an object
     */
    this.parse = parse

    /**
     * Access assemble object containing feature assemble methods
     * @memberof Parkin
     * @alias instance&period;assemble
     * @function
     * @public
     *
     * @property {function} feature - Method to assemble a feature model into a string
     */
    this.assemble = assemble

    /**
     * Access paramTypes object containing the paramTypes register method
     * <br>Allows registering custom paramTypes within registered step definitions
     * @memberof Parkin
     * @alias instance&period;paramTypes
     * @function
     * @public
     * @example
     * const PK = new Parkin()
     * PK.paramTypes.register({ ...paramType model })
     *
     * @returns {Object} - paramTypes object container `register` param types method
     */
    this.paramTypes = { register: registerParamType }

    // Register in steps passed in on initialization
    isObj(steps) && this.registerSteps(steps)

    /**
     * Step Definition Register methods
     * @memberof Parkin
     * @alias instance&period;When
     * @function
     * @public
     * @param {string} match - Text used to matched with a features step
     * @param {function} method - Called when a features step matches the text param
     * @example
     *
     * @example
     * const PK = new Parkin()
     * PK.Given(`Given step definition matching string || regex`, ()=> {})
     * PK.When(`When step definition matching string || regex`, ()=> {})
     * PK.Then(`Then step definition matching string || regex`, ()=> {})
     * PK.And(`And step definition matching string || regex`, ()=> {})
     * PK.But(`But tep definition matching string || regex`, ()=> {})
     *
     * @returns {void}
     */
    this.steps.types.map(type => {
      this[capitalize(type)] = (matcher, method) =>
        this.steps.register(`_${type}`, type, matcher, method)
    })
  }

  /**
   * Helper for registering step definitions after the Parkin class instance has ben created
   * @memberof Parkin
   * @alias instance&period;registerSteps
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
