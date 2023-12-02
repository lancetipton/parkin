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

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-EZUOWDJH.js
var require_chunk_EZUOWDJH = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-EZUOWDJH.js"(exports) {
    "use strict";
    var isStr4 = (str) => typeof str === "string";
    exports.isStr = isStr4;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-NAVY3LVQ.js
var require_chunk_NAVY3LVQ = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-NAVY3LVQ.js"(exports) {
    "use strict";
    var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
      get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
    }) : x)(function(x) {
      if (typeof require !== "undefined")
        return require.apply(this, arguments);
      throw Error('Dynamic require of "' + x + '" is not supported');
    });
    exports.__require = __require;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/isStr.js
var require_isStr = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/isStr.js"(exports) {
    "use strict";
    var chunkEZUOWDJH_js = require_chunk_EZUOWDJH();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "isStr", {
      enumerable: true,
      get: function() {
        return chunkEZUOWDJH_js.isStr;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-JUTNCG4G.js
var require_chunk_JUTNCG4G = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-JUTNCG4G.js"(exports) {
    "use strict";
    var isFunc2 = (func) => typeof func === "function";
    exports.isFunc = isFunc2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-ADLVKC77.js
var require_chunk_ADLVKC77 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-ADLVKC77.js"(exports) {
    "use strict";
    var chunkJUTNCG4G_js = require_chunk_JUTNCG4G();
    var deepFreeze2 = (obj) => {
      Object.freeze(obj);
      Object.getOwnPropertyNames(obj).map((prop) => {
        obj.hasOwnProperty(prop) && obj[prop] !== null && (typeof obj[prop] === "object" || chunkJUTNCG4G_js.isFunc(obj[prop])) && !Object.isFrozen(obj[prop]) && deepFreeze2(obj[prop]);
      });
      return obj;
    };
    exports.deepFreeze = deepFreeze2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/deepFreeze.js
var require_deepFreeze = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/deepFreeze.js"(exports) {
    "use strict";
    var chunkADLVKC77_js = require_chunk_ADLVKC77();
    require_chunk_JUTNCG4G();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "deepFreeze", {
      enumerable: true,
      get: function() {
        return chunkADLVKC77_js.deepFreeze;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-TUQXM63H.js
var require_chunk_TUQXM63H = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-TUQXM63H.js"(exports) {
    "use strict";
    var isFunc2 = (func) => typeof func === "function";
    exports.isFunc = isFunc2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/isFunc.js
var require_isFunc = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/isFunc.js"(exports) {
    "use strict";
    var chunkTUQXM63H_js = require_chunk_TUQXM63H();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "isFunc", {
      enumerable: true,
      get: function() {
        return chunkTUQXM63H_js.isFunc;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-M2P3KESR.js
var require_chunk_M2P3KESR = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-M2P3KESR.js"(exports) {
    "use strict";
    var isStr4 = (str) => typeof str === "string";
    exports.isStr = isStr4;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-YKZGBM46.js
var require_chunk_YKZGBM46 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-YKZGBM46.js"(exports) {
    "use strict";
    var isArr = (value) => Array.isArray(value);
    exports.isArr = isArr;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-HUDFDFCA.js
var require_chunk_HUDFDFCA = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-HUDFDFCA.js"(exports) {
    "use strict";
    var chunkM2P3KESR_js = require_chunk_M2P3KESR();
    var chunkYKZGBM46_js = require_chunk_YKZGBM46();
    var keyMap2 = (arr, toUpperCase) => chunkYKZGBM46_js.isArr(arr) && arr.reduce((obj, key) => {
      if (!chunkM2P3KESR_js.isStr(key))
        return obj;
      const use = toUpperCase && key.toUpperCase() || key;
      obj[use] = use;
      return obj;
    }, {}) || {};
    exports.keyMap = keyMap2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/keyMap.js
var require_keyMap = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/keyMap.js"(exports) {
    "use strict";
    var chunkHUDFDFCA_js = require_chunk_HUDFDFCA();
    require_chunk_M2P3KESR();
    require_chunk_YKZGBM46();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "keyMap", {
      enumerable: true,
      get: function() {
        return chunkHUDFDFCA_js.keyMap;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-3VOW2J5N.js
var require_chunk_3VOW2J5N = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-3VOW2J5N.js"(exports) {
    "use strict";
    var noOpObj = Object.freeze({});
    exports.noOpObj = noOpObj;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-HU3OFCD6.js
var require_chunk_HU3OFCD6 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-HU3OFCD6.js"(exports) {
    "use strict";
    var chunk3VOW2J5N_js = require_chunk_3VOW2J5N();
    var emptyObj3 = chunk3VOW2J5N_js.noOpObj;
    exports.emptyObj = emptyObj3;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/emptyObj.js
var require_emptyObj = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/emptyObj.js"(exports) {
    "use strict";
    var chunkHU3OFCD6_js = require_chunk_HU3OFCD6();
    require_chunk_3VOW2J5N();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "emptyObj", {
      enumerable: true,
      get: function() {
        return chunkHU3OFCD6_js.emptyObj;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-55VOPQRW.js
var require_chunk_55VOPQRW = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-55VOPQRW.js"(exports) {
    "use strict";
    var isObj3 = (obj) => typeof obj === "object" && !Array.isArray(obj) && obj !== null;
    exports.isObj = isObj3;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/isObj.js
var require_isObj = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/isObj.js"(exports) {
    "use strict";
    var chunk55VOPQRW_js = require_chunk_55VOPQRW();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "isObj", {
      enumerable: true,
      get: function() {
        return chunk55VOPQRW_js.isObj;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-22XNUJ2Z.js
var require_chunk_22XNUJ2Z = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-22XNUJ2Z.js"(exports) {
    "use strict";
    var wait2 = (time = 0) => new Promise((res) => setTimeout(() => res(true), time));
    exports.wait = wait2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/wait.js
var require_wait = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/wait.js"(exports) {
    "use strict";
    var chunk22XNUJ2Z_js = require_chunk_22XNUJ2Z();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "wait", {
      enumerable: true,
      get: function() {
        return chunk22XNUJ2Z_js.wait;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-KGAFRANE.js
var require_chunk_KGAFRANE = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-KGAFRANE.js"(exports) {
    "use strict";
    var noOp2 = () => {
    };
    exports.noOp = noOp2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/noOp.js
var require_noOp = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/noOp.js"(exports) {
    "use strict";
    var chunkKGAFRANE_js = require_chunk_KGAFRANE();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "noOp", {
      enumerable: true,
      get: function() {
        return chunkKGAFRANE_js.noOp;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-EULM2VZV.js
var require_chunk_EULM2VZV = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-EULM2VZV.js"(exports) {
    "use strict";
    var equalsNaN = (val) => typeof val === "number" && val != val;
    exports.equalsNaN = equalsNaN;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-HLCV3VHS.js
var require_chunk_HLCV3VHS = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-HLCV3VHS.js"(exports) {
    "use strict";
    var chunkEULM2VZV_js = require_chunk_EULM2VZV();
    var isNum2 = (val) => typeof val === "number" && !chunkEULM2VZV_js.equalsNaN(val);
    exports.isNum = isNum2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/isNum.js
var require_isNum = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/isNum.js"(exports) {
    "use strict";
    var chunkHLCV3VHS_js = require_chunk_HLCV3VHS();
    require_chunk_EULM2VZV();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "isNum", {
      enumerable: true,
      get: function() {
        return chunkHLCV3VHS_js.isNum;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-64FECTQT.js
var require_chunk_64FECTQT = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-64FECTQT.js"(exports) {
    "use strict";
    var exists2 = (value) => value === value && value !== void 0 && value !== null;
    exports.exists = exists2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/exists.js
var require_exists = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/exists.js"(exports) {
    "use strict";
    var chunk64FECTQT_js = require_chunk_64FECTQT();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "exists", {
      enumerable: true,
      get: function() {
        return chunk64FECTQT_js.exists;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-6QOPPP35.js
var require_chunk_6QOPPP35 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-6QOPPP35.js"(exports) {
    "use strict";
    var chunkTUQXM63H_js = require_chunk_TUQXM63H();
    function checkCall2(method, ...params) {
      return chunkTUQXM63H_js.isFunc(method) ? method(...params) : void 0;
    }
    exports.checkCall = checkCall2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/checkCall.js
var require_checkCall = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/checkCall.js"(exports) {
    "use strict";
    var chunk6QOPPP35_js = require_chunk_6QOPPP35();
    require_chunk_TUQXM63H();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "checkCall", {
      enumerable: true,
      get: function() {
        return chunk6QOPPP35_js.checkCall;
      }
    });
  }
});

// src/test/index.ts
var test_exports = {};
__export(test_exports, {
  ParkinTest: () => ParkinTest
});
module.exports = __toCommonJS(test_exports);

// src/utils/errors.ts
var import_isStr = __toESM(require_isStr());

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
var import_deepFreeze = __toESM(require_deepFreeze());
var ignoreTypes = [
  `*`,
  ``
];
var constants = (0, import_deepFreeze.deepFreeze)({
  ALIAS_REF: `$$`,
  WORLD_REF: `$`,
  WORLD_KEY: `$world`,
  WORLD_AT_RUNTIME: `$:`,
  REGEX_VARIANT: `regex`,
  ALIAS_WORLD_KEY: `$alias`,
  ALIAS_REF_AT_RUNTIME: `$$:`,
  EXPRESSION_VARIANT: `expression`,
  HOOK_TYPES: Object.keys(EHookType),
  LOG_JEST_SPEC_ENV: `PARKIN_LOG_JEST_SPEC`,
  SPEC_RESULT_LOG: `------- PARKIN SPEC RESULT LOG -------`,
  STEP_TYPES: Object.keys(EStepType).filter((type) => !ignoreTypes.includes(type)),
  FEATURE_META: [`feature`, `perspective`, `desire`, `reason`, `comments`]
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
  var _a;
  return (0, import_isStr.isStr)(error) ? [error, maybe] : [(_a = error || maybe) == null ? void 0 : _a.message, error || maybe];
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
var import_isStr2 = __toESM(require_isStr());
var import_isFunc = __toESM(require_isFunc());
var import_keyMap = __toESM(require_keyMap());
var import_emptyObj = __toESM(require_emptyObj());
var hookTypes = (0, import_keyMap.keyMap)([
  `beforeAll`,
  `beforeEach`,
  `afterAll`,
  `afterEach`
]);
var globalTypes = {
  ...(0, import_keyMap.keyMap)([`test`, `it`, `xtest`, `xit`, `describe`]),
  ...hookTypes
};
var Types = {
  ...globalTypes,
  ...(0, import_keyMap.keyMap)([`root`])
};
var throwError = (error) => {
  throw new ParkinError(error);
};
var validateHook = (type, action) => {
  !(0, import_isFunc.isFunc)(action) && throwError(
    `The ${type} method requires a "function" as the first argument`
  );
};
var validateRootRun = (root) => {
  root.type !== Types.root && throwError(`Invalid root type "${root.type}" set for root object`);
  !root.describes || !root.describes.length && throwError(`No tests have been registered to this ParkinTest instance`);
};
var validateItem = (type, description, action) => {
  !(0, import_isStr2.isStr)(type) && throwError(`Test item type is required as a string`);
  !(0, import_isFunc.isFunc)(action) && throwError(
    `The ${type} method requires a "function" as the second argument`
  );
  !(0, import_isStr2.isStr)(description) && throwError(`The ${type} method requires a "string" as the first argument`);
};
var createItem = (type, metadata = import_emptyObj.emptyObj, validate = true) => {
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
var import_isObj = __toESM(require_isObj());
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
  var _a, _b, _c, _d, _e;
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
  if (tests == null ? void 0 : tests.length)
    result.tests = tests;
  if (describes == null ? void 0 : describes.length)
    result.describes = describes;
  (0, import_isObj.isObj)(failed) && result.failedExpectations.push(failed);
  (0, import_isObj.isObj)(passed) && result.passedExpectations.push(passed);
  (0, import_isObj.isObj)((_a = item == null ? void 0 : item.action) == null ? void 0 : _a.ParkinMetaData) ? result.metaData = (_b = item == null ? void 0 : item.action) == null ? void 0 : _b.ParkinMetaData : (0, import_isObj.isObj)((_c = item == null ? void 0 : item.action) == null ? void 0 : _c.metaData) && (result.metaData = (_d = item == null ? void 0 : item.action) == null ? void 0 : _d.metaData);
  if (passed || failed)
    result.status = passed ? "passed" /* passed */ : ((_e = result == null ? void 0 : result.metaData) == null ? void 0 : _e.warnOnFailed) ? "warning" /* warning */ : "failed" /* failed */;
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
  const fullName = root ? root.description : test ? `${describe == null ? void 0 : describe.description} > ${test == null ? void 0 : test.description} > ${type}` : `${describe == null ? void 0 : describe.description} > ${type}`;
  activeItem[type].length && await Promise.all(
    activeItem[type].map(async (fn, idx) => {
      hookIdx = idx;
      return await Promise.resolve().then(() => fn == null ? void 0 : fn()).catch((error) => {
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
  if (!(hooksResults == null ? void 0 : hooksResults.length))
    return results;
  if (hooksResults == null ? void 0 : hooksResults.length) {
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
var import_wait = __toESM(require_wait());
var loopRetry = async (opts, orgRetry) => {
  const {
    delay = 0,
    retry = 0,
    onRetry,
    controller,
    promise: fn,
    shouldAbort
  } = opts;
  const signal = controller == null ? void 0 : controller.signal;
  try {
    const resp = await fn(opts);
    return (signal == null ? void 0 : signal.aborted) || (shouldAbort == null ? void 0 : shouldAbort()) ? throwAbortError() : resp;
  } catch (err) {
    if ((signal == null ? void 0 : signal.aborted) || (shouldAbort == null ? void 0 : shouldAbort()))
      return throwAbortError();
    if (retry <= 0)
      throw new RetryError(err, opts == null ? void 0 : opts.error, orgRetry);
    const next = { ...opts, retry: retry - 1 };
    onRetry && await (onRetry == null ? void 0 : onRetry(next));
    delay && await (0, import_wait.wait)(delay);
    return loopRetry(next, orgRetry);
  }
};
var PromiseRetry = async (opts) => loopRetry(
  opts,
  (opts == null ? void 0 : opts.retry) || 0
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
    if (beforeEachResults == null ? void 0 : beforeEachResults.length) {
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
    if (afterEachResults == null ? void 0 : afterEachResults.length) {
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
    const failed = (results == null ? void 0 : results.failed) || (describeResult == null ? void 0 : describeResult.failed);
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
  var _a, _b;
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
    if (beforeResults == null ? void 0 : beforeResults.length) {
      describeFailed = true;
      results.push(...beforeResults);
      continue;
    }
    if (shouldAbort())
      break;
    describeResult = ((_a = describe == null ? void 0 : describe.tests) == null ? void 0 : _a.length) ? await loopChildren({
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
    describeResult = ((_b = describe == null ? void 0 : describe.describes) == null ? void 0 : _b.length) ? await loopChildren({
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
    if (afterResults == null ? void 0 : afterResults.length) {
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
    await (onAbort == null ? void 0 : onAbort());
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
  if (beforeAllResults == null ? void 0 : beforeAllResults.length)
    return Object.assign(beforeAllResults, stats);
  try {
    const resp = await loopDescribes(args);
    describes = resp.describes;
    describesFailed = resp.failed;
    if (shouldAbort()) {
      await (onAbort == null ? void 0 : onAbort());
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
    (afterAllResult == null ? void 0 : afterAllResult.length) && describes.push(...afterAllResult);
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
var import_noOp = __toESM(require_noOp());
var import_isStr3 = __toESM(require_isStr());
var import_isNum = __toESM(require_isNum());
var import_isObj2 = __toESM(require_isObj());
var import_exists = __toESM(require_exists());
var import_emptyObj2 = __toESM(require_emptyObj());
var import_checkCall = __toESM(require_checkCall());
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
  #onRunDone = import_noOp.noOp;
  #onRunStart = import_noOp.noOp;
  #onSpecDone = import_noOp.noOp;
  #onSuiteDone = import_noOp.noOp;
  #onSpecStart = import_noOp.noOp;
  #onSuiteStart = import_noOp.noOp;
  #onAbort = import_noOp.noOp;
  afterAll = import_noOp.noOp;
  afterEach = import_noOp.noOp;
  beforeAll = import_noOp.noOp;
  beforeEach = import_noOp.noOp;
  #activeParent = void 0;
  constructor(config = import_emptyObj2.emptyObj) {
    this.#root.description = config.description || `root`;
    this.#addOnly();
    this.#addSkip();
    this.#addHelpers();
    this.it = this.test;
    this.xit = this.xtest;
    this.#activeParent = this.#root;
    this.setConfig(config);
  }
  run = (config = import_emptyObj2.emptyObj) => {
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
  } = import_emptyObj2.emptyObj) => {
    if (onAbort)
      this.#onAbort = onAbort;
    if ((0, import_isNum.isNum)(testTimeout))
      this.testTimeout = testTimeout;
    else if ((0, import_isNum.isNum)(timeout))
      this.testTimeout = timeout;
    if ((0, import_isNum.isNum)(suiteTimeout))
      this.suiteTimeout = suiteTimeout;
    else if ((0, import_isNum.isNum)(timeout))
      this.suiteTimeout = timeout;
    if ((0, import_isNum.isNum)(bail))
      this.bail = bail;
    if ((0, import_isNum.isNum)(testRetry))
      this.testRetry = testRetry;
    if ((0, import_isNum.isNum)(suiteRetry))
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
      (0, import_checkCall.checkCall)(this.#activeParent.hasOnlyChild);
    };
    this.test.only = (...args) => {
      this.test(...args);
      const item = this.#activeParent.tests[this.#activeParent.tests.length - 1];
      item.only = true;
      this.#testOnly = true;
      (0, import_checkCall.checkCall)(this.#activeParent.hasOnlyChild);
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
      (0, import_checkCall.checkCall)(lastParent.hasOnlyChild);
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
    if ((0, import_isObj2.isObj)(meta)) {
      if (!(0, import_exists.exists)(action.metaData) && !(0, import_exists.exists)(action.ParkinMetaData))
        action.metaData = meta;
      if (meta == null ? void 0 : meta.retry)
        retry = meta.retry;
      if (meta == null ? void 0 : meta.timeout)
        timeout = meta.timeout;
    } else if ((0, import_isNum.isNum)(meta))
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
    !(0, import_isStr3.isStr)(description) && throwError(
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
