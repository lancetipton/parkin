import type {
  TRun,
  TLoopTests,
  TRunResults,
  TRootTestObj,
} from '../types'

import { runResult } from './runResult'
import { Types, validateRootRun } from './utils'
import { EResultStatus, EResultAction } from '../types'
import {
  loopHooks,
  callAfterHooks,
  callBeforeHooks,
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

    const beforeEachResult = await loopHooks({
      test,
      specId,
      suiteId,
      describe,
      type: Types.beforeEach,
    })
    if (beforeEachResult) {
      describeFailed = true
      results.push(beforeEachResult)
      specDone(beforeEachResult)
      break
    }

    // ------ execute test ------ //
    try {
      const result = await test.action()
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
          fullName: error.name,
          description: error.message,
          status: EResultStatus.failed,
        },
      })
      describeFailed = true
    }
    
    if(shouldAbort()) break

    const afterEachResult = await loopHooks({
      test,
      specId,
      suiteId,
      describe,
      type: Types.afterEach,
    })
    if (afterEachResult) {
      describeFailed = true
      results.push(afterEachResult)
      specDone(afterEachResult)
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

    const beforeResult = await callBeforeHooks({
      root,
      suiteId,
      describe,
    })
    
    if (beforeResult) {
      describeFailed = true
      describeResult = { ...describeResult, ...beforeResult }
      suiteDone(describeResult)
      results.push(describeResult)
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

    const afterResult = await callAfterHooks({
      root,
      suiteId,
      describe,
    })
    if (afterResult) {
      describeFailed = true
      describeResult = { ...describeResult, ...afterResult }
      suiteDone(describeResult)
      results.push(describeResult)
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
  
  validateRootRun(root as TRootTestObj)

  const beforeAllResult = await loopHooks({
    root: root,
    suiteId: Types.root,
    type: Types.beforeAll,
  })

  if(shouldAbort()){
    onAbort?.()
    const results:TRunResults = []
    results.aborted = true
    return results
  }

  // If a before all throws an error, we don't want to run the rest of the tests, so just return
  if (beforeAllResult) return [beforeAllResult]

  const { describes } = await loopDescribes(args)

  if(shouldAbort()){
    onAbort?.()
    const results:TRunResults = []
    results.aborted = true
    return results
  }

  const afterAllResult = await loopHooks({
    root: root,
    suiteId: Types.root,
    type: Types.afterAll,
  })
  afterAllResult && describes.push(afterAllResult)

  return describes
}
