import { EHookType } from '../types'

/*
 * Helper method to use the a test method can not be found on the global scope
 * @function
 * @public
 * @throws
 *
 */
export const testMethodFill = (type:string) => {
  /*
   * Internal method that throws an error when a test method does not exist on the global scope
   * @function
   * @private
   * @inner
   *
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
 */
export const throwMissingHooks = (found:any) => {
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
 *
 */
export const throwNoMatchingStep = (text:string) => {
  throw new ReferenceError(text)
}

/**
 * Throws an error when a registering a param type that already exists
 * @function
 * @public
 * @throws
 *
 */
export const throwParamTypeExists = (name:string) => {
  throw new Error(`Cannot register param type "${name}". It already exists!`)
}

/**
 * Throws an error when a assembling a parsed feature, and no parsed feature object exists
 * @function
 * @public
 * @throws
 * 
 */
export const throwFeatureNotAnObj = (feature:any) => {
  throw new Error(`Assemble feature requires an object matching the feature model spec!`)
}

/**
 * Throws an error when a registering a param type that already exists
 * @function
 * @public
 * @throws
 *
 */
export const throwMissingWorldValue = (arg:string) => {
  throw new Error(
    `Can not replace ${arg} with value from $world, it does not exist on the world object`,
  )
}

/**
 * Throws an error when a registering an invalid hook type
 * @function
 * @public
 * @throws
 *
 */
export const throwInvalidHookType = (hookTypes:EHookType, type:string) => {
  throw new Error(
    [
      `Expected client hook type to be one of ', ${hookTypes}.`,
      `Found: ${type}`,
    ].join('\n')
  )
}

/**
 * Throws an error when running world replace on feature text content
 * @function
 * @public
 * @throws
 *
 */
export const throwWorldReplace = (err:Error, currentMatch:string) => {
  console.error(
    `Error replacing $world value in feature text. Current match was ${currentMatch}`
  )
  throw err
}

/**
 * Throws an error when running world.alias replace on feature text content
 * @function
 * @public
 * @throws
 *
 */
export const throwAliasReplace = (err:Error, currentMatch:string) => {
  console.error(
    `Error replacing $$alias ( $world.$alias ) in feature text. Current match was ${currentMatch}`
  )
  throw err
}
