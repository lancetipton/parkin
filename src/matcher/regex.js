import { noOpObj, getWordEndingAt } from '@keg-hub/jsutils'
import { getParamTypes } from './paramTypes'

import { RX_OPTIONAL, RX_ALT, RX_PARAMETER, RX_MATCH_REPLACE } from './patterns'

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
 * @return {string} the correct regex source text for an step definition
 * optional part. This regex will be used for matching values in the
 * feature step text.
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
 * Helper for `parseMatch` that gets the right regex
 * for a step's dynamic part
 * @param {string} type - optional, alternate, or parameter
 * @param {string} match = regex match results
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
 */
const parseMatch = (matchArr, type = 'other') => {
  const val = matchArr[0]

  return {
    text: val.trim(),
    index: matchArr.index,
    input: matchArr.input,
    regex: getMatchRegex(type, matchArr),
    type,
    ...(type === 'parameter' && {
      paramType: val.trim().replace(RX_MATCH_REPLACE, ''),
    }),
  }
}

/**
 * Extracts all the dynamic parts to a step definition's match text
 * @param {string} stepMatcher - step definition match text
 * @return {Array<Object>} array of matches. See `parseMatch` for the structure.
 * @example
 * const parts = getRegexParts('I eat {int} apple(s)')
 * result:
 * [
 *  { type: 'parameter', text: '{int}', regex: /-?[0-9]+/, paramType: 'int', ... } ,
 *  { type: 'optional', text: 'apple(s)', regex: /(apple|apples)/, ... } ,
 * ]
 */
export const getRegexParts = stepMatcher => {
  const parameters = [
    ...stepMatcher.matchAll(new RegExp(RX_PARAMETER, 'gi')),
  ].map(match => parseMatch(match, 'parameter'))

  const optionals = [
    ...stepMatcher.matchAll(new RegExp(RX_OPTIONAL, 'gi')),
  ].map(match => parseMatch(match, 'optional'))

  const alts = [...stepMatcher.matchAll(new RegExp(RX_ALT, 'gi'))].map(match =>
    parseMatch(match, 'alternate')
  )

  // sort matched expressions by their index in the text
  const sortedExpressions = [ ...parameters, ...optionals, ...alts ].sort(
    (matchA, matchB) => matchA.index - matchB.index
  )

  return sortedExpressions
}
