import type {
  TType,
  TRootTestObj,
  TTestTestObj,
  TParkinTestCB,
  TDescribeTestObj,
} from '../types'


import { Types } from './utils'
import { EResultStatus, EResultAction } from '../types'
import { runResult } from './runResult'

type TLoopHooks = {
  test?:TTestTestObj
  type: keyof TType
  describe?:TDescribeTestObj
  specId?:keyof TType|string
  suiteId?:keyof TType|string
  root?: TRootTestObj|TDescribeTestObj
}

/**
 * Helper to loop over hooks and call them
 * @param {Object} args - Data for calling the passed in hook by type
 *
 * @returns {Object} - Built run result object if a hook fails
 */
export const loopHooks = async (args:TLoopHooks) => {
  const {
    type,
    test,
    root,
    specId,
    suiteId,
    describe,
  } = args

  let hookIdx
  const activeItem = root || describe
  const fullName = root
    ? root.description
    : test
      ? `${describe?.description} > ${test?.description} > ${type}`
      : `${describe?.description} > ${type}`

  try {
    activeItem[type].length &&
      (await Promise.all(
        activeItem[type].map((fn, idx) => {
          hookIdx = idx
          return fn()
        })
      ))
  }
  catch (error) {
    return runResult(activeItem, {
      fullName,
      action: type as EResultAction,
      id: test ? specId : suiteId,
      status: EResultStatus.failed,
      failed: {
        error,
        fullName,
        description: error.message,
        status: EResultStatus.failed,
      },
      testPath: test
        ? `/${suiteId}/${specId}/${type}${hookIdx}`
        : `/${suiteId}/${type}${hookIdx}`,
    })
  }
}


/**
 * Helper to call the before hooks from the root and current describe
 * @param {Object} args - Arguments needed to call the before hooks
 *
 * @returns {Object} - Built results if a hook throws an error
 */
export const callBeforeHooks = async ({ root, suiteId, describe }) => {
  const beforeEachResult = await loopHooks({
    root,
    suiteId: Types.root,
    type: Types.beforeEach,
  })

  const beforeAllResult =
    !beforeEachResult &&
    (await loopHooks({
      suiteId,
      describe,
      type: Types.beforeAll,
    }))

  return beforeEachResult || beforeAllResult
}

/**
 * Helper to call the after hooks from the root and current describe
 * @param {Object} args - Arguments needed to call the after hooks
 *
 * @returns {Object} - Built results if a hook throws an error
 */
export const callAfterHooks = async ({ root, suiteId, describe }) => {
  const afterEachResult = await loopHooks({
    root,
    suiteId: Types.root,
    type: Types.afterEach,
  })

  const afterAllResult =
    !afterEachResult &&
    (await loopHooks({
      suiteId,
      describe,
      type: Types.afterAll,
    }))

  return afterEachResult || afterAllResult
}
