import { Steps } from './steps'
import { Hooks } from './hooks'
import { Runner } from './runner'
import { assemble } from './assemble'
import { registerParamType } from './matcher'
import { parseFeature, parseDefinition } from './parse'
import { isObj, capitalize, noOpObj, eitherArr } from '@keg-hub/jsutils'

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
    isObj(world) && this.init(world, steps)
  }

  #isInit = false

  init = (world = noOpObj, steps) => {
    if (this.#isInit)
      return console.warn(
        `This instance of parkin has already been initialized!`
      )

    // Set isInit, so we can't re-initialized
    this.#isInit = true

    this.steps = new Steps(world)
    this.hooks = new Hooks()
    this.runner = new Runner(this.steps, this.hooks)

    /**
     * Runs the step definition methods matching the steps of a feature
     * @memberof Parkin
     * @alias instance&period;run
     * @param {string|Array<Object>|Object} data - Feature data as a string or parsed Feature model
     * @param {Object} options - options object
     * @param {string?} options.name - optional name to filter features by
     * @param {Array<string>} options.tags - optional tags to filter features by
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
    this.parse = {
      feature: parseFeature.bind(this),
      definition: parseDefinition.bind(this),
    }

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
     * @param {Object} meta - Object describing the functionality of the step definition
     * @example
     * const PK = new Parkin()
     * PK.Given(`Given step definition string || regex`, ()=> {}, {})
     * PK.When(`When step definition string || regex`, ()=> {}, {})
     * PK.Then(`Then step definition string || regex`, ()=> {}, {})
     * PK.And(`And step definition string || regex`, ()=> {}, {})
     * PK.But(`But step definition string || regex`, ()=> {}, {})
     *
     * @returns {void}
     */
    this.steps.types.map(type => {
      this[capitalize(type)] = (matcher, method, meta) =>
        this.steps.register(`_${type}`, type, matcher, method, meta)
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
   *       // Value can also be an array with a function and meta data (i.e. [function, meta] )
   *       `I goto page {url}`: [() => {}, { //...definition meta data  }],
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
      // Loop each step type ( Given, When, Then, But, And )
      Object.entries(typedSteps).map((matcher, content) =>
        // Register the step based by type with the Step class instance
        this.steps[capitalize(type)](matcher, ...eitherArr(content, [content]))
      )
    )
  }
}

// Also export a instance of the class
// This allows us to re-use the same instance as a singleton
export const PKInstance = new Parkin()
