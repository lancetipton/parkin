import { matchRegex } from './regex'
import { constants } from '../constants'
import { paramTypes } from './paramTypes'
import {
  noOpObj,
  toStr,
  toInt,
  toFloat,
  isFunc,
  checkCall,
  exists
} from '@keg-hub/jsutils'

const RX_OPTIONAL = /\s*\S*\(s\)\s*/g
const RX_ALT = /\s*\S*\/\S*\s*/g
const RX_EXPRESSION = /\s*{(.*?)}\s*/g
const RX_EXP_REPLACE = `\\s*(.*)\\s*`
const RX_MATCH_REPLACE = /{|}/g


/**
 * Replace the passed in matcher string with the passed in replaceWith data based on the testRx
 * @function
 * @private
 * @param {string} match - Step match text from feature scenario
 * @param {string} testRx - Regular expression to find matching text within the matcher text
 * @param {string|function} replaceWith - Data to replace the matched data with
 *                                        Automatically called when it's function
 *
 * @return {string} match string with matched content replaced with regex
 */
const runRegexCheck = (matcher, testRx, replaceWith) => {
  if(!testRx.test(matcher)) return matcher

   // Set the default regex match
  let regexStr = matcher
  // Replace any expressions with regex, and convert the param types
  matcher.replace(testRx, (...args) => {
    const [match] = args
    const [ start, end ] = regexStr.split(match.trim())
    const replace = isFunc(replaceWith) ? replaceWith(...args) : replaceWith

    regexStr = `${start}${replace}${end}`
  })

  return regexStr

}

/**
 * Find all expressions in the match string, and convert them into into regex
 * @function
 * @private
 * @param {string} match - Step match text from feature scenario
 *
 * @return {string} match string with expression replaced
 */
const convertToRegex = match => {
  const transformers = []
  const regex = runRegexCheck(match, RX_EXPRESSION, match => {
    // Get the expression type
    const type = match.trim().replace(RX_MATCH_REPLACE, '')

    // Add the transformer for the type to the transformers array
    transformers.push(paramTypes[type] || paramTypes.any)
    // Return the regex 
    return RX_EXP_REPLACE
  })

  return { regex, transformers }
}

/**
 * Find all optional syntax in the match string, and convert them into into regex
 * @function
 * @private
 * @param {string} match - Step match text from feature scenario
 *
 * @return {string} match string with optional syntax replaced
 */
const checkOptional = match => {
  const regex = runRegexCheck(match, RX_OPTIONAL, match => `${match.trim().replace('(s)', '')}s*`)
  return { regex }
}

/**
 *
 * ---------------------------- FIX ME ----------------------------
 * This is failing, because optional is not finding required
 * In the regex match. Need to update optional regex to include all optional types
 * Problem is, by doing this they are then included in the final regex args
 * Which are used as the actual values
 * Need to figure out a way to filter them out, so they are not included,
 * But still used when matching step to step definition
 * ---------------------------- FIX ME ----------------------------
 *
 * Find all alternate syntax in the match string, and convert them into into regex
 * @function
 * @private
 * @param {string} match - Step match text from feature scenario
 *
 * @return {string} match string with alternate syntax replaced
 */
const checkAlternative = match => {
  const regex = runRegexCheck(match, RX_ALT, match => match.trim().replace('/', '|'))
  return { regex }
}

/**
 * Finds a matching step definition from passed in expression text
 * Then extracts the variables from the text to pass to the step definitions method
 * Converts expression strings into regex then calls the matchRegex method
 * @function
 * @public
 * @export
 * @param {Object} step - Registered step definition
 * @param {string} text - Feature step text to compare with step definition text
 *
 * @returns {Object} Found matching step definition and matched arguments
 */
export const matchExpression = (step, text) => {

  const { regex } = checkOptional(step.match, text)
  const { regex:regexAlts, alternates } = checkAlternative(regex)
  const { regex:match, transformers } = convertToRegex(regexAlts)

  // // Then call the regex matcher to get the content
  const found = matchRegex({ ...step, match }, text)

  // If no found step definition of match, return an empty object
  if(!found || !found.step || !found.match) return noOpObj

  // Convert the found variables into their type based on the mapped transformers
  const converted = found.match
    .map((item, index) => {
      const paramType = transformers[index]
      const asType = checkCall(transformers[index].transformer, item)

      return typeof asType === paramType.type ? asType : null
    })
    .filter(item => exists(item) && item)

  // If the conversion fails, and no type is returned
  // Then assume the type does not match, so the step does not match
  // Otherwise return the matched step definition, and the converted variables
  return converted.length !== found.match.length
    ? noOpObj
    : { step, match: converted }

}
