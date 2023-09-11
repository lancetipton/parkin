import { c as EAstObject, b as EStepType, a as EHookType } from './helpers.types-d0730a59.js';
import { noOp } from '@keg-hub/jsutils';

type TWorldApp = {
    url?: string;
    [key: string]: any;
};
type TWorldConfig = {
    url?: string;
    app?: TWorldApp;
    $merge?: string[];
    environment?: string;
    data?: Record<string, any>;
    $alias: Record<string, any>;
    context?: Record<string, any>;
    [key: string]: any;
};
type TParkinWorld = TWorldConfig;

/**
 * Parses a feature files text content into an object
 * @function
 * @public
 * @export
 *
 */
declare const parseFeature: (text: string, world?: TWorldConfig, options?: TParseFeatureOpts) => TFeatureAst[];

type TTransformer = (arg: string, world?: TWorldConfig) => any;
type TParamTypeModel = {
    regex: RegExp | string;
    useForSnippets?: boolean;
    partial?: RegExp | string;
    type: EExpParmType | string;
    name: EExpParmType | string;
    transformer: TTransformer;
    preferForRegexpMatch?: boolean;
};
type TParamTypeMap = Record<EExpParmType | string, TParamTypeModel>;
type TParamTypes = {
    register: (paramType: TParamTypeModel, key?: string) => TParamTypeMap;
};

declare const assemble: {
    feature: (toAssemble: TFeatureAst | TFeatureAst[], opts?: TAssembleOpts) => string[];
    toIndexes: (feature: TFeatureAst) => TIndexItemAst[];
    findIndex: (props: TFindIndex) => number;
    fromIndex: (indexes: TIndexAst) => string;
};

type TAssemble = typeof assemble;
declare enum EBlockLoc {
    after = "after",
    before = "before"
}
type TFindIndex = {
    type: EAstObject | EStepType;
    feature: TFeatureAst;
    loc?: EBlockLoc | string;
    parent: TParentAst | TStepAst;
};
type TAssembleOpts = {
    removeEmpty?: boolean;
    removeComments?: boolean;
    emptyAfterRule?: boolean;
    emptyAfterSteps?: boolean;
    emptyAfterStory?: boolean;
    emptyAfterFeature?: boolean;
    emptyAfterScenario?: boolean;
    emptyAfterBackground?: boolean;
    backgroundAfterParent?: boolean;
};

type TParkinHookName = `beforeAll` | `afterAll` | `beforeEach` | `afterEach`;
type TParkinHookCB = (...args: any[]) => any;
type TParkinHookMethod = (method: TParkinHookCB) => void;
interface IParkinHooks {
    instance: IParkin;
    types: TParkinHookName[];
    afterAll: TParkinHookMethod;
    beforeAll: TParkinHookMethod;
    afterEach: TParkinHookMethod;
    beforeEach: TParkinHookMethod;
    getRegistered: (type: TParkinHookName) => () => void;
}
interface IParkinRunner {
    run: TParkinRun;
    getFeatures: (data: string | string[] | TFeatureAst | TFeatureAst[], options: TParkinRunOpts) => TFeatureAst[];
}
type TParse = {
    feature: typeof parseFeature;
    definition: (def: string) => TStepDef;
};
type TMatchRespExt = {
    world: TWorldConfig;
    doc?: any;
    step: TStepAst;
    table?: TStepTable;
    options?: Record<string, any>;
    [key: string]: any;
};
type TNoExtMatchResp = {
    match?: [...any];
    definition?: TStepDef;
};
type TMatchResp = {
    match?: [...any, TMatchRespExt];
    definition?: TStepDef;
};
declare enum EPartMatchTypes {
    other = "other",
    optional = "optional",
    alternate = "alternate",
    parameter = "parameter"
}
type TPartsMatch = {
    index: number;
    input: string;
    text: string;
    regex: RegExp;
    type: EPartMatchTypes;
    paramType: EExpParmType;
};
type TExpFindResp = {
    escaped: string;
    regexAlts: string;
    regexAnchors: string;
    regexConverted: string;
    found: TMatchResp;
    transformers: TParamTypeModel[];
};
type TMatchTokens$1 = {
    type: string;
    match: string;
    index: number;
    defIndex: number;
};
interface IMatcher {
    types: () => TParamTypeMap;
    parts: (match: string) => TPartsMatch[];
    register: (paramType: TParamTypeModel) => Record<string, TParamTypeModel>;
    stepTokens: (step: string, definition: TStepDef) => TMatchTokens$1[];
    find: (definitions: TStepDefs, step: string, world: TWorldConfig) => TMatchResp;
    regex: (definition: TStepDef, step: string, world: TWorldConfig) => TMatchResp;
    expression: (definition: TStepDef, step: string, world: TWorldConfig) => TMatchResp;
    extract: (text: string, match: string, matchIdx: string[]) => Record<string | number, any>[];
    expressionFind: (definition: TStepDef, step: string) => TExpFindResp;
}
type TParkinRunStepOpts = {
    retry?: number;
    timeout?: number;
    disabled?: boolean;
    [K: string]: any;
};
type TParkinRunStepOptsMap = {
    shared: TParkinRunStepOpts;
    [K: string]: TParkinRunStepOpts;
};
type TParkinRunTags = {
    filter?: string | string[];
    disabled?: string | string[];
};
type TParkinRunOpts = {
    name?: string;
    retry?: number;
    timeout?: number;
    tags?: TParkinRunTags;
    steps?: TParkinRunStepOptsMap;
};
type TParkinRun = (data: string | string[] | TFeatureAst | TFeatureAst[], options: TParkinRunOpts) => any;
type TRegisterStepsMethod = (steps: TRegisterStepsList) => void;
interface IParkin {
    parse: TParse;
    run: TParkinRun;
    matcher: IMatcher;
    world: TWorldConfig;
    assemble: TAssemble;
    steps: IParkinSteps;
    hooks: IParkinHooks;
    runner: IParkinRunner;
    Given: TRegisterStepMethod;
    When: TRegisterStepMethod;
    Then: TRegisterStepMethod;
    And: TRegisterStepMethod;
    But: TRegisterStepMethod;
    paramTypes: TParamTypes;
    registerSteps: TRegisterStepsMethod;
}
type TParkinRunFeaturesInput = string | string[] | TFeatureAst[] | TFeatureAst;

type TStepAction = (...args: any[]) => any;
type TRegisterStepMethod = (step: string, action: TStepAction) => any;
type TRegisterStepMap = Record<string, TRegisterStepMethod>;
type TRegisterStepsList = Record<`given` | `when` | `then` | `and` | `but`, TRegisterStepMap>;
type TStepDefsList = Record<string, TStepDef>;
type TAddStepDefs = TStepDef | TStepDef[] | TStepDefsList;
type TRegisterOrAddStep = TAddStepDefs | TRegisterStepsList;
interface IParkinSteps {
    world: TWorldConfig;
    clear: () => void;
    list: () => TStepDefs;
    But: TRegisterStepMethod;
    And: TRegisterStepMethod;
    When: TRegisterStepMethod;
    Then: TRegisterStepMethod;
    Given: TRegisterStepMethod;
    typeList: () => TStepDefs;
    resolve: (match: string) => any;
    match: (match: string) => TMatchResp;
    register: (def: string | TStepDef[] | TStepDef, match: string, TStepAction: any) => void;
}
type TStepAst = {
    doc?: any;
    uuid: string;
    step: string;
    index: number;
    type: EStepType;
    tags?: TTagsAst;
    disabled?: boolean;
    whitespace: string;
    definition?: string;
    table?: TStepTable;
};
declare enum EStepVariant {
    regex = "regex",
    expression = "expression"
}
type TStepToken = {
    [key: string]: any;
};
declare enum EStepKey {
    given = "given",
    when = "when",
    then = "then",
    and = "and",
    but = "but",
    Given = "given",
    When = "when",
    Then = "then",
    And = "and",
    But = "but"
}
declare enum EExpParmKind {
    url = "url",
    text = "text",
    alias = "alias",
    pairs = "pairs",
    group = "group",
    number = "number",
    element = "element",
    selector = "selector"
}
declare enum EExpParmType {
    any = "any",
    int = "int",
    word = "word",
    array = "array",
    float = "float",
    string = "string",
    number = "number",
    object = "object"
}
type TStepMetaExpression = {
    kind?: EExpParmKind;
    type: EExpParmType;
    example: string;
    description: string;
};
type TStepMeta = {
    race?: boolean;
    module?: string;
    name?: string;
    info?: string;
    alias?: string[];
    examples?: string[];
    description?: string;
    expressions?: TStepMetaExpression[];
};
type TStepParent = {
    uuid: string;
    location: string;
};
type TStepDefMethod = (...args: any) => any;
type TStepDef = {
    type: string;
    name: string;
    uuid: string;
    variant: string;
    content: string;
    meta: TStepMeta;
    location?: string;
    definition?: string;
    match: string | RegExp;
    parent?: TStepParent;
    tokens: TStepToken[];
    method: TStepDefMethod;
};
type TStepDefsArr = TStepDef[];
type TStepDefs = {
    [key in keyof EStepType]: TStepDefsArr;
};
type TStepTable = {
    index: number;
    content: string[][];
};
type TStepDoc = {
    index: number;
    whiteSpace: string;
    type: `quote` | `tick`;
    content: string[];
};
type TStepResolveOpts = {
    [K: string]: any;
};

type TTagsAst = {
    index: number;
    uuid: string;
    whitespace?: string;
    type: EAstObject.tags;
    content: string;
    tokens: string[];
};
type TBackgroundAst = {
    index: number;
    uuid: string;
    tags?: TTagsAst;
    whitespace?: string;
    background: string;
    steps: TStepAst[];
    type: EAstObject.background;
};
type TRuleAst = {
    index: number;
    uuid: string;
    rule: string;
    tags?: TTagsAst;
    whitespace?: string;
    type: EAstObject.rule;
    background?: TBackgroundAst;
    scenarios: TScenarioAst[];
};
type TScenarioAst = {
    index: number;
    uuid: string;
    tags?: TTagsAst;
    alias?: `Example`;
    scenario: string;
    steps: TStepAst[];
    whitespace?: string;
    type: EAstObject.scenario;
};
type TBlockAst = {
    content: string;
    index: number;
    uuid: string;
    whitespace?: string;
    type: EAstObject.block | EAstObject.empty | EAstObject.comment | EAstObject.reason | EAstObject.desire | EAstObject.perspective;
};
type TAstParseError = {
    type: EAstObject;
    content: string;
    index: number;
};
type TFeatureAst = {
    index: number;
    uuid: string;
    tags?: TTagsAst;
    feature: string;
    content: string;
    desire?: TBlockAst;
    rules?: TRuleAst[];
    whitespace?: string;
    empty?: TBlockAst[];
    comments: TBlockAst[];
    perspective?: TBlockAst;
    type: EAstObject.feature;
    scenarios: TScenarioAst[];
    errors?: TAstParseError[];
    background?: TBackgroundAst;
    reason?: TBlockAst | TBlockAst[];
};
type TBlockParentAst = TFeatureAst | TRuleAst | TBackgroundAst | TScenarioAst;
type TAstType = TBlockParentAst | TStepAst | TTagsAst | TBlockAst;
type TStepParentAst = TBackgroundAst | TScenarioAst;
type TScenarioParentAst = TRuleAst | TFeatureAst;
type TTagsParentAst = TScenarioParentAst | TStepParentAst | TStepAst;
type TBackgroundParentAst = TFeatureAst | TRuleAst;
type TParentAst = TFeatureAst | TRuleAst | TBackgroundAst | TScenarioAst;
type TBlockType = EAstObject.block | EAstObject.empty | EAstObject.comment | EAstObject.desire | EAstObject.reason | EAstObject.perspective;
type TParseFeatureOpts = {
    worldReplace?: boolean;
};

type TFindOpts = {
    partial?: boolean;
};
type TTokenOpts = TFindOpts & {
    include?: EPartMatchTypes[];
    exclude?: EPartMatchTypes[];
};
type TRegExFoundResp = {
    definition?: TStepDef;
    match?: string[];
};

type TIndexParentAst = TRuleAst | TScenarioAst | TFeatureAst | TBackgroundAst;
type TIndexAstAst<T, P> = {
    ast: T;
    parent: P;
};
type TIndexRuleAst = TIndexAstAst<TRuleAst, TFeatureAst>;
type TIndexStepAst = TIndexAstAst<TStepAst, TStepParentAst>;
type TIndexFeatureAst = TIndexAstAst<TFeatureAst, TFeatureAst>;
type TIndexBlockAst = TIndexAstAst<TBlockAst, TBlockParentAst>;
type TIndexTagsAst = TIndexAstAst<TTagsAst, TBlockParentAst | TStepAst>;
type TIndexScenarioAst = TIndexAstAst<TScenarioAst, TScenarioParentAst>;
type TIndexBackgroundAst = TIndexAstAst<TBackgroundAst, TBackgroundParentAst>;
type TIndexItemAst = TIndexTagsAst | TIndexRuleAst | TIndexStepAst | TIndexFeatureAst | TIndexBlockAst | TIndexScenarioAst | TIndexBackgroundAst;
type TIndexAst = TIndexItemAst[];
type TIndexFromAst = {
    key: string;
    child: TAstType;
    indexes: TIndexAst;
    feature: TFeatureAst;
    parent: TIndexParentAst;
};
type TIndexSearchOpts = {
    child?: string;
    parent?: string;
    uuid?: string;
    start?: number;
    type?: EAstObject;
    only?: `ast` | `parent`;
    indexes: TIndexAst;
};

type TIdFromLoc<T> = {
    index: number | string;
    parent: T | TParentAst;
    type: EAstObject | EStepType | string;
};

type TFindIdInFeature = {
    id: string;
    uuid?: never;
};
type TFindUUIDInFeature = {
    id?: never;
    uuid: string;
};
type TFindWithID = TFindUUIDInFeature | TFindIdInFeature;
type TFindInFeature = TFindWithID & {
    feature: TFeatureAst;
};

/**
 * Allows registering step definition matchs and functions
 * Which are used to map to steps of a parsed feature file
 * @class
 * @public
 *
 */
declare class Steps {
    _world: TWorldConfig;
    /**
     * Allowed step definition types
     * @memberof Steps
     * @type {Array}
     * @private
     */
    types: EStepType[];
    constructor(world?: TWorldConfig);
    /**
     * Gets a list of all step definitions registered with the parkin instance
     * @memberof Steps
     * @function
     * @public
     *
     */
    list: () => TStepDef[];
    /**
     * Gets a list of all step definitions registered with the parkin instance
     * @memberof Steps
     * @function
     * @public
     *
     */
    typeList: () => TStepDefs;
    /**
     * Finds a matching step definition from the passed in text
     * Steps must be registered with this instance to be found
     * @memberof Steps
     * @function
     * @public
     *
     */
    match: (text: string, step?: TStepAst, options?: TStepResolveOpts) => false | TMatchResp;
    /**
     * Finds a matching step definition from the passed in list and text can calls it
     * This is the method the actually calls a step definition function
     * @memberof Steps
     * @function
     * @public
     *
     */
    resolve: (text: string, step?: TStepAst, options?: TStepResolveOpts) => any;
    /**
     * Registers a step definition by type based on passed in args
     * @memberof Steps
     * @function
     * @public
     *
     */
    register: (args_0: string | TStepDef | TStepDef[], args_1: string, args_2: string, args_3: TStepDefMethod, args_4: TStepMeta) => any;
    add: (...defs: TAddStepDefs[]) => void;
    /**
     * Clears out all registered step definitions for all types
     * @memberof Steps
     * @function
     * @public
     *
     */
    clear: () => void;
}

type THookMethod = (parkin: Parkin) => void | Promise<void>;
type THookFactory = (clientHookFn: THookMethod) => void;
/**
 * Allows registering hook functions, which are then called when
 * the runner runs a feature
 * @class
 * @public
 *
 */
declare class Hooks {
    afterAll: THookFactory;
    beforeAll: THookFactory;
    afterEach: THookFactory;
    beforeEach: THookFactory;
    /**
     * Allowed hook types
     * @memberof Hooks
     * @type {Array}
     * @private
     */
    private types;
    /**
     * Parkin instance the hooks are tied to
     * @memberof Hooks
     * @type {Object}
     * @private
     */
    instance: Parkin;
    private _registeredHooks;
    constructor(world: TWorldConfig, instance: Parkin);
    /**
     * Gets the registered hook callback method based on the passed in type
     */
    getRegistered: (type: EHookType) => typeof noOp;
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
declare class Runner {
    steps: Steps;
    hooks: Hooks;
    _world: TWorldConfig;
    constructor(steps: Steps, hooks: Hooks, world: TWorldConfig);
    /**
     * Gets the features to be run for a test
     * @param {TParkinRunFeaturesInput} data - Feature data as a string or parsed Feature model
     * @param {TParkinRunOpts} options - Define how the steps are run
     */
    getFeatures: (data: TParkinRunFeaturesInput, options?: TParkinRunOpts) => any[];
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
    run: (data: TParkinRunFeaturesInput, opts?: TParkinRunOpts) => Promise<boolean>;
}

type TMatchTokens = {
    type: string;
    match: string;
    index: number;
    defIndex: number;
};

/**
 * Class for accessing matcher methods and param types
 * <br/>Gives access to underlying matcher methods to be called directly
 */
declare class Matcher {
    parkin: Parkin;
    options: TFindOpts;
    constructor(parkin?: Parkin, options?: TFindOpts);
    /**
     * Finds a matching step definitions form the passed in text
     * If no options are passed;
     * All definition expression must be replaced in text
     * @member {Matcher}
     *
     */
    find: (text: string, definitions?: TStepDefsArr, $world?: TWorldConfig, opts?: TFindOpts) => TNoExtMatchResp;
    /**
     * Finds a matching step definitions form the passed in text
     * Defaults partial option to true, to allow finding partial matches
     * @member {Matcher}
     *
     */
    search: (text: string, opts?: TFindOpts) => TNoExtMatchResp;
    parts: (defMatchStr: string, opts?: TTokenOpts) => any[];
    extract: (text: string, stepMatcher: string, wordMatches: string[], opts?: TFindOpts) => any;
    expression: (def: TStepDef, text: string, $world?: TWorldConfig, opts?: TFindOpts) => Object;
    stepTokens: (step: string, def: TStepDef, opts?: TTokenOpts) => TMatchTokens[];
    expressionFind: (def: TStepDef, text: string, opts?: TFindOpts) => {
        found: TRegExFoundResp;
        escaped: string;
        regexAlts: string;
        transformers: any[];
        regexAnchors: string;
        regexConverted: string;
    };
    regex: (definition: TStepDef, text: string) => TRegExFoundResp;
    types: () => TParamTypeMap;
    register: (model?: TParamTypeModel, key?: string) => TParamTypeMap;
}

/**
 * @typedef
 * Parkin#Given - Register Given step definitions
 * Parkin#When - Register When step definitions
 * Parkin#Then - Register Then step definitions
 * Parkin#And - Register And step definitions
 * Parkin#But - Register But step definitions
 * Parkin#assemble - Object containing assemble helper methods
 * Parkin#assemble#feature - Assemble feature models into feature text
 * Parkin#run - Run step definitions against feature
 * Parkin#parse - Object containing parse helper methods
 * Parkin#parse#feature - Parse feature file text into a feature object
 * Parkin#parse#definition - Parse definition file text into a step definition objects
 * Parkin#registerSteps - Register step definitions to be accessible when running features
 * Parkin#matcher - Instance of the matcher class to give direct access to matcher methods
 * Parkin#paramTypes - Object containing param type helper methods
 * Parkin#paramTypes#register - Register custom paramTypes for step definitions
 */
/**
 * Main class for handling feature files in the browser
 * Use the Steps, Runner and parser to allow executing feature file tests
 * @class
 * @public
 * @param {Object} world - Holds configuration for the running test environment
 * @param {Object} [steps] - Object with step type keys containing step definitions
 *
 * @returns {Object} Instance of the Parkin class
 */
declare class Parkin {
    #private;
    steps: Steps;
    hooks: Hooks;
    parse: TParse;
    runner: Runner;
    run: TParkinRun;
    matcher: Matcher;
    assemble: TAssemble;
    paramTypes: TParamTypes;
    And: TRegisterStepMethod;
    But: TRegisterStepMethod;
    When: TRegisterStepMethod;
    Then: TRegisterStepMethod;
    Given: TRegisterStepMethod;
    constructor(world?: TWorldConfig, steps?: TRegisterOrAddStep);
    get world(): TWorldConfig;
    set world(update: TWorldConfig);
    init: (world?: TWorldConfig, steps?: TRegisterOrAddStep, warn?: boolean) => void;
    /**
     * Helper for registering step definitions after the Parkin class instance has ben created
     * @memberof Parkin
     * @alias instance&period;registerSteps
     * @function
     * @public
     * @example
     *   // Example steps object passed in as the first argument
     *   const steps = {
     *     given: {
     *       // Key / Value pair of matcher text and corresponding function
     *       `I goto page {url}`: () => {},
     *       // Value can also be an array with a function and meta data (i.e. [function, meta] )
     *       `I goto page {url}`: [() => {}, { //...definition meta data  }],
     *     },
     *     when: { ... },
     *     then: { ... }
     *   }
     *
     */
    registerSteps: (steps: TRegisterOrAddStep) => void;
    /**
     * Expose helper method to re-index a parsed feature AST when it's content is modified
     * This allows the feature to be properly re-assembled at another time
     */
    reIndex: (feature: TFeatureAst) => TFeatureAst;
    /**
     * Finds an item in a features from the items uuid ( id )
     */
    find: <T extends TParentAst | TStepAst = any>(props: TFindInFeature) => T;
    /**
     * Generates an id from the passed in options
     */
    generateId: <T extends Record<"uuid", string> = TParentAst | Record<"uuid", string>>(props: TIdFromLoc<T>) => string;
}
declare const PKInstance: Parkin;

export { TStepAst as $, TMatchResp as A, TPartsMatch as B, TExpFindResp as C, TMatchTokens$1 as D, EPartMatchTypes as E, IMatcher as F, TParkinRunStepOptsMap as G, TParkinRunTags as H, IParkinHooks as I, TParkinRunOpts as J, TParkinRun as K, TRegisterStepsMethod as L, IParkin as M, TParkinRunFeaturesInput as N, TWorldApp as O, Parkin as P, TWorldConfig as Q, TParkinWorld as R, TStepAction as S, TStepDefMethod as T, TRegisterStepMethod as U, TRegisterStepMap as V, TRegisterStepsList as W, TStepDefsList as X, TAddStepDefs as Y, TRegisterOrAddStep as Z, IParkinSteps as _, TStepMeta as a, EStepVariant as a0, TStepToken as a1, EStepKey as a2, EExpParmKind as a3, EExpParmType as a4, TStepMetaExpression as a5, TStepParent as a6, TStepDefsArr as a7, TStepDefs as a8, TStepTable as a9, TStepDoc as aa, TStepResolveOpts as ab, TAssemble as ac, EBlockLoc as ad, TFindIndex as ae, TAssembleOpts as af, TFindOpts as ag, TTokenOpts as ah, TRegExFoundResp as ai, TTransformer as aj, TParamTypeModel as ak, TParamTypeMap as al, TParamTypes as am, TIndexParentAst as an, TIndexAstAst as ao, TIndexRuleAst as ap, TIndexStepAst as aq, TIndexFeatureAst as ar, TIndexBlockAst as as, TIndexTagsAst as at, TIndexScenarioAst as au, TIndexBackgroundAst as av, TIndexItemAst as aw, TIndexAst as ax, TIndexFromAst as ay, TIndexSearchOpts as az, TStepDef as b, PKInstance as c, TTagsAst as d, TBackgroundAst as e, TRuleAst as f, TScenarioAst as g, TBlockAst as h, TAstParseError as i, TFeatureAst as j, TBlockParentAst as k, TAstType as l, TStepParentAst as m, TScenarioParentAst as n, TTagsParentAst as o, TBackgroundParentAst as p, TParentAst as q, TBlockType as r, TParseFeatureOpts as s, TParkinHookName as t, TParkinHookCB as u, TParkinHookMethod as v, IParkinRunner as w, TParse as x, TMatchRespExt as y, TNoExtMatchResp as z };
