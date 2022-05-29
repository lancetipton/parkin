import { keyMap, isFunc, isStr, noOpObj } from '@keg-hub/jsutils'

/**
 * @type {Object}
 * Key value pair of all helper method names for the ParkinTest Class
 */
export const helperTypes = keyMap([
  `beforeAll`,
  `beforeEach`,
  `afterAll`,
  `afterEach`,
]) 


/**
 * @type {Object}
 * Key value pair of all methods added to the global scope
 */
export const globalTypes = {
  ...keyMap([`test`, `it`, `xtest`, `xit`, `describe`]),
  ...helperTypes
}


/**
 * @type {Object}
 * Key value pair of allowed Types for the ParkinTest Class
 */
export const Types = {
  ...globalTypes,
  ...keyMap([
    `root`,
  ]),
}

/**
 * Adds the class instance methods to the global scope
 * @param {Object} instance - An instance of the ParkinTest Class
 *
 * @returns void
 */
export const addToGlobal = (instance) => {
  
}

/**
 * Throws an Error from the passed in error
 * @param {string} error - The Error message or Object to throw
 *
 * @throws
 */
export const throwError = (error) => {throw new Error(error)}

/**
 * Validates the required arguments were passed in of a helper method
 * @param {string} type - Type of item to validate
 * @param {function} action - Function to call for the item
 * @param {Object} parent - Current active parent of the ParkinTest Instance
 * @throws
 *
 * @returns {void}
 */
export const validateHelper = (type, action, parent) => {
  !isFunc(action) && throwError(`The ${type} method requires a "function" as the first argument`)
  (!parent || parent.type === Types.root) &&
    throwError(`The ${type} method must be called within a ${Types.describe} method`)
} 

export const validateRootRun = (root) => {
  root.type !== Types.root && throwError(`Invalid root type "${root.type}" set for root object`)
  !root.describes || !root.describes.length &&
    throwError(`No tests have been registered to this ParkinTest instance`)
}

/**
 * Validates the required arguments were passed in
 * @param {string} type - Type of item to validate
 * @param {string} description - Metadata about the item
 * @param {function} action - Function to call for the item
 * @throws
 *
 * @returns {void}
 */
export const validateItem = (type, description, action) => {
  !isStr(type) && throwError(`Test item type is required as a string`)
  !isFunc(action) && throwError(`The ${type} method requires a "function" as the second argument`)
  !isStr(description) && throwError(`The ${type} method requires a "string" as the first argument`)
}

/**
 * Creates an object with meta data of an item of the ParkinTest instance
 * @param {string} type - Type of item to validate
 * @param {string} description - Metadata about the item
 * @param {function} action - Function to call for the item
 * @param {boolean} validate - Should the item be validated
 *
 * @returns {Object} - Item object
 */
export const createItem = (type, metadata=noOpObj, validate=true) => {
  const { description, action } = metadata
  validate && validateItem(type, description, action)
  return {...metadata, type}
}

