import type {
  TType,
  TTestObj,
  THookTypes,
  TTestAction,
  TRootTestObj,
  TGlobalTypes,
  TTestHookMethod,
  TDescribeAction,
  TDescribeTestObj,
} from '../types'

import { ParkinError } from '../utils/errors'
import { keyMap, isFunc, isStr, noOpObj } from '@keg-hub/jsutils'

/**
 * @type {Object}
 * Key value pair of all helper method names for the ParkinTest Class
 */
export const hookTypes = keyMap<THookTypes>([
  `beforeAll`,
  `beforeEach`,
  `afterAll`,
  `afterEach`,
])

/**
 * @type {Object}
 * Key value pair of all methods added to the global scope
 */
export const globalTypes:TGlobalTypes = {
  ...keyMap([ `test`, `it`, `xtest`, `xit`, `describe` ]),
  ...hookTypes,
}

/**
 * @type {Object}
 * Key value pair of allowed Types for the ParkinTest Class
 */
export const Types:TType = {
  ...globalTypes,
  ...keyMap([`root`]),
}

/**
 * Adds the class instance methods to the global scope
 * @param {Object} instance - An instance of the ParkinTest Class
 *
 * @returns void
 */
export const addToGlobal = (instance:TTestObj) => {}

/**
 * Throws an Error from the passed in error
 * @param {string} error - The Error message or Object to throw
 *
 * @throws
 */
export const throwError = (error:string) => {
  throw new ParkinError(error)
}

/**
 * Validates the required arguments were passed in of a helper method
 * @throws
 *
 */
export const validateHook = (
  type:keyof typeof Types,
  action:TTestHookMethod,
) => {
  !isFunc(action) &&
    throwError(
      `The ${type} method requires a "function" as the first argument`
    )
}

export const validateRootRun = (root:TRootTestObj) => {
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
  action:TTestAction|TDescribeAction
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
export const createItem = <T=TTestObj>(
  type:string,
  metadata:Partial<TTestObj> = noOpObj as TTestObj,
  validate = true
) => {
  const { description, action } = metadata
  validate && validateItem(type, description, action)

  return { ...metadata, type } as T
}

/**
 * Creates a describe object for the passed in description and action
 *
 */
export const createDescribe = (
  description:string,
  action:TDescribeAction
) => {
  const item = createItem(Types.describe, {
    ...createRoot(),
    action,
    tests: [],
    description,
  }) as TDescribeTestObj

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
      ...Object.values(hookTypes).reduce((acc, type) => {
        acc[type] = []
        return acc
      }, {}),
    },
    false
  ) as TRootTestObj
}
