/**
 * Parses definitions from text content by calling the steps.register function
 * @function
 * @public
 * @export
 *
 */
export const parseDefinition = function (text:string) {
  const registered = this.steps.register([text])
  return registered
}
