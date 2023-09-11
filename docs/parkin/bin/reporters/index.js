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

// src/bin/reporters/index.ts
var reporters_exports = {};
__export(reporters_exports, {
  CLIReporter: () => CLIReporter
});
module.exports = __toCommonJS(reporters_exports);

// src/bin/reporters/cli/cli.ts
var import_cli_utils2 = require("@keg-hub/cli-utils");

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

// node_modules/@keg-hub/jsutils/build/esm/wait-26c5e7c6.js
var defObjProps = Array.from(["caller", "callee", "arguments", "apply", "bind", "call", "toString", "__proto__", "__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "isPrototypeOf", "propertyIsEnumerable", "valueOf", "toLocaleString"]).concat(Object.getOwnPropertyNames(Object.prototype)).reduce((map, functionName) => {
  map[functionName] = true;
  return map;
}, {});

// src/bin/reporters/cli/formatters.ts
var import_cli_utils = require("@keg-hub/cli-utils");
var Clrs = import_cli_utils.Logger.colors;
var FailTag = `${Clrs.colorMap.red}\u2718`;
var PassTag = `${Clrs.colorMap.green}\u2714`;
var WarnTag = `${Clrs.colorMap.yellow}\u25CB`;
var FPassTag = `\x1B[42m\x1B[30m PASS \x1B[0m`;
var FFailTag = `\x1B[41m\x1B[30m FAIL \x1B[0m`;
var FWarnTag = `\x1B[43m\x1B[30m WARN \x1B[0m`;
var Tags = {
  root: {
    fail: FFailTag,
    pass: FPassTag,
    warn: FWarnTag
  },
  child: {
    fail: FailTag,
    pass: PassTag,
    warn: WarnTag
  }
};
var DimText = (text) => `${Clrs.colorMap.dim}${text}`;
var ColorMap = {
  Feature: {
    text: Clrs.colorMap.gray,
    type: Clrs.colorMap.yellow
  },
  Rule: {
    text: Clrs.colorMap.gray,
    type: Clrs.colorMap.blue
  },
  Parent: {
    text: Clrs.colorMap.gray,
    type: Clrs.colorMap.magenta
  },
  Step: {
    text: Clrs.colorMap.gray,
    type: Clrs.colorMap.cyan
  },
  Error: {
    text: Clrs.colorMap.white,
    type: Clrs.colorMap.red
  }
};
var FormatLine = (args) => {
  const {
    type,
    text,
    failed,
    isParent,
    isFailed,
    isFeature
  } = args;
  const sep = isParent ? ` ${Clrs.colorMap.white}> ` : ` `;
  const [PTag, FTag, WTag] = isFeature ? [FPassTag, FFailTag, FWarnTag] : [PassTag, FailTag, WarnTag];
  const tag = !failed ? PTag : isFailed ? FTag : WTag;
  const colorType = ColorMap[type];
  const colors = failed && isFailed ? ColorMap.Error : colorType ? colorType : isParent ? ColorMap.Parent : ColorMap.Step;
  const line = `${tag} ${colors.type}${type}${sep}${colors.text}${text}${Clrs.colorMap.reset}`;
  return isFailed || !failed ? line : DimText(line);
};
var FormatParent = (text, failed, isFailed) => {
  const [first, description] = text.split(`>`);
  const type = first.trim();
  const isFeature = type.startsWith(`Feature`);
  const line = FormatLine({
    type,
    failed,
    isFailed,
    isParent: true,
    isFeature: type.startsWith(`Feature`),
    text: (description || ``)?.trim?.()
  });
  return isFeature ? `
${line}
` : `  ${line}
`;
};
var FormatChild = (text, failed, isFailed) => {
  const [type, ...rest] = text.split(` `);
  const line = FormatLine({
    failed,
    isFailed,
    isParent: false,
    type: type.trim(),
    text: (rest.join(` `) || ``)?.trim?.()
  });
  return `    ${line}
`;
};
var FormatError = (failed) => {
  const output = [];
  const space = `      `;
  const { fullName, description, error } = failed;
  const message = error ? error.stack : `${fullName}
${description}`;
  const [first, ...lines] = message.split(`
`);
  output.push(`
${space}${Clrs.red(first)}
`);
  output.push(Clrs.white(lines.map((line) => `${space}${line}`).join(`
`)));
  output.push(`

`);
  return output.join(``);
};
var FormatErrors = (failedExps) => {
  return failedExps.map((failed) => FormatError(failed)).join(``);
};
var Format = (text, failed, isFailed) => {
  return text.includes(`>`) ? FormatParent(text, failed, isFailed) : FormatChild(text, failed, isFailed);
};

// src/bin/reporters/cli/cli.ts
var FailText = (text) => `${import_cli_utils2.Logger.colors.red(`\u2718`)} ${import_cli_utils2.Logger.colors.gray(`-`)} ${text}`;
var PassText = (text) => `${import_cli_utils2.Logger.colors.green(`\u2714`)} ${import_cli_utils2.Logger.colors.gray(`-`)} ${text}`;
var printResult = (results, opts = emptyObj) => {
  const {
    errorOnly,
    failedOnly,
    steps = true,
    features = true,
    stepParents = true,
    exitWithError,
    throwOnFailed
  } = opts;
  let hasFailed;
  const output = [];
  results.forEach((result) => {
    if ((failedOnly || errorOnly) && result.passed)
      return;
    if (!hasFailed && result.failed)
      hasFailed = result.failed;
    if (features && (!errorOnly || !result.passed))
      output.push(FormatParent(result.fullName, result.failed, result.failed));
    result.describes.forEach((describe) => {
      if ((failedOnly || errorOnly) && describe.passed)
        return;
      if (stepParents && (!errorOnly || !describe.passed))
        output.push(FormatParent(describe.description, result.failed, describe.failed));
      describe.tests.forEach((test) => {
        if ((failedOnly || errorOnly) && test.passed)
          return;
        if (steps || !test.passed)
          output.push(FormatChild(test.description, result.failed, test.failed));
        test.failed && output.push(FormatErrors(test.failedExpectations));
      });
    });
  });
  if (!hasFailed) {
    if (!exitWithError)
      return output.length && import_cli_utils2.Logger.log(output.join(``));
    output.length && import_cli_utils2.Logger.log(output.join(``));
    import_cli_utils2.Logger.empty();
    import_cli_utils2.Logger.log(PassText(`All features ${import_cli_utils2.Logger.colors.green(`passed`)}
`));
    process.exit(0);
  }
  if (exitWithError) {
    output.length && import_cli_utils2.Logger.log(output.join(``));
    import_cli_utils2.Logger.empty();
    import_cli_utils2.Logger.log(FailText(`One or more Features ${import_cli_utils2.Logger.colors.red(`failed`)}
`));
    import_cli_utils2.Logger.empty();
    process.exit(1);
  }
  output.length && import_cli_utils2.Logger.log(output.join(``));
  if (throwOnFailed)
    throw new Error(`One or more Features failed`);
};
var CLIReporter = {
  tags: Tags,
  fail: FailText,
  pass: PassText,
  results: printResult,
  format: {
    format: Format,
    line: FormatLine,
    error: FormatError,
    child: FormatChild,
    parent: FormatParent,
    errors: FormatErrors
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CLIReporter
});
//# sourceMappingURL=index.js.map