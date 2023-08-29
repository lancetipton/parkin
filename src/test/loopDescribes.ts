import type { TDescribeTestObj, TParkinTestCB, TRun, TRunResult, TRunResults } from '../types'

import { runResult } from './runResult'
import { loopTests } from './loopTests'
import { callDescribeHooks } from './hooks'
import { shouldSkipDescribe } from './runHelpers'
import { EResultStatus, EResultAction } from '../types'


export type TLoopChildren<T=any> = {
  describeResult:TRunResult
  onSuiteDone:TParkinTestCB
  describe:TDescribeTestObj
  loopFun:() => Promise<{tests?: TRunResults, describes?: TRunResults, failed: boolean }>
}

/**
 * Helper method to loop over children of a describe test object
 */
const loopChildren = async (args:TLoopChildren) => {
  const {
    describe,
    onSuiteDone,
    describeResult,
    loopFun,
  } = args

  try {
    const results = await loopFun()
    const failed = results?.failed || describeResult?.failed

    const joined = {
      ...describeResult,
      ...results,
      action: EResultAction.end,
    }
    if(failed) joined.failed = failed

    return joined
  }
  /**
    * If an error is thrown by something other then a test of hook then it will show up here
    * We capture it so we can still call the onSuiteEnd callback, then rethrow the error
    */
  catch(err){
    const errorResult = runResult(describe, {
      ...describeResult,
      action: EResultAction.end,
      failed: {
        error: err,
        description: err.message,
        status: EResultStatus.failed,
        fullName: describe.description,
      }
    })
    
    onSuiteDone(errorResult)
    if(!err.result) err.result = errorResult

    throw err
  }

}

/**
 * Helper to loop over describe methods and call child tests
 * @param {Object} args - Config to overwrite the initial test config object
 *
 * @returns {Object} - Built run results of the test results
 */
export const loopDescribes = async (args:TRun) => {
  const {
    root,
    testOnly,
    onSpecDone,
    onSuiteDone,
    testRetry,
    shouldAbort,
    onTestRetry,
    onSpecStart,
    onSuiteStart,
    describeOnly,
    parentIdx = ``,
  } = args

  let describeFailed = false
  const results:TRunResults = []


  // ------ loop describes ------ //
  for (let idx = 0; idx < root.describes.length; idx++) {

    if(shouldAbort()) break

    const describe = root.describes[idx]
    const suiteId = `suite-${parentIdx}${idx}`

    // Create a runResult with general information that can be reused below
    let describeResult = runResult(describe, {
      id: suiteId,
      testPath: `/${suiteId}`,
      action: EResultAction.start,
      fullName: describe.description,
    })


    if (shouldSkipDescribe({ describe, describeOnly, testOnly })) {
      onSuiteStart({
        ...describeResult,
        skipped: true,
        action: EResultAction.skipped,
        status: EResultStatus.skipped,
      })
      continue
    }
    else onSuiteStart(describeResult)

    const beforeResults = await callDescribeHooks({
      root,
      suiteId,
      describe,
      onSuiteDone,
      describeResult,
      type: `before`,
    })

    if (beforeResults?.length) {
      describeFailed = true
      results.push(...beforeResults)
      continue
    }

    if(shouldAbort()) break

    // Loop over any test children
    describeResult = describe?.tests?.length
      ? await loopChildren({
          describe,
          onSuiteDone,
          describeResult,
          loopFun: async () => await loopTests({
            suiteId,
            describe,
            testOnly,
            onSpecDone,
            testRetry,
            onTestRetry,
            shouldAbort,
            onSpecStart,
          })
        })
      : describeResult

    // Loop over any describe children
    describeResult = describe?.describes?.length
      ? await loopChildren({
          describe,
          onSuiteDone,
          describeResult,
          loopFun: async () => await loopDescribes({
            ...args,
            root: describe,
            parentIdx: `${idx}-`,
          })
        })
      : describeResult

    if(shouldAbort()) break

    if (describeResult.failed) {
      describeFailed = true
      describeResult.failed = true
      describeResult.status = EResultStatus.failed
    }
    else {
      describeResult.passed = true
      describeResult.status = EResultStatus.passed
    }

    const afterResults = await callDescribeHooks({
      root,
      suiteId,
      describe,
      onSuiteDone,
      describeResult,
      type: `after`,
    })

    if (afterResults?.length) {
      describeFailed = true
      results.push(...afterResults)
      continue
    }

    if(shouldAbort()) break

    onSuiteDone(describeResult)
    results.push(describeResult)
  }

  return shouldAbort()
    ? { describes: [], failed: describeFailed }
    : { describes: results, failed: describeFailed }

}
