import { matchRegex } from './regex'
import { constants } from '../constants'
import { noOpObj } from '@keg-hub/jsutils'
import { matchExpression } from './expression'

const { REGEX_VARIANT } = constants

/**
 * Finds a matching registered step definition from the passed in stepDefs and text
 * Treats all non-regex step variants as expressions
 * @function
 * @public
 * @export
 * @param {Array<Object>} stepDefs - All Registered step definitions
 * @param {string} text - Feature step text to compare with step definition text
 *
 * @returns {Object} Found matching step definition and matched arguments
 */
export const matcher = (stepDefs, text) => {
  return stepDefs.reduce((found, step) => {
    return found.match || !step.match
      ? found
      : step.variant !== REGEX_VARIANT
        ? matchExpression(step, text)
        : matchRegex(step, text)
  }, noOpObj)
}

