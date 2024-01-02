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

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-JUTNCG4G.js
var require_chunk_JUTNCG4G = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-JUTNCG4G.js"(exports) {
    "use strict";
    var isFunc4 = (func) => typeof func === "function";
    exports.isFunc = isFunc4;
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

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-PY362KC6.js
var require_chunk_PY362KC6 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-PY362KC6.js"(exports) {
    "use strict";
    var exists10 = (value) => value === value && value !== void 0 && value !== null;
    exports.exists = exists10;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-M2P3KESR.js
var require_chunk_M2P3KESR = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-M2P3KESR.js"(exports) {
    "use strict";
    var isStr8 = (str) => typeof str === "string";
    exports.isStr = isStr8;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-YKZGBM46.js
var require_chunk_YKZGBM46 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-YKZGBM46.js"(exports) {
    "use strict";
    var isArr7 = (value) => Array.isArray(value);
    exports.isArr = isArr7;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-EH4D3SUG.js
var require_chunk_EH4D3SUG = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-EH4D3SUG.js"(exports) {
    "use strict";
    var chunkPY362KC6_js = require_chunk_PY362KC6();
    var chunkM2P3KESR_js = require_chunk_M2P3KESR();
    var chunkYKZGBM46_js = require_chunk_YKZGBM46();
    var get5 = (obj, path, fallback) => {
      const isPathArr = chunkYKZGBM46_js.isArr(path);
      if (!chunkM2P3KESR_js.isStr(path) && !isPathArr)
        return chunkPY362KC6_js.exists(fallback) ? fallback : void 0;
      const parts = isPathArr ? path : path.split(".");
      const result = parts.reduce((obj2, prop) => {
        const type = typeof obj2;
        if (!chunkPY362KC6_js.exists(obj2) || type !== "object" && type !== "function")
          return void 0;
        prop = prop.startsWith("[") ? prop.replace(/\D/g, "") : prop;
        return obj2[prop];
      }, obj);
      return chunkPY362KC6_js.exists(result) ? result : fallback;
    };
    exports.get = get5;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/get.js
var require_get = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/get.js"(exports) {
    "use strict";
    var chunkEH4D3SUG_js = require_chunk_EH4D3SUG();
    require_chunk_PY362KC6();
    require_chunk_M2P3KESR();
    require_chunk_YKZGBM46();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "get", {
      enumerable: true,
      get: function() {
        return chunkEH4D3SUG_js.get;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-EZUOWDJH.js
var require_chunk_EZUOWDJH = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-EZUOWDJH.js"(exports) {
    "use strict";
    var isStr8 = (str) => typeof str === "string";
    exports.isStr = isStr8;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-5LOOSPFX.js
var require_chunk_5LOOSPFX = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-5LOOSPFX.js"(exports) {
    "use strict";
    var chunkEZUOWDJH_js = require_chunk_EZUOWDJH();
    var toStr2 = (val) => val === null || val === void 0 ? "" : chunkEZUOWDJH_js.isStr(val) ? val : JSON.stringify(val);
    exports.toStr = toStr2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/toStr.js
var require_toStr = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/toStr.js"(exports) {
    "use strict";
    var chunk5LOOSPFX_js = require_chunk_5LOOSPFX();
    require_chunk_EZUOWDJH();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "toStr", {
      enumerable: true,
      get: function() {
        return chunk5LOOSPFX_js.toStr;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-55VOPQRW.js
var require_chunk_55VOPQRW = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-55VOPQRW.js"(exports) {
    "use strict";
    var isObj6 = (obj) => typeof obj === "object" && !Array.isArray(obj) && obj !== null;
    exports.isObj = isObj6;
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
    var emptyObj15 = chunk3VOW2J5N_js.noOpObj;
    exports.emptyObj = emptyObj15;
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

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-BV6A4L2Y.js
var require_chunk_BV6A4L2Y = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-BV6A4L2Y.js"(exports) {
    "use strict";
    var equalsNaN2 = (val) => typeof val === "number" && val != val;
    var isNum2 = (val) => typeof val === "number" && !equalsNaN2(val);
    exports.equalsNaN = equalsNaN2;
    exports.isNum = isNum2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-6SSJ4E3L.js
var require_chunk_6SSJ4E3L = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-6SSJ4E3L.js"(exports) {
    "use strict";
    var chunkBV6A4L2Y_js = require_chunk_BV6A4L2Y();
    var isNonNegative = (val) => chunkBV6A4L2Y_js.isNum(val) && val >= 0;
    exports.isNonNegative = isNonNegative;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-G4KOX2MN.js
var require_chunk_G4KOX2MN = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-G4KOX2MN.js"(exports) {
    "use strict";
    var chunk6SSJ4E3L_js = require_chunk_6SSJ4E3L();
    var chunkEZUOWDJH_js = require_chunk_EZUOWDJH();
    var hashString2 = (str, maxLength) => {
      if (!chunkEZUOWDJH_js.isStr(str) || str.length == 0)
        return `0`;
      str = str.split("").reverse().join("");
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = `${Math.abs(hash & hash)}`;
      }
      return chunk6SSJ4E3L_js.isNonNegative(maxLength) ? hash.slice(0, maxLength) : hash;
    };
    exports.hashString = hashString2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/hashString.js
var require_hashString = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/hashString.js"(exports) {
    "use strict";
    var chunkG4KOX2MN_js = require_chunk_G4KOX2MN();
    require_chunk_6SSJ4E3L();
    require_chunk_BV6A4L2Y();
    require_chunk_EZUOWDJH();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "hashString", {
      enumerable: true,
      get: function() {
        return chunkG4KOX2MN_js.hashString;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-64FECTQT.js
var require_chunk_64FECTQT = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-64FECTQT.js"(exports) {
    "use strict";
    var exists10 = (value) => value === value && value !== void 0 && value !== null;
    exports.exists = exists10;
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

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-E53MQSYU.js
var require_chunk_E53MQSYU = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-E53MQSYU.js"(exports) {
    "use strict";
    var chunkEZUOWDJH_js = require_chunk_EZUOWDJH();
    var quoteSymbols = ['"', "'"];
    var isQuoted2 = (str, quotes = quoteSymbols) => {
      return chunkEZUOWDJH_js.isStr(str) && quotes.some((quote) => str.startsWith(quote) && str.endsWith(quote));
    };
    exports.isQuoted = isQuoted2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/isQuoted.js
var require_isQuoted = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/isQuoted.js"(exports) {
    "use strict";
    var chunkE53MQSYU_js = require_chunk_E53MQSYU();
    require_chunk_EZUOWDJH();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "isQuoted", {
      enumerable: true,
      get: function() {
        return chunkE53MQSYU_js.isQuoted;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-TUQXM63H.js
var require_chunk_TUQXM63H = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-TUQXM63H.js"(exports) {
    "use strict";
    var isFunc4 = (func) => typeof func === "function";
    exports.isFunc = isFunc4;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-6QOPPP35.js
var require_chunk_6QOPPP35 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-6QOPPP35.js"(exports) {
    "use strict";
    var chunkTUQXM63H_js = require_chunk_TUQXM63H();
    function checkCall3(method, ...params) {
      return chunkTUQXM63H_js.isFunc(method) ? method(...params) : void 0;
    }
    exports.checkCall = checkCall3;
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

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-EULM2VZV.js
var require_chunk_EULM2VZV = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-EULM2VZV.js"(exports) {
    "use strict";
    var equalsNaN2 = (val) => typeof val === "number" && val != val;
    exports.equalsNaN = equalsNaN2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/equalsNaN.js
var require_equalsNaN = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/equalsNaN.js"(exports) {
    "use strict";
    var chunkEULM2VZV_js = require_chunk_EULM2VZV();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "equalsNaN", {
      enumerable: true,
      get: function() {
        return chunkEULM2VZV_js.equalsNaN;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-RTNCQHYY.js
var require_chunk_RTNCQHYY = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-RTNCQHYY.js"(exports) {
    "use strict";
    var isRegex = (val) => Boolean(val && val instanceof RegExp);
    exports.isRegex = isRegex;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-NGGXFWWC.js
var require_chunk_NGGXFWWC = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-NGGXFWWC.js"(exports) {
    "use strict";
    var chunkRTNCQHYY_js = require_chunk_RTNCQHYY();
    var chunkM2P3KESR_js = require_chunk_M2P3KESR();
    var getRegexSource = (maybeRx) => chunkRTNCQHYY_js.isRegex(maybeRx) ? maybeRx.source : chunkM2P3KESR_js.isStr(maybeRx) ? maybeRx : null;
    exports.getRegexSource = getRegexSource;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-FIYNISXE.js
var require_chunk_FIYNISXE = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-FIYNISXE.js"(exports) {
    "use strict";
    var chunkNGGXFWWC_js = require_chunk_NGGXFWWC();
    var chunkM2P3KESR_js = require_chunk_M2P3KESR();
    var chunkYKZGBM46_js = require_chunk_YKZGBM46();
    var parseArgs = (args) => {
      if (chunkYKZGBM46_js.isArr(args[0]))
        return [args[0], args[1]];
      const last = args[args.length - 1];
      const options = chunkM2P3KESR_js.isStr(last) ? last : void 0;
      const expressions = options ? args.splice(0, args.length - 1) : args;
      return [expressions, options];
    };
    var joinRegex4 = (...args) => {
      const [expressions, options] = parseArgs(args);
      const source = expressions.reduce((joined, next) => {
        const nextSource = chunkNGGXFWWC_js.getRegexSource(next);
        return !nextSource ? joined : joined === "" ? nextSource : `${joined}|${nextSource}`;
      }, "");
      return new RegExp(`(${source})`, options);
    };
    exports.joinRegex = joinRegex4;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/joinRegex.js
var require_joinRegex = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/joinRegex.js"(exports) {
    "use strict";
    var chunkFIYNISXE_js = require_chunk_FIYNISXE();
    require_chunk_NGGXFWWC();
    require_chunk_RTNCQHYY();
    require_chunk_M2P3KESR();
    require_chunk_YKZGBM46();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "joinRegex", {
      enumerable: true,
      get: function() {
        return chunkFIYNISXE_js.joinRegex;
      }
    });
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

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-VJC6JRAM.js
var require_chunk_VJC6JRAM = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-VJC6JRAM.js"(exports) {
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

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-VBOUGCXN.js
var require_chunk_VBOUGCXN = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-VBOUGCXN.js"(exports) {
    "use strict";
    var chunkVJC6JRAM_js = require_chunk_VJC6JRAM();
    var noPropArr2 = chunkVJC6JRAM_js.deepFreeze([]);
    exports.noPropArr = noPropArr2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-6FYYPPC7.js
var require_chunk_6FYYPPC7 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-6FYYPPC7.js"(exports) {
    "use strict";
    var chunkVBOUGCXN_js = require_chunk_VBOUGCXN();
    var emptyArr6 = chunkVBOUGCXN_js.noPropArr;
    exports.emptyArr = emptyArr6;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/emptyArr.js
var require_emptyArr = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/emptyArr.js"(exports) {
    "use strict";
    var chunk6FYYPPC7_js = require_chunk_6FYYPPC7();
    require_chunk_VBOUGCXN();
    require_chunk_VJC6JRAM();
    require_chunk_JUTNCG4G();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "emptyArr", {
      enumerable: true,
      get: function() {
        return chunk6FYYPPC7_js.emptyArr;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-IXGOVDB7.js
var require_chunk_IXGOVDB7 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-IXGOVDB7.js"(exports) {
    "use strict";
    var getNearestDelimiterIndex = (text, index, delimiters = [" "]) => {
      const indices = delimiters.map((str) => text.indexOf(str, index)).sort();
      return indices.find((idx) => idx >= 0);
    };
    var getWordStartingAt = (text, index, delimiters = [" "]) => {
      const endingSpaceIdx = getNearestDelimiterIndex(text, index, delimiters);
      return text.substring(
        index,
        endingSpaceIdx === -1 ? text.length : endingSpaceIdx
      );
    };
    exports.getNearestDelimiterIndex = getNearestDelimiterIndex;
    exports.getWordStartingAt = getWordStartingAt;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-LBOJPO54.js
var require_chunk_LBOJPO54 = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-LBOJPO54.js"(exports) {
    "use strict";
    var chunkEZUOWDJH_js = require_chunk_EZUOWDJH();
    var reverseStr = (str) => {
      if (!chunkEZUOWDJH_js.isStr(str))
        return void 0;
      let reversed = "";
      for (let char of str) {
        reversed = char + reversed;
      }
      return reversed;
    };
    exports.reverseStr = reverseStr;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-LU4EAOHH.js
var require_chunk_LU4EAOHH = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-LU4EAOHH.js"(exports) {
    "use strict";
    var chunkIXGOVDB7_js = require_chunk_IXGOVDB7();
    var chunkLBOJPO54_js = require_chunk_LBOJPO54();
    var getWordEndingAt2 = (text, index, delimiters = [" "]) => {
      const reversed = chunkLBOJPO54_js.reverseStr(text);
      const reversedIndex = text.length - index;
      return chunkLBOJPO54_js.reverseStr(chunkIXGOVDB7_js.getWordStartingAt(reversed, reversedIndex, delimiters));
    };
    exports.getWordEndingAt = getWordEndingAt2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/getWordEndingAt.js
var require_getWordEndingAt = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/getWordEndingAt.js"(exports) {
    "use strict";
    var chunkLU4EAOHH_js = require_chunk_LU4EAOHH();
    require_chunk_IXGOVDB7();
    require_chunk_LBOJPO54();
    require_chunk_EZUOWDJH();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "getWordEndingAt", {
      enumerable: true,
      get: function() {
        return chunkLU4EAOHH_js.getWordEndingAt;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-KGAFRANE.js
var require_chunk_KGAFRANE = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-KGAFRANE.js"(exports) {
    "use strict";
    var noOp4 = () => {
    };
    exports.noOp = noOp4;
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

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-D5IN7XBI.js
var require_chunk_D5IN7XBI = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-D5IN7XBI.js"(exports) {
    "use strict";
    var isArr7 = (value) => Array.isArray(value);
    exports.isArr = isArr7;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/isArr.js
var require_isArr = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/isArr.js"(exports) {
    "use strict";
    var chunkD5IN7XBI_js = require_chunk_D5IN7XBI();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "isArr", {
      enumerable: true,
      get: function() {
        return chunkD5IN7XBI_js.isArr;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-BBIVWXXF.js
var require_chunk_BBIVWXXF = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-BBIVWXXF.js"(exports) {
    "use strict";
    var chunkD5IN7XBI_js = require_chunk_D5IN7XBI();
    var ensureArr3 = (val) => chunkD5IN7XBI_js.isArr(val) ? val : [val];
    exports.ensureArr = ensureArr3;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/ensureArr.js
var require_ensureArr = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/ensureArr.js"(exports) {
    "use strict";
    var chunkBBIVWXXF_js = require_chunk_BBIVWXXF();
    require_chunk_D5IN7XBI();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "ensureArr", {
      enumerable: true,
      get: function() {
        return chunkBBIVWXXF_js.ensureArr;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-R6Q627BP.js
var require_chunk_R6Q627BP = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-R6Q627BP.js"(exports) {
    "use strict";
    var chunkEZUOWDJH_js = require_chunk_EZUOWDJH();
    var capitalize7 = (str, lowercaseTail = true) => {
      if (!chunkEZUOWDJH_js.isStr(str) || !str[0])
        return str;
      const tail = lowercaseTail ? str.slice(1).toLowerCase() : str.slice(1);
      return `${str[0].toUpperCase()}${tail}`;
    };
    exports.capitalize = capitalize7;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/capitalize.js
var require_capitalize = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/capitalize.js"(exports) {
    "use strict";
    var chunkR6Q627BP_js = require_chunk_R6Q627BP();
    require_chunk_EZUOWDJH();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "capitalize", {
      enumerable: true,
      get: function() {
        return chunkR6Q627BP_js.capitalize;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-KGLTQ3UV.js
var require_chunk_KGLTQ3UV = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-KGLTQ3UV.js"(exports) {
    "use strict";
    var chunkD5IN7XBI_js = require_chunk_D5IN7XBI();
    var eitherArr7 = (a, b) => chunkD5IN7XBI_js.isArr(a) ? a : b;
    exports.eitherArr = eitherArr7;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/eitherArr.js
var require_eitherArr = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/eitherArr.js"(exports) {
    "use strict";
    var chunkKGLTQ3UV_js = require_chunk_KGLTQ3UV();
    require_chunk_D5IN7XBI();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "eitherArr", {
      enumerable: true,
      get: function() {
        return chunkKGLTQ3UV_js.eitherArr;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/noPropArr.js
var require_noPropArr = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/noPropArr.js"(exports) {
    "use strict";
    var chunkVBOUGCXN_js = require_chunk_VBOUGCXN();
    require_chunk_VJC6JRAM();
    require_chunk_JUTNCG4G();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "noPropArr", {
      enumerable: true,
      get: function() {
        return chunkVBOUGCXN_js.noPropArr;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-DLEUSWRZ.js
var require_chunk_DLEUSWRZ = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-DLEUSWRZ.js"(exports) {
    "use strict";
    var isBool2 = (val) => typeof val === "boolean";
    exports.isBool = isBool2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/isBool.js
var require_isBool = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/isBool.js"(exports) {
    "use strict";
    var chunkDLEUSWRZ_js = require_chunk_DLEUSWRZ();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "isBool", {
      enumerable: true,
      get: function() {
        return chunkDLEUSWRZ_js.isBool;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-SJXRYUEB.js
var require_chunk_SJXRYUEB = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-SJXRYUEB.js"(exports) {
    "use strict";
    var chunk55VOPQRW_js = require_chunk_55VOPQRW();
    var pickKeys2 = (obj = {}, keys = []) => chunk55VOPQRW_js.isObj(obj) && keys.reduce((updated, key) => {
      key in obj && (updated[key] = obj[key]);
      return updated;
    }, {}) || {};
    exports.pickKeys = pickKeys2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/pickKeys.js
var require_pickKeys = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/pickKeys.js"(exports) {
    "use strict";
    var chunkSJXRYUEB_js = require_chunk_SJXRYUEB();
    require_chunk_55VOPQRW();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "pickKeys", {
      enumerable: true,
      get: function() {
        return chunkSJXRYUEB_js.pickKeys;
      }
    });
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-I4ATGE6S.js
var require_chunk_I4ATGE6S = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-I4ATGE6S.js"(exports) {
    "use strict";
    var chunk55VOPQRW_js = require_chunk_55VOPQRW();
    var chunkJUTNCG4G_js = require_chunk_JUTNCG4G();
    var reduceObj = (obj, cb, start = {}) => chunk55VOPQRW_js.isObj(obj) && chunkJUTNCG4G_js.isFunc(cb) && Object.entries(obj).reduce(
      (data, [key, value]) => cb(key, value, data),
      start
    ) || start;
    exports.reduceObj = reduceObj;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-6GBPP5TH.js
var require_chunk_6GBPP5TH = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/chunk-6GBPP5TH.js"(exports) {
    "use strict";
    var chunkI4ATGE6S_js = require_chunk_I4ATGE6S();
    var chunk55VOPQRW_js = require_chunk_55VOPQRW();
    var omitKeys2 = (obj = {}, keys = []) => chunk55VOPQRW_js.isObj(obj) && chunkI4ATGE6S_js.reduceObj(
      obj,
      (key, _, updated) => {
        keys.indexOf(key) === -1 && (updated[key] = obj[key]);
        return updated;
      },
      {}
    ) || {};
    exports.omitKeys = omitKeys2;
  }
});

// node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/omitKeys.js
var require_omitKeys = __commonJS({
  "node_modules/.pnpm/@keg-hub+jsutils@9.10.0/node_modules/@keg-hub/jsutils/build/cjs/omitKeys.js"(exports) {
    "use strict";
    var chunk6GBPP5TH_js = require_chunk_6GBPP5TH();
    require_chunk_I4ATGE6S();
    require_chunk_55VOPQRW();
    require_chunk_JUTNCG4G();
    require_chunk_NAVY3LVQ();
    Object.defineProperty(exports, "omitKeys", {
      enumerable: true,
      get: function() {
        return chunk6GBPP5TH_js.omitKeys;
      }
    });
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  EAstObject: () => EAstObject,
  EBlockLoc: () => EBlockLoc,
  EDocType: () => EDocType,
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
  ParentTypes: () => ParentTypes,
  Parkin: () => Parkin,
  ParkinAbortErrName: () => ParkinAbortErrName,
  ParkinBailErrName: () => ParkinBailErrName,
  PromiseAbort: () => PromiseAbort,
  PromiseRetry: () => PromiseRetry,
  PromiseTimeout: () => PromiseTimeout,
  StepTypes: () => StepTypes,
  constants: () => constants
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
var EDocType = /* @__PURE__ */ ((EDocType2) => {
  EDocType2["tick"] = `tick`;
  EDocType2["ticks"] = "```";
  EDocType2["quotes"] = `"""`;
  EDocType2["quote"] = `quote`;
  return EDocType2;
})(EDocType || {});

// src/types/assemble.types.ts
var EBlockLoc = /* @__PURE__ */ ((EBlockLoc2) => {
  EBlockLoc2["after"] = `after`;
  EBlockLoc2["before"] = `before`;
  return EBlockLoc2;
})(EBlockLoc || {});

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

// src/matcher/paramTypes.ts
var import_get = __toESM(require_get());
var import_toStr = __toESM(require_toStr());
var import_isObj = __toESM(require_isObj());

// src/utils/helpers.ts
var import_emptyObj = __toESM(require_emptyObj());
var import_hashString = __toESM(require_hashString());
var cleanDefMatch = (match) => {
  let name = match.toString();
  name[0] === "/" && (name = name.substring(1));
  name[0] === "^" && (name = name.substring(1));
  name.charAt(name.length - 1) === "/" && (name = name.slice(0, -1));
  name.charAt(name.length - 1) === "$" && (name = name.slice(0, -1));
  return name;
};
var strToId = (str, prefix = ``, postfix = ``) => {
  return `${prefix}${(0, import_hashString.hashString)(cleanDefMatch(str))}${postfix}`;
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
var includePartType = (type, opts = import_emptyObj.emptyObj, include, exclude) => {
  const { include: oInclude, exclude: oExclude } = opts;
  const inArr = include || (Boolean(oInclude == null ? void 0 : oInclude.length) ? oInclude : void 0);
  const exArr = exclude || (Boolean(oExclude == null ? void 0 : oExclude.length) ? oExclude : void 0);
  return !inArr && !exArr ? true : !inArr ? !exArr.includes(type) : inArr.includes(type);
};

// src/matcher/paramTypes.ts
var import_exists = __toESM(require_exists());
var import_emptyObj2 = __toESM(require_emptyObj());
var import_isQuoted = __toESM(require_isQuoted());
var import_checkCall = __toESM(require_checkCall());
var import_equalsNaN = __toESM(require_equalsNaN());
var import_joinRegex2 = __toESM(require_joinRegex());

// src/matcher/patterns.ts
var import_joinRegex = __toESM(require_joinRegex());
var RX_OPTIONAL = /\w*\([^)]*?\)/;
var RX_ALT = /\s*\S*\/\S*\s*/;
var RX_PARAMETER = /\s*{(.*?)}\s*/;
var RX_EXPRESSION = (0, import_joinRegex.joinRegex)(RX_PARAMETER, RX_OPTIONAL, "g");
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
var import_isStr = __toESM(require_isStr());
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
var throwInvalidDefParams = (msg = ``) => {
  throw new ParkinError(
    `Malformed step text, could not extract the expected step definition parameters. ${msg}`.trim()
  );
};
var throwMissingDef = (step) => {
  throw new ParkinError(`Matching definition could not be found for step: "${step}"`);
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
var mergeRegex = import_joinRegex2.joinRegex;
var checkWorldValue = (func, type) => {
  return (arg, $world, worldReplace2) => {
    const hasWorldVal = arg.match(RX_WORLD);
    const hasAliasVal = arg.match(RX_ALIAS);
    if (worldReplace2 === false && (hasWorldVal || hasAliasVal))
      return removeQuotes(arg);
    if (!(0, import_isObj.isObj)($world) || !hasWorldVal && !hasAliasVal)
      return matchType(func(arg, $world, worldReplace2), type);
    const worldVal = hasWorldVal ? (0, import_get.get)($world, removeQuotes(arg).replace(`${WORLD_KEY}.`, "")) : (0, import_get.get)(
      $world,
      removeQuotes(arg).replace(`${ALIAS_REF}`, `${ALIAS_WORLD_KEY}.`)
    );
    return (0, import_exists.exists)(worldVal) ? matchType(worldVal, type) : hasWorldVal ? throwMissingWorldValue(arg) : matchType(func(arg, $world), type);
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
      return !(0, import_isQuoted.isQuoted)(arg) ? (0, import_toStr.toStr)(arg) : void 0;
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
      return (0, import_equalsNaN.equalsNaN)(result) ? void 0 : result;
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
      return (0, import_equalsNaN.equalsNaN)(result) || arg.includes(`.`) ? void 0 : result;
    }, `number`)
  },
  string: {
    ...typeModel,
    name: `string`,
    regex: mergeRegex(RX_DOUBLE_QUOTED, RX_SINGLE_QUOTED),
    partial: mergeRegex(RX_DOUBLE_QUOTED, RX_SINGLE_QUOTED, /{string}/),
    transformer: checkWorldValue((arg) => {
      return (0, import_isQuoted.isQuoted)(arg) ? removeQuotes(arg) : void 0;
    }, typeModel.type)
  }
};
var getParamTypes = () => __paramTypes;
var registerParamType = (model = import_emptyObj2.emptyObj, key = model.name) => {
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
    return (0, import_checkCall.checkCall)(paramType.transformer, item, $world, worldReplace2);
  }).filter(import_exists.exists);
};

// src/matcher/regex.ts
var import_isStr2 = __toESM(require_isStr());
var import_emptyArr = __toESM(require_emptyArr());
var import_emptyObj3 = __toESM(require_emptyObj());
var import_getWordEndingAt = __toESM(require_getWordEndingAt());
var matchRegex = (definition, text) => {
  const match = text.match(new RegExp(definition.match));
  return match ? { definition, match: match.slice(1, match.length).filter(Boolean) } : import_emptyObj3.emptyObj;
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
  const precedingWord = (0, import_getWordEndingAt.getWordEndingAt)(text, matchArr.index);
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
  return (0, import_isStr2.isStr)(refEx) ? refEx : refEx.source;
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
var getRegexParts = (defMatcher, opts = import_emptyObj3.emptyObj) => {
  const { include, exclude } = opts;
  const inArr = Boolean(include == null ? void 0 : include.length) ? include : void 0;
  const exArr = Boolean(exclude == null ? void 0 : exclude.length) ? exclude : void 0;
  const parameters = includePartType("parameter" /* parameter */, opts, inArr, exArr) ? [...defMatcher.matchAll(new RegExp(RX_PARAMETER, "gi"))].map((match) => parseMatch(match, "parameter" /* parameter */, opts)) : import_emptyArr.emptyArr;
  const optionals = includePartType("optional" /* optional */, opts, inArr, exArr) ? [...defMatcher.matchAll(new RegExp(RX_OPTIONAL, "gi"))].map((match) => parseMatch(match, "optional" /* optional */, opts)) : import_emptyArr.emptyArr;
  const alts = includePartType("alternate" /* alternate */, opts, inArr, exArr) ? [...defMatcher.matchAll(new RegExp(RX_ALT, "gi"))].map((match) => parseMatch(match, "alternate" /* alternate */, opts)) : import_emptyArr.emptyArr;
  const sortedExpressions = [...parameters, ...optionals, ...alts].sort((matchA, matchB) => matchA.index - matchB.index);
  return sortedExpressions;
};

// src/matcher/tokens.ts
var import_emptyObj4 = __toESM(require_emptyObj());
var import_joinRegex3 = __toESM(require_joinRegex());
var tokenRegex = (0, import_joinRegex3.joinRegex)(
  RX_INT,
  // @ts-ignore
  RX_FLOAT,
  RX_ALT,
  RX_OPTIONAL,
  RX_PARAMETER,
  RX_DOUBLE_QUOTED,
  RX_SINGLE_QUOTED,
  "g"
);
var tokenizeStep = (step, def, opts = import_emptyObj4.emptyObj) => {
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
var import_emptyArr2 = __toESM(require_emptyArr());
var import_emptyObj8 = __toESM(require_emptyObj());

// src/utils/globalScope.ts
var import_noOp = __toESM(require_noOp());
var import_emptyObj5 = __toESM(require_emptyObj());
var import_checkCall2 = __toESM(require_checkCall());
var hasWindow = Boolean(typeof window !== "undefined");
var hasGlobal = Boolean(typeof globalThis !== "undefined");
var hasModule = Boolean(typeof module === "object");
var hasRequire = Boolean(typeof require === "function");
var hasJasmine = Boolean(
  hasGlobal && typeof globalThis.jasmine !== "undefined"
);
var resolveJasmine = () => hasJasmine ? (0, import_checkCall2.checkCall)(() => globalThis.jasmine) : { getEnv: () => import_emptyObj5.emptyObj, testPath: `` };
var resolveModule = () => hasModule ? (0, import_checkCall2.checkCall)(() => module) : { exports: {} };
var resolveRequire = () => hasRequire ? (0, import_checkCall2.checkCall)(() => require) : import_noOp.noOp;
var resolveGlobalObj = () => {
  try {
    return hasWindow ? (0, import_checkCall2.checkCall)(() => window) : hasGlobal ? (0, import_checkCall2.checkCall)(() => globalThis) : import_emptyObj5.emptyObj;
  } catch (err) {
    return import_emptyObj5.emptyObj;
  }
};

// src/utils/escapeStr.ts
var escapeStr = (str) => {
  return hasWindow ? str.replace(/[|\\[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d") : str.replace(/[|\\[\]^$+*?.]/g, "\\$&");
};

// src/matcher/expression.ts
var import_emptyObj7 = __toESM(require_emptyObj());

// src/matcher/checkers.ts
var import_isFunc = __toESM(require_isFunc());
var import_emptyObj6 = __toESM(require_emptyObj());
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
    const replace = (0, import_isFunc.isFunc)(replaceWith) ? replaceWith.apply(null, args) : replaceWith;
    regexStr = `${startStr}${startSl}${replace}${endSl.join(match)}`;
  });
  return regexStr;
};
var convertToRegex = (match, opts = import_emptyObj6.emptyObj) => {
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

// src/matcher/expression.ts
var extractParameters = (text, stepMatcher, wordMatches, opts = import_emptyObj7.emptyObj) => {
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
var findAsRegex = (definition, text, opts = import_emptyObj7.emptyObj) => {
  const escaped = escapeStr(definition.match);
  const { regex: regexAlts } = checkAlternative(escaped);
  const {
    optional,
    transformers,
    regex: regexConverted
  } = convertToRegex(regexAlts, opts);
  const { regex: regexAnchors } = checkAnchors(regexConverted);
  const found = matchRegex({ ...definition, match: regexAnchors }, text);
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
var parseExpParams = ({
  text,
  match,
  $world,
  definition,
  transformers,
  opts = import_emptyObj7.emptyObj
}) => {
  const params = extractParameters(
    text,
    definition.match,
    match,
    opts
  );
  if (!(params == null ? void 0 : params.length))
    return [];
  const converted = convertTypes(params, transformers, $world, opts.worldReplace);
  return converted.length !== params.length ? void 0 : converted;
};
var matchExpression = (definition, text, $world, opts = import_emptyObj7.emptyObj) => {
  if (definition.match === text)
    return { definition, match: [] };
  const {
    found,
    optional,
    transformers
  } = findAsRegex(definition, text, opts);
  if (!found || !found.definition || !found.match && !optional)
    return import_emptyObj7.emptyObj;
  if (opts.parseParams === false)
    return { ...found, definition, transformers, optional };
  const parsed = parseExpParams({
    opts,
    text,
    $world,
    definition,
    transformers,
    match: found.match
  });
  return !parsed ? import_emptyObj7.emptyObj : { definition, match: parsed };
};

// src/matcher/matcher.ts
var { REGEX_VARIANT } = constants;
var Matcher = class {
  parkin;
  options = import_emptyObj8.emptyObj;
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
    const defs = definitions || ((_c = (_b = (_a = this.parkin) == null ? void 0 : _a.steps) == null ? void 0 : _b.list) == null ? void 0 : _c.call(_b)) || import_emptyArr2.emptyArr;
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
  expression = (def, text, $world, opts = import_emptyObj8.emptyObj) => {
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
  expressionFind = (def, text, opts = import_emptyObj8.emptyObj) => findAsRegex(
    def,
    text,
    opts || this.options
  );
  regex = matchRegex;
  types = getParamTypes;
  register = registerParamType;
};
var matcher = (definitions, text, $world, opts = import_emptyObj8.emptyObj) => {
  if (!text.trim())
    return import_emptyObj8.emptyObj;
  const defLength = definitions.length;
  for (let idx = 0; idx < defLength; idx++) {
    const definition = definitions[idx];
    if (!definition.match)
      continue;
    const found = definition.variant !== REGEX_VARIANT ? matchExpression(definition, text, $world, opts) : matchRegex(definition, text);
    if (found.match)
      return found;
  }
  return import_emptyObj8.emptyObj;
};

// src/steps.ts
var import_isArr = __toESM(require_isArr());
var import_isStr3 = __toESM(require_isStr());

// src/utils/worldReplace.ts
var import_get2 = __toESM(require_get());
var import_exists2 = __toESM(require_exists());
var import_isFunc2 = __toESM(require_isFunc());
var {
  ALIAS_REF: ALIAS_REF2,
  WORLD_REF,
  ALIAS_WORLD_KEY: ALIAS_WORLD_KEY2,
  WORLD_AT_RUNTIME,
  ALIAS_REF_AT_RUNTIME
} = constants;
var attemptReplace = (match, world, location) => {
  const replaceWith = (0, import_get2.get)(world, location);
  return (0, import_isFunc2.isFunc)(replaceWith) ? replaceWith(world, location) : (0, import_exists2.exists)(replaceWith) ? replaceWith : match;
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
var import_ensureArr = __toESM(require_ensureArr());
var import_capitalize3 = __toESM(require_capitalize());

// src/utils/buildDefinitionCtx.ts
var buildDefinitionCtx = (world, step, options) => {
  const ctx = { step, world };
  (step == null ? void 0 : step.doc) && (ctx.doc = step == null ? void 0 : step.doc);
  (step == null ? void 0 : step.table) && (ctx.table = step == null ? void 0 : step.table);
  options && (ctx.options = options);
  return ctx;
};

// src/definitions/joinAllDefs.ts
var joinAllDefs = (instance) => {
  return instance.types.reduce(
    (stepDefs, type) => stepDefs.concat(instance[`_${type}`]),
    []
  );
};

// src/definitions/registerFromCall.ts
var import_emptyObj9 = __toESM(require_emptyObj());
var import_capitalize = __toESM(require_capitalize());
var { REGEX_VARIANT: REGEX_VARIANT2, EXPRESSION_VARIANT } = constants;
var getContent = (def) => {
  const match = def.variant === REGEX_VARIANT2 ? def.match.toString() : `"${def.match}"`;
  return `${(0, import_capitalize.capitalize)(def.type)}(${match}, ${def.method.toString()})`;
};
var stringToRegex = (str) => {
  const main = str.match(/\/(.+)\/.*/)[1];
  const options = str.match(/\/.+\/(.*)/)[1];
  return new RegExp(main, options);
};
var registerFromCall = function(internalType, type, match, method, meta = import_emptyObj9.emptyObj) {
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
var import_eitherArr = __toESM(require_eitherArr());
var import_capitalize2 = __toESM(require_capitalize());
var registerFromParse = function(definitions) {
  const DEF_TYPES = this.types.map((type) => (0, import_capitalize2.capitalize)(type));
  const container = DEF_TYPES.reduce((built, type) => {
    built[type] = [];
    return built;
  }, {});
  (0, import_eitherArr.eitherArr)(definitions, [definitions]).map((definition) => {
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
      this[(0, import_capitalize3.capitalize)(type)] = (match, method, meta) => {
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
   * Includes helpers to replace the step text with content from the world
   * And adds the step definition ctx as the last argument passed to the matching def
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
    const ctx = buildDefinitionCtx(this._world, step, options);
    found.match.push(ctx);
    return found;
  };
  /**
   * Finds a matching step definition from the passed in text
   * Steps must be registered with this instance to be found
   * @memberof Steps
   * @function
   * @public
   *
   */
  find = (text, options) => {
    const list = this.list();
    const found = matcher(
      list,
      text,
      this._world,
      options
    );
    return !found.match || !found.definition ? false : found;
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
    return found ? found.definition.method(...found.match) : throwMissingDef(text);
  };
  /**
   * Registers a step definition by type based on passed in args
   * @memberof Steps
   * @function
   * @public
   *
   */
  register = (...args) => {
    return (0, import_isStr3.isStr)(args[0]) ? registerFromCall.apply(this, args) : registerFromParse.apply(this, args);
  };
  add = (...defs) => {
    const definitions = this.list();
    defs.forEach((def) => {
      const defsObj = (0, import_isArr.isArr)(def) || (def == null ? void 0 : def.match) && (def == null ? void 0 : def.uuid) ? (0, import_ensureArr.ensureArr)(def) : def;
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
var import_noOp2 = __toESM(require_noOp());
var import_isFunc3 = __toESM(require_isFunc());
var import_noPropArr = __toESM(require_noPropArr());
var { HOOK_TYPES } = constants;
var Hooks = class {
  afterAll = import_noOp2.noOp;
  beforeAll = import_noOp2.noOp;
  afterEach = import_noOp2.noOp;
  beforeEach = import_noOp2.noOp;
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
        if (!(0, import_isFunc3.isFunc)(clientHookFn))
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
    const foundHooks = this.types.includes(type) ? this._registeredHooks[type] || import_noPropArr.noPropArr : throwInvalidHookType(HOOK_TYPES.join(", "), type);
    if (!foundHooks)
      return;
    return foundHooks.length ? async () => {
      return foundHooks.reduce(async (toResolve, hook) => {
        await toResolve;
        return await hook(this.instance);
      }, Promise.resolve());
    } : import_noOp2.noOp;
  };
};

// src/utils/hasTag.ts
var import_isStr4 = __toESM(require_isStr());
var import_isArr2 = __toESM(require_isArr());
var import_emptyArr3 = __toESM(require_emptyArr());
var import_eitherArr2 = __toESM(require_eitherArr());
var parseTags = (tags) => {
  const parsed = (0, import_isStr4.isStr)(tags) ? tags.match(/([@](\w|-)*)/g) : (0, import_isArr2.isArr)(tags) ? tags : import_emptyArr3.emptyArr;
  return parsed.filter((tag) => (0, import_isStr4.isStr)(tag) && tag.startsWith(`@`) && tag.length > 2);
};
var hasTag = (itemTags = import_emptyArr3.emptyArr, compareTags = import_emptyArr3.emptyArr) => {
  const iTags = (0, import_isStr4.isStr)(itemTags) ? parseTags(itemTags) : (0, import_eitherArr2.eitherArr)(itemTags, []);
  const cTags = (0, import_isStr4.isStr)(compareTags) ? parseTags(compareTags) : (0, import_eitherArr2.eitherArr)(compareTags, []);
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
var RX_COMMENT = /^\s*#(.*)$/;
var RegStepItems = [
  { regex: RX_STEP, type: "step" /* step */ },
  { regex: RX_GIVEN, type: "given" /* given */ },
  { regex: RX_WHEN, type: "when" /* when */ },
  { regex: RX_THEN, type: "then" /* then */ },
  { regex: RX_AND, type: "and" /* and */ },
  { regex: RX_BUT, type: "but" /* but */ },
  { regex: RX_ASTERISK, type: "*" /* * */ }
];
var findValidLineIdx = (index, lines) => {
  const line = lines[index];
  if (!line)
    return void 0;
  const notComment = !RX_COMMENT.test(line);
  const notEmpty = Boolean(line.trim().length);
  return notComment && notEmpty ? index : findValidLineIdx(index + 1, lines);
};
var getAfterLines = (index, lines) => {
  const idx = findValidLineIdx(index, lines);
  return !idx ? {} : {
    nextIndex: idx,
    nextLine: lines[idx],
    afterLines: lines.slice(idx)
  };
};
var checkDataTable = (step, lines, line, index) => {
  if (!RX_DATA_TABLE.test(line))
    return step;
  let tableEnd;
  step.table = {
    index,
    whitespace: line.split(`|`)[0],
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
  let docMatch = RX_DOC_QUOTES.test(line) && '"""' /* quotes */;
  docMatch = docMatch || RX_DOC_TICKS.test(line) && "```" /* ticks */;
  if (!docMatch)
    return step;
  const whitespace = line.split(docMatch)[0];
  const spacer = new Array(whitespace.length).fill("\\s").join("");
  const spacerRegex = new RegExp(`^${spacer}`);
  step.doc = {
    index,
    whitespace,
    type: docMatch === '"""' /* quotes */ ? "quote" /* quote */ : "tick" /* tick */,
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
  const {
    nextLine,
    nextIndex,
    afterLines
  } = getAfterLines(index + 1, lines);
  if (!nextIndex)
    return step;
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
var import_exists4 = __toESM(require_exists());
var import_emptyObj10 = __toESM(require_emptyObj());

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
var import_exists3 = __toESM(require_exists());
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
  !(0, import_exists3.exists)(scenario.scenario) ? scenario.scenario = scenarioText : scenario = scenarioFactory(scenarioText, void 0, index);
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
var import_isStr5 = __toESM(require_isStr());
var import_isBool = __toESM(require_isBool());
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
  const backgroundText = (0, import_isStr5.isStr)(existingBgText) ? existingBgText.trim() : "";
  (0, import_isBool.isBool)(background.background) ? background.background = backgroundText : background = backgroundFactory(backgroundText, parent, index);
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
var import_eitherArr3 = __toESM(require_eitherArr());
var RX_AS = /^\s*As (.*)$/;
var RX_COMMENT2 = /^\s*#(.*)$/;
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
  const reasonArr = (0, import_eitherArr3.eitherArr)(feature.reason, [feature.reason]);
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
  if (!RX_COMMENT2.test(line))
    return false;
  const comment = line.match(RX_COMMENT2)[0];
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
  const isOpts = !options && !(world == null ? void 0 : world.$alias) && (0, import_exists4.exists)(world == null ? void 0 : world.worldReplace);
  return {
    worldCfg: isOpts ? pWorld : world,
    opts: isOpts ? world : options || import_emptyObj10.emptyObj
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

// src/runner.ts
var import_isArr3 = __toESM(require_isArr());
var import_isObj2 = __toESM(require_isObj());
var import_isStr7 = __toESM(require_isStr());
var import_pickKeys = __toESM(require_pickKeys());
var import_emptyObj11 = __toESM(require_emptyObj());

// src/utils/filterFeatures.ts
var import_isStr6 = __toESM(require_isStr());
var import_exists5 = __toESM(require_exists());
var import_emptyArr4 = __toESM(require_emptyArr());
var import_eitherArr4 = __toESM(require_eitherArr());
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
  const tags = (0, import_isStr6.isStr)(filterTags) ? parseTags(filterTags) : (0, import_eitherArr4.eitherArr)(filterTags, []);
  return { name, tags };
};
var filterChild = ({
  options,
  nameKey,
  children,
  tags = import_emptyArr4.emptyArr
}) => {
  return children.filter((child) => {
    var _a;
    return filterMatch({
      options,
      name: child[nameKey],
      tags: [...((_a = child == null ? void 0 : child.tags) == null ? void 0 : _a.tokens) || import_emptyArr4.emptyArr, ...tags]
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
    const matchingBackground = (0, import_exists5.exists)(background) && filterChild({
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

// src/runner.ts
var import_capitalize4 = __toESM(require_capitalize());

// src/utils/testMethods.ts
var import_get3 = __toESM(require_get());
var import_noOp3 = __toESM(require_noOp());
var { SPEC_RESULT_LOG, LOG_JEST_SPEC_ENV } = constants;
var logResultToTerminal = (result) => {
  const timestamp = (/* @__PURE__ */ new Date()).getTime();
  (0, import_get3.get)(process, `env.${LOG_JEST_SPEC_ENV}`) && process.stdout.write(
    [
      SPEC_RESULT_LOG,
      JSON.stringify({ ...result, timestamp }),
      SPEC_RESULT_LOG
    ].join(``)
  );
};
var getSuiteData = (suite) => {
  const description = (0, import_get3.get)(suite, `description`);
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
  return testMode ? import_noOp3.noOp : globalThis[type] || testMethodFill(type);
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
var emptyOpts2 = { tags: {}, steps: {} };
var getStepOpts = (step, options = emptyOpts2) => {
  var _a, _b;
  const shared = (_a = options == null ? void 0 : options.steps) == null ? void 0 : _a.shared;
  const single = (_b = options == null ? void 0 : options.steps) == null ? void 0 : _b[step == null ? void 0 : step.uuid];
  const retry = (single == null ? void 0 : single.retry) || (shared == null ? void 0 : shared.retry) || (options == null ? void 0 : options.retry);
  const timeout = (single == null ? void 0 : single.timeout) || (shared == null ? void 0 : shared.timeout) || (options == null ? void 0 : options.timeout);
  const joined = { ...shared, ...single };
  if (retry)
    joined.retry = retry;
  if (timeout)
    joined.timeout = timeout;
  return joined;
};
var buildTitle = (text, type) => `${(0, import_capitalize4.capitalize)(type)} > ${text}`;
var resolveFeatures = (data, $world) => {
  return (0, import_isStr7.isStr)(data) ? parseFeature(data, $world) : (0, import_isObj2.isObj)(data) ? [data] : (0, import_isArr3.isArr)(data) ? data.reduce(
    (features, feature) => features.concat(resolveFeatures(feature, $world)),
    []
  ) : throwMissingFeatureText();
};
var runStep = (stepsInstance, step, options = emptyOpts2, testMode) => {
  var _a, _b, _c, _d, _e;
  const test = getTestMethod("test" /* test */, testMode);
  const stepOpts = getStepOpts(step, options);
  const found = stepsInstance.find(step.step, { ...stepOpts, parseParams: false });
  const defOpts = found ? (_a = found == null ? void 0 : found.definition.meta) == null ? void 0 : _a.test : import_emptyObj11.emptyObj;
  const opts = { ...defOpts, ...stepOpts };
  const disabled = (opts == null ? void 0 : opts.disabled) || hasTag((_b = step == null ? void 0 : step.tags) == null ? void 0 : _b.tokens, (_c = options == null ? void 0 : options.tags) == null ? void 0 : _c.disabled);
  const testMethod = async () => {
    if (!found)
      return throwMissingDef(step.step);
    if (disabled)
      return;
    const parsed = parseExpParams({
      opts,
      match: found.match,
      definition: found.definition,
      $world: stepsInstance._world,
      transformers: found.transformers,
      text: replaceWorld(step.step, stepsInstance._world)
    });
    if (!parsed)
      return throwInvalidDefParams(`
Step text: "${step.step}"`);
    const ctx = buildDefinitionCtx(stepsInstance._world, step, opts);
    parsed.push(ctx);
    return await found.definition.method(...parsed);
  };
  testMethod.ParkinMetaData = {
    disabled,
    ...(0, import_pickKeys.pickKeys)(step, [`uuid`, `step`, `index`, `tags`, `type`, `definition`])
  };
  const inJest = ((_d = process == null ? void 0 : process.env) == null ? void 0 : _d.JEST_WORKER_ID) !== void 0;
  const jestOverride = ((_e = process == null ? void 0 : process.env) == null ? void 0 : _e.JEST_FORCE_OVERRIDE) !== void 0;
  const last = inJest && !jestOverride ? opts.timeout : opts;
  return test(`${(0, import_capitalize4.capitalize)(step.type)} ${step.step}`, testMethod, last);
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
    ...(0, import_pickKeys.pickKeys)(parent, [`index`, `uuid`, `tags`, `type`, `background`, `scenario`])
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
    ...(0, import_pickKeys.pickKeys)(
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
        ...(0, import_pickKeys.pickKeys)(
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
var import_exists6 = __toESM(require_exists());
var formatAssembled = (assembled) => {
  return Array.from(assembled, (line) => (0, import_exists6.exists)(line) ? `${line.trimEnd()}
` : "\n").join("").trimEnd().concat(` `, `
`);
};
var addContent = (assembled, content, index) => {
  !(0, import_exists6.exists)(index) || index === false ? assembled.push(content) : (0, import_exists6.exists)(assembled[index]) ? assembled.splice(index, 0, content) : assembled[index] = content;
};
var getWhiteSpace = (ast, parent, def = ``) => {
  return (0, import_exists6.exists)(ast.whitespace) ? ast.whitespace : (0, import_exists6.exists)(parent == null ? void 0 : parent.whitespace) ? `${parent == null ? void 0 : parent.whitespace}${def}` : def;
};
var getTextContent = (ast, parent, type, def = ``) => {
  const content = ast[ast.type] || ``;
  const whitespace = getWhiteSpace(ast, parent, def);
  const prefix = `${whitespace}${type}:`;
  return content.length ? `${prefix} ${content}` : prefix;
};

// src/assemble/assembleParts.ts
var import_exists7 = __toESM(require_exists());
var import_capitalize5 = __toESM(require_capitalize());
var assembleFeature = (assembled, { ast, parent }) => {
  const feature = ast;
  addContent(
    assembled,
    getTextContent(feature, parent, "Feature" /* Feature */, ``),
    feature.index
  );
};
var assembleStepDoc = (assembled, step) => {
  const { doc, whitespace: ws } = step;
  const docPrefix = doc.type === "tick" /* tick */ ? "```" /* ticks */ : '"""' /* quotes */;
  const whitespace = doc.whitespace ?? getWhiteSpace(doc, step, (0, import_exists7.exists)(ws) ? ws : `      `);
  addContent(assembled, `${whitespace}${docPrefix}`, doc.index);
  const lines = doc.content.split(`
`).map((line, idx) => addContent(assembled, `${whitespace}  ${line}`, doc.index + idx + 1));
  addContent(assembled, `${whitespace}${docPrefix}`, doc.index + lines.length + 1);
};
var assembleStepTable = (assembled, step) => {
  const { table, whitespace: ws } = step;
  const whitespace = table.whitespace ?? getWhiteSpace(table, step, (0, import_exists7.exists)(ws) ? ws : `      `);
  const colLengths = {};
  table.content.forEach((row, idx) => {
    row.forEach((col, cIdx) => {
      const ref = `${cIdx}`;
      const cur = colLengths[ref];
      const local = col.length;
      if (!cur || cur < local)
        colLengths[ref] = local;
    });
  });
  table.content.forEach((row, idx) => {
    const joined = [];
    row.forEach((col, cIdx) => {
      const ref = `${cIdx}`;
      const cur = colLengths[ref];
      const local = col.length;
      if (cur > local) {
        const diff = cur - local;
        const add = new Array(diff).fill(" ").join("");
        joined.push(`${col}${add}`);
      } else
        joined.push(col);
    });
    addContent(assembled, `${whitespace}| ${joined.join(` | `)} |`, table.index + idx);
  });
};
var assembleStep = (assembled, { ast, parent }) => {
  const step = ast;
  const whitespace = getWhiteSpace(
    step,
    parent,
    (0, import_exists7.exists)(parent == null ? void 0 : parent.whitespace) ? `${parent == null ? void 0 : parent.whitespace}  ` : `    `
  );
  const type = step.type !== "step" /* step */ ? (0, import_capitalize5.capitalize)(step.type) : `Step`;
  const text = `${whitespace}${type} ${step.step || ``}`;
  addContent(assembled, text, step.index);
  step.doc && assembleStepDoc(assembled, step);
  step.table && assembleStepTable(assembled, step);
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
    if (!item)
      return assembled2;
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
var import_isArr4 = __toESM(require_isArr());
var import_omitKeys = __toESM(require_omitKeys());
var import_emptyObj12 = __toESM(require_emptyObj());
var import_ensureArr2 = __toESM(require_ensureArr());
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
var formatStory = (feature, opts = import_emptyObj12.emptyObj) => {
  const { desire, perspective, reason } = feature;
  let lastIdx = feature.index;
  if (reason)
    (0, import_isArr4.isArr)(reason) ? (0, import_ensureArr2.ensureArr)(reason).forEach((res) => lastIdx = res.index > lastIdx ? res.index : lastIdx) : lastIdx = reason.index;
  else if (desire)
    lastIdx = desire.index;
  else if (perspective)
    lastIdx = perspective.index;
  addEmptyLine(feature, lastIdx, opts);
  return feature;
};
var formatOptions = (feature, opts = import_emptyObj12.emptyObj) => {
  const keys = [];
  const {
    removeEmpty,
    removeComments,
    emptyAfterStory,
    emptyAfterFeature
  } = opts;
  removeEmpty && keys.push(`empty`);
  removeComments && keys.push(`comments`);
  const updated = (0, import_omitKeys.omitKeys)(feature, keys);
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
var formatFeature = (feature, opts = import_emptyObj12.emptyObj) => {
  let updated = formatOptions(feature, opts);
  updated = formatBackground(updated, updated, opts);
  updated = formatRules(updated, opts);
  updated = formatScenarios(updated, updated, opts);
  return updated;
};

// src/assemble/feature.ts
var import_isObj4 = __toESM(require_isObj());
var import_emptyObj13 = __toESM(require_emptyObj());

// src/assemble/findIndex.ts
var import_isObj3 = __toESM(require_isObj());
var import_isArr5 = __toESM(require_isArr());
var import_isNum = __toESM(require_isNum());
var import_exists8 = __toESM(require_exists());
var import_emptyArr5 = __toESM(require_emptyArr());
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
      ...feature.empty || import_emptyArr5.emptyArr,
      ...feature.comments || import_emptyArr5.emptyArr
    ],
    index
  );
};
var validObj = (child) => {
  return (0, import_isObj3.isObj)(child) && (0, import_isNum.isNum)(child == null ? void 0 : child.index);
};
var validArr = (childArr) => {
  return (0, import_isArr5.isArr)(childArr) && (childArr == null ? void 0 : childArr.length);
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
    if ((0, import_exists8.exists)(idx))
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
  if (!validObj(step))
    return (parent == null ? void 0 : parent.index) + 1;
  if (step.doc) {
    const docIdx = step.doc.index;
    const contentLength = step.doc.content.split(`
`).length;
    return docIdx + contentLength + 2;
  }
  if (step.table) {
    const tableIdx = step.table.index;
    const contentLength = step.table.content.length;
    return tableIdx + contentLength + 2;
  }
  return step.index + 1;
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
var import_exists9 = __toESM(require_exists());
var addToIndexes = (feature, indexes, item, offset) => {
  const index = (0, import_exists9.exists)(item.ast.index) ? item.ast.index : findIndex({
    feature,
    parent: item.parent,
    type: item.ast.type
  });
  const preAmount = offset.reduce((acc, val, idx) => {
    return idx <= index && (0, import_exists9.exists)(val) ? acc + val : acc;
  }, 0);
  if (!indexes[index] && !preAmount) {
    indexes[index] = item;
    return indexes;
  }
  offset[index] = (0, import_exists9.exists)(offset[index]) ? offset[index] + 1 : 1;
  const newIdx = index + preAmount + 1;
  item.ast.index = newIdx;
  const updatedLen = indexes.length + 1;
  newIdx <= updatedLen ? indexes.splice(newIdx, 0, item) : indexes.splice(newIdx, 0, ...Array(newIdx - updatedLen), item);
  return indexes;
};

// src/assemble/featureToIndexes.ts
var import_isArr6 = __toESM(require_isArr());
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
  (0, import_isArr6.isArr)(reason) ? reason.forEach((res) => addToIndexes(feature, indexes, { ast: res, parent }, offset)) : addToIndexes(feature, indexes, { ast: reason, parent }, offset);
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
  return indexes.filter((item) => item);
};

// src/assemble/feature.ts
var import_eitherArr5 = __toESM(require_eitherArr());
var assembleFeature2 = (toAssemble, opts = import_emptyObj13.emptyObj) => {
  return (0, import_eitherArr5.eitherArr)(toAssemble, [toAssemble]).map((feature) => {
    !(0, import_isObj4.isObj)(feature) && throwFeatureNotAnObj(feature);
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
var import_get4 = __toESM(require_get());
var findInFeature = (props) => {
  var _a;
  const { id, uuid, feature } = props;
  const ref = id || uuid;
  if (!ref)
    return;
  const loc = (_a = ref == null ? void 0 : ref.toLowerCase) == null ? void 0 : _a.call(ref).split(`.`).reduce((acc, part) => {
    if (part.startsWith("feature" /* feature */))
      return acc;
    const child = ParentTypes.includes(part) ? part === "scenario" /* scenario */ ? "scenarios" /* scenarios */ : part === "rule" /* rule */ ? "rules" /* rules */ : "background" /* background */ : StepTypes.includes(part) ? "steps" /* steps */ : part;
    child && acc.push(child);
    return acc;
  }, []);
  return (0, import_get4.get)(feature, loc);
};

// src/parkin.ts
var import_isObj5 = __toESM(require_isObj());
var import_emptyObj14 = __toESM(require_emptyObj());
var import_eitherArr6 = __toESM(require_eitherArr());
var import_capitalize6 = __toESM(require_capitalize());
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
    (0, import_isObj5.isObj)(world) && this.init(world, steps);
  }
  get world() {
    return this.#world;
  }
  set world(update) {
    this.#world = update;
    this.steps._world = update;
    this.runner._world = update;
  }
  init = (world = import_emptyObj14.emptyObj, steps, warn = true) => {
    if (this.#isInit) {
      warn && console.warn(`This instance of parkin has already been initialized!`);
      return;
    }
    if (!(0, import_isObj5.isObj)(world.$alias))
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
    (0, import_isObj5.isObj)(steps) && this.registerSteps(steps);
    this.steps.types.map((type) => {
      this[(0, import_capitalize6.capitalize)(type)] = (matcher2, method, meta) => this.steps.register(`_${type}`, type, matcher2, method, meta);
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
          this.steps[(0, import_capitalize6.capitalize)(type)](matcher2, ...(0, import_eitherArr6.eitherArr)(content, [content]));
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

// src/utils/promiseAbort.ts
var cleanup = (prom) => {
  if (!prom)
    return;
  prom.abort = void 0;
  prom.controller = void 0;
  delete prom.abort;
  delete prom.controller;
};
var PromiseAbort = (opts) => {
  const controller = opts.controller || new AbortController();
  const signal = controller.signal;
  const promise = new Promise(async (res, rej) => {
    let resp;
    let error;
    try {
      resp = await opts.promise({ signal });
    } catch (err) {
      error = err;
    } finally {
      cleanup(promise);
      return signal.aborted ? res(void 0) : error ? rej(error) : res(resp);
    }
  });
  promise.controller = controller;
  promise.abort = () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller);
    cleanup(promise);
  };
  return promise;
};

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EAstObject,
  EBlockLoc,
  EDocType,
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
  ParentTypes,
  Parkin,
  ParkinAbortErrName,
  ParkinBailErrName,
  PromiseAbort,
  PromiseRetry,
  PromiseTimeout,
  StepTypes,
  constants
});
//# sourceMappingURL=index.js.map
