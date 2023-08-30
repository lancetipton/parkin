import type {
  TTestObj,
  TRunResult,
  TRunResultTestMeta
} from '../types'
import { EResultStatus } from '../types'
import { isObj } from '@keg-hub/jsutils'


/**
 * Builds a test run result base on the passed in arguments
 *
 */
export const runResult = (
  item:TTestObj,
  {
    id,
    tests,
    action,
    failed,
    passed,
    testPath,
    fullName,
    describes,
  }:TRunResultTestMeta
) => {

  const result:TRunResult = {
    id,
    action,
    testPath,
    fullName,
    type: item.type,
    failedExpectations: [],
    passedExpectations: [],
    failed: Boolean(failed),
    passed: Boolean(passed),
    description: item.description,
    timestamp: new Date().getTime(),
  }

  if(tests?.length) result.tests = tests
  if(describes?.length) result.describes = describes

  isObj(failed) && result.failedExpectations.push(failed)
  isObj(passed) && result.passedExpectations.push(passed)

  isObj(item?.action?.ParkinMetaData)
    ? (result.metaData = item?.action?.ParkinMetaData)
    : isObj(item?.action?.metaData)
        && (result.metaData = item?.action?.metaData)

  if (passed || failed)
    result.status = passed
      ? EResultStatus.passed
      : result?.metaData?.warnOnFailed
        ? EResultStatus.warning
        : EResultStatus.failed

  return result
}
