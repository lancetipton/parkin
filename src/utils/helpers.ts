import type { TTokenOpts, EPartMatchTypes, TStepDef } from '../types'

import { emptyObj } from '@keg-hub/jsutils/emptyObj'
import { hashString } from '@keg-hub/jsutils/hashString'


const cleanDefMatch = (match:string|RegExp) => {
  let name = match.toString()
  name[0] === '/' && (name = name.substring(1))
  name[0] === '^' && (name = name.substring(1))
  
  name.charAt(name.length - 1) === '/' && (name = name.slice(0, -1))
  name.charAt(name.length - 1) === '$' && (name = name.slice(0, -1))
  
  return name
}

export const strToId = (str:string, prefix:string=``, postfix:string=``) => {
  return `${prefix}${hashString(cleanDefMatch(str))}${postfix}`
}

/*
 * Extracts keywords from a text string
 * @function
 * @private
 *
 */
export const getRXMatch = (
  line:string,
  regex:RegExp,
  index:number
) => {
  const matching = line.match(regex)[index]
  return matching ? matching.trim() : ` `
}

/**
 * Sanitize the step definition text to be used as the name
 * @function
 * @private
 *
 */
export const sanitize = (def:TStepDef) => {
  return cleanDefMatch(def.match).replace(/\(\?:([^\|]+)+\|+([^\)]+)?\)/, '$1')
}

/**
 * Ensures the definition does not already exist based on it's content
 * Also check the uuid, and updates it if needed
 * @function
 * @private
 *
 */
export const validateDefinition = (
  definition:TStepDef,
  definitions:TStepDef[]
) => {
  return definitions.reduce(
    (validated, def, idx) => {
      // Check if the checkDef already exists in the definitions array
      // By comparing the content of the existing definitions to it
      if (!validated || def.content === validated.content) return false

      // Have to ensure no duplicate uuids, so use the index if there is a match 
      def.uuid === validated.uuid && (validated.uuid = `${validated.uuid}-${idx}`)

      return validated
    },
    { ...definition }
  )
}

/**
 * Remove single and double quotes from a string's starting and ending
 *
 */
export const removeQuotes = (arg:string) => {
  return arg
    .trim()
    .replace(/^("|')/, '')
    .replace(/("|')$/, '')
}

/**
 * Gets the starting white space of a string
 *
 */
export const getStartWhiteSpace = (line:string) => {
  const noStartSpace = line.replace(/^\s+/g, '')
  const startLength = line.length - noStartSpace.length

  return new Array(startLength).fill(` `).join('')
}


/**
 * Filters out types to include when getting regex parts
 * If includes array exists, it override the exclude array
 *  - So only items in the include array will be added, regardless of the exclude array
 * Otherwise the exclude array is used, and only items not in it will be used
 */
export const includePartType = (
  type:EPartMatchTypes,
  opts:TTokenOpts=emptyObj,
  include?:EPartMatchTypes[],
  exclude?:EPartMatchTypes[],
) => {
  const { include:oInclude, exclude:oExclude } = opts
  const inArr = include || (Boolean(oInclude?.length) ? oInclude : undefined)
  const exArr = exclude || (Boolean(oExclude?.length) ? oExclude : undefined)
  
  return !inArr && !exArr
    ? true
    : !inArr
      ? !exArr.includes(type)
      : inArr.includes(type)
}
