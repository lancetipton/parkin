import { x as TParkinTestFactory, v as TTestHookMethod, y as TParkinTestConfig, L as TRunResults, H as TTestObj, m as TRunResultTestMeta, n as TRunResult, F as TParentTestObj, w as TParkinDescribeFactory, u as TTestAction } from '../test.types-4b97b6cd.js';
import '../helpers.types-d0730a59.js';

type TTestSkipFactory = (description: string, action?: TTestAction, timeout?: number) => void;
declare class ParkinTest {
    #private;
    bail: number;
    testRetry: number;
    suiteRetry: number;
    testTimeout: number;
    suiteTimeout: number;
    xit: TTestSkipFactory;
    it: TParkinTestFactory;
    afterAll: TTestHookMethod;
    afterEach: TTestHookMethod;
    beforeAll: TTestHookMethod;
    beforeEach: TTestHookMethod;
    constructor(config?: TParkinTestConfig);
    run: (config?: TParkinTestConfig) => Promise<TRunResults>;
    /**
     * Expose the helper method to build a test result
     * Helpful in cases where ParkinTest is wrapped by another tool
     * Allows for a consistent iterface of events
     */
    buildResult: (item: TTestObj, { id, tests, stats, action, failed, passed, testPath, fullName, describes, }: TRunResultTestMeta) => TRunResult;
    abort: () => void;
    /**
     * Resets the instance to it's initial state
     * Clears all previously loaded tests and describes
     */
    clean: () => void;
    /**
     * Gets the current activeParent, which should almost always be this.#root
     */
    getActiveParent: () => TParentTestObj;
    /**
     * Adds passed in framework hooks to the class instance
     */
    setConfig: ({ bail, timeout, testRetry, suiteRetry, testTimeout, suiteTimeout, onTestRetry, onSuiteRetry, exitOnFailed, skipAfterFailed, onAbort, autoClean, onSpecDone, onSuiteDone, onRunDone, onRunStart, onSpecStart, onSuiteStart, }?: TParkinTestConfig) => void;
    /**
     * Method the wraps test and helper methods
     * Acts as a top level method for defining tests
     *
     * @returns {void}
     */
    describe: TParkinDescribeFactory;
    /**
     * Method that executes some test logic
     * Must be called within a Test#describe method
     *
     * @returns {void}
     */
    test: TParkinTestFactory;
    /**
     * Called when a test method should be skipped
     * Must be called within a Test#describe method
     *
     * @returns {void}
     */
    xtest: (description: string, action?: TTestAction, timeout?: number) => void;
}

export { ParkinTest };
