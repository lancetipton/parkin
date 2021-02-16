import { matchRegex } from './regex'
import { noOpObj, isFunc } from '@keg-hub/jsutils'
import { getParamTypes, convertTypes } from './paramTypes'

const RX_OPTIONAL = /\s*\S*\(s\)\s*/g
const RX_ALT = /\s*\S*\/\S*\s*/g
const RX_EXPRESSION = /\s*{(.*?)}\s*/g
const RX_EXP_REPLACE = `(.*)`
const RX_MATCH_REPLACE = /{|}/g
const inBrowser = Boolean(typeof window !== 'undefined')

/**
 * Escapes a string so it can be converted into a regular expression
 * @function
 * @private
 * @param {string} str - Step match text to be escaped
 *
 * @return {string} Escaped string to allow converting into a regular expression
 */
const escapeStr = str => {
  return inBrowser ? str.replace(/[.*+?^$()|[\]\\]/g, '\\$&') : str
}

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
  if (!testRx.test(matcher)) return matcher

  // Set the default regex match
  let regexStr = matcher
  // Replace any expressions with regex, and convert the param types
  matcher.replace(testRx, (...args) => {
    const match = args[0].trim()
    const [ start, ...end ] = regexStr.split(match)
    const replace = isFunc(replaceWith) ? replaceWith(...args) : replaceWith

    regexStr = `${start}${replace}${end.join(match)}`
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
  const paramTypes = getParamTypes()
  const transformers = []
  const regex = runRegexCheck(match, RX_EXPRESSION, (val, ...args) => {
    // Get the expression type
    const type = val.trim().replace(RX_MATCH_REPLACE, '')
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
  const regex = runRegexCheck(
    match,
    RX_OPTIONAL,
    (val, ...args) => `${val.trim().replace('(s)', '')}s*`
  )

  return { regex }
}

/**
 * Find all alternate syntax in the match string, and convert them into into regex
 * @function
 * @private
 * @param {string} match - Step match text from feature scenario
 *
 * @return {string} match string with alternate syntax replaced
 */
const checkAlternative = match => {
  const altIndexes = []
  const regex = runRegexCheck(
    match,
    RX_ALT,
    // Use a non-capture group to allow matching, but don't include in the results (?:)
    (val, ...args) => `(?:${val.trim().replace('/', '|')})`
  )

  return { regex, altIndexes }
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
  // TODO: This needs move investigation
  // Need to ensure correct chars are escaped for all edge cases
  const escaped = escapeStr(step.match)

  const { regex } = checkOptional(escaped)
  const { regex: regexAlts } = checkAlternative(regex)
  const { regex: match, transformers } = convertToRegex(regexAlts)

  // Then call the regex matcher to get the content
  const found = matchRegex({ ...step, match }, text)

  // If no found step definition of match, return an empty object
  if (!found || !found.step || !found.match) return noOpObj

  // Convert the found variables into their type based on the mapped transformers
  const converted = convertTypes(found.match, transformers)

  // If the conversion fails, and no type is returned
  // Then assume the type does not match, so the step does not match
  // Otherwise return the matched step definition, and the converted variables
  return converted.length !== found.match.length
    ? noOpObj
    : { step, match: converted }
}
