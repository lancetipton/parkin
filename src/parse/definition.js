import { constants } from '../constants'
const { REGEX_VARIANT, EXPRESSION_VARIANT } = constants

const NEWLINES_MATCH = /\n|\r|\r\n/
const COMMENT_MATCH = /\/\/.*/g
const MULTI_LINE_MATCH = /\/\*(.*\n)*\*\//
const FIND_DEFINITION = new RegExp(
  /(Given|When|Then)\(('|"|`|\/)(.*)('|"|`|\/),/,
  'gm'
)
const NEXT_DEFINITION = new RegExp(/(Given|When|Then|And|But)\(/, 'g')

/*
 * Parses the definition.input, to extract out a definitions method content
 * @function
 * @private
 * @param {Array} definition - Matching response from FIND_DEFINITION regex
 *
 * @return {string} - Valid Javascript definition call as text
 */
const getContent = definition => {
  // Get all content after the definition call
  // Example => Given('some description', () => { ... })
  //   * Removed => "Given('some description',"
  //   * content === "() => { ... })"
  //     * NOTE - This is a NON-VALID javascript due to the trailing )
  const content = definition.input.split(definition[0]).pop()

  // Use regex to look for other definition calls (Given,When,Then)
  // in the remaining content after the definition call is removed
  const found = NEXT_DEFINITION.exec(content)

  // If another definition call
  //   * Is not found - Join the content with the removed definition call from above
  //   * Is found - Split content at the next definition call
  //                Then return the first item from the split array
  //                This gives us all the content of the method for a definition
  // * NOTE - returns VALID javascript as text
  const parsedContent = !found
    ? `${definition[0].trim()} ${content.trim()}`
    : `${definition[0].trim()}${content.split(found[0].trim()).shift()}`

  // Removed any empty lines from the parsedContent
  return parsedContent
    .split(`\n`)
    .filter(line => line)
    .join(`\n`)
}

/*
 * @todo - Improve comment stripping
 * Very simple comment stripper, that only gets rid of `//` and /* ... *\/
 * Does not cover all used cases, and most likely will fail on edge cases
 * @function
 * @private
 * @param {string} text - Definition text to strip comments from
 *
 * @return {string} - Passed in text with comments stripped
 */
const stripComments = text => {
  return text
    .trim()
    .split(NEWLINES_MATCH)
    .filter(line => !COMMENT_MATCH.test(line.trim()))
    .join(`\n`)
    .replace(MULTI_LINE_MATCH, '')
}

/*
 * Parses a step definition file, and converts it into an object
 * Extracts each definition in a file into its own object
 * @function
 * @public
 * @export
 * @param {string} text - Full Definition file text
 *
 * @return {Array} - All parsed definition calls as objects
 */
export const definition = text => {
  return Array.from(
    // Strip all comments from the text, and find all matching definition calls
    stripComments(text).matchAll(FIND_DEFINITION),
    // For each found definition call, build the parsed definition object
    definition => {
      // Extract the content from the matching definition
      const [ _, type, identifier, match ] = definition

      // All regex variants start with /, so use that to set the variant to regex of expression
      const variant = identifier === `/` ? REGEX_VARIANT : EXPRESSION_VARIANT

      // Build and return the parsed definition object
      return {
        match,
        variant,
        type: type.toLowerCase(),
        content: getContent(definition),
      }
    }
  )
}
