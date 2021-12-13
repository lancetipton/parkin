/*
 * Helper method to use the a test method can not be found on the global scope
 * @function
 * @public
 * @throws
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
 * @throws
 *
 * @returns {void}
 */
export const throwMissingSteps = () => {
  throw new Error(
    `Runner class constructor requires an instance of the Steps class`
  )
}

/**
 * Throws an error when a Hooks class instance is not passed to the runner class constructor
 * @function
 * @public
 * @throws
 *
 * @returns {void}
 */
export const throwMissingHooks = found => {
  throw new Error(
    `Runner class constructor requires an instance of the Hooks class. Found: ${found}`
  )
}

/**
 * Throws an error when a feature text is not passed to the Runner class instance
 * @function
 * @public
 * @throws
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
 * @throws
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
 * @throws
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
 * @throws
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

/**
 * Throws an error when a registering a param type that already exists
 * @function
 * @public
 * @throws
 * @param {string} name - Name of the param type that is being registered
 *
 * @returns {void}
 */
 export const throwMissingWorldValue = (arg, world) => {
  throw new Error(
    `Can not replace ${arg} with value from $world, it does not exist on the world object`,
    world,
    arg
  )
}

/**
 * Throws an error when a registering an invalid hook type
 * @function
 * @public
 * @throws
 * @param {string} hookTypes - List of allowed hook types
 * @param {string} type - Invalid hook type being registered
 *
 * @returns {void}
 */
 export const throwInvalidHookType = (hookTypes, type) => {
  throw new Error([
    `Expected client hook type to be one of ', ${hookTypes}.`,
    `Found: ${type}`
  ].join('\n'))
}

/**
 * Throws an error when running world replace on feature text content
 * @function
 * @public
 * @throws
 * @param {Object} err - Error that was thrown
 * @param {string} currentMatch - Current $world text that was matched
 */
export const throwWorldReplace = (err, currentMatch) => {
  console.log(`Error in $world replace of text content. Current match was ${currentMatch}`)
  throw err
}