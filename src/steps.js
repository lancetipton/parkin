import { capitalize } from '@keg-hub/jsutils'
import { throwNoMatchingStep } from './errors'

const sanitize = step => {
  let name = step.matcher.toString()
  if (name[0] === '^') name = name.substr(1)
  if (name.charAt(name.length - 1) === '$') name = name.slice(0, -1)

  return name.replace(/\(\?:([^\|]+)+\|+([^\)]+)?\)/, '$1')
}

/**
 * Finds a matching registered step definition from the passed in list and text
 * @todo - Update to parse expression and regex vars from the text param
 * @function
 * @private
 * @param {Array<Object>} list - Registered step definition 
 * @param {string} text - Feature step text to compare with step definition text
 *
 * @returns {Object} Found matching step definition and matched arguments
 */
const findMatch = (list, text) => {
  return list.reduce((found, step) => {
    if(found.match || !step.matcher) return found

    let regex = step.matcher

    step.type !== 'regex' &&
      step.matcher.replace(/\s*{(.*?)}\s*/g, (...args) => {
        const [ match, _, index, full ] = args
        const [ start, end ] = regex.split(match.trim())
        regex = start + `\\s*(.*)\\s*` + end
      })

    const match = text.match(new RegExp(regex))

    return match ? { match, step } : found
  }, {})
}

/**
 * Allows registering step definition matchers and functions
 * Which are used to map to steps of a parsed feature file
 * @class
 * @public
 * @param {Object} world - Holds configuration for the running test environment
 *
 * @returns {Object} Instance of the Steps class
 */
export class Steps {

  /**
  * Allowed step definition types
  * @todo - Add 'but' and 'and' types, which resolve to `when` and `then`
  * @memberof Steps
  * @Array
  * @private
  */
  types = [ 'given', 'when', 'then' ]

  constructor(world){
    this._world = world || {}
    const self = this
  /**
   * Creates helpers for registering step definitions by type
   * @memberof Steps
   * @function
   * @public
   * @param {string} matcher - Text used to matched with a features step
   * @param {function} method - Function called when a features step text matches the text param
   * @example
   * const steps = new Steps({})
   * steps.Given(`text`, ()=> {})
   *
   * @returns {void}
   */
    this.types.map(type => {
      const internalType = `_${type}`
      this[internalType] = []
      this[capitalize(type)] = (matcher, method) => self.register(internalType, matcher, method)
    })

  }

  /**
   * Finds a matching step definition from the passed in list and text can calls it
   * This is the method the actually calls a step definition function
   * @memberof Steps
   * @function
   * @public
   * @param {Array<Object>} list - Group of registered step definition
   * @param {string} text - Feature step text to compare with step definition text
   *
   * @returns {*} - Response from the step definition function
   */
  resolve = (list, text) => {
    const { match, step } = findMatch(list, text)
    // If not step of match, then throw
    // No matching step definition exists
    if(!match || !step) return throwNoMatchingStep(text)

    // Add the steps world to the match arguments
    match[0] = this._world

    // Call the step function passing the match array as arguments
    return step.method(...match)
  }

  /**
   * Registers a step definition by type
   * @memberof Steps
   * @function
   * @public
   * @param {string} type - Type of step definition to search when matching
   * @param {string} matcher - Text used to matched with a features step
   * @param {function} method - Function called when a features step text matches the text param
   *
   * @returns {void}
   */
  register = (type, matcher, method) => {
    const step = {
      method,
      matcher,
      content: method.toString(),
      type: matcher.toString().indexOf('/') === 0 ? `regex` : `expression`
    }
    step.name = sanitize(step)
  
    this[type].push(step)
  
  }

}