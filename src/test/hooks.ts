import type {
  TType,
  TRunResult,
  TRootTestObj,
  TTestTestObj,
  TParkinHookCB,
  TDescribeTestObj,
} from '../types'


import { Types } from './utils'
import { runResult } from './runResult'
import { EResultStatus, EResultAction, ETestType } from '../types'

type TLoopHooks = {
  test?:TTestTestObj
  type: keyof TType
  describe?:TDescribeTestObj
  specId?:keyof TType|string
  suiteId?:keyof TType|string
  root?: TRootTestObj|TDescribeTestObj
}

export type TDescribeHooks = {
  suiteId:string
  type:`before`|`after`
  describe:TDescribeTestObj
  describeResult:TRunResult
  root:TDescribeTestObj | TRootTestObj
  onSuiteDone:(result: TRunResult) => void
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

  let hookResults:TRunResult[] = []

  let hookIdx
  const activeItem = root || describe
  const fullName = root
    ? root.description
    : test
      ? `${describe?.description} > ${test?.description} > ${type}`
      : `${describe?.description} > ${type}`


  activeItem[type].length &&
    await Promise.all(
      activeItem[type].map(async (fn:TParkinHookCB, idx:number) => {
        hookIdx = idx
        return await Promise.resolve()
          .then(() => fn?.())
          .catch((error:Error) => {
            hookResults.push(
              runResult(activeItem, {
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
            )
          })
      })
    )

  return hookResults
}


/**
 * Helper to call the before hooks from the root and current describe
 * @param {Object} args - Arguments needed to call the before hooks
 *
 * @returns {Object} - Built results if a hook throws an error
 */
const callBeforeHooks = async ({ root, suiteId, describe }) => {
  const beforeEachResult = await loopHooks({
    root,
    suiteId: Types.root,
    type: Types.beforeEach,
  })

  const beforeAllResult = await loopHooks({
    suiteId,
    describe,
    type: Types.beforeAll,
  })

  return [...beforeEachResult, ...beforeAllResult]
}

/**
 * Helper to call the after hooks from the root and current describe
 * @param {Object} args - Arguments needed to call the after hooks
 *
 * @returns {Object} - Built results if a hook throws an error
 */
const callAfterHooks = async ({ root, suiteId, describe }) => {
  const afterEachResult = await loopHooks({
    root,
    suiteId: Types.root,
    type: Types.afterEach,
  })

  const afterAllResult = await loopHooks({
      suiteId,
      describe,
      type: Types.afterAll,
    })

  return [...afterEachResult, ...afterAllResult]
}


/**
 * Helper to call the before and after hooks for describe methods
 * @param {Object} args - Arguments needed to call the after hooks
 *
 * @returns {Object} - Built results if a hook throws an error
 */
export const callDescribeHooks = async (args:TDescribeHooks) => {
  const {
    root,
    type,
    suiteId,
    describe,
    onSuiteDone,
    describeResult
  } = args

  const results:TRunResult[] = []

  const hooksResults = type === `before`
    ? await callBeforeHooks({root, suiteId, describe })
    : await callAfterHooks({root, suiteId, describe })
  
  if(!hooksResults?.length) return results
  
  if (hooksResults?.length) {
    const describeResults = await Promise.all(
      hooksResults.map(async (result) => {
        const joined = {...describeResult, ...result, failed: true, passed: false }
        await onSuiteDone(joined)

        return joined
      })
    )

    results.push(...describeResults)
  }

  return results
}