import type {
  TStepDef,
  TFindOpts,
  TRegExFoundResp
} from '../types'

import { getParamTypes } from './paramTypes'
import { isStr, emptyObj, getWordEndingAt } from '@keg-hub/jsutils'
import { RX_OPTIONAL, RX_ALT, RX_PARAMETER, RX_MATCH_REPLACE } from './patterns'


/**
 * Finds a matching definition from passed in regex
 * Then extracts the variables from the text to pass to the definitions method
 * @function
 * @public
 * @export
 *
 */
export const matchRegex = (
  definition:TStepDef,
  text:string
):TRegExFoundResp => {

  const match = text.match(new RegExp(definition.match))

  // Which is the original string
  return match
    ? { definition, match: match.slice(1, match.length).filter(Boolean) }
    : emptyObj
}

/**
 * Converts an optional expression into regex
 *
 * @example
 * toAlternateRegex('test(s)')
 * result: '(test|tests)'
 *
 */
export const toAlternateRegex = (optional:string) => {
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
 *
 */
const getFullOptionalText = (matchArr:RegExpMatchArray) => {
  const text = matchArr.input
  const precedingWord = getWordEndingAt(text, matchArr.index)
  return precedingWord + matchArr[0]
}

/**
 * Helper for `getParamRegex` to get the optional types regex
 * Return the correct regex source text for a definition optional part
 * This regex will be used for matching values in the feature step text
 *
 */
const getOptionalRegex = (matchArr:RegExpMatchArray) => {
  const optionalText = getFullOptionalText(matchArr)
  return toAlternateRegex(optionalText)
}

/**
 * Returns regex source for a given parameter type
 *
 */
export const getParamRegex = (
  type:string,
  partial:boolean
) => {
  const params = getParamTypes()
  const spec = params[type] || params.any
  const refEx = partial && spec.partial ? spec.partial : spec.regex

  return isStr(refEx) ? refEx : refEx.source
}

/**
 * Gets the right regex for an alternate part
 *
 */
export const getAlternateRegex = (value:string) => {
  return `(${value.trim().replace(/\//g, '|')})`
}

/**
 * Helper for `parseMatch` that gets the right regex for a step's dynamic contents
 *
 */
const getMatchRegex = (
  type:string,
  matchArr:RegExpMatchArray,
  opts?:TFindOpts
) => {
  const [ val, paramType ] = matchArr

  switch (type) {
  case 'parameter':
    return new RegExp(getParamRegex(paramType, opts?.partial))
  case 'optional':
    return new RegExp(getOptionalRegex(matchArr))
  case 'alternate':
    return new RegExp(getAlternateRegex(val))
  default:
    return null
  }
}

/**
 * Formats the regex match result into an object, with some computed values
 *
 */
const parseMatch = (
  matchArr:RegExpMatchArray,
  type:string = 'other',
  opts?:TFindOpts
) => {
  const val = matchArr[0]

  // Get the real start index by removing the start white space
  const trimmed = val.trimStart()

  // Then calculate the difference and add it to the match index
  const diff = val.length - trimmed.length

  return {
    text: val.trim(),
    input: matchArr.input,
    index: matchArr.index + diff,
    regex: getMatchRegex(type, matchArr, opts),
    type,
    ...(type === 'parameter' && {
      paramType: val.trim().replace(RX_MATCH_REPLACE, ''),
    }),
  }
}

/**
 * Extracts all the dynamic parts to a definition's match text
 *
 * @example
 * const parts = getRegexParts('I eat {int} apple(s)')
 * result:
 * [
 *  { type: 'parameter', text: '{int}', regex: /-?[0-9]+/, paramType: 'int', ... } ,
 *  { type: 'optional', text: 'apple(s)', regex: /(apple|apples)/, ... } ,
 * ]
 *
 */
export const getRegexParts = (defMatcher:string, opts:TFindOpts=emptyObj) => {
  const parameters = [
    ...defMatcher.matchAll(new RegExp(RX_PARAMETER, 'gi')),
  ].map((match) => parseMatch(match, 'parameter', opts))

  const optionals = [...defMatcher.matchAll(new RegExp(RX_OPTIONAL, 'gi'))].map(
    match => parseMatch(match, 'optional', opts)
  )

  const alts = [...defMatcher.matchAll(new RegExp(RX_ALT, 'gi'))].map(match =>
    parseMatch(match, 'alternate', opts)
  )

  // sort matched expressions by their index in the text
  const sortedExpressions = [ ...parameters, ...optionals, ...alts ].sort(
    (matchA, matchB) => matchA.index - matchB.index
  )

  return sortedExpressions
}
