import { noOpObj, getWordEndingAt } from '@keg-hub/jsutils'
import { getParamTypes } from './paramTypes'

import { RX_OPTIONAL, RX_ALT, RX_PARAMETER, RX_MATCH_REPLACE } from './patterns'

/**
 * Finds a matching definition from passed in regex
 * Then extracts the variables from the text to pass to the definitions method
 * @function
 * @public
 * @export
 * @param {Object} definition - Registered definition model
 * @param {string} text - Feature step text to compare with definition match text
 *
 * @returns {Object} Found matching definition and matched arguments
 */
export const matchRegex = (definition, text) => {
  const match = text.match(new RegExp(definition.match))

  // Which is the original string
  return match
    ? { definition, match: match.slice(1, match.length).filter(Boolean) }
    : noOpObj
}

/**
 * Converts an optional expression into regex
 * @param {string} optional
 * @return {string} regex for an optional cucumber-expression
 * @example
 * toAlternateRegex('test(s)')
 * result: '(test|tests)'
 */
export const toAlternateRegex = optional => {
  const split = optional.split(/(\(|\))/)

  const [ start, , middle, , end ] = split

  // no words outside of optional boundary
  if (start === '' && end === '') return optional + '?'
  else if (start === '') return `(${middle}|${middle}${end})`
  else if (end === '') return `(${start}|${start}${middle})`
  else return `(${start}${end}|${start}${middle}${end})`
}

/**
 * Gets the full text around an optional
 * @param {Array<string>} match result of optional regex match
 */
const getFullOptionalText = match => {
  const text = match.input
  const precedingWord = getWordEndingAt(text, match.index)
  return precedingWord + match[0]
}

/**
 * Helper for `getParamRegex` to get the optional types regex
 * @param {Array<string>} match result of optional regex match
 *
 * @return {string} - The correct regex source text for a definition optional part
 *                    This regex will be used for matching values in the feature step text
 */
const getOptionalRegex = match => {
  const optionalText = getFullOptionalText(match)
  return toAlternateRegex(optionalText)
}

/**
 * Returns regex source for a given parameter type
 * @param {string} type - cucumber-expression parameter type: float, int, word, or string
 * @return {string} regex source text
 */
export const getParamRegex = type => {
  const params = getParamTypes()
  const spec = params[type] || params.any
  return spec.regex.source
}

/**
 * Gets the right regex for an alternate part
 * @param {string} value the regex match's text
 * @return {string} regex source for an alternate part
 */
export const getAlternateRegex = value => {
  return `(${value.trim().replace(/\//g, '|')})`
}

/**
 * Helper for `parseMatch` that gets the right regex for a step's dynamic content
 * @param {string} type - optional, alternate, or parameter
 * @param {string} match = regex match results
 *
 * @returns {Object|null} - RegEx object if the type matches
 */
const getMatchRegex = (type, match) => {
  const [ val, paramType ] = match

  switch (type) {
  case 'parameter':
    return new RegExp(getParamRegex(paramType))
  case 'optional':
    return new RegExp(getOptionalRegex(match))
  case 'alternate':
    return new RegExp(getAlternateRegex(val))
  default:
    return null
  }
}

/**
 * Formats the regex match result into an object,
 * with some computed values
 * @param {Array} matchArr
 * @param {string} type
 *
 * @returns {Object} - Formatted dynamic step parameter as a metadata object
 */
const parseMatch = (matchArr, type = 'other') => {
  const val = matchArr[0]

  // Get the real start index by removing the start white space
  const trimmed = val.trimStart()

  // Then calculate the difference and add it to the match index
  const diff = val.length - trimmed.length

  return {
    text: val.trim(),
    input: matchArr.input,
    index: matchArr.index + diff,
    regex: getMatchRegex(type, matchArr),
    type,
    ...(type === 'parameter' && {
      paramType: val.trim().replace(RX_MATCH_REPLACE, ''),
    }),
  }
}

/**
 * Extracts all the dynamic parts to a definition's match text
 * @param {string} defMatcher - Registered definition match text
 * @return {Array<Object>} array of matches. See `parseMatch` for the structure.
 * @example
 * const parts = getRegexParts('I eat {int} apple(s)')
 * result:
 * [
 *  { type: 'parameter', text: '{int}', regex: /-?[0-9]+/, paramType: 'int', ... } ,
 *  { type: 'optional', text: 'apple(s)', regex: /(apple|apples)/, ... } ,
 * ]
 *
 * @returns {Array} - Sorted found dynamic content match the order from a features step text
 */
export const getRegexParts = defMatcher => {
  const parameters = [
    ...defMatcher.matchAll(new RegExp(RX_PARAMETER, 'gi')),
  ].map(match => parseMatch(match, 'parameter'))

  const optionals = [...defMatcher.matchAll(new RegExp(RX_OPTIONAL, 'gi'))].map(
    match => parseMatch(match, 'optional')
  )

  const alts = [...defMatcher.matchAll(new RegExp(RX_ALT, 'gi'))].map(match =>
    parseMatch(match, 'alternate')
  )

  // sort matched expressions by their index in the text
  const sortedExpressions = [ ...parameters, ...optionals, ...alts ].sort(
    (matchA, matchB) => matchA.index - matchB.index
  )

  return sortedExpressions
}
