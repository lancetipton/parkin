import type { TFeatureAst, TTagsAst, TTagsParentAst, TBlockAst } from '../types'

import { EAstObject } from '../types'
import { eitherArr, uuid } from '@keg-hub/jsutils'
import { getRXMatch, getStartWhiteSpace } from '../utils/helpers'

/**
 * Regular expressions for matching feature file keywords
 * @type {object}
 */
const RX_TAG = /^\s*@(.*)$/
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
export const featureMetaTags = [
  { regex: RX_AS, key: 'perspective' },
  { regex: RX_I_WANT, key: 'desire' },
  { regex: RX_SO_THAT, key: 'reason' },
  { regex: RX_IN_ORDER, key: 'reason' },
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
  index:number
) => {
  if(!reason) return

  const reasonArr = eitherArr<TBlockAst[]>(feature.reason, [feature.reason])
  reasonArr.push({
    index,
    uuid: uuid(),
    content: reason,
    type: EAstObject.reason
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
  featureMetaTags.reduce((added, regTag) => {
    if (added) return added

    const hasTag = regTag.regex.test(line)
    if (!metaAdded && hasTag) metaAdded = true

    return hasTag
      ? regTag.key === `reason`
        ? addReason(feature, getRXMatch(line, regTag.regex, 0), index)
        : (feature[regTag.key] = {
            content: getRXMatch(line, regTag.regex, 0),
            index,
            type: regTag.key === `desire`
              ? EAstObject.desire
              : regTag.key === `perspective`
                ? EAstObject.perspective
                : EAstObject.block
          })
      : hasTag
  }, false)

  return metaAdded
}

/**
 * Parses the content as an array of tags
 * Then builds and returns a Tags Ast 
 */
const tagsFactory = (
  index:number,
  content:string
) => {
  const tokens = content.split(` `).reduce((acc, item) => {
    const token = item.trim()
    token.startsWith(`@`) && acc.push(token)
    return acc
  }, [])

  return {
    index,
    tokens,
    uuid: uuid(),
    type: EAstObject.tags,
    content: tokens.join(` `),
  } as TTagsAst
}

/*
 * Checks for feature file meta-data
 * @function
 *
 */
export const checkTag = (
  parent:TTagsParentAst,
  feature:TFeatureAst,
  line:string,
  index:number
) => {
  if (!RX_TAG.test(line)) return false

  // background can not have tags, so add them to the feature instead
  const tagParent = (parent as TFeatureAst)?.background ? feature : parent

  const tags = getRXMatch(line, RX_TAG, 0)

  // Join the tags with the tagParents current tags
  tagParent.tags = tagsFactory(index, tags)
  tagParent.tags.whitespace = getStartWhiteSpace(line)

  return true
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
  // Don't use getRXMatch because we want the full white space
  // Because comments are added globally and not by line
  // This could cause some issues if the user starts using different white space settings
  // But not much we can do about it
  const comment = line.match(RX_COMMENT)[0]

  feature.comments.push({
    index,
    uuid: uuid(),
    content: comment,
    type: EAstObject.comment
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
    type: EAstObject.empty
  })

  return true
}