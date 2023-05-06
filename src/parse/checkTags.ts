import type { TTagsAst } from '../types'

import { EAstObject } from '../types'
import { uuid } from '@keg-hub/jsutils'
import { getRXMatch, getStartWhiteSpace } from '../utils/helpers'

/**
 * Regular expressions for matching feature file keywords
 * @type {object}
 */
const RX_TAG = /^\s*@(.*)$/

/**
 * Parses the content as an array of tags
 * Then builds and returns a Tags Ast 
 */
const tagsFactory = (
  index:number,
  content:string,
  line:string
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
    whitespace: getStartWhiteSpace(line),
  } as TTagsAst
}

/*
 * Checks for feature file meta-data
 * @function
 *
 */
export const checkTags = (
  line:string,
  index:number
) => {
  if (!RX_TAG.test(line)) return undefined

  const tags = getRXMatch(line, RX_TAG, 0)

  // Join the tags with the tagParents current tags
  const tagsBlock = tagsFactory(index, tags, line)
  tagsBlock.whitespace = getStartWhiteSpace(line)

  return tagsBlock
}
