import type { TPromiseRetry, TRunResult, TTestTestObj } from "src/types"

import { PromiseRetry } from '../utils/promiseRetry'
import { PromiseTimeout } from '../utils/promiseTimeout'

export type TRunTest = Omit<TPromiseRetry<TRunResult>, `promise`> & {
  test:TTestTestObj
}

/**
 * Wraps the test.action in a Promise timeout and a Promise retry
 * Promise retry wraps the timeout, so each retry gets the same amount of time to resolve
 */
export const runTest = async (args:TRunTest) => {
  const {test, ...rest} = args

  return PromiseRetry({
    ...rest,
    retry: test.retry || rest.retry || 0,
    promise: async () => {
      const promise = test.action()

      /**
        * If there is a timeout, Use the PromiseTimeout to race it against the test action
        * If the timeout wins, it will reject the promise
        * Which then gets picked up in the catch below
        */
      return test.timeout
        ? await PromiseTimeout<TRunResult>({
            promise,
            timeout: test.timeout,
            name: test.description,
            error: `Test failed, the timeout ${test.timeout}ms was exceeded`
          })
        : await promise
    }
  })

}