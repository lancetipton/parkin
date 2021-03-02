import { matchRegex } from './regex'
import { noOpObj, isFunc, isStr } from '@keg-hub/jsutils'
import { getParamTypes, convertTypes } from './paramTypes'

const RX_OPTIONAL = /\w*\([^)]*?\)/
const RX_ALT = /\s*\S*\/\S*\s*/
const RX_PARAMETER = /\s*{(.*?)}\s*/
const RX_EXPRESSION = new RegExp(
  `${new RegExp(RX_PARAMETER).source}|${new RegExp(RX_OPTIONAL).source}`, 
  'g'
)
const RX_PARAM_REPLACE = /(.*)/
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
  return inBrowser
    ? str.replace(/[|\\[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')
    : str
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
    // const fullWord = getWordEndingAt(matcher, args[2])

    regexStr = `${start}${replace}${end.join(match)}`
  })

  return regexStr
}

// leave this be
const getOptionalRegex = match => {
  const optionalText = getFullOptionalText(match)
  return toAlternateRegex(optionalText)
}

/**
 * Converts an optional expression into regex
 * @param {string} optional 
 */
const toAlternateRegex = optional => {
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

/**
 * Returns regex for parameter type
 * @param {string} type - cucumber-expression parameter type: float, int, word, or string
 */
const getParamRegex = type => {
  switch(type) {
    case 'float':
      return `-?[0-9]+[.][0-9]+`
    case 'int':
      return `-?[0-9]+`
    case 'string':
      return `"[^"]+"`
    case 'word':
    default:
      return RX_PARAM_REPLACE.source
  }
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
    (val, ...args) => `(?:${val.trim().replace(/\//g, '|')})`
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
  if (!str.startsWith('^')) {
    final = '^' + final
  }
  if (!str.endsWith('$')) {
    final += '$'
  }

  return { regex: final }
}

/**
 * 
 * @param {*} step 
 * @param {*} text 
 * @return { step, match: Array of Arguments to pass to step function }
 */
export const matchExpression = (step, text) => {
  const escaped = escapeStr(step.match)
  const { regex: regexAlts } = checkAlternative(escaped)
  const { regex: convertedRegex, transformers } = convertToRegex(regexAlts)
  const { regex: match } = checkAnchors(convertedRegex)

  const parts = getRegexParts(step.match)

  // Then call the regex matcher to get the content
  const found = matchRegex({ ...step, match }, text)

  // If no found step definition of match, return an empty object
  if (!found || !found.step || !found.match) return noOpObj

  const { params } = parts.reduce(
    (state, part) => {
      const { params, textIndex, fullMatchIndex } = state

      const substring = text.substring(textIndex)
      const isWord = (part.paramType === 'word')
      const partMatch = substring.match(part.regex)
      const fullMatch = {
        0: found.match[fullMatchIndex],
        index: substring.indexOf(found.match[fullMatchIndex])
      }

      const match = isWord ? fullMatch : partMatch
      if (!match) return state

      const nextTextIndex = textIndex + (match && (match.index + match[0].length))

      switch(part.type) {
        case 'parameter':
          match && params.push(match[0])

          return {
            params, 
            textIndex: nextTextIndex,
            fullMatchIndex: isWord ? (fullMatchIndex + 1) : fullMatchIndex
          }
        case 'alternate':
        case 'optional':
          // if match, then there is an optional or alternate value that was 
          // matched by the step matcher, so this is not a parameter
          // and we can just ignore this part of the text 
          return {
            params,
            textIndex: nextTextIndex,
            fullMatchIndex //: fullMatchIndex + (match ? 1 : 0)
          }
      }
    },
    { params: [], textIndex: 0, fullMatchIndex: 0 }
  )

  const converted = convertTypes(params, transformers)
  const numExpectedParams = parts.filter(part => part.type === 'parameter').length

  return converted.length !== numExpectedParams
    ? noOpObj
    : { step, match: converted }

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
export const _matchExpression = (step, text) => {
  // TODO: This needs move investigation
  // Need to ensure correct chars are escaped for all edge cases
  const escaped = escapeStr(step.match)

  const { regex: regexAlts } = checkAlternative(escaped)
  const { regex: convertedRegex, transformers } = convertToRegex(regexAlts)
  const { regex: match } = checkAnchors(convertedRegex)

  // Then call the regex matcher to get the content
  const found = matchRegex({ ...step, match }, text)

  // If no found step definition of match, return an empty object
  if (!found || !found.step || !found.match) return noOpObj

  // Convert the found variables into their type based on the mapped transformers
  const converted = convertTypes(found.match, transformers)

  // If the conversion fails, and no type is returned
  // Then assume the type does not match, so the step does not match
  // Otherwise return the matched step definition, and the converted variables
  return converted.length !== matchedParams.length
    ? noOpObj
    : { step, match: converted }
}

const reverseString = str => {
  if (!isStr(str)) return null
  return str.split('').reverse().join('')
}

const getWordStartingAt = (text, index) => {
  const endingSpaceIdx = text.indexOf(' ', index)
  return text.substring(
    index,
    endingSpaceIdx === -1 
      ? text.length - 1
      : endingSpaceIdx
  )
}

const getWordEndingAt = (text, index) => {
  const reversed = reverseString(text)
  const startingIndex = text.length - reversed.indexOf(' ', text.length - index)
  return text.substring(
    startingIndex === -1 
      ? 0
      : startingIndex,
    index,
  )
}

const getFullOptionalText = (match) => {
  const text = match.input
  const precedingWord = getWordEndingAt(text, match.index)
  return precedingWord + match[0]
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

const getRegexParts = stepMatcher => {
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
