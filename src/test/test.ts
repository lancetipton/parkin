import type {
  TTestAction,
  TParkinTestCB,
  TTestTestObj,
  TTestHookMethod,
  TDescribeAction,
  TParkinTestAbort,
  TParkinTestConfig,
  TParkinTestFactory,
  TParkinDescribeFactory,
  TRunResults,
  TRunResultActionMeta,
} from '../types'

import { run } from './run'
import { runResult } from './runResult'
import { PromiseTimeout } from '../utils/promiseTimeout'
import { noOp, noOpObj, isStr, checkCall, isNum, isObj, exists } from '@keg-hub/jsutils'
import {
  Types,
  createRoot,
  createItem,
  createDescribe,
  throwError,
  hookTypes,
  validateHook,
} from './utils'

type TTestSkipFactory = (description:string, action?:TTestAction, timeout?:number) => void


export class ParkinTest {
  // Default global test timeout is 1hr
  timeout = 3600000
  #autoClean = true
  #testOnly = false
  #abortRun = false
  #describeOnly = false
  #root = createRoot()
  xit:TTestSkipFactory
  it:TParkinTestFactory
  #activeParent = undefined
  #specDone:TParkinTestCB = noOp
  #suiteDone:TParkinTestCB = noOp
  #specStarted:TParkinTestCB = noOp
  #suiteStarted:TParkinTestCB = noOp
  #onAbort:TParkinTestAbort = noOp
  afterAll:TTestHookMethod = noOp
  afterEach:TTestHookMethod = noOp
  beforeAll:TTestHookMethod = noOp
  beforeEach:TTestHookMethod = noOp

  constructor(config:TParkinTestConfig = noOpObj) {
    this.#root.description = config.description || `root`

    this.#addOnly()
    this.#addSkip()
    this.#addHelpers()
    this.it = this.test
    this.xit = this.xtest
    this.#activeParent = this.#root
    this.#setConfig(config)
  }

  run = (config:TParkinTestConfig = noOpObj) => {

    if (config.description) this.#root.description = config.description

    this.#setConfig(config)
    const promise = run({
      root: this.#root,
      onAbort: this.#onAbort,
      testOnly: this.#testOnly,
      specDone: this.#specDone,
      suiteDone: this.#suiteDone,
      specStarted: this.#specStarted,
      shouldAbort: this.#shouldAbort,
      describeOnly: this.#describeOnly,
      suiteStarted: this.#suiteStarted,
    })

    const result = this.timeout
      ? PromiseTimeout<TRunResults>({
          promise,
          timeout: this.timeout,
          name: this.#root.description,
          error: `Test Execution failed, the global timeout ${this.timeout}ms was exceeded`
        })
      : promise

    this.#autoClean && this.clean()

    return result
  }

  /**
   * Expose the helper method to build a test result
   * Helpful in cases where ParkinTest is wrapped by another tool
   * Allows for a consistent iterface of events
   */
  buildResult = runResult

  #shouldAbort = () => this.#abortRun

  abort = () => {
    this.#abortRun = true
  }

  /**
   * Resets the instance to it's initial state
   * Clears all previously loaded tests and describes
   */
  clean = () => {
    this.timeout = 3600000
    this.#autoClean = true
    this.#abortRun = false
    this.#testOnly = false
    this.#describeOnly = false

    this.#activeParent = undefined
    this.#root = undefined
    this.#root = createRoot()
    this.#activeParent = this.#root
  }

  /**
   * Gets the current activeParent, which should almost always be this.#root
   */
  getActiveParent = () => {
    return this.#activeParent
  }

  /**
   * Sets the test config from the passed in object
   */
  setConfig = (config:TParkinTestConfig) => this.#setConfig(config || noOpObj)

  /**
   * Adds passed in framework hooks to the class instance
   */
  #setConfig = ({
    timeout,
    onAbort,
    autoClean,
    specDone,
    suiteDone,
    specStarted,
    suiteStarted,
  }:TParkinTestConfig) => {
    if (timeout) this.timeout = timeout
    if (onAbort) this.#onAbort = onAbort

    if (specDone) this.#specDone = specDone
    if (suiteDone) this.#suiteDone = suiteDone
    if (specStarted) this.#specStarted = specStarted
    if (suiteStarted) this.#suiteStarted = suiteStarted
    
    if (autoClean === false) this.#autoClean = autoClean
  }

  /**
   * Adds the only method to describe and test methods
   * Ensures they are the only methods called when run
   */
  #addOnly = () => {

    this.describe.only = (...args:[string, TDescribeAction]) => {
      this.describe(...args)
      // Get the last item just added to the this.#activeParent
      const item =
        this.#activeParent.describes[this.#activeParent.describes.length - 1]
      item.only = true
      this.#describeOnly = true
      // Call the parent hasOnlyChild method to ensure it gets passed on the chain
      checkCall(this.#activeParent.hasOnlyChild)
    }

    this.test.only = (...args:[description:string, action?:TTestAction, timeout?:number]) => {
      this.test(...args)
      // Get the last item just added to the this.#activeParent
      const item = this.#activeParent.tests[this.#activeParent.tests.length - 1]
      item.only = true
      this.#testOnly = true
      // Call the parent hasOnlyChild method to ensure it gets passed on the chain
      checkCall(this.#activeParent.hasOnlyChild)
    }
  }

  /**
   * Adds the skip method to describe and test methods
   * Ensures they are skipped run method is called
   */
  #addSkip = () => {

    this.describe.skip = (...args:[string, TDescribeAction]) => {
      this.describe(...args)
      // Get the last item just added to the this.#activeParent
      const item =
        this.#activeParent.describes[this.#activeParent.describes.length - 1]
      item.skip = true
    }

    this.test.skip = (...args:[description:string, action?:TTestAction, timeout?:number]) => {
      this.test(...args)
      // Get the last item just added to the this.#activeParent
      const item = this.#activeParent.tests[this.#activeParent.tests.length - 1]
      item.skip = true
    }
  }

  /**
   * TODO: @lance-Tipton
   * Add each methods to describe and test
   */
  #addEach = () => {}

  /**
   * Adds the helper methods to the class instance
   * Methods: beforeAll, beforeEach, afterAll, afterEach
   */
  #addHelpers = () => {
    Object.values(hookTypes).map(type => {
      this[type] = (action) => {
        validateHook(type, action)
        this.#activeParent[type].push(action)
      }
    })
  }

  /**
   * Method the wraps test and helper methods
   * Acts as a top level method for defining tests
   *
   * @returns {void}
   */
  describe = ((
    description:string,
    action:TDescribeAction
  ) => {
    // Build the describe item and add defaults
    const item = createDescribe(description, action)
    this.#activeParent.describes.push(item)

    // Cache the lastParent, so we can reset it
    const lastParent = this.#activeParent

    item.hasOnlyChild = () => {
      item.onlyChild = true
      checkCall(lastParent.hasOnlyChild)
    }

    // Set the current activeParent to the item
    this.#activeParent = item

    // Call the action to register all test method calls while the items active
    action()

    // Reset the last activeParent
    // Should end up with the #root being the final activeParent
    this.#activeParent = lastParent
  }) as TParkinDescribeFactory

  /**
   * Method that executes some test logic
   * Must be called within a Test#describe method
   *
   * @returns {void}
   */
  test = ((
    description:string,
    action:TTestAction,
    meta:TRunResultActionMeta|number
  ) => {
    let timeout:number = undefined

    if(isObj(meta) && !exists(action.metaData) && !exists(action.ParkinMetaData)){
      action.metaData = meta
      if(meta?.timeout) timeout = meta.timeout
    }
    else if(isNum(meta)) timeout = meta

    if (!this.#activeParent || this.#activeParent.type === Types.root)
      throwError(`All ${Types.test} method calls must be called within a ${Types.describe} method`)

    const item = createItem<TTestTestObj>(
      Types.test,
      { action, timeout, description }
    )

    item.disabled = () => (item.skip = true)

    this.#activeParent.tests.push(item)
  }) as TParkinTestFactory

  /**
   * Called when a test method should be skipped
   * Must be called within a Test#describe method
   *
   * @returns {void}
   */
  xtest = (
    description:string,
    action?:TTestAction,
    timeout?:number
  ) => {
    if (!this.#activeParent || this.#activeParent.type === Types.root)
      throwError(
        `All ${Types.test} method calls must be called within a ${Types.describe} method`
      )

    !isStr(description) &&
      throwError(
        `The ${Types.test} method requires a "string" as the first argument`
      )
    const item = createItem<TTestTestObj>(Types.test, { description, skip: true }, false)
    item.disabled = () => (item.skip = true)

    this.#activeParent.tests.push(item)
  }

}
