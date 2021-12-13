/*
 * Extracts keywords from a text string
 * @function
 * @private
 * @param {string} line - Text content to extract the keyword from
 * @param {Object} regex - Regex object used for finding a keyword
 * @param {number} index - Current inject of the line being parsed
 *
 * @returns {string} - Found keyword text from the line argument
 */
export const getRXMatch = (line, regex, index) =>
  line.match(regex)[index].trim()

/*
 * Sanitizes the passed in text and joins the texts length
 * @function
 * @export
 * @public
 * @param {string} text - Text to be sanitized
 *
 * @returns {string} - Sanitized text
 */
export const sanitizeForId = text => {
  const cleaned = text
    .trim()
    .toLowerCase()
    .replace(/[\s\/\\\(\)\+=_&%\$#@!\*~`\|\?:;"'<>,.{}]/g, '-')
  return `${cleaned}-${text.length}`
}

/**
 * Sanitize the step definition text to be used as the name
 * @function
 * @private
 * @param {Object} step - Parsed step definition object
 *
 * @returns {string} Sanitized string version of the step definition text
 */
export const sanitize = step => {
  let name = step.match.toString()
  name[0] === '/' && (name = name.substr(1))
  name[0] === '^' && (name = name.substr(1))

  name.charAt(name.length - 1) === '/' && (name = name.slice(0, -1))
  name.charAt(name.length - 1) === '$' && (name = name.slice(0, -1))

  return name.replace(/\(\?:([^\|]+)+\|+([^\)]+)?\)/, '$1')
}

/**
 * Ensures the definition does not already exist based on it's content
 * Also check the uuid, and updates it if needed
 * @function
 * @private
 * @param {Object} definition - Parsed definition object to be validated
 * @param {Array<Objects>} definitions - All definitions already loaded
 *
 * @returns {Object|boolean} - Returns the passed in definition or false if it already exists
 */
export const validateDefinition = (definition, definitions) => {
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
 * @param {string} arg - String containing single or double quotes at the start and end
 * 
 * @returns {string} - Passed in arg string with start and end quotes removed
 */
export const removeQuotes = arg => arg.trim().replace(/^("|')/, '').replace(/("|')$/, '')