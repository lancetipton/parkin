/*
 * Helper method to use the a test method can not be found on the global scope
 * @function
 * @public
 * @export
 * @param {string} type - Name of test method to get from the global scope
 *
 * @returns {function} - Test method
 */
export const testMethodFill = type => {
  /*
   * Internal method that throws an error when a test method does not exist on the global scope
   * @function
   * @private
   * @inner
   *
   * @returns {void}
   */
  return () => {
    throw new Error(
      `` +
        `Test method ${type} does not exist on the global scope.\n` +
        `Please ensure ${type} exists before calling the run method!\n`
    )
  }
}

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

/**
 * Throws an error when a registering a param type that already exists
 * @function
 * @public
 * @export
 * @param {string} name - Name of the param type that is being registered
 *
 * @returns {void}
 */
export const throwParamTypeExists = () => {
  throw new Error(`Cannot register param type "${name}". It already exists!`)
}

/**
 * Throws an error when a assembling a parsed feature, and no parsed feature object exists
 * @function
 * @public
 * @export
 * @param {*} feature - Argument that was passed instead of the parsed feature object
 *
 * @returns {void}
 */
export const throwFeatureNotAnObj = feature => {
  throw new Error(
    `Assemble feature requires an object matching the feature model spec!`,
    feature
  )
}
