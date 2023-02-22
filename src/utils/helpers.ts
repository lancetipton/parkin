import type { TStepDef } from '../types'

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

/*
 * Sanitizes the passed in text and joins the texts length
 * @function
 * @export
 * @public
 *
 */
export const sanitizeForId = (text:string, index:number=1) => {
  const cleaned =
    text &&
    text.trim() &&
    text
      .trim()
      .toLowerCase()
      .replace(/[\s\/\\\(\)\+=_&%\$#@!\*~`\|\?:;"'<>,.{}]/g, '-')

  return cleaned ? `${cleaned}-${text.length}` : `${index}-${index}`
}

/**
 * Sanitize the step definition text to be used as the name
 * @function
 * @private
 *
 */
export const sanitize = (def:TStepDef) => {
  let name = def.match.toString()
  name[0] === '/' && (name = name.substring(1))
  name[0] === '^' && (name = name.substring(1))

  name.charAt(name.length - 1) === '/' && (name = name.slice(0, -1))
  name.charAt(name.length - 1) === '$' && (name = name.slice(0, -1))

  return name.replace(/\(\?:([^\|]+)+\|+([^\)]+)?\)/, '$1')
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
    (validated, def) => {
      if (!validated || def.content === validated.content) return false

      def.uuid === validated.uuid &&
        (validated.uuid = `${validated.uuid}-${validated.content.length}`)

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