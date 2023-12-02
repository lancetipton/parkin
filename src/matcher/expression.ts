import type {
  TStepDef,
  TFindOpts,
  TParseParams,
  TWorldConfig,
  TNoExtMatchResp,
} from '../types'

import {
  matchRegex,
  getRegexParts,
} from './regex'


import { EPartMatchTypes } from '../types'
import { convertTypes } from './paramTypes'
import { escapeStr } from '../utils/escapeStr'
import { emptyObj } from '@keg-hub/jsutils/emptyObj'
import {
  checkAnchors,
  convertToRegex,
  checkAlternative,
} from './checkers'


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
    part => part.type === EPartMatchTypes.parameter
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
      part.type === EPartMatchTypes.parameter && match && params.push(match[0])

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
  const {
    optional,
    transformers,
    regex: regexConverted
  } = convertToRegex(regexAlts, opts)

  const { regex: regexAnchors } = checkAnchors(regexConverted)

  // Then call the regex matcher to get the content
  const found = matchRegex({ ...definition, match: regexAnchors }, text)

  return {
    found,
    escaped,
    optional,
    regexAlts,
    transformers,
    regexAnchors,
    regexConverted,
  }
}

/**
 * Parses the params from the step text to be passed to the matching step def method
 * @function
 * @public
 * @export
 *
 */
export const parseExpParams = ({
  text,
  match,
  $world,
  definition,
  transformers,
  opts=emptyObj
}:TParseParams) => {

  // get all the parameters, without any type coercion
  const params = extractParameters(
    text,
    definition.match as string,
    match,
    opts
  )

  // If the definition does not have params,
  // then just return the matching definition
  if (!params?.length) return []

  // Convert the found variables into their type based on the mapped transformers
  const converted = convertTypes(params, transformers, $world, opts.worldReplace)

  // If the conversion fails, and no variable or not enough variables are returned,
  // Then assume the type does not match, so the step does not match.
  // Otherwise return the matched definition, and the converted variables
  return converted.length !== params.length ? undefined : converted
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
  opts:TFindOpts=emptyObj,
):TNoExtMatchResp => {

  // If it's an exact match, then no variables can exist
  // So we can short circuit and return the definition
  if (definition.match === text) return { definition, match: [] }

  const {
    found,
    optional,
    transformers,
  } = findAsRegex(definition, text, opts)

  if(!found || !found.definition || (!found.match && !optional))
    return emptyObj

  if(opts.parseParams === false) 
    return {...found, definition, transformers, optional}

  const parsed = parseExpParams({
    opts,
    text,
    $world,
    definition,
    transformers,
    match: found.match,
  })

  return !parsed
    ? emptyObj
    : { definition, match: parsed }

}
