/**
 * Parses definitions from text content by calling the steps.register function
 * @function
 * @public
 * @export
 * @param {string} text - Text content of a definitions file
 *
 * @returns {Object} - Parsed feature file as an object
 */
export const parseDefinition = function (text) {
  const registered = this.steps.register([text])
  return registered
}
