import { keyMap, isFunc, isStr, noOpObj } from '@keg-hub/jsutils'

// TODO: fix these types
type TestObj = Record<any, any>
type TestMethod = (...args:any[]) => any


/**
 * @type {Object}
 * Key value pair of all helper method names for the ParkinTest Class
 */
export const helperTypes:Record<string, string> = keyMap([
  `beforeAll`,
  `beforeEach`,
  `afterAll`,
  `afterEach`,
])

/**
 * @type {Object}
 * Key value pair of all methods added to the global scope
 */
export const globalTypes:Record<string, string> = {
  ...keyMap([ `test`, `it`, `xtest`, `xit`, `describe` ]),
  ...helperTypes,
}

/**
 * @type {Object}
 * Key value pair of allowed Types for the ParkinTest Class
 */
export const Types:Record<string, string> = {
  ...globalTypes,
  ...keyMap([`root`]),
}

/**
 * Adds the class instance methods to the global scope
 * @param {Object} instance - An instance of the ParkinTest Class
 *
 * @returns void
 */
export const addToGlobal = (instance:TestObj) => {}

/**
 * Throws an Error from the passed in error
 * @param {string} error - The Error message or Object to throw
 *
 * @throws
 */
export const throwError = (error:string) => {
  throw new Error(error)
}

/**
 * Validates the required arguments were passed in of a helper method
 * @throws
 *
 */
export const validateHelper = (
  type:string,
  action:TestMethod,
) => {
  !isFunc(action) &&
    throwError(
      `The ${type} method requires a "function" as the first argument`
    )
}

export const validateRootRun = (root:TestObj) => {
  root.type !== Types.root &&
    throwError(`Invalid root type "${root.type}" set for root object`)
  !root.describes ||
    (!root.describes.length &&
      throwError(`No tests have been registered to this ParkinTest instance`))
}

/**
 * Validates the required arguments were passed in
 * @throws
 *
 */
export const validateItem = (
  type:string,
  description:string,
  action:TestMethod
) => {
  !isStr(type) && throwError(`Test item type is required as a string`)
  !isFunc(action) &&
    throwError(
      `The ${type} method requires a "function" as the second argument`
    )
  !isStr(description) &&
    throwError(`The ${type} method requires a "string" as the first argument`)
}

/**
 * Creates an object with meta data of an item of the ParkinTest instance
 *
 */
export const createItem = (
  type:string,
  metadata:TestObj = noOpObj as TestObj,
  validate = true
) => {
  const { description, action } = metadata
  validate && validateItem(type, description, action)
  return { ...metadata, type }
}

/**
 * Creates a describe object for the passed in description and action
 *
 */
export const createDescribe = (
  description:string,
  action:TestMethod
) => {
  const item = createItem(Types.describe, {
    ...createRoot(),
    action,
    tests: [],
    description,
  }) as TestObj

  item.disabled = () => (item.skip = true)

  return item
}

/**
 * Creates a root object
 *
 */
export const createRoot = () => {
  return createItem(
    Types.root,
    {
      describes: [],
      ...Object.values(helperTypes).reduce((acc, type) => {
        acc[type] = []
        return acc
      }, {}),
    },
    false
  ) as TestObj
}
