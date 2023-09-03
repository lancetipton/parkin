import type { TLoopTests, TRunResult, TRunResults } from '../types'

import { Types } from './utils'

import { runTest } from './runTest'
import { loopHooks } from './hooks'
import { runResult } from './runResult'
import { EResultStatus, EResultAction } from '../types'
import { throwBailError, throwExitOnFailed } from '../utils/errors'

import {
  buildTestArgs,
  shouldSkipTest,
} from './runHelpers'


/**
 * Helper to loop over tests and call their test method
 *
 * @returns {Object} - Built run result object of the test results
 */
export const loopTests = async (args:TLoopTests) => {
  const {
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
  } = args

  let testsFailed = false
  const results:TRunResults = []

  // ------ describe - loop tests ------ //
  for (let testIdx = 0; testIdx < describe.tests.length; testIdx++) {

    if(shouldAbort()) break

    const {
      test,
      specId,
      testPath,
      fullName,
    } = buildTestArgs({ suiteId, testIdx, describe })

    let testResult = runResult(test, {
      stats,
      fullName,
      testPath,
      id: specId,
      action: EResultAction.start,
    })

    const shouldSkip = shouldSkipTest({
      test,
      testOnly,
      skipAfterFailed,
      hasFailed: testsFailed
    })

    if(shouldSkip){
      const skipped = {
        ...testResult,
        skipped: true,
        action: EResultAction.skipped,
        status: EResultStatus.skipped,
      }

      await onSpecStart(skipped)
      results.push(skipped)
      continue
    }
    else await onSpecStart(testResult)

    if(shouldAbort()) break

    const beforeEachResults = await loopHooks({
      test,
      stats,
      specId,
      suiteId,
      describe,
      type: Types.beforeEach,
    })

    if (beforeEachResults?.length) {
      testsFailed = true
      results.push(...beforeEachResults)
      beforeEachResults.forEach(onSpecDone)
      break
    }

    // ------ execute test ------ //
    try {

      /**
       * If there is a timeout, Use the PromiseTimeout to race it against the test action
       * If the timeout wins, it will reject the promise
       * Which then gets picked up in the catch below
       */
      const result = await runTest({
        test,
        retry: testRetry,
        onRetry: onTestRetry,
      })

      // If we get to here, the test passed, so up the passed spec count
      stats.passedSpecs += 1

      testResult = runResult(test, {
        stats,
        fullName,
        id: specId,
        testPath: testPath,
        passed: result || true,
        action: EResultAction.test,
      })

    }
    catch (error) {
      testsFailed = true
      stats.failedSpecs += 1

      testResult = runResult(test, {
        stats,
        fullName,
        id: specId,
        testPath: testPath,
        action: EResultAction.test,
        failed: {
          error,
          fullName,
          description: error.message,
          status: EResultStatus.failed,
        },
      })

      const shouldBail = Boolean(bail && stats.failedSpecs >= bail)
      if(exitOnFailed || shouldBail){
        results.push(testResult)
        error.testResults = results
        await onSpecDone(testResult)

        exitOnFailed && throwExitOnFailed(error)
        shouldBail && throwBailError(error, bail)
        break
      }

    }
    
    if(shouldAbort()) break

    const afterEachResults = await loopHooks({
      test,
      stats,
      specId,
      suiteId,
      describe,
      type: Types.afterEach,
    })
    if (afterEachResults?.length) {
      testsFailed = true
      results.push(...afterEachResults)
      afterEachResults.forEach(onSpecDone)
      break
    }

    results.push(testResult)

    await onSpecDone({
      ...testResult,
      action: EResultAction.end
    })

  }

  return shouldAbort()
    ? { tests: [], failed: testsFailed }
    : { tests: results, failed: testsFailed }

}
