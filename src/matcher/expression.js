import {
  matchRegex,
  getRegexParts,
  getParamRegex,
  toAlternateRegex,
  getAlternateRegex,
} from './regex'

import {
  RX_OPTIONAL,
  RX_ALT,
  RX_EXPRESSION,
  RX_MATCH_REPLACE,
  RX_PARAMETER,
} from './patterns'

import { hasWindow } from '../utils/globalScope'
import { noOpObj, isFunc } from '@keg-hub/jsutils'
import { getParamTypes, convertTypes } from './paramTypes'

/**
 * Escapes a string so it can be converted into a regular expression
 * Ensures special chars are escaped, a string with "." in it will be replaced with "\."
 * @function
 * @private
 * @param {string} str - Step match text to be escaped
 *
 * @return {string} Escaped string to allow converting into a regular expression
 */
const escapeStr = str => {
  return hasWindow
    ? str.replace(/[|\\[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')
    : str.replace(/[|\\[\]^$+*?.]/g, '\\$&')
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
 * @return {Object} { regex: match string with expression replaced, transformers: Array of transformer objects }
 */
const convertToRegex = match => {
  const paramTypes = getParamTypes()
  const transformers = []
  const regex = runRegexCheck(match, RX_EXPRESSION, (val, ...args) => {
    // Get the expression type
    const type = val.trim().replace(RX_MATCH_REPLACE, '')
    const isParameter = val.match(RX_PARAMETER)
    const isOptional = val.match(RX_OPTIONAL)

    // Add the transformer for the type to the transformers array
    isParameter && transformers.push(paramTypes[type] || paramTypes.any)

    // Return the regex
    return isParameter
      ? getParamRegex(type)
      : isOptional
        ? toAlternateRegex(val)
        : val
  })

  return { regex, transformers }
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
    new RegExp(RX_ALT, 'g'),
    // Use a non-capture group to allow matching, but don't include in the results (?:)
    getAlternateRegex
  )

  return { regex, altIndexes }
}

/**
 * Adds regex anchors to the ends of the regex string, if it needs them
 * @param {string} str
 * @return {string} with anchors
 */
const checkAnchors = str => {
  let final = str
  if (!str.startsWith('^')) final = '^' + final
  if (!str.endsWith('$')) final += '$'

  return { regex: final }
}

/**
 * Extracts the dynamic cucumber-expression parameters from the text,
 * given the step matcher template and the fullMatchResults
 * @param {string} text
 * @param {RegExp} stepMatcher
 * @param {Array} wordMatches - matches for the {word} params
 */
const extractParameters = (text, stepMatcher, wordMatches) => {
  // Gets an array of each dynamic element of the step match text,
  // including: params (e.g. {float}), optionals (e.g. test(s))
  // and alternate text (e.g. required/optional)
  const parts = getRegexParts(stepMatcher)
  const expectedParamLength = parts.filter(
    part => part.type === 'parameter'
  ).length

  // extract the params from the text, using the parts array
  const result = parts.reduce(
    (state, part) => {
      const { params, textIndex, wordMatchIndex } = state

      // look at the section of the text we haven't already evaluated
      const substring = text.substring(textIndex)

      const isWord = part.paramType === 'word'
      const partMatch = substring.match(part.regex)
      const wordMatch = {
        0: wordMatches[wordMatchIndex],
        index: substring.indexOf(wordMatches[wordMatchIndex]),
      }

      // if matching a param {word}, then use the wordMatch, because
      // it contains all the {word} matches properly
      const match = isWord ? wordMatch : partMatch
      if (!match) return state

      // add the matched parameter if the current part is a param and a match exists
      part.type === 'parameter' && match && params.push(match[0])

      return {
        params,

        // increment text index so that we don't reevaluate the same text in future iterations
        textIndex: textIndex + (match && match.index + match[0].length),

        // increment match index so we don't repeat a word in future iterations
        wordMatchIndex: wordMatchIndex + (isWord && 1),
      }
    },
    { params: [], textIndex: 0, wordMatchIndex: 0 }
  )

  return expectedParamLength === result.params.length ? result.params : null
}

/**
 * Finds a matching definition from the passed in expression text
 * Then extracts the variables from the text to pass to the definitions method
 * Converts expression strings into regex then calls the matchRegex method
 * @function
 * @public
 * @export
 * @param {Object} definition - Registered definition
 * @param {string} text - Feature step text to compare with definition text
 *
 * @returns {Object} Found matching definition and matched arguments
 *  - form: { definition, match: Array of Arguments to pass to definitions function }
 */
export const matchExpression = (definition, text, $world) => {
  // If it's an exact match, then no variables can exist
  // So we can short circuit and return the definition
  if (definition.match === text) return { definition, match: [] }

  const escaped = escapeStr(definition.match)
  const { regex: regexAlts } = checkAlternative(escaped)
  const { regex: convertedRegex, transformers } = convertToRegex(regexAlts)
  const { regex: match } = checkAnchors(convertedRegex)

  // Then call the regex matcher to get the content
  const found = matchRegex({ ...definition, match }, text)

  // If no found definition or match, return an empty object
  if (!found || !found.definition || !found.match) return noOpObj

  // get all the parameters, without any type coercion
  const params = extractParameters(text, definition.match, found.match)
  if (!params) return noOpObj

  // Convert the found variables into their type based on the mapped transformers
  const converted = convertTypes(params, transformers, $world)

  // If the conversion fails, and no variable or not enough variables are returned,
  // Then assume the type does not match, so the step does not match.
  // Otherwise return the matched definition, and the converted variables
  return converted.length !== params.length
    ? noOpObj
    : { definition, match: converted }
}
