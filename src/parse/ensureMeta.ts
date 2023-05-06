import type { TFeatureAst, TBlockAst } from '../types'

import { EAstObject } from '../types'
import { eitherArr, uuid } from '@keg-hub/jsutils'
import { getRXMatch, getStartWhiteSpace } from '../utils/helpers'

/**
 * Regular expressions for matching feature file keywords
 * @type {object}
 */
const RX_AS = /^\s*As (.*)$/
const RX_COMMENT = /^\s*#(.*)$/
const RX_I_WANT = /^\s*I want (.*)$/
const RX_SO_THAT = /^\s*So that (.*)$/
const RX_IN_ORDER = /^\s*In order (.*)$/


/**
 * Regular expressions and types for matching feature meta data keywords
 * @type {Array}
 * @private
 */
const featureMetaItems = [
  { regex: RX_AS, key: EAstObject.perspective },
  { regex: RX_I_WANT, key: EAstObject.desire },
  { regex: RX_SO_THAT, key: EAstObject.reason },
  { regex: RX_IN_ORDER, key: EAstObject.reason },
]


/*
 * Helper function to add reason text to a feature when it exists
 * @function
 * @private
 *
 */
const addReason = (
  feature:TFeatureAst,
  reason:string,
  line:string,
  index:number
) => {
  if(!reason) return

  const reasonArr = eitherArr<TBlockAst[]>(feature.reason, [feature.reason])
  reasonArr.push({
    index,
    uuid: uuid(),
    content: reason,
    type: EAstObject.reason,
    whitespace: getStartWhiteSpace(line),
  })
  feature.reason = reasonArr
}

/**
 * Checks for feature descriptive content
 * @function
 * @private
 * @param {Object} feature - Current feature being parsed into an object
 * @param {string} line - Current line being parsed
 *
 * @return {boolean} - True if a line was added to the current feature object
 */
export const featureMeta = (
  feature:TFeatureAst,
  line:string,
  index:number
) => {
  let metaAdded = false
  featureMetaItems.reduce((added, regItem) => {
    if (added) return added

    const hasItem = regItem.regex.test(line)
    if (!metaAdded && hasItem) metaAdded = true

    return hasItem
      ? regItem.key !== EAstObject.reason
        ? (feature[regItem.key] = {
            index,
            uuid: uuid(),
            whitespace: getStartWhiteSpace(line),
            content: getRXMatch(line, regItem.regex, 0),
            type: regItem.key === EAstObject.desire
              ? EAstObject.desire
              : regItem.key === EAstObject.perspective
                ? EAstObject.perspective
                : EAstObject.block
          })
        : addReason(feature, getRXMatch(line, regItem.regex, 0), line, index)
      : hasItem
  }, false)

  return metaAdded
}

/*
 * Checks for feature file comments
 * @function
 *
 */
export const featureComment = (
  feature:TFeatureAst,
  line:string,
  index:number
) => {
  if (!RX_COMMENT.test(line)) return false

  // const comment = getRXMatch(line, RX_COMMENT, 1)
  // Don't use getRXMatch because we want to include the "#" for the comment
  // Instead trim the whitespace afterwards
  const comment = line.match(RX_COMMENT)[0]

  feature.comments.push({
    index,
    uuid: uuid(),
    content: comment.trim(),
    type: EAstObject.comment,
    whitespace: getStartWhiteSpace(line),
  })

  return true
}

/*
 * Checks for empty lines in a feature file
 * @function
 *
 */
export const featureEmptyLine = (
  feature:TFeatureAst,
  line:string,
  index:number
) => {
  if(line.trim().length) return false

  feature.empty.push({
    index,
    uuid: uuid(),
    content: line,
    whitespace: ``,
    type: EAstObject.empty,
  })

  return true
}