import {
  ParkinAbortErrName,
  ParkinBailErrName,
  ParkinError,
  RetryError,
  throwAbortError,
  throwBailError,
  throwExitOnFailed
} from "./chunk-VPIJEAAD.mjs";
import {
  checkCall,
  exists,
  isFunc,
  isNum,
  isObj,
  isStr,
  keyMap,
  noOp,
  noOpObj,
  wait
} from "./chunk-GN2YQI35.mjs";

// src/test/utils.ts
var hookTypes = keyMap([
  `beforeAll`,
  `beforeEach`,
  `afterAll`,
  `afterEach`
]);
var globalTypes = {
  ...keyMap([`test`, `it`, `xtest`, `xit`, `describe`]),
  ...hookTypes
};
var Types = {
  ...globalTypes,
  ...keyMap([`root`])
};
var throwError = (error) => {
  throw new ParkinError(error);
};
var validateHook = (type, action) => {
  !isFunc(action) && throwError(
    `The ${type} method requires a "function" as the first argument`
  );
};
var validateRootRun = (root) => {
  root.type !== Types.root && throwError(`Invalid root type "${root.type}" set for root object`);
  !root.describes || !root.describes.length && throwError(`No tests have been registered to this ParkinTest instance`);
};
var validateItem = (type, description, action) => {
  !isStr(type) && throwError(`Test item type is required as a string`);
  !isFunc(action) && throwError(
    `The ${type} method requires a "function" as the second argument`
  );
  !isStr(description) && throwError(`The ${type} method requires a "string" as the first argument`);
};
var createItem = (type, metadata = noOpObj, validate = true) => {
  const { description, action } = metadata;
  validate && validateItem(type, description, action);
  return { ...metadata, type };
};
var createDescribe = (description, action) => {
  const item = createItem(Types.describe, {
    ...createRoot(),
    action,
    tests: [],
    description
  });
  item.disabled = () => item.skip = true;
  return item;
};
var createRoot = () => {
  return createItem(
    Types.root,
    {
      describes: [],
      ...Object.values(hookTypes).reduce((acc, type) => {
        acc[type] = [];
        return acc;
      }, {})
    },
    false
  );
};

// src/test/runResult.ts
var runResult = (item, {
  id,
  tests,
  stats,
  action,
  failed,
  passed,
  testPath,
  fullName,
  describes
}) => {
  const result = {
    id,
    stats,
    action,
    testPath,
    fullName,
    type: item.type,
    failedExpectations: [],
    passedExpectations: [],
    failed: Boolean(failed),
    passed: Boolean(passed),
    description: item.description,
    timestamp: (/* @__PURE__ */ new Date()).getTime()
  };
  if (tests?.length)
    result.tests = tests;
  if (describes?.length)
    result.describes = describes;
  isObj(failed) && result.failedExpectations.push(failed);
  isObj(passed) && result.passedExpectations.push(passed);
  isObj(item?.action?.ParkinMetaData) ? result.metaData = item?.action?.ParkinMetaData : isObj(item?.action?.metaData) && (result.metaData = item?.action?.metaData);
  if (passed || failed)
    result.status = passed ? "passed" /* passed */ : result?.metaData?.warnOnFailed ? "warning" /* warning */ : "failed" /* failed */;
  return result;
};

// src/test/hooks.ts
var loopHooks = async (args) => {
  const {
    type,
    test,
    root,
    stats,
    specId,
    suiteId,
    describe
  } = args;
  let hookResults = [];
  let hookIdx;
  const activeItem = root || describe;
  const fullName = root ? root.description : test ? `${describe?.description} > ${test?.description} > ${type}` : `${describe?.description} > ${type}`;
  activeItem[type].length && await Promise.all(
    activeItem[type].map(async (fn, idx) => {
      hookIdx = idx;
      return await Promise.resolve().then(() => fn?.()).catch((error) => {
        hookResults.push(
          runResult(activeItem, {
            stats,
            fullName,
            action: type,
            id: test ? specId : suiteId,
            status: "failed" /* failed */,
            failed: {
              error,
              fullName,
              description: error.message,
              status: "failed" /* failed */
            },
            testPath: test ? `/${suiteId}/${specId}/${type}${hookIdx}` : `/${suiteId}/${type}${hookIdx}`
          })
        );
      });
    })
  );
  return hookResults;
};
var callBeforeHooks = async ({ root, suiteId, describe, stats }) => {
  const beforeEachResult = await loopHooks({
    root,
    stats,
    suiteId: Types.root,
    type: Types.beforeEach
  });
  const beforeAllResult = await loopHooks({
    stats,
    suiteId,
    describe,
    type: Types.beforeAll
  });
  return [...beforeEachResult, ...beforeAllResult];
};
var callAfterHooks = async ({ root, suiteId, describe, stats }) => {
  const afterEachResult = await loopHooks({
    root,
    stats,
    suiteId: Types.root,
    type: Types.afterEach
  });
  const afterAllResult = await loopHooks({
    stats,
    suiteId,
    describe,
    type: Types.afterAll
  });
  return [...afterEachResult, ...afterAllResult];
};
var callDescribeHooks = async (args) => {
  const {
    root,
    type,
    stats,
    suiteId,
    describe,
    onSuiteDone,
    describeResult
  } = args;
  const results = [];
  const hooksResults = type === `before` ? await callBeforeHooks({ root, suiteId, describe, stats }) : await callAfterHooks({ root, suiteId, describe, stats });
  if (!hooksResults?.length)
    return results;
  if (hooksResults?.length) {
    const describeResults = await Promise.all(
      hooksResults.map(async (result) => {
        const joined = { ...describeResult, ...result, failed: true, passed: false };
        await onSuiteDone(joined);
        return joined;
      })
    );
    results.push(...describeResults);
  }
  return results;
};

// src/utils/promiseRetry.ts
var loopRetry = async (opts, orgRetry) => {
  const {
    delay = 0,
    retry = 0,
    onRetry,
    controller,
    promise: fn,
    shouldAbort
  } = opts;
  const signal = controller?.signal;
  try {
    const resp = await fn(opts);
    return signal?.aborted || shouldAbort?.() ? throwAbortError() : resp;
  } catch (err) {
    if (signal?.aborted || shouldAbort?.())
      return throwAbortError();
    if (retry <= 0)
      throw new RetryError(err, opts?.error, orgRetry);
    const next = { ...opts, retry: retry - 1 };
    onRetry && await onRetry?.(next);
    delay && await wait(delay);
    return loopRetry(next, orgRetry);
  }
};
var PromiseRetry = async (opts) => loopRetry(
  opts,
  opts?.retry || 0
);

// src/utils/promiseTimeout.ts
var TimeoutError = class extends Error {
  constructor(message, name) {
    super(message);
    this.name = name || this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};
var PromiseTimeout = async ({
  name,
  error,
  promise,
  timeout = 5e3
}) => {
  const method = name ? `${name} method` : `method`;
  let timer;
  const timePromise = new Promise((res, rej) => {
    timer = setTimeout(() => rej(
      new TimeoutError(
        error || `The ${method} timed out after ${timeout} ms.`,
        `TimeoutError`
      )
    ), timeout);
  });
  return await Promise.race([promise, timePromise]).finally(() => clearTimeout(timer));
};

// src/test/runTest.ts
var runTest = async (args) => {
  const { test, shouldAbort, ...rest } = args;
  return PromiseRetry({
    ...rest,
    retry: test.retry || rest.retry || 0,
    promise: async () => {
      const promise = test.action();
      shouldAbort() && throwAbortError();
      return test.timeout ? await PromiseTimeout({
        promise,
        timeout: test.timeout,
        name: test.description,
        error: `Test failed, the timeout ${test.timeout}ms was exceeded`
      }) : await promise;
    }
  });
};

// src/test/runHelpers.ts
var shouldSkipTest = (params) => {
  const {
    test,
    testOnly,
    hasFailed,
    skipAfterFailed
  } = params;
  return test.skip || testOnly && !test.only || hasFailed && skipAfterFailed;
};
var buildTestArgs = ({
  suiteId,
  testIdx,
  describe
}) => {
  const test = describe.tests[testIdx];
  const specId = `spec-${testIdx}`;
  return {
    test,
    specId,
    testPath: `/${suiteId}/${specId}`,
    fullName: `${describe.description} > ${test.description}`
  };
};
var shouldSkipDescribe = ({ describe, describeOnly, testOnly }) => {
  return describe.skip || describeOnly && !describe.only && !describe.onlyChild || testOnly && !describe.onlyChild;
};

// src/test/loopTests.ts
var loopTests = async (args) => {
  const {
    bail,
    stats,
    suiteId,
    describe,
    testOnly,
    onSpecDone,
    testRetry,
    onTestRetry,
    shouldAbort,
    onSpecStart,
    exitOnFailed,
    skipAfterFailed
  } = args;
  let testsFailed = false;
  const results = [];
  for (let testIdx = 0; testIdx < describe.tests.length; testIdx++) {
    shouldAbort() && throwAbortError();
    const {
      test,
      specId,
      testPath,
      fullName
    } = buildTestArgs({ suiteId, testIdx, describe });
    let testResult = runResult(test, {
      stats,
      fullName,
      testPath,
      id: specId,
      action: "start" /* start */
    });
    const shouldSkip = shouldSkipTest({
      test,
      testOnly,
      skipAfterFailed,
      hasFailed: testsFailed
    });
    if (shouldSkip) {
      const skipped = {
        ...testResult,
        skipped: true,
        action: "skipped" /* skipped */,
        status: "skipped" /* skipped */
      };
      await onSpecStart(skipped);
      results.push(skipped);
      continue;
    } else
      await onSpecStart(testResult);
    shouldAbort() && throwAbortError();
    const beforeEachResults = await loopHooks({
      test,
      stats,
      specId,
      suiteId,
      describe,
      type: Types.beforeEach
    });
    if (beforeEachResults?.length) {
      testsFailed = true;
      results.push(...beforeEachResults);
      beforeEachResults.forEach(onSpecDone);
      break;
    }
    try {
      const result = await runTest({
        test,
        shouldAbort,
        retry: testRetry,
        onRetry: onTestRetry
      });
      shouldAbort() && throwAbortError();
      stats.passedSpecs += 1;
      testResult = runResult(test, {
        stats,
        fullName,
        id: specId,
        testPath,
        passed: result || true,
        action: "test" /* test */
      });
    } catch (error) {
      if (error.name === ParkinAbortErrName)
        throw error;
      testsFailed = true;
      stats.failedSpecs += 1;
      testResult = runResult(test, {
        stats,
        fullName,
        id: specId,
        testPath,
        action: "test" /* test */,
        failed: {
          error,
          fullName,
          description: error.message,
          status: "failed" /* failed */
        }
      });
      const shouldBail = Boolean(bail && stats.failedSpecs >= bail);
      if (exitOnFailed || shouldBail) {
        results.push(testResult);
        error.testResults = results;
        await onSpecDone(testResult);
        exitOnFailed && throwExitOnFailed(error);
        shouldBail && throwBailError(error, bail);
        break;
      }
    }
    shouldAbort() && throwAbortError();
    const afterEachResults = await loopHooks({
      test,
      stats,
      specId,
      suiteId,
      describe,
      type: Types.afterEach
    });
    if (afterEachResults?.length) {
      testsFailed = true;
      results.push(...afterEachResults);
      afterEachResults.forEach(onSpecDone);
      break;
    }
    results.push(testResult);
    await onSpecDone({
      ...testResult,
      action: "end" /* end */
    });
  }
  shouldAbort() && throwAbortError();
  return { tests: results, failed: testsFailed };
};

// src/test/loopDescribes.ts
var loopChildren = async (args) => {
  const {
    stats,
    describe,
    onSuiteDone,
    describeResult,
    loopFun
  } = args;
  try {
    const results = await loopFun();
    const failed = results?.failed || describeResult?.failed;
    const joined = {
      ...describeResult,
      ...results,
      action: "end" /* end */
    };
    if (failed)
      joined.failed = failed;
    return joined;
  } catch (err) {
    if (err.name === ParkinAbortErrName)
      throw err;
    stats.failedSuites += 1;
    const errorResult = runResult(describe, {
      ...describeResult,
      stats,
      action: "end" /* end */,
      failed: {
        error: err,
        description: err.message,
        status: "failed" /* failed */,
        fullName: describe.description
      }
    });
    if (err.testResults) {
      errorResult.tests = err.testResults;
      err.testResults = void 0;
    }
    await onSuiteDone(errorResult);
    err.results = err.results || [];
    err.results.push(errorResult);
    throw err;
  }
};
var loopDescribes = async (args) => {
  const {
    root,
    bail,
    stats,
    testOnly,
    testRetry,
    onSpecDone,
    onSuiteDone,
    shouldAbort,
    onTestRetry,
    onSpecStart,
    onSuiteStart,
    describeOnly,
    parentIdx = ``,
    exitOnFailed,
    skipAfterFailed
  } = args;
  let describeFailed = false;
  const results = [];
  for (let idx = 0; idx < root.describes.length; idx++) {
    if (shouldAbort())
      break;
    const describe = root.describes[idx];
    const suiteId = `suite-${parentIdx}${idx}`;
    let describeResult = runResult(describe, {
      stats,
      id: suiteId,
      testPath: `/${suiteId}`,
      action: "start" /* start */,
      fullName: describe.description
    });
    if (shouldSkipDescribe({ describe, describeOnly, testOnly })) {
      await onSuiteStart({
        ...describeResult,
        skipped: true,
        action: "skipped" /* skipped */,
        status: "skipped" /* skipped */
      });
      continue;
    } else
      await onSuiteStart(describeResult);
    const beforeResults = await callDescribeHooks({
      root,
      stats,
      suiteId,
      describe,
      onSuiteDone,
      describeResult,
      type: `before`
    });
    if (beforeResults?.length) {
      describeFailed = true;
      results.push(...beforeResults);
      continue;
    }
    if (shouldAbort())
      break;
    describeResult = describe?.tests?.length ? await loopChildren({
      stats,
      describe,
      onSuiteDone,
      describeResult,
      loopFun: async () => await loopTests({
        bail,
        stats,
        suiteId,
        describe,
        testOnly,
        onSpecDone,
        testRetry,
        onTestRetry,
        shouldAbort,
        onSpecStart,
        exitOnFailed,
        skipAfterFailed
      })
    }) : describeResult;
    if (exitOnFailed && describeResult.failed) {
      describeFailed = true;
      stats.failedSuites += 1;
      await onSuiteDone(describeResult);
      results.push(describeResult);
      break;
    }
    describeResult = describe?.describes?.length ? await loopChildren({
      stats,
      describe,
      onSuiteDone,
      describeResult,
      loopFun: async () => await loopDescribes({
        ...args,
        root: describe,
        parentIdx: `${idx}-`
      })
    }) : describeResult;
    describeResult.failed ? stats.failedSuites += 1 : stats.passedSuites += 1;
    if (exitOnFailed && describeResult.failed) {
      describeFailed = true;
      await onSuiteDone(describeResult);
      results.push(describeResult);
      break;
    }
    if (shouldAbort())
      break;
    if (describeResult.failed) {
      describeFailed = true;
      describeResult.failed = true;
      describeResult.status = "failed" /* failed */;
    } else {
      describeResult.passed = true;
      describeResult.status = "passed" /* passed */;
    }
    const afterResults = await callDescribeHooks({
      root,
      stats,
      suiteId,
      describe,
      onSuiteDone,
      describeResult,
      type: `after`
    });
    if (afterResults?.length) {
      describeFailed = true;
      results.push(...afterResults);
      continue;
    }
    if (shouldAbort())
      break;
    await onSuiteDone(describeResult);
    results.push(describeResult);
  }
  return shouldAbort() ? { describes: [], failed: describeFailed } : { describes: results, failed: describeFailed };
};

// src/test/run.ts
var run = async (args) => {
  const {
    root,
    stats,
    onAbort,
    onRunDone,
    shouldAbort,
    onRunStart
  } = args;
  let bailError;
  let describesFailed;
  let describes = [];
  validateRootRun(root);
  let rootResult = runResult(root, {
    stats,
    id: Types.root,
    fullName: root.description,
    testPath: `/${Types.root}`
  });
  await onRunStart({
    ...rootResult,
    stats,
    action: "start" /* start */,
    description: `Starting test execution`
  });
  const beforeAllResults = await loopHooks({
    root,
    stats,
    suiteId: Types.root,
    type: Types.beforeAll
  });
  if (shouldAbort()) {
    await onAbort?.();
    stats.runEnd = (/* @__PURE__ */ new Date()).getTime();
    await onRunDone({
      ...rootResult,
      stats,
      action: "abort" /* abort */,
      description: `Test execution aborted`
    });
    describes.aborted = true;
    return Object.assign(describes, stats);
  }
  if (beforeAllResults?.length)
    return Object.assign(beforeAllResults, stats);
  try {
    const resp = await loopDescribes(args);
    describes = resp.describes;
    describesFailed = resp.failed;
    if (shouldAbort()) {
      await onAbort?.();
      stats.runEnd = (/* @__PURE__ */ new Date()).getTime();
      await onRunDone({
        ...rootResult,
        stats,
        action: "abort" /* abort */,
        description: `Test execution aborted`
      });
      describes.aborted = true;
    }
  } catch (err) {
    describesFailed = true;
    const isBailErr = err.name === ParkinBailErrName;
    const isAbortErr = err.name === ParkinAbortErrName;
    bailError = isBailErr || isAbortErr ? err : void 0;
    if (isBailErr)
      describes.bailed = true;
    if (isAbortErr)
      describes.aborted = true;
    err.results ? describes.push(...err.results) : describes.push(
      runResult(root, {
        stats,
        describes,
        id: Types.root,
        fullName: root.description,
        testPath: `/${Types.root}`,
        action: "end" /* end */,
        status: "failed" /* failed */,
        failed: {
          error: err,
          description: err.message,
          fullName: root.description,
          status: "failed" /* failed */
        }
      })
    );
  } finally {
    const afterAllResult = await loopHooks({
      root,
      stats,
      suiteId: Types.root,
      type: Types.afterAll
    });
    afterAllResult?.length && describes.push(...afterAllResult);
    stats.runEnd = stats.runEnd || (/* @__PURE__ */ new Date()).getTime();
    await onRunDone({
      ...rootResult,
      stats,
      describes,
      failed: describesFailed,
      passed: !describesFailed,
      action: "end" /* end */,
      description: `Test execution complete`,
      status: describesFailed ? "failed" /* failed */ : "passed" /* passed */
    });
    if (bailError) {
      bailError.results = Object.assign(describes, stats);
      throw bailError;
    }
  }
  return Object.assign(describes, stats);
};

// src/test/test.ts
var ParkinTest = class {
  // Defaults set to 0, is the same as disabled
  bail = 0;
  testRetry = 0;
  suiteRetry = 0;
  #onTestRetry;
  #onSuiteRetry;
  // Default test timeout to be 5 seconds
  testTimeout = 5e3;
  // Default suite test timeout is 1hr
  suiteTimeout = 36e5;
  #autoClean = true;
  #testOnly = false;
  #abortRun = false;
  #describeOnly = false;
  #exitOnFailed = false;
  #skipAfterFailed = false;
  #root = createRoot();
  xit;
  it;
  #onRunDone = noOp;
  #onRunStart = noOp;
  #onSpecDone = noOp;
  #onSuiteDone = noOp;
  #onSpecStart = noOp;
  #onSuiteStart = noOp;
  #onAbort = noOp;
  afterAll = noOp;
  afterEach = noOp;
  beforeAll = noOp;
  beforeEach = noOp;
  #activeParent = void 0;
  constructor(config = noOpObj) {
    this.#root.description = config.description || `root`;
    this.#addOnly();
    this.#addSkip();
    this.#addHelpers();
    this.it = this.test;
    this.xit = this.xtest;
    this.#activeParent = this.#root;
    this.setConfig(config);
  }
  run = (config = noOpObj) => {
    if (config.description)
      this.#root.description = config.description;
    this.setConfig(config);
    const runSuite = async () => {
      const promise = run({
        bail: this.bail,
        root: this.#root,
        onAbort: this.#onAbort,
        testOnly: this.#testOnly,
        testRetry: this.testRetry,
        onRunDone: this.#onRunDone,
        onRunStart: this.#onRunStart,
        onSpecDone: this.#onSpecDone,
        onSpecStart: this.#onSpecStart,
        onTestRetry: this.#onTestRetry,
        shouldAbort: this.#shouldAbort,
        onSuiteDone: this.#onSuiteDone,
        onSuiteStart: this.#onSuiteStart,
        exitOnFailed: this.#exitOnFailed,
        describeOnly: this.#describeOnly,
        skipAfterFailed: this.#skipAfterFailed,
        stats: {
          runEnd: 0,
          failedSpecs: 0,
          passedSpecs: 0,
          passedSuites: 0,
          failedSuites: 0,
          runStart: (/* @__PURE__ */ new Date()).getTime()
        }
      });
      const result = this.suiteTimeout ? PromiseTimeout({
        promise,
        timeout: this.suiteTimeout,
        name: this.#root.description,
        error: `Test Execution failed, the suite timeout ${this.suiteTimeout}ms was exceeded`
      }) : promise;
      this.#autoClean && this.clean();
      return result;
    };
    return PromiseRetry({
      promise: runSuite,
      retry: this.suiteRetry,
      onRetry: this.#onSuiteRetry
    });
  };
  /**
   * Expose the helper method to build a test result
   * Helpful in cases where ParkinTest is wrapped by another tool
   * Allows for a consistent iterface of events
   */
  buildResult = runResult;
  #shouldAbort = () => this.#abortRun;
  abort = () => {
    this.#abortRun = true;
  };
  /**
   * Resets the instance to it's initial state
   * Clears all previously loaded tests and describes
   */
  clean = () => {
    this.testTimeout = 5e3;
    this.suiteTimeout = 36e5;
    this.#autoClean = true;
    this.#abortRun = false;
    this.#testOnly = false;
    this.#describeOnly = false;
    this.#activeParent = void 0;
    this.#root = void 0;
    this.#root = createRoot();
    this.#activeParent = this.#root;
  };
  /**
   * Gets the current activeParent, which should almost always be this.#root
   */
  getActiveParent = () => {
    return this.#activeParent;
  };
  /**
   * Adds passed in framework hooks to the class instance
   */
  setConfig = ({
    bail,
    timeout,
    testRetry,
    suiteRetry,
    testTimeout,
    suiteTimeout,
    onTestRetry,
    onSuiteRetry,
    exitOnFailed,
    skipAfterFailed,
    onAbort,
    autoClean,
    onSpecDone,
    onSuiteDone,
    onRunDone,
    onRunStart,
    onSpecStart,
    onSuiteStart
  } = noOpObj) => {
    if (onAbort)
      this.#onAbort = onAbort;
    if (isNum(testTimeout))
      this.testTimeout = testTimeout;
    else if (isNum(timeout))
      this.testTimeout = timeout;
    if (isNum(suiteTimeout))
      this.suiteTimeout = suiteTimeout;
    else if (isNum(timeout))
      this.suiteTimeout = timeout;
    if (isNum(bail))
      this.bail = bail;
    if (isNum(testRetry))
      this.testRetry = testRetry;
    if (isNum(suiteRetry))
      this.suiteRetry = suiteRetry;
    if (onTestRetry)
      this.#onTestRetry = onTestRetry;
    if (onSuiteRetry)
      this.#onSuiteRetry = onSuiteRetry;
    if (onSpecDone)
      this.#onSpecDone = onSpecDone;
    if (onSpecStart)
      this.#onSpecStart = onSpecStart;
    if (onSuiteDone)
      this.#onSuiteDone = onSuiteDone;
    if (onSuiteStart)
      this.#onSuiteStart = onSuiteStart;
    if (onRunDone)
      this.#onRunDone = onRunDone;
    if (onRunStart)
      this.#onRunStart = onRunStart;
    if (autoClean === false)
      this.#autoClean = autoClean;
    if (exitOnFailed)
      this.#exitOnFailed = exitOnFailed;
    if (skipAfterFailed)
      this.#skipAfterFailed = skipAfterFailed;
  };
  /**
   * Adds the only method to describe and test methods
   * Ensures they are the only methods called when run
   */
  #addOnly = () => {
    this.describe.only = (...args) => {
      this.describe(...args);
      const item = this.#activeParent.describes[this.#activeParent.describes.length - 1];
      item.only = true;
      this.#describeOnly = true;
      checkCall(this.#activeParent.hasOnlyChild);
    };
    this.test.only = (...args) => {
      this.test(...args);
      const item = this.#activeParent.tests[this.#activeParent.tests.length - 1];
      item.only = true;
      this.#testOnly = true;
      checkCall(this.#activeParent.hasOnlyChild);
    };
  };
  /**
   * Adds the skip method to describe and test methods
   * Ensures they are skipped run method is called
   */
  #addSkip = () => {
    this.describe.skip = (...args) => {
      this.describe(...args);
      const item = this.#activeParent.describes[this.#activeParent.describes.length - 1];
      item.skip = true;
    };
    this.test.skip = (...args) => {
      this.test(...args);
      const item = this.#activeParent.tests[this.#activeParent.tests.length - 1];
      item.skip = true;
    };
  };
  /**
   * TODO: @lance-Tipton
   * Add each methods to describe and test
   */
  #addEach = () => {
  };
  /**
   * Adds the helper methods to the class instance
   * Methods: beforeAll, beforeEach, afterAll, afterEach
   */
  #addHelpers = () => {
    Object.values(hookTypes).map((type) => {
      this[type] = (action) => {
        validateHook(type, action);
        this.#activeParent[type].push(action);
      };
    });
  };
  /**
   * Method the wraps test and helper methods
   * Acts as a top level method for defining tests
   *
   * @returns {void}
   */
  describe = (description, action) => {
    const item = createDescribe(description, action);
    this.#activeParent.describes.push(item);
    const lastParent = this.#activeParent;
    item.hasOnlyChild = () => {
      item.onlyChild = true;
      checkCall(lastParent.hasOnlyChild);
    };
    this.#activeParent = item;
    action();
    this.#activeParent = lastParent;
  };
  /**
   * Method that executes some test logic
   * Must be called within a Test#describe method
   *
   * @returns {void}
   */
  test = (description, action, meta) => {
    let retry = this.testRetry || 0;
    let timeout = this.testTimeout;
    if (isObj(meta) && !exists(action.metaData) && !exists(action.ParkinMetaData)) {
      action.metaData = meta;
      if (meta?.timeout)
        timeout = meta.timeout;
      if (meta?.retry)
        retry = meta.retry;
    } else if (isNum(meta))
      timeout = meta;
    if (!this.#activeParent || this.#activeParent.type === Types.root)
      throwError(`All ${Types.test} method calls must be called within a ${Types.describe} method`);
    const item = createItem(
      Types.test,
      {
        retry,
        action,
        timeout,
        description
      }
    );
    item.disabled = () => item.skip = true;
    this.#activeParent.tests.push(item);
  };
  /**
   * Called when a test method should be skipped
   * Must be called within a Test#describe method
   *
   * @returns {void}
   */
  xtest = (description, action, timeout) => {
    if (!this.#activeParent || this.#activeParent.type === Types.root)
      throwError(
        `All ${Types.test} method calls must be called within a ${Types.describe} method`
      );
    !isStr(description) && throwError(
      `The ${Types.test} method requires a "string" as the first argument`
    );
    const item = createItem(Types.test, { description, skip: true }, false);
    item.disabled = () => item.skip = true;
    this.#activeParent.tests.push(item);
  };
};

export {
  globalTypes,
  ParkinTest
};
//# sourceMappingURL=chunk-MET5LFFJ.mjs.map