import type { TDescribeTestObj, TParkinTestCB, TRootTestObj } from '../types'

import { runResult } from './runResult'
import { Types, validateRootRun } from './utils'
import { EResultStatus, EResultAction } from '../types'
import {
  loopHooks,
  callAfterHooks,
  callBeforeHooks,
} from './hooks'


type TLoopTests = {
  suiteId:string
  testOnly:boolean
  specDone:TParkinTestCB
  specStarted:TParkinTestCB
  describe:TDescribeTestObj
}

type TLoopDescribes = {
  testOnly:boolean
  describeOnly:boolean
  parentIdx:string|number
  specDone:TParkinTestCB
  suiteDone:TParkinTestCB
  specStarted:TParkinTestCB
  suiteStarted:TParkinTestCB
  root:TRootTestObj|TDescribeTestObj
}

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
    specStarted
  } = args

  let describeFailed = false
  const results = []

  // ------ describe - loop tests ------ //
  for (let testIdx = 0; testIdx < describe.tests.length; testIdx++) {
    const test = describe.tests[testIdx]
    const specId = `spec${testIdx}`
    const testPath = `/${suiteId}/${specId}`
    const fullName = `${describe.description} > ${test.description}`

    let testResult = runResult(test, {
      fullName,
      testPath,
      id: specId,
      action: EResultAction.start,
    })

    if ((testOnly && !test.only) || test.skip) {
      specStarted({
        ...testResult,
        skipped: true,
        action: EResultAction.skipped,
        status: EResultStatus.skipped,
      })
      continue
    }
    else specStarted(testResult)

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

  return {
    tests: results,
    failed: describeFailed,
  }
}


/**
 * Helper to loop over describe methods and call child tests
 * @param {Object} args - Config to overwrite the initial test config object
 *
 * @returns {Object} - Built run results of the test results
 */
const loopDescribes = async (args:TLoopDescribes) => {
  const {
    root,
    testOnly,
    specDone,
    suiteDone,
    specStarted,
    parentIdx = ``,
    suiteStarted,
    describeOnly,
  } = args

  let describeFailed = false
  const results = []

  // ------ loop describes ------ //
  for (let idx = 0; idx < root.describes.length; idx++) {
    const describe = root.describes[idx]
    const suiteId = `suite-${parentIdx}${idx}`
    let describeResult = runResult(describe, {
      id: suiteId,
      testPath: `/${suiteId}`,
      action: EResultAction.start,
      fullName: describe.description,
    })

    const shouldSkip =
      describe.skip ||
      (describeOnly && !describe.only && !describe.onlyChild) ||
      (testOnly && !describe.onlyChild)

    if (shouldSkip) {
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

    const testResults = await loopTests({
      suiteId,
      describe,
      testOnly,
      specDone,
      specStarted,
    })

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

    suiteDone(describeResult)
    results.push(describeResult)
  }

  return { describes: results, failed: describeFailed }
}

/**
 * Executes all methods registered to the ParkinTest instance
 * @param {Object} args - Config to overwrite the initial test config object
 *
 * @returns {Object} - Results of the test run
 */
export const run = async (args) => {
  validateRootRun(args.root)

  const beforeAllResult = await loopHooks({
    root: args.root,
    suiteId: Types.root,
    type: Types.beforeAll,
  })

  // If a before all throws an error, we don't want to run the rest of the tests, so just return
  if (beforeAllResult) return [beforeAllResult]

  const { describes } = await loopDescribes(args)

  const afterAllResult = await loopHooks({
    root: args.root,
    suiteId: Types.root,
    type: Types.afterAll,
  })
  afterAllResult && describes.push(afterAllResult)

  return describes
}
