import type {
  TRun,
  TLoopTests,
  TRunResults,
  TRootTestObj,
  TRunResult,
} from '../types'

import { runResult } from './runResult'
import { Types, validateRootRun } from './utils'
import { EResultStatus, EResultAction } from '../types'
import { PromiseTimeout } from '../utils/promiseTimeout'
import {
  loopHooks,
  callDescribeHooks,
} from './hooks'

import {
  buildTestArgs,
  shouldSkipTest,
  shouldSkipDescribe,
} from './runHelpers'


/**
 * Helper to loop over tests and call their test method
 *
 * @returns {Object} - Built run result object of the test results
 */
const loopTests = async (args:TLoopTests) => {
  const {
    suiteId,
    describe,
    testOnly,
    specDone,
    shouldAbort,
    specStarted
  } = args

  let describeFailed = false
  const results = []

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
      fullName,
      testPath,
      id: specId,
      action: EResultAction.start,
    })

    if(shouldSkipTest({ testOnly, test })){
      specStarted({
        ...testResult,
        skipped: true,
        action: EResultAction.skipped,
        status: EResultStatus.skipped,
      })
      continue
    }
    else specStarted(testResult)

    if(shouldAbort()) break

    const beforeEachResults = await loopHooks({
      test,
      specId,
      suiteId,
      describe,
      type: Types.beforeEach,
    })

    if (beforeEachResults?.length) {
      describeFailed = true
      results.push(...beforeEachResults)
      beforeEachResults.forEach(specDone)
      break
    }

    // ------ execute test ------ //
    try {

      const promise = test.action()
      /**
       * If there is a timeout, Use the PromiseTimeout to race it against the test action
       * If the timeout wins, it will reject the promise
       * Which then gets picked up in the catch below
       */
      const result = test.timeout
        ? await PromiseTimeout<TRunResult>({
            promise,
            timeout: test.timeout,
            name: test.description,
            error: `Test failed, the timeout ${test.timeout}ms was exceeded`
          })
        : await promise

      testResult = runResult(test, {
        fullName,
        id: specId,
        testPath: testPath,
        passed: result || true,
        action: EResultAction.test,
      })
    }
    catch (error) {
      testResult = runResult(test, {
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

      describeFailed = true
    }
    
    if(shouldAbort()) break

    const afterEachResults = await loopHooks({
      test,
      specId,
      suiteId,
      describe,
      type: Types.afterEach,
    })
    if (afterEachResults?.length) {
      describeFailed = true
      results.push(...afterEachResults)
      afterEachResults.forEach(specDone)
      break
    }

    results.push(testResult)
    specDone({
      ...testResult,
      action: EResultAction.end
    })
  }

  return shouldAbort()
    ? { tests: [], failed: describeFailed }
    : { tests: results, failed: describeFailed }

}

/**
 * Helper to loop over describe methods and call child tests
 * @param {Object} args - Config to overwrite the initial test config object
 *
 * @returns {Object} - Built run results of the test results
 */
const loopDescribes = async (args:TRun) => {
  const {
    root,
    testOnly,
    specDone,
    suiteDone,
    shouldAbort,
    specStarted,
    suiteStarted,
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
      suiteStarted({
        ...describeResult,
        skipped: true,
        action: EResultAction.skipped,
        status: EResultStatus.skipped,
      })
      continue
    }
    else suiteStarted(describeResult)

    const beforeResults = await callDescribeHooks({
      root,
      suiteId,
      describe,
      suiteDone,
      describeResult,
      type: `before`,
    })

    if (beforeResults?.length) {
      describeFailed = true
      results.push(...beforeResults)
      continue
    }

    if(shouldAbort()) break

    const testResults = await loopTests({
      suiteId,
      describe,
      testOnly,
      specDone,
      shouldAbort,
      specStarted,
    })

    if(shouldAbort()) break

    const describesResults =
      describe.describes &&
      describe.describes.length &&
      (await loopDescribes({
        ...args,
        root: describe,
        parentIdx: `${idx}-`,
      }))

    describeResult = {
      ...describeResult,
      ...describesResults,
      tests: testResults.tests,
      action: EResultAction.end,
    }

    if (testResults.failed || describesResults.failed) {
      describeFailed = true
      describeResult.failed = true
    }
    else describeResult.passed = true

    const afterResults = await callDescribeHooks({
      root,
      suiteId,
      describe,
      suiteDone,
      describeResult,
      type: `after`,
    })

    if (afterResults?.length) {
      describeFailed = true
      results.push(...afterResults)
      continue
    }

    if(shouldAbort()) break

    suiteDone(describeResult)
    results.push(describeResult)
  }

  return shouldAbort()
    ? { describes: [], failed: describeFailed }
    : { describes: results, failed: describeFailed }

}

/**
 * Executes all methods registered to the ParkinTest instance
 * @param {Object} args - Config to overwrite the initial test config object
 *
 * @returns {Object} - Results of the test run
 */
export const run = async (args:TRun):Promise<TRunResults> => {
  const {
    root,
    onAbort,
    shouldAbort
  } = args

  let describes:TRunResults = []

  validateRootRun(root as TRootTestObj)

  const beforeAllResults = await loopHooks({
    root,
    suiteId: Types.root,
    type: Types.beforeAll,
  })

  if(shouldAbort()){
    onAbort?.()
    describes.aborted = true
    return describes
  }

  // If a before all throws an error, we don't want to run the rest of the tests, so just return
  if (beforeAllResults?.length) return beforeAllResults

  // Ensure the afterAll hooks are always called
  // Wrap the loopDescribes in a ty/catch/finally to ensure they are called at the end
  try {
    const resp = await loopDescribes(args)
    describes = resp.describes

    if(shouldAbort()){
      onAbort?.()
      describes.aborted = true
      return describes
    }
  }
  catch(err){
    describes.push(
      runResult(root, {
        id: Types.root,
        fullName: root.description,
        testPath: `/${Types.root}`,
        action: EResultAction.end,
        status: EResultStatus.failed,
        failed: {
          error: err,
          description: err.message,
          fullName: root.description,
          status: EResultStatus.failed,
        }
      })
    )
  }
  finally {
    const afterAllResult = await loopHooks({
      root: root,
      suiteId: Types.root,
      type: Types.afterAll,
    })
    afterAllResult?.length && describes.push(...afterAllResult)
  }

  return describes
}
