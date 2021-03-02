import { noOpObj, getWordEndingAt, joinRegex } from '@keg-hub/jsutils'

export const RX_OPTIONAL = /\w*\([^)]*?\)/
export const RX_ALT = /\s*\S*\/\S*\s*/
export const RX_PARAMETER = /\s*{(.*?)}\s*/
export const RX_EXPRESSION = joinRegex(RX_PARAMETER, RX_OPTIONAL, 'g')
export const RX_PARAM_REPLACE = /(.*)/
export const RX_MATCH_REPLACE = /{|}/g

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
 * Formats the regex match result into an object,
 * with some computed values
 * @param {Array} matchArr 
 * @param {string} type 
 */
const parseMatch = (matchArr, type='other') => {
  const val = matchArr[0]

  return {
    text: val.trim(),
    index: matchArr.index,
    input: matchArr.input,
    regex: getMatchRegex(type, matchArr),
    type,
    ...(type === 'parameter' && { 
      paramType: val.trim().replace(RX_MATCH_REPLACE, '')
    })
  }
}

/**
 * Converts an optional expression into regex
 * @param {string} optional 
 */
export const toAlternateRegex = optional => {
  const split = optional.split(/(\(|\))/)

  const [ start, , middle, , end ] = split

  // no words outside of optional boundary
  if (start === '' && end === '')
    return optional + '?'
  else if (start === '')
    return `(${middle}|${middle}${end})`
  else if (end === '')
    return `(${start}|${start}${middle})`
  else
    return `(${start}${end}|${start}${middle}${end})`
}

const getFullOptionalText = (match) => {
  const text = match.input
  const precedingWord = getWordEndingAt(text, match.index)
  return precedingWord + match[0]
}

const getOptionalRegex = match => {
  const optionalText = getFullOptionalText(match)
  return toAlternateRegex(optionalText)
}

/**
 * Returns regex for parameter type
 * @param {string} type - cucumber-expression parameter type: float, int, word, or string
 */
export const getParamRegex = type => {
  const doubleRx = /"[^"]+"/
  const singleRx = /'[^']+'/
  switch(type) {
    case 'float':
      return `-?[0-9]+[.][0-9]+`
    case 'int':
      return `-?[0-9]+`
    case 'string':
      return joinRegex(doubleRx, singleRx).source
    case 'word':
    default:
      return RX_PARAM_REPLACE.source
  }
}

const getMatchRegex = (type, match) => {
  const [ val, paramType ] = match

  switch(type) {
    case 'parameter':
      return new RegExp(getParamRegex(paramType))
    case 'optional':
      return new RegExp(getOptionalRegex(match))
    case 'alternate':
      const pattern = `(${val.trim().replace(/\//g, '|')})`
      return new RegExp(pattern)
    default:
      return null
  }
}

export const getRegexParts = stepMatcher => {
  const parameters = [ 
    ...stepMatcher.matchAll(new RegExp(RX_PARAMETER, 'gi'))
  ].map(match => parseMatch(match, 'parameter'))

  const optionals = [ 
    ...stepMatcher.matchAll(new RegExp(RX_OPTIONAL, 'gi'))
  ].map(match => parseMatch(match, 'optional'))

  const alts = [ 
    ...stepMatcher.matchAll(new RegExp(RX_ALT, 'gi'))
  ].map(match => parseMatch(match, 'alternate'))

  // sort matched expressions by their index in the text
  const sortedExpressions = [ 
    ...parameters, 
    ...optionals,
    ...alts,
  ].sort((matchA, matchB) => matchA.index - matchB.index)

  return sortedExpressions
}
