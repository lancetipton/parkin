import { constants } from '../constants'
const { REGEX_VARIANT, EXPRESSION_VARIANT } = constants

const NEWLINES_MATCH = /\n|\r|\r\n/
const COMMENT_MATCH = /\/\/.*/g
const MULTI_LINE_MATCH = /\/\*(.*\n)*\*\//
const FUNCTION_START = /(\w\s|\w\d|\w)\(\{/
const FUNCTION_END = /\}\)$|\}\);$/
const FIND_DEFINITION = new RegExp(
  /(Given|When|Then|And|But)\(('|"|`|\/)(.*)('|"|`|\/),/,
  'gm'
)

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

  // Holds references to function start chars "({"
  const funcStarts = []
  // Hold reference to all code within the step definition method
  const defContent = []
  
  // Loop each line of all content after the step definition
  // Check for function opening and closing characters ( "({" || "})" )
  // Finds the end of the step definition function when 
  // The closing characters are found, and there's no previous function starts
  const funcContent = content.split(NEWLINES_MATCH)
    .reduce((funcContent, line, index) => {
      if(funcContent) return funcContent
      
      if(FUNCTION_START.test(line)) funcStarts.push(true)
      const isFuncEnd = FUNCTION_END.test(line)

      // Add each line of code to the definition content array
      defContent.push(line)

      // If line does not contain a function end, then go to the next line
      if(!isFuncEnd) return funcContent
      // Check if any function starts exist
      else if(funcStarts.length){
        // If they do, remove it, and go to the next line
        funcStarts.pop()
        return funcContent
      }

      // We should only get here when there's no function starts
      // And the line is a function end
      // Which means we are at the end of the step definitions method
      return defContent.join('\n')

    }, false)

  // Join the definition type and match text with the function content
  // * NOTE - returns VALID javascript as text
  return `${definition[0].trim()} ${funcContent.trim()}`

}

/*
 * @todo - Improve comment stripping
 * Very simple comment stripper, that only gets rid of `//` and /* ... *\/
 * Does not cover all edge cases, and most likely will fail in some scenarios
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
