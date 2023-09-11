var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

// src/test/index.ts
var test_exports = {};
__export(test_exports, {
  ParkinTest: () => ParkinTest
});
module.exports = __toCommonJS(test_exports);

// node_modules/@keg-hub/jsutils/build/esm/validate-0a7295ee.js
var OPTIONS = {
  SHOULD_LOG: true,
  SHOULD_THROW: false,
  LOG_PREFIX: null
};
var defaultValidator = () => true;
var validate = (argObj, validators = {}, options = {}) => {
  const {
    logs = OPTIONS.SHOULD_LOG,
    throws = OPTIONS.SHOULD_THROW,
    prefix = OPTIONS.LOG_PREFIX
  } = options;
  const validationCaseEntries = Object.entries(argObj);
  const validationResults = validationCaseEntries.map(([argName, argValue]) => validateArgument(argName, argValue, validators[argName] || validators.$default || defaultValidator));
  const reduceCases = (total, next) => validationReducer(total, next, {
    logs,
    throws,
    prefix
  });
  const {
    success,
    cases
  } = validationResults.reduce(reduceCases, {
    success: true,
    cases: {}
  });
  return [success, cases];
};
validate.setOptions = ({
  logs,
  throws,
  prefix
}) => {
  if (logs !== void 0) {
    OPTIONS.SHOULD_LOG = logs;
  }
  if (throws !== void 0) {
    OPTIONS.SHOULD_THROW = throws;
  }
  if (prefix !== void 0) {
    OPTIONS.LOG_PREFIX = prefix;
  }
};
validate.resetOptions = () => {
  OPTIONS.SHOULD_LOG = true;
  OPTIONS.SHOULD_THROW = false;
  OPTIONS.LOG_PREFIX = null;
};
var validateArgument = (key, value, validator) => {
  const success = validator(value);
  const shouldStringifyValidator = !validator.name || validator.name === key || validator.name === "$default";
  const validatorString = shouldStringifyValidator ? validator.toString() : validator.name;
  const reason = success ? null : [`Argument "${key}" with value `, value, ` failed validator: ${validatorString}.`];
  return {
    success,
    key,
    value,
    validator,
    reason
  };
};
var validationReducer = (finalResult, nextValidation, {
  logs,
  throws,
  prefix
}) => {
  !nextValidation.success && handleFailure(nextValidation, logs, throws, prefix);
  return {
    success: finalResult.success && nextValidation.success,
    cases: {
      ...finalResult.cases,
      [nextValidation.key]: nextValidation
    }
  };
};
var handleFailure = (validation, shouldLog, shouldThrow, prefix) => {
  const reason = prefix ? [prefix, ...validation.reason] : validation.reason;
  if (shouldThrow)
    throw new Error(reason.join());
  if (shouldLog)
    console.error(...reason);
};

// node_modules/@keg-hub/jsutils/build/esm/isArr-a4420764.js
var isArr = (value) => Array.isArray(value);

// node_modules/@keg-hub/jsutils/build/esm/isObj-2a71d1af.js
var isObj = (obj) => typeof obj === "object" && !Array.isArray(obj) && obj !== null;

// node_modules/@keg-hub/jsutils/build/esm/isFunc-40ceeef8.js
var isFunc = (func) => typeof func === "function";

// node_modules/@keg-hub/jsutils/build/esm/isStr-481ce69b.js
var isStr = (str) => typeof str === "string";

// node_modules/@keg-hub/jsutils/build/esm/isNum-cc6ad9ca.js
var equalsNaN = (val) => typeof val === "number" && val != val;
var isNum = (val) => typeof val === "number" && !equalsNaN(val);

// node_modules/@keg-hub/jsutils/build/esm/isValidDate-76b2dc77.js
var typeOf = (val) => Object.prototype.toString.call(val).slice(8, -1);
var isEmpty = (val) => isObj(val) ? Object.keys(val).length === 0 : isArr(val) ? val.length === 0 : isStr(val) ? val.trim().length === 0 : isNum(val) ? val < 1 : false;
var isSame = (val1, val2) => val1 === val2 ? val1 !== 0 || 1 / val1 === 1 / val2 : val1 !== val1 && val2 !== val2;
var isValidDate = (date) => !isNaN((date instanceof Date && date || new Date(date)).getTime());

// node_modules/@keg-hub/jsutils/build/esm/isBool-4d844d9e.js
var isBool = (val) => typeof val === "boolean";

// node_modules/@keg-hub/jsutils/build/esm/toStr-0e5fe94c.js
var toStr2 = (val) => val === null || val === void 0 ? "" : isStr(val) ? val : JSON.stringify(val);

// node_modules/@keg-hub/jsutils/build/esm/toBool-8f49e620.js
var isStrBool = (val) => val === "false" || val === "true";
var convertToStrBool = (val) => isBool(val) ? toStr2(val) : !val || val === "false" || val === "0" ? "false" : "true";
var toBool = (val) => isStrBool(val) ? val === "true" : convertToStrBool(val) === "true";

// node_modules/@keg-hub/jsutils/build/esm/isColl-15a1452b.js
var isColl = (val) => typeof val === "object" && val !== null;

// node_modules/@keg-hub/jsutils/build/esm/deepEqual-e89b5815.js
var isEmptyColl = (obj) => isArr(obj) ? obj.length === 0 : isColl(obj) && Object.getOwnPropertyNames(obj).length === 0;
var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;
var deepEqual = (a, b) => {
  if (a === b)
    return true;
  if (!a || !b || typeof a != "object" || typeof b != "object")
    return a !== a && b !== b;
  const arrA = isArray(a);
  const arrB = isArray(b);
  let i;
  let length;
  let key;
  if (arrA && arrB) {
    length = a.length;
    if (length != b.length)
      return false;
    for (i = length; i-- !== 0; )
      if (!deepEqual(a[i], b[i]))
        return false;
    return true;
  }
  if (arrA != arrB)
    return false;
  const dateA = a instanceof Date;
  const dateB = b instanceof Date;
  if (dateA != dateB)
    return false;
  if (dateA && dateB)
    return a.getTime() == b.getTime();
  const regexpA = a instanceof RegExp;
  const regexpB = b instanceof RegExp;
  if (regexpA != regexpB)
    return false;
  if (regexpA && regexpB)
    return a.toString() == b.toString();
  const keys = keyList(a);
  length = keys.length;
  if (length !== keyList(b).length)
    return false;
  for (i = length; i-- !== 0; )
    if (!hasProp.call(b, keys[i]))
      return false;
  for (i = length; i-- !== 0; ) {
    key = keys[i];
    if (!deepEqual(a[key], b[key]))
      return false;
  }
  return true;
};

// node_modules/@keg-hub/jsutils/build/esm/exists-bf542cb8.js
var exists = (value) => value === value && value !== void 0 && value !== null;

// node_modules/@keg-hub/jsutils/build/esm/isInt-096f1765.js
var isNegative = (x) => isNum(x) && x < 0;
var isPositive = (x) => isNum(x) && x > 0;
var isFloat = (val) => isNum(val) && val % 1 !== 0;
var isInt = (val) => isNum(val) && val % 1 === 0;

// node_modules/@keg-hub/jsutils/build/esm/jsonEqual-911fc3f9.js
var hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
var isEntry = (maybeEntry) => isArr(maybeEntry) && maybeEntry.length === 2 && (isNum(maybeEntry[0]) || isStr(maybeEntry[0]));
var isArrMap = (obj) => {
  if (!isObj(obj))
    return false;
  const values = Object.values(obj);
  return toBool(values.length && values.every(isArr));
};
var jsonEqual = (one, two) => {
  try {
    return JSON.stringify(one) === JSON.stringify(two);
  } catch (e) {
    return false;
  }
};

// node_modules/@keg-hub/jsutils/build/esm/isQuoted-877344c4.js
var isLowerCase = (str) => str === str.toLowerCase();
var isUpperCase = (str) => str === str.toUpperCase();
var isEmail = (str) => {
  if (!str || !isStr(str))
    return false;
  const regex2 = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return Boolean(regex2.test(str));
};
var regex = {
  ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
  ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i
};
var isIp = (str) => {
  if (!str || !isStr(str))
    return false;
  const isIp42 = Boolean(regex.ipv4.test(str));
  return isIp42 || Boolean(regex.ipv6.test(str));
};
var isPhone = (str) => {
  if (!str || !isStr(str))
    return false;
  const regex2 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return Boolean(regex2.test(str)) && str.replace(/\D/g, "").length < 11;
};
var isUrl = (str) => {
  const regex2 = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return Boolean(regex2.test(str));
};
var isUuid = (str) => {
  if (!str || !isStr(str))
    return false;
  const regex2 = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  return Boolean(regex2.test(str));
};
var quoteSymbols = ['"', "'"];
var isQuoted = (str, quotes = quoteSymbols) => {
  return isStr(str) && quotes.some((quote) => str.startsWith(quote) && str.endsWith(quote));
};

// node_modules/@keg-hub/jsutils/build/esm/isValidUrl-18654cdf.js
var isValidUrl = (str) => {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return regexp.test(str);
};

// node_modules/@keg-hub/jsutils/build/esm/not-abeaf606.js
var isOrderable = (x) => isStr(x) || isNum(x) || isBool(x);
var identity = (x) => x;
var match = (matchArg, ...args) => {
  if (!args.length)
    return null;
  for (let entry of args) {
    if (!isArr(entry)) {
      console.error(`Matching case must be an entry (a 2-element array). Found: ${typeOf(entry)}`, entry);
      break;
    }
    const [caseValueOrPredicate, valueOnMatch] = entry;
    if (isFunc(caseValueOrPredicate) && caseValueOrPredicate(matchArg))
      return valueOnMatch;
    if (caseValueOrPredicate === matchArg)
      return valueOnMatch;
  }
  return null;
};
match.default = () => true;
var hasDomAccess = () => {
  try {
    return !!(typeof window !== "undefined" && window.document && window.document.createElement);
  } catch (error) {
    return false;
  }
};
var isRegex = (val) => Boolean(val && val instanceof RegExp);
var not = (func) => {
  return (...args) => !func.apply(null, args);
};
not.bool = not(isBool);
not.strBool = not(isStrBool);
not.coll = not(isColl);
not.deepEqual = not(deepEqual);
not.emptyColl = not(isEmptyColl);
not.dom = not(hasDomAccess);
not.exists = not(exists);
not.empty = not(isEmpty);
not.same = not(isSame);
not.validDate = not(isValidDate);
not.func = not(isFunc);
not.identity = not(identity);
not.orderable = not(isOrderable);
not.equalsNaN = not(equalsNaN);
not.float = not(isFloat);
not.int = not(isInt);
not.num = not(isNum);
not.negative = not(isNegative);
not.positive = not(isPositive);
not.hasOwn = not(hasOwn);
not.entry = not(isEntry);
not.arrMap = not(isArrMap);
not.obj = not(isObj);
not.jsonEqual = not(jsonEqual);
not.regex = not(isRegex);
not.email = not(isEmail);
not.ip = not(isIp);
not.lowerCase = not(isLowerCase);
not.phone = not(isPhone);
not.quoted = not(isQuoted);
not.str = not(isStr);
not.upperCase = not(isUpperCase);
not.url = not(isUrl);
not.uuid = not(isUuid);
not.validUrl = not(isValidUrl);

// node_modules/@keg-hub/jsutils/build/esm/noOps-3942ab96.js
var deepFreeze = (obj) => {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).map((prop) => {
    obj.hasOwnProperty(prop) && obj[prop] !== null && (typeof obj[prop] === "object" || isFunc(obj[prop])) && !Object.isFrozen(obj[prop]) && deepFreeze(obj[prop]);
  });
  return obj;
};
var noOpObj = Object.freeze({});
var noPropObj = deepFreeze({
  content: {}
});
var noPropArr = deepFreeze([]);

// node_modules/@keg-hub/jsutils/build/esm/stackTracePaths-b8a4dbc2.js
var checkCall = (method, ...params) => {
  return isFunc(method) ? method(...params) : void 0;
};
var noOp = () => {
};

// node_modules/@keg-hub/jsutils/build/esm/transformKeys-5fa23655.js
var keyMap = (arr, toUpperCase) => isArr(arr) && arr.reduce((obj, key) => {
  if (!isStr(key))
    return obj;
  const use = toUpperCase && key.toUpperCase() || key;
  obj[use] = use;
  return obj;
}, {}) || {};

// node_modules/@keg-hub/jsutils/build/esm/wait-26c5e7c6.js
var defObjProps = Array.from(["caller", "callee", "arguments", "apply", "bind", "call", "toString", "__proto__", "__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "isPrototypeOf", "propertyIsEnumerable", "valueOf", "toLocaleString"]).concat(Object.getOwnPropertyNames(Object.prototype)).reduce((map, functionName) => {
  map[functionName] = true;
  return map;
}, {});
var wait = (time) => new Promise((res) => setTimeout(() => res(true), time));

// src/types/helpers.types.ts
var EHookType = /* @__PURE__ */ ((EHookType2) => {
  EHookType2["beforeAll"] = `beforeAll`;
  EHookType2["afterAll"] = `afterAll`;
  EHookType2["beforeEach"] = `beforeEach`;
  EHookType2["afterEach"] = `afterEach`;
  return EHookType2;
})(EHookType || {});
var EStepType = /* @__PURE__ */ ((EStepType2) => {
  EStepType2["step"] = `step`;
  EStepType2["given"] = `given`;
  EStepType2["when"] = `when`;
  EStepType2["then"] = `then`;
  EStepType2["and"] = `and`;
  EStepType2["but"] = `but`;
  EStepType2["*"] = `*`;
  return EStepType2;
})(EStepType || {});

// src/constants.ts
var ignoreTypes = [
  `*`,
  ``
];
var constants = deepFreeze({
  ALIAS_REF: `$$`,
  ALIAS_WORLD_KEY: `$alias`,
  ALIAS_REF_AT_RUNTIME: `$$:`,
  REGEX_VARIANT: "regex",
  WORLD_REF: `$`,
  WORLD_KEY: `$world`,
  WORLD_AT_RUNTIME: `$:`,
  EXPRESSION_VARIANT: "expression",
  HOOK_TYPES: Object.keys(EHookType),
  STEP_TYPES: Object.keys(EStepType).filter((type) => !ignoreTypes.includes(type)),
  FEATURE_META: ["feature", "perspective", "desire", "reason", "comments"],
  LOG_JEST_SPEC_ENV: `PARKIN_LOG_JEST_SPEC`,
  SPEC_RESULT_LOG: `------- PARKIN SPEC RESULT LOG -------`
});
var ParentTypes = [
  "rule" /* rule */,
  "scenario" /* scenario */,
  "background" /* background */
];
var StepTypes = [
  "given" /* given */,
  "when" /* when */,
  "then" /* then */,
  "and" /* and */,
  "but" /* but */,
  "*" /* * */,
  "step" /* step */,
  "steps" /* steps */
];
var ParkinBailErrName = `ParkinBailError`;
var ParkinAbortErrName = `ParkinAbortError`;

// src/utils/errors.ts
var resolveErrMsg = (error, maybe) => {
  return isStr(error) ? [error, maybe] : [(error || maybe)?.message, error || maybe];
};
var replaceStackMsg = (err, msg) => {
  const split = err.stack.split(`
`);
  split[0] = msg;
  return split.join(`
`);
};
var ParkinError = class extends Error {
  name = `ParkinError`;
  results;
  testResults;
  constructor(msg, error, replaceStack = true) {
    const [message, err] = resolveErrMsg(msg, error);
    const { stackTraceLimit } = Error;
    if (err && replaceStack) {
      Error.stackTraceLimit = 0;
    }
    const opts = err && message !== err?.message ? { cause: err?.message } : void 0;
    super(message, opts);
    this.results = err?.results || [];
    this.testResults = err?.testResults || [];
    if (err?.result && !this.results.includes(err.result))
      this.results.push(err.result);
    Error.stackTraceLimit = stackTraceLimit;
    this.name = this.constructor.name;
    if (replaceStack) {
      if (err?.stack)
        this.stack = replaceStackMsg(err, message);
      err && Error.captureStackTrace(err, this.constructor);
    }
  }
};
var ParkinBailError = class extends ParkinError {
  name = ParkinBailErrName;
  constructor(msg, error, replaceStack = true) {
    super(msg, error, replaceStack);
  }
};
var ParkinAbortError = class extends ParkinError {
  name = ParkinAbortErrName;
  constructor(msg, error, replaceStack = true) {
    super(msg, error, replaceStack);
  }
};
var RetryError = class extends Error {
  results;
  constructor(err, message, retry) {
    super(message || err.message);
    this.stack = err.stack;
    this.name = !retry ? err.name : this.constructor.name;
    if (message)
      this.cause = err.message;
    if (err.results)
      this.results = err.results;
  }
};
var throwAbortError = (err) => {
  throw new ParkinAbortError(
    `Test execution \x1B[33m"aborted"\x1B[0m`,
    err,
    true
  );
};
var throwBailError = (err, bail) => {
  const colored = `\x1B[33m${bail}\x1B[0m`;
  throw new ParkinBailError(
    `Stopping test execution. Max allowed failed${bail ? ` ${colored} ` : ` `}tests has been reached`,
    err,
    true
  );
};
var throwExitOnFailed = (err) => {
  throw new ParkinBailError(
    `Stopping test execution. A test failed and \x1B[33m"exitOnFailed"\x1B[0m is active`,
    err,
    true
  );
};

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
var createItem = (type, metadata = noOpObj, validate2 = true) => {
  const { description, action } = metadata;
  validate2 && validateItem(type, description, action);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ParkinTest
});
//# sourceMappingURL=index.js.map