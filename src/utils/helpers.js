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
  const cleaned = text.trim()
    .toLowerCase()
    .replace(/[\s\/\\\(\)\+=_&%\$#@!\*~`\|\?:;"'<>,.{}]/g, '-')
  return `${text.length}-${cleaned}`
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
