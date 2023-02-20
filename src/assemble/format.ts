import { eitherArr, isObj, isArr, capitalize, exists } from '@keg-hub/jsutils'

/**
 * Checks the whitespace of adjacent lines to determine the whitespace of the comment
 * Uses the next line first, then the previous line if the next line does not exist
 * @function
 * @private
 * @param {Array<String>} assembled - Array of strings converted from a feature model
 * @param {string} line - Comment line to be formatted
 * @param {number} index - Position of the line within the assembled array
 *
 * @return {string} - Formatted comment line relative to it's adjacent lines
 */
const formatComment = (assembled, line, index) => {
  const next = assembled[index + 1]
  const prev = assembled[index - 1]
  let compareLine = exists(next) ? next : prev

  // If no line to compare with just return the comment
  if (!compareLine) return `${line}\n`

  // Split on the comment char, so we have just the text of the comment
  const comment = line.split('#').pop()

  // Get the white space of the compose line
  const whiteSpace = Array(
    compareLine.length - compareLine.trimStart().length
  ).join(' ')

  // Add that to the comment and replace the comment char #
  // This allows the comments to be spaced relative the the adjacent lines
  // Must add an extra space after addSpace because whiteSpace is 1 space short
  return `${whiteSpace} # ${comment}\n`
}


/**
 * Converts the assembled array into a formatted feature string
 * Calls helper to format comment lines containing a #
 * Adds a line ending char at the end of each line => '\n'
 * @function
 * @private
 */
export const formatAssembled = (assembled:string[]) => {
  // Use array.from to allow access to empty array position
  // This ensures we can replace it with an empty string
  return Array.from(assembled, (line, index) => {
    // For any non-existing lines, add an empty space
    // This can happen from empty parsed lines
    // That have an index, but no content
    return !exists(line)
      ? '\n'
      : line.startsWith('#')
        ? formatComment(assembled, line, index)
        : `${line}\n`
  })
    .join('')
    .trim()
}