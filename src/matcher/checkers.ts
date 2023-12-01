import type {
  TFindOpts,
  TParamTypeModel
} from '../types'

import {
  getParamRegex,
  toAlternateRegex,
  getAlternateRegex,
} from './regex'

import {
  RX_ALT,
  RX_OPTIONAL,
  RX_PARAMETER,
  RX_EXPRESSION,
  RX_MATCH_REPLACE,
} from './patterns'

import { isFunc } from '@keg-hub/jsutils'
import { emptyObj } from '@keg-hub/jsutils'
import { getParamTypes } from './paramTypes'


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
      ? replaceWith.apply(null, args)
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
export const convertToRegex = (
  match:string,
  opts:TFindOpts=emptyObj
) => {
  let parameter:Array<any>
  let optional:Array<any>

  const paramTypes = getParamTypes()
  const transformers:TParamTypeModel[] = []
  const regex = runRegexCheck(
    match,
    RX_EXPRESSION,
    (val, ...args) => {
      // Get the expression type
      const type = val.trim().replace(RX_MATCH_REPLACE, '')
      parameter = val.match(RX_PARAMETER)
      optional = val.match(RX_OPTIONAL)

      // Add the transformer for the type to the transformers array
      parameter && transformers.push(paramTypes[type] || paramTypes.any)
      // Return the regex
      return parameter
        ? getParamRegex(type, opts?.partial)
        : optional
          ? toAlternateRegex(val)
          : val
    }
  )

  return {
    regex,
    optional,
    parameter,
    transformers
  }
}

/**
 * Find all alternate syntax in the match string, and convert them into into regex
 * @function
 * @private
 *
 */
export const checkAlternative = (match:string) => {
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
export const checkAnchors = (str:string) => {
  let final = str
  if (!str.startsWith('^')) final = '^' + final
  if (!str.endsWith('$')) final += '$'

  return { regex: final }
}
