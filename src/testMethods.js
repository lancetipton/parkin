import { noOp } from '@keg-hub/jsutils'
import { testMethodFill } from './errors'
import { hasWindow, hasJasmine } from './globalObj'

/**
 * Resolves a test method from the global scope
 * Returns a NOOP when getTestMethod.PARKIN_TEST_MODE is true
 * This allows testing the runner methods, without running the tests
 * @function
 * @private
 * @param {string} type - Name of test method to get from the global scope
 * @param {boolean} testMode - Allows testing the runner methods, without running the tests
 *
 * @returns {function} - Test method
 */
export const getTestMethod = (type, testMode) => {
  // To write tests for the runner, we have to override the default test methods
  // This allows testing the runner methods, without running the tests
  return testMode ? noOp : global[type] || testMethodFill(type)
}

/**
 * Builds a custom jasmin reporter
 * Checks failed specs and sets all all specs in a suite to disable when found
 * @function
 * @private
 * @param {Object} jasmineEnv - The current jasmine environment
 *
 * @returns {Object} - Custom jasmine reporter
 */
const buildReporter = (jasmineEnv, testMode) => {
  const suites = []
  const jasmineDescribe = jasmineEnv.describe

  jasmineEnv.describe = (...args) => {
    const suite = jasmineDescribe.apply(null, args)
    suites.push(suite)

    return suite
  }

  return {
    specDone: result => {
      if (result.status !== 'failed') return

      const suite = suites.find(suite =>
        suite.children.find(spec => spec.result === result)
      )
      suite && suite.children.map(spec => spec.disable())
    },
  }
}

/**
 * Checks i jasmine is available on the global scope
 * If it is, then builds and adds a custom reporter to it
 * @function
 * @export
 *
 * @returns {Void}
 */
export const skipTestsOnFail = testMode => {
  if (hasWindow || !hasJasmine) return

  const jasmineEnv = global.jasmine.getEnv()
  jasmineEnv.addReporter(buildReporter(jasmineEnv, testMode))
}
