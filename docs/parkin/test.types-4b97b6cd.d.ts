import { b as EStepType, c as EAstObject } from './helpers.types-d0730a59.js';

/**
 * @type {Object}
 * Key value pair of allowed Types for the ParkinTest Class
 */
declare const Types: TType;

type TAbortSignal = {
    signal: AbortSignal;
};
type TPromiseAbort<T = any> = {
    controller?: AbortController;
    promise: (opts: TAbortSignal, ...args: any[]) => Promise<T>;
};
type TAbortPromise<T = any> = (Promise<T> & {
    abort: () => void;
    controller: AbortController;
});
type TPromiseRetryCB<T = any> = (opts: TPromiseRetry<T>) => Promise<T>;
type TPromiseRetry<T = any> = {
    error?: string;
    retry?: number;
    delay?: number;
    shouldAbort?: () => boolean;
    promise: TPromiseRetryCB<T>;
    controller?: AbortController;
    onRetry?: (opts: TPromiseRetry<T>) => any;
};
type TPromiseTimeout<T = any> = {
    name?: string;
    error?: string;
    timeout: number;
    promise: Promise<T>;
    shouldAbort?: () => boolean;
};

declare class ParkinError extends Error {
    name: string;
    results?: TRunResults;
    testResults?: TRunResults;
    constructor(msg: string | Error, error?: string | Error | ParkinError, replaceStack?: boolean);
}

declare enum EResultAction {
    test = "test",
    skipped = "skipped",
    start = "start",
    end = "end",
    abort = "abort"
}
declare enum EResultStatus {
    skipped = "skipped",
    passed = "passed",
    failed = "failed",
    warning = "warning"
}
declare enum EResultType {
    it = "it",
    xit = "xit",
    root = "root",
    test = "test",
    xtest = "xtest",
    describe = "describe",
    xdescribe = "xdescribe"
}
declare enum ETestType {
    it = "it",
    itx = "itx",
    test = "test",
    testx = "testx",
    describe = "describe",
    describex = "describex",
    beforeAll = "beforeAll",
    afterAll = "afterAll",
    beforeEach = "beforeEach",
    afterEach = "afterEach"
}
type TParkinResultMeta = {
    uuid: string;
    index: number;
    type: EStepType;
};
type TRunResultStepMeta = TParkinResultMeta & {
    step: string;
    definition?: string;
    warnOnFailed?: boolean;
};
type TRunResultScenarioMeta = TParkinResultMeta & {
    tags?: string[];
    scenario: string;
    warnOnFailed?: never;
};
type TRunResultBackgroundMeta = TParkinResultMeta & {
    tags?: string[];
    background: string;
    warnOnFailed?: never;
};
type TRunResultRuleMeta = TParkinResultMeta & {
    tags?: string[];
    rule: string;
    warnOnFailed?: never;
};
type TRunResultFeatureMeta = TParkinResultMeta & {
    tags?: string[];
    feature: string;
    errors?: string[];
    warnOnFailed?: never;
};
type TRunMeta = {
    warnOnFailed?: boolean;
    [K: string]: any;
};
type TRunGeneralMeta<T extends Record<string, any>> = T;
type TRunResultActionMeta<T extends Record<string, any> = any> = TRunResultFeatureMeta | TRunResultRuleMeta | TRunResultBackgroundMeta | TRunResultScenarioMeta | TRunResultStepMeta | TRunGeneralMeta<T> | TRunMeta;
type TFailedErrorResult = Partial<TRunResult> & {
    error: Error | ParkinError;
};
type TRunResultTestMeta = Omit<Partial<TRunResult>, `passed` | `failed`> & {
    failed?: TFailedErrorResult;
    passed?: Partial<TRunResult> | boolean;
};
type TRunResult = {
    id: string;
    testPath: string;
    fullName: string;
    failed?: boolean;
    passed?: boolean;
    skipped?: boolean;
    timestamp: number;
    children?: TSpec[];
    stats: TTestStats;
    tests?: TRunResult[];
    description: string;
    action: EResultAction;
    status?: EResultStatus;
    describes?: TRunResult[];
    metaData?: TRunResultActionMeta;
    type: keyof typeof Types | EAstObject;
    failedExpectations?: Partial<TRunResult>[];
    passedExpectations?: Partial<TRunResult>[];
};
type TSpecResult = TRunResult & {
    status?: EResultStatus;
};
type TSpec = {
    result: TSpecResult;
    disable: () => void;
};
type TSuite = {
    description: string;
    children: TSpec[];
};
type TParkinTestAbort = () => Promise<any> | any;
type TParkinTestCB = (result: TRunResult) => Promise<any> | any;
type TDescribeAction = (() => void) & {
    metaData?: TRunResultActionMeta;
    ParkinMetaData?: TRunResultActionMeta;
};
type TTestAction = ((done?: () => void) => any) & {
    metaData?: TRunResultActionMeta;
    ParkinMetaData?: TRunResultActionMeta;
};
type TTestHookMethod = ((fn: (...args: any[]) => any, ...args: any[]) => any) & {
    metaData?: TRunResultActionMeta;
    ParkinMetaData?: TRunResultActionMeta;
};
type TDescribeFactory = (description: string, action: TDescribeAction) => void;
type TParkinDescribeFactory = TDescribeFactory & {
    skip: TDescribeFactory;
    only: TDescribeFactory;
};
type TTestFactory = (description: string, action: TTestAction, timeout?: number) => void;
type TParkinTestFactory = TTestFactory & {
    skip: TTestFactory;
    only: TTestFactory;
};
type TParkinTestConfig = {
    bail?: number;
    timeout?: number;
    testRetry?: number;
    suiteRetry?: number;
    autoClean?: boolean;
    description?: string;
    testTimeout?: number;
    suiteTimeout?: number;
    exitOnFailed?: boolean;
    skipAfterFailed?: boolean;
    onAbort?: TParkinTestAbort;
    onRunDone?: TParkinTestCB;
    onSpecDone?: TParkinTestCB;
    onRunStart?: TParkinTestCB;
    onSuiteDone?: TParkinTestCB;
    onSpecStart?: TParkinTestCB;
    onSuiteStart?: TParkinTestCB;
    onTestRetry?: TPromiseRetryCB<TRunResult>;
    onSuiteRetry?: TPromiseRetryCB<TRunResults>;
};
type TBaseTestObj = {
    only?: boolean;
    skip?: boolean;
    timeout?: number;
    description: string;
    onlyChild?: boolean;
    disabled: () => void;
    hasOnlyChild: () => void;
};
type TTestTestObj = TBaseTestObj & {
    retry?: number;
    action: TTestAction;
    type: `test` | `it` | `xtest` | `xit`;
};
type THookTestObj = {
    type: `beforeAll` | `beforeEach` | `afterAll` | `afterEach`;
    description?: string;
    action: TTestHookMethod;
};
type TDescribeTestObj = TBaseTestObj & {
    type: `describe`;
    childError?: Error;
    tests?: TTestTestObj[];
    action: TDescribeAction;
    describes?: TDescribeTestObj[];
    afterAll?: TTestHookMethod[];
    beforeAll?: TTestHookMethod[];
    afterEach?: TTestHookMethod[];
    beforeEach?: TTestHookMethod[];
};
type TRootTestObj = TBaseTestObj & {
    type: `root`;
    childError?: Error;
    tests?: TTestTestObj[];
    action: TDescribeAction;
    describes?: TDescribeTestObj[];
    afterAll?: TTestHookMethod[];
    beforeAll?: TTestHookMethod[];
    afterEach?: TTestHookMethod[];
    beforeEach?: TTestHookMethod[];
};
type TParentTestObj = TRootTestObj | TDescribeTestObj;
type TNonRootTestObj = TDescribeTestObj | TTestTestObj;
type TTestObj = TRootTestObj | TNonRootTestObj | THookTestObj;
type THookTypes = {
    beforeAll: `beforeAll`;
    beforeEach: `beforeEach`;
    afterAll: `afterAll`;
    afterEach: `afterEach`;
};
type TGlobalTypes = THookTypes & {
    test: `test`;
    it: `it`;
    xtest: `xtest`;
    xit: `xit`;
    describe: `describe`;
};
type TType = TGlobalTypes & {
    root: `root`;
};
type TRunResults = (TRunResult[] & TTestStats & {
    aborted?: boolean;
    bailed?: boolean;
});
type TTestStats = {
    runEnd?: number;
    runStart?: number;
    passedSpecs?: number;
    failedSpecs?: number;
    failedSuites?: number;
    passedSuites?: number;
};
type TLoopTests = {
    bail: number;
    suiteId: string;
    testOnly: boolean;
    testRetry?: number;
    exitOnFailed?: boolean;
    skipAfterFailed?: boolean;
    stats: TTestStats;
    onSpecDone: TParkinTestCB;
    shouldAbort: () => boolean;
    onSpecStart: TParkinTestCB;
    describe: TDescribeTestObj;
    onTestRetry?: TPromiseRetryCB<TRunResult>;
};
type TRun = {
    bail?: number;
    stats: TTestStats;
    testOnly: boolean;
    testRetry?: number;
    describeOnly: boolean;
    exitOnFailed?: boolean;
    skipAfterFailed?: boolean;
    onSpecDone: TParkinTestCB;
    onRunDone: TParkinTestCB;
    onSuiteDone: TParkinTestCB;
    onAbort: TParkinTestAbort;
    parentIdx?: string | number;
    shouldAbort: () => boolean;
    onSpecStart: TParkinTestCB;
    onRunStart: TParkinTestCB;
    onSuiteStart: TParkinTestCB;
    root: TRootTestObj | TDescribeTestObj;
    onTestRetry?: TPromiseRetryCB<TRunResult>;
};

export { TTestTestObj as A, THookTestObj as B, TDescribeTestObj as C, TRootTestObj as D, EResultAction as E, TParentTestObj as F, TNonRootTestObj as G, TTestObj as H, THookTypes as I, TGlobalTypes as J, TType as K, TRunResults as L, TTestStats as M, TLoopTests as N, TRun as O, TAbortSignal as P, TPromiseAbort as Q, TAbortPromise as R, TPromiseRetryCB as S, TParkinResultMeta as T, TPromiseRetry as U, TPromiseTimeout as V, EResultStatus as a, EResultType as b, ETestType as c, TRunResultStepMeta as d, TRunResultScenarioMeta as e, TRunResultBackgroundMeta as f, TRunResultRuleMeta as g, TRunResultFeatureMeta as h, TRunMeta as i, TRunGeneralMeta as j, TRunResultActionMeta as k, TFailedErrorResult as l, TRunResultTestMeta as m, TRunResult as n, TSpecResult as o, TSpec as p, TSuite as q, TParkinTestAbort as r, TParkinTestCB as s, TDescribeAction as t, TTestAction as u, TTestHookMethod as v, TParkinDescribeFactory as w, TParkinTestFactory as x, TParkinTestConfig as y, TBaseTestObj as z };
