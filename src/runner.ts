import type { Hooks } from './hooks'
import type { Steps } from './steps'
import type {
  TRuleAst,
  TStepAst,
  TFeatureAst,
  TWorldConfig,
  TScenarioAst,
  TStepParentAst,
  TParkinRunOpts,
  TBackgroundAst,
  TParkinRunFeaturesInput
} from './types'

import { parseFeature } from './parse'
import { ETestType, EHookType } from './types'
import { PromiseTimeout } from './utils/promiseTimeout'
import { filterFeatures } from './utils/filterFeatures'
import { getTestMethod, skipTestsOnFail } from './utils/testMethods'
import {
  throwMissingSteps,
  throwMissingHooks,
  throwMissingFeatureText
} from './utils/errors'
import {
  isArr,
  isObj,
  isStr,
  pickKeys,
  emptyObj,
  capitalize,
} from '@keg-hub/jsutils'

type TRunTestMode = {
  PARKIN_TEST_MODE?: boolean
} & ((...args:any) => any)

/**
 * Builds the title for the current suite and spec being run
 * @function
 * @private
 * @param {string} text - Text content of the suite or spec
 * @param {string} type - Type of spec of suite being run
 *
 * @returns {string} - Built title
 */
const buildTitle = (text:string, type:string) => {
  return `${capitalize(type)} > ${text}`
}

/**
 * Resolves and parses features based on the data type passed in
 * Ensures an array of parsed features is returned
 * @function
 * @public
 * @param {TFeatureAst} data - Feature content
 * @param {TWorldConfig} $world - Holds configuration for the running test environment
 *
 * @returns {Array} - passed in data converted into parsed Features
 */
const resolveFeatures = (
  data:TParkinRunFeaturesInput,
  $world:TWorldConfig
):TFeatureAst[] => {
  return isStr(data)
    ? parseFeature(data, $world)
    : isObj<TFeatureAst>(data)
      ? [data]
      : isArr<TFeatureAst[]>(data)
        ? (data as TFeatureAst[]).reduce(
          (features, feature) =>
            features.concat(resolveFeatures(feature, $world)),
          []
        )
        : throwMissingFeatureText()
}

/**
 * Calls the `it` global passing in a registered step function based on the step text
 * @function
 * @private
 * @param {Steps} stepsInstance - Instance of the Steps class
 * @param {TStepAst} step - Parsed Step mode object
 * @param {boolean} testMode - Allows testing the runner methods, without running the tests
 *
 * @returns {Void}
 */
const runStep = async (
  stepsInstance:Steps,
  step:TStepAst,
  options:TParkinRunOpts,
  testMode:boolean
) => {
  const test = getTestMethod(ETestType.test, testMode)
  const testMethod = async () => {
    const stepOpts = options?.testOptions?.[step?.uuid]
    const stepTimeout = stepOpts?.timeout || options?.timeout
    const resolved = stepsInstance.resolve(
      step.step,
      step,
      stepOpts
    )
    /**
     * If there's a timeout set || it's  greater than 0 use the PromiseTimeout
     * Otherwise just return the resolved, with NO timeout
     * **IMPORTANT** - This is a timeout for Parkin Runner Only
     * The `test` method from the `test` framework could have it's own timeout method
     */
    return stepTimeout
      ? PromiseTimeout(resolved, stepTimeout, `Step`)
      : resolved
  }
  testMethod.ParkinMetaData = pickKeys(
    step,
    [ `uuid`, `step`, `index`, `type`, `definition`]
  )
  

  test(`${capitalize(step.type)} ${step.step}`, testMethod)
}

/**
 * Loops through the parents steps and calls the matching definition method
 * @function
 * @private
 * @param {TStepParentAst} parent - Parent object containing the steps to run
 * @param {string} title - Text passed as the first argument to the describe method
 * @param {Steps} stepsInstance - Instance of the Steps class
 * @param {boolean} testMode - Allows testing the runner methods, without running the tests
 *
 * @returns {Array} - Responses from the parents steps
 */
const loopSteps = (
  parent:TStepParentAst,
  title:string,
  stepsInstance:Steps,
  options:TParkinRunOpts,
  testMode:boolean
) => {
  const describe = getTestMethod(ETestType.describe, testMode)

  let responses = []
  const describeMethod = () => {
    // Map over the steps and call them
    // Store the returned promise in the responses array
    const responses = parent.steps.map(step =>
      runStep(stepsInstance, step, options, testMode)
    )

    // Ensure we resolve all promises inside the describe block
    Promise.all(responses)
  }
  describeMethod.ParkinMetaData = pickKeys(
    parent,
    [`index`, `uuid`, `tags`, `type`, `background`, `scenario`]
  )

  describe(title, describeMethod)

  return responses
}

/**
 * Loops through the passed in scenarios steps and calls runStep for each
 * @function
 * @private
 * @param {Steps} stepsInstance - Instance of the Steps class
 * @param {TScenarioAst} scenario - Parsed feature scenario object containing the steps to run
 * @param {TBackgroundAst} background - Parsed feature scenario object containing the steps to run
 * @param {boolean} testMode - Allows testing the runner methods, without running the tests
 *
 * @returns {Void}
 */
const runScenario = (
  stepsInstance:Steps,
  scenario:TScenarioAst,
  background:TBackgroundAst,
  options:TParkinRunOpts,
  testMode:boolean
) => {
  const responses = []

  // If there's a background, run the background steps first
  background &&
    responses.push(
      ...runBackground(stepsInstance, scenario.scenario, background, options, testMode)
    )

  // Next run the scenario steps once the background completes
  return responses.concat(
    loopSteps(
      scenario,
      buildTitle(scenario.scenario, `Scenario`),
      stepsInstance,
      options,
      testMode
    )
  )
}

/**
 * Loops through the steps of the passed in background and calls runStep for each
 * @function
 * @private
 * @param {Steps} stepsInstance - Instance of the Steps class
 * @param {string} title - Description or title of the background
 * @param {TBackgroundAst} background - Parsed feature scenario object containing the steps to run
 * @param {boolean} testMode - Allows testing the runner methods, without running the tests
 *
 * @returns {Void}
 */
const runBackground = (
  stepsInstance:Steps,
  title:string,
  background:TBackgroundAst,
  options:TParkinRunOpts,
  testMode:boolean
) => {
  // If there's a background, run the background steps first
  return loopSteps(
    background,
    buildTitle(title, `Background`),
    stepsInstance,
    options,
    testMode
  )
}

/**
 * Loops through the passed in rules steps and calls runStep for each
 * @function
 * @private
 * @param {Steps} stepsInstance - Instance of the Steps class
 * @param {TRuleAst} rule - Parsed feature rule object containing the steps to run
 * @param {TBackgroundAst} background - Parsed background object containing the steps to run before the rule
 * @param {boolean} testMode - Allows testing the runner methods, without running the tests
 *
 * @returns {Void}
 */
const runRule = (
  stepsInstance:Steps,
  rule:TRuleAst,
  background:TBackgroundAst,
  options:TParkinRunOpts,
  testMode:boolean
) => {
  // Map over the rule scenarios and call their steps
  // Store the returned promise in the responses array
  let responses = []
  
  const describeMethod = () => {
    background &&
      responses.push(
        ...responses.concat(
          runBackground(stepsInstance, rule.rule, background, options, testMode)
        )
      )

    responses.push(
      ...rule.scenarios.map(scenario =>
        runScenario(stepsInstance, scenario, rule.background, options, testMode)
      )
    )

    // Ensure we resolve all promises inside the describe block
    Promise.all(responses)
  }
  describeMethod.ParkinMetaData = pickKeys(
    rule,
    [`index`, `uuid`, `tags`, `type`, `rule`]
  )

  describe(`Rule > ${rule.rule}`, describeMethod)

  return responses
}

/**
 * Parses and runs the steps of a feature text string
 * Uses the registered steps of the passed in Steps class instance to evaluate the feature steps
 * @class
 * @public
 * @param {Object} stepsInstance - Instance of the Steps class
 * @param {Hooks} hooksInstance - instance of the Hooks class, storing the client's registered test callbacks
 *
 * @returns {Object} Instance of the Runner class
 */
export class Runner {
  
  steps:Steps
  hooks:Hooks
  _world:TWorldConfig
  
  constructor(steps:Steps, hooks:Hooks, world:TWorldConfig) {
    !steps && throwMissingSteps()
    !hooks && throwMissingHooks(hooks)

    this.steps = steps
    this.hooks = hooks
    this._world = world
  }

  /**
   * Gets the features to be run for a test
   * @param {TParkinRunFeaturesInput} data - Feature data as a string or parsed Feature model
   * @param {TParkinRunOpts} options - Define how the steps are run
   */
  getFeatures = (
    data:TParkinRunFeaturesInput,
    options:TParkinRunOpts
  ) => {
    const features = resolveFeatures(data, this._world)
    return filterFeatures(features, options)
  }

  /**
   * Parses and runs the steps of a feature text string
   * Matches each step to a registered steps of the Steps class instance
   * @memberof Runner
   * @function
   * @public
   * @param {TParkinRunFeaturesInput} data - Feature data as a string or parsed Feature model
   * @param {TParkinRunOpts} options - Define how the steps are run
   *
   * @returns {boolean} - whether any tests ran
   */
  run = async (
    data:TParkinRunFeaturesInput,
    options:TParkinRunOpts=emptyObj
  ) => {
    // Set if were running tests for Parkin, or external tests
    // Only used for testing purposes
    const testMode = (this.run as TRunTestMode).PARKIN_TEST_MODE

    // Setup step skip on failed
    skipTestsOnFail(testMode)

    const describe = getTestMethod(ETestType.describe, testMode)
    const beforeAll = getTestMethod(ETestType.beforeAll, testMode)
    const afterAll = getTestMethod(ETestType.afterAll, testMode)
    const beforeEach = getTestMethod(ETestType.beforeEach, testMode)
    const afterEach = getTestMethod(ETestType.afterEach, testMode)

    // Get all the features to be run
    // Then filter them based on any options tags
    const features = this.getFeatures(data, options)
    if (!features.length) return false

    // Ensures all tests resolve before ending by
    // Using promises to resolve each feature / scenario / step
    const promises = await features.map(async feature => {
      let responses = []

      beforeAll(this.hooks.getRegistered(EHookType.beforeAll))
      afterAll(this.hooks.getRegistered(EHookType.afterAll))
      beforeEach(this.hooks.getRegistered(EHookType.beforeEach))
      afterEach(this.hooks.getRegistered(EHookType.afterEach))

      const describeMethod = () => {
        responses.push(
          ...feature.rules.reduce((acc:any[], rule:TRuleAst) => {
            acc.push(runRule(
              this.steps,
              rule,
              feature.background,
              options,
              testMode
            ))

            return acc
          }, [] as any[])
        )

        responses.push(
          ...feature.scenarios.reduce((acc:any[], scenario:TScenarioAst) => {
            acc.push(runScenario(
              this.steps,
              scenario,
              feature.background,
              options,
              testMode
            ))

            return acc
          }, [] as any[])
        )

        // Ensure we resolve all promises inside the describe block
        Promise.all(responses)
      }
      describeMethod.ParkinMetaData = pickKeys(
        feature,
        [`index`, `uuid`, `tags`, `feature`, `type`, `errors`]
      )
    
      // Map over the features scenarios and call their steps
      // Store the returned promise in the responses array
      describe(buildTitle(feature.feature, `Feature`), describeMethod)

      return responses
    })

    // Ensure all promises are resolved before returning
    await Promise.all(promises)

    return true
  }
}
