var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/validate-23297ec2.js
var require_validate_23297ec2 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/validate-23297ec2.js"(exports) {
    "use strict";
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
    exports.validate = validate;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isArr-39234014.js
var require_isArr_39234014 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isArr-39234014.js"(exports) {
    "use strict";
    var isArr7 = (value) => Array.isArray(value);
    exports.isArr = isArr7;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isObj-6b3aa807.js
var require_isObj_6b3aa807 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isObj-6b3aa807.js"(exports) {
    "use strict";
    var isObj6 = (obj) => typeof obj === "object" && !Array.isArray(obj) && obj !== null;
    exports.isObj = isObj6;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isFunc-f93803cb.js
var require_isFunc_f93803cb = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isFunc-f93803cb.js"(exports) {
    "use strict";
    var isFunc4 = (func) => typeof func === "function";
    exports.isFunc = isFunc4;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isStr-8a57710e.js
var require_isStr_8a57710e = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isStr-8a57710e.js"(exports) {
    "use strict";
    var isStr8 = (str) => typeof str === "string";
    exports.isStr = isStr8;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isNum-c7164b50.js
var require_isNum_c7164b50 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isNum-c7164b50.js"(exports) {
    "use strict";
    var equalsNaN2 = (val) => typeof val === "number" && val != val;
    var isNum2 = (val) => typeof val === "number" && !equalsNaN2(val);
    exports.equalsNaN = equalsNaN2;
    exports.isNum = isNum2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isValidDate-813b9419.js
var require_isValidDate_813b9419 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isValidDate-813b9419.js"(exports) {
    "use strict";
    var isObj6 = require_isObj_6b3aa807();
    var isArr7 = require_isArr_39234014();
    var isStr8 = require_isStr_8a57710e();
    var isNum2 = require_isNum_c7164b50();
    var typeOf = (val) => Object.prototype.toString.call(val).slice(8, -1);
    var isEmpty = (val) => isObj6.isObj(val) ? Object.keys(val).length === 0 : isArr7.isArr(val) ? val.length === 0 : isStr8.isStr(val) ? val.trim().length === 0 : isNum2.isNum(val) ? val < 1 : false;
    var isSame = (val1, val2) => val1 === val2 ? val1 !== 0 || 1 / val1 === 1 / val2 : val1 !== val1 && val2 !== val2;
    var isValidDate = (date) => !isNaN((date instanceof Date && date || new Date(date)).getTime());
    exports.isEmpty = isEmpty;
    exports.isSame = isSame;
    exports.isValidDate = isValidDate;
    exports.typeOf = typeOf;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isBool-aa6af74e.js
var require_isBool_aa6af74e = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isBool-aa6af74e.js"(exports) {
    "use strict";
    var isBool2 = (val) => typeof val === "boolean";
    exports.isBool = isBool2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/toStr-8e499966.js
var require_toStr_8e499966 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/toStr-8e499966.js"(exports) {
    "use strict";
    var isStr8 = require_isStr_8a57710e();
    var toStr3 = (val) => val === null || val === void 0 ? "" : isStr8.isStr(val) ? val : JSON.stringify(val);
    exports.toStr = toStr3;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/toBool-deb350e4.js
var require_toBool_deb350e4 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/toBool-deb350e4.js"(exports) {
    "use strict";
    var toStr3 = require_toStr_8e499966();
    var isBool2 = require_isBool_aa6af74e();
    var isStrBool = (val) => val === "false" || val === "true";
    var convertToStrBool = (val) => isBool2.isBool(val) ? toStr3.toStr(val) : !val || val === "false" || val === "0" ? "false" : "true";
    var toBool = (val) => isStrBool(val) ? val === "true" : convertToStrBool(val) === "true";
    exports.convertToStrBool = convertToStrBool;
    exports.isStrBool = isStrBool;
    exports.toBool = toBool;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isColl-5757310a.js
var require_isColl_5757310a = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isColl-5757310a.js"(exports) {
    "use strict";
    var isColl = (val) => typeof val === "object" && val !== null;
    exports.isColl = isColl;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/deepEqual-adba847a.js
var require_deepEqual_adba847a = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/deepEqual-adba847a.js"(exports) {
    "use strict";
    var isColl = require_isColl_5757310a();
    var isArr7 = require_isArr_39234014();
    var isEmptyColl = (obj) => isArr7.isArr(obj) ? obj.length === 0 : isColl.isColl(obj) && Object.getOwnPropertyNames(obj).length === 0;
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
    exports.deepEqual = deepEqual;
    exports.isEmptyColl = isEmptyColl;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/exists-c79204b1.js
var require_exists_c79204b1 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/exists-c79204b1.js"(exports) {
    "use strict";
    var exists10 = (value) => value === value && value !== void 0 && value !== null;
    exports.exists = exists10;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isInt-94ce4199.js
var require_isInt_94ce4199 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isInt-94ce4199.js"(exports) {
    "use strict";
    var isNum2 = require_isNum_c7164b50();
    var isNegative = (x) => isNum2.isNum(x) && x < 0;
    var isPositive = (x) => isNum2.isNum(x) && x > 0;
    var isFloat = (val) => isNum2.isNum(val) && val % 1 !== 0;
    var isInt = (val) => isNum2.isNum(val) && val % 1 === 0;
    exports.isFloat = isFloat;
    exports.isInt = isInt;
    exports.isNegative = isNegative;
    exports.isPositive = isPositive;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/jsonEqual-7e69ef6a.js
var require_jsonEqual_7e69ef6a = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/jsonEqual-7e69ef6a.js"(exports) {
    "use strict";
    var isStr8 = require_isStr_8a57710e();
    var isNum2 = require_isNum_c7164b50();
    var isArr7 = require_isArr_39234014();
    var isObj6 = require_isObj_6b3aa807();
    var toBool = require_toBool_deb350e4();
    var hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    var isEntry = (maybeEntry) => isArr7.isArr(maybeEntry) && maybeEntry.length === 2 && (isNum2.isNum(maybeEntry[0]) || isStr8.isStr(maybeEntry[0]));
    var isArrMap = (obj) => {
      if (!isObj6.isObj(obj))
        return false;
      const values = Object.values(obj);
      return toBool.toBool(values.length && values.every(isArr7.isArr));
    };
    var jsonEqual = (one, two) => {
      try {
        return JSON.stringify(one) === JSON.stringify(two);
      } catch (e) {
        return false;
      }
    };
    exports.hasOwn = hasOwn;
    exports.isArrMap = isArrMap;
    exports.isEntry = isEntry;
    exports.jsonEqual = jsonEqual;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isQuoted-eb6994da.js
var require_isQuoted_eb6994da = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isQuoted-eb6994da.js"(exports) {
    "use strict";
    var isStr8 = require_isStr_8a57710e();
    var isLowerCase = (str) => str === str.toLowerCase();
    var isUpperCase = (str) => str === str.toUpperCase();
    var isEmail = (str) => {
      if (!str || !isStr8.isStr(str))
        return false;
      const regex2 = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return Boolean(regex2.test(str));
    };
    var regex = {
      ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
      ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i
    };
    var isIp = (str) => {
      if (!str || !isStr8.isStr(str))
        return false;
      const isIp42 = Boolean(regex.ipv4.test(str));
      return isIp42 || Boolean(regex.ipv6.test(str));
    };
    var isIp4 = (str) => {
      if (!str || !isStr8.isStr(str))
        return false;
      return Boolean(regex.ipv4.test(str));
    };
    var isIp6 = (str) => {
      if (!str || !isStr8.isStr(str))
        return false;
      return Boolean(regex.ipv6.test(str));
    };
    var isPhone = (str) => {
      if (!str || !isStr8.isStr(str))
        return false;
      const regex2 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      return Boolean(regex2.test(str)) && str.replace(/\D/g, "").length < 11;
    };
    var isUrl = (str) => {
      const regex2 = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
      return Boolean(regex2.test(str));
    };
    var isUuid = (str) => {
      if (!str || !isStr8.isStr(str))
        return false;
      const regex2 = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
      return Boolean(regex2.test(str));
    };
    var quoteSymbols = ['"', "'"];
    var isQuoted2 = (str, quotes = quoteSymbols) => {
      return isStr8.isStr(str) && quotes.some((quote) => str.startsWith(quote) && str.endsWith(quote));
    };
    exports.isEmail = isEmail;
    exports.isIp = isIp;
    exports.isIp4 = isIp4;
    exports.isIp6 = isIp6;
    exports.isLowerCase = isLowerCase;
    exports.isPhone = isPhone;
    exports.isQuoted = isQuoted2;
    exports.isUpperCase = isUpperCase;
    exports.isUrl = isUrl;
    exports.isUuid = isUuid;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isValidUrl-a77135f0.js
var require_isValidUrl_a77135f0 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isValidUrl-a77135f0.js"(exports) {
    "use strict";
    var isValidUrl = (str) => {
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
      return regexp.test(str);
    };
    exports.isValidUrl = isValidUrl;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/not-16fa9c85.js
var require_not_16fa9c85 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/not-16fa9c85.js"(exports) {
    "use strict";
    var isArr7 = require_isArr_39234014();
    var isValidDate = require_isValidDate_813b9419();
    var isFunc4 = require_isFunc_f93803cb();
    var isBool2 = require_isBool_aa6af74e();
    var toBool = require_toBool_deb350e4();
    var isColl = require_isColl_5757310a();
    var deepEqual = require_deepEqual_adba847a();
    var exists10 = require_exists_c79204b1();
    var isStr8 = require_isStr_8a57710e();
    var isNum2 = require_isNum_c7164b50();
    var isInt = require_isInt_94ce4199();
    var jsonEqual = require_jsonEqual_7e69ef6a();
    var isObj6 = require_isObj_6b3aa807();
    var isQuoted2 = require_isQuoted_eb6994da();
    var isValidUrl = require_isValidUrl_a77135f0();
    var isOrderable = (x) => isStr8.isStr(x) || isNum2.isNum(x) || isBool2.isBool(x);
    var identity = (x) => x;
    var match = (matchArg, ...args) => {
      if (!args.length)
        return null;
      for (let entry of args) {
        if (!isArr7.isArr(entry)) {
          console.error(`Matching case must be an entry (a 2-element array). Found: ${isValidDate.typeOf(entry)}`, entry);
          break;
        }
        const [caseValueOrPredicate, valueOnMatch] = entry;
        if (isFunc4.isFunc(caseValueOrPredicate) && caseValueOrPredicate(matchArg))
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
    not.bool = not(isBool2.isBool);
    not.strBool = not(toBool.isStrBool);
    not.coll = not(isColl.isColl);
    not.deepEqual = not(deepEqual.deepEqual);
    not.emptyColl = not(deepEqual.isEmptyColl);
    not.dom = not(hasDomAccess);
    not.exists = not(exists10.exists);
    not.empty = not(isValidDate.isEmpty);
    not.same = not(isValidDate.isSame);
    not.validDate = not(isValidDate.isValidDate);
    not.func = not(isFunc4.isFunc);
    not.identity = not(identity);
    not.orderable = not(isOrderable);
    not.equalsNaN = not(isNum2.equalsNaN);
    not.float = not(isInt.isFloat);
    not.int = not(isInt.isInt);
    not.num = not(isNum2.isNum);
    not.negative = not(isInt.isNegative);
    not.positive = not(isInt.isPositive);
    not.hasOwn = not(jsonEqual.hasOwn);
    not.entry = not(jsonEqual.isEntry);
    not.arrMap = not(jsonEqual.isArrMap);
    not.obj = not(isObj6.isObj);
    not.jsonEqual = not(jsonEqual.jsonEqual);
    not.regex = not(isRegex);
    not.email = not(isQuoted2.isEmail);
    not.ip = not(isQuoted2.isIp);
    not.lowerCase = not(isQuoted2.isLowerCase);
    not.phone = not(isQuoted2.isPhone);
    not.quoted = not(isQuoted2.isQuoted);
    not.str = not(isStr8.isStr);
    not.upperCase = not(isQuoted2.isUpperCase);
    not.url = not(isQuoted2.isUrl);
    not.uuid = not(isQuoted2.isUuid);
    not.validUrl = not(isValidUrl.isValidUrl);
    exports.hasDomAccess = hasDomAccess;
    exports.identity = identity;
    exports.isOrderable = isOrderable;
    exports.isRegex = isRegex;
    exports.match = match;
    exports.not = not;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/compareTo-d69e4abf.js
var require_compareTo_d69e4abf = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/compareTo-d69e4abf.js"(exports) {
    "use strict";
    var isStr8 = require_isStr_8a57710e();
    var not = require_not_16fa9c85();
    var validate = require_validate_23297ec2();
    var compareTo = (x, y) => {
      const [valid] = validate.validate({
        x,
        y
      }, {
        $default: not.isOrderable
      });
      if (!valid)
        return null;
      return isStr8.isStr(x) ? x.localeCompare(y) : x - y;
    };
    exports.compareTo = compareTo;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/noOps-b5f3c7e4.js
var require_noOps_b5f3c7e4 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/noOps-b5f3c7e4.js"(exports) {
    "use strict";
    var isFunc4 = require_isFunc_f93803cb();
    var deepFreeze2 = (obj) => {
      Object.freeze(obj);
      Object.getOwnPropertyNames(obj).map((prop) => {
        obj.hasOwnProperty(prop) && obj[prop] !== null && (typeof obj[prop] === "object" || isFunc4.isFunc(obj[prop])) && !Object.isFrozen(obj[prop]) && deepFreeze2(obj[prop]);
      });
      return obj;
    };
    var noOpObj5 = Object.freeze({});
    var emptyObj10 = noOpObj5;
    var noPropObj = deepFreeze2({
      content: {}
    });
    var noPropArr2 = deepFreeze2([]);
    var noOpArr = noPropArr2;
    var emptyArr6 = noPropArr2;
    exports.deepFreeze = deepFreeze2;
    exports.emptyArr = emptyArr6;
    exports.emptyObj = emptyObj10;
    exports.noOpArr = noOpArr;
    exports.noOpObj = noOpObj5;
    exports.noPropArr = noPropArr2;
    exports.noPropObj = noPropObj;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isNonNegative-9959647c.js
var require_isNonNegative_9959647c = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/isNonNegative-9959647c.js"(exports) {
    "use strict";
    var isNum2 = require_isNum_c7164b50();
    var isNonNegative = (val) => isNum2.isNum(val) && val >= 0;
    exports.isNonNegative = isNonNegative;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/intersect-6fe7b944.js
var require_intersect_6fe7b944 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/intersect-6fe7b944.js"(exports) {
    "use strict";
    var validate = require_validate_23297ec2();
    var isArr7 = require_isArr_39234014();
    var isObj6 = require_isObj_6b3aa807();
    var isFunc4 = require_isFunc_f93803cb();
    var compareTo = require_compareTo_d69e4abf();
    var not = require_not_16fa9c85();
    var noOps = require_noOps_b5f3c7e4();
    var isNonNegative = require_isNonNegative_9959647c();
    var exists10 = require_exists_c79204b1();
    var buildElementCountMap = (arr) => {
      const counts = /* @__PURE__ */ new Map();
      for (let i = 0; i < arr.length; i++) {
        var _counts$get;
        const element = arr[i];
        const count = (_counts$get = counts.get(element)) !== null && _counts$get !== void 0 ? _counts$get : 0;
        counts.set(element, count + 1);
      }
      return counts;
    };
    var areCountMapsEqual = (mapA, mapB) => {
      if (mapA.size !== mapB.size)
        return false;
      for (let [key, count] of mapA) {
        const otherCount = mapB.get(key);
        if (otherCount !== count)
          return false;
      }
      return true;
    };
    var areFrequencyEqual = (arr, otherArr) => {
      const [valid] = validate.validate({
        arr,
        otherArr
      }, {
        $default: isArr7.isArr
      });
      if (!valid)
        return null;
      if (arr === otherArr)
        return true;
      if (arr.length !== otherArr.length)
        return false;
      const arrCounts = buildElementCountMap(arr);
      const otherCounts = buildElementCountMap(otherArr);
      return areCountMapsEqual(arrCounts, otherCounts);
    };
    var areSetEqual = (arr, otherArr) => {
      const [valid] = validate.validate({
        arr,
        otherArr
      }, {
        $default: isArr7.isArr
      });
      if (!valid)
        return null;
      if (arr === otherArr)
        return true;
      const [longest, shortest] = arr.length > otherArr.length ? [arr, otherArr] : [otherArr, arr];
      const arrSet = new Set(shortest);
      for (let i = 0; i < longest.length; i++) {
        const element = longest[i];
        if (!arrSet.has(element))
          return false;
      }
      return true;
    };
    var cloneArr = (arr) => Array.from([
      ...isArr7.isArr(arr) && arr || isObj6.isObj(arr) && Object.entries(arr) || []
    ]);
    var eitherArr7 = (a, b) => isArr7.isArr(a) ? a : b;
    var flatten = (arr, result, opts) => {
      for (let i = 0; i < arr.length; i++) {
        const value = arr[i];
        isArr7.isArr(value) ? flatten(value, result, opts) : opts.exists && !exists10.exists(value) || opts.truthy && !value ? result : result.push(value);
      }
      if (!opts.mutate)
        return result;
      Object.assign(arr, result).splice(result.length);
      return arr;
    };
    var flatArr = (arr, opts) => flatten(arr, [], isObj6.isObj(opts) ? opts : noOps.noOpObj);
    var flatMap = (arr, mapFn) => {
      const [inputIsValid] = validate.validate({
        arr,
        mapFn
      }, {
        arr: isArr7.isArr,
        mapFn: isFunc4.isFunc
      });
      if (!inputIsValid)
        return arr;
      return arr.reduce((finalArr, current) => {
        const result = mapFn(current);
        isArr7.isArr(result) ? result.map((el) => finalArr.push(el)) : finalArr.push(result);
        return finalArr;
      }, []);
    };
    var findExtrema = (arr, comparator) => {
      const [valid] = validate.validate({
        arr,
        comparator
      }, {
        arr: isArr7.isArr,
        $default: isFunc4.isFunc
      });
      if (!valid)
        return null;
      return arr.length ? arr.reduce((extremaSoFar, next) => comparator(extremaSoFar, next) > 0 ? extremaSoFar : next) : null;
    };
    var findMax = (arr = [], propSelector = not.identity) => findExtrema(arr, (x, y) => compareTo.compareTo(propSelector(x), propSelector(y)));
    var findMin = (arr = [], propSelector = not.identity) => findExtrema(arr, (x, y) => compareTo.compareTo(propSelector(y), propSelector(x)));
    var omitRange = (arr, startIndex, count) => {
      const [inputIsValid] = validate.validate({
        arr,
        startIndex,
        count
      }, {
        arr: isArr7.isArr,
        $default: isNonNegative.isNonNegative
      });
      if (!inputIsValid)
        return arr;
      const nextArr = [...arr];
      nextArr.splice(startIndex, count);
      return nextArr;
    };
    var randomArr = (arr, amount) => {
      if (!isArr7.isArr(arr))
        return arr;
      const useAmount = amount || 1;
      const randoms = [];
      for (let i = 0; i < useAmount; i++) {
        randoms.push(arr[Math.floor(Math.random() * arr.length)]);
      }
      return !amount ? randoms[0] : randoms;
    };
    var randomizeArr = (arr) => !isArr7.isArr(arr) && arr || arr.sort(() => 0.5 - Math.random());
    var uniqArrByReference = (arr) => {
      return !isArr7.isArr(arr) ? arr : arr.filter((e, i, arr2) => arr2.indexOf(e) == i);
    };
    var uniqArr = (arr, selector) => {
      if (!selector)
        return uniqArrByReference(arr);
      const {
        unique
      } = arr.reduce((data, element, index) => {
        const id = selector(element, index);
        !data.set.has(id) && data.unique.push(element);
        data.set.add(id);
        return data;
      }, {
        unique: [],
        set: /* @__PURE__ */ new Set()
      });
      return unique;
    };
    var flatUnion = (...args) => {
      const last = args.pop();
      const opts = {
        exists: true
      };
      const compare = isFunc4.isFunc(last) ? last : args.push(last) && void 0;
      return args.reduce((merged, arr) => {
        if (!isArr7.isArr(arr))
          return merged;
        return uniqArr(flatArr([...merged, ...arr], opts), compare);
      }, []);
    };
    var intersect = (arrA, arrB) => {
      if (!isArr7.isArr(arrA) || !isArr7.isArr(arrB))
        return [];
      const setB = new Set(arrB);
      return [...new Set(arrA)].filter((x) => setB.has(x));
    };
    exports.areCountMapsEqual = areCountMapsEqual;
    exports.areFrequencyEqual = areFrequencyEqual;
    exports.areSetEqual = areSetEqual;
    exports.buildElementCountMap = buildElementCountMap;
    exports.cloneArr = cloneArr;
    exports.eitherArr = eitherArr7;
    exports.findExtrema = findExtrema;
    exports.findMax = findMax;
    exports.findMin = findMin;
    exports.flatArr = flatArr;
    exports.flatMap = flatMap;
    exports.flatUnion = flatUnion;
    exports.intersect = intersect;
    exports.omitRange = omitRange;
    exports.randomArr = randomArr;
    exports.randomizeArr = randomizeArr;
    exports.uniqArr = uniqArr;
    exports.uniqArrByReference = uniqArrByReference;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/ensureArr-ae68c041.js
var require_ensureArr_ae68c041 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/ensureArr-ae68c041.js"(exports) {
    "use strict";
    var isArr7 = require_isArr_39234014();
    var ensureArr3 = (val) => isArr7.isArr(val) ? val : [val];
    exports.ensureArr = ensureArr3;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/softFalsy-3d7ead1c.js
var require_softFalsy_3d7ead1c = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/softFalsy-3d7ead1c.js"(exports) {
    "use strict";
    var softFalsy = (val) => Boolean(val || val === "" || val === 0);
    exports.softFalsy = softFalsy;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/set-c0a98b21.js
var require_set_c0a98b21 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/set-c0a98b21.js"(exports) {
    "use strict";
    var isFunc4 = require_isFunc_f93803cb();
    var isArr7 = require_isArr_39234014();
    var isColl = require_isColl_5757310a();
    var updateColl = (obj, path, type, val) => {
      const org = obj;
      if (!isColl.isColl(obj) || !obj || !path)
        return type !== "set" && val || void 0;
      const parts = isArr7.isArr(path) ? Array.from(path) : path.split(".");
      const key = parts.pop();
      let prop;
      let breakPath;
      while (prop = parts.shift()) {
        const next = obj[prop];
        isColl.isColl(next) || isFunc4.isFunc(next) ? obj = next : (() => {
          if (type === "set")
            obj[prop] = {};
          else
            breakPath = true;
          obj = obj[prop];
        })();
        if (breakPath)
          return val;
      }
      return type === "get" ? key in obj ? obj[key] : val : type === "unset" ? delete obj[key] : (obj[key] = val) && org || org;
    };
    var set = (obj, path, val) => {
      updateColl(obj, path, "set", val);
      return obj;
    };
    exports.set = set;
    exports.updateColl = updateColl;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/get-00626335.js
var require_get_00626335 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/get-00626335.js"(exports) {
    "use strict";
    var exists10 = require_exists_c79204b1();
    var isArr7 = require_isArr_39234014();
    var isStr8 = require_isStr_8a57710e();
    var get5 = (obj, path, fallback) => {
      const isPathArr = isArr7.isArr(path);
      if (!isStr8.isStr(path) && !isPathArr)
        return exists10.exists(fallback) ? fallback : void 0;
      const parts = isPathArr ? path : path.split(".");
      const result = parts.reduce((obj2, prop) => {
        const type = typeof obj2;
        if (!exists10.exists(obj2) || type !== "object" && type !== "function")
          return void 0;
        prop = prop.startsWith("[") ? prop.replace(/\D/g, "") : prop;
        return obj2[prop];
      }, obj);
      return exists10.exists(result) ? result : fallback;
    };
    exports.get = get5;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/deepClone-ae664a21.js
var require_deepClone_ae664a21 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/deepClone-ae664a21.js"(exports) {
    "use strict";
    var isFunc4 = require_isFunc_f93803cb();
    var get5 = require_get_00626335();
    var isArr7 = require_isArr_39234014();
    var cloneFunc = (func) => {
      const funcClone = function(...args) {
        return func instanceof funcClone ? (() => {
          return new func(...args);
        })() : get5.get(func.prototype, "constructor.name") ? new func(...args) : func.apply(func, args);
      };
      for (let key in func)
        func.hasOwnProperty(key) && (funcClone[key] = func[key]);
      Object.defineProperty(funcClone, "name", {
        value: func.name,
        configurable: true
      });
      funcClone.toString = () => func.toString();
      return funcClone;
    };
    var deepClone = (obj, hash = /* @__PURE__ */ new WeakMap()) => {
      if (Object(obj) !== obj)
        return obj;
      if (obj instanceof Set)
        return new Set(obj);
      if (hash.has(obj))
        return hash.get(obj);
      if (isArr7.isArr(obj))
        return obj.map((x) => deepClone(x));
      if (isFunc4.isFunc(obj))
        return cloneFunc(obj);
      const result = obj instanceof Date ? new Date(obj) : obj instanceof RegExp ? new RegExp(obj.source, obj.flags) : !obj.constructor ? /* @__PURE__ */ Object.create(null) : null;
      if (result === null)
        return cloneObjWithPrototypeAndProperties(obj);
      hash.set(obj, result);
      if (obj instanceof Map)
        return Array.from(obj, ([key, val]) => result.set(key, deepClone(val, hash)));
      return Object.assign(result, ...Object.keys(obj).map((key) => ({
        [key]: deepClone(obj[key], hash)
      })));
    };
    var cloneObjWithPrototypeAndProperties = (objectWithPrototype) => {
      if (!objectWithPrototype)
        return objectWithPrototype;
      const prototype = Object.getPrototypeOf(objectWithPrototype);
      const sourceDescriptors = Object.getOwnPropertyDescriptors(objectWithPrototype);
      for (const [key, descriptor] of Object.entries(sourceDescriptors)) {
        descriptor.value && (sourceDescriptors[key].value = deepClone(descriptor.value));
      }
      const clone = Object.create(prototype, sourceDescriptors);
      if (Object.isFrozen(objectWithPrototype))
        Object.freeze(clone);
      if (Object.isSealed(objectWithPrototype))
        Object.seal(clone);
      return clone;
    };
    exports.cloneFunc = cloneFunc;
    exports.cloneObjWithPrototypeAndProperties = cloneObjWithPrototypeAndProperties;
    exports.deepClone = deepClone;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/shallowEqual-eaf2262d.js
var require_shallowEqual_eaf2262d = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/shallowEqual-eaf2262d.js"(exports) {
    "use strict";
    var isObj6 = require_isObj_6b3aa807();
    var isColl = require_isColl_5757310a();
    var isFunc4 = require_isFunc_f93803cb();
    var isArr7 = require_isArr_39234014();
    var exists10 = require_exists_c79204b1();
    var validate = require_validate_23297ec2();
    var set = require_set_c0a98b21();
    var deepClone = require_deepClone_ae664a21();
    var isNum2 = require_isNum_c7164b50();
    var get5 = require_get_00626335();
    var isStr8 = require_isStr_8a57710e();
    var cleanColl = (coll, recursive = true) => {
      return isColl.isColl(coll) ? Object.keys(coll).reduce((cleaned, key) => {
        const value = coll[key];
        if (value === null || value === void 0)
          return cleaned;
        cleaned[key] = recursive && isColl.isColl(value) ? cleanColl(value) : value;
        return cleaned;
      }, isObj6.isObj(coll) && {} || []) : console.error(`cleanColl requires a collection as the first argument`) || coll;
    };
    var mapColl = (coll, cb) => isFunc4.isFunc(cb) && isColl.isColl(coll) ? Object.keys(coll).map((key) => cb(key, coll[key], coll)) : isArr7.isArr(coll) ? [] : {};
    var mapFindArr = (arr, mapper, testFunc) => {
      for (let i = 0; i < arr.length; i++) {
        const mappedValue = mapper(arr[i], i, i);
        if (testFunc(mappedValue, i, i))
          return mappedValue;
      }
      return null;
    };
    var mapFindObj = (obj, mapper, testFunc) => {
      let idx = 0;
      for (let key in obj) {
        if (!obj.hasOwnProperty(key))
          continue;
        const value = obj[key];
        const mappedValue = mapper(value, key, idx);
        if (testFunc(mappedValue, key, idx))
          return mappedValue;
        idx++;
      }
      return null;
    };
    var mapFind = (coll, mapper, testFunc = exists10.exists) => {
      const [valid] = validate.validate({
        coll,
        mapper,
        testFunc
      }, {
        coll: isColl.isColl,
        $default: isFunc4.isFunc
      });
      if (!valid)
        return void 0;
      return isObj6.isObj(coll) ? mapFindObj(coll, mapper, testFunc) : mapFindArr(coll, mapper, testFunc);
    };
    var reduceColl = (coll, cb, reduce) => isFunc4.isFunc(cb) && isColl.isColl(coll) ? Object.keys(coll).reduce((data, key) => cb(key, coll[key], coll, data), reduce) : isArr7.isArr(coll) ? [] : {};
    var unset = (obj, path) => {
      set.updateColl(obj, path, "unset");
      return obj;
    };
    var repeat = (element, times, cloneDeep = false) => {
      if (!times || times <= 0)
        return [];
      if (!isNum2.isNum(times)) {
        console.error("Times argument must be a number");
        return [];
      }
      const arr = [];
      for (let i = 0; i < times; i++) {
        const value = isFunc4.isFunc(element) ? element() : cloneDeep ? deepClone.deepClone(element) : element;
        arr.push(value);
      }
      return arr;
    };
    var shallowEqual = (col1, col2, path) => {
      if (path && (isArr7.isArr(path) || isStr8.isStr(path))) {
        col1 = get5.get(col1, path);
        col2 = get5.get(col2, path);
      }
      if (col1 === col2)
        return true;
      if (!col1 || !isColl.isColl(col1) || !col2 || !isColl.isColl(col2))
        return false;
      if (Object.keys(col1).length !== Object.keys(col2).length)
        return false;
      for (const key in col1)
        if (col1[key] !== col2[key])
          return false;
      return true;
    };
    exports.cleanColl = cleanColl;
    exports.mapColl = mapColl;
    exports.mapFind = mapFind;
    exports.reduceColl = reduceColl;
    exports.repeat = repeat;
    exports.shallowEqual = shallowEqual;
    exports.unset = unset;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/either-81805472.js
var require_either_81805472 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/either-81805472.js"(exports) {
    "use strict";
    var softFalsy = require_softFalsy_3d7ead1c();
    var isFunc4 = require_isFunc_f93803cb();
    var either = (val1, val2, check) => !isFunc4.isFunc(check) ? softFalsy.softFalsy(val1) && val1 || val2 : check(val1, val2) && val1 || val2;
    exports.either = either;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/toNum-eeb2e51e.js
var require_toNum_eeb2e51e = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/toNum-eeb2e51e.js"(exports) {
    "use strict";
    var isNum2 = require_isNum_c7164b50();
    var toStr3 = require_toStr_8e499966();
    var getNums = (val) => toStr3.toStr(val).replace(/([^.\d])/gm, "");
    var toNum = (val) => isNum2.isNum(val) ? val : val && !isNum2.equalsNaN(val) && Number(getNums(val)) || 0;
    exports.getNums = getNums;
    exports.toNum = toNum;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/strToType-00c4481f.js
var require_strToType_00c4481f = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/strToType-00c4481f.js"(exports) {
    "use strict";
    var isStr8 = require_isStr_8a57710e();
    var isNum2 = require_isNum_c7164b50();
    var toNum = require_toNum_eeb2e51e();
    var toBool = require_toBool_deb350e4();
    var strToType = (val) => {
      return !val || !isStr8.isStr(val) ? val : toBool.isStrBool(val) ? toBool.toBool(val) : isNum2.isNum(val) ? toNum.toNum(val) : (() => {
        try {
          return JSON.parse(val);
        } catch (e) {
          return val;
        }
      })();
    };
    exports.strToType = strToType;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/log-37bbfac6.js
var require_log_37bbfac6 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/log-37bbfac6.js"(exports) {
    "use strict";
    var SHOW_LOGS;
    var METH_DEF = "dir";
    var PREFIX = "type";
    var LOG_TYPES = ["error", "info", "log", "dir", "warn"];
    var setLogs = (log, methDef, prefix) => {
      SHOW_LOGS = log;
      METH_DEF = methDef || METH_DEF || "log";
      PREFIX = prefix || PREFIX || "type";
    };
    var resetLogs = () => {
      SHOW_LOGS = void 0;
      METH_DEF = "log";
      PREFIX = "type";
    };
    var logData = (...args) => {
      if (!args.length)
        return;
      let type = args.length === 1 ? METH_DEF : args.pop();
      if (!SHOW_LOGS && type !== "error")
        return;
      else if (typeof args[0] === "string") {
        if (PREFIX === "type")
          args[0] = `[ ${type.toUpperCase()} ] ${args[0]}`;
        else if (PREFIX)
          args[0] = `${PREFIX} ${args[0]}`;
      }
      LOG_TYPES.indexOf(type) !== -1 ? console[type](...args) : console[METH_DEF](...args, type);
    };
    exports.logData = logData;
    exports.resetLogs = resetLogs;
    exports.setLogs = setLogs;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/pipeline-e65bdaae.js
var require_pipeline_e65bdaae = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/pipeline-e65bdaae.js"(exports) {
    "use strict";
    var isArr7 = require_isArr_39234014();
    var isFunc4 = require_isFunc_f93803cb();
    var applyToFunc = (item, expression) => {
      if (isArr7.isArr(expression)) {
        const [func, ...args] = expression;
        return func(item, ...args);
      } else if (isFunc4.isFunc(expression)) {
        return expression(item);
      } else {
        console.error(`Pipeline expected either a function or an array (for function expressions). Found ${typeof expression}`);
        return item;
      }
    };
    var pipeline = (item, ...functions) => {
      return functions.reduce((result, fn) => applyToFunc(result, fn), item);
    };
    exports.applyToFunc = applyToFunc;
    exports.pipeline = pipeline;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/stackTracePaths-a7780a09.js
var require_stackTracePaths_a7780a09 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/stackTracePaths-a7780a09.js"(exports) {
    "use strict";
    var isFunc4 = require_isFunc_f93803cb();
    var validate = require_validate_23297ec2();
    var isNum2 = require_isNum_c7164b50();
    var jsonEqual = require_jsonEqual_7e69ef6a();
    var isArr7 = require_isArr_39234014();
    var deepClone = require_deepClone_ae664a21();
    var noOps = require_noOps_b5f3c7e4();
    var isStr8 = require_isStr_8a57710e();
    var isObj6 = require_isObj_6b3aa807();
    var isValidDate = require_isValidDate_813b9419();
    var checkCall3 = (method, ...params) => {
      return isFunc4.isFunc(method) ? method(...params) : void 0;
    };
    var complement = (predicate) => {
      const [valid] = validate.validate({
        predicate
      }, {
        predicate: isFunc4.isFunc
      });
      return valid ? (...args) => !predicate(...args) : null;
    };
    var eitherFunc = (func1, func2) => isFunc4.isFunc(func1) && func1 || func2;
    var debounce = (func, wait = 250, immediate = false) => {
      let timeout;
      function wrapFunc(...args) {
        if (!isFunc4.isFunc(func))
          return null;
        const context = this;
        const later = () => {
          timeout = null;
          !immediate && func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
          return isFunc4.isFunc(func) && func.apply(context, args);
      }
      return wrapFunc;
    };
    var doIt = (...args) => {
      const params = args.slice();
      const num = params.shift();
      const bindTo = params.shift();
      const cb = params.pop();
      if (!isNum2.isNum(num) || !isFunc4.isFunc(cb))
        return [];
      const doItAmount = new Array(num);
      const responses = [];
      for (let i = 0; i < doItAmount.length; i++) {
        const data = cb.call(bindTo, i, ...params);
        if (data === false)
          break;
        responses.push(data);
      }
      return responses;
    };
    var memorize = (func, getCacheKey, limit = 1) => {
      if (!isFunc4.isFunc(func) || getCacheKey && !isFunc4.isFunc(getCacheKey))
        return console.error("Error: Expected a function", func, getCacheKey);
      let memorized = function() {
        const cache = memorized.cache;
        const key = getCacheKey ? getCacheKey.apply(this, arguments) : arguments[0];
        if (jsonEqual.hasOwn(cache, key))
          return cache[key];
        const result = func.apply(this, arguments);
        isNum2.isNum(limit) && Object.keys(cache).length < limit ? cache[key] = result : memorized.cache = {
          [key]: result
        };
        return result;
      };
      memorized.cache = {};
      memorized.destroy = () => {
        getCacheKey = void 0;
        memorized.cache = void 0;
        memorized.destroy = void 0;
        memorized = void 0;
      };
      return memorized;
    };
    var runSeq = async (asyncFns = [], options = {}) => {
      const [valid] = validate.validate({
        asyncFns
      }, {
        asyncFns: isArr7.isArr
      });
      if (!valid)
        return [];
      const {
        cloneResults = false,
        returnOriginal = true
      } = options;
      const results = [];
      for (const fn of asyncFns) {
        const result = isFunc4.isFunc(fn) ? await fn(results.length, cloneResults ? deepClone.deepClone(results) : results) : returnOriginal ? fn : void 0;
        results.push(result);
      }
      return results;
    };
    var timedRun = async (fn, ...args) => {
      const [valid] = validate.validate({
        fn
      }, {
        fn: isFunc4.isFunc
      });
      if (!valid)
        return [void 0, -1];
      const startTime = /* @__PURE__ */ new Date();
      const result = await fn(...args);
      return [result, /* @__PURE__ */ new Date() - startTime];
    };
    var throttle = (func, wait = 100) => {
      let waiting = false;
      return function(...args) {
        if (waiting)
          return;
        waiting = true;
        func.apply(this, args);
        return setTimeout(() => {
          waiting = false;
        }, wait);
      };
    };
    var throttleLast = (func, cb, wait = 100) => {
      let throttleTimeout;
      if (isNum2.isNum(cb)) {
        wait = cb;
        cb = void 0;
      }
      return function(...args) {
        if (throttleTimeout)
          clearTimeout(throttleTimeout);
        throttleTimeout = setTimeout(() => {
          func.apply(this, args);
          clearTimeout(throttleTimeout);
        }, wait);
        typeof cb === "function" && cb();
      };
    };
    var limbo = (promise, asObject = false) => {
      return !promise || !isFunc4.isFunc(promise.then) ? [new Error(`A promise or thenable is required as the first argument!`), asObject ? noOps.emptyObj : void 0] : promise.then((data) => [null, data]).catch((err) => [err, asObject ? noOps.emptyObj : void 0]);
    };
    var limboify = (cb, ...args) => {
      return limbo(new Promise((res, rej) => cb(...args, (err, success) => err ? rej(err) : res(success || true))));
    };
    var uuid2 = (a) => a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid2);
    var noOp4 = () => {
    };
    var parseErrorMessage = (exception) => {
      return isStr8.isStr(exception) && !isValidDate.isEmpty(exception) ? exception : isObj6.isObj(exception) ? exception.message : null;
    };
    var defFilters = [`node:internal`, `node_modules/jest`];
    var stackTracePaths = (filter = defFilters) => {
      const orgPreStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = (_, stack2) => stack2;
      const stack = new Error().stack.slice(1);
      Error.prepareStackTrace = orgPreStackTrace;
      return stack.reduce((acc, cs) => {
        const loc = cs.getFileName();
        if (!loc)
          return acc;
        const ignore = isFunc4.isFunc(filter) ? filter(loc, cs, stack) : Boolean(filter.length && filter.find((filterLoc) => loc.includes(filterLoc)));
        !ignore && acc.push(loc);
        return acc;
      }, []);
    };
    exports.checkCall = checkCall3;
    exports.complement = complement;
    exports.debounce = debounce;
    exports.doIt = doIt;
    exports.eitherFunc = eitherFunc;
    exports.limbo = limbo;
    exports.limboify = limboify;
    exports.memorize = memorize;
    exports.noOp = noOp4;
    exports.parseErrorMessage = parseErrorMessage;
    exports.runSeq = runSeq;
    exports.stackTracePaths = stackTracePaths;
    exports.throttle = throttle;
    exports.throttleLast = throttleLast;
    exports.timedRun = timedRun;
    exports.uuid = uuid2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/mod-31dfe732.js
var require_mod_31dfe732 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/mod-31dfe732.js"(exports) {
    "use strict";
    var isNum2 = require_isNum_c7164b50();
    var toNum = require_toNum_eeb2e51e();
    var nth = (num) => {
      if (!isNum2.isNum(num)) {
        num = toNum.getNums(num);
        if (!num)
          return "";
        num = toNum.toNum(num);
        if (isNum2.equalsNaN(num))
          return "";
      }
      const mod2 = num % 100;
      if (mod2 >= 10 && mod2 <= 20)
        return "th";
      switch (num % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    var toFloat = (val) => val && !isNum2.equalsNaN(val) && parseFloat(isNum2.isNum(val) && val || toNum.getNums(val)) || 0;
    var toInt = (val) => val && !isNum2.equalsNaN(val) && parseInt(isNum2.isNum(val) && val || toNum.getNums(val)) || 0;
    var mod = (num, divisor) => {
      return (num % divisor + divisor) % divisor;
    };
    exports.mod = mod;
    exports.nth = nth;
    exports.toFloat = toFloat;
    exports.toInt = toInt;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/reduceObj-f41cbf8d.js
var require_reduceObj_f41cbf8d = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/reduceObj-f41cbf8d.js"(exports) {
    "use strict";
    var isFunc4 = require_isFunc_f93803cb();
    var isObj6 = require_isObj_6b3aa807();
    var reduceObj = (obj, cb, start = {}) => isObj6.isObj(obj) && isFunc4.isFunc(cb) && Object.entries(obj).reduce((data, [key, value]) => cb(key, value, data), start) || start;
    exports.reduceObj = reduceObj;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/sanitize-0a18302d.js
var require_sanitize_0a18302d = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/sanitize-0a18302d.js"(exports) {
    "use strict";
    var isStr8 = require_isStr_8a57710e();
    var sanitize2 = (str) => isStr8.isStr(str) && str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") || str;
    exports.sanitize = sanitize2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/transformKeys-574f796c.js
var require_transformKeys_574f796c = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/transformKeys-574f796c.js"(exports) {
    "use strict";
    var log = require_log_37bbfac6();
    var isObj6 = require_isObj_6b3aa807();
    var isFunc4 = require_isFunc_f93803cb();
    var deepClone = require_deepClone_ae664a21();
    var isArr7 = require_isArr_39234014();
    var isColl = require_isColl_5757310a();
    var set = require_set_c0a98b21();
    var jsonEqual = require_jsonEqual_7e69ef6a();
    var reduceObj = require_reduceObj_f41cbf8d();
    var sanitize2 = require_sanitize_0a18302d();
    var isStr8 = require_isStr_8a57710e();
    var strToType = require_strToType_00c4481f();
    var pipeline = require_pipeline_e65bdaae();
    var exists10 = require_exists_c79204b1();
    var toStr3 = require_toStr_8e499966();
    var ensureArr3 = require_ensureArr_ae68c041();
    var noOps = require_noOps_b5f3c7e4();
    var cloneJson = (obj) => {
      try {
        return JSON.parse(JSON.stringify(obj));
      } catch (e) {
        log.logData(e.message, "error");
        return null;
      }
    };
    var clearObj = (obj, filter) => {
      obj && Object.entries(obj).map(([key, value]) => {
        if (filter && filter.indexOf(key) !== -1)
          return;
        if (typeof value === "object")
          clearObj(value);
        obj[key] = void 0;
        delete obj[key];
      });
    };
    var eitherObj = (obj1, obj2) => isObj6.isObj(obj1) && obj1 || obj2;
    var deepMerge = (...sources) => {
      return sources.reduce((merged, source) => {
        const srcCopy = deepClone.deepClone(source);
        return isArr7.isArr(srcCopy) ? [...isArr7.isArr(merged) && merged || [], ...srcCopy] : isObj6.isObj(srcCopy) ? Object.entries(srcCopy).reduce((joined, [key, value]) => ({
          ...joined,
          [key]: isFunc4.isFunc(value) ? deepClone.cloneFunc(value) : isColl.isColl(value) && key in joined ? deepMerge(joined[key], value) : deepClone.deepClone(value)
        }), merged) : merged;
      }, isArr7.isArr(sources[0]) && [] || {});
    };
    var applyToCloneOf = (obj, mutatorCb) => {
      let error;
      if (!obj)
        error = "object (Argument 1) in applyToCloneOf, must be defined!";
      if (!isObj6.isObj(obj))
        error = "object (Argument 1) in applyToCloneOf, must be an object!";
      if (!mutatorCb)
        error = "mutator (Argument 2) in applyToCloneOf, must be defined!";
      if (!isFunc4.isFunc(mutatorCb))
        error = "mutator (Argument 2) arg in applyToCloneOf, must be a function!";
      if (error) {
        console.warn(error);
        return obj;
      }
      const clone = deepClone.deepClone(obj);
      mutatorCb(clone);
      return clone;
    };
    var mapEntries = (obj, cb) => {
      if (!isArr7.isArr(obj) && !isObj6.isObj(obj)) {
        console.error(obj, `Expected array or object for obj. Found ${typeof obj}`);
        return obj;
      }
      if (!isFunc4.isFunc(cb)) {
        console.error(`Expected function for cb. Found ${typeof cb}`);
        return obj;
      }
      const entries = Object.entries(obj);
      const initialValue = isArr7.isArr(obj) ? [] : {};
      return entries.reduce((obj2, [key, value]) => {
        const result = cb(key, value);
        if (!jsonEqual.isEntry(result)) {
          console.error(`Callback function must return entry. Found: ${result}. Using current entry instead.`);
          return set.set(obj2, key, value);
        }
        return set.set(obj2, result[0], result[1]);
      }, initialValue);
    };
    var mapKeys = (obj, keyMapper) => {
      if (!isObj6.isObj(obj) || !isFunc4.isFunc(keyMapper))
        return obj;
      return mapEntries(obj, (key, value) => [keyMapper(key), value]);
    };
    var mapObj = (obj, cb) => {
      if (!isObj6.isObj(obj))
        return [];
      const entries = Object.entries(obj);
      return isFunc4.isFunc(cb) ? entries.map(([key, value]) => cb(key, value)) : entries;
    };
    var omitKeys2 = (obj = {}, keys = []) => isObj6.isObj(obj) && reduceObj.reduceObj(obj, (key, _, updated) => {
      keys.indexOf(key) === -1 && (updated[key] = obj[key]);
      return updated;
    }, {}) || {};
    var pickKeys2 = (obj = {}, keys = []) => isObj6.isObj(obj) && keys.reduce((updated, key) => {
      key in obj && (updated[key] = obj[key]);
      return updated;
    }, {}) || {};
    var sanitizeCopy = (obj) => JSON.parse(sanitize2.sanitize(JSON.stringify(obj)));
    var trimStringFields = (object) => Object.entries(object).reduce((cleaned, [key, value]) => {
      cleaned[key] = isStr8.isStr(value) ? value.trim() : value;
      return cleaned;
    }, object);
    var toObj = (val, divider, split) => {
      if (isArr7.isArr(val))
        return Object.keys(val).reduce((obj, key) => {
          obj[key] = val[key];
          return obj;
        }, {});
      if (!isStr8.isStr(val))
        return {};
      divider = divider || "=";
      split = split || "&";
      return val.toString().split(split).reduce((obj, item) => {
        const sep = item.split(divider);
        obj[sep[0].trim()] = strToType.strToType(sep[1].trim());
        return obj;
      }, {});
    };
    var keyMap = (arr, toUpperCase) => isArr7.isArr(arr) && arr.reduce((obj, key) => {
      if (!isStr8.isStr(key))
        return obj;
      const use = toUpperCase && key.toUpperCase() || key;
      obj[use] = use;
      return obj;
    }, {}) || {};
    var everyEntry = (obj, predicate, logError = true) => {
      if (!isObj6.isObj(obj)) {
        logError && console.error(`First argument ${obj} must be an object.`);
        return false;
      }
      if (!isFunc4.isFunc(predicate)) {
        logError && console.error(`Second argument ${predicate}, must a function`);
        return false;
      }
      return pipeline.pipeline(obj, Object.entries, (entries) => entries.every(([key, value]) => predicate(key, value)));
    };
    var someEntry = (obj, predicate, logError = true) => {
      if (!isObj6.isObj(obj)) {
        logError && console.error(`First argument ${obj} must be an object.`);
        return false;
      }
      if (!isFunc4.isFunc(predicate)) {
        logError && console.error(`Second argument ${predicate}, must a function`);
        return false;
      }
      return pipeline.pipeline(obj, Object.entries, (entries) => entries.some(([key, value]) => predicate(key, value)));
    };
    var filterObj = (obj, predicate, logError = true) => {
      if (!isObj6.isObj(obj)) {
        logError && console.error(`First argument ${obj} must be an object.`);
        return obj;
      }
      if (!isFunc4.isFunc(predicate)) {
        logError && console.error(`Second argument ${predicate}, must a function`);
        return obj;
      }
      return reduceObj.reduceObj(obj, (key, value, data) => {
        if (predicate(key, value))
          data[key] = value;
        return data;
      }, {});
    };
    var pad = (hash, len) => {
      while (hash.length < len)
        hash = "0" + hash;
      return hash;
    };
    var fold = (hash, text) => {
      if (text.length === 0)
        return hash;
      let i;
      let chr;
      let len;
      for (i = 0, len = text.length; i < len; i++) {
        chr = text.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
      }
      return hash < 0 ? hash * -2 : hash;
    };
    var foldObject = (hash, obj, seen) => {
      const foldKey = (hash2, key) => foldValue(hash2, obj[key], key, seen);
      return Object.keys(obj).sort().reduce(foldKey, hash);
    };
    var foldValue = (input, value, key, seen) => {
      const hash = fold(fold(fold(input, key), toString(value)), typeof value);
      if (value === null)
        return fold(hash, "null");
      if (value === void 0)
        return fold(hash, "undefined");
      if (typeof value === "object" || typeof value === "function") {
        if (seen.indexOf(value) !== -1)
          return fold(hash, "[Circular]" + key);
        seen.push(value);
        const objHash = foldObject(hash, value, seen);
        if (!("valueOf" in value) || typeof value.valueOf !== "function")
          ;
        try {
          return fold(objHash, String(value.valueOf()));
        } catch (err) {
          return fold(objHash, "[valueOf exception]" + (err.stack || err.message));
        }
      }
      return fold(hash, value.toString());
    };
    var toString = (obj) => Object.prototype.toString.call(obj);
    var hashObj = (obj) => pad(foldValue(0, obj, "", []).toString(16), 8);
    var splitByKeys = (obj = {}, keys) => {
      if (!keys)
        return [{}, {
          ...obj
        }];
      const intersect = [{}, {}];
      const compareKeys = ensureArr3.ensureArr(keys);
      return isObj6.isObj(obj) ? reduceObj.reduceObj(obj, (key, _, updated) => {
        exists10.exists(compareKeys.find((k) => exists10.exists(k) && toStr3.toStr(k) === key)) ? updated[0][key] = obj[key] : updated[1][key] = obj[key];
        return updated;
      }, intersect) : intersect;
    };
    var transformKeys = (obj = noOps.emptyObj, keyMap2 = noOps.emptyObj, opts = noOps.emptyObj) => {
      const {
        strict = false
      } = opts;
      return Object.entries(obj).reduce((acc, [key, value]) => {
        const ref = keyMap2[key] || (!strict ? key : void 0);
        ref && (acc[ref] = value);
        return acc;
      }, {});
    };
    exports.applyToCloneOf = applyToCloneOf;
    exports.clearObj = clearObj;
    exports.cloneJson = cloneJson;
    exports.deepMerge = deepMerge;
    exports.eitherObj = eitherObj;
    exports.everyEntry = everyEntry;
    exports.filterObj = filterObj;
    exports.hashObj = hashObj;
    exports.keyMap = keyMap;
    exports.mapEntries = mapEntries;
    exports.mapKeys = mapKeys;
    exports.mapObj = mapObj;
    exports.omitKeys = omitKeys2;
    exports.pickKeys = pickKeys2;
    exports.sanitizeCopy = sanitizeCopy;
    exports.someEntry = someEntry;
    exports.splitByKeys = splitByKeys;
    exports.toObj = toObj;
    exports.transformKeys = transformKeys;
    exports.trimStringFields = trimStringFields;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/wait-8ca88995.js
var require_wait_8ca88995 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/wait-8ca88995.js"(exports) {
    "use strict";
    var isObj6 = require_isObj_6b3aa807();
    var isFunc4 = require_isFunc_f93803cb();
    var promisify = (method) => {
      if (!isFunc4.isFunc(method))
        throw `Argument must be a function`;
      return (...args) => {
        return new Promise((res, rej) => {
          if (!isFunc4.isFunc(args[args.length - 1]))
            return res(method(...args));
          args.pop();
          args.push((...cbData) => {
            return cbData && cbData[0] ? rej(...cbData) : res(...cbData);
          });
          return method(...args);
        });
      };
    };
    var defObjProps = Array.from(["caller", "callee", "arguments", "apply", "bind", "call", "toString", "__proto__", "__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "isPrototypeOf", "propertyIsEnumerable", "valueOf", "toLocaleString"]).concat(Object.getOwnPropertyNames(Object.prototype)).reduce((map, functionName) => {
      map[functionName] = true;
      return map;
    }, {});
    var addAsync = (object) => {
      if (!object.__IS_PROMISIFIED__) {
        for (const prop of Object.getOwnPropertyNames(object)) {
          const isAsync = prop.indexOf("Async") !== -1 || object[`${prop}Async`];
          if (isAsync || defObjProps[prop])
            continue;
          if (isFunc4.isFunc(object[prop]))
            object[`${prop}Async`] = promisify(object[prop]);
          else {
            const getValue = Object.getOwnPropertyDescriptor(object, prop).get;
            if (isFunc4.isFunc(getValue))
              object[`${prop}Async`] = promisify(getValue);
          }
        }
        object.__IS_PROMISIFIED__ = true;
      }
      return object;
    };
    var promisifyAll = (object) => {
      if (!isObj6.isObj(object))
        return object;
      addAsync(object);
      const proto = Object.getPrototypeOf(object);
      proto && Object.getPrototypeOf(proto) !== null && addAsync(proto);
      return object;
    };
    var wait = (time) => new Promise((res) => setTimeout(() => res(true), time));
    exports.promisify = promisify;
    exports.promisifyAll = promisifyAll;
    exports.wait = wait;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/joinRegex-5320d139.js
var require_joinRegex_5320d139 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/joinRegex-5320d139.js"(exports) {
    "use strict";
    var isStr8 = require_isStr_8a57710e();
    var isArr7 = require_isArr_39234014();
    require_validate_23297ec2();
    require_noOps_b5f3c7e4();
    var not = require_not_16fa9c85();
    var getRegexSource = (maybeRx) => not.isRegex(maybeRx) ? maybeRx.source : isStr8.isStr(maybeRx) ? maybeRx : null;
    var parseArgs = (args) => {
      if (isArr7.isArr(args[0]))
        return [args[0], args[1]];
      const last = args[args.length - 1];
      const options = isStr8.isStr(last) ? last : void 0;
      const expressions = options ? args.splice(0, args.length - 1) : args;
      return [expressions, options];
    };
    var joinRegex4 = (...args) => {
      const [expressions, options] = parseArgs(args);
      const source = expressions.reduce((joined, next) => {
        const nextSource = getRegexSource(next);
        return !nextSource ? joined : joined === "" ? nextSource : `${joined}|${nextSource}`;
      }, "");
      return new RegExp(`(${source})`, options);
    };
    exports.getRegexSource = getRegexSource;
    exports.joinRegex = joinRegex4;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/getWordEndingAt-63d038a5.js
var require_getWordEndingAt_63d038a5 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/getWordEndingAt-63d038a5.js"(exports) {
    "use strict";
    var isStr8 = require_isStr_8a57710e();
    var isFunc4 = require_isFunc_f93803cb();
    var isQuoted2 = require_isQuoted_eb6994da();
    var toStr$1 = require_toStr_8e499966();
    var isNonNegative = require_isNonNegative_9959647c();
    var isArr7 = require_isArr_39234014();
    var isColl = require_isColl_5757310a();
    var get5 = require_get_00626335();
    var buildPath = (...args) => {
      const built = args.reduce((path, arg) => {
        let str = toStr(arg);
        return `${path}${str && "/" + str || ""}`;
      }, "");
      return built.replace(/([^:\/]|^)\/{2,}/g, "$1/");
    };
    var mapString = (str, charMapper) => {
      if (!isStr8.isStr(str))
        return str;
      if (!isFunc4.isFunc(charMapper))
        return str;
      let result = "";
      for (const char of str) {
        result += charMapper(char);
      }
      return result;
    };
    var delimitString = (str, delimiter, delimiters = ["-", "_", " "]) => {
      if (!isStr8.isStr(str))
        return str;
      const isDelimiter = (c) => delimiters.some((del) => del === c);
      let prevChar = "_";
      return mapString(str, (char) => {
        if (isDelimiter(char)) {
          prevChar = delimiter;
          return delimiter;
        }
        if (isQuoted2.isUpperCase(char) && isQuoted2.isLowerCase(prevChar) && !isDelimiter(prevChar)) {
          prevChar = char;
          return delimiter + char;
        }
        prevChar = char;
        return char;
      });
    };
    var snakeCase = (str) => {
      const underscored = delimitString(str, "_");
      return underscored.toLowerCase();
    };
    var capitalize7 = (str, lowercaseTail = true) => {
      if (!isStr8.isStr(str) || !str[0])
        return str;
      const tail = lowercaseTail ? str.slice(1).toLowerCase() : str.slice(1);
      return `${str[0].toUpperCase()}${tail}`;
    };
    var removeDot = (string) => {
      const noDot = string.indexOf(".") === 0 ? string.slice(1) : string;
      return noDot.indexOf(".") === noDot.length - 1 ? noDot.slice(0, -1) : noDot;
    };
    var cleanStr = (str) => {
      return str && removeDot(str).replace(/[-_]/gm, " ") || str;
    };
    var camelCase = (str, compCase) => {
      return str && cleanStr(str).split(/[\s_-]/gm).reduce((cased, word, index) => {
        if (!word)
          return cased;
        cased += (index > 0 || compCase) && capitalize7(word) || word.toLowerCase();
        return cased;
      }, "") || str;
    };
    var camelCasePath = (path) => {
      const split = path.split(".");
      const camelCasedSplit = split.map((str, idx) => idx > 0 ? capitalize7(str, false) : str);
      return camelCasedSplit.length > 1 ? camelCasedSplit.join("") : path;
    };
    var containsStr = (str, substring, fromIndex2) => {
      str = !isStr8.isStr(str) && toStr$1.toStr(str) || str;
      substring = !isStr8.isStr(substring) && toStr$1.toStr(substring) || substring;
      return str.indexOf(substring, fromIndex2) !== -1;
    };
    var eitherStr = (str1, str2) => isStr8.isStr(str1) && str1 || str2;
    var uppercasePattern = /[A-Z]/g;
    var msPattern = /^ms-/;
    var hyphenCache = {};
    var toHyphenLower = (match) => "-" + match.toLowerCase();
    var hyphenator = (rule) => {
      if (hyphenCache.hasOwnProperty(rule))
        return hyphenCache[rule];
      const hRule = rule.replace(uppercasePattern, toHyphenLower);
      return hyphenCache[rule] = msPattern.test(hRule) ? "-" + hRule : hRule;
    };
    var hashString2 = (str, maxLength) => {
      if (!isStr8.isStr(str) || str.length == 0)
        return 0;
      str = str.split("").reverse().join("");
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = `${Math.abs(hash & hash)}`;
      }
      return isNonNegative.isNonNegative(maxLength) ? hash.slice(0, maxLength) : hash;
    };
    var parseJSON = (str, logErr = true) => {
      try {
        return JSON.parse(str);
      } catch (e) {
        logErr && console.error(e.message);
        return null;
      }
    };
    var plural = (str) => {
      if (!str || !str.length)
        return str;
      return str[str.length - 1] !== "s" ? str + "s" : str;
    };
    var singular = (str) => {
      if (!str || !str.length)
        return str;
      return str[str.length - 1] === "s" ? str.slice(0, str.length - 1) : str;
    };
    var styleCase = (str) => {
      if (!isStr8.isStr(str))
        return str;
      const cased = camelCase(str);
      return `${cased[0].toLowerCase()}${cased.slice(1)}`;
    };
    var trainCase = (str) => isStr8.isStr(str) && str.split(/(?=[A-Z])|[\s_-]/gm).join("-").toLowerCase() || str;
    var wordCaps = (str) => {
      if (!isStr8.isStr(str))
        return str;
      let cleaned = cleanStr(str);
      return cleaned.split(" ").map((word) => word && capitalize7(word) || "").join(" ");
    };
    var spaceJoin = (original, toAdd) => {
      toAdd = isArr7.isArr(toAdd) ? toAdd : [toAdd];
      return toAdd.reduce((joined, item) => {
        return isStr8.isStr(item) ? `${joined ? joined + " " : ""}${item}`.trim() : joined;
      }, isStr8.isStr(original) ? original : "");
    };
    var templateRx = (tempStr, data, fallback = "", rx) => {
      const orgRx = template.regex;
      template.regex = rx || /{{([^}]*)}}/g;
      const resp = template(tempStr, data, fallback);
      template.regex = orgRx;
      return resp;
    };
    var template = (tempStr, data, fallback = "") => {
      data = isColl.isColl(data) && data || {};
      const regex = template.regex || /\${(.*?)\}/g;
      return isStr8.isStr(tempStr) ? tempStr.replace(regex, (match, exact) => {
        const path = (exact || match.substr(2, match.length - 3)).trim();
        const replaceWith = get5.get(data, path, fallback);
        return isFunc4.isFunc(replaceWith) ? replaceWith(data, path, fallback) : replaceWith;
      }) : console.error(`template requires a string as the first argument`) || tempStr;
    };
    var validFilename = (fileName) => {
      if (!fileName)
        return false;
      const regex = /[<>:"/\\|?*\u0000-\u001F]/g;
      const windowsRegex = /^(con|prn|aux|nul|com\d|lpt\d)$/i;
      const periodRegex = /^\.\.?$/;
      return regex.test(fileName) || windowsRegex.test(fileName) || periodRegex.test(fileName) ? false : true;
    };
    var reverseStr = (str) => {
      if (!isStr8.isStr(str))
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
    var getWordEndingAt2 = (text, index, delimiters = [" "]) => {
      const reversed = reverseStr(text);
      const reversedIndex = text.length - index;
      return reverseStr(getWordStartingAt(reversed, reversedIndex, delimiters));
    };
    exports.buildPath = buildPath;
    exports.camelCase = camelCase;
    exports.camelCasePath = camelCasePath;
    exports.capitalize = capitalize7;
    exports.cleanStr = cleanStr;
    exports.containsStr = containsStr;
    exports.delimitString = delimitString;
    exports.eitherStr = eitherStr;
    exports.getNearestDelimiterIndex = getNearestDelimiterIndex;
    exports.getWordEndingAt = getWordEndingAt2;
    exports.getWordStartingAt = getWordStartingAt;
    exports.hashString = hashString2;
    exports.hyphenator = hyphenator;
    exports.mapString = mapString;
    exports.parseJSON = parseJSON;
    exports.plural = plural;
    exports.removeDot = removeDot;
    exports.reverseStr = reverseStr;
    exports.singular = singular;
    exports.snakeCase = snakeCase;
    exports.spaceJoin = spaceJoin;
    exports.styleCase = styleCase;
    exports.template = template;
    exports.templateRx = templateRx;
    exports.trainCase = trainCase;
    exports.validFilename = validFilename;
    exports.wordCaps = wordCaps;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/getURLParam-201ef5fe.js
var require_getURLParam_201ef5fe = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/getURLParam-201ef5fe.js"(exports) {
    "use strict";
    var reduceObj = require_reduceObj_f41cbf8d();
    var isStr8 = require_isStr_8a57710e();
    var isNum2 = require_isNum_c7164b50();
    var isBool2 = require_isBool_aa6af74e();
    var isColl = require_isColl_5757310a();
    var isArr7 = require_isArr_39234014();
    var validate = require_validate_23297ec2();
    var queryToObj = (string) => {
      const currentQueryItems = {};
      const stringSplit = string.split("?");
      const querystring = stringSplit[stringSplit.length - 1];
      if (!querystring)
        return currentQueryItems;
      const split = querystring.split("&");
      split.length && split.map((item) => {
        const components = item.split("=");
        if (components.length <= 1)
          return currentQueryItems;
        const itemSplit = [components.shift(), components.join("=")];
        if (itemSplit.length === 2) {
          const array = decodeURIComponent(itemSplit[1]).split(",");
          if (array && array.length > 1)
            currentQueryItems[itemSplit[0]] = array;
          else if (itemSplit[0] in currentQueryItems) {
            const val = currentQueryItems[itemSplit[0]];
            currentQueryItems[itemSplit[0]] = isArr7.isArr(val) ? val.push(decodeURIComponent(itemSplit[1])) : [val, decodeURIComponent(itemSplit[1])];
          } else
            currentQueryItems[itemSplit[0]] = decodeURIComponent(itemSplit[1]);
        }
      });
      return currentQueryItems;
    };
    var objToQuery = (obj) => {
      let firstSet;
      return reduceObj.reduceObj(obj, (key, value, urlStr) => {
        if (!value)
          return urlStr;
        const useVal = isStr8.isStr(value) || isNum2.isNum(value) || isBool2.isBool(value) ? value : isColl.isColl(value) ? isArr7.isArr(value) ? value.join(",") : JSON.stringify(value) : null;
        if (!useVal)
          return urlStr;
        urlStr = !firstSet ? `?${encodeURIComponent(key)}=${encodeURIComponent(useVal)}` : `${urlStr}&${encodeURIComponent(key)}=${encodeURIComponent(useVal)}`;
        firstSet = true;
        return urlStr;
      }, "");
    };
    var getURLParam = (paramKey) => {
      var _doc$location, _queryToObj$paramKey, _queryToObj;
      const [valid] = validate.validate({
        paramKey
      }, {
        paramKey: isStr8.isStr
      });
      if (!valid)
        return null;
      const doc = typeof document !== "undefined" ? document : null;
      const search = doc === null || doc === void 0 ? void 0 : (_doc$location = doc.location) === null || _doc$location === void 0 ? void 0 : _doc$location.search;
      return isStr8.isStr(search) ? (_queryToObj$paramKey = (_queryToObj = queryToObj(search)) === null || _queryToObj === void 0 ? void 0 : _queryToObj[paramKey]) !== null && _queryToObj$paramKey !== void 0 ? _queryToObj$paramKey : null : null;
    };
    exports.getURLParam = getURLParam;
    exports.objToQuery = objToQuery;
    exports.queryToObj = queryToObj;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.6.1/node_modules/@keg-hub/jsutils/build/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var intersect = require_intersect_6fe7b944();
    var ensureArr3 = require_ensureArr_ae68c041();
    var isArr7 = require_isArr_39234014();
    var isBool2 = require_isBool_aa6af74e();
    var toBool = require_toBool_deb350e4();
    var softFalsy = require_softFalsy_3d7ead1c();
    var shallowEqual = require_shallowEqual_eaf2262d();
    var get5 = require_get_00626335();
    var isColl = require_isColl_5757310a();
    var deepEqual = require_deepEqual_adba847a();
    var set = require_set_c0a98b21();
    var deepClone = require_deepClone_ae664a21();
    var not = require_not_16fa9c85();
    var either = require_either_81805472();
    var noOps = require_noOps_b5f3c7e4();
    var isValidDate = require_isValidDate_813b9419();
    var strToType = require_strToType_00c4481f();
    var exists10 = require_exists_c79204b1();
    var log = require_log_37bbfac6();
    var pipeline = require_pipeline_e65bdaae();
    var stackTracePaths = require_stackTracePaths_a7780a09();
    var compareTo = require_compareTo_d69e4abf();
    var isFunc4 = require_isFunc_f93803cb();
    var isNonNegative = require_isNonNegative_9959647c();
    var isInt = require_isInt_94ce4199();
    var isNum2 = require_isNum_c7164b50();
    var toNum = require_toNum_eeb2e51e();
    var mod = require_mod_31dfe732();
    var transformKeys = require_transformKeys_574f796c();
    var jsonEqual = require_jsonEqual_7e69ef6a();
    var isObj6 = require_isObj_6b3aa807();
    var reduceObj = require_reduceObj_f41cbf8d();
    var wait = require_wait_8ca88995();
    var joinRegex4 = require_joinRegex_5320d139();
    var getWordEndingAt2 = require_getWordEndingAt_63d038a5();
    var isQuoted2 = require_isQuoted_eb6994da();
    var isStr8 = require_isStr_8a57710e();
    var sanitize2 = require_sanitize_0a18302d();
    var toStr3 = require_toStr_8e499966();
    var validate = require_validate_23297ec2();
    var getURLParam = require_getURLParam_201ef5fe();
    var isValidUrl = require_isValidUrl_a77135f0();
    var formatCls = (classes) => classes.filter((item) => typeof item === "string" && Boolean(item)).join(` `).trim();
    var cls = (...classGroup) => {
      return formatCls(classGroup.map((classes) => {
        return Array.isArray(classes) ? cls(...classes) : typeof classes !== `object` ? formatCls([classes]) : formatCls(Object.entries(classes).map(([item, val]) => {
          return typeof val === "boolean" ? val && formatCls([item]) : cls(val);
        }));
      }));
    };
    exports.areCountMapsEqual = intersect.areCountMapsEqual;
    exports.areFrequencyEqual = intersect.areFrequencyEqual;
    exports.areSetEqual = intersect.areSetEqual;
    exports.buildElementCountMap = intersect.buildElementCountMap;
    exports.cloneArr = intersect.cloneArr;
    exports.eitherArr = intersect.eitherArr;
    exports.findExtrema = intersect.findExtrema;
    exports.findMax = intersect.findMax;
    exports.findMin = intersect.findMin;
    exports.flatArr = intersect.flatArr;
    exports.flatMap = intersect.flatMap;
    exports.flatUnion = intersect.flatUnion;
    exports.intersect = intersect.intersect;
    exports.omitRange = intersect.omitRange;
    exports.randomArr = intersect.randomArr;
    exports.randomizeArr = intersect.randomizeArr;
    exports.uniqArr = intersect.uniqArr;
    exports.uniqArrByReference = intersect.uniqArrByReference;
    exports.ensureArr = ensureArr3.ensureArr;
    exports.isArr = isArr7.isArr;
    exports.isBool = isBool2.isBool;
    exports.convertToStrBool = toBool.convertToStrBool;
    exports.isStrBool = toBool.isStrBool;
    exports.toBool = toBool.toBool;
    exports.softFalsy = softFalsy.softFalsy;
    exports.cleanColl = shallowEqual.cleanColl;
    exports.mapColl = shallowEqual.mapColl;
    exports.mapFind = shallowEqual.mapFind;
    exports.reduceColl = shallowEqual.reduceColl;
    exports.repeat = shallowEqual.repeat;
    exports.shallowEqual = shallowEqual.shallowEqual;
    exports.unset = shallowEqual.unset;
    exports.get = get5.get;
    exports.isColl = isColl.isColl;
    exports.deepEqual = deepEqual.deepEqual;
    exports.isEmptyColl = deepEqual.isEmptyColl;
    exports.set = set.set;
    exports.cloneFunc = deepClone.cloneFunc;
    exports.cloneObjWithPrototypeAndProperties = deepClone.cloneObjWithPrototypeAndProperties;
    exports.deepClone = deepClone.deepClone;
    exports.hasDomAccess = not.hasDomAccess;
    exports.identity = not.identity;
    exports.isDom = not.hasDomAccess;
    exports.isOrderable = not.isOrderable;
    exports.isRegex = not.isRegex;
    exports.match = not.match;
    exports.not = not.not;
    exports.either = either.either;
    exports.deepFreeze = noOps.deepFreeze;
    exports.emptyArr = noOps.emptyArr;
    exports.emptyObj = noOps.emptyObj;
    exports.noOpArr = noOps.noOpArr;
    exports.noOpObj = noOps.noOpObj;
    exports.noPropArr = noOps.noPropArr;
    exports.noPropObj = noOps.noPropObj;
    exports.isEmpty = isValidDate.isEmpty;
    exports.isSame = isValidDate.isSame;
    exports.isValidDate = isValidDate.isValidDate;
    exports.typeOf = isValidDate.typeOf;
    exports.strToType = strToType.strToType;
    exports.exists = exists10.exists;
    exports.logData = log.logData;
    exports.resetLogs = log.resetLogs;
    exports.setLogs = log.setLogs;
    exports.applyToFunc = pipeline.applyToFunc;
    exports.pipeline = pipeline.pipeline;
    exports.checkCall = stackTracePaths.checkCall;
    exports.complement = stackTracePaths.complement;
    exports.debounce = stackTracePaths.debounce;
    exports.doIt = stackTracePaths.doIt;
    exports.eitherFunc = stackTracePaths.eitherFunc;
    exports.ife = stackTracePaths.checkCall;
    exports.iife = stackTracePaths.checkCall;
    exports.limbo = stackTracePaths.limbo;
    exports.limboify = stackTracePaths.limboify;
    exports.memorize = stackTracePaths.memorize;
    exports.noOp = stackTracePaths.noOp;
    exports.parseErrorMessage = stackTracePaths.parseErrorMessage;
    exports.runSeq = stackTracePaths.runSeq;
    exports.stackTracePaths = stackTracePaths.stackTracePaths;
    exports.throttle = stackTracePaths.throttle;
    exports.throttleLast = stackTracePaths.throttleLast;
    exports.timedRun = stackTracePaths.timedRun;
    exports.uuid = stackTracePaths.uuid;
    exports.compareTo = compareTo.compareTo;
    exports.isFunc = isFunc4.isFunc;
    exports.isNonNegative = isNonNegative.isNonNegative;
    exports.isFloat = isInt.isFloat;
    exports.isInt = isInt.isInt;
    exports.isNegative = isInt.isNegative;
    exports.isPositive = isInt.isPositive;
    exports.equalsNaN = isNum2.equalsNaN;
    exports.isNum = isNum2.isNum;
    exports.getNums = toNum.getNums;
    exports.toNum = toNum.toNum;
    exports.mod = mod.mod;
    exports.nth = mod.nth;
    exports.toFloat = mod.toFloat;
    exports.toInt = mod.toInt;
    exports.applyToCloneOf = transformKeys.applyToCloneOf;
    exports.clearObj = transformKeys.clearObj;
    exports.cloneJson = transformKeys.cloneJson;
    exports.deepMerge = transformKeys.deepMerge;
    exports.eitherObj = transformKeys.eitherObj;
    exports.everyEntry = transformKeys.everyEntry;
    exports.filterObj = transformKeys.filterObj;
    exports.hashObj = transformKeys.hashObj;
    exports.keyMap = transformKeys.keyMap;
    exports.mapEntries = transformKeys.mapEntries;
    exports.mapKeys = transformKeys.mapKeys;
    exports.mapObj = transformKeys.mapObj;
    exports.omitKeys = transformKeys.omitKeys;
    exports.pickKeys = transformKeys.pickKeys;
    exports.sanitizeCopy = transformKeys.sanitizeCopy;
    exports.someEntry = transformKeys.someEntry;
    exports.splitByKeys = transformKeys.splitByKeys;
    exports.toObj = transformKeys.toObj;
    exports.transformKeys = transformKeys.transformKeys;
    exports.trimStringFields = transformKeys.trimStringFields;
    exports.hasOwn = jsonEqual.hasOwn;
    exports.isArrMap = jsonEqual.isArrMap;
    exports.isEntry = jsonEqual.isEntry;
    exports.jsonEqual = jsonEqual.jsonEqual;
    exports.isObj = isObj6.isObj;
    exports.reduceObj = reduceObj.reduceObj;
    exports.promisify = wait.promisify;
    exports.promisifyAll = wait.promisifyAll;
    exports.wait = wait.wait;
    exports.getRegexSource = joinRegex4.getRegexSource;
    exports.joinRegex = joinRegex4.joinRegex;
    exports.buildPath = getWordEndingAt2.buildPath;
    exports.camelCase = getWordEndingAt2.camelCase;
    exports.camelCasePath = getWordEndingAt2.camelCasePath;
    exports.capitalize = getWordEndingAt2.capitalize;
    exports.cleanStr = getWordEndingAt2.cleanStr;
    exports.containsStr = getWordEndingAt2.containsStr;
    exports.delimitString = getWordEndingAt2.delimitString;
    exports.eitherStr = getWordEndingAt2.eitherStr;
    exports.getNearestDelimiterIndex = getWordEndingAt2.getNearestDelimiterIndex;
    exports.getWordEndingAt = getWordEndingAt2.getWordEndingAt;
    exports.getWordStartingAt = getWordEndingAt2.getWordStartingAt;
    exports.hashString = getWordEndingAt2.hashString;
    exports.hyphenator = getWordEndingAt2.hyphenator;
    exports.mapString = getWordEndingAt2.mapString;
    exports.parseJSON = getWordEndingAt2.parseJSON;
    exports.plural = getWordEndingAt2.plural;
    exports.removeDot = getWordEndingAt2.removeDot;
    exports.reverseStr = getWordEndingAt2.reverseStr;
    exports.singular = getWordEndingAt2.singular;
    exports.snakeCase = getWordEndingAt2.snakeCase;
    exports.spaceJoin = getWordEndingAt2.spaceJoin;
    exports.styleCase = getWordEndingAt2.styleCase;
    exports.template = getWordEndingAt2.template;
    exports.templateRx = getWordEndingAt2.templateRx;
    exports.trainCase = getWordEndingAt2.trainCase;
    exports.validFilename = getWordEndingAt2.validFilename;
    exports.wordCaps = getWordEndingAt2.wordCaps;
    exports.isEmail = isQuoted2.isEmail;
    exports.isIp = isQuoted2.isIp;
    exports.isIp4 = isQuoted2.isIp4;
    exports.isIp6 = isQuoted2.isIp6;
    exports.isLowerCase = isQuoted2.isLowerCase;
    exports.isPhone = isQuoted2.isPhone;
    exports.isQuoted = isQuoted2.isQuoted;
    exports.isUpperCase = isQuoted2.isUpperCase;
    exports.isUrl = isQuoted2.isUrl;
    exports.isUuid = isQuoted2.isUuid;
    exports.isStr = isStr8.isStr;
    exports.sanitize = sanitize2.sanitize;
    exports.toStr = toStr3.toStr;
    exports.validate = validate.validate;
    exports.getURLParam = getURLParam.getURLParam;
    exports.objToQuery = getURLParam.objToQuery;
    exports.queryToObj = getURLParam.queryToObj;
    exports.isValidUrl = isValidUrl.isValidUrl;
    exports.cls = cls;
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  EAstObject: () => EAstObject,
  EBlockLoc: () => EBlockLoc,
  EExpParmKind: () => EExpParmKind,
  EExpParmType: () => EExpParmType,
  EFeatureTypes: () => EFeatureTypes,
  EHookType: () => EHookType,
  EPartMatchTypes: () => EPartMatchTypes,
  EResultAction: () => EResultAction,
  EResultStatus: () => EResultStatus,
  EResultType: () => EResultType,
  EStepKey: () => EStepKey,
  EStepMethodType: () => EStepMethodType,
  EStepType: () => EStepType,
  EStepVariant: () => EStepVariant,
  ETestType: () => ETestType,
  PKInstance: () => PKInstance,
  Parkin: () => Parkin
});
module.exports = __toCommonJS(src_exports);

// src/types/parkin.types.ts
var EPartMatchTypes = /* @__PURE__ */ ((EPartMatchTypes2) => {
  EPartMatchTypes2["other"] = `other`;
  EPartMatchTypes2["optional"] = `optional`;
  EPartMatchTypes2["alternate"] = `alternate`;
  EPartMatchTypes2["parameter"] = `parameter`;
  return EPartMatchTypes2;
})(EPartMatchTypes || {});

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
var EStepMethodType = /* @__PURE__ */ ((EStepMethodType2) => {
  EStepMethodType2["Given"] = `Given`;
  EStepMethodType2["When"] = `When`;
  EStepMethodType2["Then"] = `Then`;
  EStepMethodType2["And"] = `And`;
  EStepMethodType2["But"] = `But`;
  EStepMethodType2["*"] = `*`;
  return EStepMethodType2;
})(EStepMethodType || {});
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
var EFeatureTypes = /* @__PURE__ */ ((EFeatureTypes2) => {
  EFeatureTypes2["feature"] = `Feature`;
  EFeatureTypes2["Feature"] = `Feature`;
  EFeatureTypes2["FEATURE"] = `Feature`;
  EFeatureTypes2["rule"] = `Rule`;
  EFeatureTypes2["Rule"] = `Rule`;
  EFeatureTypes2["background"] = `Background`;
  EFeatureTypes2["Background"] = `Background`;
  EFeatureTypes2["BACKGROUND"] = `Background`;
  EFeatureTypes2["scenario"] = `Scenario`;
  EFeatureTypes2["Scenario"] = `Scenario`;
  EFeatureTypes2["SCENARIO"] = `Scenario`;
  EFeatureTypes2["example"] = `Example`;
  EFeatureTypes2["Example"] = `Example`;
  EFeatureTypes2["EXAMPLE"] = `Example`;
  EFeatureTypes2["step"] = `Step`;
  EFeatureTypes2["Step"] = `Step`;
  EFeatureTypes2["RULE"] = `Rule`;
  EFeatureTypes2["STEP"] = `Step`;
  return EFeatureTypes2;
})(EFeatureTypes || {});

// src/types/test.types.ts
var EResultAction = /* @__PURE__ */ ((EResultAction2) => {
  EResultAction2["test"] = `test`;
  EResultAction2["skipped"] = `skipped`;
  EResultAction2["start"] = `start`;
  EResultAction2["end"] = `end`;
  EResultAction2["abort"] = `abort`;
  EResultAction2["error"] = `error`;
  return EResultAction2;
})(EResultAction || {});
var EResultStatus = /* @__PURE__ */ ((EResultStatus2) => {
  EResultStatus2["skipped"] = `skipped`;
  EResultStatus2["passed"] = `passed`;
  EResultStatus2["failed"] = `failed`;
  EResultStatus2["warning"] = `warning`;
  return EResultStatus2;
})(EResultStatus || {});
var EResultType = /* @__PURE__ */ ((EResultType2) => {
  EResultType2["it"] = `it`;
  EResultType2["xit"] = `xit`;
  EResultType2["root"] = `root`;
  EResultType2["test"] = `test`;
  EResultType2["xtest"] = `xtest`;
  EResultType2["describe"] = `describe`;
  EResultType2["xdescribe"] = `xdescribe`;
  return EResultType2;
})(EResultType || {});
var ETestType = /* @__PURE__ */ ((ETestType2) => {
  ETestType2["it"] = `it`;
  ETestType2["itx"] = `itx`;
  ETestType2["test"] = `test`;
  ETestType2["testx"] = `testx`;
  ETestType2["describe"] = `describe`;
  ETestType2["describex"] = `describex`;
  ETestType2["beforeAll"] = `beforeAll`;
  ETestType2["afterAll"] = `afterAll`;
  ETestType2["beforeEach"] = `beforeEach`;
  ETestType2["afterEach"] = `afterEach`;
  return ETestType2;
})(ETestType || {});

// src/types/steps.types.ts
var EStepVariant = /* @__PURE__ */ ((EStepVariant2) => {
  EStepVariant2["regex"] = "regex";
  EStepVariant2["expression"] = "expression";
  return EStepVariant2;
})(EStepVariant || {});
var EStepKey = /* @__PURE__ */ ((EStepKey2) => {
  EStepKey2["given"] = `given`;
  EStepKey2["when"] = `when`;
  EStepKey2["then"] = `then`;
  EStepKey2["and"] = `and`;
  EStepKey2["but"] = `but`;
  EStepKey2["Given"] = `given`;
  EStepKey2["When"] = `when`;
  EStepKey2["Then"] = `then`;
  EStepKey2["And"] = `and`;
  EStepKey2["But"] = `but`;
  return EStepKey2;
})(EStepKey || {});
var EExpParmKind = /* @__PURE__ */ ((EExpParmKind2) => {
  EExpParmKind2["url"] = `url`;
  EExpParmKind2["text"] = `text`;
  EExpParmKind2["alias"] = `alias`;
  EExpParmKind2["pairs"] = `pairs`;
  EExpParmKind2["group"] = `group`;
  EExpParmKind2["number"] = `number`;
  EExpParmKind2["element"] = `element`;
  EExpParmKind2["selector"] = `selector`;
  return EExpParmKind2;
})(EExpParmKind || {});
var EExpParmType = /* @__PURE__ */ ((EExpParmType2) => {
  EExpParmType2["any"] = `any`;
  EExpParmType2["int"] = `int`;
  EExpParmType2["word"] = `word`;
  EExpParmType2["array"] = `array`;
  EExpParmType2["float"] = `float`;
  EExpParmType2["string"] = `string`;
  EExpParmType2["number"] = `number`;
  EExpParmType2["object"] = `object`;
  return EExpParmType2;
})(EExpParmType || {});

// src/types/assemble.types.ts
var EBlockLoc = /* @__PURE__ */ ((EBlockLoc2) => {
  EBlockLoc2["after"] = `after`;
  EBlockLoc2["before"] = `before`;
  return EBlockLoc2;
})(EBlockLoc || {});

// src/constants.ts
var import_jsutils = __toESM(require_cjs());
var ignoreTypes = [
  `*`,
  ``
];
var constants = (0, import_jsutils.deepFreeze)({
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
var import_jsutils2 = __toESM(require_cjs());
var cleanDefMatch = (match) => {
  let name = match.toString();
  name[0] === "/" && (name = name.substring(1));
  name[0] === "^" && (name = name.substring(1));
  name.charAt(name.length - 1) === "/" && (name = name.slice(0, -1));
  name.charAt(name.length - 1) === "$" && (name = name.slice(0, -1));
  return name;
};
var strToId = (str, prefix = ``, postfix = ``) => {
  return `${prefix}${(0, import_jsutils2.hashString)(cleanDefMatch(str))}${postfix}`;
};
var getRXMatch = (line, regex, index) => {
  const matching = line.match(regex)[index];
  return matching ? matching.trim() : ` `;
};
var sanitize = (def) => {
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
var includePartType = (type, opts = import_jsutils2.emptyObj, include, exclude) => {
  const { include: oInclude, exclude: oExclude } = opts;
  const inArr = include || (Boolean(oInclude == null ? void 0 : oInclude.length) ? oInclude : void 0);
  const exArr = exclude || (Boolean(oExclude == null ? void 0 : oExclude.length) ? oExclude : void 0);
  return !inArr && !exArr ? true : !inArr ? !exArr.includes(type) : inArr.includes(type);
};

// src/matcher/paramTypes.ts
var import_jsutils5 = __toESM(require_cjs());

// src/matcher/patterns.ts
var import_jsutils3 = __toESM(require_cjs());
var RX_OPTIONAL = /\w*\([^)]*?\)/;
var RX_ALT = /\s*\S*\/\S*\s*/;
var RX_PARAMETER = /\s*{(.*?)}\s*/;
var RX_EXPRESSION = (0, import_jsutils3.joinRegex)(RX_PARAMETER, RX_OPTIONAL, "g");
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
var import_jsutils4 = __toESM(require_cjs());
var resolveErrMsg = (error, maybe) => {
  var _a;
  return (0, import_jsutils4.isStr)(error) ? [error, maybe] : [(_a = error || maybe) == null ? void 0 : _a.message, error || maybe];
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
    const opts = err && message !== (err == null ? void 0 : err.message) ? { cause: err == null ? void 0 : err.message } : void 0;
    super(message, opts);
    this.results = (err == null ? void 0 : err.results) || [];
    this.testResults = (err == null ? void 0 : err.testResults) || [];
    if ((err == null ? void 0 : err.result) && !this.results.includes(err.result))
      this.results.push(err.result);
    Error.stackTraceLimit = stackTraceLimit;
    this.name = this.constructor.name;
    if (replaceStack) {
      if (err == null ? void 0 : err.stack)
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
var mergeRegex = import_jsutils5.joinRegex;
var checkWorldValue = (func, type) => {
  return (arg, $world, worldReplace2) => {
    const hasWorldVal = arg.match(RX_WORLD);
    const hasAliasVal = arg.match(RX_ALIAS);
    if (worldReplace2 === false && (hasWorldVal || hasAliasVal))
      return removeQuotes(arg);
    if (!(0, import_jsutils5.isObj)($world) || !hasWorldVal && !hasAliasVal)
      return matchType(func(arg, $world, worldReplace2), type);
    const worldVal = hasWorldVal ? (0, import_jsutils5.get)($world, removeQuotes(arg).replace(`${WORLD_KEY}.`, "")) : (0, import_jsutils5.get)(
      $world,
      removeQuotes(arg).replace(`${ALIAS_REF}`, `${ALIAS_WORLD_KEY}.`)
    );
    return (0, import_jsutils5.exists)(worldVal) ? matchType(worldVal, type) : hasWorldVal ? throwMissingWorldValue(arg) : matchType(func(arg, $world), type);
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
      return !(0, import_jsutils5.isQuoted)(arg) ? (0, import_jsutils5.toStr)(arg) : void 0;
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
      return (0, import_jsutils5.equalsNaN)(result) ? void 0 : result;
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
      return (0, import_jsutils5.equalsNaN)(result) || arg.includes(`.`) ? void 0 : result;
    }, `number`)
  },
  string: {
    ...typeModel,
    name: `string`,
    regex: mergeRegex(RX_DOUBLE_QUOTED, RX_SINGLE_QUOTED),
    partial: mergeRegex(RX_DOUBLE_QUOTED, RX_SINGLE_QUOTED, /{string}/),
    transformer: checkWorldValue((arg) => {
      return (0, import_jsutils5.isQuoted)(arg) ? removeQuotes(arg) : void 0;
    }, typeModel.type)
  }
};
var getParamTypes = () => __paramTypes;
var registerParamType = (model = import_jsutils5.noOpObj, key = model.name) => {
  if (__paramTypes[key])
    return throwParamTypeExists(key);
  __paramTypes[key] = { ...typeModel, ...model };
  __paramTypes[key].transformer = checkWorldValue(
    __paramTypes[key].transformer,
    __paramTypes[key].type
  );
  return __paramTypes;
};
var convertTypes = (matches, transformers, $world, worldReplace2) => {
  return matches.map((item, i) => {
    const paramType = transformers[i] || __paramTypes.any;
    return (0, import_jsutils5.checkCall)(paramType.transformer, item, $world, worldReplace2);
  }).filter(import_jsutils5.exists);
};

// src/matcher/regex.ts
var import_jsutils6 = __toESM(require_cjs());
var matchRegex = (definition, text) => {
  const match = text.match(new RegExp(definition.match));
  return match ? { definition, match: match.slice(1, match.length).filter(Boolean) } : import_jsutils6.emptyObj;
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
  const precedingWord = (0, import_jsutils6.getWordEndingAt)(text, matchArr.index);
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
  return (0, import_jsutils6.isStr)(refEx) ? refEx : refEx.source;
};
var getAlternateRegex = (value) => {
  return `(${value.trim().replace(/\//g, "|")})`;
};
var getMatchRegex = (type, matchArr, opts) => {
  const [val, paramType] = matchArr;
  switch (type) {
    case "parameter" /* parameter */:
      return new RegExp(getParamRegex(paramType, opts == null ? void 0 : opts.partial));
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
var getRegexParts = (defMatcher, opts = import_jsutils6.emptyObj) => {
  const { include, exclude } = opts;
  const inArr = Boolean(include == null ? void 0 : include.length) ? include : void 0;
  const exArr = Boolean(exclude == null ? void 0 : exclude.length) ? exclude : void 0;
  const parameters = includePartType("parameter" /* parameter */, opts, inArr, exArr) ? [...defMatcher.matchAll(new RegExp(RX_PARAMETER, "gi"))].map((match) => parseMatch(match, "parameter" /* parameter */, opts)) : import_jsutils6.emptyArr;
  const optionals = includePartType("optional" /* optional */, opts, inArr, exArr) ? [...defMatcher.matchAll(new RegExp(RX_OPTIONAL, "gi"))].map((match) => parseMatch(match, "optional" /* optional */, opts)) : import_jsutils6.emptyArr;
  const alts = includePartType("alternate" /* alternate */, opts, inArr, exArr) ? [...defMatcher.matchAll(new RegExp(RX_ALT, "gi"))].map((match) => parseMatch(match, "alternate" /* alternate */, opts)) : import_jsutils6.emptyArr;
  const sortedExpressions = [...parameters, ...optionals, ...alts].sort((matchA, matchB) => matchA.index - matchB.index);
  return sortedExpressions;
};

// src/matcher/tokens.ts
var import_jsutils7 = __toESM(require_cjs());
var tokenRegex = (0, import_jsutils7.joinRegex)(
  RX_INT,
  RX_FLOAT,
  RX_ALT,
  RX_OPTIONAL,
  RX_PARAMETER,
  RX_DOUBLE_QUOTED,
  RX_SINGLE_QUOTED,
  "g"
);
var tokenizeStep = (step, def, opts = import_jsutils7.emptyObj) => {
  const parts = getRegexParts(def.match, opts);
  const tokens = [];
  let idx = 0;
  let match;
  while ((match = tokenRegex.exec(step)) !== null) {
    const part = parts[idx];
    if (!part)
      continue;
    const [val] = match;
    if (!includePartType(part.type, opts))
      continue;
    const trimmed = val.trimStart();
    const diff = val.length - trimmed.length;
    tokens.push({
      match: val.trim(),
      defIndex: part == null ? void 0 : part.index,
      index: match.index + diff,
      type: (part == null ? void 0 : part.paramType) || (part == null ? void 0 : part.type) || "other" /* other */
    });
    idx++;
  }
  return tokens;
};

// src/matcher/matcher.ts
var import_jsutils10 = __toESM(require_cjs());

// src/utils/globalScope.ts
var import_jsutils8 = __toESM(require_cjs());
var hasWindow = Boolean(typeof window !== "undefined");
var hasGlobal = Boolean(typeof globalThis !== "undefined");
var hasModule = Boolean(typeof module === "object");
var hasRequire = Boolean(typeof require === "function");
var hasJasmine = Boolean(
  hasGlobal && typeof globalThis.jasmine !== "undefined"
);
var resolveJasmine = () => hasJasmine ? (0, import_jsutils8.checkCall)(() => globalThis.jasmine) : { getEnv: () => import_jsutils8.noOpObj, testPath: `` };
var resolveModule = () => hasModule ? (0, import_jsutils8.checkCall)(() => module) : { exports: {} };
var resolveRequire = () => hasRequire ? (0, import_jsutils8.checkCall)(() => require) : import_jsutils8.noOp;
var resolveGlobalObj = () => {
  try {
    return hasWindow ? (0, import_jsutils8.checkCall)(() => window) : hasGlobal ? (0, import_jsutils8.checkCall)(() => globalThis) : import_jsutils8.noOpObj;
  } catch (err) {
    return import_jsutils8.noOpObj;
  }
};

// src/matcher/expression.ts
var import_jsutils9 = __toESM(require_cjs());
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
    const match = args[0].trim();
    const newIdx = idx + (regexStr.length - matchLength);
    const [startSl, ...endSl] = regexStr.slice(newIdx).split(match);
    const startStr = regexStr.slice(0, newIdx);
    const replace = (0, import_jsutils9.isFunc)(replaceWith) ? replaceWith.apply(null, args) : replaceWith;
    regexStr = `${startStr}${startSl}${replace}${endSl.join(match)}`;
  });
  return regexStr;
};
var convertToRegex = (match, opts = import_jsutils9.emptyObj) => {
  let parameter;
  let optional;
  const paramTypes = getParamTypes();
  const transformers = [];
  const regex = runRegexCheck(
    match,
    RX_EXPRESSION,
    (val, ...args) => {
      const type = val.trim().replace(RX_MATCH_REPLACE, "");
      parameter = val.match(RX_PARAMETER);
      optional = val.match(RX_OPTIONAL);
      parameter && transformers.push(paramTypes[type] || paramTypes.any);
      return parameter ? getParamRegex(type, opts == null ? void 0 : opts.partial) : optional ? toAlternateRegex(val) : val;
    }
  );
  return {
    regex,
    optional,
    parameter,
    transformers
  };
};
var checkAlternative = (match) => {
  const altIndexes = [];
  const regex = runRegexCheck(
    match,
    new RegExp(RX_ALT, "g"),
    // Use a non-capture group to allow matching, but don't include in the results (?:)
    getAlternateRegex
  );
  return { regex, altIndexes };
};
var checkAnchors = (str) => {
  let final = str;
  if (!str.startsWith("^"))
    final = "^" + final;
  if (!str.endsWith("$"))
    final += "$";
  return { regex: final };
};
var extractParameters = (text, stepMatcher, wordMatches, opts = import_jsutils9.emptyObj) => {
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
      const match = isWord ? wordMatch : partMatch;
      if (!match)
        return state;
      part.type === "parameter" /* parameter */ && match && params.push(match[0]);
      return {
        params,
        // increment text index so that we don't reevaluate the same text in future iterations
        textIndex: textIndex + (match && match.index + match[0].length),
        // increment match index so we don't repeat a word in future iterations
        wordMatchIndex: wordMatchIndex + (isWord && 1)
      };
    },
    { params: [], textIndex: 0, wordMatchIndex: 0 }
  );
  return opts.partial || expectedParamLength === result.params.length ? result.params : null;
};
var findAsRegex = (definition, text, opts = import_jsutils9.emptyObj) => {
  const escaped = escapeStr(definition.match);
  const { regex: regexAlts } = checkAlternative(escaped);
  const {
    optional,
    transformers,
    regex: regexConverted
  } = convertToRegex(regexAlts, opts);
  const { regex: regexAnchors } = checkAnchors(regexConverted);
  const found = matchRegex(
    { ...definition, match: regexAnchors },
    text
  );
  return {
    found,
    escaped,
    optional,
    regexAlts,
    transformers,
    regexAnchors,
    regexConverted
  };
};
var matchExpression = (definition, text, $world, opts = import_jsutils9.emptyObj) => {
  if (definition.match === text)
    return { definition, match: [] };
  const {
    found,
    optional,
    transformers
  } = findAsRegex(definition, text, opts);
  if (!found || !found.definition || !found.match && !optional)
    return import_jsutils9.emptyObj;
  const params = extractParameters(
    text,
    definition.match,
    found.match,
    opts
  );
  if (!(params == null ? void 0 : params.length))
    return { definition, match: [] };
  const converted = convertTypes(params, transformers, $world, opts.worldReplace);
  return converted.length !== params.length ? import_jsutils9.emptyObj : { definition, match: converted };
};

// src/matcher/matcher.ts
var { REGEX_VARIANT } = constants;
var Matcher = class {
  parkin;
  options = import_jsutils10.emptyObj;
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
    var _a, _b, _c, _d;
    const defs = definitions || ((_c = (_b = (_a = this.parkin) == null ? void 0 : _a.steps) == null ? void 0 : _b.list) == null ? void 0 : _c.call(_b)) || import_jsutils10.emptyArr;
    const world = $world || ((_d = this == null ? void 0 : this.parkin) == null ? void 0 : _d.world) || { $alias: {} };
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
  expression = (def, text, $world, opts = import_jsutils10.emptyObj) => {
    var _a;
    return matchExpression(
      def,
      text,
      $world || ((_a = this == null ? void 0 : this.parkin) == null ? void 0 : _a.world),
      opts || this.options
    );
  };
  stepTokens = (step, def, opts) => tokenizeStep(
    step,
    def,
    opts || this.options
  );
  expressionFind = (def, text, opts = import_jsutils10.emptyObj) => findAsRegex(
    def,
    text,
    opts || this.options
  );
  regex = matchRegex;
  types = getParamTypes;
  register = registerParamType;
};
var matcher = (definitions, text, $world, opts = import_jsutils10.emptyObj) => {
  if (!text.trim())
    return import_jsutils10.emptyObj;
  const defLength = definitions.length;
  for (let idx = 0; idx < defLength; idx++) {
    const definition = definitions[idx];
    if (!definition.match)
      continue;
    const found = definition.variant !== REGEX_VARIANT ? matchExpression(definition, text, $world, opts) : matchRegex(definition, text);
    if (found.match)
      return found;
  }
  return import_jsutils10.emptyObj;
};

// src/utils/worldReplace.ts
var import_jsutils11 = __toESM(require_cjs());
var {
  ALIAS_REF: ALIAS_REF2,
  WORLD_REF,
  ALIAS_WORLD_KEY: ALIAS_WORLD_KEY2,
  WORLD_AT_RUNTIME,
  ALIAS_REF_AT_RUNTIME
} = constants;
var attemptReplace = (match, world, location) => {
  const replaceWith = (0, import_jsutils11.get)(world, location);
  return (0, import_jsutils11.isFunc)(replaceWith) ? replaceWith(world, location) : (0, import_jsutils11.exists)(replaceWith) ? replaceWith : match;
};
var aliasReplace = (text, world) => {
  let currentMatch;
  try {
    return text.replace(RX_ALIAS_MATCH, (match) => {
      currentMatch = match;
      const cleaned = match.trim();
      const replaced = cleaned.indexOf(ALIAS_REF_AT_RUNTIME) === 0 ? cleaned.replace(ALIAS_REF_AT_RUNTIME, `$${ALIAS_REF2}`) : attemptReplace(
        match,
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
    return text.replace(RX_WORLD_MATCH, (match) => {
      currentMatch = match;
      const cleaned = match.trim();
      return cleaned.indexOf(WORLD_AT_RUNTIME) === 0 ? cleaned.replace(WORLD_AT_RUNTIME, WORLD_REF) : attemptReplace(match, world, cleaned.replace(RX_WORLD_REPLACE, ""));
    });
  } catch (err) {
    throwWorldReplace(err, currentMatch);
  }
};
var replaceWorld = (text, world, replace) => {
  return replace === false ? (text || "").toString() : worldReplace(aliasReplace(text, world), world);
};

// src/steps.ts
var import_jsutils14 = __toESM(require_cjs());

// src/definitions/joinAllDefs.ts
var joinAllDefs = (instance) => {
  return instance.types.reduce(
    (stepDefs, type) => stepDefs.concat(instance[`_${type}`]),
    []
  );
};

// src/definitions/registerFromCall.ts
var import_jsutils12 = __toESM(require_cjs());
var { REGEX_VARIANT: REGEX_VARIANT2, EXPRESSION_VARIANT } = constants;
var getContent = (def) => {
  const match = def.variant === REGEX_VARIANT2 ? def.match.toString() : `"${def.match}"`;
  return `${(0, import_jsutils12.capitalize)(def.type)}(${match}, ${def.method.toString()})`;
};
var stringToRegex = (str) => {
  const main = str.match(/\/(.+)\/.*/)[1];
  const options = str.match(/\/.+\/(.*)/)[1];
  return new RegExp(main, options);
};
var registerFromCall = function(internalType, type, match, method, meta = import_jsutils12.noOpObj) {
  const variant = match.toString().indexOf("/") === 0 ? REGEX_VARIANT2 : EXPRESSION_VARIANT;
  const formattedMatch = variant === REGEX_VARIANT2 ? stringToRegex(match.toString()) : match.toString();
  const definition = {
    type,
    meta,
    method,
    variant,
    tokens: [],
    match: formattedMatch
  };
  definition.name = sanitize(definition);
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
var import_jsutils13 = __toESM(require_cjs());
var registerFromParse = function(definitions) {
  const DEF_TYPES = this.types.map((type) => (0, import_jsutils13.capitalize)(type));
  const container = DEF_TYPES.reduce((built, type) => {
    built[type] = [];
    return built;
  }, {});
  (0, import_jsutils13.eitherArr)(definitions, [definitions]).map((definition) => {
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
      this[(0, import_jsutils14.capitalize)(type)] = (match, method, meta) => {
        return self.register(internalType, type, match, method, meta);
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
      replaceWorld(text, this._world, options == null ? void 0 : options.worldReplace),
      this._world,
      options
    );
    if (!found.match || !found.definition)
      return false;
    const extObj = { step, world: this._world };
    (step == null ? void 0 : step.doc) && (extObj.doc = step == null ? void 0 : step.doc);
    (step == null ? void 0 : step.table) && (extObj.table = step == null ? void 0 : step.table);
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
    return (0, import_jsutils14.isStr)(args[0]) ? registerFromCall.apply(this, args) : registerFromParse.apply(this, args);
  };
  add = (...defs) => {
    const definitions = this.list();
    defs.forEach((def) => {
      const defsObj = (0, import_jsutils14.isArr)(def) || (def == null ? void 0 : def.match) && (def == null ? void 0 : def.uuid) ? (0, import_jsutils14.ensureArr)(def) : def;
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
var import_jsutils15 = __toESM(require_cjs());
var { HOOK_TYPES } = constants;
var Hooks = class {
  afterAll = import_jsutils15.noOp;
  beforeAll = import_jsutils15.noOp;
  afterEach = import_jsutils15.noOp;
  beforeEach = import_jsutils15.noOp;
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
        if (!(0, import_jsutils15.isFunc)(clientHookFn))
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
    const foundHooks = this.types.includes(type) ? this._registeredHooks[type] || import_jsutils15.noPropArr : throwInvalidHookType(HOOK_TYPES.join(", "), type);
    if (!foundHooks)
      return;
    return foundHooks.length ? async () => {
      return foundHooks.reduce(async (toResolve, hook) => {
        await toResolve;
        return await hook(this.instance);
      }, Promise.resolve());
    } : import_jsutils15.noOp;
  };
};

// src/utils/hasTag.ts
var import_jsutils16 = __toESM(require_cjs());
var parseTags = (tags) => {
  const parsed = (0, import_jsutils16.isStr)(tags) ? tags.match(/([@](\w|-)*)/g) : (0, import_jsutils16.isArr)(tags) ? tags : import_jsutils16.emptyArr;
  return parsed.filter((tag) => (0, import_jsutils16.isStr)(tag) && tag.startsWith(`@`) && tag.length > 2);
};
var hasTag = (itemTags = import_jsutils16.emptyArr, compareTags = import_jsutils16.emptyArr) => {
  const iTags = (0, import_jsutils16.isStr)(itemTags) ? parseTags(itemTags) : (0, import_jsutils16.eitherArr)(itemTags, []);
  const cTags = (0, import_jsutils16.isStr)(compareTags) ? parseTags(compareTags) : (0, import_jsutils16.eitherArr)(compareTags, []);
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
  var _a;
  let step = {
    type,
    index,
    step: stepText,
    whitespace: getStartWhiteSpace(line),
    uuid: idFromIdx({
      type,
      parent,
      index: ((_a = parent == null ? void 0 : parent.steps) == null ? void 0 : _a.length) || 0
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

// src/parse/parseFeature.ts
var import_jsutils20 = __toESM(require_cjs());

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
  var _a;
  const type = "rule" /* rule */;
  const loc = ((_a = feature == null ? void 0 : feature.rules) == null ? void 0 : _a.length) || 0;
  return {
    type,
    rule,
    index,
    scenarios: [],
    ...rule && feature && { uuid: idFromIdx({ index: loc, type, parent: feature }) }
  };
};
var ensureRule = (feature, rule, line, index) => {
  var _a;
  if (!RX_RULE2.test(line))
    return rule;
  let ruleText = getRXMatch(line, RX_RULE2, 1);
  !rule.rule ? rule.rule = ruleText : rule = ruleFactory(ruleText, feature, index);
  !rule.index && (rule.index = index);
  !rule.uuid && (rule.uuid = idFromIdx({
    parent: feature,
    type: rule.type,
    index: ((_a = feature == null ? void 0 : feature.rules) == null ? void 0 : _a.length) || 0
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
  var _a, _b;
  const hasFeature = Boolean(feature.feature || RX_HAS_FEATURE.test(content));
  if (!hasFeature || ((_a = feature == null ? void 0 : feature.errors) == null ? void 0 : _a.length)) {
    !((_b = feature == null ? void 0 : feature.errors) == null ? void 0 : _b.length) && parseError(feature, "feature" /* feature */, index, `Could not find Feature text in file`);
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
var import_jsutils17 = __toESM(require_cjs());
var RX_SCENARIO2 = /^\s*Scenario:(.*)$/;
var RX_EXAMPLE2 = /^\s*Example:(.*)$/;
var scenarioFactory = (scenario, parent, index) => {
  var _a;
  const type = "scenario" /* scenario */;
  const loc = ((_a = parent == null ? void 0 : parent.scenarios) == null ? void 0 : _a.length) || 0;
  return {
    type,
    index,
    scenario,
    steps: [],
    ...scenario && parent && { uuid: idFromIdx({ index: loc, type, parent }) }
  };
};
var ensureScenario = (feature, rule, scenario, line, index) => {
  var _a;
  const hasScenario = RX_SCENARIO2.test(line);
  const hasExample = RX_EXAMPLE2.test(line);
  if (!hasScenario && !hasExample)
    return scenario;
  const scenarioText = hasScenario ? getRXMatch(line, RX_SCENARIO2, 1) : getRXMatch(line, RX_EXAMPLE2, 1);
  !(0, import_jsutils17.exists)(scenario.scenario) ? scenario.scenario = scenarioText : scenario = scenarioFactory(scenarioText, void 0, index);
  !scenario.index && (scenario.index = index);
  scenario.whitespace = getStartWhiteSpace(line);
  if (!hasScenario)
    scenario.alias = "Example" /* Example */;
  const parent = rule.uuid && scenario.whitespace > rule.whitespace ? rule : feature;
  !scenario.uuid && (scenario.uuid = idFromIdx({
    parent,
    type: scenario.type,
    index: ((_a = parent == null ? void 0 : parent.scenarios) == null ? void 0 : _a.length) || 0
  }));
  !parent.scenarios.includes(scenario) && parent.scenarios.push(scenario);
  return scenario;
};

// src/parse/ensureBackground.ts
var import_jsutils18 = __toESM(require_cjs());
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
  const parent = (rule == null ? void 0 : rule.uuid) ? rule : feature;
  const backgroundText = (0, import_jsutils18.isStr)(existingBgText) ? existingBgText.trim() : "";
  (0, import_jsutils18.isBool)(background.background) ? background.background = backgroundText : background = backgroundFactory(backgroundText, parent, index);
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
var import_jsutils19 = __toESM(require_cjs());
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
  const reasonArr = (0, import_jsutils19.eitherArr)(feature.reason, [feature.reason]);
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
  var _a;
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
      index: ((_a = feature.comments) == null ? void 0 : _a.length) || 0
    })
  });
  return true;
};
var featureEmptyLine = (feature, line, index) => {
  var _a;
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
      index: ((_a = feature.empty) == null ? void 0 : _a.length) || 0
    })
  });
  return true;
};

// src/parse/parseFeature.ts
var RX_NEWLINE = /\r?\n/g;
var defWorld = { $alias: {} };
var resolveArgs = (pWorld, world, options) => {
  const isOpts = !options && !(world == null ? void 0 : world.$alias) && (0, import_jsutils20.exists)(world == null ? void 0 : world.worldReplace);
  return {
    worldCfg: isOpts ? pWorld : world,
    opts: isOpts ? world : options || import_jsutils20.emptyObj
  };
};
var parseFeature = function(text, world, options) {
  const { opts, worldCfg } = resolveArgs(
    this ? this.world : defWorld,
    world,
    options
  );
  const features = [];
  const replaceText = replaceWorld((text || "").toString(), worldCfg, opts == null ? void 0 : opts.worldReplace);
  const lines = replaceText.split(RX_NEWLINE);
  let parseError2 = false;
  let feature = featureFactory(false, text);
  let rule = ruleFactory(false, feature);
  let scenario = scenarioFactory(false, feature);
  let background = backgroundFactory(false, feature);
  let activeParent = feature;
  let tagCache = void 0;
  return lines.reduce((featuresGroup, line, index) => {
    var _a;
    if (parseError2)
      return featuresGroup;
    feature = ensureFeature(featuresGroup, feature, line, text, index);
    if ((_a = feature == null ? void 0 : feature.errors) == null ? void 0 : _a.length)
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
var import_jsutils21 = __toESM(require_cjs());
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
  const tagMatch = !(filterTags == null ? void 0 : filterTags.length) || (tags == null ? void 0 : tags.length) && (filterTags == null ? void 0 : filterTags.every((clientTag) => tags == null ? void 0 : tags.includes(clientTag)));
  return nameMatch && tagMatch;
};
var getFilterOpts = (opts = emptyOpts) => {
  var _a;
  const { name } = opts;
  const filterTags = (_a = opts.tags) == null ? void 0 : _a.filter;
  const tags = (0, import_jsutils21.isStr)(filterTags) ? parseTags(filterTags) : (0, import_jsutils21.eitherArr)(filterTags, []);
  return { name, tags };
};
var filterChild = ({
  options,
  nameKey,
  children,
  tags = import_jsutils21.emptyArr
}) => {
  return children.filter((child) => {
    var _a;
    return filterMatch({
      options,
      name: child[nameKey],
      tags: [...((_a = child == null ? void 0 : child.tags) == null ? void 0 : _a.tokens) || import_jsutils21.emptyArr, ...tags]
    });
  });
};
var filterFeatures = (features, filterOptions = emptyOpts) => {
  var _a;
  const options = getFilterOpts(filterOptions);
  if (!((_a = options == null ? void 0 : options.tags) == null ? void 0 : _a.length) && !(options == null ? void 0 : options.name))
    return features;
  return features.reduce((filtered, feature) => {
    var _a2, _b, _c, _d;
    const isMatchingFeature = filterMatch({
      options,
      name: feature.feature,
      tags: (_a2 = feature == null ? void 0 : feature.tags) == null ? void 0 : _a2.tokens
    });
    if (isMatchingFeature) {
      filtered.push(feature);
      return filtered;
    }
    const { rules, scenarios, background, ...rest } = feature;
    const copy = { ...rest, rules: [], scenarios: [] };
    const matchingBackground = (0, import_jsutils21.exists)(background) && filterChild({
      options,
      nameKey: `background`,
      children: [background],
      tags: (_b = feature == null ? void 0 : feature.tags) == null ? void 0 : _b.tokens
    });
    const matchingRules = filterChild({
      options,
      nameKey: `rule`,
      children: rules,
      tags: (_c = feature == null ? void 0 : feature.tags) == null ? void 0 : _c.tokens
    });
    const matchingScenarios = filterChild({
      options,
      nameKey: `scenario`,
      children: scenarios,
      tags: (_d = feature == null ? void 0 : feature.tags) == null ? void 0 : _d.tokens
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
var import_jsutils22 = __toESM(require_cjs());
var { SPEC_RESULT_LOG, LOG_JEST_SPEC_ENV } = constants;
var logResultToTerminal = (result) => {
  const timestamp = (/* @__PURE__ */ new Date()).getTime();
  (0, import_jsutils22.get)(process, `env.${LOG_JEST_SPEC_ENV}`) && process.stdout.write(
    [
      SPEC_RESULT_LOG,
      JSON.stringify({ ...result, timestamp }),
      SPEC_RESULT_LOG
    ].join(``)
  );
};
var getSuiteData = (suite) => {
  const description = (0, import_jsutils22.get)(suite, `description`);
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
  return testMode ? import_jsutils22.noOp : globalThis[type] || testMethodFill(type);
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
  var _a;
  if (!hasJasmine)
    return;
  const jasmineEnv = resolveJasmine().getEnv();
  jasmineEnv && jasmineEnv.describe && ((_a = jasmineEnv == null ? void 0 : jasmineEnv.addReporter) == null ? void 0 : _a.call(jasmineEnv, buildReporter(jasmineEnv)));
};

// src/runner.ts
var import_jsutils23 = __toESM(require_cjs());
var emptyOpts2 = { tags: {}, steps: {} };
var getStepOpts = (step, options = emptyOpts2) => {
  var _a, _b;
  const shared = (_a = options == null ? void 0 : options.steps) == null ? void 0 : _a.shared;
  const single = (_b = options == null ? void 0 : options.steps) == null ? void 0 : _b[step == null ? void 0 : step.uuid];
  return {
    ...shared,
    ...single,
    retry: (single == null ? void 0 : single.retry) || (shared == null ? void 0 : shared.retry) || (options == null ? void 0 : options.retry) || 0,
    timeout: (single == null ? void 0 : single.timeout) || (shared == null ? void 0 : shared.timeout) || (options == null ? void 0 : options.timeout) || 15e3
  };
};
var buildTitle = (text, type) => {
  return `${(0, import_jsutils23.capitalize)(type)} > ${text}`;
};
var resolveFeatures = (data, $world) => {
  return (0, import_jsutils23.isStr)(data) ? parseFeature(data, $world) : (0, import_jsutils23.isObj)(data) ? [data] : (0, import_jsutils23.isArr)(data) ? data.reduce(
    (features, feature) => features.concat(resolveFeatures(feature, $world)),
    []
  ) : throwMissingFeatureText();
};
var runStep = (stepsInstance, step, options = emptyOpts2, testMode) => {
  var _a, _b, _c;
  const test = getTestMethod("test" /* test */, testMode);
  const opts = getStepOpts(step, options);
  const disabled = (opts == null ? void 0 : opts.disabled) || hasTag((_a = step == null ? void 0 : step.tags) == null ? void 0 : _a.tokens, (_b = options == null ? void 0 : options.tags) == null ? void 0 : _b.disabled);
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
    ...(0, import_jsutils23.pickKeys)(step, [`uuid`, `step`, `index`, `tags`, `type`, `definition`])
  };
  const last = ((_c = process == null ? void 0 : process.env) == null ? void 0 : _c.JEST_WORKER_ID) !== void 0 ? opts.timeout : opts;
  return test(`${(0, import_jsutils23.capitalize)(step.type)} ${step.step}`, testMethod, last);
};
var loopSteps = (parent, title, stepsInstance, options = emptyOpts2, testMode) => {
  var _a, _b;
  const describe2 = getTestMethod("describe" /* describe */, testMode);
  const disabled = hasTag((_a = parent == null ? void 0 : parent.tags) == null ? void 0 : _a.tokens, (_b = options == null ? void 0 : options.tags) == null ? void 0 : _b.disabled);
  const describeMethod = () => {
    if (disabled)
      return;
    parent.steps.map((step) => runStep(stepsInstance, step, options, testMode));
  };
  describeMethod.ParkinMetaData = {
    disabled,
    ...(0, import_jsutils23.pickKeys)(parent, [`index`, `uuid`, `tags`, `type`, `background`, `scenario`])
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
  var _a, _b;
  const disabled = hasTag((_a = rule == null ? void 0 : rule.tags) == null ? void 0 : _a.tokens, (_b = options == null ? void 0 : options.tags) == null ? void 0 : _b.disabled);
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
    ...(0, import_jsutils23.pickKeys)(
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
      tags: { ...emptyOpts2 == null ? void 0 : emptyOpts2.tags, ...opts == null ? void 0 : opts.tags },
      steps: { ...emptyOpts2 == null ? void 0 : emptyOpts2.steps, ...opts == null ? void 0 : opts.steps }
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
      var _a, _b;
      const disabled = hasTag((_a = feature == null ? void 0 : feature.tags) == null ? void 0 : _a.tokens, (_b = options == null ? void 0 : options.tags) == null ? void 0 : _b.disabled);
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
        ...(0, import_jsutils23.pickKeys)(
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
var import_jsutils24 = __toESM(require_cjs());
var formatAssembled = (assembled) => {
  return Array.from(assembled, (line) => (0, import_jsutils24.exists)(line) ? `${line.trimEnd()}
` : "\n").join("").trimEnd().concat(` `, `
`);
};
var addContent = (assembled, content, index) => {
  !(0, import_jsutils24.exists)(index) || index === false ? assembled.push(content) : (0, import_jsutils24.exists)(assembled[index]) ? assembled.splice(index, 0, content) : assembled[index] = content;
};
var getWhiteSpace = (ast, parent, def = ``) => {
  return (0, import_jsutils24.exists)(ast.whitespace) ? ast.whitespace : (0, import_jsutils24.exists)(parent == null ? void 0 : parent.whitespace) ? `${parent == null ? void 0 : parent.whitespace}${def}` : def;
};
var getTextContent = (ast, parent, type, def = ``) => {
  const content = ast[ast.type] || ``;
  const whitespace = getWhiteSpace(ast, parent, def);
  const prefix = `${whitespace}${type}:`;
  return content.length ? `${prefix} ${content}` : prefix;
};

// src/assemble/assembleParts.ts
var import_jsutils25 = __toESM(require_cjs());
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
    (0, import_jsutils25.exists)(parent == null ? void 0 : parent.whitespace) ? `${parent == null ? void 0 : parent.whitespace}  ` : `    `
  );
  const type = step.type !== "step" /* step */ ? (0, import_jsutils25.capitalize)(step.type) : `Step`;
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
    var _a;
    const trimmed = (_a = token == null ? void 0 : token.trim) == null ? void 0 : _a.call(token);
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
var import_jsutils26 = __toESM(require_cjs());
var ensureBackgroundFirst = (parent, opts) => {
  if (!opts.backgroundAfterParent)
    return parent;
  const { scenarios, background } = parent;
  if (!background || !(scenarios == null ? void 0 : scenarios.length))
    return parent;
  const backgroundIdx = background.index;
  let lowIdx = backgroundIdx;
  scenarios.forEach((scenario) => lowIdx > scenario.index && (lowIdx = scenario.index));
  const bgIdx = lowIdx !== backgroundIdx ? lowIdx - 1 : backgroundIdx;
  parent.background = { ...background, index: bgIdx };
  return parent;
};
var addEmptyLine = (feature, idx, opts) => {
  var _a;
  if (!((_a = feature.empty) == null ? void 0 : _a.length))
    feature.empty = [];
  featureEmptyLine(feature, ``, idx + 1);
  return feature;
};
var formatStory = (feature, opts = import_jsutils26.emptyObj) => {
  const { desire, perspective, reason } = feature;
  let lastIdx = feature.index;
  if (reason)
    (0, import_jsutils26.isArr)(reason) ? (0, import_jsutils26.ensureArr)(reason).forEach((res) => lastIdx = res.index > lastIdx ? res.index : lastIdx) : lastIdx = reason.index;
  else if (desire)
    lastIdx = desire.index;
  else if (perspective)
    lastIdx = perspective.index;
  addEmptyLine(feature, lastIdx, opts);
  return feature;
};
var formatOptions = (feature, opts = import_jsutils26.emptyObj) => {
  const keys = [];
  const {
    removeEmpty,
    removeComments,
    emptyAfterStory,
    emptyAfterFeature
  } = opts;
  removeEmpty && keys.push(`empty`);
  removeComments && keys.push(`comments`);
  const updated = (0, import_jsutils26.omitKeys)(feature, keys);
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
  if (!(parent == null ? void 0 : parent.background))
    return parent;
  const { emptyAfterBackground } = opts;
  let updated = ensureBackgroundFirst(parent, opts);
  emptyAfterBackground && addEmptyLine(feature, parent.background.index, opts);
  const background = formatSteps(feature, parent.background, opts);
  updated.background = background;
  return updated;
};
var formatScenarios = (feature, parent, opts) => {
  if (!(parent == null ? void 0 : parent.scenarios))
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
  if (!(feature == null ? void 0 : feature.rules))
    return feature;
  const { emptyAfterRule } = opts;
  const rules = feature.rules.reduce((acc, rule) => {
    var _a;
    emptyAfterRule && addEmptyLine(feature, rule.index, opts);
    let updated = formatBackground(feature, rule, opts);
    ((_a = updated == null ? void 0 : updated.scenarios) == null ? void 0 : _a.length) && (updated = formatScenarios(feature, updated, opts));
    acc.push(updated);
    return acc;
  }, []);
  return { ...feature, rules };
};
var formatFeature = (feature, opts = import_jsutils26.emptyObj) => {
  let updated = formatOptions(feature, opts);
  updated = formatBackground(updated, updated, opts);
  updated = formatRules(updated, opts);
  updated = formatScenarios(updated, updated, opts);
  return updated;
};

// src/assemble/featureToIndexes.ts
var import_jsutils29 = __toESM(require_cjs());

// src/assemble/findIndex.ts
var import_jsutils27 = __toESM(require_cjs());
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
  const match = filtered.find((block) => block.index === idx);
  return match ? checkBlocks(filtered, idx + 1) : idx;
};
var validateIndex = (feature, index) => {
  return checkBlocks(
    [
      ...feature.empty || import_jsutils27.emptyArr,
      ...feature.comments || import_jsutils27.emptyArr
    ],
    index
  );
};
var validObj = (child) => {
  return (0, import_jsutils27.isObj)(child) && (0, import_jsutils27.isNum)(child == null ? void 0 : child.index);
};
var validArr = (childArr) => {
  return (0, import_jsutils27.isArr)(childArr) && (childArr == null ? void 0 : childArr.length);
};
var indexFromBlocks = ({
  loc,
  type,
  parent,
  feature
}) => {
  var _a;
  if (type === "tags" /* tags */) {
    const idx = parent.index - 1;
    return idx >= 0 ? idx : 0;
  }
  if (loc) {
    const found = loc === "before" /* before */ ? parent.index - 1 : parent.index + 1;
    const tagCheck = ((_a = parent == null ? void 0 : parent.tags) == null ? void 0 : _a.index) === found ? found - 1 : found;
    return tagCheck > 0 ? tagCheck : 0;
  }
  const blocks = type === "empty" /* empty */ ? feature.empty : feature.comments;
  if (blocks == null ? void 0 : blocks.length)
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
  if (validObj(parent == null ? void 0 : parent.background)) {
    const idx = indexFromSteps(parent.background);
    if ((0, import_jsutils27.exists)(idx))
      return idx;
  }
  return parent === feature ? indexFromStory(feature) : parent.index + 1;
};
var indexFromRule = (feature) => {
  var _a;
  if (!validArr(feature == null ? void 0 : feature.rules))
    return indexFromBackground(feature, feature);
  const rule = (_a = feature == null ? void 0 : feature.rules) == null ? void 0 : _a[feature.rules.length - 1];
  return validArr(rule == null ? void 0 : rule.scenarios) ? indexFromScenarios(rule, feature) : validObj(rule == null ? void 0 : rule.background) ? indexFromBackground(rule, feature) : rule.index + 1;
};
var indexFromScenarios = (parent, feature) => {
  if (validArr(parent == null ? void 0 : parent.scenarios)) {
    const scenario = parent.scenarios[parent.scenarios.length - 1];
    if (validObj(scenario))
      return indexFromSteps(scenario);
  }
  return parent === feature ? indexFromRule(feature) : indexFromBackground(parent, feature);
};
var indexFromSteps = (parent) => {
  const step = validArr(parent == null ? void 0 : parent.steps) && parent.steps[parent.steps.length - 1];
  return validObj(step) ? step.index + 1 : (parent == null ? void 0 : parent.index) + 1;
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
var import_jsutils28 = __toESM(require_cjs());
var addToIndexes = (feature, indexes, item, offset) => {
  const index = (0, import_jsutils28.exists)(item.ast.index) ? item.ast.index : findIndex({
    feature,
    parent: item.parent,
    type: item.ast.type
  });
  const preAmount = offset.reduce((acc, val, idx) => {
    return idx <= index && (0, import_jsutils28.exists)(val) ? acc + val : acc;
  }, 0);
  if (!indexes[index] && !preAmount) {
    indexes[index] = item;
    return indexes;
  }
  offset[index] = (0, import_jsutils28.exists)(offset[index]) ? offset[index] + 1 : 1;
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
  (0, import_jsutils29.isArr)(reason) ? reason.forEach((reason2) => addToIndexes(feature, indexes, { ast: reason2, parent }, offset)) : addToIndexes(feature, indexes, { ast: reason, parent }, offset);
};
var indexBackground = (feature, indexes, background, parent, offset) => {
  addToIndexes(feature, indexes, { ast: background, parent }, offset);
  background.tags && indexTags(feature, indexes, background, offset);
  (background == null ? void 0 : background.steps) && indexSteps(feature, indexes, background.steps, background, offset);
};
var indexBlocks = (feature, indexes, blocks, type, parent, offset) => {
  blocks.forEach((block) => {
    if (block.type !== type)
      block.type = type;
    addToIndexes(feature, indexes, { ast: block, parent }, offset);
  });
};
var indexTags = (feature, indexes, parent, offset) => {
  var _a;
  const tags = parent == null ? void 0 : parent.tags;
  ((_a = tags == null ? void 0 : tags.tokens) == null ? void 0 : _a.length) && addToIndexes(feature, indexes, { ast: tags, parent }, offset);
};
var featureToIndexes = (feature) => {
  const indexes = [];
  let offset = [];
  (feature == null ? void 0 : feature.tags) && indexTags(feature, indexes, feature, offset);
  indexes[feature.index || indexes.length] = { ast: feature, parent: feature };
  (feature == null ? void 0 : feature.empty) && indexBlocks(
    feature,
    indexes,
    feature == null ? void 0 : feature.empty,
    "empty" /* empty */,
    feature,
    offset
  );
  (feature == null ? void 0 : feature.comments) && indexBlocks(
    feature,
    indexes,
    feature == null ? void 0 : feature.comments,
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
var import_jsutils30 = __toESM(require_cjs());
var assembleFeature2 = (toAssemble, opts = import_jsutils30.emptyObj) => {
  return (0, import_jsutils30.eitherArr)(toAssemble, [toAssemble]).map((feature) => {
    !(0, import_jsutils30.isObj)(feature) && throwFeatureNotAnObj(feature);
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
var import_jsutils31 = __toESM(require_cjs());
var findInFeature = (props) => {
  var _a;
  const { id, uuid: uuid2, feature } = props;
  const ref = id || uuid2;
  if (!ref)
    return;
  const loc = (_a = ref == null ? void 0 : ref.toLowerCase) == null ? void 0 : _a.call(ref).split(`.`).reduce((acc, part) => {
    if (part.startsWith("feature" /* feature */))
      return acc;
    const child = ParentTypes.includes(part) ? part === "scenario" /* scenario */ ? "scenarios" /* scenarios */ : part === "rule" /* rule */ ? "rules" /* rules */ : "background" /* background */ : StepTypes.includes(part) ? "steps" /* steps */ : part;
    child && acc.push(child);
    return acc;
  }, []);
  return (0, import_jsutils31.get)(feature, loc);
};

// src/parkin.ts
var import_jsutils32 = __toESM(require_cjs());
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
    (0, import_jsutils32.isObj)(world) && this.init(world, steps);
  }
  get world() {
    return this.#world;
  }
  set world(update) {
    this.#world = update;
    this.steps._world = update;
    this.runner._world = update;
  }
  init = (world = import_jsutils32.noOpObj, steps, warn = true) => {
    if (this.#isInit) {
      warn && console.warn(`This instance of parkin has already been initialized!`);
      return;
    }
    if (!(0, import_jsutils32.isObj)(world.$alias))
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
    (0, import_jsutils32.isObj)(steps) && this.registerSteps(steps);
    this.steps.types.map((type) => {
      this[(0, import_jsutils32.capitalize)(type)] = (matcher2, method, meta) => this.steps.register(`_${type}`, type, matcher2, method, meta);
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
          this.steps[(0, import_jsutils32.capitalize)(type)](matcher2, ...(0, import_jsutils32.eitherArr)(content, [content]));
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
  EAstObject,
  EBlockLoc,
  EExpParmKind,
  EExpParmType,
  EFeatureTypes,
  EHookType,
  EPartMatchTypes,
  EResultAction,
  EResultStatus,
  EResultType,
  EStepKey,
  EStepMethodType,
  EStepType,
  EStepVariant,
  ETestType,
  PKInstance,
  Parkin
});
//# sourceMappingURL=index.js.map
