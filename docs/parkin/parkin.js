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

// src/parkin.ts
var parkin_exports = {};
__export(parkin_exports, {
  PKInstance: () => PKInstance,
  Parkin: () => Parkin
});
module.exports = __toCommonJS(parkin_exports);

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
var EAstObject = /* @__PURE__ */ ((EAstObject2) => {
  EAstObject2["error"] = `error`;
  EAstObject2["tags"] = `tags`;
  EAstObject2["rule"] = `rule`;
  EAstObject2["rules"] = `rules`;
  EAstObject2["step"] = `step`;
  EAstObject2["steps"] = `steps`;
  EAstObject2["block"] = `block`;
  EAstObject2["blocks"] = `blocks`;
  EAstObject2["empty"] = `empty`;
  EAstObject2["reason"] = `reason`;
  EAstObject2["desire"] = `desire`;
  EAstObject2["comment"] = `comment`;
  EAstObject2["comments"] = `comments`;
  EAstObject2["feature"] = `feature`;
  EAstObject2["scenario"] = `scenario`;
  EAstObject2["scenarios"] = `scenarios`;
  EAstObject2["background"] = `background`;
  EAstObject2["perspective"] = `perspective`;
  EAstObject2["given"] = `given`;
  EAstObject2["when"] = `when`;
  EAstObject2["then"] = `then`;
  EAstObject2["and"] = `and`;
  EAstObject2["but"] = `but`;
  EAstObject2["*"] = `*`;
  EAstObject2["expression"] = `expression`;
  EAstObject2["expressions"] = `expressions`;
  return EAstObject2;
})(EAstObject || {});

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
var emptyObj = noOpObj;
var noPropObj = deepFreeze({
  content: {}
});
var noPropArr = deepFreeze([]);
var emptyArr = noPropArr;

// node_modules/@keg-hub/jsutils/build/esm/isNonNegative-76ec0014.js
var isNonNegative = (val) => isNum(val) && val >= 0;

// node_modules/@keg-hub/jsutils/build/esm/intersect-2c6126f4.js
var eitherArr = (a, b) => isArr(a) ? a : b;

// node_modules/@keg-hub/jsutils/build/esm/ensureArr-d2e17773.js
var ensureArr = (val) => isArr(val) ? val : [val];

// node_modules/@keg-hub/jsutils/build/esm/get-2e0bc293.js
var get = (obj, path, fallback) => {
  const isPathArr = isArr(path);
  if (!isStr(path) && !isPathArr)
    return exists(fallback) ? fallback : void 0;
  const parts = isPathArr ? path : path.split(".");
  const result = parts.reduce((obj2, prop) => {
    const type = typeof obj2;
    if (!exists(obj2) || type !== "object" && type !== "function")
      return void 0;
    prop = prop.startsWith("[") ? prop.replace(/\D/g, "") : prop;
    return obj2[prop];
  }, obj);
  return exists(result) ? result : fallback;
};

// node_modules/@keg-hub/jsutils/build/esm/stackTracePaths-b8a4dbc2.js
var checkCall = (method, ...params) => {
  return isFunc(method) ? method(...params) : void 0;
};
var noOp = () => {
};

// node_modules/@keg-hub/jsutils/build/esm/reduceObj-efaed709.js
var reduceObj = (obj, cb, start = {}) => isObj(obj) && isFunc(cb) && Object.entries(obj).reduce((data, [key, value]) => cb(key, value, data), start) || start;

// node_modules/@keg-hub/jsutils/build/esm/transformKeys-5fa23655.js
var omitKeys = (obj = {}, keys = []) => isObj(obj) && reduceObj(obj, (key, _, updated) => {
  keys.indexOf(key) === -1 && (updated[key] = obj[key]);
  return updated;
}, {}) || {};
var pickKeys = (obj = {}, keys = []) => isObj(obj) && keys.reduce((updated, key) => {
  key in obj && (updated[key] = obj[key]);
  return updated;
}, {}) || {};

// node_modules/@keg-hub/jsutils/build/esm/wait-26c5e7c6.js
var defObjProps = Array.from(["caller", "callee", "arguments", "apply", "bind", "call", "toString", "__proto__", "__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "isPrototypeOf", "propertyIsEnumerable", "valueOf", "toLocaleString"]).concat(Object.getOwnPropertyNames(Object.prototype)).reduce((map, functionName) => {
  map[functionName] = true;
  return map;
}, {});

// node_modules/@keg-hub/jsutils/build/esm/joinRegex-be491c25.js
var getRegexSource = (maybeRx) => isRegex(maybeRx) ? maybeRx.source : isStr(maybeRx) ? maybeRx : null;
var parseArgs = (args) => {
  if (isArr(args[0]))
    return [args[0], args[1]];
  const last = args[args.length - 1];
  const options = isStr(last) ? last : void 0;
  const expressions = options ? args.splice(0, args.length - 1) : args;
  return [expressions, options];
};
var joinRegex = (...args) => {
  const [expressions, options] = parseArgs(args);
  const source = expressions.reduce((joined, next) => {
    const nextSource = getRegexSource(next);
    return !nextSource ? joined : joined === "" ? nextSource : `${joined}|${nextSource}`;
  }, "");
  return new RegExp(`(${source})`, options);
};

// node_modules/@keg-hub/jsutils/build/esm/getWordEndingAt-e4dc0e45.js
var capitalize = (str, lowercaseTail = true) => {
  if (!isStr(str) || !str[0])
    return str;
  const tail = lowercaseTail ? str.slice(1).toLowerCase() : str.slice(1);
  return `${str[0].toUpperCase()}${tail}`;
};
var hashString = (str, maxLength) => {
  if (!isStr(str) || str.length == 0)
    return 0;
  str = str.split("").reverse().join("");
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = `${Math.abs(hash & hash)}`;
  }
  return isNonNegative(maxLength) ? hash.slice(0, maxLength) : hash;
};
var reverseStr = (str) => {
  if (!isStr(str))
    return void 0;
  let reversed = "";
  for (let char of str) {
    reversed = char + reversed;
  }
  return reversed;
};
var getNearestDelimiterIndex = (text, index, delimiters = [" "]) => {
  const indices = delimiters.map((str) => text.indexOf(str, index)).sort();
  return indices.find((idx) => idx >= 0);
};
var getWordStartingAt = (text, index, delimiters = [" "]) => {
  const endingSpaceIdx = getNearestDelimiterIndex(text, index, delimiters);
  return text.substring(index, endingSpaceIdx === -1 ? text.length : endingSpaceIdx);
};
var getWordEndingAt = (text, index, delimiters = [" "]) => {
  const reversed = reverseStr(text);
  const reversedIndex = text.length - index;
  return reverseStr(getWordStartingAt(reversed, reversedIndex, delimiters));
};

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

// src/utils/helpers.ts
var cleanDefMatch = (match2) => {
  let name = match2.toString();
  name[0] === "/" && (name = name.substring(1));
  name[0] === "^" && (name = name.substring(1));
  name.charAt(name.length - 1) === "/" && (name = name.slice(0, -1));
  name.charAt(name.length - 1) === "$" && (name = name.slice(0, -1));
  return name;
};
var strToId = (str, prefix = ``, postfix = ``) => {
  return `${prefix}${hashString(cleanDefMatch(str))}${postfix}`;
};
var getRXMatch = (line, regex2, index) => {
  const matching = line.match(regex2)[index];
  return matching ? matching.trim() : ` `;
};
var sanitize2 = (def) => {
  return cleanDefMatch(def.match).replace(/\(\?:([^\|]+)+\|+([^\)]+)?\)/, "$1");
};
var validateDefinition = (definition, definitions) => {
  return definitions.reduce(
    (validated, def, idx) => {
      if (!validated || def.content === validated.content)
        return false;
      def.uuid === validated.uuid && (validated.uuid = `${validated.uuid}-${idx}`);
      return validated;
    },
    { ...definition }
  );
};
var removeQuotes = (arg) => {
  return arg.trim().replace(/^("|')/, "").replace(/("|')$/, "");
};
var getStartWhiteSpace = (line) => {
  const noStartSpace = line.replace(/^\s+/g, "");
  const startLength = line.length - noStartSpace.length;
  return new Array(startLength).fill(` `).join("");
};
var includePartType = (type, opts = emptyObj, include, exclude) => {
  const { include: oInclude, exclude: oExclude } = opts;
  const inArr = include || (Boolean(oInclude?.length) ? oInclude : void 0);
  const exArr = exclude || (Boolean(oExclude?.length) ? oExclude : void 0);
  return !inArr && !exArr ? true : !inArr ? !exArr.includes(type) : inArr.includes(type);
};

// src/matcher/patterns.ts
var RX_OPTIONAL = /\w*\([^)]*?\)/;
var RX_ALT = /\s*\S*\/\S*\s*/;
var RX_PARAMETER = /\s*{(.*?)}\s*/;
var RX_EXPRESSION = joinRegex(RX_PARAMETER, RX_OPTIONAL, "g");
var RX_ANY = /(.*)/;
var RX_MATCH_REPLACE = /{|}/g;
var RX_DOUBLE_QUOTED = /"([^"\\]*(\\.[^"\\]*)*)"/;
var RX_SINGLE_QUOTED = /\'([^\'\\]*(\\.[^\'\\]*)*)\'/;
var RX_FLOAT = /-?[0-9]+[.][0-9]+/;
var RX_INT = /-?[0-9]+/;
var RX_WORLD = /^["]?\$world\.\S+["]?/;
var RX_WORLD_REPLACE = /^\$world\./;
var RX_WORLD_MATCH = /(\$:world|\$world)+\.[^"'\s]*/gm;
var RX_ALIAS = /^["]?\$\$\S+["]?/;
var RX_ALIAS_REPLACE = /^\$\$/;
var RX_ALIAS_MATCH = /(\$\$:\w+|\$\$\w+)[^"'\s]*/gm;

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
var testMethodFill = (type) => {
  return () => {
    throw new ParkinError(
      `Test method ${type} does not exist on the global scope.
Please ensure ${type} exists before calling the run method!
`
    );
  };
};
var throwMissingSteps = () => {
  throw new ParkinError(
    `Runner class constructor requires an instance of the Steps class`
  );
};
var throwMissingHooks = (found) => {
  throw new ParkinError(
    `Runner class constructor requires an instance of the Hooks class. Found: ${found}`
  );
};
var throwMissingFeatureText = () => {
  throw new ParkinError(
    `Runner class requires feature text when calling the run method`
  );
};
var throwNoMatchingStep = (text) => {
  throw new ParkinError(text);
};
var throwParamTypeExists = (name) => {
  throw new ParkinError(`Cannot register param type "${name}". It already exists!`);
};
var throwFeatureNotAnObj = (feature) => {
  throw new ParkinError(`Assemble feature requires an object matching the feature model spec!`);
};
var throwMissingWorldValue = (arg) => {
  throw new ParkinError(
    `Can not replace ${arg} with value from $world, it does not exist on the world object`
  );
};
var throwInvalidHookType = (hookTypes, type) => {
  throw new ParkinError(
    [
      `Expected client hook type to be one of ', ${hookTypes}.`,
      `Found: ${type}`
    ].join("\n")
  );
};
var throwWorldReplace = (err, currentMatch) => {
  throw new ParkinError(`Error replacing $world value in feature text. Current match was ${currentMatch}`, err);
};
var throwAliasReplace = (err, currentMatch) => {
  throw new ParkinError(
    `Error replacing $$alias ( $world.$alias ) in feature text. Current match was ${currentMatch}`,
    err
  );
};

// src/matcher/paramTypes.ts
var { WORLD_KEY, ALIAS_WORLD_KEY, ALIAS_REF } = constants;
var mergeRegex = joinRegex;
var checkWorldValue = (func, type) => {
  return (arg, $world) => {
    const hasWorldVal = arg.match(RX_WORLD);
    const hasAliasVal = arg.match(RX_ALIAS);
    if (!isObj($world) || !hasWorldVal && !hasAliasVal)
      return matchType(func(arg, $world), type);
    const worldVal = hasWorldVal ? get($world, removeQuotes(arg).replace(`${WORLD_KEY}.`, "")) : get(
      $world,
      removeQuotes(arg).replace(`${ALIAS_REF}`, `${ALIAS_WORLD_KEY}.`)
    );
    return exists(worldVal) ? matchType(worldVal, type) : hasWorldVal ? throwMissingWorldValue(arg) : matchType(func(arg, $world), type);
  };
};
var matchType = (val, type) => {
  return typeof val === type ? val : null;
};
var typeModel = {
  name: ``,
  regex: ``,
  partial: ``,
  type: `string`,
  useForSnippets: true,
  preferForRegexpMatch: false,
  transformer: checkWorldValue((arg) => arg, `string`)
};
var __paramTypes = {
  any: {
    ...typeModel,
    name: `any`,
    regex: RX_ANY,
    partial: mergeRegex(RX_ANY, /{any}/, /{\*}/)
  },
  word: {
    ...typeModel,
    name: `word`,
    regex: RX_ANY,
    partial: mergeRegex(RX_ANY, /{word}/),
    transformer: checkWorldValue((arg) => {
      return !isQuoted(arg) ? toStr2(arg) : void 0;
    }, typeModel.type)
  },
  float: {
    ...typeModel,
    name: `float`,
    type: `number`,
    regex: RX_FLOAT,
    partial: mergeRegex(RX_INT, /{float}/),
    transformer: checkWorldValue((arg) => {
      const result = parseFloat(arg);
      return equalsNaN(result) ? void 0 : result;
    }, `number`)
  },
  int: {
    ...typeModel,
    name: `int`,
    type: `number`,
    regex: RX_INT,
    partial: mergeRegex(RX_INT, /{int}/, /{number}/),
    transformer: checkWorldValue((arg) => {
      const result = parseInt(arg);
      return equalsNaN(result) || arg.includes(`.`) ? void 0 : result;
    }, `number`)
  },
  string: {
    ...typeModel,
    name: `string`,
    regex: mergeRegex(RX_DOUBLE_QUOTED, RX_SINGLE_QUOTED),
    partial: mergeRegex(RX_DOUBLE_QUOTED, RX_SINGLE_QUOTED, /{string}/),
    transformer: checkWorldValue((arg) => {
      return isQuoted(arg) ? removeQuotes(arg) : void 0;
    }, typeModel.type)
  }
};
var getParamTypes = () => __paramTypes;
var registerParamType = (model = noOpObj, key = model.name) => {
  if (__paramTypes[key])
    return throwParamTypeExists(key);
  __paramTypes[key] = { ...typeModel, ...model };
  __paramTypes[key].transformer = checkWorldValue(
    __paramTypes[key].transformer,
    __paramTypes[key].type
  );
  return __paramTypes;
};
var convertTypes = (matches, transformers, $world) => {
  return matches.map((item, i) => {
    const paramType = transformers[i] || __paramTypes.any;
    return checkCall(paramType.transformer, item, $world);
  }).filter(exists);
};

// src/matcher/regex.ts
var matchRegex = (definition, text) => {
  const match2 = text.match(new RegExp(definition.match));
  return match2 ? { definition, match: match2.slice(1, match2.length).filter(Boolean) } : emptyObj;
};
var toAlternateRegex = (optional) => {
  const split = optional.split(/(\(|\))/);
  const start = split.shift();
  const end = split.pop();
  const middle = split.join(``);
  const original = optional.replace(/(\(|\))/ig, `\\$1`);
  if (start === "" && end === "")
    return `(${original}|${optional.replace(/(\(|\))/gi, ``)})?`;
  else if (start === "")
    return `(${original}|${middle}|${middle}${end})`;
  else if (end === "")
    return `(${original}|${start}|${start}${middle})`;
  else
    return `(${original}|${start}${end}|${start}${middle}${end})`;
};
var getFullOptionalText = (matchArr) => {
  const text = matchArr.input;
  const precedingWord = getWordEndingAt(text, matchArr.index);
  return precedingWord + matchArr[0];
};
var getOptionalRegex = (matchArr) => {
  const optionalText = getFullOptionalText(matchArr);
  return toAlternateRegex(optionalText);
};
var getParamRegex = (type, partial) => {
  const params = getParamTypes();
  const spec = params[type] || params.any;
  const refEx = partial && spec.partial ? spec.partial : spec.regex;
  return isStr(refEx) ? refEx : refEx.source;
};
var getAlternateRegex = (value) => {
  return `(${value.trim().replace(/\//g, "|")})`;
};
var getMatchRegex = (type, matchArr, opts) => {
  const [val, paramType] = matchArr;
  switch (type) {
    case "parameter" /* parameter */:
      return new RegExp(getParamRegex(paramType, opts?.partial));
    case "optional" /* optional */:
      return new RegExp(getOptionalRegex(matchArr));
    case "alternate" /* alternate */:
      return new RegExp(getAlternateRegex(val));
    default:
      return null;
  }
};
var parseMatch = (matchArr, type = "other", opts) => {
  const val = matchArr[0];
  const trimmed = val.trimStart();
  const diff = val.length - trimmed.length;
  return {
    text: val.trim(),
    input: matchArr.input,
    index: matchArr.index + diff,
    regex: getMatchRegex(type, matchArr, opts),
    type,
    ...type === "parameter" /* parameter */ && {
      paramType: val.trim().replace(RX_MATCH_REPLACE, "")
    }
  };
};
var getRegexParts = (defMatcher, opts = emptyObj) => {
  const { include, exclude } = opts;
  const inArr = Boolean(include?.length) ? include : void 0;
  const exArr = Boolean(exclude?.length) ? exclude : void 0;
  const parameters = includePartType("parameter" /* parameter */, opts, inArr, exArr) ? [...defMatcher.matchAll(new RegExp(RX_PARAMETER, "gi"))].map((match2) => parseMatch(match2, "parameter" /* parameter */, opts)) : emptyArr;
  const optionals = includePartType("optional" /* optional */, opts, inArr, exArr) ? [...defMatcher.matchAll(new RegExp(RX_OPTIONAL, "gi"))].map((match2) => parseMatch(match2, "optional" /* optional */, opts)) : emptyArr;
  const alts = includePartType("alternate" /* alternate */, opts, inArr, exArr) ? [...defMatcher.matchAll(new RegExp(RX_ALT, "gi"))].map((match2) => parseMatch(match2, "alternate" /* alternate */, opts)) : emptyArr;
  const sortedExpressions = [...parameters, ...optionals, ...alts].sort((matchA, matchB) => matchA.index - matchB.index);
  return sortedExpressions;
};

// src/matcher/tokens.ts
var tokenRegex = joinRegex(
  RX_INT,
  RX_FLOAT,
  RX_ALT,
  RX_OPTIONAL,
  RX_PARAMETER,
  RX_DOUBLE_QUOTED,
  RX_SINGLE_QUOTED,
  "g"
);
var tokenizeStep = (step, def, opts = emptyObj) => {
  const parts = getRegexParts(def.match, opts);
  const tokens = [];
  let idx = 0;
  let match2;
  while ((match2 = tokenRegex.exec(step)) !== null) {
    const part = parts[idx];
    if (!part)
      continue;
    const [val] = match2;
    if (!includePartType(part.type, opts))
      continue;
    const trimmed = val.trimStart();
    const diff = val.length - trimmed.length;
    tokens.push({
      match: val.trim(),
      defIndex: part?.index,
      index: match2.index + diff,
      type: part?.paramType || part?.type || "other" /* other */
    });
    idx++;
  }
  return tokens;
};

// src/utils/globalScope.ts
var hasWindow = Boolean(typeof window !== "undefined");
var hasGlobal = Boolean(typeof global !== "undefined");
var hasModule = Boolean(typeof module === "object");
var hasRequire = Boolean(typeof require === "function");
var hasJasmine = Boolean(
  hasGlobal && typeof global.jasmine !== "undefined"
);
var resolveJasmine = () => hasJasmine ? checkCall(() => global.jasmine) : { getEnv: () => noOpObj, testPath: `` };
var resolveModule = () => hasModule ? checkCall(() => module) : { exports: {} };
var resolveRequire = () => hasRequire ? checkCall(() => require) : noOp;
var resolveGlobalObj = () => {
  try {
    return hasWindow ? checkCall(() => window) : hasGlobal ? checkCall(() => global) : noOpObj;
  } catch (err) {
    return noOpObj;
  }
};

// src/matcher/expression.ts
var escapeStr = (str) => {
  return hasWindow ? str.replace(/[|\\[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d") : str.replace(/[|\\[\]^$+*?.]/g, "\\$&");
};
var runRegexCheck = (matcher2, testRx, replaceWith) => {
  if (!testRx.test(matcher2))
    return matcher2;
  const matchLength = matcher2.length;
  let regexStr = matcher2;
  matcher2.replaceAll(testRx, (...args) => {
    const idx = args[3];
    const match2 = args[0].trim();
    const newIdx = idx + (regexStr.length - matchLength);
    const [startSl, ...endSl] = regexStr.slice(newIdx).split(match2);
    const startStr = regexStr.slice(0, newIdx);
    const replace = isFunc(replaceWith) ? replaceWith.apply(null, args) : replaceWith;
    regexStr = `${startStr}${startSl}${replace}${endSl.join(match2)}`;
  });
  return regexStr;
};
var convertToRegex = (match2, opts = emptyObj) => {
  const paramTypes = getParamTypes();
  const transformers = [];
  const regex2 = runRegexCheck(
    match2,
    RX_EXPRESSION,
    (val, ...args) => {
      const type = val.trim().replace(RX_MATCH_REPLACE, "");
      const isParameter = val.match(RX_PARAMETER);
      const isOptional = val.match(RX_OPTIONAL);
      isParameter && transformers.push(paramTypes[type] || paramTypes.any);
      return isParameter ? getParamRegex(type, opts?.partial) : isOptional ? toAlternateRegex(val) : val;
    }
  );
  return { regex: regex2, transformers };
};
var checkAlternative = (match2) => {
  const altIndexes = [];
  const regex2 = runRegexCheck(
    match2,
    new RegExp(RX_ALT, "g"),
    // Use a non-capture group to allow matching, but don't include in the results (?:)
    getAlternateRegex
  );
  return { regex: regex2, altIndexes };
};
var checkAnchors = (str) => {
  let final = str;
  if (!str.startsWith("^"))
    final = "^" + final;
  if (!str.endsWith("$"))
    final += "$";
  return { regex: final };
};
var extractParameters = (text, stepMatcher, wordMatches, opts = emptyObj) => {
  const parts = getRegexParts(stepMatcher);
  const expectedParamLength = parts.filter(
    (part) => part.type === "parameter" /* parameter */
  ).length;
  const result = parts.reduce(
    (state, part) => {
      const { params, textIndex, wordMatchIndex } = state;
      const substring = text.substring(textIndex);
      const isWord = part.paramType === "word";
      const partMatch = substring.match(part.regex);
      const wordMatch = {
        0: wordMatches[wordMatchIndex],
        index: substring.indexOf(wordMatches[wordMatchIndex])
      };
      const match2 = isWord ? wordMatch : partMatch;
      if (!match2)
        return state;
      part.type === "parameter" /* parameter */ && match2 && params.push(match2[0]);
      return {
        params,
        // increment text index so that we don't reevaluate the same text in future iterations
        textIndex: textIndex + (match2 && match2.index + match2[0].length),
        // increment match index so we don't repeat a word in future iterations
        wordMatchIndex: wordMatchIndex + (isWord && 1)
      };
    },
    { params: [], textIndex: 0, wordMatchIndex: 0 }
  );
  return opts.partial || expectedParamLength === result.params.length ? result.params : null;
};
var findAsRegex = (definition, text, opts = emptyObj) => {
  const escaped = escapeStr(definition.match);
  const { regex: regexAlts } = checkAlternative(escaped);
  const { transformers, regex: regexConverted } = convertToRegex(regexAlts, opts);
  const { regex: regexAnchors } = checkAnchors(regexConverted);
  const found = matchRegex(
    { ...definition, match: regexAnchors },
    text
  );
  return {
    found,
    escaped,
    regexAlts,
    transformers,
    regexAnchors,
    regexConverted
  };
};
var matchExpression = (definition, text, $world, opts = emptyObj) => {
  if (definition.match === text)
    return { definition, match: [] };
  const { found, transformers } = findAsRegex(definition, text, opts);
  if (!found || !found.definition || !found.match)
    return emptyObj;
  const params = extractParameters(
    text,
    definition.match,
    found.match,
    opts
  );
  if (!params)
    return emptyObj;
  const converted = convertTypes(params, transformers, $world);
  return converted.length !== params.length ? emptyObj : { definition, match: converted };
};

// src/matcher/matcher.ts
var { REGEX_VARIANT } = constants;
var Matcher = class {
  parkin;
  options = emptyObj;
  constructor(parkin, options) {
    this.parkin = parkin;
    this.options = options;
  }
  /**
   * Finds a matching step definitions form the passed in text
   * If no options are passed;
   * All definition expression must be replaced in text
   * @member {Matcher}
   *
   */
  find = (text, definitions, $world, opts) => {
    const defs = definitions || this.parkin?.steps?.list?.() || emptyArr;
    const world = $world || this?.parkin?.world || { $alias: {} };
    return matcher(defs, text, world, opts || this.options);
  };
  /**
   * Finds a matching step definitions form the passed in text
   * Defaults partial option to true, to allow finding partial matches
   * @member {Matcher}
   *
   */
  search = (text, opts = { partial: true }) => this.find(text, void 0, void 0, opts);
  parts = (defMatchStr, opts) => getRegexParts(
    defMatchStr,
    opts || this.options
  );
  extract = (text, stepMatcher, wordMatches, opts) => extractParameters(
    text,
    stepMatcher,
    wordMatches,
    opts || this.options
  );
  expression = (def, text, $world, opts = emptyObj) => matchExpression(
    def,
    text,
    $world || this?.parkin?.world,
    opts || this.options
  );
  stepTokens = (step, def, opts) => tokenizeStep(
    step,
    def,
    opts || this.options
  );
  expressionFind = (def, text, opts = emptyObj) => findAsRegex(
    def,
    text,
    opts || this.options
  );
  regex = matchRegex;
  types = getParamTypes;
  register = registerParamType;
};
var matcher = (definitions, text, $world, opts = emptyObj) => {
  if (!text.trim())
    return emptyObj;
  const defLength = definitions.length;
  for (let idx = 0; idx < defLength; idx++) {
    const definition = definitions[idx];
    if (!definition.match)
      continue;
    const found = definition.variant !== REGEX_VARIANT ? matchExpression(definition, text, $world, opts) : matchRegex(definition, text);
    if (found.match)
      return found;
  }
  return emptyObj;
};

// src/utils/worldReplace.ts
var {
  ALIAS_REF: ALIAS_REF2,
  WORLD_REF,
  ALIAS_WORLD_KEY: ALIAS_WORLD_KEY2,
  WORLD_AT_RUNTIME,
  ALIAS_REF_AT_RUNTIME
} = constants;
var attemptReplace = (match2, world, location) => {
  const replaceWith = get(world, location);
  return isFunc(replaceWith) ? replaceWith(world, location) : exists(replaceWith) ? replaceWith : match2;
};
var aliasReplace = (text, world) => {
  let currentMatch;
  try {
    return text.replace(RX_ALIAS_MATCH, (match2) => {
      currentMatch = match2;
      const cleaned = match2.trim();
      const replaced = cleaned.indexOf(ALIAS_REF_AT_RUNTIME) === 0 ? cleaned.replace(ALIAS_REF_AT_RUNTIME, `$${ALIAS_REF2}`) : attemptReplace(
        match2,
        world,
        cleaned.replace(RX_ALIAS_REPLACE, `${ALIAS_WORLD_KEY2}.`)
      );
      return replaced;
    });
  } catch (err) {
    throwAliasReplace(err, currentMatch);
  }
};
var worldReplace = (text, world) => {
  let currentMatch;
  try {
    return text.replace(RX_WORLD_MATCH, (match2) => {
      currentMatch = match2;
      const cleaned = match2.trim();
      return cleaned.indexOf(WORLD_AT_RUNTIME) === 0 ? cleaned.replace(WORLD_AT_RUNTIME, WORLD_REF) : attemptReplace(match2, world, cleaned.replace(RX_WORLD_REPLACE, ""));
    });
  } catch (err) {
    throwWorldReplace(err, currentMatch);
  }
};
var replaceWorld = (text, world) => {
  return worldReplace(aliasReplace(text, world), world);
};

// src/definitions/joinAllDefs.ts
var joinAllDefs = (instance) => {
  return instance.types.reduce(
    (stepDefs, type) => stepDefs.concat(instance[`_${type}`]),
    []
  );
};

// src/definitions/registerFromCall.ts
var { REGEX_VARIANT: REGEX_VARIANT2, EXPRESSION_VARIANT } = constants;
var getContent = (def) => {
  const match2 = def.variant === REGEX_VARIANT2 ? def.match.toString() : `"${def.match}"`;
  return `${capitalize(def.type)}(${match2}, ${def.method.toString()})`;
};
var stringToRegex = (str) => {
  const main = str.match(/\/(.+)\/.*/)[1];
  const options = str.match(/\/.+\/(.*)/)[1];
  return new RegExp(main, options);
};
var registerFromCall = function(internalType, type, match2, method, meta = noOpObj) {
  const variant = match2.toString().indexOf("/") === 0 ? REGEX_VARIANT2 : EXPRESSION_VARIANT;
  const formattedMatch = variant === REGEX_VARIANT2 ? stringToRegex(match2.toString()) : match2.toString();
  const definition = {
    type,
    meta,
    method,
    variant,
    tokens: [],
    match: formattedMatch
  };
  definition.name = sanitize2(definition);
  definition.content = getContent(definition);
  definition.uuid = strToId(definition.name, `def-`);
  const definitions = this.list();
  const newDefinition = validateDefinition(definition, definitions);
  newDefinition && this[internalType].push(newDefinition);
  return newDefinition;
};

// src/definitions/tempRegister.ts
var tempRegister = (parent, type, container) => {
  return (...args) => {
    const definition = parent[type](...args);
    container[type].push(definition);
    return definition;
  };
};

// src/definitions/registerFromParse.ts
var registerFromParse = function(definitions) {
  const DEF_TYPES = this.types.map((type) => capitalize(type));
  const container = DEF_TYPES.reduce((built, type) => {
    built[type] = [];
    return built;
  }, {});
  eitherArr(definitions, [definitions]).map((definition) => {
    Function(`return (global, require, module, ${DEF_TYPES.join(",")}) => {
          return (function(global) { ${definition} }).call(global, global)
        }`)()(
      // Pass in the global object so we can bind the dynamic function to it
      // Allows referencing values on the global scope directly
      // For example myGlobalFunction() instead of window.myGlobalFunction()
      resolveGlobalObj(),
      resolveRequire(),
      resolveModule(),
      ...DEF_TYPES.map((type) => tempRegister(this, type, container))
    );
  });
  return container;
};

// src/steps.ts
var { STEP_TYPES } = constants;
var Steps = class {
  _world;
  /**
   * Allowed step definition types
   * @memberof Steps
   * @type {Array}
   * @private
   */
  types = STEP_TYPES;
  constructor(world = { $alias: {} }) {
    this._world = world;
    const self = this;
    this.types.map((type) => {
      const internalType = `_${type}`;
      this[internalType] = [];
      this[capitalize(type)] = (match2, method, meta) => {
        return self.register(internalType, type, match2, method, meta);
      };
    });
  }
  /**
   * Gets a list of all step definitions registered with the parkin instance
   * @memberof Steps
   * @function
   * @public
   *
   */
  list = () => {
    return joinAllDefs(this);
  };
  /**
   * Gets a list of all step definitions registered with the parkin instance
   * @memberof Steps
   * @function
   * @public
   *
   */
  typeList = () => {
    return this.types.reduce((stepDefs, type) => {
      const internalType = `_${type}`;
      stepDefs[type] = [...this[internalType]];
      return stepDefs;
    }, {});
  };
  /**
   * Finds a matching step definition from the passed in text
   * Steps must be registered with this instance to be found
   * @memberof Steps
   * @function
   * @public
   *
   */
  match = (text, step, options) => {
    const list = this.list();
    const found = matcher(
      list,
      replaceWorld(text, this._world),
      this._world
    );
    if (!found.match || !found.definition)
      return false;
    const extObj = { step, world: this._world };
    step?.doc && (extObj.doc = step?.doc);
    step?.table && (extObj.table = step?.table);
    options && (extObj.options = options);
    found.match.push(extObj);
    return found;
  };
  /**
   * Finds a matching step definition from the passed in list and text can calls it
   * This is the method the actually calls a step definition function
   * @memberof Steps
   * @function
   * @public
   *
   */
  resolve = (text, step, options) => {
    const found = this.match(text, step, options);
    return found ? found.definition.method(...found.match) : throwNoMatchingStep(
      `Matching definition could not be found for step: "${text}"`
    );
  };
  /**
   * Registers a step definition by type based on passed in args
   * @memberof Steps
   * @function
   * @public
   *
   */
  register = (...args) => {
    return isStr(args[0]) ? registerFromCall.apply(this, args) : registerFromParse.apply(this, args);
  };
  add = (...defs) => {
    const definitions = this.list();
    defs.forEach((def) => {
      const defsObj = isArr(def) || def?.match && def?.uuid ? ensureArr(def) : def;
      Object.values(defsObj).map((def2) => {
        if (!def2.type)
          return console.warn(`A definition type is required when adding a definition`, def2);
        const internalType = `_${def2.type}`;
        const newDefinition = validateDefinition(def2, definitions);
        newDefinition && this[internalType].push(newDefinition);
      });
    });
  };
  /**
   * Clears out all registered step definitions for all types
   * @memberof Steps
   * @function
   * @public
   *
   */
  clear = () => {
    this.types.map((type) => this[`_${type}`] = []);
  };
};

// src/hooks.ts
var { HOOK_TYPES } = constants;
var Hooks = class {
  afterAll = noOp;
  beforeAll = noOp;
  afterEach = noOp;
  beforeEach = noOp;
  /**
   * Allowed hook types
   * @memberof Hooks
   * @type {Array}
   * @private
   */
  types = HOOK_TYPES;
  /**
   * Parkin instance the hooks are tied to
   * @memberof Hooks
   * @type {Object}
   * @private
   */
  instance = void 0;
  _registeredHooks = {};
  constructor(world, instance) {
    this.instance = instance;
    this.types.map((type) => {
      this[type] = (clientHookFn) => {
        if (!isFunc(clientHookFn))
          return;
        this._registeredHooks[type] = this._registeredHooks[type] || [];
        this._registeredHooks[type].push(clientHookFn);
      };
    });
  }
  /**
   * Gets the registered hook callback method based on the passed in type
   */
  getRegistered = (type) => {
    const foundHooks = this.types.includes(type) ? this._registeredHooks[type] || noPropArr : throwInvalidHookType(HOOK_TYPES.join(", "), type);
    if (!foundHooks)
      return;
    return foundHooks.length ? async () => {
      return foundHooks.reduce(async (toResolve, hook) => {
        await toResolve;
        return await hook(this.instance);
      }, Promise.resolve());
    } : noOp;
  };
};

// src/utils/hasTag.ts
var parseTags = (tags) => {
  const parsed = isStr(tags) ? tags.match(/([@](\w|-)*)/g) : isArr(tags) ? tags : emptyArr;
  return parsed.filter((tag) => isStr(tag) && tag.startsWith(`@`) && tag.length > 2);
};
var hasTag = (itemTags = emptyArr, compareTags = emptyArr) => {
  const iTags = isStr(itemTags) ? parseTags(itemTags) : eitherArr(itemTags, []);
  const cTags = isStr(compareTags) ? parseTags(compareTags) : eitherArr(compareTags, []);
  return Boolean(cTags.find((cTag) => iTags.includes(cTag)));
};

// src/parse/idFromIdx.ts
var idFromIdx = (props) => {
  const {
    type,
    index,
    parent
  } = props;
  return `${parent.uuid}.${type}.${index}`;
};

// src/parse/parseStep.ts
var RX_STEP = /^\s*Step\s*(.*)$/;
var RX_GIVEN = /^\s*Given\s*(.*)$/;
var RX_WHEN = /^\s*When\s*(.*)$/;
var RX_THEN = /^\s*Then\s*(.*)$/;
var RX_AND = /^\s*And\s*(.*)$/;
var RX_BUT = /^\s*But\s*(.*)$/;
var RX_ASTERISK = /^\s*\*\s*(.*)$/;
var RX_DOC_QUOTES = /^\s*?"""\s*?/;
var RX_DOC_TICKS = /^\s*?```\s*?/;
var RX_DATA_TABLE = /^\s*?\|/;
var RegStepItems = [
  { regex: RX_STEP, type: "step" /* step */ },
  { regex: RX_GIVEN, type: "given" /* given */ },
  { regex: RX_WHEN, type: "when" /* when */ },
  { regex: RX_THEN, type: "then" /* then */ },
  { regex: RX_AND, type: "and" /* and */ },
  { regex: RX_BUT, type: "but" /* but */ },
  { regex: RX_ASTERISK, type: "*" /* * */ }
];
var checkDataTable = (step, lines, line, index) => {
  if (!RX_DATA_TABLE.test(line))
    return step;
  let tableEnd;
  step.table = {
    index,
    content: lines.reduce((table, ln) => {
      tableEnd = tableEnd || !RX_DATA_TABLE.test(ln);
      !tableEnd && table.push(
        ln.split("|").reduce((row, item) => {
          const column = item.trim();
          column && row.push(column);
          return row;
        }, [])
      );
      return table;
    }, [])
  };
  return step;
};
var checkDocString = (step, lines, line, index) => {
  let docMatch = RX_DOC_QUOTES.test(line) && '"""';
  docMatch = docMatch || RX_DOC_TICKS.test(line) && "```";
  if (!docMatch)
    return step;
  const whiteSpace = line.split(docMatch)[0];
  const spacer = new Array(whiteSpace.length).fill("\\s").join("");
  const spacerRegex = new RegExp(`^${spacer}`);
  step.doc = {
    index,
    whiteSpace,
    type: docMatch === `"""` ? `quote` : `tick`,
    // Split the passed in lines on the matching doc-string identifier
    // Then pull the second element from the array
    // Which is the content between the opening and closing doc-string identifiers
    // Then split it into an array single lines, and remove the starting white-space
    content: lines.split(docMatch).slice(1).shift().trim().split("\n").reduce((cleaned, ln) => {
      cleaned.push(ln.replace(spacerRegex, "").trim());
      return cleaned;
    }, []).join("\n")
  };
  return step;
};
var stepFactory = (parent, type, stepText, lines, line, index) => {
  let step = {
    type,
    index,
    step: stepText,
    whitespace: getStartWhiteSpace(line),
    uuid: idFromIdx({
      type,
      parent,
      index: parent?.steps?.length || 0
    })
  };
  const nextIndex = index + 1;
  const nextLine = lines[nextIndex];
  const afterLines = lines.slice(nextIndex);
  step = checkDataTable(step, afterLines, nextLine, nextIndex);
  step = checkDocString(step, afterLines.join("\n"), nextLine, nextIndex);
  return step;
};
var parseStep = (parent, lines, line, index) => {
  const stepParent = parent;
  return RegStepItems.reduce((added, regItems) => {
    if (added)
      return added;
    const hasStep = regItems.regex.test(line);
    if (!hasStep)
      return added;
    const step = stepFactory(
      parent,
      regItems.type,
      getRXMatch(line, regItems.regex, 1),
      lines,
      line,
      index
    );
    stepParent.steps.push(step);
    return step;
  }, void 0);
};

// src/parse/checkTags.ts
var RX_TAG = /^\s*@(.*)$/;
var tagsFactory = (index, content, line) => {
  const tokens = content.split(` `).reduce((acc, item) => {
    const token = item.trim();
    token.startsWith(`@`) && acc.push(token);
    return acc;
  }, []);
  const joined = tokens.join(` `);
  return {
    index,
    tokens,
    content: joined,
    type: "tags" /* tags */,
    uuid: strToId(joined, `tags-`),
    whitespace: getStartWhiteSpace(line)
  };
};
var checkTags = (line, index) => {
  if (!RX_TAG.test(line))
    return void 0;
  const tags = getRXMatch(line, RX_TAG, 0);
  const tagsBlock = tagsFactory(index, tags, line);
  tagsBlock.whitespace = getStartWhiteSpace(line);
  return tagsBlock;
};

// src/parse/setActiveParent.ts
var RX_FEATURE = /^\s*Feature:(.*)$/;
var RX_RULE = /^\s*Rule:(.*)$/;
var RX_SCENARIO = /^\s*Scenario:(.*)$/;
var RX_EXAMPLE = /^\s*Example:(.*)$/;
var RX_BACKGROUND = /^\s*Background:(.*)$/;
var setActiveParent = (activeParent, feature, rule, scenario, background, line) => {
  return RX_SCENARIO.test(line) || RX_EXAMPLE.test(line) ? scenario : RX_FEATURE.test(line) ? feature : RX_RULE.test(line) ? rule : RX_BACKGROUND.test(line) ? background : activeParent;
};

// src/parse/ensureRule.ts
var RX_RULE2 = /^\s*Rule:(.*)$/;
var ruleFactory = (rule, feature, index) => {
  const type = "rule" /* rule */;
  const loc = feature?.rules?.length || 0;
  return {
    type,
    rule,
    index,
    scenarios: [],
    ...rule && feature && { uuid: idFromIdx({ index: loc, type, parent: feature }) }
  };
};
var ensureRule = (feature, rule, line, index) => {
  if (!RX_RULE2.test(line))
    return rule;
  let ruleText = getRXMatch(line, RX_RULE2, 1);
  !rule.rule ? rule.rule = ruleText : rule = ruleFactory(ruleText, feature, index);
  !rule.index && (rule.index = index);
  !rule.uuid && (rule.uuid = idFromIdx({
    parent: feature,
    type: rule.type,
    index: feature?.rules?.length || 0
  }));
  rule.whitespace = getStartWhiteSpace(line);
  !feature.rules.includes(rule) && feature.rules.push(rule);
  return rule;
};

// src/parse/parseError.ts
var parseError = (feature, type, index, message) => {
  feature.errors = feature.errors || [];
  feature.errors.push({
    type,
    index,
    content: message || `Failed to parse ${type}`
  });
};

// src/parse/ensureFeature.ts
var RX_FEATURE2 = /^\s*Feature:(.*)$/;
var RX_HAS_FEATURE = /\s*Feature:(.*)/;
var featureFactory = (feature, content, index) => {
  return {
    index,
    content,
    feature,
    rules: [],
    empty: [],
    reason: [],
    comments: [],
    scenarios: [],
    type: "feature" /* feature */,
    ...feature && { uuid: strToId(feature, `feature-`) }
  };
};
var ensureFeature = (featuresGroup, feature, line, content, index) => {
  const hasFeature = Boolean(feature.feature || RX_HAS_FEATURE.test(content));
  if (!hasFeature || feature?.errors?.length) {
    !feature?.errors?.length && parseError(feature, "feature" /* feature */, index, `Could not find Feature text in file`);
    !featuresGroup.includes(feature) && featuresGroup.push(feature);
    return feature;
  }
  if (!RX_FEATURE2.test(line))
    return feature;
  const featureText = getRXMatch(line, RX_FEATURE2, 1);
  if (!feature.feature) {
    feature.feature = featureText;
    if (!feature.index)
      feature.index = index;
    if (!feature.uuid)
      feature.uuid = strToId(feature.feature, `feature-`);
    !featuresGroup.includes(feature) && featuresGroup.push(feature);
    return feature;
  }
  const builtFeature = featureFactory(featureText, content, index);
  featuresGroup.push(builtFeature);
  return builtFeature;
};

// src/parse/ensureScenario.ts
var RX_SCENARIO2 = /^\s*Scenario:(.*)$/;
var RX_EXAMPLE2 = /^\s*Example:(.*)$/;
var scenarioFactory = (scenario, parent, index) => {
  const type = "scenario" /* scenario */;
  const loc = parent?.scenarios?.length || 0;
  return {
    type,
    index,
    scenario,
    steps: [],
    ...scenario && parent && { uuid: idFromIdx({ index: loc, type, parent }) }
  };
};
var ensureScenario = (feature, rule, scenario, line, index) => {
  const hasScenario = RX_SCENARIO2.test(line);
  const hasExample = RX_EXAMPLE2.test(line);
  if (!hasScenario && !hasExample)
    return scenario;
  const scenarioText = hasScenario ? getRXMatch(line, RX_SCENARIO2, 1) : getRXMatch(line, RX_EXAMPLE2, 1);
  !exists(scenario.scenario) ? scenario.scenario = scenarioText : scenario = scenarioFactory(scenarioText, void 0, index);
  !scenario.index && (scenario.index = index);
  scenario.whitespace = getStartWhiteSpace(line);
  if (!hasScenario)
    scenario.alias = "Example" /* Example */;
  const parent = rule.uuid && scenario.whitespace > rule.whitespace ? rule : feature;
  !scenario.uuid && (scenario.uuid = idFromIdx({
    parent,
    type: scenario.type,
    index: parent?.scenarios?.length || 0
  }));
  !parent.scenarios.includes(scenario) && parent.scenarios.push(scenario);
  return scenario;
};

// src/parse/ensureBackground.ts
var RX_BACKGROUND2 = /^\s*Background:(.*)$/;
var backgroundFactory = (background, parent, index) => {
  const type = "background" /* background */;
  return {
    type,
    index,
    steps: [],
    background,
    ...background && parent && { uuid: idFromIdx({ index: 0, type, parent }) }
  };
};
var ensureBackground = (feature, rule, background, line, index) => {
  if (!RX_BACKGROUND2.test(line))
    return background;
  const existingBgText = getRXMatch(line, RX_BACKGROUND2, 1);
  const parent = rule?.uuid ? rule : feature;
  const backgroundText = isStr(existingBgText) ? existingBgText.trim() : "";
  isBool(background.background) ? background.background = backgroundText : background = backgroundFactory(backgroundText, parent, index);
  !background.index && (background.index = index);
  !background.uuid && (background.uuid = idFromIdx({
    parent,
    index: 0,
    type: background.type
  }));
  background.whitespace = getStartWhiteSpace(line);
  parent.background = background;
  return background;
};

// src/parse/ensureMeta.ts
var RX_AS = /^\s*As (.*)$/;
var RX_COMMENT = /^\s*#(.*)$/;
var RX_I_WANT = /^\s*I want (.*)$/;
var RX_SO_THAT = /^\s*So that (.*)$/;
var RX_IN_ORDER = /^\s*In order (.*)$/;
var featureMetaItems = [
  { regex: RX_AS, key: "perspective" /* perspective */ },
  { regex: RX_I_WANT, key: "desire" /* desire */ },
  { regex: RX_SO_THAT, key: "reason" /* reason */ },
  { regex: RX_IN_ORDER, key: "reason" /* reason */ }
];
var addReason = (feature, reason, line, index) => {
  if (!reason)
    return;
  const reasonArr = eitherArr(feature.reason, [feature.reason]);
  reasonArr.push({
    index,
    content: reason,
    type: "reason" /* reason */,
    whitespace: getStartWhiteSpace(line),
    uuid: idFromIdx({
      index: 0,
      parent: feature,
      type: "reason" /* reason */
    })
  });
  feature.reason = reasonArr;
};
var featureMeta = (feature, line, index) => {
  let metaAdded = false;
  featureMetaItems.reduce((added, regItem) => {
    if (added)
      return added;
    const hasItem = regItem.regex.test(line);
    if (!metaAdded && hasItem)
      metaAdded = true;
    const type = regItem.key === "desire" /* desire */ ? "desire" /* desire */ : regItem.key === "perspective" /* perspective */ ? "perspective" /* perspective */ : "block" /* block */;
    return hasItem ? regItem.key !== "reason" /* reason */ ? feature[regItem.key] = {
      type,
      index,
      whitespace: getStartWhiteSpace(line),
      content: getRXMatch(line, regItem.regex, 0),
      uuid: idFromIdx({
        type,
        index: 0,
        parent: feature
      })
    } : addReason(feature, getRXMatch(line, regItem.regex, 0), line, index) : hasItem;
  }, false);
  return metaAdded;
};
var featureComment = (feature, line, index) => {
  if (!RX_COMMENT.test(line))
    return false;
  const comment = line.match(RX_COMMENT)[0];
  feature.comments.push({
    index,
    content: comment.trim(),
    type: "comment" /* comment */,
    whitespace: getStartWhiteSpace(line),
    uuid: idFromIdx({
      parent: feature,
      type: "comment" /* comment */,
      index: feature.comments?.length || 0
    })
  });
  return true;
};
var featureEmptyLine = (feature, line, index) => {
  if (line.trim().length)
    return false;
  feature.empty.push({
    index,
    content: line,
    whitespace: ``,
    type: "empty" /* empty */,
    uuid: idFromIdx({
      parent: feature,
      type: "empty" /* empty */,
      index: feature.empty?.length || 0
    })
  });
  return true;
};

// src/parse/parseFeature.ts
var RX_NEWLINE = /\r?\n/g;
var defWorld = { $alias: {} };
var resolveArgs = (pWorld, world, options) => {
  const isOpts = !options && !world?.$alias && exists(world?.worldReplace);
  return {
    worldCfg: isOpts ? pWorld : world,
    opts: isOpts ? world : options || emptyObj
  };
};
var parseFeature = function(text, world, options) {
  const { opts, worldCfg } = resolveArgs(
    this ? this.world : defWorld,
    world,
    options
  );
  const features = [];
  const replaceText = opts?.worldReplace === false ? (text || "").toString() : replaceWorld((text || "").toString(), worldCfg);
  const lines = replaceText.split(RX_NEWLINE);
  let parseError2 = false;
  let feature = featureFactory(false, text);
  let rule = ruleFactory(false, feature);
  let scenario = scenarioFactory(false, feature);
  let background = backgroundFactory(false, feature);
  let activeParent = feature;
  let tagCache = void 0;
  return lines.reduce((featuresGroup, line, index) => {
    if (parseError2)
      return featuresGroup;
    feature = ensureFeature(featuresGroup, feature, line, text, index);
    if (feature?.errors?.length)
      parseError2 = true;
    if (parseError2 || featureEmptyLine(feature, line, index) || featureComment(feature, line, index) || featureMeta(feature, line, index)) {
      return featuresGroup;
    }
    rule = ensureRule(feature, rule, line, index);
    scenario = ensureScenario(feature, rule, scenario, line, index);
    background = ensureBackground(feature, rule, background, line, index);
    if (`steps` in activeParent) {
      const step = parseStep(activeParent, lines, line, index);
      if (step) {
        if (tagCache) {
          step.tags = tagCache;
          tagCache = void 0;
        }
        return featuresGroup;
      }
    }
    activeParent = setActiveParent(
      activeParent,
      feature,
      rule,
      scenario,
      background,
      line
    );
    if (tagCache) {
      activeParent.tags = tagCache;
      tagCache = void 0;
    } else
      tagCache = checkTags(line, index);
    return featuresGroup;
  }, features);
};

// src/parse/parseDefinition.ts
var parseDefinition = function(text) {
  const registered = this.steps.register([text]);
  return registered;
};

// src/utils/filterFeatures.ts
var emptyOpts = { tags: {}, steps: {} };
var filterMatch = ({
  name,
  tags,
  options
}) => {
  const {
    name: filterName,
    tags: filterTags
  } = options;
  const nameMatch = !filterName || !name || name.includes(filterName);
  const tagMatch = !filterTags?.length || tags?.length && filterTags?.every((clientTag) => tags?.includes(clientTag));
  return nameMatch && tagMatch;
};
var getFilterOpts = (opts = emptyOpts) => {
  const { name } = opts;
  const filterTags = opts.tags?.filter;
  const tags = isStr(filterTags) ? parseTags(filterTags) : eitherArr(filterTags, []);
  return { name, tags };
};
var filterChild = ({
  options,
  nameKey,
  children,
  tags = emptyArr
}) => {
  return children.filter((child) => {
    return filterMatch({
      options,
      name: child[nameKey],
      tags: [...child?.tags?.tokens || emptyArr, ...tags]
    });
  });
};
var filterFeatures = (features, filterOptions = emptyOpts) => {
  const options = getFilterOpts(filterOptions);
  if (!options?.tags?.length && !options?.name)
    return features;
  return features.reduce((filtered, feature) => {
    const isMatchingFeature = filterMatch({
      options,
      name: feature.feature,
      tags: feature?.tags?.tokens
    });
    if (isMatchingFeature) {
      filtered.push(feature);
      return filtered;
    }
    const { rules, scenarios, background, ...rest } = feature;
    const copy = { ...rest, rules: [], scenarios: [] };
    const matchingBackground = exists(background) && filterChild({
      options,
      nameKey: `background`,
      children: [background],
      tags: feature?.tags?.tokens
    });
    const matchingRules = filterChild({
      options,
      nameKey: `rule`,
      children: rules,
      tags: feature?.tags?.tokens
    });
    const matchingScenarios = filterChild({
      options,
      nameKey: `scenario`,
      children: scenarios,
      tags: feature?.tags?.tokens
    });
    const hasBackgroundMatch = Boolean(matchingBackground.length);
    const hasRuleMatch = Boolean(matchingRules.length);
    const hasScenarioMatch = Boolean(matchingScenarios.length);
    if (hasBackgroundMatch || hasRuleMatch || hasScenarioMatch) {
      hasBackgroundMatch && (copy.background = matchingBackground[0]);
      hasRuleMatch && (copy.rules = matchingRules);
      hasScenarioMatch && (copy.scenarios = matchingScenarios);
      filtered.push(copy);
    }
    return filtered;
  }, []);
};

// src/utils/testMethods.ts
var { SPEC_RESULT_LOG, LOG_JEST_SPEC_ENV } = constants;
var logResultToTerminal = (result) => {
  const timestamp = (/* @__PURE__ */ new Date()).getTime();
  get(process, `env.${LOG_JEST_SPEC_ENV}`) && process.stdout.write(
    [
      SPEC_RESULT_LOG,
      JSON.stringify({ ...result, timestamp }),
      SPEC_RESULT_LOG
    ].join(``)
  );
};
var getSuiteData = (suite) => {
  const description = get(suite, `description`);
  const type = !description ? `Feature` : description.startsWith(`Scenario >`) ? `Scenario` : description.startsWith(`Background >`) ? `Background` : description.startsWith(`Rule >`) ? `Rule` : `Feature`;
  return {
    type: type.toLowerCase(),
    // Format the description to match the actual Gherkin syntax
    ...type !== `Feature` && {
      description: description.replace(`${type} >`, `${type}:`)
    }
  };
};
var getTestMethod = (type, testMode) => {
  return testMode ? noOp : global[type] || testMethodFill(type);
};
var buildReporter = (jasmineEnv) => {
  const suites = [];
  const jasmineDescribe = jasmineEnv.describe;
  jasmineEnv.describe = (...args) => {
    const suite = jasmineDescribe.apply(null, args);
    suites.push(suite);
    return suite;
  };
  return {
    suiteStarted: (suite) => {
      logResultToTerminal({
        ...suite,
        ...getSuiteData(suite),
        action: "start" /* start */
      });
    },
    specStarted: (result) => {
      logResultToTerminal({
        ...result,
        type: "step" /* step */,
        action: "start" /* start */
      });
    },
    specDone: (result) => {
      logResultToTerminal({
        ...result,
        type: "step" /* step */,
        action: "end" /* end */
      });
      if (result.status !== `failed`)
        return;
      const suite = suites.find(
        (suite2) => suite2.children.find((spec) => spec.result === result)
      );
      suite && suite.children.map((spec) => spec.disable());
    },
    suiteDone: (suite) => {
      logResultToTerminal({
        ...suite,
        ...getSuiteData(suite),
        action: "end" /* end */
      });
    }
  };
};
var skipTestsOnFail = (testMode) => {
  if (!hasJasmine)
    return;
  const jasmineEnv = resolveJasmine().getEnv();
  jasmineEnv && jasmineEnv.describe && jasmineEnv?.addReporter?.(buildReporter(jasmineEnv));
};

// src/runner.ts
var emptyOpts2 = { tags: {}, steps: {} };
var getStepOpts = (step, options = emptyOpts2) => {
  const shared = options?.steps?.shared;
  const single = options?.steps?.[step?.uuid];
  return {
    ...shared,
    ...single,
    retry: single?.retry || shared?.retry || options?.retry || 0,
    timeout: single?.timeout || shared?.timeout || options?.timeout || 15e3
  };
};
var buildTitle = (text, type) => {
  return `${capitalize(type)} > ${text}`;
};
var resolveFeatures = (data, $world) => {
  return isStr(data) ? parseFeature(data, $world) : isObj(data) ? [data] : isArr(data) ? data.reduce(
    (features, feature) => features.concat(resolveFeatures(feature, $world)),
    []
  ) : throwMissingFeatureText();
};
var runStep = (stepsInstance, step, options = emptyOpts2, testMode) => {
  const test = getTestMethod("test" /* test */, testMode);
  const opts = getStepOpts(step, options);
  const disabled = opts?.disabled || hasTag(step?.tags?.tokens, options?.tags?.disabled);
  const testMethod = async () => {
    if (disabled)
      return;
    return await stepsInstance.resolve(
      step.step,
      step,
      opts
    );
  };
  testMethod.ParkinMetaData = {
    disabled,
    ...pickKeys(step, [`uuid`, `step`, `index`, `tags`, `type`, `definition`])
  };
  const last = process?.env?.JEST_WORKER_ID !== void 0 ? opts.timeout : opts;
  return test(`${capitalize(step.type)} ${step.step}`, testMethod, last);
};
var loopSteps = (parent, title, stepsInstance, options = emptyOpts2, testMode) => {
  const describe2 = getTestMethod("describe" /* describe */, testMode);
  const disabled = hasTag(parent?.tags?.tokens, options?.tags?.disabled);
  const describeMethod = () => {
    if (disabled)
      return;
    parent.steps.map((step) => runStep(stepsInstance, step, options, testMode));
  };
  describeMethod.ParkinMetaData = {
    disabled,
    ...pickKeys(parent, [`index`, `uuid`, `tags`, `type`, `background`, `scenario`])
  };
  return describe2(title, describeMethod);
};
var runScenario = (stepsInstance, scenario, background, options = emptyOpts2, testMode) => {
  background && runBackground(stepsInstance, scenario.scenario, background, options, testMode);
  return loopSteps(
    scenario,
    buildTitle(scenario.scenario, `Scenario`),
    stepsInstance,
    options,
    testMode
  );
};
var runBackground = (stepsInstance, title, background, options = emptyOpts2, testMode) => {
  return loopSteps(
    background,
    buildTitle(title, `Background`),
    stepsInstance,
    options,
    testMode
  );
};
var runRule = (stepsInstance, rule, background, options = emptyOpts2, testMode) => {
  const disabled = hasTag(rule?.tags?.tokens, options?.tags?.disabled);
  const describeMethod = () => {
    if (disabled)
      return;
    background && runBackground(
      stepsInstance,
      rule.rule,
      background,
      options,
      testMode
    );
    rule.scenarios.map((scenario) => runScenario(
      stepsInstance,
      scenario,
      rule.background,
      options,
      testMode
    ));
  };
  describeMethod.ParkinMetaData = {
    disabled,
    ...pickKeys(
      rule,
      [`index`, `uuid`, `tags`, `type`, `rule`]
    )
  };
  return describe(`Rule > ${rule.rule}`, describeMethod);
};
var Runner = class {
  steps;
  hooks;
  _world;
  constructor(steps, hooks, world) {
    !steps && throwMissingSteps();
    !hooks && throwMissingHooks(hooks);
    this.steps = steps;
    this.hooks = hooks;
    this._world = world;
  }
  /**
   * Gets the features to be run for a test
   * @param {TParkinRunFeaturesInput} data - Feature data as a string or parsed Feature model
   * @param {TParkinRunOpts} options - Define how the steps are run
   */
  getFeatures = (data, options = emptyOpts2) => {
    const features = resolveFeatures(data, this._world);
    return filterFeatures(features, options);
  };
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
  run = async (data, opts) => {
    const options = {
      ...emptyOpts2,
      ...opts,
      tags: { ...emptyOpts2?.tags, ...opts?.tags },
      steps: { ...emptyOpts2?.steps, ...opts?.steps }
    };
    const testMode = this.run.PARKIN_TEST_MODE;
    skipTestsOnFail(testMode);
    const describe2 = getTestMethod("describe" /* describe */, testMode);
    const beforeAll = getTestMethod("beforeAll" /* beforeAll */, testMode);
    const afterAll = getTestMethod("afterAll" /* afterAll */, testMode);
    const beforeEach = getTestMethod("beforeEach" /* beforeEach */, testMode);
    const afterEach = getTestMethod("afterEach" /* afterEach */, testMode);
    const features = this.getFeatures(data, options);
    if (!features.length)
      return false;
    features.map((feature) => {
      const disabled = hasTag(feature?.tags?.tokens, options?.tags?.disabled);
      if (!disabled) {
        beforeAll(this.hooks.getRegistered("beforeAll" /* beforeAll */));
        afterAll(this.hooks.getRegistered("afterAll" /* afterAll */));
        beforeEach(this.hooks.getRegistered("beforeEach" /* beforeEach */));
        afterEach(this.hooks.getRegistered("afterEach" /* afterEach */));
      }
      const describeMethod = () => {
        if (disabled)
          return;
        feature.rules.reduce((acc, rule) => {
          acc.push(runRule(
            this.steps,
            rule,
            feature.background,
            options,
            testMode
          ));
          return acc;
        }, []);
        feature.scenarios.reduce((acc, scenario) => {
          acc.push(runScenario(
            this.steps,
            scenario,
            feature.background,
            options,
            testMode
          ));
          return acc;
        }, []);
      };
      describeMethod.ParkinMetaData = {
        disabled,
        ...pickKeys(
          feature,
          [`index`, `uuid`, `tags`, `feature`, `type`, `errors`]
        )
      };
      return describe2(buildTitle(feature.feature, `Feature`), describeMethod);
    });
    return true;
  };
};

// src/assemble/helpers.ts
var formatAssembled = (assembled) => {
  return Array.from(assembled, (line) => exists(line) ? `${line.trimEnd()}
` : "\n").join("").trimEnd().concat(` `, `
`);
};
var addContent = (assembled, content, index) => {
  !exists(index) || index === false ? assembled.push(content) : exists(assembled[index]) ? assembled.splice(index, 0, content) : assembled[index] = content;
};
var getWhiteSpace = (ast, parent, def = ``) => {
  return exists(ast.whitespace) ? ast.whitespace : exists(parent?.whitespace) ? `${parent?.whitespace}${def}` : def;
};
var getTextContent = (ast, parent, type, def = ``) => {
  const content = ast[ast.type] || ``;
  const whitespace = getWhiteSpace(ast, parent, def);
  const prefix = `${whitespace}${type}:`;
  return content.length ? `${prefix} ${content}` : prefix;
};

// src/assemble/assembleParts.ts
var assembleFeature = (assembled, { ast, parent }) => {
  const feature = ast;
  addContent(
    assembled,
    getTextContent(feature, parent, "Feature" /* Feature */, ``),
    feature.index
  );
};
var assembleStep = (assembled, { ast, parent }) => {
  const step = ast;
  const whitespace = getWhiteSpace(
    step,
    parent,
    exists(parent?.whitespace) ? `${parent?.whitespace}  ` : `    `
  );
  const type = step.type !== "step" /* step */ ? capitalize(step.type) : `Step`;
  addContent(
    assembled,
    `${whitespace}${type} ${step.step || ``}`,
    step.index
  );
};
var assembleTags = (assembled, { ast, parent }) => {
  const tags = ast;
  const whitespace = getWhiteSpace(
    tags,
    parent,
    `feature` in parent ? `` : `  `
  );
  const content = tags.tokens.reduce((acc, token) => {
    const trimmed = token?.trim?.();
    return trimmed.length ? `${acc} @${token.replace(/^@/, ``)}` : acc;
  }, ``).trim();
  addContent(
    assembled,
    `${whitespace || ``}${content}`,
    parent.tags.index
  );
};
var assembleRule = (assembled, { ast, parent }) => {
  const rule = ast;
  const whitespace = rule.whitespace || `  `;
  addContent(assembled, `${whitespace}${"Rule" /* Rule */}: ${rule.rule || ``}`, rule.index);
};
var assembleBackground = (assembled, { ast, parent }) => {
  const background = ast;
  addContent(
    assembled,
    getTextContent(background, parent, "Background" /* Background */, `  `),
    background.index
  );
};
var assembleScenario = (assembled, { ast, parent }) => {
  const scenario = ast;
  const type = scenario.alias || "Scenario" /* Scenario */;
  addContent(
    assembled,
    getTextContent(scenario, parent, type, `  `),
    scenario.index
  );
};
var assembleBlock = (assembled, { ast, parent }) => {
  const block = ast;
  const whitespace = getWhiteSpace(block, parent, `  `);
  addContent(assembled, `${whitespace}${block.content}`, block.index);
};

// src/assemble/fromIndex.ts
var fromIndex = (indexes) => {
  const assembled = indexes.reduce((assembled2, item) => {
    switch (item.ast.type) {
      case "given" /* given */:
      case "when" /* when */:
      case "then" /* then */:
      case "and" /* and */:
      case "but" /* but */:
      case "*" /* * */:
      case "step" /* step */: {
        assembleStep(assembled2, item);
        break;
      }
      case "tags" /* tags */: {
        assembleTags(assembled2, item);
        break;
      }
      case "rule" /* rule */: {
        assembleRule(assembled2, item);
        break;
      }
      case "block" /* block */:
      case "empty" /* empty */:
      case "desire" /* desire */:
      case "reason" /* reason */:
      case "comment" /* comment */:
      case "perspective" /* perspective */: {
        assembleBlock(assembled2, item);
        break;
      }
      case "feature" /* feature */: {
        assembleFeature(assembled2, item);
        break;
      }
      case "scenario" /* scenario */: {
        assembleScenario(assembled2, item);
        break;
      }
      case "background" /* background */: {
        assembleBackground(assembled2, item);
        break;
      }
    }
    return assembled2;
  }, []);
  return formatAssembled(assembled);
};

// src/assemble/formatters.ts
var ensureBackgroundFirst = (parent, opts) => {
  if (!opts.backgroundAfterParent)
    return parent;
  const { scenarios, background } = parent;
  if (!background || !scenarios?.length)
    return parent;
  const backgroundIdx = background.index;
  let lowIdx = backgroundIdx;
  scenarios.forEach((scenario) => lowIdx > scenario.index && (lowIdx = scenario.index));
  const bgIdx = lowIdx !== backgroundIdx ? lowIdx - 1 : backgroundIdx;
  parent.background = { ...background, index: bgIdx };
  return parent;
};
var addEmptyLine = (feature, idx, opts) => {
  if (!feature.empty?.length)
    feature.empty = [];
  featureEmptyLine(feature, ``, idx + 1);
  return feature;
};
var formatStory = (feature, opts = emptyObj) => {
  const { desire, perspective, reason } = feature;
  let lastIdx = feature.index;
  if (reason)
    isArr(reason) ? ensureArr(reason).forEach((res) => lastIdx = res.index > lastIdx ? res.index : lastIdx) : lastIdx = reason.index;
  else if (desire)
    lastIdx = desire.index;
  else if (perspective)
    lastIdx = perspective.index;
  addEmptyLine(feature, lastIdx, opts);
  return feature;
};
var formatOptions = (feature, opts = emptyObj) => {
  const keys = [];
  const {
    removeEmpty,
    removeComments,
    emptyAfterStory,
    emptyAfterFeature
  } = opts;
  removeEmpty && keys.push(`empty`);
  removeComments && keys.push(`comments`);
  const updated = omitKeys(feature, keys);
  if (emptyAfterStory || emptyAfterFeature)
    !emptyAfterStory ? addEmptyLine(updated, updated.index, opts) : formatStory(updated, opts);
  return updated;
};
var formatSteps = (feature, parent, opts) => {
  if (!opts.emptyAfterSteps)
    return parent;
  const lastIdx = parent.steps.reduce((index, step) => step.index > index ? step.index : index, parent.index);
  addEmptyLine(feature, lastIdx, opts);
  return parent;
};
var formatBackground = (feature, parent, opts) => {
  if (!parent?.background)
    return parent;
  const { emptyAfterBackground } = opts;
  let updated = ensureBackgroundFirst(parent, opts);
  emptyAfterBackground && addEmptyLine(feature, parent.background.index, opts);
  const background = formatSteps(feature, parent.background, opts);
  updated.background = background;
  return updated;
};
var formatScenarios = (feature, parent, opts) => {
  if (!parent?.scenarios)
    return parent;
  const { emptyAfterScenario } = opts;
  const scenarios = parent.scenarios.reduce((acc, scenario) => {
    emptyAfterScenario && addEmptyLine(feature, scenario.index, opts);
    const updated = formatSteps(feature, scenario, opts);
    acc.push(updated);
    return acc;
  }, []);
  parent.scenarios = scenarios;
  return parent;
};
var formatRules = (feature, opts) => {
  if (!feature?.rules)
    return feature;
  const { emptyAfterRule } = opts;
  const rules = feature.rules.reduce((acc, rule) => {
    emptyAfterRule && addEmptyLine(feature, rule.index, opts);
    let updated = formatBackground(feature, rule, opts);
    updated?.scenarios?.length && (updated = formatScenarios(feature, updated, opts));
    acc.push(updated);
    return acc;
  }, []);
  return { ...feature, rules };
};
var formatFeature = (feature, opts = emptyObj) => {
  let updated = formatOptions(feature, opts);
  updated = formatBackground(updated, updated, opts);
  updated = formatRules(updated, opts);
  updated = formatScenarios(updated, updated, opts);
  return updated;
};

// src/assemble/findIndex.ts
var AstTypeMap = {
  ...EAstObject,
  ["step" /* step */]: "steps" /* steps */,
  ["given" /* given */]: "steps" /* steps */,
  ["when" /* when */]: "steps" /* steps */,
  ["then" /* then */]: "steps" /* steps */,
  ["and" /* and */]: "steps" /* steps */,
  ["but" /* but */]: "steps" /* steps */,
  ["*" /* * */]: "steps" /* steps */,
  ["rule" /* rule */]: "rules" /* rules */,
  ["comment" /* comment */]: "comments" /* comments */,
  ["scenario" /* scenario */]: "scenarios" /* scenarios */
};
var checkBlocks = (blocks, idx) => {
  const filtered = blocks.filter((block) => block.index <= idx);
  const match2 = filtered.find((block) => block.index === idx);
  return match2 ? checkBlocks(filtered, idx + 1) : idx;
};
var validateIndex = (feature, index) => {
  return checkBlocks(
    [
      ...feature.empty || emptyArr,
      ...feature.comments || emptyArr
    ],
    index
  );
};
var validObj = (child) => {
  return isObj(child) && isNum(child?.index);
};
var validArr = (childArr) => {
  return isArr(childArr) && childArr?.length;
};
var indexFromBlocks = ({
  loc,
  type,
  parent,
  feature
}) => {
  if (type === "tags" /* tags */) {
    const idx = parent.index - 1;
    return idx >= 0 ? idx : 0;
  }
  if (loc) {
    const found = loc === "before" /* before */ ? parent.index - 1 : parent.index + 1;
    const tagCheck = parent?.tags?.index === found ? found - 1 : found;
    return tagCheck > 0 ? tagCheck : 0;
  }
  const blocks = type === "empty" /* empty */ ? feature.empty : feature.comments;
  if (blocks?.length)
    return blocks[blocks.length - 1].index + 1;
  const contentSplit = feature.content.split(`
`);
  return contentSplit.length;
};
var indexFromStory = (feature) => {
  const {
    index,
    reason,
    desire,
    perspective
  } = feature;
  if (validArr(reason)) {
    const arr = reason;
    const re = arr[arr.length - 1];
    if (validObj(re))
      return re.index + 1;
  } else if (validObj(reason))
    return reason.index + 1;
  if (validObj(desire))
    return desire.index + 1;
  if (validObj(perspective))
    return perspective.index + 1;
  return index + 1;
};
var indexFromBackground = (parent, feature) => {
  if (validObj(parent?.background)) {
    const idx = indexFromSteps(parent.background);
    if (exists(idx))
      return idx;
  }
  return parent === feature ? indexFromStory(feature) : parent.index + 1;
};
var indexFromRule = (feature) => {
  if (!validArr(feature?.rules))
    return indexFromBackground(feature, feature);
  const rule = feature?.rules?.[feature.rules.length - 1];
  return validArr(rule?.scenarios) ? indexFromScenarios(rule, feature) : validObj(rule?.background) ? indexFromBackground(rule, feature) : rule.index + 1;
};
var indexFromScenarios = (parent, feature) => {
  if (validArr(parent?.scenarios)) {
    const scenario = parent.scenarios[parent.scenarios.length - 1];
    if (validObj(scenario))
      return indexFromSteps(scenario);
  }
  return parent === feature ? indexFromRule(feature) : indexFromBackground(parent, feature);
};
var indexFromSteps = (parent) => {
  const step = validArr(parent?.steps) && parent.steps[parent.steps.length - 1];
  return validObj(step) ? step.index + 1 : parent?.index + 1;
};
var findIndex = (props) => {
  const {
    type,
    parent,
    feature
  } = props;
  const astType = AstTypeMap[type] || type;
  switch (astType) {
    case "comments" /* comments */: {
      const idx = indexFromBlocks(props);
      return validateIndex(feature, idx);
    }
    case "empty" /* empty */: {
      const idx = indexFromBlocks(props);
      return validateIndex(feature, idx);
    }
    case "tags" /* tags */: {
      const idx = indexFromBlocks(props);
      return validateIndex(feature, idx);
    }
    case "background" /* background */: {
      const backParent = parent;
      const idx = indexFromBackground(backParent, feature);
      return validateIndex(feature, idx);
    }
    case "rules" /* rules */: {
      const feat = parent;
      const idx = indexFromRule(feat);
      return validateIndex(feat, idx);
    }
    case "scenarios" /* scenarios */: {
      const sParent = parent;
      const idx = indexFromScenarios(sParent, feature);
      return validateIndex(feature, idx);
    }
    case "steps" /* steps */: {
      const stepParent = parent;
      const idx = indexFromSteps(stepParent);
      return validateIndex(feature, idx);
    }
  }
};

// src/assemble/addToIndexes.ts
var addToIndexes = (feature, indexes, item, offset) => {
  const index = exists(item.ast.index) ? item.ast.index : findIndex({
    feature,
    parent: item.parent,
    type: item.ast.type
  });
  const preAmount = offset.reduce((acc, val, idx) => {
    return idx <= index && exists(val) ? acc + val : acc;
  }, 0);
  if (!indexes[index] && !preAmount) {
    indexes[index] = item;
    return indexes;
  }
  offset[index] = exists(offset[index]) ? offset[index] + 1 : 1;
  const newIdx = index + preAmount + 1;
  item.ast.index = index;
  const updatedLen = indexes.length + 1;
  newIdx <= updatedLen ? indexes.splice(newIdx, 0, item) : indexes.splice(newIdx, 0, ...Array(newIdx - updatedLen), item);
  return indexes;
};

// src/assemble/featureToIndexes.ts
var indexSteps = (feature, indexes, steps, parent, offset) => {
  steps.forEach((step) => {
    addToIndexes(feature, indexes, { ast: step, parent }, offset);
    step.tags && indexTags(feature, indexes, step, offset);
  });
};
var indexScenario = (feature, indexes, scenarios, parent, offset) => {
  scenarios.forEach((scenario) => {
    addToIndexes(feature, indexes, { ast: scenario, parent }, offset);
    scenario.tags && indexTags(feature, indexes, scenario, offset);
    scenario.steps && indexSteps(feature, indexes, scenario.steps, scenario, offset);
  });
};
var indexRules = (feature, indexes, rules, parent, offset) => {
  rules.forEach((rule) => {
    addToIndexes(feature, indexes, { ast: rule, parent }, offset);
    rule.tags && indexTags(feature, indexes, rule, offset);
    rule.scenarios && indexScenario(feature, indexes, rule.scenarios, rule, offset);
    rule.background && indexBackground(feature, indexes, rule.background, rule, offset);
  });
};
var indexReason = (feature, indexes, reason, parent, offset) => {
  isArr(reason) ? reason.forEach((reason2) => addToIndexes(feature, indexes, { ast: reason2, parent }, offset)) : addToIndexes(feature, indexes, { ast: reason, parent }, offset);
};
var indexBackground = (feature, indexes, background, parent, offset) => {
  addToIndexes(feature, indexes, { ast: background, parent }, offset);
  background.tags && indexTags(feature, indexes, background, offset);
  background?.steps && indexSteps(feature, indexes, background.steps, background, offset);
};
var indexBlocks = (feature, indexes, blocks, type, parent, offset) => {
  blocks.forEach((block) => {
    if (block.type !== type)
      block.type = type;
    addToIndexes(feature, indexes, { ast: block, parent }, offset);
  });
};
var indexTags = (feature, indexes, parent, offset) => {
  const tags = parent?.tags;
  tags?.tokens?.length && addToIndexes(feature, indexes, { ast: tags, parent }, offset);
};
var featureToIndexes = (feature) => {
  const indexes = [];
  let offset = [];
  feature?.tags && indexTags(feature, indexes, feature, offset);
  indexes[feature.index || indexes.length] = { ast: feature, parent: feature };
  feature?.empty && indexBlocks(
    feature,
    indexes,
    feature?.empty,
    "empty" /* empty */,
    feature,
    offset
  );
  feature?.comments && indexBlocks(
    feature,
    indexes,
    feature?.comments,
    "comment" /* comment */,
    feature,
    offset
  );
  feature.desire && indexBlocks(
    feature,
    indexes,
    [feature.desire],
    "desire" /* desire */,
    feature,
    offset
  );
  feature.perspective && indexBlocks(
    feature,
    indexes,
    [feature.perspective],
    "perspective" /* perspective */,
    feature,
    offset
  );
  feature.reason && indexReason(
    feature,
    indexes,
    feature.reason,
    feature,
    offset
  );
  feature.background && indexBackground(
    feature,
    indexes,
    feature.background,
    feature,
    offset
  );
  feature.rules && indexRules(
    feature,
    indexes,
    feature.rules,
    feature,
    offset
  );
  feature.scenarios && indexScenario(
    feature,
    indexes,
    feature.scenarios,
    feature,
    offset
  );
  offset = void 0;
  return indexes.filter((item) => item).map((item, idx) => {
    item.ast.index = idx;
    return item;
  });
};

// src/assemble/feature.ts
var assembleFeature2 = (toAssemble, opts = emptyObj) => {
  return eitherArr(toAssemble, [toAssemble]).map((feature) => {
    !isObj(feature) && throwFeatureNotAnObj(feature);
    const updated = formatFeature(feature, opts);
    const indexes = featureToIndexes(updated);
    return fromIndex(indexes);
  });
};

// src/assemble/assemble.ts
var assemble = {
  feature: assembleFeature2,
  toIndexes: featureToIndexes,
  findIndex,
  fromIndex
};

// src/utils/findInFeature.ts
var findInFeature = (props) => {
  const { id, uuid: uuid3, feature } = props;
  const ref = id || uuid3;
  if (!ref)
    return;
  const loc = ref?.toLowerCase?.().split(`.`).reduce((acc, part) => {
    if (part.startsWith("feature" /* feature */))
      return acc;
    const child = ParentTypes.includes(part) ? part === "scenario" /* scenario */ ? "scenarios" /* scenarios */ : part === "rule" /* rule */ ? "rules" /* rules */ : "background" /* background */ : StepTypes.includes(part) ? "steps" /* steps */ : part;
    child && acc.push(child);
    return acc;
  }, []);
  return get(feature, loc);
};

// src/parkin.ts
var { STEP_TYPES: STEP_TYPES2 } = constants;
var Parkin = class {
  #isInit = false;
  #world;
  steps;
  hooks;
  parse;
  runner;
  run;
  matcher;
  assemble;
  paramTypes;
  And;
  But;
  When;
  Then;
  Given;
  constructor(world, steps) {
    isObj(world) && this.init(world, steps);
  }
  get world() {
    return this.#world;
  }
  set world(update) {
    this.#world = update;
    this.steps._world = update;
    this.runner._world = update;
  }
  init = (world = noOpObj, steps, warn = true) => {
    if (this.#isInit) {
      warn && console.warn(`This instance of parkin has already been initialized!`);
      return;
    }
    if (!isObj(world.$alias))
      world.$alias = {};
    this.#isInit = true;
    this.steps = new Steps(world);
    this.hooks = new Hooks(world, this);
    this.runner = new Runner(this.steps, this.hooks, world);
    this.world = world;
    this.run = this.runner.run;
    this.parse = {
      feature: parseFeature.bind(this),
      definition: parseDefinition.bind(this)
    };
    this.assemble = assemble;
    this.paramTypes = { register: registerParamType };
    this.matcher = new Matcher(this);
    isObj(steps) && this.registerSteps(steps);
    this.steps.types.map((type) => {
      this[capitalize(type)] = (matcher2, method, meta) => this.steps.register(`_${type}`, type, matcher2, method, meta);
    });
  };
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
  registerSteps = (steps) => {
    const stepKeys = Object.keys(steps);
    const doRegister = Boolean(STEP_TYPES2.find((type) => stepKeys.includes(type)));
    if (doRegister)
      return Object.entries(steps).forEach(([type, typedSteps]) => {
        STEP_TYPES2.includes(type) && Object.entries(typedSteps).forEach(([matcher2, content]) => {
          this.steps[capitalize(type)](matcher2, ...eitherArr(content, [content]));
        });
      });
    else
      this.steps.add(steps);
  };
  /**
   * Expose helper method to re-index a parsed feature AST when it's content is modified
   * This allows the feature to be properly re-assembled at another time
   */
  reIndex = (feature) => {
    feature.empty = [];
    const assembled = this.assemble.feature([feature])[0];
    return this.parse.feature(assembled, this.world)[0];
  };
  /**
   * Finds an item in a features from the items uuid ( id )
   */
  find = findInFeature;
  /**
   * Generates an id from the passed in options
   */
  generateId = idFromIdx;
};
var PKInstance = new Parkin();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PKInstance,
  Parkin
});
//# sourceMappingURL=parkin.js.map