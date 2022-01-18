import { constants } from '../constants'
import { testMethodFill } from './errors'
import { noOp, get } from '@keg-hub/jsutils'
import { hasJasmine, resolveJasmine } from './globalScope'
const { SPEC_RESULT_LOG, LOG_JEST_SPEC_ENV } = constants

/**
 * Converts a log into a string, and logs it to stdout wrapped by SPEC_RESULT_LOG constant
 * Which allows easy parsing the spec output json object
 * @function
 * @private
 * @param {Object} result - Spec result object from jasmine reported
 *
 * @returns {Void}
 */
const logResultToTerminal = (result) => {
  process.stdout.write([
    SPEC_RESULT_LOG,
    JSON.stringify(result),
    SPEC_RESULT_LOG,
  ].join(``))
}


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
 * Builds a custom jasmine reporter
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

  // Wrap the describe method, so we can capture each test suite
  // This allows us to access them later check skip failed specs 
  jasmineEnv.describe = (...args) => {
    const suite = jasmineDescribe.apply(null, args)
    suites.push(suite)

    return suite
  }
 
  return {
    specDone: result => {
      // Check if the env is set to log the spec result
      get(process, `env.${LOG_JEST_SPEC_ENV}`) &&
        logResultToTerminal(result)

      // If the spec passed, just return
      if (result.status !== 'failed') return

      // If the spec failed, loop through all other specs, and disable them
      // This ensures if a spec fails, all follow specs will be skipped
      const suite = suites.find(suite =>
        suite.children.find(spec => spec.result === result)
      )
      suite && suite.children.map(spec => spec.disable())
    },
  }
}

/**
 * Checks if jasmine is available on the global scope
 * If it is, then builds and adds a custom reporter to it
 * @function
 * @export
 *
 * @returns {Void}
 */
export const skipTestsOnFail = testMode => {
  if (!hasJasmine) return

  const jasmineEnv = resolveJasmine().getEnv()

  jasmineEnv &&
    jasmineEnv.describe &&
    jasmineEnv.addReporter(buildReporter(jasmineEnv, testMode))
}
