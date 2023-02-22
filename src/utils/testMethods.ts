import type { TSuite, TSpec, TSpecResult, TJasmineEnv } from '../types'

import { constants } from '../constants'
import { testMethodFill } from './errors'
import { noOp, get } from '@keg-hub/jsutils'
import { hasJasmine, resolveJasmine } from './globalScope'
const { SPEC_RESULT_LOG, LOG_JEST_SPEC_ENV } = constants

enum ETestType {
  it = `it`,
  itx = `itx`,
  test = `test`,
  testx = `testx`,
  describe = `describe`,
  describex = `describex`,
}

/**
 * Converts a log into a string, and logs it to stdout wrapped by SPEC_RESULT_LOG constant
 * Which allows easy parsing the spec output json object
 * @function
 * @private
 *
 */
const logResultToTerminal = (result:TSpecResult) => {
  const timestamp = new Date().getTime()
  get(process, `env.${LOG_JEST_SPEC_ENV}`) &&
    process.stdout.write(
      [
        SPEC_RESULT_LOG,
        JSON.stringify({ ...result, timestamp }),
        SPEC_RESULT_LOG,
      ].join(``)
    )
}

/**
 * Gets the suite type based on the description text
 * The first word should be the type, if not, then it's a feature
 * @function
 * @private
 *
 */
const getSuiteData = (suite:TSuite) => {
  const description:string|undefined = get(suite, `description`)

  const type = !description
    ? `Feature`
    : description.startsWith(`Scenario >`)
      ? `Scenario`
      : description.startsWith(`Background >`)
        ? `Background`
        : description.startsWith(`Rule >`)
          ? `Rule`
          : `Feature`

  return {
    type: type.toLowerCase(),
    // Format the description to match the actual Gherkin syntax
    ...(type !== `Feature` && {
      description: description.replace(`${type} >`, `${type}:`),
    }),
  }
}

/**
 * Resolves a test method from the global scope
 * Returns a NOOP when getTestMethod.PARKIN_TEST_MODE is true
 * This allows testing the runner methods, without running the tests
 * @function
 * @private
 *
 * @returns {function} - Test method
 */
export const getTestMethod = (type:ETestType, testMode?:boolean) => {
  // To write tests for the runner, we have to override the default test methods
  // This allows testing the runner methods, without running the tests
  return testMode ? noOp : global[type] || testMethodFill(type)
}

/**
 * Builds a custom jasmine reporter
 * Checks failed specs and sets all all specs in a suite to disable when found
 * @function
 * @private
 *
 */
const buildReporter = (jasmineEnv:TJasmineEnv) => {
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
    suiteStarted: (suite:TSuite) => {
      logResultToTerminal({
        ...suite,
        ...getSuiteData(suite),
        action: `start`,
      })
    },
    specStarted: (result:TSpecResult) => {
      logResultToTerminal({
        ...result,
        type: `step`,
        action: `start`,
      })
    },
    specDone: (result:TSpecResult) => {
      // Check if the env is set to log the spec result
      logResultToTerminal({
        ...result,
        type: `step`,
        action: `end`,
      })

      // If the spec passed, just return
      if (result.status !== `failed`) return

      // If the spec failed, loop through all other specs, and disable them
      // This ensures if a spec fails, all follow specs will be skipped
      const suite:TSuite = suites.find(suite =>
        suite.children.find((spec:TSpec) => spec.result === result)
      )
      suite && suite.children.map((spec:TSpec) => spec.disable())
    },
    suiteDone: (suite:TSuite) => {
      logResultToTerminal({
        ...suite,
        ...getSuiteData(suite),
        action: `end`,
      })
    },
  }
}

/**
 * Checks if jasmine is available on the global scope
 * If it is, then builds and adds a custom reporter to it
 * @function
 * @export
 *
 */
export const skipTestsOnFail = (testMode?:boolean) => {
  if (!hasJasmine) return

  const jasmineEnv = resolveJasmine().getEnv()

  jasmineEnv &&
    jasmineEnv.describe &&
    jasmineEnv?.addReporter?.(buildReporter(jasmineEnv))
}
