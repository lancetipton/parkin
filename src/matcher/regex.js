import { noOpObj } from '@keg-hub/jsutils'

/**
 * Finds a matching step definition from passed in regex
 * Then extracts the variables from the text to pass to the step definitions method
 * @function
 * @public
 * @export
 * @param {Object} step - Registered step definition
 * @param {string} text - Feature step text to compare with step definition text
 *
 * @returns {Object} Found matching step definition and matched arguments
 */
export const matchRegex = (step, text) => {
  const match = text.match(new RegExp(step.match))

  // Which is the original string
  return match
    ? { step, match: match.slice(1, match.length).filter(Boolean) }
    : noOpObj
}
