import type {
  TStepDef,
  TFindOpts,
  TMatchResp,
  TWorldConfig
} from '../types'

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
import { emptyObj, isFunc } from '@keg-hub/jsutils'
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
const escapeStr = (str:string) => {
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
const runRegexCheck = (
  matcher:string,
  testRx:RegExp,
  replaceWith:string|((match:any) => any)
) => {
  if (!testRx.test(matcher)) return matcher

  const matchLength = matcher.length

  // Set the default regex match
  let regexStr = matcher

  // Replace any expressions with regex, and convert the param types
  // @ts-ignore
  matcher.replaceAll(testRx, (...args:any[]) => {
    const idx = args[3]
    const match = args[0].trim()

    /**
      * Because the regexStr length is changed each time a match is replaced
      * We can't use the original index of the match in the match-string
      * Instead, get the difference between the current regexStr and the original match length
      * Then add it to the idx to get the updated index
      */
    const newIdx = idx + (regexStr.length - matchLength)

    /**
     * Using the updated idx, slice and split on the match value
     * This gives us an array of strings, split on any string match the match value 
     * Next get the start of the string up to the new index
     *
     *
     * Looks like this:
       * match = "When I type {string} into {string}"
     *
     *
     * 1st iteration:
       * SPLIT:
            startStr     |  startSl  |     replace     |      endSl
         "When I type "  |     ""    |  <1st-replace>  |  ["into ", ""]
       *
       * ADDED
         - "When I type " + "" + <1st-replace> + ["into ", ""].join("{string}")
         - regexStr === "When I type <1st-replace> into {string}"
     *
     *
     * 2nd iteration:
       * SPLIT:
                  startStr                 |  startSl  |     replace    |  endSl
        "When I type <1st-replace> into "  |    ""     |  <2nd-replace> |  [""]
       *
       * ADDED
         - "When I type <1st-replace> into " + "" + <2nd-replace> + [""].join("{string}")
         - regexStr === "When I type <1st-replace> into <2nd-replace>"
      */

    // Split on match here, then join on match later
    // This will remove the first instance found of the match from the string
    const [startSl, ...endSl] = regexStr.slice(newIdx).split(match)
    const startStr = regexStr.slice(0, newIdx)

    const replace = isFunc(replaceWith)
      ? replaceWith(...args)
      : replaceWith

    regexStr = `${startStr}${startSl}${replace}${endSl.join(match)}`

  })

  return regexStr
}

/**
 * Find all expressions in the match string, and convert them into into regex
 * @function
 * @private
 *
 */
const convertToRegex = (
  match:string,
  opts:TFindOpts=emptyObj
) => {
  const paramTypes = getParamTypes()
  const transformers = []
  const regex = runRegexCheck(
    match,
    RX_EXPRESSION,
    // RX_PARAMETER,
    (val, ...args) => {
      // Get the expression type
      const type = val.trim().replace(RX_MATCH_REPLACE, '')
      const isParameter = val.match(RX_PARAMETER)
      const isOptional = val.match(RX_OPTIONAL)

      // Add the transformer for the type to the transformers array
      isParameter && transformers.push(paramTypes[type] || paramTypes.any)
      // Return the regex
      return isParameter
        ? getParamRegex(type, opts?.partial)
        : isOptional
          ? toAlternateRegex(val)
          : val
    }
  )
  return { regex, transformers }
}

/**
 * Find all alternate syntax in the match string, and convert them into into regex
 * @function
 * @private
 *
 */
const checkAlternative = (match:string) => {
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
 */
const checkAnchors = (str:string) => {
  let final = str
  if (!str.startsWith('^')) final = '^' + final
  if (!str.endsWith('$')) final += '$'

  return { regex: final }
}

/**
 * Extracts the dynamic gherkin-expression parameters from the text,
 * given the step matcher template and the fullMatchResults
 * @param {string} text
 * @param {RegExp} stepMatcher
 * @param {Array} wordMatches - matches for the {word} params
 */
export const extractParameters = (
  text:string,
  stepMatcher:string,
  wordMatches:string[],
  opts:TFindOpts=emptyObj
) => {
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

  return (opts.partial || expectedParamLength === result.params.length)
    ? result.params
    : null
}

/**
 * Converts the passed in definition.match string into regex
 * Then matches the passed in text string with the converted regex string
 * @function
 * @public
 * @export
 *
 */
export const findAsRegex = (
  definition:TStepDef,
  text:string,
  opts:TFindOpts=emptyObj
) => {
  const escaped = escapeStr(definition.match as string)
  const { regex: regexAlts } = checkAlternative(escaped)
  const { transformers, regex: regexConverted } = convertToRegex(regexAlts, opts)
  const { regex: regexAnchors } = checkAnchors(regexConverted)

  // Then call the regex matcher to get the content
  const found = matchRegex(
    { ...definition, match: regexAnchors },
    text,
  )

  return {
    found,
    escaped,
    regexAlts,
    transformers,
    regexAnchors,
    regexConverted,
  }
}

/**
 * Finds a matching definition from the passed in expression text
 * Then extracts the variables from the text to pass to the definitions method
 * Converts expression strings into regex then calls the matchRegex method
 * @function
 * @public
 * @export
 *
 * @returns - Found matching definition and matched arguments
 *  - form: { definition, match: Array of Arguments to pass to definitions function }
 */
export const matchExpression = (
  definition:TStepDef,
  text:string,
  $world?:TWorldConfig,
  opts:TFindOpts=emptyObj
) => {
  // If it's an exact match, then no variables can exist
  // So we can short circuit and return the definition
  if (definition.match === text) return { definition, match: [] }

  const { found, transformers } = findAsRegex(definition, text, opts)

  // If no found definition or match, return an empty object
  if (!found || !found.definition || !found.match) return emptyObj

  // get all the parameters, without any type coercion
  const params = extractParameters(
    text,
    definition.match as string,
    found.match,
    opts
  )


  if (!params) return emptyObj

  // Convert the found variables into their type based on the mapped transformers
  const converted = convertTypes(params, transformers, $world)

  // If the conversion fails, and no variable or not enough variables are returned,
  // Then assume the type does not match, so the step does not match.
  // Otherwise return the matched definition, and the converted variables
  return converted.length !== params.length
    ? emptyObj as TMatchResp
    : { definition, match: converted } as TMatchResp
}
