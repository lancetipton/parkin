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

// node_modules/@keg-hub/jsutils/build/cjs/validate-23297ec2.js
var require_validate_23297ec2 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/validate-23297ec2.js"(exports) {
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

// node_modules/@keg-hub/jsutils/build/cjs/isArr-39234014.js
var require_isArr_39234014 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/isArr-39234014.js"(exports) {
    "use strict";
    var isArr4 = (value) => Array.isArray(value);
    exports.isArr = isArr4;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/isObj-6b3aa807.js
var require_isObj_6b3aa807 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/isObj-6b3aa807.js"(exports) {
    "use strict";
    var isObj5 = (obj) => typeof obj === "object" && !Array.isArray(obj) && obj !== null;
    exports.isObj = isObj5;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/isFunc-f93803cb.js
var require_isFunc_f93803cb = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/isFunc-f93803cb.js"(exports) {
    "use strict";
    var isFunc5 = (func) => typeof func === "function";
    exports.isFunc = isFunc5;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/isStr-8a57710e.js
var require_isStr_8a57710e = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/isStr-8a57710e.js"(exports) {
    "use strict";
    var isStr5 = (str) => typeof str === "string";
    exports.isStr = isStr5;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/isNum-c7164b50.js
var require_isNum_c7164b50 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/isNum-c7164b50.js"(exports) {
    "use strict";
    var equalsNaN2 = (val) => typeof val === "number" && val != val;
    var isNum = (val) => typeof val === "number" && !equalsNaN2(val);
    exports.equalsNaN = equalsNaN2;
    exports.isNum = isNum;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/isValidDate-813b9419.js
var require_isValidDate_813b9419 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/isValidDate-813b9419.js"(exports) {
    "use strict";
    var isObj5 = require_isObj_6b3aa807();
    var isArr4 = require_isArr_39234014();
    var isStr5 = require_isStr_8a57710e();
    var isNum = require_isNum_c7164b50();
    var typeOf = (val) => Object.prototype.toString.call(val).slice(8, -1);
    var isEmpty = (val) => isObj5.isObj(val) ? Object.keys(val).length === 0 : isArr4.isArr(val) ? val.length === 0 : isStr5.isStr(val) ? val.trim().length === 0 : isNum.isNum(val) ? val < 1 : false;
    var isSame = (val1, val2) => val1 === val2 ? val1 !== 0 || 1 / val1 === 1 / val2 : val1 !== val1 && val2 !== val2;
    var isValidDate = (date) => !isNaN((date instanceof Date && date || new Date(date)).getTime());
    exports.isEmpty = isEmpty;
    exports.isSame = isSame;
    exports.isValidDate = isValidDate;
    exports.typeOf = typeOf;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/isBool-aa6af74e.js
var require_isBool_aa6af74e = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/isBool-aa6af74e.js"(exports) {
    "use strict";
    var isBool2 = (val) => typeof val === "boolean";
    exports.isBool = isBool2;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/toStr-8e499966.js
var require_toStr_8e499966 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/toStr-8e499966.js"(exports) {
    "use strict";
    var isStr5 = require_isStr_8a57710e();
    var toStr3 = (val) => val === null || val === void 0 ? "" : isStr5.isStr(val) ? val : JSON.stringify(val);
    exports.toStr = toStr3;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/toBool-deb350e4.js
var require_toBool_deb350e4 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/toBool-deb350e4.js"(exports) {
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

// node_modules/@keg-hub/jsutils/build/cjs/isColl-5757310a.js
var require_isColl_5757310a = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/isColl-5757310a.js"(exports) {
    "use strict";
    var isColl = (val) => typeof val === "object" && val !== null;
    exports.isColl = isColl;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/deepEqual-adba847a.js
var require_deepEqual_adba847a = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/deepEqual-adba847a.js"(exports) {
    "use strict";
    var isColl = require_isColl_5757310a();
    var isArr4 = require_isArr_39234014();
    var isEmptyColl = (obj) => isArr4.isArr(obj) ? obj.length === 0 : isColl.isColl(obj) && Object.getOwnPropertyNames(obj).length === 0;
    var isArray = Array.isArray;
    var keyList = Object.keys;
    var hasProp = Object.prototype.hasOwnProperty;
    var deepEqual3 = (a, b) => {
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
          if (!deepEqual3(a[i], b[i]))
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
        if (!deepEqual3(a[key], b[key]))
          return false;
      }
      return true;
    };
    exports.deepEqual = deepEqual3;
    exports.isEmptyColl = isEmptyColl;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/exists-c79204b1.js
var require_exists_c79204b1 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/exists-c79204b1.js"(exports) {
    "use strict";
    var exists6 = (value) => value === value && value !== void 0 && value !== null;
    exports.exists = exists6;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/isInt-94ce4199.js
var require_isInt_94ce4199 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/isInt-94ce4199.js"(exports) {
    "use strict";
    var isNum = require_isNum_c7164b50();
    var isNegative = (x) => isNum.isNum(x) && x < 0;
    var isPositive = (x) => isNum.isNum(x) && x > 0;
    var isFloat = (val) => isNum.isNum(val) && val % 1 !== 0;
    var isInt = (val) => isNum.isNum(val) && val % 1 === 0;
    exports.isFloat = isFloat;
    exports.isInt = isInt;
    exports.isNegative = isNegative;
    exports.isPositive = isPositive;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/jsonEqual-7e69ef6a.js
var require_jsonEqual_7e69ef6a = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/jsonEqual-7e69ef6a.js"(exports) {
    "use strict";
    var isStr5 = require_isStr_8a57710e();
    var isNum = require_isNum_c7164b50();
    var isArr4 = require_isArr_39234014();
    var isObj5 = require_isObj_6b3aa807();
    var toBool = require_toBool_deb350e4();
    var hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    var isEntry = (maybeEntry) => isArr4.isArr(maybeEntry) && maybeEntry.length === 2 && (isNum.isNum(maybeEntry[0]) || isStr5.isStr(maybeEntry[0]));
    var isArrMap = (obj) => {
      if (!isObj5.isObj(obj))
        return false;
      const values = Object.values(obj);
      return toBool.toBool(values.length && values.every(isArr4.isArr));
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

// node_modules/@keg-hub/jsutils/build/cjs/isQuoted-eb6994da.js
var require_isQuoted_eb6994da = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/isQuoted-eb6994da.js"(exports) {
    "use strict";
    var isStr5 = require_isStr_8a57710e();
    var isLowerCase = (str) => str === str.toLowerCase();
    var isUpperCase = (str) => str === str.toUpperCase();
    var isEmail = (str) => {
      if (!str || !isStr5.isStr(str))
        return false;
      const regex2 = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return Boolean(regex2.test(str));
    };
    var regex = {
      ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
      ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i
    };
    var isIp = (str) => {
      if (!str || !isStr5.isStr(str))
        return false;
      const isIp42 = Boolean(regex.ipv4.test(str));
      return isIp42 || Boolean(regex.ipv6.test(str));
    };
    var isIp4 = (str) => {
      if (!str || !isStr5.isStr(str))
        return false;
      return Boolean(regex.ipv4.test(str));
    };
    var isIp6 = (str) => {
      if (!str || !isStr5.isStr(str))
        return false;
      return Boolean(regex.ipv6.test(str));
    };
    var isPhone = (str) => {
      if (!str || !isStr5.isStr(str))
        return false;
      const regex2 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      return Boolean(regex2.test(str)) && str.replace(/\D/g, "").length < 11;
    };
    var isUrl = (str) => {
      const regex2 = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
      return Boolean(regex2.test(str));
    };
    var isUuid = (str) => {
      if (!str || !isStr5.isStr(str))
        return false;
      const regex2 = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
      return Boolean(regex2.test(str));
    };
    var quoteSymbols = ['"', "'"];
    var isQuoted2 = (str, quotes = quoteSymbols) => {
      return isStr5.isStr(str) && quotes.some((quote) => str.startsWith(quote) && str.endsWith(quote));
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

// node_modules/@keg-hub/jsutils/build/cjs/isValidUrl-a77135f0.js
var require_isValidUrl_a77135f0 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/isValidUrl-a77135f0.js"(exports) {
    "use strict";
    var isValidUrl = (str) => {
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
      return regexp.test(str);
    };
    exports.isValidUrl = isValidUrl;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/not-16fa9c85.js
var require_not_16fa9c85 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/not-16fa9c85.js"(exports) {
    "use strict";
    var isArr4 = require_isArr_39234014();
    var isValidDate = require_isValidDate_813b9419();
    var isFunc5 = require_isFunc_f93803cb();
    var isBool2 = require_isBool_aa6af74e();
    var toBool = require_toBool_deb350e4();
    var isColl = require_isColl_5757310a();
    var deepEqual3 = require_deepEqual_adba847a();
    var exists6 = require_exists_c79204b1();
    var isStr5 = require_isStr_8a57710e();
    var isNum = require_isNum_c7164b50();
    var isInt = require_isInt_94ce4199();
    var jsonEqual = require_jsonEqual_7e69ef6a();
    var isObj5 = require_isObj_6b3aa807();
    var isQuoted2 = require_isQuoted_eb6994da();
    var isValidUrl = require_isValidUrl_a77135f0();
    var isOrderable = (x) => isStr5.isStr(x) || isNum.isNum(x) || isBool2.isBool(x);
    var identity = (x) => x;
    var match = (matchArg, ...args) => {
      if (!args.length)
        return null;
      for (let entry of args) {
        if (!isArr4.isArr(entry)) {
          console.error(`Matching case must be an entry (a 2-element array). Found: ${isValidDate.typeOf(entry)}`, entry);
          break;
        }
        const [caseValueOrPredicate, valueOnMatch] = entry;
        if (isFunc5.isFunc(caseValueOrPredicate) && caseValueOrPredicate(matchArg))
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
    not.deepEqual = not(deepEqual3.deepEqual);
    not.emptyColl = not(deepEqual3.isEmptyColl);
    not.dom = not(hasDomAccess);
    not.exists = not(exists6.exists);
    not.empty = not(isValidDate.isEmpty);
    not.same = not(isValidDate.isSame);
    not.validDate = not(isValidDate.isValidDate);
    not.func = not(isFunc5.isFunc);
    not.identity = not(identity);
    not.orderable = not(isOrderable);
    not.equalsNaN = not(isNum.equalsNaN);
    not.float = not(isInt.isFloat);
    not.int = not(isInt.isInt);
    not.num = not(isNum.isNum);
    not.negative = not(isInt.isNegative);
    not.positive = not(isInt.isPositive);
    not.hasOwn = not(jsonEqual.hasOwn);
    not.entry = not(jsonEqual.isEntry);
    not.arrMap = not(jsonEqual.isArrMap);
    not.obj = not(isObj5.isObj);
    not.jsonEqual = not(jsonEqual.jsonEqual);
    not.regex = not(isRegex);
    not.email = not(isQuoted2.isEmail);
    not.ip = not(isQuoted2.isIp);
    not.lowerCase = not(isQuoted2.isLowerCase);
    not.phone = not(isQuoted2.isPhone);
    not.quoted = not(isQuoted2.isQuoted);
    not.str = not(isStr5.isStr);
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

// node_modules/@keg-hub/jsutils/build/cjs/compareTo-d69e4abf.js
var require_compareTo_d69e4abf = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/compareTo-d69e4abf.js"(exports) {
    "use strict";
    var isStr5 = require_isStr_8a57710e();
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
      return isStr5.isStr(x) ? x.localeCompare(y) : x - y;
    };
    exports.compareTo = compareTo;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/isNonNegative-9959647c.js
var require_isNonNegative_9959647c = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/isNonNegative-9959647c.js"(exports) {
    "use strict";
    var isNum = require_isNum_c7164b50();
    var isNonNegative = (val) => isNum.isNum(val) && val >= 0;
    exports.isNonNegative = isNonNegative;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/deepFreeze-d73ccc57.js
var require_deepFreeze_d73ccc57 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/deepFreeze-d73ccc57.js"(exports) {
    "use strict";
    var isFunc5 = require_isFunc_f93803cb();
    var deepFreeze2 = (obj) => {
      Object.freeze(obj);
      Object.getOwnPropertyNames(obj).map((prop) => {
        obj.hasOwnProperty(prop) && obj[prop] !== null && (typeof obj[prop] === "object" || isFunc5.isFunc(obj[prop])) && !Object.isFrozen(obj[prop]) && deepFreeze2(obj[prop]);
      });
      return obj;
    };
    exports.deepFreeze = deepFreeze2;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/noOps-c9732e8e.js
var require_noOps_c9732e8e = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/noOps-c9732e8e.js"(exports) {
    "use strict";
    var deepFreeze2 = require_deepFreeze_d73ccc57();
    var noOpObj6 = Object.freeze({});
    var emptyObj5 = noOpObj6;
    var noPropObj = deepFreeze2.deepFreeze({
      content: {}
    });
    var noPropArr2 = deepFreeze2.deepFreeze([]);
    var noOpArr = noPropArr2;
    var emptyArr4 = noPropArr2;
    exports.emptyArr = emptyArr4;
    exports.emptyObj = emptyObj5;
    exports.noOpArr = noOpArr;
    exports.noOpObj = noOpObj6;
    exports.noPropArr = noPropArr2;
    exports.noPropObj = noPropObj;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/intersect-77d7e821.js
var require_intersect_77d7e821 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/intersect-77d7e821.js"(exports) {
    "use strict";
    var validate = require_validate_23297ec2();
    var isArr4 = require_isArr_39234014();
    var isObj5 = require_isObj_6b3aa807();
    var isFunc5 = require_isFunc_f93803cb();
    var compareTo = require_compareTo_d69e4abf();
    var not = require_not_16fa9c85();
    var isNonNegative = require_isNonNegative_9959647c();
    var noOps = require_noOps_c9732e8e();
    var exists6 = require_exists_c79204b1();
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
        $default: isArr4.isArr
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
        $default: isArr4.isArr
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
      ...isArr4.isArr(arr) && arr || isObj5.isObj(arr) && Object.entries(arr) || []
    ]);
    var eitherArr7 = (a, b) => isArr4.isArr(a) ? a : b;
    var flatten = (arr, result, opts) => {
      for (let i = 0; i < arr.length; i++) {
        const value = arr[i];
        isArr4.isArr(value) ? flatten(value, result, opts) : opts.exists && !exists6.exists(value) || opts.truthy && !value ? result : result.push(value);
      }
      if (!opts.mutate)
        return result;
      Object.assign(arr, result).splice(result.length);
      return arr;
    };
    var flatArr = (arr, opts) => flatten(arr, [], isObj5.isObj(opts) ? opts : noOps.noOpObj);
    var flatMap = (arr, mapFn) => {
      const [inputIsValid] = validate.validate({
        arr,
        mapFn
      }, {
        arr: isArr4.isArr,
        mapFn: isFunc5.isFunc
      });
      if (!inputIsValid)
        return arr;
      return arr.reduce((finalArr, current) => {
        const result = mapFn(current);
        isArr4.isArr(result) ? result.map((el) => finalArr.push(el)) : finalArr.push(result);
        return finalArr;
      }, []);
    };
    var findExtrema = (arr, comparator) => {
      const [valid] = validate.validate({
        arr,
        comparator
      }, {
        arr: isArr4.isArr,
        $default: isFunc5.isFunc
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
        arr: isArr4.isArr,
        $default: isNonNegative.isNonNegative
      });
      if (!inputIsValid)
        return arr;
      const nextArr = [...arr];
      nextArr.splice(startIndex, count);
      return nextArr;
    };
    var randomArr = (arr, amount) => {
      if (!isArr4.isArr(arr))
        return arr;
      const useAmount = amount || 1;
      const randoms = [];
      for (let i = 0; i < useAmount; i++) {
        randoms.push(arr[Math.floor(Math.random() * arr.length)]);
      }
      return !amount ? randoms[0] : randoms;
    };
    var randomizeArr = (arr) => !isArr4.isArr(arr) && arr || arr.sort(() => 0.5 - Math.random());
    var uniqArrByReference = (arr) => {
      return !isArr4.isArr(arr) ? arr : arr.filter((e, i, arr2) => arr2.indexOf(e) == i);
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
    var flatUnion2 = (...args) => {
      const last = args.pop();
      const opts = {
        exists: true
      };
      const compare = isFunc5.isFunc(last) ? last : args.push(last) && void 0;
      return args.reduce((merged, arr) => {
        if (!isArr4.isArr(arr))
          return merged;
        return uniqArr(flatArr([...merged, ...arr], opts), compare);
      }, []);
    };
    var intersect = (arrA, arrB) => {
      if (!isArr4.isArr(arrA) || !isArr4.isArr(arrB))
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
    exports.flatUnion = flatUnion2;
    exports.intersect = intersect;
    exports.omitRange = omitRange;
    exports.randomArr = randomArr;
    exports.randomizeArr = randomizeArr;
    exports.uniqArr = uniqArr;
    exports.uniqArrByReference = uniqArrByReference;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/ensureArr-ae68c041.js
var require_ensureArr_ae68c041 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/ensureArr-ae68c041.js"(exports) {
    "use strict";
    var isArr4 = require_isArr_39234014();
    var ensureArr3 = (val) => isArr4.isArr(val) ? val : [val];
    exports.ensureArr = ensureArr3;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/softFalsy-3d7ead1c.js
var require_softFalsy_3d7ead1c = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/softFalsy-3d7ead1c.js"(exports) {
    "use strict";
    var softFalsy = (val) => Boolean(val || val === "" || val === 0);
    exports.softFalsy = softFalsy;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/set-c0a98b21.js
var require_set_c0a98b21 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/set-c0a98b21.js"(exports) {
    "use strict";
    var isFunc5 = require_isFunc_f93803cb();
    var isArr4 = require_isArr_39234014();
    var isColl = require_isColl_5757310a();
    var updateColl = (obj, path, type, val) => {
      const org = obj;
      if (!isColl.isColl(obj) || !obj || !path)
        return type !== "set" && val || void 0;
      const parts = isArr4.isArr(path) ? Array.from(path) : path.split(".");
      const key = parts.pop();
      let prop;
      let breakPath;
      while (prop = parts.shift()) {
        const next = obj[prop];
        isColl.isColl(next) || isFunc5.isFunc(next) ? obj = next : (() => {
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

// node_modules/@keg-hub/jsutils/build/cjs/get-00626335.js
var require_get_00626335 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/get-00626335.js"(exports) {
    "use strict";
    var exists6 = require_exists_c79204b1();
    var isArr4 = require_isArr_39234014();
    var isStr5 = require_isStr_8a57710e();
    var get4 = (obj, path, fallback) => {
      const isPathArr = isArr4.isArr(path);
      if (!isStr5.isStr(path) && !isPathArr)
        return exists6.exists(fallback) ? fallback : void 0;
      const parts = isPathArr ? path : path.split(".");
      const result = parts.reduce((obj2, prop) => {
        const type = typeof obj2;
        if (!exists6.exists(obj2) || type !== "object" && type !== "function")
          return void 0;
        prop = prop.startsWith("[") ? prop.replace(/\D/g, "") : prop;
        return obj2[prop];
      }, obj);
      return exists6.exists(result) ? result : fallback;
    };
    exports.get = get4;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/deepClone-ae664a21.js
var require_deepClone_ae664a21 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/deepClone-ae664a21.js"(exports) {
    "use strict";
    var isFunc5 = require_isFunc_f93803cb();
    var get4 = require_get_00626335();
    var isArr4 = require_isArr_39234014();
    var cloneFunc = (func) => {
      const funcClone = function(...args) {
        return func instanceof funcClone ? (() => {
          return new func(...args);
        })() : get4.get(func.prototype, "constructor.name") ? new func(...args) : func.apply(func, args);
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
      if (isArr4.isArr(obj))
        return obj.map((x) => deepClone(x));
      if (isFunc5.isFunc(obj))
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

// node_modules/@keg-hub/jsutils/build/cjs/shallowEqual-eaf2262d.js
var require_shallowEqual_eaf2262d = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/shallowEqual-eaf2262d.js"(exports) {
    "use strict";
    var isObj5 = require_isObj_6b3aa807();
    var isColl = require_isColl_5757310a();
    var isFunc5 = require_isFunc_f93803cb();
    var isArr4 = require_isArr_39234014();
    var exists6 = require_exists_c79204b1();
    var validate = require_validate_23297ec2();
    var set = require_set_c0a98b21();
    var deepClone = require_deepClone_ae664a21();
    var isNum = require_isNum_c7164b50();
    var get4 = require_get_00626335();
    var isStr5 = require_isStr_8a57710e();
    var cleanColl = (coll, recursive = true) => {
      return isColl.isColl(coll) ? Object.keys(coll).reduce((cleaned, key) => {
        const value = coll[key];
        if (value === null || value === void 0)
          return cleaned;
        cleaned[key] = recursive && isColl.isColl(value) ? cleanColl(value) : value;
        return cleaned;
      }, isObj5.isObj(coll) && {} || []) : console.error(`cleanColl requires a collection as the first argument`) || coll;
    };
    var mapColl = (coll, cb) => isFunc5.isFunc(cb) && isColl.isColl(coll) ? Object.keys(coll).map((key) => cb(key, coll[key], coll)) : isArr4.isArr(coll) ? [] : {};
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
    var mapFind = (coll, mapper, testFunc = exists6.exists) => {
      const [valid] = validate.validate({
        coll,
        mapper,
        testFunc
      }, {
        coll: isColl.isColl,
        $default: isFunc5.isFunc
      });
      if (!valid)
        return void 0;
      return isObj5.isObj(coll) ? mapFindObj(coll, mapper, testFunc) : mapFindArr(coll, mapper, testFunc);
    };
    var reduceColl = (coll, cb, reduce) => isFunc5.isFunc(cb) && isColl.isColl(coll) ? Object.keys(coll).reduce((data, key) => cb(key, coll[key], coll, data), reduce) : isArr4.isArr(coll) ? [] : {};
    var unset = (obj, path) => {
      set.updateColl(obj, path, "unset");
      return obj;
    };
    var repeat = (element, times, cloneDeep = false) => {
      if (!times || times <= 0)
        return [];
      if (!isNum.isNum(times)) {
        console.error("Times argument must be a number");
        return [];
      }
      const arr = [];
      for (let i = 0; i < times; i++) {
        const value = isFunc5.isFunc(element) ? element() : cloneDeep ? deepClone.deepClone(element) : element;
        arr.push(value);
      }
      return arr;
    };
    var shallowEqual = (col1, col2, path) => {
      if (path && (isArr4.isArr(path) || isStr5.isStr(path))) {
        col1 = get4.get(col1, path);
        col2 = get4.get(col2, path);
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

// node_modules/@keg-hub/jsutils/build/cjs/either-81805472.js
var require_either_81805472 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/either-81805472.js"(exports) {
    "use strict";
    var softFalsy = require_softFalsy_3d7ead1c();
    var isFunc5 = require_isFunc_f93803cb();
    var either = (val1, val2, check) => !isFunc5.isFunc(check) ? softFalsy.softFalsy(val1) && val1 || val2 : check(val1, val2) && val1 || val2;
    exports.either = either;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/toNum-eeb2e51e.js
var require_toNum_eeb2e51e = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/toNum-eeb2e51e.js"(exports) {
    "use strict";
    var isNum = require_isNum_c7164b50();
    var toStr3 = require_toStr_8e499966();
    var getNums = (val) => toStr3.toStr(val).replace(/([^.\d])/gm, "");
    var toNum = (val) => isNum.isNum(val) ? val : val && !isNum.equalsNaN(val) && Number(getNums(val)) || 0;
    exports.getNums = getNums;
    exports.toNum = toNum;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/strToType-00c4481f.js
var require_strToType_00c4481f = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/strToType-00c4481f.js"(exports) {
    "use strict";
    var isStr5 = require_isStr_8a57710e();
    var isNum = require_isNum_c7164b50();
    var toNum = require_toNum_eeb2e51e();
    var toBool = require_toBool_deb350e4();
    var strToType = (val) => {
      return !val || !isStr5.isStr(val) ? val : toBool.isStrBool(val) ? toBool.toBool(val) : isNum.isNum(val) ? toNum.toNum(val) : (() => {
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

// node_modules/@keg-hub/jsutils/build/cjs/log-37bbfac6.js
var require_log_37bbfac6 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/log-37bbfac6.js"(exports) {
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

// node_modules/@keg-hub/jsutils/build/cjs/pipeline-e65bdaae.js
var require_pipeline_e65bdaae = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/pipeline-e65bdaae.js"(exports) {
    "use strict";
    var isArr4 = require_isArr_39234014();
    var isFunc5 = require_isFunc_f93803cb();
    var applyToFunc = (item, expression) => {
      if (isArr4.isArr(expression)) {
        const [func, ...args] = expression;
        return func(item, ...args);
      } else if (isFunc5.isFunc(expression)) {
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

// node_modules/@keg-hub/jsutils/build/cjs/stackTracePaths-58b768d2.js
var require_stackTracePaths_58b768d2 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/stackTracePaths-58b768d2.js"(exports) {
    "use strict";
    var isFunc5 = require_isFunc_f93803cb();
    var validate = require_validate_23297ec2();
    var isNum = require_isNum_c7164b50();
    var jsonEqual = require_jsonEqual_7e69ef6a();
    var isArr4 = require_isArr_39234014();
    var deepClone = require_deepClone_ae664a21();
    var isStr5 = require_isStr_8a57710e();
    var isObj5 = require_isObj_6b3aa807();
    var isValidDate = require_isValidDate_813b9419();
    var checkCall3 = (method, ...params) => {
      return isFunc5.isFunc(method) ? method(...params) : void 0;
    };
    var complement = (predicate) => {
      const [valid] = validate.validate({
        predicate
      }, {
        predicate: isFunc5.isFunc
      });
      return valid ? (...args) => !predicate(...args) : null;
    };
    var eitherFunc = (func1, func2) => isFunc5.isFunc(func1) && func1 || func2;
    var debounce = (func, wait = 250, immediate = false) => {
      let timeout;
      function wrapFunc(...args) {
        if (!isFunc5.isFunc(func))
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
          return isFunc5.isFunc(func) && func.apply(context, args);
      }
      return wrapFunc;
    };
    var doIt = (...args) => {
      const params = args.slice();
      const num = params.shift();
      const bindTo = params.shift();
      const cb = params.pop();
      if (!isNum.isNum(num) || !isFunc5.isFunc(cb))
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
      if (!isFunc5.isFunc(func) || getCacheKey && !isFunc5.isFunc(getCacheKey))
        return console.error("Error: Expected a function", func, getCacheKey);
      let memorized = function() {
        const cache = memorized.cache;
        const key = getCacheKey ? getCacheKey.apply(this, arguments) : arguments[0];
        if (jsonEqual.hasOwn(cache, key))
          return cache[key];
        const result = func.apply(this, arguments);
        isNum.isNum(limit) && Object.keys(cache).length < limit ? cache[key] = result : memorized.cache = {
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
        asyncFns: isArr4.isArr
      });
      if (!valid)
        return [];
      const {
        cloneResults = false,
        returnOriginal = true
      } = options;
      const results = [];
      for (const fn of asyncFns) {
        const result = isFunc5.isFunc(fn) ? await fn(results.length, cloneResults ? deepClone.deepClone(results) : results) : returnOriginal ? fn : void 0;
        results.push(result);
      }
      return results;
    };
    var timedRun = async (fn, ...args) => {
      const [valid] = validate.validate({
        fn
      }, {
        fn: isFunc5.isFunc
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
      if (isNum.isNum(cb)) {
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
    var limbo = (promise) => {
      return !promise || !isFunc5.isFunc(promise.then) ? [new Error(`A promise or thenable is required as the first argument!`), null] : promise.then((data) => [null, data]).catch((err) => [err, void 0]);
    };
    var limboify = (cb, ...args) => {
      return limbo(new Promise((res, rej) => cb(...args, (err, success) => err ? rej(err) : res(success || true))));
    };
    var uuid9 = (a) => a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid9);
    var noOp4 = () => {
    };
    var parseErrorMessage = (exception) => {
      return isStr5.isStr(exception) && !isValidDate.isEmpty(exception) ? exception : isObj5.isObj(exception) ? exception.message : null;
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
        const ignore = isFunc5.isFunc(filter) ? filter(loc, cs, stack) : Boolean(filter.length && filter.find((filterLoc) => loc.includes(filterLoc)));
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
    exports.uuid = uuid9;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/mod-31dfe732.js
var require_mod_31dfe732 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/mod-31dfe732.js"(exports) {
    "use strict";
    var isNum = require_isNum_c7164b50();
    var toNum = require_toNum_eeb2e51e();
    var nth = (num) => {
      if (!isNum.isNum(num)) {
        num = toNum.getNums(num);
        if (!num)
          return "";
        num = toNum.toNum(num);
        if (isNum.equalsNaN(num))
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
    var toFloat = (val) => val && !isNum.equalsNaN(val) && parseFloat(isNum.isNum(val) && val || toNum.getNums(val)) || 0;
    var toInt = (val) => val && !isNum.equalsNaN(val) && parseInt(isNum.isNum(val) && val || toNum.getNums(val)) || 0;
    var mod = (num, divisor) => {
      return (num % divisor + divisor) % divisor;
    };
    exports.mod = mod;
    exports.nth = nth;
    exports.toFloat = toFloat;
    exports.toInt = toInt;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/reduceObj-f41cbf8d.js
var require_reduceObj_f41cbf8d = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/reduceObj-f41cbf8d.js"(exports) {
    "use strict";
    var isFunc5 = require_isFunc_f93803cb();
    var isObj5 = require_isObj_6b3aa807();
    var reduceObj = (obj, cb, start = {}) => isObj5.isObj(obj) && isFunc5.isFunc(cb) && Object.entries(obj).reduce((data, [key, value]) => cb(key, value, data), start) || start;
    exports.reduceObj = reduceObj;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/sanitize-0a18302d.js
var require_sanitize_0a18302d = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/sanitize-0a18302d.js"(exports) {
    "use strict";
    var isStr5 = require_isStr_8a57710e();
    var sanitize2 = (str) => isStr5.isStr(str) && str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") || str;
    exports.sanitize = sanitize2;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/splitByKeys-d0160002.js
var require_splitByKeys_d0160002 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/splitByKeys-d0160002.js"(exports) {
    "use strict";
    var log = require_log_37bbfac6();
    var isObj5 = require_isObj_6b3aa807();
    var isFunc5 = require_isFunc_f93803cb();
    var deepClone = require_deepClone_ae664a21();
    var isArr4 = require_isArr_39234014();
    var isColl = require_isColl_5757310a();
    var set = require_set_c0a98b21();
    var jsonEqual = require_jsonEqual_7e69ef6a();
    var reduceObj = require_reduceObj_f41cbf8d();
    var sanitize2 = require_sanitize_0a18302d();
    var isStr5 = require_isStr_8a57710e();
    var strToType = require_strToType_00c4481f();
    var pipeline = require_pipeline_e65bdaae();
    var exists6 = require_exists_c79204b1();
    var toStr3 = require_toStr_8e499966();
    var ensureArr3 = require_ensureArr_ae68c041();
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
    var eitherObj = (obj1, obj2) => isObj5.isObj(obj1) && obj1 || obj2;
    var deepMerge = (...sources) => {
      return sources.reduce((merged, source) => {
        const srcCopy = deepClone.deepClone(source);
        return isArr4.isArr(srcCopy) ? [...isArr4.isArr(merged) && merged || [], ...srcCopy] : isObj5.isObj(srcCopy) ? Object.entries(srcCopy).reduce((joined, [key, value]) => ({
          ...joined,
          [key]: isFunc5.isFunc(value) ? deepClone.cloneFunc(value) : isColl.isColl(value) && key in joined ? deepMerge(joined[key], value) : deepClone.deepClone(value)
        }), merged) : merged;
      }, isArr4.isArr(sources[0]) && [] || {});
    };
    var applyToCloneOf = (obj, mutatorCb) => {
      let error;
      if (!obj)
        error = "object (Argument 1) in applyToCloneOf, must be defined!";
      if (!isObj5.isObj(obj))
        error = "object (Argument 1) in applyToCloneOf, must be an object!";
      if (!mutatorCb)
        error = "mutator (Argument 2) in applyToCloneOf, must be defined!";
      if (!isFunc5.isFunc(mutatorCb))
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
      if (!isArr4.isArr(obj) && !isObj5.isObj(obj)) {
        console.error(obj, `Expected array or object for obj. Found ${typeof obj}`);
        return obj;
      }
      if (!isFunc5.isFunc(cb)) {
        console.error(`Expected function for cb. Found ${typeof cb}`);
        return obj;
      }
      const entries = Object.entries(obj);
      const initialValue = isArr4.isArr(obj) ? [] : {};
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
      if (!isObj5.isObj(obj) || !isFunc5.isFunc(keyMapper))
        return obj;
      return mapEntries(obj, (key, value) => [keyMapper(key), value]);
    };
    var mapObj = (obj, cb) => {
      if (!isObj5.isObj(obj))
        return [];
      const entries = Object.entries(obj);
      return isFunc5.isFunc(cb) ? entries.map(([key, value]) => cb(key, value)) : entries;
    };
    var omitKeys = (obj = {}, keys = []) => isObj5.isObj(obj) && reduceObj.reduceObj(obj, (key, _, updated) => {
      keys.indexOf(key) === -1 && (updated[key] = obj[key]);
      return updated;
    }, {}) || {};
    var pickKeys = (obj = {}, keys = []) => isObj5.isObj(obj) && keys.reduce((updated, key) => {
      key in obj && (updated[key] = obj[key]);
      return updated;
    }, {}) || {};
    var sanitizeCopy = (obj) => JSON.parse(sanitize2.sanitize(JSON.stringify(obj)));
    var trimStringFields = (object) => Object.entries(object).reduce((cleaned, [key, value]) => {
      cleaned[key] = isStr5.isStr(value) ? value.trim() : value;
      return cleaned;
    }, object);
    var toObj = (val, divider, split) => {
      if (isArr4.isArr(val))
        return Object.keys(val).reduce((obj, key) => {
          obj[key] = val[key];
          return obj;
        }, {});
      if (!isStr5.isStr(val))
        return {};
      divider = divider || "=";
      split = split || "&";
      return val.toString().split(split).reduce((obj, item) => {
        const sep = item.split(divider);
        obj[sep[0].trim()] = strToType.strToType(sep[1].trim());
        return obj;
      }, {});
    };
    var keyMap = (arr, toUpperCase) => isArr4.isArr(arr) && arr.reduce((obj, key) => {
      if (!isStr5.isStr(key))
        return obj;
      const use = toUpperCase && key.toUpperCase() || key;
      obj[use] = use;
      return obj;
    }, {}) || {};
    var everyEntry = (obj, predicate, logError = true) => {
      if (!isObj5.isObj(obj)) {
        logError && console.error(`First argument ${obj} must be an object.`);
        return false;
      }
      if (!isFunc5.isFunc(predicate)) {
        logError && console.error(`Second argument ${predicate}, must a function`);
        return false;
      }
      return pipeline.pipeline(obj, Object.entries, (entries) => entries.every(([key, value]) => predicate(key, value)));
    };
    var someEntry = (obj, predicate, logError = true) => {
      if (!isObj5.isObj(obj)) {
        logError && console.error(`First argument ${obj} must be an object.`);
        return false;
      }
      if (!isFunc5.isFunc(predicate)) {
        logError && console.error(`Second argument ${predicate}, must a function`);
        return false;
      }
      return pipeline.pipeline(obj, Object.entries, (entries) => entries.some(([key, value]) => predicate(key, value)));
    };
    var filterObj = (obj, predicate, logError = true) => {
      if (!isObj5.isObj(obj)) {
        logError && console.error(`First argument ${obj} must be an object.`);
        return obj;
      }
      if (!isFunc5.isFunc(predicate)) {
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
      return isObj5.isObj(obj) ? reduceObj.reduceObj(obj, (key, _, updated) => {
        exists6.exists(compareKeys.find((k) => exists6.exists(k) && toStr3.toStr(k) === key)) ? updated[0][key] = obj[key] : updated[1][key] = obj[key];
        return updated;
      }, intersect) : intersect;
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
    exports.omitKeys = omitKeys;
    exports.pickKeys = pickKeys;
    exports.sanitizeCopy = sanitizeCopy;
    exports.someEntry = someEntry;
    exports.splitByKeys = splitByKeys;
    exports.toObj = toObj;
    exports.trimStringFields = trimStringFields;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/wait-8ca88995.js
var require_wait_8ca88995 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/wait-8ca88995.js"(exports) {
    "use strict";
    var isObj5 = require_isObj_6b3aa807();
    var isFunc5 = require_isFunc_f93803cb();
    var promisify = (method) => {
      if (!isFunc5.isFunc(method))
        throw `Argument must be a function`;
      return (...args) => {
        return new Promise((res, rej) => {
          if (!isFunc5.isFunc(args[args.length - 1]))
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
          if (isFunc5.isFunc(object[prop]))
            object[`${prop}Async`] = promisify(object[prop]);
          else {
            const getValue = Object.getOwnPropertyDescriptor(object, prop).get;
            if (isFunc5.isFunc(getValue))
              object[`${prop}Async`] = promisify(getValue);
          }
        }
        object.__IS_PROMISIFIED__ = true;
      }
      return object;
    };
    var promisifyAll = (object) => {
      if (!isObj5.isObj(object))
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

// node_modules/@keg-hub/jsutils/build/cjs/joinRegex-431148e2.js
var require_joinRegex_431148e2 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/joinRegex-431148e2.js"(exports) {
    "use strict";
    var isStr5 = require_isStr_8a57710e();
    var isArr4 = require_isArr_39234014();
    require_validate_23297ec2();
    require_noOps_c9732e8e();
    var not = require_not_16fa9c85();
    var getRegexSource = (maybeRx) => not.isRegex(maybeRx) ? maybeRx.source : isStr5.isStr(maybeRx) ? maybeRx : null;
    var parseArgs = (args) => {
      if (isArr4.isArr(args[0]))
        return [args[0], args[1]];
      const last = args[args.length - 1];
      const options = isStr5.isStr(last) ? last : void 0;
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

// node_modules/@keg-hub/jsutils/build/cjs/getWordEndingAt-63d038a5.js
var require_getWordEndingAt_63d038a5 = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/getWordEndingAt-63d038a5.js"(exports) {
    "use strict";
    var isStr5 = require_isStr_8a57710e();
    var isFunc5 = require_isFunc_f93803cb();
    var isQuoted2 = require_isQuoted_eb6994da();
    var toStr$1 = require_toStr_8e499966();
    var isNonNegative = require_isNonNegative_9959647c();
    var isArr4 = require_isArr_39234014();
    var isColl = require_isColl_5757310a();
    var get4 = require_get_00626335();
    var buildPath = (...args) => {
      const built = args.reduce((path, arg) => {
        let str = toStr(arg);
        return `${path}${str && "/" + str || ""}`;
      }, "");
      return built.replace(/([^:\/]|^)\/{2,}/g, "$1/");
    };
    var mapString = (str, charMapper) => {
      if (!isStr5.isStr(str))
        return str;
      if (!isFunc5.isFunc(charMapper))
        return str;
      let result = "";
      for (const char of str) {
        result += charMapper(char);
      }
      return result;
    };
    var delimitString = (str, delimiter, delimiters = ["-", "_", " "]) => {
      if (!isStr5.isStr(str))
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
    var capitalize5 = (str, lowercaseTail = true) => {
      if (!isStr5.isStr(str) || !str[0])
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
        cased += (index > 0 || compCase) && capitalize5(word) || word.toLowerCase();
        return cased;
      }, "") || str;
    };
    var camelCasePath = (path) => {
      const split = path.split(".");
      const camelCasedSplit = split.map((str, idx) => idx > 0 ? capitalize5(str, false) : str);
      return camelCasedSplit.length > 1 ? camelCasedSplit.join("") : path;
    };
    var containsStr = (str, substring, fromIndex) => {
      str = !isStr5.isStr(str) && toStr$1.toStr(str) || str;
      substring = !isStr5.isStr(substring) && toStr$1.toStr(substring) || substring;
      return str.indexOf(substring, fromIndex) !== -1;
    };
    var eitherStr = (str1, str2) => isStr5.isStr(str1) && str1 || str2;
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
    var hashString = (str, maxLength) => {
      if (!isStr5.isStr(str) || str.length == 0)
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
      if (!isStr5.isStr(str))
        return str;
      const cased = camelCase(str);
      return `${cased[0].toLowerCase()}${cased.slice(1)}`;
    };
    var trainCase = (str) => isStr5.isStr(str) && str.split(/(?=[A-Z])|[\s_-]/gm).join("-").toLowerCase() || str;
    var wordCaps = (str) => {
      if (!isStr5.isStr(str))
        return str;
      let cleaned = cleanStr(str);
      return cleaned.split(" ").map((word) => word && capitalize5(word) || "").join(" ");
    };
    var spaceJoin = (original, toAdd) => {
      toAdd = isArr4.isArr(toAdd) ? toAdd : [toAdd];
      return toAdd.reduce((joined, item) => {
        return isStr5.isStr(item) ? `${joined ? joined + " " : ""}${item}`.trim() : joined;
      }, isStr5.isStr(original) ? original : "");
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
      return isStr5.isStr(tempStr) ? tempStr.replace(regex, (match, exact) => {
        const path = (exact || match.substr(2, match.length - 3)).trim();
        const replaceWith = get4.get(data, path, fallback);
        return isFunc5.isFunc(replaceWith) ? replaceWith(data, path, fallback) : replaceWith;
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
      if (!isStr5.isStr(str))
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
    exports.capitalize = capitalize5;
    exports.cleanStr = cleanStr;
    exports.containsStr = containsStr;
    exports.delimitString = delimitString;
    exports.eitherStr = eitherStr;
    exports.getNearestDelimiterIndex = getNearestDelimiterIndex;
    exports.getWordEndingAt = getWordEndingAt2;
    exports.getWordStartingAt = getWordStartingAt;
    exports.hashString = hashString;
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

// node_modules/@keg-hub/jsutils/build/cjs/getURLParam-201ef5fe.js
var require_getURLParam_201ef5fe = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/getURLParam-201ef5fe.js"(exports) {
    "use strict";
    var reduceObj = require_reduceObj_f41cbf8d();
    var isStr5 = require_isStr_8a57710e();
    var isNum = require_isNum_c7164b50();
    var isBool2 = require_isBool_aa6af74e();
    var isColl = require_isColl_5757310a();
    var isArr4 = require_isArr_39234014();
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
            currentQueryItems[itemSplit[0]] = isArr4.isArr(val) ? val.push(decodeURIComponent(itemSplit[1])) : [val, decodeURIComponent(itemSplit[1])];
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
        const useVal = isStr5.isStr(value) || isNum.isNum(value) || isBool2.isBool(value) ? value : isColl.isColl(value) ? isArr4.isArr(value) ? value.join(",") : JSON.stringify(value) : null;
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
        paramKey: isStr5.isStr
      });
      if (!valid)
        return null;
      const doc = typeof document !== "undefined" ? document : null;
      const search = doc === null || doc === void 0 ? void 0 : (_doc$location = doc.location) === null || _doc$location === void 0 ? void 0 : _doc$location.search;
      return isStr5.isStr(search) ? (_queryToObj$paramKey = (_queryToObj = queryToObj(search)) === null || _queryToObj === void 0 ? void 0 : _queryToObj[paramKey]) !== null && _queryToObj$paramKey !== void 0 ? _queryToObj$paramKey : null : null;
    };
    exports.getURLParam = getURLParam;
    exports.objToQuery = objToQuery;
    exports.queryToObj = queryToObj;
  }
});

// node_modules/@keg-hub/jsutils/build/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/@keg-hub/jsutils/build/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var intersect = require_intersect_77d7e821();
    var ensureArr3 = require_ensureArr_ae68c041();
    var isArr4 = require_isArr_39234014();
    var isBool2 = require_isBool_aa6af74e();
    var toBool = require_toBool_deb350e4();
    var softFalsy = require_softFalsy_3d7ead1c();
    var shallowEqual = require_shallowEqual_eaf2262d();
    var get4 = require_get_00626335();
    var isColl = require_isColl_5757310a();
    var deepEqual3 = require_deepEqual_adba847a();
    var set = require_set_c0a98b21();
    var deepClone = require_deepClone_ae664a21();
    var not = require_not_16fa9c85();
    var either = require_either_81805472();
    var noOps = require_noOps_c9732e8e();
    var isValidDate = require_isValidDate_813b9419();
    var strToType = require_strToType_00c4481f();
    var exists6 = require_exists_c79204b1();
    var log = require_log_37bbfac6();
    var pipeline = require_pipeline_e65bdaae();
    var stackTracePaths = require_stackTracePaths_58b768d2();
    var compareTo = require_compareTo_d69e4abf();
    var isFunc5 = require_isFunc_f93803cb();
    var isNonNegative = require_isNonNegative_9959647c();
    var isInt = require_isInt_94ce4199();
    var isNum = require_isNum_c7164b50();
    var toNum = require_toNum_eeb2e51e();
    var mod = require_mod_31dfe732();
    var splitByKeys = require_splitByKeys_d0160002();
    var deepFreeze2 = require_deepFreeze_d73ccc57();
    var jsonEqual = require_jsonEqual_7e69ef6a();
    var isObj5 = require_isObj_6b3aa807();
    var reduceObj = require_reduceObj_f41cbf8d();
    var wait = require_wait_8ca88995();
    var joinRegex4 = require_joinRegex_431148e2();
    var getWordEndingAt2 = require_getWordEndingAt_63d038a5();
    var isQuoted2 = require_isQuoted_eb6994da();
    var isStr5 = require_isStr_8a57710e();
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
    exports.isArr = isArr4.isArr;
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
    exports.get = get4.get;
    exports.isColl = isColl.isColl;
    exports.deepEqual = deepEqual3.deepEqual;
    exports.isEmptyColl = deepEqual3.isEmptyColl;
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
    exports.exists = exists6.exists;
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
    exports.isFunc = isFunc5.isFunc;
    exports.isNonNegative = isNonNegative.isNonNegative;
    exports.isFloat = isInt.isFloat;
    exports.isInt = isInt.isInt;
    exports.isNegative = isInt.isNegative;
    exports.isPositive = isInt.isPositive;
    exports.equalsNaN = isNum.equalsNaN;
    exports.isNum = isNum.isNum;
    exports.getNums = toNum.getNums;
    exports.toNum = toNum.toNum;
    exports.mod = mod.mod;
    exports.nth = mod.nth;
    exports.toFloat = mod.toFloat;
    exports.toInt = mod.toInt;
    exports.applyToCloneOf = splitByKeys.applyToCloneOf;
    exports.clearObj = splitByKeys.clearObj;
    exports.cloneJson = splitByKeys.cloneJson;
    exports.deepMerge = splitByKeys.deepMerge;
    exports.eitherObj = splitByKeys.eitherObj;
    exports.everyEntry = splitByKeys.everyEntry;
    exports.filterObj = splitByKeys.filterObj;
    exports.hashObj = splitByKeys.hashObj;
    exports.keyMap = splitByKeys.keyMap;
    exports.mapEntries = splitByKeys.mapEntries;
    exports.mapKeys = splitByKeys.mapKeys;
    exports.mapObj = splitByKeys.mapObj;
    exports.omitKeys = splitByKeys.omitKeys;
    exports.pickKeys = splitByKeys.pickKeys;
    exports.sanitizeCopy = splitByKeys.sanitizeCopy;
    exports.someEntry = splitByKeys.someEntry;
    exports.splitByKeys = splitByKeys.splitByKeys;
    exports.toObj = splitByKeys.toObj;
    exports.trimStringFields = splitByKeys.trimStringFields;
    exports.deepFreeze = deepFreeze2.deepFreeze;
    exports.hasOwn = jsonEqual.hasOwn;
    exports.isArrMap = jsonEqual.isArrMap;
    exports.isEntry = jsonEqual.isEntry;
    exports.jsonEqual = jsonEqual.jsonEqual;
    exports.isObj = isObj5.isObj;
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
    exports.isStr = isStr5.isStr;
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

// src/global.ts
var global_exports = {};
__export(global_exports, {
  setParkinGlobals: () => setParkinGlobals
});
module.exports = __toCommonJS(global_exports);

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

// src/matcher/tokens.ts
var import_jsutils6 = __toESM(require_cjs());

// src/utils/helpers.ts
var import_jsutils2 = __toESM(require_cjs());
var getRXMatch = (line, regex, index) => {
  const matching = line.match(regex)[index];
  return matching ? matching.trim() : ` `;
};
var sanitize = (def) => {
  let name = def.match.toString();
  name[0] === "/" && (name = name.substring(1));
  name[0] === "^" && (name = name.substring(1));
  name.charAt(name.length - 1) === "/" && (name = name.slice(0, -1));
  name.charAt(name.length - 1) === "$" && (name = name.slice(0, -1));
  return name.replace(/\(\?:([^\|]+)+\|+([^\)]+)?\)/, "$1");
};
var validateDefinition = (definition, definitions) => {
  return definitions.reduce(
    (validated, def) => {
      if (!validated || def.content === validated.content)
        return false;
      def.uuid === validated.uuid && (validated.uuid = (0, import_jsutils2.uuid)());
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

// src/matcher/paramTypes.ts
var import_jsutils4 = __toESM(require_cjs());

// src/matcher/patterns.ts
var import_jsutils3 = __toESM(require_cjs());
var RX_OPTIONAL = /\w*\([^)]*?\)/;
var RX_ALT = /\s*\S*\/\S*\s*/;
var RX_PARAMETER = /\s*{(.*?)}\s*/;
var RX_EXPRESSION = (0, import_jsutils3.joinRegex)(RX_PARAMETER, RX_OPTIONAL, "g");
var RX_ANY = /(.*)/;
var RX_MATCH_REPLACE = /{|}/g;
var RX_DOUBLE_QUOTED = /"[^"]+"/;
var RX_SINGLE_QUOTED = /'[^']+'/;
var RX_FLOAT = /-?[0-9]+[.][0-9]+/;
var RX_INT = /-?[0-9]+/;
var RX_WORLD = /^["]?\$world\.\S+["]?/;
var RX_WORLD_REPLACE = /^\$world\./;
var RX_WORLD_MATCH = /(\$:world|\$world)+\.[^"'\s]*/gm;
var RX_ALIAS = /^["]?\$\$\S+["]?/;
var RX_ALIAS_REPLACE = /^\$\$/;
var RX_ALIAS_MATCH = /(\$\$:\w+|\$\$\w+)[^"'\s]*/gm;

// src/utils/errors.ts
var testMethodFill = (type) => {
  return () => {
    throw new Error(
      `Test method ${type} does not exist on the global scope.
Please ensure ${type} exists before calling the run method!
`
    );
  };
};
var throwMissingSteps = () => {
  throw new Error(
    `Runner class constructor requires an instance of the Steps class`
  );
};
var throwMissingHooks = (found) => {
  throw new Error(
    `Runner class constructor requires an instance of the Hooks class. Found: ${found}`
  );
};
var throwMissingFeatureText = () => {
  throw new Error(
    `Runner class requires feature text when calling the run method`
  );
};
var throwNoMatchingStep = (text) => {
  throw new ReferenceError(text);
};
var throwParamTypeExists = (name) => {
  throw new Error(`Cannot register param type "${name}". It already exists!`);
};
var throwFeatureNotAnObj = (feature) => {
  throw new Error(`Assemble feature requires an object matching the feature model spec!`);
};
var throwMissingWorldValue = (arg) => {
  throw new Error(
    `Can not replace ${arg} with value from $world, it does not exist on the world object`
  );
};
var throwInvalidHookType = (hookTypes, type) => {
  throw new Error(
    [
      `Expected client hook type to be one of ', ${hookTypes}.`,
      `Found: ${type}`
    ].join("\n")
  );
};
var throwWorldReplace = (err, currentMatch) => {
  console.error(
    `Error replacing $world value in feature text. Current match was ${currentMatch}`
  );
  throw err;
};
var throwAliasReplace = (err, currentMatch) => {
  console.error(
    `Error replacing $$alias ( $world.$alias ) in feature text. Current match was ${currentMatch}`
  );
  throw err;
};

// src/matcher/paramTypes.ts
var { WORLD_KEY, ALIAS_WORLD_KEY, ALIAS_REF } = constants;
var mergeRegex = import_jsutils4.joinRegex;
var checkWorldValue = (func, type) => {
  return (arg, $world) => {
    const hasWorldVal = arg.match(RX_WORLD);
    const hasAliasVal = arg.match(RX_ALIAS);
    if (!(0, import_jsutils4.isObj)($world) || !hasWorldVal && !hasAliasVal)
      return matchType(func(arg, $world), type);
    const worldVal = hasWorldVal ? (0, import_jsutils4.get)($world, removeQuotes(arg).replace(`${WORLD_KEY}.`, "")) : (0, import_jsutils4.get)(
      $world,
      removeQuotes(arg).replace(`${ALIAS_REF}`, `${ALIAS_WORLD_KEY}.`)
    );
    return (0, import_jsutils4.exists)(worldVal) ? matchType(worldVal, type) : hasWorldVal ? throwMissingWorldValue(arg) : matchType(func(arg, $world), type);
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
      return !(0, import_jsutils4.isQuoted)(arg) ? (0, import_jsutils4.toStr)(arg) : void 0;
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
      return (0, import_jsutils4.equalsNaN)(result) ? void 0 : result;
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
      return (0, import_jsutils4.equalsNaN)(result) || arg.includes(`.`) ? void 0 : result;
    }, `number`)
  },
  string: {
    ...typeModel,
    name: `string`,
    regex: mergeRegex(RX_DOUBLE_QUOTED, RX_SINGLE_QUOTED),
    partial: mergeRegex(RX_DOUBLE_QUOTED, RX_SINGLE_QUOTED, /{string}/),
    transformer: checkWorldValue((arg) => {
      return (0, import_jsutils4.isQuoted)(arg) ? removeQuotes(arg) : void 0;
    }, typeModel.type)
  }
};
var getParamTypes = () => __paramTypes;
var registerParamType = (model = import_jsutils4.noOpObj, key = model.name) => {
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
    return (0, import_jsutils4.checkCall)(paramType.transformer, item, $world);
  }).filter(import_jsutils4.exists);
};

// src/matcher/regex.ts
var import_jsutils5 = __toESM(require_cjs());
var matchRegex = (definition, text) => {
  const match = text.match(new RegExp(definition.match));
  return match ? { definition, match: match.slice(1, match.length).filter(Boolean) } : import_jsutils5.emptyObj;
};
var toAlternateRegex = (optional) => {
  const split = optional.split(/(\(|\))/);
  const [start, , middle, , end] = split;
  if (start === "" && end === "")
    return optional + "?";
  else if (start === "")
    return `(${middle}|${middle}${end})`;
  else if (end === "")
    return `(${start}|${start}${middle})`;
  else
    return `(${start}${end}|${start}${middle}${end})`;
};
var getFullOptionalText = (matchArr) => {
  const text = matchArr.input;
  const precedingWord = (0, import_jsutils5.getWordEndingAt)(text, matchArr.index);
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
  return (0, import_jsutils5.isStr)(refEx) ? refEx : refEx.source;
};
var getAlternateRegex = (value) => {
  return `(${value.trim().replace(/\//g, "|")})`;
};
var getMatchRegex = (type, matchArr, opts) => {
  const [val, paramType] = matchArr;
  switch (type) {
    case "parameter":
      return new RegExp(getParamRegex(paramType, opts == null ? void 0 : opts.partial));
    case "optional":
      return new RegExp(getOptionalRegex(matchArr));
    case "alternate":
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
    ...type === "parameter" && {
      paramType: val.trim().replace(RX_MATCH_REPLACE, "")
    }
  };
};
var getRegexParts = (defMatcher, opts = import_jsutils5.emptyObj) => {
  const parameters = [
    ...defMatcher.matchAll(new RegExp(RX_PARAMETER, "gi"))
  ].map((match) => parseMatch(match, "parameter", opts));
  const optionals = [...defMatcher.matchAll(new RegExp(RX_OPTIONAL, "gi"))].map(
    (match) => parseMatch(match, "optional", opts)
  );
  const alts = [...defMatcher.matchAll(new RegExp(RX_ALT, "gi"))].map(
    (match) => parseMatch(match, "alternate", opts)
  );
  const sortedExpressions = [...parameters, ...optionals, ...alts].sort(
    (matchA, matchB) => matchA.index - matchB.index
  );
  return sortedExpressions;
};

// src/matcher/tokens.ts
var tokenRegex = (0, import_jsutils6.joinRegex)(
  RX_INT,
  // @ts-ignore
  RX_FLOAT,
  RX_PARAMETER,
  RX_DOUBLE_QUOTED,
  RX_SINGLE_QUOTED,
  "g"
);
var tokenizeStep = (step, def, opts) => {
  const parts = getRegexParts(def.match, opts);
  const tokens = [];
  let match;
  let idx = 0;
  while ((match = tokenRegex.exec(step)) !== null) {
    const [val, __, ...rest] = match;
    let type = rest.pop();
    const part = parts[idx];
    const trimmed = val.trimStart();
    const diff = val.length - trimmed.length;
    tokens.push({
      match: val.trim(),
      defIndex: part == null ? void 0 : part.index,
      index: match.index + diff,
      type: type || (part == null ? void 0 : part.paramType) || `any`
    });
    idx++;
  }
  return tokens;
};

// src/matcher/matcher.ts
var import_jsutils9 = __toESM(require_cjs());

// src/utils/globalScope.ts
var import_jsutils7 = __toESM(require_cjs());
var hasWindow = Boolean(typeof window !== "undefined");
var hasGlobal = Boolean(typeof globalThis !== "undefined");
var hasModule = Boolean(typeof module === "object");
var hasRequire = Boolean(typeof require === "function");
var hasJasmine = Boolean(
  hasGlobal && typeof globalThis.jasmine !== "undefined"
);
var resolveJasmine = () => hasJasmine ? (0, import_jsutils7.checkCall)(() => globalThis.jasmine) : { getEnv: () => import_jsutils7.noOpObj };
var resolveModule = () => hasModule ? (0, import_jsutils7.checkCall)(() => module) : { exports: {} };
var resolveRequire = () => hasRequire ? (0, import_jsutils7.checkCall)(() => require) : import_jsutils7.noOp;
var resolveGlobalObj = () => {
  try {
    return hasWindow ? (0, import_jsutils7.checkCall)(() => window) : hasGlobal ? (0, import_jsutils7.checkCall)(() => globalThis) : import_jsutils7.noOpObj;
  } catch (err) {
    return import_jsutils7.noOpObj;
  }
};

// src/matcher/expression.ts
var import_jsutils8 = __toESM(require_cjs());
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
    const replace = (0, import_jsutils8.isFunc)(replaceWith) ? replaceWith(...args) : replaceWith;
    regexStr = `${startStr}${startSl}${replace}${endSl.join(match)}`;
  });
  return regexStr;
};
var convertToRegex = (match, opts = import_jsutils8.emptyObj) => {
  const paramTypes = getParamTypes();
  const transformers = [];
  const regex = runRegexCheck(
    match,
    RX_EXPRESSION,
    // RX_PARAMETER,
    (val, ...args) => {
      const type = val.trim().replace(RX_MATCH_REPLACE, "");
      const isParameter = val.match(RX_PARAMETER);
      const isOptional = val.match(RX_OPTIONAL);
      isParameter && transformers.push(paramTypes[type] || paramTypes.any);
      return isParameter ? getParamRegex(type, opts == null ? void 0 : opts.partial) : isOptional ? toAlternateRegex(val) : val;
    }
  );
  return { regex, transformers };
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
var extractParameters = (text, stepMatcher, wordMatches, opts = import_jsutils8.emptyObj) => {
  const parts = getRegexParts(stepMatcher);
  const expectedParamLength = parts.filter(
    (part) => part.type === "parameter"
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
      part.type === "parameter" && match && params.push(match[0]);
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
var findAsRegex = (definition, text, opts = import_jsutils8.emptyObj) => {
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
var matchExpression = (definition, text, $world, opts = import_jsutils8.emptyObj) => {
  if (definition.match === text)
    return { definition, match: [] };
  const { found, transformers } = findAsRegex(definition, text, opts);
  if (!found || !found.definition || !found.match)
    return import_jsutils8.emptyObj;
  const params = extractParameters(
    text,
    definition.match,
    found.match,
    opts
  );
  if (!params)
    return import_jsutils8.emptyObj;
  const converted = convertTypes(params, transformers, $world);
  return converted.length !== params.length ? import_jsutils8.emptyObj : { definition, match: converted };
};

// src/matcher/matcher.ts
var { REGEX_VARIANT } = constants;
var Matcher = class {
  parkin;
  options = import_jsutils9.emptyObj;
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
    const defs = definitions || ((_c = (_b = (_a = this.parkin) == null ? void 0 : _a.steps) == null ? void 0 : _b.list) == null ? void 0 : _c.call(_b)) || import_jsutils9.emptyArr;
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
  expression = (def, text, $world, opts = import_jsutils9.emptyObj) => {
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
  expressionFind = (def, text, opts = import_jsutils9.emptyObj) => findAsRegex(
    def,
    text,
    opts || this.options
  );
  regex = matchRegex;
  types = getParamTypes;
  register = registerParamType;
};
var matcher = (definitions, text, $world, opts = import_jsutils9.emptyObj) => {
  return definitions.reduce((found, definition) => {
    return found.match || !definition.match ? found : definition.variant !== REGEX_VARIANT ? matchExpression(definition, text, $world, opts) : matchRegex(definition, text);
  }, import_jsutils9.emptyObj);
};

// src/steps.ts
var import_jsutils10 = __toESM(require_cjs());
var import_jsutils11 = __toESM(require_cjs());
var { REGEX_VARIANT: REGEX_VARIANT2, EXPRESSION_VARIANT, STEP_TYPES } = constants;
var getContent = (def) => {
  const match = def.variant === REGEX_VARIANT2 ? def.match.toString() : `"${def.match}"`;
  return `${(0, import_jsutils11.capitalize)(def.type)}(${match}, ${def.method.toString()})`;
};
var stringToRegex = (str) => {
  const main = str.match(/\/(.+)\/.*/)[1];
  const options = str.match(/\/.+\/(.*)/)[1];
  return new RegExp(main, options);
};
var registerFromCall = function(internalType, type, match, method, meta = import_jsutils11.noOpObj) {
  const variant = match.toString().indexOf("/") === 0 ? REGEX_VARIANT2 : EXPRESSION_VARIANT;
  const formattedMatch = variant === REGEX_VARIANT2 ? stringToRegex(match.toString()) : match.toString();
  const definition = {
    type,
    meta,
    method,
    variant,
    // TODO: add token parsing
    tokens: [],
    match: formattedMatch
  };
  definition.name = sanitize(definition);
  definition.content = getContent(definition);
  definition.uuid = (0, import_jsutils10.uuid)();
  const definitions = this.list();
  const newDefinition = validateDefinition(definition, definitions);
  newDefinition && this[internalType].push(newDefinition);
  return newDefinition;
};
var tempRegister = (parent, type, container) => {
  return (...args) => {
    const definition = parent[type](...args);
    container[type].push(definition);
    return definition;
  };
};
var registerFromParse = function(definitions) {
  const DEF_TYPES = this.types.map((type) => (0, import_jsutils11.capitalize)(type));
  const container = DEF_TYPES.reduce((built, type) => {
    built[type] = [];
    return built;
  }, {});
  (0, import_jsutils11.eitherArr)(definitions, [definitions]).map((definition) => {
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
var joinAllSteps = (instance) => {
  return instance.types.reduce(
    (stepDefs, type) => stepDefs.concat(instance[`_${type}`]),
    []
  );
};
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
      this[(0, import_jsutils11.capitalize)(type)] = (match, method, meta) => {
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
    return joinAllSteps(this);
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
  match = (text) => {
    const list = this.list();
    const found = matcher(list, text, this._world);
    if (!found.match || !found.definition)
      return false;
    found.match.push(this._world);
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
  resolve = (text) => {
    const found = this.match(text);
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
    return (0, import_jsutils11.isStr)(args[0]) ? registerFromCall.apply(this, args) : registerFromParse.apply(this, args);
  };
  add = (...defs) => {
    const definitions = this.list();
    defs.forEach((def) => {
      const defsObj = (0, import_jsutils11.isArr)(def) || (def == null ? void 0 : def.match) && (def == null ? void 0 : def.uuid) ? (0, import_jsutils11.ensureArr)(def) : def;
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
var import_jsutils12 = __toESM(require_cjs());
var { HOOK_TYPES } = constants;
var Hooks = class {
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
        if (!(0, import_jsutils12.isFunc)(clientHookFn))
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
    const foundHooks = this.types.includes(type) ? this._registeredHooks[type] || import_jsutils12.noPropArr : throwInvalidHookType(HOOK_TYPES.join(", "), type);
    if (!foundHooks)
      return;
    return foundHooks.length ? async () => {
      return foundHooks.reduce(async (toResolve, hook) => {
        await toResolve;
        return await hook(this.instance);
      }, Promise.resolve());
    } : import_jsutils12.noOp;
  };
};

// src/parse/parseStep.ts
var import_jsutils13 = __toESM(require_cjs());
var RX_STEP = /^\s*Step (.*)$/;
var RX_GIVEN = /^\s*Given (.*)$/;
var RX_WHEN = /^\s*When(.*)$/;
var RX_THEN = /^\s*Then (.*)$/;
var RX_AND = /^\s*And (.*)$/;
var RX_BUT = /^\s*But (.*)$/;
var RX_ASTERISK = /^\s*\* (.*)$/;
var RX_DOC_QUOTES = /^\s*?"""\s*?/;
var RX_DOC_TICKS = /^\s*?```\s*?/;
var RX_DATA_TABLE = /^\s*?\|/;
var RegStepTags = [
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
    type: docMatch === `"""` ? "quote" : "tick",
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
var stepFactory = (type, stepText, lines, line, index) => {
  let step = {
    type,
    index,
    step: stepText,
    whitespace: getStartWhiteSpace(line),
    uuid: (0, import_jsutils13.uuid)()
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
  return RegStepTags.reduce((added, regTag) => {
    if (added)
      return added;
    const hasTag = regTag.regex.test(line);
    hasTag && stepParent.steps.push(
      stepFactory(
        regTag.type,
        getRXMatch(line, regTag.regex, 1),
        lines,
        line,
        index
      )
    );
    return hasTag;
  }, false);
};

// src/parse/parseFeature.ts
var import_jsutils20 = __toESM(require_cjs());

// src/utils/worldReplace.ts
var import_jsutils14 = __toESM(require_cjs());
var {
  ALIAS_REF: ALIAS_REF2,
  WORLD_REF,
  ALIAS_WORLD_KEY: ALIAS_WORLD_KEY2,
  WORLD_AT_RUNTIME,
  ALIAS_REF_AT_RUNTIME
} = constants;
var attemptReplace = (match, world, location) => {
  const replaceWith = (0, import_jsutils14.get)(world, location);
  return (0, import_jsutils14.isFunc)(replaceWith) ? replaceWith(world, location) : (0, import_jsutils14.exists)(replaceWith) ? replaceWith : match;
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
var replaceWorld = (text, world) => {
  return worldReplace(aliasReplace(text, world), world);
};

// src/parse/parseHelpers.ts
var RX_FEATURE = /^\s*Feature:(.*)$/;
var RX_RULE = /^\s*Rule:(.*)$/;
var RX_SCENARIO = /^\s*Scenario:(.*)$/;
var RX_EXAMPLE = /^\s*Example:(.*)$/;
var RX_BACKGROUND = /^\s*Background:(.*)$/;
var setActiveParent = (activeParent, feature, rule, scenario, background, line) => {
  return RX_SCENARIO.test(line) || RX_EXAMPLE.test(line) ? scenario : RX_FEATURE.test(line) ? feature : RX_RULE.test(line) ? rule : RX_BACKGROUND.test(line) ? background : activeParent;
};

// src/parse/ensureRule.ts
var import_jsutils15 = __toESM(require_cjs());
var RX_RULE2 = /^\s*Rule:(.*)$/;
var ruleFactory = (rule, index) => {
  return {
    index,
    rule,
    scenarios: [],
    type: "rule" /* rule */,
    // The feature name should always be unique, so use that as a re-usable id
    ...rule && { uuid: (0, import_jsutils15.uuid)() }
  };
};
var ensureRule = (feature, rule, line, index) => {
  if (!RX_RULE2.test(line))
    return rule;
  let ruleText = getRXMatch(line, RX_RULE2, 1);
  !rule.rule ? rule.rule = ruleText : rule = ruleFactory(ruleText, index);
  !rule.index && (rule.index = index);
  !rule.uuid && (rule.uuid = (0, import_jsutils15.uuid)());
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
var import_jsutils16 = __toESM(require_cjs());
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
    // The feature name should always be unique, so use that as a re-usable id
    ...feature && { uuid: (0, import_jsutils16.uuid)() }
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
      feature.uuid = (0, import_jsutils16.uuid)();
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
var scenarioFactory = (scenario, index) => {
  return {
    index,
    scenario,
    steps: [],
    type: "scenario" /* scenario */,
    ...scenario && { uuid: (0, import_jsutils17.uuid)() }
  };
};
var ensureScenario = (feature, rule, scenario, line, index) => {
  const hasScenario = RX_SCENARIO2.test(line);
  const hasExample = RX_EXAMPLE2.test(line);
  if (!hasScenario && !hasExample)
    return scenario;
  const scenarioText = hasScenario ? getRXMatch(line, RX_SCENARIO2, 1) : getRXMatch(line, RX_EXAMPLE2, 1);
  !(0, import_jsutils17.exists)(scenario.scenario) ? scenario.scenario = scenarioText : scenario = scenarioFactory(scenarioText, index);
  !scenario.index && (scenario.index = index);
  !scenario.uuid && (scenario.uuid = (0, import_jsutils17.uuid)());
  scenario.whitespace = getStartWhiteSpace(line);
  if (!hasScenario)
    scenario.alias = "Example" /* Example */;
  const parent = rule.uuid && scenario.whitespace > rule.whitespace ? rule : feature;
  !parent.scenarios.includes(scenario) && parent.scenarios.push(scenario);
  return scenario;
};

// src/parse/ensureBackground.ts
var import_jsutils18 = __toESM(require_cjs());
var RX_BACKGROUND2 = /^\s*Background:(.*)$/;
var backgroundFactory = (background, index) => {
  return {
    index,
    steps: [],
    background,
    type: "background" /* background */,
    ...background && { uuid: (0, import_jsutils18.uuid)() }
  };
};
var ensureBackground = (feature, rule, background, line, index) => {
  if (!RX_BACKGROUND2.test(line))
    return background;
  const existingBgText = getRXMatch(line, RX_BACKGROUND2, 1);
  const parent = (rule == null ? void 0 : rule.uuid) ? rule : feature;
  const backgroundText = (0, import_jsutils18.isStr)(existingBgText) ? existingBgText.trim() : "";
  (0, import_jsutils18.isBool)(background.background) ? background.background = backgroundText : background = backgroundFactory(backgroundText, index);
  !background.index && (background.index = index);
  !background.uuid && (background.uuid = (0, import_jsutils18.uuid)());
  background.whitespace = getStartWhiteSpace(line);
  parent.background = background;
  return background;
};

// src/parse/ensureMeta.ts
var import_jsutils19 = __toESM(require_cjs());
var RX_TAG = /^\s*@(.*)$/;
var RX_AS = /^\s*As (.*)$/;
var RX_COMMENT = /^\s*#(.*)$/;
var RX_I_WANT = /^\s*I want (.*)$/;
var RX_SO_THAT = /^\s*So that (.*)$/;
var RX_IN_ORDER = /^\s*In order (.*)$/;
var featureMetaTags = [
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
    uuid: (0, import_jsutils19.uuid)(),
    content: reason,
    type: "reason" /* reason */,
    whitespace: getStartWhiteSpace(line)
  });
  feature.reason = reasonArr;
};
var featureMeta = (feature, line, index) => {
  let metaAdded = false;
  featureMetaTags.reduce((added, regTag) => {
    if (added)
      return added;
    const hasTag = regTag.regex.test(line);
    if (!metaAdded && hasTag)
      metaAdded = true;
    return hasTag ? regTag.key !== "reason" /* reason */ ? feature[regTag.key] = {
      index,
      uuid: (0, import_jsutils19.uuid)(),
      whitespace: getStartWhiteSpace(line),
      content: getRXMatch(line, regTag.regex, 0),
      type: regTag.key === "desire" /* desire */ ? "desire" /* desire */ : regTag.key === "perspective" /* perspective */ ? "perspective" /* perspective */ : "block" /* block */
    } : addReason(feature, getRXMatch(line, regTag.regex, 0), line, index) : hasTag;
  }, false);
  return metaAdded;
};
var tagsFactory = (index, content, line) => {
  const tokens = content.split(` `).reduce((acc, item) => {
    const token = item.trim();
    token.startsWith(`@`) && acc.push(token);
    return acc;
  }, []);
  return {
    index,
    tokens,
    uuid: (0, import_jsutils19.uuid)(),
    type: "tags" /* tags */,
    content: tokens.join(` `),
    whitespace: getStartWhiteSpace(line)
  };
};
var checkTag = (parent, feature, line, index) => {
  if (!RX_TAG.test(line))
    return false;
  const tagParent = (parent == null ? void 0 : parent.background) ? feature : parent;
  const tags = getRXMatch(line, RX_TAG, 0);
  tagParent.tags = tagsFactory(index, tags, line);
  tagParent.tags.whitespace = getStartWhiteSpace(line);
  return true;
};
var featureComment = (feature, line, index) => {
  if (!RX_COMMENT.test(line))
    return false;
  const comment = line.match(RX_COMMENT)[0];
  feature.comments.push({
    index,
    uuid: (0, import_jsutils19.uuid)(),
    content: comment.trim(),
    type: "comment" /* comment */,
    whitespace: getStartWhiteSpace(line)
  });
  return true;
};
var featureEmptyLine = (feature, line, index) => {
  if (line.trim().length)
    return false;
  feature.empty.push({
    index,
    uuid: (0, import_jsutils19.uuid)(),
    content: line,
    whitespace: ``,
    type: "empty" /* empty */
  });
  return true;
};

// src/parse/parseFeature.ts
var RX_NEWLINE = /\r?\n/g;
var parseFeature = function(text, world) {
  world = world || this && this.world || import_jsutils20.noOpObj;
  const features = [];
  const replaceText = replaceWorld((text || "").toString(), world);
  const lines = replaceText.split(RX_NEWLINE);
  let parseError2 = false;
  let rule = ruleFactory(false);
  let scenario = scenarioFactory(false);
  let background = backgroundFactory(false);
  let feature = featureFactory(false, text);
  let activeParent = feature;
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
    if (`steps` in activeParent && parseStep(activeParent, lines, line, index))
      return featuresGroup;
    activeParent = setActiveParent(
      activeParent,
      feature,
      rule,
      scenario,
      background,
      line
    );
    checkTag(activeParent, feature, line, index);
    return featuresGroup;
  }, features);
};

// src/parse/parseDefinition.ts
var parseDefinition = function(text) {
  const registered = this.steps.register([text]);
  return registered;
};

// src/utils/testMethods.ts
var import_jsutils21 = __toESM(require_cjs());
var { SPEC_RESULT_LOG, LOG_JEST_SPEC_ENV } = constants;
var logResultToTerminal = (result) => {
  const timestamp = (/* @__PURE__ */ new Date()).getTime();
  (0, import_jsutils21.get)(process, `env.${LOG_JEST_SPEC_ENV}`) && process.stdout.write(
    [
      SPEC_RESULT_LOG,
      JSON.stringify({ ...result, timestamp }),
      SPEC_RESULT_LOG
    ].join(``)
  );
};
var getSuiteData = (suite) => {
  const description = (0, import_jsutils21.get)(suite, `description`);
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
  return testMode ? import_jsutils21.noOp : globalThis[type] || testMethodFill(type);
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
var import_jsutils22 = __toESM(require_cjs());
var buildTitle = (text, type) => {
  return `${(0, import_jsutils22.capitalize)(type)} > ${text}`;
};
var resolveFeatures = (data, $world) => {
  return (0, import_jsutils22.isStr)(data) ? parseFeature(data, $world) : (0, import_jsutils22.isObj)(data) ? [data] : (0, import_jsutils22.isArr)(data) ? data.reduce(
    (features, feature) => features.concat(resolveFeatures(feature, $world)),
    []
  ) : throwMissingFeatureText();
};
var runStep = async (stepsInstance, step, testMode) => {
  const test = getTestMethod("test" /* test */, testMode);
  test(`${(0, import_jsutils22.capitalize)(step.type)} ${step.step}`, async () => {
    return await stepsInstance.resolve(step.step);
  });
};
var loopSteps = (parent, title, stepsInstance, testMode) => {
  const describe2 = getTestMethod("describe" /* describe */, testMode);
  let responses = [];
  describe2(title, () => {
    const responses2 = parent.steps.map(
      (step) => runStep(stepsInstance, step, testMode)
    );
    Promise.all(responses2);
  });
  return responses;
};
var runScenario = (stepsInstance, scenario, background, testMode) => {
  const responses = [];
  background && responses.push(
    ...runBackground(stepsInstance, scenario.scenario, background, testMode)
  );
  return responses.concat(
    loopSteps(
      scenario,
      buildTitle(scenario.scenario, `Scenario`),
      stepsInstance,
      testMode
    )
  );
};
var runBackground = (stepsInstance, title, background, testMode) => {
  return loopSteps(
    background,
    buildTitle(title, `Background`),
    stepsInstance,
    testMode
  );
};
var runRule = (stepsInstance, rule, background, testMode) => {
  let responses = [];
  describe(`Rule > ${rule.rule}`, () => {
    background && responses.push(
      ...responses.concat(
        runBackground(stepsInstance, rule.rule, background, testMode)
      )
    );
    responses.push(
      ...rule.scenarios.map(
        (scenario) => runScenario(stepsInstance, scenario, rule.background, testMode)
      )
    );
    Promise.all(responses);
  });
  return responses;
};
var parseFeatureTags = (tags) => {
  return (0, import_jsutils22.isStr)(tags) ? tags.match(/[@]\w*/g) : (0, import_jsutils22.isArr)(tags) ? tags : import_jsutils22.emptyArr;
};
var itemMatch = (name = "", tags = import_jsutils22.emptyArr, filterOptions = import_jsutils22.emptyObj) => {
  const {
    name: filterName,
    tags: filterTags
  } = filterOptions;
  const parsedTags = (0, import_jsutils22.isStr)(filterTags) ? parseFeatureTags(filterTags) : (0, import_jsutils22.eitherArr)(filterTags, []);
  const nameMatch = !filterName || name.includes(filterName);
  const tagMatch = !parsedTags.length || parsedTags.every((clientTag) => tags.includes(clientTag));
  return nameMatch && tagMatch;
};
var filterFeatures = (features, filterOptions = import_jsutils22.emptyObj) => {
  return features.reduce((filtered, feature) => {
    var _a;
    const isMatchingFeature = itemMatch(
      feature.feature,
      (_a = feature == null ? void 0 : feature.tags) == null ? void 0 : _a.tokens,
      filterOptions
    );
    if (isMatchingFeature) {
      filtered.push(feature);
      return filtered;
    }
    const matchingScenarios = feature.scenarios.filter(
      (scenario) => {
        var _a2, _b;
        return itemMatch(
          scenario.scenario,
          [...((_a2 = scenario == null ? void 0 : scenario.tags) == null ? void 0 : _a2.tokens) || import_jsutils22.emptyArr, ...((_b = feature == null ? void 0 : feature.tags) == null ? void 0 : _b.tokens) || import_jsutils22.emptyArr],
          filterOptions
        );
      }
    );
    if (matchingScenarios.length) {
      filtered.push({
        ...feature,
        scenarios: matchingScenarios
      });
    }
    return filtered;
  }, []);
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
  getFeatures = (data, options) => {
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
  run = async (data, options = import_jsutils22.emptyObj) => {
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
    const promises = await features.map(async (feature) => {
      let responses = [];
      beforeAll(this.hooks.getRegistered("beforeAll" /* beforeAll */));
      afterAll(this.hooks.getRegistered("afterAll" /* afterAll */));
      beforeEach(this.hooks.getRegistered("beforeEach" /* beforeEach */));
      afterEach(this.hooks.getRegistered("afterEach" /* afterEach */));
      describe2(buildTitle(feature.feature, `Feature`), () => {
        responses.push(
          ...feature.rules.map(
            (rule) => runRule(this.steps, rule, feature.background, testMode)
          )
        );
        responses.push(
          ...feature.scenarios.map(
            (scenario) => runScenario(this.steps, scenario, feature.background, testMode)
          )
        );
        Promise.all(responses);
      });
      return responses;
    });
    await Promise.all(promises);
    return true;
  };
};

// src/assemble/indexedToString.ts
var import_jsutils23 = __toESM(require_cjs());
var formatAssembled = (assembled) => {
  return Array.from(assembled, (line) => (0, import_jsutils23.exists)(line) ? `${line}
` : "\n").join("");
};
var addContent = (assembled, content, index) => {
  !(0, import_jsutils23.exists)(index) || index === false ? assembled.push(content) : (0, import_jsutils23.exists)(assembled[index]) ? assembled.splice(index, 0, content) : assembled[index] = content;
};
var getWhiteSpace = (ast, parent, def = ``) => {
  return (0, import_jsutils23.exists)(ast.whitespace) ? ast.whitespace : (0, import_jsutils23.exists)(parent == null ? void 0 : parent.whitespace) ? `${parent.whitespace}${def}` : def;
};
var getTextContent = (ast, parent, type, def = ``) => {
  const content = ast[ast.type] || ``;
  const whitespace = getWhiteSpace(ast, parent, def);
  const prefix = `${whitespace}${type}:`;
  return content.length ? `${prefix} ${content}` : prefix;
};
var indexedToString = (indexes) => {
  const assembled = indexes.reduce((assembled2, item, idx) => {
    const { ast, parent } = item;
    const type = item.ast.type;
    switch (type) {
      case "given" /* given */:
      case "when" /* when */:
      case "then" /* then */:
      case "and" /* and */:
      case "but" /* but */:
      case "*" /* * */:
      case "step" /* step */: {
        const step = ast;
        const whitespace = getWhiteSpace(step, parent, `    `);
        const type2 = step.type !== "step" /* step */ ? (0, import_jsutils23.capitalize)(step.type) : `Step`;
        addContent(
          assembled2,
          `${whitespace}${type2} ${step.step || ``}`,
          indexes && step.index
        );
        break;
      }
      case "tags" /* tags */: {
        const tags = ast;
        const whitespace = getWhiteSpace(tags, parent);
        addContent(
          assembled2,
          `${whitespace || ``}${tags.tokens.join(" ")}`,
          indexes && parent.tags.index
        );
        break;
      }
      case "rule" /* rule */: {
        const rule = ast;
        const whitespace = rule.whitespace || `  `;
        addContent(assembled2, `${whitespace}${"Rule" /* Rule */}: ${rule.rule || ``}`, rule.index);
        break;
      }
      case "block" /* block */:
      case "empty" /* empty */:
      case "desire" /* desire */:
      case "reason" /* reason */:
      case "comment" /* comment */:
      case "perspective" /* perspective */: {
        const block = ast;
        const whitespace = getWhiteSpace(block, parent, `  `);
        addContent(assembled2, `${whitespace}${block.content}`, block.index);
        break;
      }
      case "feature" /* feature */: {
        const feature = ast;
        addContent(
          assembled2,
          getTextContent(feature, parent, "Feature" /* Feature */, ``),
          feature.index
        );
        break;
      }
      case "scenario" /* scenario */: {
        const scenario = ast;
        const type2 = scenario.alias || "Scenario" /* Scenario */;
        addContent(
          assembled2,
          getTextContent(scenario, parent, type2, `  `),
          scenario.index
        );
        break;
      }
      case "background" /* background */: {
        const background = ast;
        addContent(
          assembled2,
          getTextContent(background, parent, "Background" /* Background */, `  `),
          background.index
        );
        break;
      }
    }
    return assembled2;
  }, []);
  return formatAssembled(assembled);
};

// src/assemble/feature.ts
var import_jsutils25 = __toESM(require_cjs());

// src/indexes/featureToIndexes.ts
var import_jsutils24 = __toESM(require_cjs());
var indexSteps = (indexes, steps, parent) => {
  steps.forEach((step) => {
    indexes[step.index] = { ast: step, parent };
  });
};
var indexScenario = (indexes, scenarios, parent) => {
  scenarios.forEach((scenario) => {
    indexes[scenario.index] = { ast: scenario, parent };
    scenario.tags && indexTags(indexes, scenario);
    scenario.steps && indexSteps(indexes, scenario.steps, scenario);
  });
};
var indexRules = (indexes, rules, parent) => {
  rules.forEach((rule) => {
    indexes[rule.index] = { ast: rule, parent };
    rule.tags && indexTags(indexes, rule);
    rule.scenarios && indexScenario(indexes, rule.scenarios, rule);
    rule.background && indexBackground(indexes, rule.background, rule);
  });
};
var indexReason = (indexes, reason, parent) => {
  (0, import_jsutils24.isArr)(reason) ? reason.forEach((reason2) => {
    indexes[reason2.index] = { ast: reason2, parent };
  }) : (() => {
    indexes[reason.index] = { ast: reason, parent };
  })();
};
var indexBackground = (indexes, background, parent) => {
  indexes[background.index] = { ast: background, parent };
  background.tags && indexTags(indexes, background);
  (background == null ? void 0 : background.steps) && indexSteps(indexes, background.steps, background);
};
var indexBlocks = (indexes, blocks, type, parent) => {
  blocks.forEach((block) => {
    if (block.type !== type)
      block.type = type;
    indexes[block.index] = { ast: block, parent };
  });
};
var indexTags = (indexes, parent) => {
  var _a;
  const tags = parent == null ? void 0 : parent.tags;
  ((_a = tags == null ? void 0 : tags.tokens) == null ? void 0 : _a.length) && (indexes[tags.index] = { ast: tags, parent });
};
var featureToIndexes = (feature) => {
  const indexes = [];
  (feature == null ? void 0 : feature.tags) && indexTags(indexes, feature);
  indexes[feature.index || indexes.length] = { ast: feature, parent: feature };
  (feature == null ? void 0 : feature.empty) && indexBlocks(
    indexes,
    feature == null ? void 0 : feature.empty,
    "empty" /* empty */,
    feature
  );
  (feature == null ? void 0 : feature.comments) && indexBlocks(
    indexes,
    feature == null ? void 0 : feature.comments,
    "comment" /* comment */,
    feature
  );
  feature.desire && indexBlocks(
    indexes,
    [feature.desire],
    "desire" /* desire */,
    feature
  );
  feature.perspective && indexBlocks(
    indexes,
    [feature.perspective],
    "perspective" /* perspective */,
    feature
  );
  feature.reason && indexReason(
    indexes,
    feature.reason,
    feature
  );
  feature.background && indexBackground(
    indexes,
    feature.background,
    feature
  );
  feature.rules && indexRules(
    indexes,
    feature.rules,
    feature
  );
  feature.scenarios && indexScenario(
    indexes,
    feature.scenarios,
    feature
  );
  return indexes;
};

// src/assemble/feature.ts
var assembleFeature = (toAssemble) => {
  return (0, import_jsutils25.eitherArr)(toAssemble, [toAssemble]).map((feature) => {
    !(0, import_jsutils25.isObj)(feature) && throwFeatureNotAnObj(feature);
    const indexes = featureToIndexes(feature);
    return indexedToString(indexes);
  });
};

// src/assemble/assemble.ts
var assemble = {
  feature: assembleFeature,
  indexedToString
};

// src/indexes/dataMappers.ts
var import_jsutils26 = __toESM(require_cjs());
var dataMappers = {
  empty: (current, updated) => {
    if (!(updated == null ? void 0 : updated.length))
      return !(current == null ? void 0 : current.length) ? current || [] : [];
    if (!(current == null ? void 0 : current.length))
      return updated || [];
    let hasChange = false;
    const empty = updated.map((empty2) => {
      var _a;
      const found = (_a = current == null ? void 0 : current.find) == null ? void 0 : _a.call(current, (st) => st.uuid === empty2.uuid);
      if ((0, import_jsutils26.deepEqual)(found, empty2))
        return found;
      hasChange = true;
      return !found ? empty2 : { ...found, ...empty2 };
    });
    return hasChange ? empty : current || [];
  },
  tags: (current, updated, merge = true) => {
    const uToken = (updated == null ? void 0 : updated.tokens) || [];
    const cToken = (current == null ? void 0 : current.tokens) || [];
    if (!(uToken == null ? void 0 : uToken.length))
      return !merge || !cToken.length ? void 0 : current;
    if (!cToken.length)
      return updated;
    if ((0, import_jsutils26.deepEqual)(current, updated))
      return current;
    const tokens = (0, import_jsutils26.flatUnion)(current == null ? void 0 : current.tokens, updated == null ? void 0 : updated.tokens);
    return {
      ...current,
      ...updated,
      tokens,
      content: tokens.join(` `)
    };
  },
  steps: (current, updated) => {
    if (!(updated == null ? void 0 : updated.length))
      return !(current == null ? void 0 : current.length) ? current || [] : [];
    if (!(current == null ? void 0 : current.length))
      return updated || [];
    let hasChange = false;
    const steps = updated.map((step) => {
      var _a;
      const found = (_a = current == null ? void 0 : current.find) == null ? void 0 : _a.call(current, (st) => st.uuid === step.uuid);
      if ((0, import_jsutils26.deepEqual)(found, step))
        return found;
      hasChange = true;
      return !found ? step : { ...found, ...step };
    });
    return hasChange ? steps : current;
  },
  parentSteps: (current, updated) => {
    if (!current || !updated)
      return updated;
    const { steps: exSteps, tags: exTags, ...exNoSteps } = current;
    const { steps: uSteps, tags: uTags, ...uNoSteps } = updated;
    const tags = dataMappers.tags(exTags, uTags);
    const tagsEql = tags === exTags;
    const steps = dataMappers.steps(exSteps, uSteps);
    const stepsEql = steps === exSteps;
    if (tagsEql && stepsEql && (0, import_jsutils26.deepEqual)(exNoSteps, uNoSteps))
      return current;
    const item = { ...exNoSteps, ...uNoSteps, steps };
    if (tags)
      item.tags = tags;
    return item;
  },
  background: (current, updated) => {
    if (!updated)
      return void 0;
    if (!current)
      return updated;
    return dataMappers.parentSteps(current, updated);
  },
  scenarios: (current, updated) => {
    if (!(updated == null ? void 0 : updated.length))
      return !(current == null ? void 0 : current.length) ? current || [] : [];
    if (!(current == null ? void 0 : current.length))
      return updated || [];
    let hasChange = false;
    const scenarios = updated.map((scenario) => {
      var _a;
      const existing = (_a = current == null ? void 0 : current.find) == null ? void 0 : _a.call(current, (sc) => sc.uuid === scenario.uuid);
      if (!existing) {
        hasChange = true;
        return scenario;
      }
      const mapped = dataMappers.parentSteps(existing, scenario);
      if (!hasChange)
        hasChange = mapped !== existing;
      return mapped;
    }).filter(Boolean);
    return hasChange ? scenarios : current;
  },
  rules: (current, updated) => {
    if (!(updated == null ? void 0 : updated.length))
      return !(current == null ? void 0 : current.length) ? current || [] : [];
    if (!(current == null ? void 0 : current.length))
      return updated || [];
    let hasChange = false;
    const rules = updated.map((rule) => {
      var _a;
      const existing = (_a = current == null ? void 0 : current.find) == null ? void 0 : _a.call(current, (rl) => rl.uuid === rule.uuid);
      if (!existing) {
        hasChange = true;
        return rule;
      }
      const { scenarios: exScenarios, background: exBack, ...exRule } = existing;
      const { scenarios: uScenarios, background: UBack, ...uRule } = rule;
      const background = dataMappers.background(exBack, UBack);
      const backEql = exBack === background;
      const scenarios = dataMappers.scenarios(exScenarios, uScenarios);
      const scenarioEql = scenarios === exScenarios;
      if (scenarioEql && backEql && (0, import_jsutils26.deepEqual)(exRule, uRule))
        return existing;
      hasChange = true;
      const item = { ...exRule, ...uRule, scenarios };
      if (background)
        item.background = background;
      return item;
    });
    return hasChange ? rules : current;
  }
};

// src/indexes/indexFromAst.ts
var import_jsutils27 = __toESM(require_cjs());
var getLastChild = (parent, key) => {
  const children = (0, import_jsutils27.ensureArr)(parent[key]);
  return children[children.length - 1];
};
var getBeforeIndex = (parent, key) => {
  const lastChild = getLastChild(parent, key);
  return (lastChild == null ? void 0 : lastChild.index) || parent.index;
};
var checkBlocks = (blocks, idx) => {
  const filtered = blocks.filter((block) => block.index <= idx);
  const match = filtered.find((block) => block.index === idx);
  return match ? checkBlocks(filtered, idx + 1) : idx;
};
var findNextIndex = ({
  parent,
  feature,
  key
}) => {
  const beforeIdx = getBeforeIndex(parent, key);
  return checkBlocks(
    [
      ...feature.empty || import_jsutils27.emptyArr,
      ...feature.comments || import_jsutils27.emptyArr
    ],
    beforeIdx + 1
  );
};
var updateChildIndex = (props, nextIdx) => {
  const { child, parent, indexes } = props;
  child.index = nextIdx;
  indexes.splice(nextIdx, 0, { ast: child, parent });
  return indexes;
};
var reIndex = (indexes, refIndex, amount = 1) => {
  const reIndexed = indexes.reduce((acc, item, idx) => {
    if (idx > refIndex)
      item.ast.index = item.ast.index + amount;
    acc.push(item);
    return acc;
  }, []);
  return {
    amount,
    index: refIndex,
    indexed: reIndexed
  };
};
var indexFromAst = (props) => {
  const nextIdx = findNextIndex(props);
  const updatedIndex = updateChildIndex(props, nextIdx);
  return reIndex(updatedIndex, nextIdx);
};

// src/indexes/indexesToFeature.ts
var import_jsutils28 = __toESM(require_cjs());
var mergeItem = (parent, key, ast) => {
  const existing = parent[key];
  parent[key] = !existing ? ast : (existing == null ? void 0 : existing.uuid) === (ast == null ? void 0 : ast.uuid) ? { ...existing, ...ast } : ast;
  return parent[key];
};
var astArray = (parent, key, ast) => {
  ;
  parent[key] = (0, import_jsutils28.eitherArr)(parent[key], []);
  const typeArr = parent[key];
  const found = typeArr.find((item) => (item == null ? void 0 : item.uuid) === (ast == null ? void 0 : ast.uuid));
  if (!found)
    return parent[key] = [...typeArr, ast];
  else if (key === "empty" /* empty */ && found.index === ast.index)
    return;
  else if (key === "comments" /* comments */ && (found == null ? void 0 : found.content) === (ast == null ? void 0 : ast.content))
    return;
  else {
    const idx = typeArr.indexOf(found);
    const updated = [...typeArr];
    updated[idx] = { ...found, ...ast };
    parent[key] = updated;
  }
};
var mergeParent = (oldFeat, newFeat, parent, key) => {
  var _a, _b;
  ;
  newFeat[key] = (0, import_jsutils28.eitherArr)(newFeat[key], []);
  const existing = (_a = newFeat[key]) == null ? void 0 : _a.find((item) => item.uuid === parent.uuid);
  if (existing)
    return parent;
  const found = (_b = oldFeat[key]) == null ? void 0 : _b.find((item) => item.uuid === parent.uuid);
  const merged = !found ? parent : { ...found, ...parent };
  newFeat[key].push(merged);
  return merged;
};
var findParent = (oldFeat, newFeat, parent) => {
  switch (parent.type) {
    case "feature" /* feature */: {
      return newFeat;
    }
    case "background" /* background */: {
      const background = mergeItem(
        { background: oldFeat.background },
        "background" /* background */,
        parent
      );
      if (background)
        newFeat.background = background;
      return background;
    }
    case "rule" /* rule */: {
      return mergeParent(
        oldFeat,
        newFeat,
        parent,
        "rules" /* rules */
      );
    }
    case "scenario" /* scenario */: {
      return mergeParent(
        oldFeat,
        newFeat,
        parent,
        "scenarios" /* scenarios */
      );
    }
  }
};
var indexesToFeature = (indexes, feature) => {
  return indexes.reduce((feat, item, idx) => {
    const { ast } = item;
    if (ast === feature)
      return feat;
    switch (ast.type) {
      case "desire" /* desire */: {
        const parent = findParent(
          feature,
          feat,
          item.parent
        );
        mergeItem(
          parent,
          "desire" /* desire */,
          ast
        );
        break;
      }
      case "perspective" /* perspective */: {
        const parent = findParent(
          feature,
          feat,
          item.parent
        );
        mergeItem(
          parent,
          "perspective" /* perspective */,
          ast
        );
        break;
      }
      case "tags" /* tags */: {
        const parent = findParent(
          feature,
          feat,
          item.parent
        );
        mergeItem(
          parent,
          "tags" /* tags */,
          ast
        );
        break;
      }
      case "background" /* background */: {
        const parent = findParent(
          feature,
          feat,
          item.parent
        );
        mergeItem(
          parent,
          "background" /* background */,
          ast
        );
        break;
      }
      case "given" /* given */:
      case "when" /* when */:
      case "then" /* then */:
      case "and" /* and */:
      case "but" /* but */:
      case "*" /* * */:
      case "step" /* step */: {
        const parent = findParent(
          feature,
          feat,
          item.parent
        );
        astArray(
          parent,
          "steps" /* steps */,
          ast
        );
        break;
      }
      case "reason" /* reason */: {
        const parent = findParent(
          feature,
          feat,
          item.parent
        );
        astArray(
          parent,
          "reason" /* reason */,
          ast
        );
        break;
      }
      case "empty" /* empty */: {
        const parent = findParent(
          feature,
          feat,
          item.parent
        );
        astArray(
          parent,
          "empty" /* empty */,
          ast
        );
        break;
      }
      case "comment" /* comment */: {
        const parent = findParent(
          feature,
          feat,
          item.parent
        );
        astArray(
          parent,
          "comments" /* comments */,
          ast
        );
        break;
      }
      case "rule" /* rule */: {
        const parent = findParent(
          feature,
          feat,
          item.parent
        );
        astArray(
          parent,
          "rules" /* rules */,
          ast
        );
        break;
      }
      case "scenario" /* scenario */: {
        const parent = findParent(
          feature,
          feat,
          item.parent
        );
        astArray(
          parent,
          "scenarios" /* scenarios */,
          ast
        );
        break;
      }
    }
    return feat;
  }, {});
};

// src/indexes/indexes.ts
var Indexes = class {
  parkin;
  tags;
  steps;
  rules;
  empty;
  scenarios;
  background;
  parentSteps;
  constructor(parkin) {
    this.parkin = parkin;
    Object.assign(this, dataMappers);
  }
  indexFrom = indexFromAst.bind(this);
  toFeature = indexesToFeature.bind(this);
  toIndexes = featureToIndexes.bind(this);
};

// src/utils/diffFeatures.ts
var import_jsutils29 = __toESM(require_cjs());
var doEqlCheck = (key, current, updated) => {
  const mapFunc = dataMappers[key];
  if ((0, import_jsutils29.isFunc)(mapFunc)) {
    const resp = mapFunc(current, updated);
    return resp === current ? void 0 : resp;
  }
  return (0, import_jsutils29.deepEqual)(current, updated) ? void 0 : updated;
};
var diffFeatures = (feature, updated) => {
  return Object.entries(updated).reduce((acc, [key, prop]) => {
    if (!(0, import_jsutils29.exists)(prop))
      return acc;
    const current = feature[key];
    const hasCurrent = (0, import_jsutils29.exists)(current);
    if (!hasCurrent) {
      acc[key] = prop;
      return acc;
    }
    const resp = doEqlCheck(key, current, prop);
    (0, import_jsutils29.exists)(resp) && (acc[key] = resp);
    return acc;
  }, {});
};

// src/parkin.ts
var import_jsutils30 = __toESM(require_cjs());
var { STEP_TYPES: STEP_TYPES2 } = constants;
var Parkin = class {
  #isInit = false;
  steps;
  hooks;
  parse;
  runner;
  run;
  indexes;
  matcher;
  world;
  assemble;
  paramTypes;
  Given;
  When;
  Then;
  And;
  But;
  constructor(world, steps) {
    (0, import_jsutils30.isObj)(world) && this.init(world, steps);
  }
  init = (world = import_jsutils30.noOpObj, steps, warn = true) => {
    if (this.#isInit) {
      return warn && console.warn(`This instance of parkin has already been initialized!`);
    }
    if (!(0, import_jsutils30.isObj)(world.$alias))
      world.$alias = {};
    this.#isInit = true;
    this.world = world;
    this.indexes = new Indexes(this);
    this.steps = new Steps(this.world);
    this.hooks = new Hooks(this.world, this);
    this.runner = new Runner(this.steps, this.hooks, this.world);
    this.run = this.runner.run;
    this.parse = {
      feature: parseFeature.bind(this),
      definition: parseDefinition.bind(this)
    };
    this.assemble = assemble;
    this.paramTypes = { register: registerParamType };
    this.matcher = new Matcher(this);
    (0, import_jsutils30.isObj)(steps) && this.registerSteps(steps);
    this.steps.types.map((type) => {
      this[(0, import_jsutils30.capitalize)(type)] = (matcher2, method, meta) => this.steps.register(`_${type}`, type, matcher2, method, meta);
    });
  };
  /**
   * Helper for getting the difference between two feature Asts
   * First argument is the base Ast, second argument is an Ast to compare against the base
   * Response only includes the differences from the second argument feature ast
   * @memberof Parkin
   * @alias instance&period;diffFeatures
   * @function
   * @public
   * @example
   *   // Example call
   *   diffFeatures(
   *     {
   *        feature: `my feature`,
   *        rules: [{ rule: `my rule` }],
   *        scenarios:[{ steps: [{ type: `Given` }] }]
   *     },
   *     {
   *        feature: `my feature`,
   *        rules: [{ rule: `my rule` }],
   *        scenarios:[{ steps: [{ type: `When` }] }]
   *     },
   *   )
   *   // Example Response
   *     {
   *        scenarios:[{ steps: [{ type: `When` }] }]
   *     },
   */
  diffFeatures = diffFeatures.bind(this);
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
          this.steps[(0, import_jsutils30.capitalize)(type)](matcher2, ...(0, import_jsutils30.eitherArr)(content, [content]));
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
    return this.parse.feature(assembled)[0];
  };
};
var PKInstance = new Parkin();

// src/global.ts
var setGlobals = (force) => {
  const globalObj = resolveGlobalObj();
  const forceGlobal = force || process.env.PARKIN_TEST_GLOBALS_OVERRIDE;
  if (!globalObj.Parkin || forceGlobal)
    globalObj.Parkin = Parkin;
  if (!globalObj.PK || forceGlobal)
    globalObj.PK = PKInstance;
};
setGlobals();
var setParkinGlobals = (force = true) => setGlobals(force);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setParkinGlobals
});
//# sourceMappingURL=global.js.map
