import type {
  TRun,
  TRunResult,
  TTestStats,
  TRunResults,
  TParkinTestCB,
  TDescribeTestObj,
} from '../types'

import { runResult } from './runResult'
import { loopTests } from './loopTests'
import { callDescribeHooks } from './hooks'
import { shouldSkipDescribe } from './runHelpers'
import { EResultStatus, EResultAction } from '../types'

export type TLoopChildren<T=any> = {
  stats:TTestStats
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
    stats,
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
    * If an error is thrown by something other then a test of hook 
    * Or a Parkin Bail Error is thrown from a failed test, then it will show up here
    * We capture it so we can still call the onSuiteEnd callback, then rethrow the error
    */
  catch(err){
    stats.failedSuites += 1
    const errorResult = runResult(describe, {
      ...describeResult,
      stats,
      action: EResultAction.end,
      failed: {
        error: err,
        description: err.message,
        status: EResultStatus.failed,
        fullName: describe.description,
      }
    })

    // If there's testsResults
    // Store them in the describe result, and remove them from the error
    if(err.testResults){
      errorResult.tests = err.testResults
      err.testResults = undefined
    }

    await onSuiteDone(errorResult)

    err.results = err.results || []
    err.results.push(errorResult)

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
    bail,
    stats,
    testOnly,
    testRetry,
    onSpecDone,
    onSuiteDone,
    shouldAbort,
    onTestRetry,
    onSpecStart,
    onSuiteStart,
    describeOnly,
    parentIdx = ``,
    exitOnFailed,
    skipAfterFailed,
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
      stats,
      id: suiteId,
      testPath: `/${suiteId}`,
      action: EResultAction.start,
      fullName: describe.description,
    })


    if (shouldSkipDescribe({ describe, describeOnly, testOnly })) {
      await onSuiteStart({
        ...describeResult,
        skipped: true,
        action: EResultAction.skipped,
        status: EResultStatus.skipped,
      })
      continue
    }
    else await onSuiteStart(describeResult)

    const beforeResults = await callDescribeHooks({
      root,
      stats,
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
          stats,
          describe,
          onSuiteDone,
          describeResult,
          loopFun: async () => await loopTests({
            bail,
            stats,
            suiteId,
            describe,
            testOnly,
            onSpecDone,
            testRetry,
            onTestRetry,
            shouldAbort,
            onSpecStart,
            exitOnFailed,
            skipAfterFailed,
          })
        })
      : describeResult

    if(exitOnFailed && describeResult.failed){
      describeFailed = true
      stats.failedSuites += 1
      await onSuiteDone(describeResult)
      results.push(describeResult)
      break
    }

    // Loop over any describe children
    describeResult = describe?.describes?.length
      ? await loopChildren({
          stats,
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

    describeResult.failed
      ? (stats.failedSuites += 1)
      : (stats.passedSuites += 1)

    if(exitOnFailed && describeResult.failed){
      describeFailed = true
      await onSuiteDone(describeResult)
      results.push(describeResult)
      break
    }

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
      stats,
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

    await onSuiteDone(describeResult)
    results.push(describeResult)
  }

  return shouldAbort()
    ? { describes: [], failed: describeFailed }
    : { describes: results, failed: describeFailed }

}
