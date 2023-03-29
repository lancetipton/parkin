import type {
  TAstType,
  TTagsAst,
  TBlockAst,
} from '../types'

import { exists } from '@keg-hub/jsutils'
import { EFeatureTypes } from '../types'

/**
 * TODO: Allow passing options here that will format the assembled feature
 * Converts the assembled array into a formatted feature string
 * Calls helper to format comment lines containing a #
 * Adds a line ending char at the end of each line => '\n'
 * @function
 * @private
 */
export const formatAssembled = (
  assembled:string[],
) => {
  // Use array.from to allow access to empty array position
  // This ensures we can replace it with an empty string
  return Array.from(assembled, (line) => exists(line) ? `${line.trimEnd()}\n` : '\n')
    .join('')
    .trimEnd()
    .concat(` `, `\n`)
}

/**
 * Adds content to the assembled array based on the passed in index
 * If no index exists, then the content is added to the end
 * If the index already exists, then the content is spliced into the array at the index
 * @function
 * @private
 *
 */
export const addContent = (
  assembled:string[],
  content:string,
  index?:number | false
) => {
  !exists(index) || index === false
    ? assembled.push(content)
    : exists(assembled[index])
      ? assembled.splice(index, 0, content)
      : (assembled[index] = content)
}


export const getWhiteSpace = (ast:TAstType|TBlockAst|TTagsAst, parent:TAstType, def=``) => {
  return exists<string>(ast.whitespace)
    ? ast.whitespace
    : exists<string>(parent?.whitespace)
      ? `${parent?.whitespace}${def}`
      : def
}

export const getTextContent = (
  ast:TAstType,
  parent:TAstType,
  type:EFeatureTypes,
  def=``
) => {
    const content = ast[ast.type] as string || `` 
    const whitespace = getWhiteSpace(ast, parent, def)
    const prefix = `${whitespace}${type}:`

    return content.length ? `${prefix} ${content}` : prefix
}

