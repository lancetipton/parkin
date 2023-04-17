import type {
  TStepDef,
  TFindOpts,
  TTokenOpts,
  TRegExFoundResp,
} from '../types'

import { EPartMatchTypes } from '../types'
import { getParamTypes } from './paramTypes'
import { includePartType } from '../utils/helpers'
import { emptyArr, isStr, emptyObj, getWordEndingAt } from '@keg-hub/jsutils'
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
  const start = split.shift()
  const end = split.pop()
  const middle = split.join(``)
  const original = optional.replace(/(\(|\))/ig, `\\$1`)

  if (start === '' && end === '') return `(${original}|${optional.replace(/(\(|\))/gi, ``)})?`
  else if (start === '') return `(${original}|${middle}|${middle}${end})`
  else if (end === '') return `(${original}|${start}|${start}${middle})`
  else return `(${original}|${start}${end}|${start}${middle}${end})`
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
  case EPartMatchTypes.parameter:
    return new RegExp(getParamRegex(paramType, opts?.partial))
  case EPartMatchTypes.optional:
    return new RegExp(getOptionalRegex(matchArr))
  case EPartMatchTypes.alternate:
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
    ...(type === EPartMatchTypes.parameter && {
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
 *  { type: EPartMatchTypes.parameter, text: '{int}', regex: /-?[0-9]+/, paramType: 'int', ... } ,
 *  { type: EPartMatchTypes.optional, text: 'apple(s)', regex: /(apple|apples)/, ... } ,
 * ]
 *
 */
export const getRegexParts = (defMatcher:string, opts:TTokenOpts=emptyObj) => {

  const { include, exclude } = opts
  const inArr = Boolean(include?.length) ? include : undefined
  const exArr = Boolean(exclude?.length) ? exclude : undefined

  const parameters = includePartType(EPartMatchTypes.parameter, opts, inArr, exArr)
    ? [...defMatcher.matchAll(new RegExp(RX_PARAMETER, 'gi')),]
        .map((match) => parseMatch(match, EPartMatchTypes.parameter, opts))
    : emptyArr

  const optionals = includePartType(EPartMatchTypes.optional, opts, inArr, exArr)
    ? [...defMatcher.matchAll(new RegExp(RX_OPTIONAL, 'gi'))]
        .map(match => parseMatch(match, EPartMatchTypes.optional, opts))
    : emptyArr

  const alts = includePartType(EPartMatchTypes.alternate, opts, inArr, exArr)
    ? [...defMatcher.matchAll(new RegExp(RX_ALT, 'gi'))]
        .map(match => parseMatch(match, EPartMatchTypes.alternate, opts))
    : emptyArr

  // sort matched expressions by their index in the text
  const sortedExpressions = [ ...parameters, ...optionals, ...alts ]
    .sort((matchA, matchB) => matchA.index - matchB.index)

  return sortedExpressions
}
