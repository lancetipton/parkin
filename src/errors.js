/**
 * Throws an error when a Steps class instance is not passed to the runner class constructor
 * @function
 * @public
 * @export
 *
 * @returns {void}
 */
export const throwMissingSteps = () => {
  throw new Error(
    `Runner class constructor requires an instance of the Steps class`
  )
}

/**
 * Throws an error when a feature text is not passed to the Runner class instance
 * @function
 * @public
 * @export
 *
 * @returns {void}
 */
export const throwMissingFeatureText = () => {
  throw new Error(
    `Runner class requires feature text when calling the run method`
  )
}

/**
 * Throws an error when a feature step does not match a step definition
 * @function
 * @public
 * @export
 * @param {string} text - Text that does not match a registered step definition
 *
 * @returns {void}
 */
export const throwNoMatchingStep = text => {
  throw new ReferenceError(text)
}
