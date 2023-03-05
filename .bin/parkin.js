#! /usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// src/types/features.types.ts
var init_features_types = __esm({
  "src/types/features.types.ts"() {
  }
});

// src/types/parkin.types.ts
var init_parkin_types = __esm({
  "src/types/parkin.types.ts"() {
  }
});

// src/types/world.types.ts
var init_world_types = __esm({
  "src/types/world.types.ts"() {
  }
});

// src/types/gobal.types.ts
var init_gobal_types = __esm({
  "src/types/gobal.types.ts"() {
  }
});

// src/types/helpers.types.ts
var EHookType, EStepType;
var init_helpers_types = __esm({
  "src/types/helpers.types.ts"() {
    EHookType = /* @__PURE__ */ ((EHookType2) => {
      EHookType2["beforeAll"] = `beforeAll`;
      EHookType2["afterAll"] = `afterAll`;
      EHookType2["beforeEach"] = `beforeEach`;
      EHookType2["afterEach"] = `afterEach`;
      return EHookType2;
    })(EHookType || {});
    EStepType = /* @__PURE__ */ ((EStepType2) => {
      EStepType2["given"] = `given`;
      EStepType2["when"] = `when`;
      EStepType2["then"] = `then`;
      EStepType2["and"] = `and`;
      EStepType2["but"] = `but`;
      return EStepType2;
    })(EStepType || {});
  }
});

// src/types/test.types.ts
var init_test_types = __esm({
  "src/types/test.types.ts"() {
  }
});

// src/types/steps.types.ts
var init_steps_types = __esm({
  "src/types/steps.types.ts"() {
  }
});

// src/types/assemble.types.ts
var init_assemble_types = __esm({
  "src/types/assemble.types.ts"() {
  }
});

// src/types/index.ts
var init_types = __esm({
  "src/types/index.ts"() {
    init_features_types();
    init_parkin_types();
    init_world_types();
    init_gobal_types();
    init_helpers_types();
    init_test_types();
    init_steps_types();
    init_assemble_types();
  }
});

// node_modules/@keg-hub/jsutils/build/umd/index.js
var require_umd = __commonJS({
  "node_modules/@keg-hub/jsutils/build/umd/index.js"(exports, module2) {
    !function(e2, t2) {
      "object" == typeof exports && "undefined" != typeof module2 ? t2(exports) : "function" == typeof define && define.amd ? define(["exports"], t2) : t2((e2 = "undefined" != typeof globalThis ? globalThis : e2 || self).jsutils = {});
    }(exports, function(e2) {
      "use strict";
      const t2 = { SHOULD_LOG: true, SHOULD_THROW: false, LOG_PREFIX: null }, r2 = () => true, n2 = (e3, n3 = {}, i3 = {}) => {
        const { logs: u2 = t2.SHOULD_LOG, throws: l3 = t2.SHOULD_THROW, prefix: c3 = t2.LOG_PREFIX } = i3, a2 = Object.entries(e3).map(([e4, t3]) => o2(e4, t3, n3[e4] || n3.$default || r2)), { success: f2, cases: p2 } = a2.reduce((e4, t3) => s(e4, t3, { logs: u2, throws: l3, prefix: c3 }), { success: true, cases: {} });
        return [f2, p2];
      };
      n2.setOptions = ({ logs: e3, throws: r3, prefix: n3 }) => {
        void 0 !== e3 && (t2.SHOULD_LOG = e3), void 0 !== r3 && (t2.SHOULD_THROW = r3), void 0 !== n3 && (t2.LOG_PREFIX = n3);
      }, n2.resetOptions = () => {
        t2.SHOULD_LOG = true, t2.SHOULD_THROW = false, t2.LOG_PREFIX = null;
      };
      const o2 = (e3, t3, r3) => {
        const n3 = r3(t3), o3 = !r3.name || r3.name === e3 || "$default" === r3.name ? r3.toString() : r3.name;
        return { success: n3, key: e3, value: t3, validator: r3, reason: n3 ? null : [`Argument "${e3}" with value `, t3, ` failed validator: ${o3}.`] };
      }, s = (e3, t3, { logs: r3, throws: n3, prefix: o3 }) => (!t3.success && i2(t3, r3, n3, o3), { success: e3.success && t3.success, cases: { ...e3.cases, [t3.key]: t3 } }), i2 = (e3, t3, r3, n3) => {
        const o3 = n3 ? [n3, ...e3.reason] : e3.reason;
        if (r3)
          throw new Error(o3.join());
        t3 && console.error(...o3);
      }, u = (e3) => Array.isArray(e3), l2 = (e3) => {
        const t3 = /* @__PURE__ */ new Map();
        for (let n3 = 0; n3 < e3.length; n3++) {
          var r3;
          const o3 = e3[n3], s2 = null !== (r3 = t3.get(o3)) && void 0 !== r3 ? r3 : 0;
          t3.set(o3, s2 + 1);
        }
        return t3;
      }, c2 = (e3, t3) => {
        if (e3.size !== t3.size)
          return false;
        for (let [r3, n3] of e3) {
          if (t3.get(r3) !== n3)
            return false;
        }
        return true;
      }, a = (e3) => "object" == typeof e3 && !Array.isArray(e3) && null !== e3, f = (e3) => u(e3) ? e3 : [e3], p = (e3) => "function" == typeof e3, d = (e3) => (Object.freeze(e3), Object.getOwnPropertyNames(e3).map((t3) => {
        e3.hasOwnProperty(t3) && null !== e3[t3] && ("object" == typeof e3[t3] || p(e3[t3])) && !Object.isFrozen(e3[t3]) && d(e3[t3]);
      }), e3), g = Object.freeze({}), m = d({ content: {} }), y = d([]), h = (e3) => e3 == e3 && null != e3, O = (e3, t3, r3) => {
        for (let n3 = 0; n3 < e3.length; n3++) {
          const o3 = e3[n3];
          u(o3) ? O(o3, t3, r3) : r3.exists && !h(o3) || r3.truthy && !o3 || t3.push(o3);
        }
        return r3.mutate ? (Object.assign(e3, t3).splice(t3.length), e3) : t3;
      }, b = (e3, t3) => O(e3, [], a(t3) ? t3 : g), j = (e3, t3) => {
        if (u(t3)) {
          const [r3, ...n3] = t3;
          return r3(e3, ...n3);
        }
        return p(t3) ? t3(e3) : (console.error("Pipeline expected either a function or an array (for function expressions). Found " + typeof t3), e3);
      }, w = (e3, ...t3) => t3.reduce((e4, t4) => j(e4, t4), e3), S = (e3) => "string" == typeof e3, A = (e3, t3) => {
        if (!S(e3))
          return e3;
        if (!p(t3))
          return e3;
        let r3 = "";
        for (const n3 of e3)
          r3 += t3(n3);
        return r3;
      }, $ = (e3) => e3 === e3.toLowerCase(), v = (e3) => e3 === e3.toUpperCase(), _ = (e3, t3, r3 = ["-", "_", " "]) => {
        if (!S(e3))
          return e3;
        const n3 = (e4) => r3.some((t4) => t4 === e4);
        let o3 = "_";
        return A(e3, (e4) => n3(e4) ? (o3 = t3, t3) : v(e4) && $(o3) && !n3(o3) ? (o3 = e4, t3 + e4) : (o3 = e4, e4));
      }, C = (e3, t3 = true) => {
        if (!S(e3) || !e3[0])
          return e3;
        const r3 = t3 ? e3.slice(1).toLowerCase() : e3.slice(1);
        return `${e3[0].toUpperCase()}${r3}`;
      }, x = (e3) => {
        const t3 = 0 === e3.indexOf(".") ? e3.slice(1) : e3;
        return t3.indexOf(".") === t3.length - 1 ? t3.slice(0, -1) : t3;
      }, E = (e3) => e3 && x(e3).replace(/[-_]/gm, " ") || e3, F = (e3, t3) => e3 && E(e3).split(/[\s_-]/gm).reduce((e4, r3, n3) => r3 ? e4 += (n3 > 0 || t3) && C(r3) || r3.toLowerCase() : e4, "") || e3, P = (e3) => null == e3 ? "" : S(e3) ? e3 : JSON.stringify(e3), R = /[A-Z]/g, L = /^ms-/, T = {}, I = (e3) => "-" + e3.toLowerCase(), N = (e3) => "number" == typeof e3 && e3 != e3, U = (e3) => "number" == typeof e3 && !N(e3), D = (e3) => U(e3) && e3 >= 0, k = (e3) => S(e3) && e3.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") || e3, M = (e3) => "object" == typeof e3 && null !== e3, q = (e3, t3, r3, n3) => {
        const o3 = e3;
        if (!M(e3) || !e3 || !t3)
          return "set" !== r3 && n3 || void 0;
        const s2 = u(t3) ? Array.from(t3) : t3.split("."), i3 = s2.pop();
        let l3, c3;
        for (; l3 = s2.shift(); ) {
          const t4 = e3[l3];
          if (M(t4) || p(t4) ? e3 = t4 : ("set" === r3 ? e3[l3] = {} : c3 = true, e3 = e3[l3]), c3)
            return n3;
        }
        return "get" === r3 ? i3 in e3 ? e3[i3] : n3 : "unset" === r3 ? delete e3[i3] : (e3[i3] = n3) && o3 || o3;
      }, z = (e3, t3, r3) => q(e3, t3, "get", r3), B = (e3, t3, r3 = "") => {
        t3 = M(t3) && t3 || {};
        const n3 = B.regex || /\${(.*?)\}/g;
        return S(e3) ? e3.replace(n3, (e4, n4) => {
          const o3 = (n4 || e4.substr(2, e4.length - 3)).trim(), s2 = z(t3, o3, r3);
          return p(s2) ? s2(t3, o3, r3) : s2;
        }) : console.error("template requires a string as the first argument") || e3;
      }, J = ['"', "'"], H = (e3) => {
        if (!S(e3))
          return;
        let t3 = "";
        for (let r3 of e3)
          t3 = r3 + t3;
        return t3;
      }, G = (e3, t3, r3) => r3.map((r4) => e3.indexOf(r4, t3)).sort().find((e4) => e4 >= 0), W = (e3, t3, r3 = [" "]) => {
        const n3 = G(e3, t3, r3);
        return e3.substring(t3, -1 === n3 ? e3.length : n3);
      }, K = (e3) => "boolean" == typeof e3, X = (e3) => "false" === e3 || "true" === e3, Q = (e3) => K(e3) ? P(e3) : e3 && "false" !== e3 && "0" !== e3 ? "true" : "false", V = (e3) => Boolean(e3 || "" === e3 || 0 === e3), Z = (e3) => X(e3) ? "true" === e3 : "true" === Q(e3), Y = (e3) => P(e3).replace(/([^.\d])/gm, ""), ee = (e3) => U(e3) ? e3 : e3 && !N(e3) && Number(Y(e3)) || 0, te = (e3) => S(e3) || U(e3) || K(e3), re = (e3, t3) => {
        const [r3] = n2({ x: e3, y: t3 }, { $default: te });
        return r3 ? S(e3) ? e3.localeCompare(t3) : e3 - t3 : null;
      }, ne = (e3) => e3, oe = (e3, t3) => Object.prototype.hasOwnProperty.call(e3, t3), se = (e3) => {
        const t3 = function(...r3) {
          return e3 instanceof t3 || z(e3.prototype, "constructor.name") ? new e3(...r3) : e3.apply(e3, r3);
        };
        for (let r3 in e3)
          e3.hasOwnProperty(r3) && (t3[r3] = e3[r3]);
        return Object.defineProperty(t3, "name", { value: e3.name, configurable: true }), t3.toString = () => e3.toString(), t3;
      }, ie = (e3, t3 = /* @__PURE__ */ new WeakMap()) => {
        if (Object(e3) !== e3)
          return e3;
        if (e3 instanceof Set)
          return new Set(e3);
        if (t3.has(e3))
          return t3.get(e3);
        if (u(e3))
          return e3.map((e4) => ie(e4));
        if (p(e3))
          return se(e3);
        const r3 = e3 instanceof Date ? new Date(e3) : e3 instanceof RegExp ? new RegExp(e3.source, e3.flags) : e3.constructor ? null : /* @__PURE__ */ Object.create(null);
        return null === r3 ? ue(e3) : (t3.set(e3, r3), e3 instanceof Map ? Array.from(e3, ([e4, n3]) => r3.set(e4, ie(n3, t3))) : Object.assign(r3, ...Object.keys(e3).map((r4) => ({ [r4]: ie(e3[r4], t3) }))));
      }, ue = (e3) => {
        if (!e3)
          return e3;
        const t3 = Object.getPrototypeOf(e3), r3 = Object.getOwnPropertyDescriptors(e3);
        for (const [e4, t4] of Object.entries(r3))
          t4.value && (r3[e4].value = ie(t4.value));
        const n3 = Object.create(t3, r3);
        return Object.isFrozen(e3) && Object.freeze(n3), Object.isSealed(e3) && Object.seal(n3), n3;
      }, le = (e3) => e3 ? (e3 ^ 16 * Math.random() >> e3 / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, le), ce = (e3) => Object.prototype.toString.call(e3).slice(8, -1), ae = (e3, ...t3) => {
        if (!t3.length)
          return null;
        for (let r3 of t3) {
          if (!u(r3)) {
            console.error(`Matching case must be an entry (a 2-element array). Found: ${ce(r3)}`, r3);
            break;
          }
          const [t4, n3] = r3;
          if (p(t4) && t4(e3))
            return n3;
          if (t4 === e3)
            return n3;
        }
        return null;
      };
      ae.default = () => true;
      const fe = (e3) => a(e3) ? 0 === Object.keys(e3).length : u(e3) ? 0 === e3.length : S(e3) ? 0 === e3.trim().length : !!U(e3) && e3 < 1, pe = (e3, t3) => {
        const [r3] = n2({ arr: e3, comparator: t3 }, { arr: u, $default: p });
        return r3 && e3.length ? e3.reduce((e4, r4) => t3(e4, r4) > 0 ? e4 : r4) : null;
      }, de = (e3) => u(e3) ? e3.filter((e4, t3, r3) => r3.indexOf(e4) == t3) : e3, ge = (e3, t3) => {
        if (!t3)
          return de(e3);
        const { unique: r3 } = e3.reduce((e4, r4) => {
          const n3 = t3(r4);
          return !e4.set.has(n3) && e4.unique.push(r4), e4.set.add(n3), e4;
        }, { unique: [], set: /* @__PURE__ */ new Set() });
        return r3;
      }, me = (e3, t3 = true) => M(e3) ? Object.keys(e3).reduce((r3, n3) => {
        const o3 = e3[n3];
        return null == o3 || (r3[n3] = t3 && M(o3) ? me(o3) : o3), r3;
      }, a(e3) && {} || []) : console.error("cleanColl requires a collection as the first argument") || e3, ye = (e3, t3, r3) => q(e3, t3, "set", r3), he = Array.isArray, Oe = Object.keys, be = Object.prototype.hasOwnProperty, je = (e3, t3) => {
        if (e3 === t3)
          return true;
        if (!e3 || !t3 || "object" != typeof e3 || "object" != typeof t3)
          return e3 != e3 && t3 != t3;
        const r3 = he(e3), n3 = he(t3);
        let o3, s2, i3;
        if (r3 && n3) {
          if (s2 = e3.length, s2 != t3.length)
            return false;
          for (o3 = s2; 0 != o3--; )
            if (!je(e3[o3], t3[o3]))
              return false;
          return true;
        }
        if (r3 != n3)
          return false;
        const u2 = e3 instanceof Date, l3 = t3 instanceof Date;
        if (u2 != l3)
          return false;
        if (u2 && l3)
          return e3.getTime() == t3.getTime();
        const c3 = e3 instanceof RegExp, a2 = t3 instanceof RegExp;
        if (c3 != a2)
          return false;
        if (c3 && a2)
          return e3.toString() == t3.toString();
        const f2 = Oe(e3);
        if (s2 = f2.length, s2 !== Oe(t3).length)
          return false;
        for (o3 = s2; 0 != o3--; )
          if (!be.call(t3, f2[o3]))
            return false;
        for (o3 = s2; 0 != o3--; )
          if (i3 = f2[o3], !je(e3[i3], t3[i3]))
            return false;
        return true;
      }, we = (e3) => e3 && S(e3) ? X(e3) ? Z(e3) : U(e3) ? ee(e3) : (() => {
        try {
          return JSON.parse(e3);
        } catch (t3) {
          return e3;
        }
      })() : e3;
      let Se, Ae = "dir", $e = "type";
      const ve = ["error", "info", "log", "dir", "warn"], _e = (...e3) => {
        if (!e3.length)
          return;
        let t3 = 1 === e3.length ? Ae : e3.pop();
        (Se || "error" === t3) && ("string" == typeof e3[0] && ("type" === $e ? e3[0] = `[ ${t3.toUpperCase()} ] ${e3[0]}` : $e && (e3[0] = `${$e} ${e3[0]}`)), -1 !== ve.indexOf(t3) ? console[t3](...e3) : console[Ae](...e3, t3));
      }, Ce = (e3, t3) => {
        e3 && Object.entries(e3).map(([r3, n3]) => {
          t3 && -1 !== t3.indexOf(r3) || ("object" == typeof n3 && Ce(n3), e3[r3] = void 0, delete e3[r3]);
        });
      }, xe = (...e3) => e3.reduce((e4, t3) => {
        const r3 = ie(t3);
        return u(r3) ? [...u(e4) && e4 || [], ...r3] : a(r3) ? Object.entries(r3).reduce((e5, [t4, r4]) => ({ ...e5, [t4]: p(r4) ? se(r4) : M(r4) && t4 in e5 ? xe(e5[t4], r4) : ie(r4) }), e4) : e4;
      }, u(e3[0]) && [] || {}), Ee = (e3) => u(e3) && 2 === e3.length && (U(e3[0]) || S(e3[0])), Fe = (e3, t3) => {
        if (!u(e3) && !a(e3))
          return console.error(e3, "Expected array or object for obj. Found " + typeof e3), e3;
        if (!p(t3))
          return console.error("Expected function for cb. Found " + typeof t3), e3;
        const r3 = Object.entries(e3), n3 = u(e3) ? [] : {};
        return r3.reduce((e4, [r4, n4]) => {
          const o3 = t3(r4, n4);
          return Ee(o3) ? ye(e4, o3[0], o3[1]) : (console.error(`Callback function must return entry. Found: ${o3}. Using current entry instead.`), ye(e4, r4, n4));
        }, n3);
      }, Pe = (e3, t3, r3 = {}) => a(e3) && p(t3) && Object.entries(e3).reduce((e4, [r4, n3]) => t3(r4, n3, e4), r3) || r3, Re = (e3) => {
        if (!p(e3))
          throw "Argument must be a function";
        return (...t3) => new Promise((r3, n3) => p(t3[t3.length - 1]) ? (t3.pop(), t3.push((...e4) => e4 && e4[0] ? n3(...e4) : r3(...e4)), e3(...t3)) : r3(e3(...t3)));
      }, Le = Array.from(["caller", "callee", "arguments", "apply", "bind", "call", "toString", "__proto__", "__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "isPrototypeOf", "propertyIsEnumerable", "valueOf", "toLocaleString"]).concat(Object.getOwnPropertyNames(Object.prototype)).reduce((e3, t3) => (e3[t3] = true, e3), {}), Te = (e3) => {
        if (!e3.__IS_PROMISIFIED__) {
          for (const t3 of Object.getOwnPropertyNames(e3)) {
            if (!(-1 !== t3.indexOf("Async") || e3[`${t3}Async`]) && !Le[t3])
              if (p(e3[t3]))
                e3[`${t3}Async`] = Re(e3[t3]);
              else {
                const r3 = Object.getOwnPropertyDescriptor(e3, t3).get;
                p(r3) && (e3[`${t3}Async`] = Re(r3));
              }
          }
          e3.__IS_PROMISIFIED__ = true;
        }
        return e3;
      }, Ie = (e3) => Boolean(e3 && e3 instanceof RegExp), Ne = (e3) => Ie(e3) ? e3.source : S(e3) ? e3 : null, Ue = (e3) => {
        const t3 = {}, r3 = e3.split("?"), n3 = r3[r3.length - 1];
        if (!n3)
          return t3;
        const o3 = n3.split("&");
        return o3.length && o3.map((e4) => {
          const r4 = e4.split("=");
          if (r4.length <= 1)
            return t3;
          const n4 = [r4.shift(), r4.join("=")];
          if (2 === n4.length) {
            const e5 = decodeURIComponent(n4[1]).split(",");
            if (e5 && e5.length > 1)
              t3[n4[0]] = e5;
            else if (n4[0] in t3) {
              const e6 = t3[n4[0]];
              t3[n4[0]] = u(e6) ? e6.push(decodeURIComponent(n4[1])) : [e6, decodeURIComponent(n4[1])];
            } else
              t3[n4[0]] = decodeURIComponent(n4[1]);
          }
        }), t3;
      };
      e2.applyToCloneOf = (e3, t3) => {
        let r3;
        if (e3 || (r3 = "object (Argument 1) in applyToCloneOf, must be defined!"), a(e3) || (r3 = "object (Argument 1) in applyToCloneOf, must be an object!"), t3 || (r3 = "mutator (Argument 2) in applyToCloneOf, must be defined!"), p(t3) || (r3 = "mutator (Argument 2) arg in applyToCloneOf, must be a function!"), r3)
          return console.warn(r3) || e3;
        const n3 = ie(e3);
        return t3(n3), n3;
      }, e2.applyToFunc = j, e2.areCountMapsEqual = c2, e2.areFrequencyEqual = (e3, t3) => {
        const [r3] = n2({ arr: e3, otherArr: t3 }, { $default: u });
        if (!r3)
          return null;
        if (e3 === t3)
          return true;
        if (e3.length !== t3.length)
          return false;
        const o3 = l2(e3), s2 = l2(t3);
        return c2(o3, s2);
      }, e2.areSetEqual = (e3, t3) => {
        const [r3] = n2({ arr: e3, otherArr: t3 }, { $default: u });
        if (!r3)
          return null;
        if (e3 === t3)
          return true;
        const [o3, s2] = e3.length > t3.length ? [e3, t3] : [t3, e3], i3 = new Set(s2);
        for (let e4 = 0; e4 < o3.length; e4++) {
          const t4 = o3[e4];
          if (!i3.has(t4))
            return false;
        }
        return true;
      }, e2.buildElementCountMap = l2, e2.buildPath = (...e3) => e3.reduce((e4, t3) => {
        let r3 = toStr(t3);
        return `${e4}${r3 && "/" + r3 || ""}`;
      }, "").replace(/([^:\/]|^)\/{2,}/g, "$1/"), e2.camelCase = F, e2.camelCasePath = (e3) => {
        const t3 = e3.split(".").map((e4, t4) => t4 > 0 ? C(e4, false) : e4);
        return t3.length > 1 ? t3.join("") : e3;
      }, e2.capitalize = C, e2.checkCall = (e3, ...t3) => p(e3) ? e3(...t3) : void 0, e2.cleanColl = me, e2.cleanStr = E, e2.clearObj = Ce, e2.cloneArr = (e3) => Array.from([...u(e3) && e3 || a(e3) && Object.entries(e3) || []]), e2.cloneFunc = se, e2.cloneJson = (e3) => {
        try {
          return JSON.parse(JSON.stringify(e3));
        } catch (e4) {
          return _e(e4.message, "error"), null;
        }
      }, e2.cloneObjWithPrototypeAndProperties = ue, e2.compareTo = re, e2.complement = (e3) => {
        const [t3] = n2({ predicate: e3 }, { predicate: p });
        return t3 ? (...t4) => !e3(...t4) : null;
      }, e2.containsStr = (e3, t3, r3) => (e3 = !S(e3) && P(e3) || e3, t3 = !S(t3) && P(t3) || t3, -1 !== e3.indexOf(t3, r3)), e2.convertToStrBool = Q, e2.debounce = (e3, t3 = 250, r3 = false) => {
        let n3;
        return function(...o3) {
          if (!p(e3))
            return null;
          const s2 = this, i3 = r3 && !n3;
          return clearTimeout(n3), n3 = setTimeout(() => {
            n3 = null, !r3 && e3.apply(s2, o3);
          }, t3), i3 ? p(e3) && e3.apply(s2, o3) : void 0;
        };
      }, e2.deepClone = ie, e2.deepEqual = je, e2.deepFreeze = d, e2.deepMerge = xe, e2.delimitString = _, e2.doIt = (...e3) => {
        const t3 = e3.slice(), r3 = t3.shift(), n3 = t3.shift(), o3 = t3.pop();
        if (!U(r3) || !p(o3))
          return [];
        const s2 = new Array(r3), i3 = [];
        for (let e4 = 0; e4 < s2.length; e4++) {
          const r4 = o3.call(n3, e4, ...t3);
          if (false === r4)
            break;
          i3.push(r4);
        }
        return i3;
      }, e2.either = (e3, t3, r3) => p(r3) ? r3(e3, t3) && e3 || t3 : V(e3) && e3 || t3, e2.eitherArr = (e3, t3) => u(e3) ? e3 : t3, e2.eitherFunc = (e3, t3) => p(e3) && e3 || t3, e2.eitherObj = (e3, t3) => a(e3) && e3 || t3, e2.eitherStr = (e3, t3) => S(e3) && e3 || t3, e2.ensureArr = f, e2.equalsNaN = N, e2.everyEntry = (e3, t3) => e3 ? a(e3) ? p(t3) ? w(e3, Object.entries, (e4) => e4.every(([e5, r3]) => t3(e5, r3))) : (console.error(`Argument 'predicate' passed into everyEntry must a function. Found: ${t3}`), false) : (console.error(`Argument obj ${e3} must be an object.`), false) : (console.error(`everyEntry expects argument obj [${e3}] to be defined.`), false), e2.exists = h, e2.filterObj = (e3, t3) => e3 ? a(e3) ? p(t3) ? Pe(e3, (e4, r3, n3) => (t3(e4, r3) && (n3[e4] = r3), n3), {}) : (console.error(`Argument 'predicate' passed into filterObject must a function. Found: ${t3}`), e3) : (console.error(`Object ${e3} was not an object. It must be for filterObject`), e3) : e3, e2.findExtrema = pe, e2.findMax = (e3 = [], t3 = ne) => pe(e3, (e4, r3) => re(t3(e4), t3(r3))), e2.findMin = (e3 = [], t3 = ne) => pe(e3, (e4, r3) => re(t3(r3), t3(e4))), e2.flatArr = b, e2.flatMap = (e3, t3) => {
        const [r3] = n2({ arr: e3, mapFn: t3 }, { arr: u, mapFn: p });
        return r3 ? e3.reduce((e4, r4) => {
          const n3 = t3(r4);
          return u(n3) ? n3.map((t4) => e4.push(t4)) : e4.push(n3), e4;
        }, []) : e3;
      }, e2.flatUnion = (...e3) => {
        const t3 = e3.pop(), r3 = { exists: true }, n3 = p(t3) ? t3 : e3.push(t3) && void 0;
        return e3.reduce((e4, t4) => u(t4) ? ge(b([...e4, ...t4], r3), n3) : e4, []);
      }, e2.get = z, e2.getNearestDelimiterIndex = G, e2.getNums = Y, e2.getRegexSource = Ne, e2.getURLParam = (e3) => {
        var t3, r3, o3;
        const [s2] = n2({ paramKey: e3 }, { paramKey: S });
        if (!s2)
          return null;
        const i3 = "undefined" != typeof document ? document : null, u2 = null == i3 || null === (t3 = i3.location) || void 0 === t3 ? void 0 : t3.search;
        return S(u2) && null !== (r3 = null === (o3 = Ue(u2)) || void 0 === o3 ? void 0 : o3[e3]) && void 0 !== r3 ? r3 : null;
      }, e2.getWordEndingAt = (e3, t3, r3 = [" "]) => {
        const n3 = H(e3), o3 = e3.length - t3;
        return H(W(n3, o3, r3));
      }, e2.getWordStartingAt = W, e2.hasDomAccess = () => {
        try {
          return !("undefined" == typeof window || !window.document || !window.document.createElement);
        } catch (e3) {
          return false;
        }
      }, e2.hasOwn = oe, e2.hashString = (e3, t3) => {
        if (!S(e3) || 0 == e3.length)
          return 0;
        e3 = e3.split("").reverse().join("");
        let r3 = 0;
        for (let t4 = 0; t4 < e3.length; t4++) {
          r3 = (r3 << 5) - r3 + e3.charCodeAt(t4), r3 = `${Math.abs(r3 & r3)}`;
        }
        return D(t3) ? r3.slice(0, t3) : r3;
      }, e2.hyphenator = (e3) => {
        if (T.hasOwnProperty(e3))
          return T[e3];
        const t3 = e3.replace(R, I);
        return T[e3] = L.test(t3) ? "-" + t3 : t3;
      }, e2.identity = ne, e2.isArr = u, e2.isArrMap = (e3) => {
        if (!a(e3))
          return false;
        const t3 = Object.values(e3);
        return Z(t3.length && t3.every(u));
      }, e2.isBool = K, e2.isColl = M, e2.isEmail = (e3) => {
        if (!e3 || !S(e3))
          return false;
        return Boolean(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e3));
      }, e2.isEmpty = fe, e2.isEmptyColl = (e3) => u(e3) ? 0 === e3.length : M(e3) && 0 === Object.getOwnPropertyNames(e3).length, e2.isEntry = Ee, e2.isFloat = (e3) => U(e3) && e3 % 1 != 0, e2.isFunc = p, e2.isInt = (e3) => U(e3) && e3 % 1 == 0, e2.isLowerCase = $, e2.isNegative = (e3) => U(e3) && e3 < 0, e2.isNonNegative = D, e2.isNum = U, e2.isObj = a, e2.isOrderable = te, e2.isPhone = (e3) => {
        if (!e3 || !S(e3))
          return false;
        return Boolean(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(e3)) && e3.replace(/\D/g, "").length < 11;
      }, e2.isPositive = (e3) => U(e3) && e3 > 0, e2.isQuoted = (e3, t3 = J) => S(e3) && t3.some((t4) => e3.startsWith(t4) && e3.endsWith(t4)), e2.isRegex = Ie, e2.isSame = (e3, t3) => e3 === t3 ? 0 !== e3 || 1 / e3 == 1 / t3 : e3 != e3 && t3 != t3, e2.isStr = S, e2.isStrBool = X, e2.isUpperCase = v, e2.isUrl = (e3) => Boolean(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/.test(e3)), e2.isUuid = (e3) => {
        if (!e3 || !S(e3))
          return false;
        return Boolean(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(e3));
      }, e2.isValidDate = (e3) => !isNaN((e3 instanceof Date && e3 || new Date(e3)).getTime()), e2.isValidUrl = (e3) => /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(e3), e2.joinRegex = (...e3) => {
        const [t3, r3] = ((e4) => {
          if (u(e4[0]))
            return [e4[0], e4[1]];
          const t4 = e4[e4.length - 1], r4 = S(t4) ? t4 : void 0;
          return [r4 ? e4.splice(0, e4.length - 1) : e4, r4];
        })(e3), n3 = t3.reduce((e4, t4) => {
          const r4 = Ne(t4);
          return r4 ? "" === e4 ? r4 : `${e4}|${r4}` : e4;
        }, "");
        return new RegExp(`(${n3})`, r3);
      }, e2.jsonEqual = (e3, t3) => {
        try {
          return JSON.stringify(e3) === JSON.stringify(t3);
        } catch (e4) {
          return false;
        }
      }, e2.keyMap = (e3, t3) => u(e3) && e3.reduce((e4, r3) => {
        if (!S(r3))
          return e4;
        const n3 = t3 && r3.toUpperCase() || r3;
        return e4[n3] = n3, e4;
      }, {}) || {}, e2.limbo = (e3) => e3 && p(e3.then) ? e3.then((e4) => [null, e4]).catch((e4) => [e4, void 0]) : [new Error("A promise or thenable is required as the first argument!"), null], e2.logData = _e, e2.mapColl = (e3, t3) => p(t3) && M(e3) ? Object.keys(e3).map((r3) => t3(r3, e3[r3], e3)) : u(e3) ? [] : {}, e2.mapEntries = Fe, e2.mapFind = (e3, t3, r3 = h) => {
        const [o3] = n2({ coll: e3, mapper: t3, test: r3 }, { coll: M, $default: p });
        if (o3)
          return a(e3) ? ((e4, t4, r4) => {
            let n3 = 0;
            for (let o4 in e4) {
              if (!e4.hasOwnProperty(o4))
                continue;
              const s2 = t4(e4[o4], o4, n3);
              if (r4(s2, o4, n3))
                return s2;
              n3++;
            }
            return null;
          })(e3, t3, r3) : ((e4, t4, r4) => {
            for (let n3 = 0; n3 < e4.length; n3++) {
              const o4 = t4(e4[n3], n3, n3);
              if (r4(o4, n3, n3))
                return o4;
            }
            return null;
          })(e3, t3, r3);
      }, e2.mapKeys = (e3, t3) => a(e3) && p(t3) ? Fe(e3, (e4, r3) => [t3(e4), r3]) : e3, e2.mapObj = (e3, t3) => a(e3) && p(t3) && Object.entries(e3).map(([e4, r3]) => t3(e4, r3)) || e3, e2.mapString = A, e2.match = ae, e2.memorize = (e3, t3, r3 = 1) => {
        if (!p(e3) || t3 && !p(t3))
          return console.error("Error: Expected a function", e3, t3);
        let n3 = function() {
          const o3 = n3.cache, s2 = t3 ? t3.apply(this, arguments) : arguments[0];
          if (oe(o3, s2))
            return o3[s2];
          const i3 = e3.apply(this, arguments);
          return U(r3) && Object.keys(o3).length < r3 ? o3[s2] = i3 : n3.cache = { [s2]: i3 }, i3;
        };
        return n3.cache = {}, n3.destroy = () => {
          t3 = void 0, n3.cache = void 0, n3.destroy = void 0, n3 = void 0;
        }, n3;
      }, e2.mod = (e3, t3) => (e3 % t3 + t3) % t3, e2.noOp = () => {
      }, e2.noOpObj = g, e2.noPropArr = y, e2.noPropObj = m, e2.nth = (e3) => {
        if (!U(e3)) {
          if (!(e3 = Y(e3)))
            return "";
          if (e3 = ee(e3), N(e3))
            return "";
        }
        const t3 = e3 % 100;
        if (t3 >= 10 && t3 <= 20)
          return "th";
        switch (e3 % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      }, e2.objToQuery = (e3) => {
        let t3;
        return Pe(e3, (e4, r3, n3) => {
          if (!r3)
            return n3;
          const o3 = S(r3) || U(r3) || K(r3) ? r3 : M(r3) ? u(r3) ? r3.join(",") : JSON.stringify(r3) : null;
          return o3 ? (n3 = t3 ? `${n3}&${encodeURIComponent(e4)}=${encodeURIComponent(o3)}` : `?${encodeURIComponent(e4)}=${encodeURIComponent(o3)}`, t3 = true, n3) : n3;
        }, "");
      }, e2.omitKeys = (e3 = {}, t3 = []) => a(e3) && Pe(e3, (r3, n3, o3) => (-1 === t3.indexOf(r3) && (o3[r3] = e3[r3]), o3), {}) || {}, e2.omitRange = (e3, t3, r3) => {
        const [o3] = n2({ arr: e3, startIndex: t3, count: r3 }, { arr: u, $default: D });
        if (!o3)
          return e3;
        const s2 = [...e3];
        return s2.splice(t3, r3), s2;
      }, e2.parseErrorMessage = (e3) => S(e3) && !fe(e3) ? e3 : a(e3) ? e3.message : null, e2.parseJSON = (e3, t3 = true) => {
        try {
          return JSON.parse(e3);
        } catch (e4) {
          return t3 && console.error(e4.message), null;
        }
      }, e2.pickKeys = (e3 = {}, t3 = []) => a(e3) && t3.reduce((t4, r3) => (r3 in e3 && (t4[r3] = e3[r3]), t4), {}) || {}, e2.pipeline = w, e2.plural = (e3) => e3 && e3.length && "s" !== e3[e3.length - 1] ? e3 + "s" : e3, e2.promisify = Re, e2.promisifyAll = (e3) => {
        if (!a(e3))
          return e3;
        Te(e3);
        const t3 = Object.getPrototypeOf(e3);
        return t3 && null !== Object.getPrototypeOf(t3) && Te(t3), e3;
      }, e2.queryToObj = Ue, e2.randomArr = (e3, t3) => {
        if (!u(e3))
          return e3;
        const r3 = t3 || 1, n3 = [];
        for (let t4 = 0; t4 < r3; t4++)
          n3.push(e3[Math.floor(Math.random() * e3.length)]);
        return t3 ? n3 : n3[0];
      }, e2.randomizeArr = (e3) => !u(e3) && e3 || e3.sort(() => 0.5 - Math.random()), e2.reduceColl = (e3, t3, r3) => p(t3) && M(e3) ? Object.keys(e3).reduce((r4, n3) => t3(n3, e3[n3], e3, r4), r3) : u(e3) ? [] : {}, e2.reduceObj = Pe, e2.removeDot = x, e2.repeat = (e3, t3, r3 = false) => {
        if (!t3 || t3 <= 0)
          return [];
        if (!U(t3))
          return console.error("Times argument must be a number"), [];
        const n3 = [];
        for (let o3 = 0; o3 < t3; o3++) {
          const t4 = p(e3) ? e3() : r3 ? ie(e3) : e3;
          n3.push(t4);
        }
        return n3;
      }, e2.resetLogs = () => {
        Se = void 0, Ae = "log", $e = "type";
      }, e2.reverseStr = H, e2.runSeq = async (e3 = [], t3 = {}) => {
        const [r3] = n2({ asyncFns: e3 }, { asyncFns: u });
        if (!r3)
          return [];
        const { cloneResults: o3 = false, returnOriginal: s2 = true } = t3, i3 = [];
        for (const t4 of e3) {
          const e4 = p(t4) ? await t4(i3.length, o3 ? ie(i3) : i3) : s2 ? t4 : void 0;
          i3.push(e4);
        }
        return i3;
      }, e2.sanitize = k, e2.sanitizeCopy = (e3) => JSON.parse(k(JSON.stringify(e3))), e2.set = ye, e2.setLogs = (e3, t3, r3) => {
        Se = e3, Ae = t3 || Ae || "log", $e = r3 || $e || "type";
      }, e2.shallowEqual = (e3, t3, r3) => {
        if (r3 && (u(r3) || S(r3)) && (e3 = z(e3, r3), t3 = z(t3, r3)), e3 === t3)
          return true;
        if (!(e3 && M(e3) && t3 && M(t3)))
          return false;
        if (Object.keys(e3).length !== Object.keys(t3).length)
          return false;
        for (const r4 in e3)
          if (e3[r4] !== t3[r4])
            return false;
        return true;
      }, e2.singular = (e3) => e3 && e3.length && "s" === e3[e3.length - 1] ? e3.slice(0, e3.length - 1) : e3, e2.snakeCase = (e3) => _(e3, "_").toLowerCase(), e2.softFalsy = V, e2.someEntry = (e3, t3) => e3 ? a(e3) ? p(t3) ? w(e3, Object.entries, (e4) => e4.some(([e5, r3]) => t3(e5, r3))) : (console.error(`Argument 'predicate' passed into someEntry must a function. Found: ${t3}`), false) : (console.error(`Argument obj ${e3} must be an object.`), false) : (console.error(`someEntry expects argument obj [${e3}] to be defined.`), false), e2.spaceJoin = (e3, t3) => (t3 = u(t3) ? t3 : [t3]).reduce((e4, t4) => S(t4) ? `${e4 ? e4 + " " : ""}${t4}`.trim() : e4, S(e3) ? e3 : ""), e2.splitByKeys = (e3 = {}, t3) => {
        if (!t3)
          return [{}, { ...e3 }];
        const r3 = [{}, {}], n3 = f(t3);
        return a(e3) ? Pe(e3, (t4, r4, o3) => (h(n3.find((e4) => h(e4) && P(e4) === t4)) ? o3[0][t4] = e3[t4] : o3[1][t4] = e3[t4], o3), r3) : r3;
      }, e2.strToType = we, e2.styleCase = (e3) => {
        if (!S(e3))
          return e3;
        const t3 = F(e3);
        return `${t3[0].toLowerCase()}${t3.slice(1)}`;
      }, e2.template = B, e2.throttle = (e3, t3 = 100) => {
        let r3 = false;
        return function(...n3) {
          if (!r3)
            return r3 = true, e3.apply(this, n3), setTimeout(() => {
              r3 = false;
            }, t3);
        };
      }, e2.throttleLast = (e3, t3, r3 = 100) => {
        let n3;
        return function(...o3) {
          n3 && clearTimeout(n3), n3 = setTimeout(() => {
            e3.apply(this, o3), clearTimeout(n3);
          }, r3), "function" == typeof t3 && t3();
        };
      }, e2.timedRun = async (e3, ...t3) => {
        const [r3] = n2({ fn: e3 }, { fn: p });
        if (!r3)
          return [void 0, -1];
        const o3 = /* @__PURE__ */ new Date();
        return [await e3(...t3), /* @__PURE__ */ new Date() - o3];
      }, e2.toBool = Z, e2.toFloat = (e3) => e3 && !N(e3) && parseFloat(U(e3) && e3 || Y(e3)) || 0, e2.toInt = (e3) => e3 && !N(e3) && parseInt(U(e3) && e3 || Y(e3)) || 0, e2.toNum = ee, e2.toObj = (e3, t3, r3) => u(e3) ? Object.keys(e3).reduce((t4, r4) => (t4[r4] = e3[r4], t4), {}) : S(str) ? (t3 = t3 || "=", r3 = r3 || "&", str.split(r3).reduce((e4, r4) => {
        const n3 = r4.split(t3);
        return e4[n3[0].trim()] = we(n3[1].trim()), e4;
      }, {})) : {}, e2.toStr = P, e2.trainCase = (e3) => S(e3) && e3.split(/(?=[A-Z])|[\s_-]/gm).join("-").toLowerCase() || e3, e2.trimStringFields = (e3) => Object.entries(e3).reduce((e4, [t3, r3]) => (e4[t3] = S(r3) ? r3.trim() : r3, e4), e3), e2.typeOf = ce, e2.uniqArr = ge, e2.uniqArrByReference = de, e2.unset = (e3, t3) => q(e3, t3, "unset"), e2.uuid = le, e2.validFilename = (e3) => {
        if (!e3)
          return false;
        return !(/[<>:"/\\|?*\u0000-\u001F]/g.test(e3) || /^(con|prn|aux|nul|com\d|lpt\d)$/i.test(e3) || /^\.\.?$/.test(e3));
      }, e2.validate = n2, e2.wait = (e3) => new Promise((t3) => setTimeout(() => t3(true), e3)), e2.wordCaps = (e3) => {
        if (!S(e3))
          return e3;
        return E(e3).split(" ").map((e4) => e4 && C(e4) || "").join(" ");
      };
    });
  }
});

// src/constants.ts
var import_jsutils, constants;
var init_constants = __esm({
  "src/constants.ts"() {
    init_types();
    import_jsutils = __toESM(require_umd());
    constants = (0, import_jsutils.deepFreeze)({
      ALIAS_REF: `$$`,
      ALIAS_WORLD_KEY: `$alias`,
      ALIAS_REF_AT_RUNTIME: `$$:`,
      REGEX_VARIANT: "regex",
      WORLD_REF: `$`,
      WORLD_KEY: `$world`,
      WORLD_AT_RUNTIME: `$:`,
      EXPRESSION_VARIANT: "expression",
      HOOK_TYPES: Object.keys(EHookType),
      STEP_TYPES: Object.keys(EStepType),
      FEATURE_META: ["feature", "perspective", "desire", "reason", "comments"],
      LOG_JEST_SPEC_ENV: `PARKIN_LOG_JEST_SPEC`,
      SPEC_RESULT_LOG: `------- PARKIN SPEC RESULT LOG -------`
    });
  }
});

// src/utils/helpers.ts
var getRXMatch, sanitizeForId, sanitize, validateDefinition, removeQuotes, getStartWhiteSpace;
var init_helpers = __esm({
  "src/utils/helpers.ts"() {
    getRXMatch = (line, regex, index) => {
      const matching = line.match(regex)[index];
      return matching ? matching.trim() : ` `;
    };
    sanitizeForId = (text, index = 1) => {
      const cleaned = text && text.trim() && text.trim().toLowerCase().replace(/[\s\/\\\(\)\+=_&%\$#@!\*~`\|\?:;"'<>,.{}]/g, "-");
      return cleaned ? `${cleaned}-${text.length}` : `${index}-${index}`;
    };
    sanitize = (def) => {
      let name = def.match.toString();
      name[0] === "/" && (name = name.substring(1));
      name[0] === "^" && (name = name.substring(1));
      name.charAt(name.length - 1) === "/" && (name = name.slice(0, -1));
      name.charAt(name.length - 1) === "$" && (name = name.slice(0, -1));
      return name.replace(/\(\?:([^\|]+)+\|+([^\)]+)?\)/, "$1");
    };
    validateDefinition = (definition, definitions) => {
      return definitions.reduce(
        (validated, def) => {
          if (!validated || def.content === validated.content)
            return false;
          def.uuid === validated.uuid && (validated.uuid = `${validated.uuid}-${validated.content.length}`);
          return validated;
        },
        { ...definition }
      );
    };
    removeQuotes = (arg) => {
      return arg.trim().replace(/^("|')/, "").replace(/("|')$/, "");
    };
    getStartWhiteSpace = (line) => {
      const noStartSpace = line.replace(/^\s+/g, "");
      const startLength = line.length - noStartSpace.length;
      return new Array(startLength).fill(` `).join("");
    };
  }
});

// src/matcher/patterns.ts
var import_jsutils2, RX_OPTIONAL, RX_ALT, RX_PARAMETER, RX_EXPRESSION, RX_ANY, RX_MATCH_REPLACE, RX_DOUBLE_QUOTED, RX_SINGLE_QUOTED, RX_FLOAT, RX_INT, RX_WORLD, RX_WORLD_REPLACE, RX_WORLD_MATCH, RX_ALIAS, RX_ALIAS_REPLACE, RX_ALIAS_MATCH;
var init_patterns = __esm({
  "src/matcher/patterns.ts"() {
    import_jsutils2 = __toESM(require_umd());
    RX_OPTIONAL = /\w*\([^)]*?\)/;
    RX_ALT = /\s*\S*\/\S*\s*/;
    RX_PARAMETER = /\s*{(.*?)}\s*/;
    RX_EXPRESSION = (0, import_jsutils2.joinRegex)(RX_PARAMETER, RX_OPTIONAL, "g");
    RX_ANY = /(.*)/;
    RX_MATCH_REPLACE = /{|}/g;
    RX_DOUBLE_QUOTED = /"[^"]+"/;
    RX_SINGLE_QUOTED = /'[^']+'/;
    RX_FLOAT = /-?[0-9]+[.][0-9]+/;
    RX_INT = /-?[0-9]+/;
    RX_WORLD = /^["]?\$world\.\S+["]?/;
    RX_WORLD_REPLACE = /^\$world\./;
    RX_WORLD_MATCH = /(\$:world|\$world)+\.[^"'\s]*/gm;
    RX_ALIAS = /^["]?\$\$\S+["]?/;
    RX_ALIAS_REPLACE = /^\$\$/;
    RX_ALIAS_MATCH = /(\$\$:\w+|\$\$\w+)[^"'\s]*/gm;
  }
});

// src/utils/errors.ts
var testMethodFill, throwMissingSteps, throwMissingFeatureText, throwNoMatchingStep, throwParamTypeExists, throwFeatureNotAnObj, throwMissingWorldValue, throwInvalidHookType, throwWorldReplace, throwAliasReplace;
var init_errors = __esm({
  "src/utils/errors.ts"() {
    testMethodFill = (type) => {
      return () => {
        throw new Error(
          `Test method ${type} does not exist on the global scope.
Please ensure ${type} exists before calling the run method!
`
        );
      };
    };
    throwMissingSteps = () => {
      throw new Error(
        `Runner class constructor requires an instance of the Steps class`
      );
    };
    throwMissingFeatureText = () => {
      throw new Error(
        `Runner class requires feature text when calling the run method`
      );
    };
    throwNoMatchingStep = (text) => {
      throw new ReferenceError(text);
    };
    throwParamTypeExists = (name) => {
      throw new Error(`Cannot register param type "${name}". It already exists!`);
    };
    throwFeatureNotAnObj = (feature) => {
      throw new Error(`Assemble feature requires an object matching the feature model spec!`);
    };
    throwMissingWorldValue = (arg) => {
      throw new Error(
        `Can not replace ${arg} with value from $world, it does not exist on the world object`
      );
    };
    throwInvalidHookType = (hookTypes, type) => {
      throw new Error(
        [
          `Expected client hook type to be one of ', ${hookTypes}.`,
          `Found: ${type}`
        ].join("\n")
      );
    };
    throwWorldReplace = (err, currentMatch) => {
      console.error(
        `Error replacing $world value in feature text. Current match was ${currentMatch}`
      );
      throw err;
    };
    throwAliasReplace = (err, currentMatch) => {
      console.error(
        `Error replacing $$alias ( $world.$alias ) in feature text. Current match was ${currentMatch}`
      );
      throw err;
    };
  }
});

// src/matcher/paramTypes.js
var import_jsutils3, WORLD_KEY, ALIAS_WORLD_KEY, ALIAS_REF, checkWorldValue, matchType, typeModel, __paramTypes, getParamTypes, registerParamType, convertTypes;
var init_paramTypes = __esm({
  "src/matcher/paramTypes.js"() {
    init_constants();
    init_helpers();
    import_jsutils3 = __toESM(require_umd());
    init_patterns();
    init_errors();
    ({ WORLD_KEY, ALIAS_WORLD_KEY, ALIAS_REF } = constants);
    checkWorldValue = (func, type) => {
      return (arg, $world) => {
        const hasWorldVal = arg.match(RX_WORLD);
        const hasAliasVal = arg.match(RX_ALIAS);
        if (!(0, import_jsutils3.isObj)($world) || !hasWorldVal && !hasAliasVal)
          return matchType(func(arg), type);
        const worldVal = hasWorldVal ? (0, import_jsutils3.get)($world, removeQuotes(arg).replace(`${WORLD_KEY}.`, "")) : (0, import_jsutils3.get)(
          $world,
          removeQuotes(arg).replace(`${ALIAS_REF}`, `${ALIAS_WORLD_KEY}.`)
        );
        return (0, import_jsutils3.exists)(worldVal) ? matchType(worldVal, type) : hasWorldVal ? throwMissingWorldValue(arg, $world) : matchType(func(arg), type);
      };
    };
    matchType = (val, type) => {
      return typeof val === type ? val : null;
    };
    typeModel = {
      name: "",
      regex: "",
      type: "string",
      useForSnippets: true,
      preferForRegexpMatch: false,
      transformer: checkWorldValue((arg) => arg, "string")
    };
    __paramTypes = {
      any: {
        ...typeModel,
        name: "any",
        regex: RX_ANY
      },
      word: {
        ...typeModel,
        name: "word",
        regex: RX_ANY,
        transformer: checkWorldValue((arg) => {
          return !(0, import_jsutils3.isQuoted)(arg) ? (0, import_jsutils3.toStr)(arg) : void 0;
        }, typeModel.type)
      },
      float: {
        ...typeModel,
        name: "float",
        type: "number",
        regex: RX_FLOAT,
        transformer: checkWorldValue((arg) => {
          const result = parseFloat(arg);
          return (0, import_jsutils3.equalsNaN)(result) ? void 0 : result;
        }, "number")
      },
      int: {
        ...typeModel,
        name: "int",
        type: "number",
        regex: RX_INT,
        transformer: checkWorldValue((arg) => {
          const result = parseInt(arg);
          return (0, import_jsutils3.equalsNaN)(result) || arg.includes(".") ? void 0 : result;
        }, "number")
      },
      string: {
        ...typeModel,
        name: "string",
        regex: (0, import_jsutils3.joinRegex)(RX_DOUBLE_QUOTED, RX_SINGLE_QUOTED),
        transformer: checkWorldValue((arg) => {
          return (0, import_jsutils3.isQuoted)(arg) ? removeQuotes(arg) : void 0;
        }, typeModel.type)
      }
    };
    getParamTypes = () => __paramTypes;
    registerParamType = (model = import_jsutils3.noOpObj, key = model.name) => {
      if (__paramTypes[key])
        return throwParamTypeExists(key);
      __paramTypes[key] = { ...typeModel, ...model };
      __paramTypes[key].transformer = checkWorldValue(
        __paramTypes[key].transformer,
        __paramTypes[key].type
      );
      return __paramTypes;
    };
    convertTypes = (matches, transformers, $world) => {
      return matches.map((item, i2) => {
        const paramType = transformers[i2] || __paramTypes.any;
        return (0, import_jsutils3.checkCall)(paramType.transformer, item, $world);
      }).filter(import_jsutils3.exists);
    };
  }
});

// src/matcher/regex.js
var import_jsutils4, matchRegex, toAlternateRegex, getFullOptionalText, getOptionalRegex, getParamRegex, getAlternateRegex, getMatchRegex, parseMatch, getRegexParts;
var init_regex = __esm({
  "src/matcher/regex.js"() {
    import_jsutils4 = __toESM(require_umd());
    init_paramTypes();
    init_patterns();
    matchRegex = (definition, text) => {
      const match = text.match(new RegExp(definition.match));
      return match ? { definition, match: match.slice(1, match.length).filter(Boolean) } : import_jsutils4.noOpObj;
    };
    toAlternateRegex = (optional) => {
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
    getFullOptionalText = (match) => {
      const text = match.input;
      const precedingWord = (0, import_jsutils4.getWordEndingAt)(text, match.index);
      return precedingWord + match[0];
    };
    getOptionalRegex = (match) => {
      const optionalText = getFullOptionalText(match);
      return toAlternateRegex(optionalText);
    };
    getParamRegex = (type) => {
      const params = getParamTypes();
      const spec = params[type] || params.any;
      return spec.regex.source;
    };
    getAlternateRegex = (value) => {
      return `(${value.trim().replace(/\//g, "|")})`;
    };
    getMatchRegex = (type, match) => {
      const [val, paramType] = match;
      switch (type) {
        case "parameter":
          return new RegExp(getParamRegex(paramType));
        case "optional":
          return new RegExp(getOptionalRegex(match));
        case "alternate":
          return new RegExp(getAlternateRegex(val));
        default:
          return null;
      }
    };
    parseMatch = (matchArr, type = "other") => {
      const val = matchArr[0];
      const trimmed = val.trimStart();
      const diff = val.length - trimmed.length;
      return {
        text: val.trim(),
        input: matchArr.input,
        index: matchArr.index + diff,
        regex: getMatchRegex(type, matchArr),
        type,
        ...type === "parameter" && {
          paramType: val.trim().replace(RX_MATCH_REPLACE, "")
        }
      };
    };
    getRegexParts = (defMatcher) => {
      const parameters = [
        ...defMatcher.matchAll(new RegExp(RX_PARAMETER, "gi"))
      ].map((match) => parseMatch(match, "parameter"));
      const optionals = [...defMatcher.matchAll(new RegExp(RX_OPTIONAL, "gi"))].map(
        (match) => parseMatch(match, "optional")
      );
      const alts = [...defMatcher.matchAll(new RegExp(RX_ALT, "gi"))].map(
        (match) => parseMatch(match, "alternate")
      );
      const sortedExpressions = [...parameters, ...optionals, ...alts].sort(
        (matchA, matchB) => matchA.index - matchB.index
      );
      return sortedExpressions;
    };
  }
});

// src/matcher/tokens.ts
var import_jsutils5, tokenRegex, tokenizeStep;
var init_tokens = __esm({
  "src/matcher/tokens.ts"() {
    import_jsutils5 = __toESM(require_umd());
    init_regex();
    init_patterns();
    tokenRegex = (0, import_jsutils5.joinRegex)(
      RX_INT,
      // @ts-ignore
      RX_FLOAT,
      RX_PARAMETER,
      RX_DOUBLE_QUOTED,
      RX_SINGLE_QUOTED,
      "g"
    );
    tokenizeStep = (step, def) => {
      const parts = getRegexParts(def.match);
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
  }
});

// src/utils/globalScope.ts
var import_jsutils6, hasWindow, hasGlobal, hasModule, hasRequire, hasJasmine, resolveJasmine, resolveModule, resolveRequire, resolveGlobalObj;
var init_globalScope = __esm({
  "src/utils/globalScope.ts"() {
    import_jsutils6 = __toESM(require_umd());
    hasWindow = Boolean(typeof window !== "undefined");
    hasGlobal = Boolean(typeof global !== "undefined");
    hasModule = Boolean(typeof module === "object");
    hasRequire = Boolean(typeof require === "function");
    hasJasmine = Boolean(
      hasGlobal && typeof global.jasmine !== "undefined"
    );
    resolveJasmine = () => hasJasmine ? (0, import_jsutils6.checkCall)(() => global.jasmine) : { getEnv: () => import_jsutils6.noOpObj };
    resolveModule = () => hasModule ? (0, import_jsutils6.checkCall)(() => module) : { exports: {} };
    resolveRequire = () => hasRequire ? (0, import_jsutils6.checkCall)(() => require) : import_jsutils6.noOp;
    resolveGlobalObj = () => {
      try {
        return hasWindow ? (0, import_jsutils6.checkCall)(() => window) : hasGlobal ? (0, import_jsutils6.checkCall)(() => global) : import_jsutils6.noOpObj;
      } catch (err) {
        return import_jsutils6.noOpObj;
      }
    };
  }
});

// src/matcher/expression.js
var import_jsutils7, escapeStr, runRegexCheck, convertToRegex, checkAlternative, checkAnchors, extractParameters, findAsRegex, matchExpression;
var init_expression = __esm({
  "src/matcher/expression.js"() {
    init_regex();
    init_patterns();
    init_globalScope();
    import_jsutils7 = __toESM(require_umd());
    init_paramTypes();
    escapeStr = (str2) => {
      return hasWindow ? str2.replace(/[|\\[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d") : str2.replace(/[|\\[\]^$+*?.]/g, "\\$&");
    };
    runRegexCheck = (matcher2, testRx, replaceWith) => {
      if (!testRx.test(matcher2))
        return matcher2;
      let regexStr = matcher2;
      matcher2.replace(testRx, (...args) => {
        const match = args[0].trim();
        const [start, ...end] = regexStr.split(match);
        const replace = (0, import_jsutils7.isFunc)(replaceWith) ? replaceWith(...args) : replaceWith;
        regexStr = `${start}${replace}${end.join(match)}`;
      });
      return regexStr;
    };
    convertToRegex = (match) => {
      const paramTypes = getParamTypes();
      const transformers = [];
      const regex = runRegexCheck(match, RX_EXPRESSION, (val, ...args) => {
        const type = val.trim().replace(RX_MATCH_REPLACE, "");
        const isParameter = val.match(RX_PARAMETER);
        const isOptional = val.match(RX_OPTIONAL);
        isParameter && transformers.push(paramTypes[type] || paramTypes.any);
        return isParameter ? getParamRegex(type) : isOptional ? toAlternateRegex(val) : val;
      });
      return { regex, transformers };
    };
    checkAlternative = (match) => {
      const altIndexes = [];
      const regex = runRegexCheck(
        match,
        new RegExp(RX_ALT, "g"),
        // Use a non-capture group to allow matching, but don't include in the results (?:)
        getAlternateRegex
      );
      return { regex, altIndexes };
    };
    checkAnchors = (str2) => {
      let final = str2;
      if (!str2.startsWith("^"))
        final = "^" + final;
      if (!str2.endsWith("$"))
        final += "$";
      return { regex: final };
    };
    extractParameters = (text, stepMatcher, wordMatches) => {
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
      return expectedParamLength === result.params.length ? result.params : null;
    };
    findAsRegex = (definition, text) => {
      const escaped = escapeStr(definition.match);
      const { regex: regexAlts } = checkAlternative(escaped);
      const { transformers, regex: regexConverted } = convertToRegex(regexAlts);
      const { regex: regexAnchors } = checkAnchors(regexConverted);
      const found = matchRegex({ ...definition, match: regexAnchors }, text);
      return {
        found,
        escaped,
        regexAlts,
        transformers,
        regexAnchors,
        regexConverted
      };
    };
    matchExpression = (definition, text, $world) => {
      if (definition.match === text)
        return { definition, match: [] };
      const { found, transformers } = findAsRegex(definition, text);
      if (!found || !found.definition || !found.match)
        return import_jsutils7.noOpObj;
      const params = extractParameters(text, definition.match, found.match);
      if (!params)
        return import_jsutils7.noOpObj;
      const converted = convertTypes(params, transformers, $world);
      return converted.length !== params.length ? import_jsutils7.noOpObj : { definition, match: converted };
    };
  }
});

// src/matcher/matcher.ts
var import_jsutils8, REGEX_VARIANT, Matcher, matcher;
var init_matcher = __esm({
  "src/matcher/matcher.ts"() {
    init_constants();
    init_tokens();
    import_jsutils8 = __toESM(require_umd());
    init_regex();
    init_paramTypes();
    init_expression();
    ({ REGEX_VARIANT } = constants);
    Matcher = class {
      find = matcher;
      regex = matchRegex;
      parts = getRegexParts;
      types = getParamTypes;
      stepTokens = tokenizeStep;
      extract = extractParameters;
      expression = matchExpression;
      expressionFind = findAsRegex;
      register = registerParamType;
    };
    matcher = (definitions, text, $world) => {
      return definitions.reduce((found, definition) => {
        return found.match || !definition.match ? found : definition.variant !== REGEX_VARIANT ? matchExpression(definition, text, $world) : matchRegex(definition, text);
      }, import_jsutils8.noOpObj);
    };
  }
});

// src/matcher/index.js
var init_matcher2 = __esm({
  "src/matcher/index.js"() {
    init_matcher();
    init_paramTypes();
    init_regex();
    init_expression();
  }
});

// src/steps.ts
var import_jsutils9, REGEX_VARIANT2, EXPRESSION_VARIANT, STEP_TYPES, getContent, registerFromCall, tempRegister, registerFromParse, joinAllSteps, Steps;
var init_steps = __esm({
  "src/steps.ts"() {
    init_matcher2();
    init_constants();
    init_errors();
    import_jsutils9 = __toESM(require_umd());
    init_helpers();
    init_globalScope();
    ({ REGEX_VARIANT: REGEX_VARIANT2, EXPRESSION_VARIANT, STEP_TYPES } = constants);
    getContent = (def) => {
      const match = def.variant === REGEX_VARIANT2 ? def.match.toString() : `"${def.match}"`;
      return `${(0, import_jsutils9.capitalize)(def.type)}(${match}, ${def.method.toString()})`;
    };
    registerFromCall = function(internalType, type, match, method, meta = import_jsutils9.noOpObj) {
      const definition = {
        type,
        meta,
        match,
        method,
        // TODO: add token parsing
        tokens: [],
        variant: match.toString().indexOf("/") === 0 ? REGEX_VARIANT2 : EXPRESSION_VARIANT
      };
      definition.name = sanitize(definition);
      definition.uuid = sanitizeForId(`${type}-${definition.name}`);
      definition.content = getContent(definition);
      const definitions = this.list();
      const newDefinition = validateDefinition(definition, definitions);
      newDefinition && this[internalType].push(newDefinition);
      return newDefinition;
    };
    tempRegister = (parent, type, container) => {
      return (...args) => {
        const definition = parent[type](...args);
        container[type].push(definition);
        return definition;
      };
    };
    registerFromParse = function(definitions) {
      const DEF_TYPES = this.types.map((type) => (0, import_jsutils9.capitalize)(type));
      const container = DEF_TYPES.reduce((built, type) => {
        built[type] = [];
        return built;
      }, {});
      (0, import_jsutils9.eitherArr)(definitions, [definitions]).map((definition) => {
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
    joinAllSteps = (instance) => {
      return instance.types.reduce(
        (stepDefs, type) => stepDefs.concat(instance[`_${type}`]),
        []
      );
    };
    Steps = class {
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
        const self2 = this;
        this.types.map((type) => {
          const internalType = `_${type}`;
          this[internalType] = [];
          this[(0, import_jsutils9.capitalize)(type)] = (match, method, meta) => {
            return self2.register(internalType, type, match, method, meta);
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
        return (0, import_jsutils9.isStr)(args[0]) ? registerFromCall.apply(this, args) : registerFromParse.apply(this, args);
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
  }
});

// src/hooks.ts
var import_jsutils10, HOOK_TYPES, Hooks;
var init_hooks = __esm({
  "src/hooks.ts"() {
    init_constants();
    import_jsutils10 = __toESM(require_umd());
    init_errors();
    ({ HOOK_TYPES } = constants);
    Hooks = class {
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
            if (!(0, import_jsutils10.isFunc)(clientHookFn))
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
        const foundHooks = this.types.includes(type) ? this._registeredHooks[type] || import_jsutils10.noPropArr : throwInvalidHookType(HOOK_TYPES.join(", "), type);
        if (!foundHooks)
          return;
        return foundHooks.length ? async () => {
          return foundHooks.reduce(async (toResolve, hook) => {
            await toResolve;
            return await hook(this.instance);
          }, Promise.resolve());
        } : import_jsutils10.noOp;
      };
    };
  }
});

// src/parse/parseStep.ts
var RX_GIVEN, RX_WHEN, RX_THEN, RX_AND, RX_BUT, RX_ASTERISK, RX_DOC_QUOTES, RX_DOC_TICKS, RX_DATA_TABLE, RegStepTags, checkDataTable, checkDocString, stepFactory, parseStep;
var init_parseStep = __esm({
  "src/parse/parseStep.ts"() {
    init_types();
    init_helpers();
    RX_GIVEN = /^\s*Given (.*)$/;
    RX_WHEN = /^\s*When(.*)$/;
    RX_THEN = /^\s*Then (.*)$/;
    RX_AND = /^\s*And (.*)$/;
    RX_BUT = /^\s*But (.*)$/;
    RX_ASTERISK = /^\s*\* (.*)$/;
    RX_DOC_QUOTES = /^\s*?"""\s*?/;
    RX_DOC_TICKS = /^\s*?```\s*?/;
    RX_DATA_TABLE = /^\s*?\|/;
    RegStepTags = [
      { regex: RX_GIVEN, type: "given" /* given */ },
      { regex: RX_WHEN, type: "when" /* when */ },
      { regex: RX_THEN, type: "then" /* then */ },
      { regex: RX_AND, type: "and" /* and */ },
      { regex: RX_BUT, type: "but" /* but */ },
      { regex: RX_ASTERISK, type: "and" /* and */ }
    ];
    checkDataTable = (step, lines, line, index) => {
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
    checkDocString = (step, lines, line, index) => {
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
    stepFactory = (type, stepText, lines, line, index) => {
      let step = {
        type,
        index,
        step: stepText,
        whitespace: getStartWhiteSpace(line),
        uuid: sanitizeForId(`${type}-${stepText}`)
      };
      const nextIndex = index + 1;
      const nextLine = lines[nextIndex];
      const afterLines = lines.slice(nextIndex);
      step = checkDataTable(step, afterLines, nextLine, nextIndex);
      step = checkDocString(step, afterLines.join("\n"), nextLine, nextIndex);
      return step;
    };
    parseStep = (parent, lines, line, index) => {
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
  }
});

// src/utils/worldReplace.ts
var import_jsutils11, ALIAS_REF2, WORLD_REF, ALIAS_WORLD_KEY2, WORLD_AT_RUNTIME, ALIAS_REF_AT_RUNTIME, attemptReplace, aliasReplace, worldReplace, replaceWorld;
var init_worldReplace = __esm({
  "src/utils/worldReplace.ts"() {
    init_constants();
    import_jsutils11 = __toESM(require_umd());
    init_errors();
    init_patterns();
    ({
      ALIAS_REF: ALIAS_REF2,
      WORLD_REF,
      ALIAS_WORLD_KEY: ALIAS_WORLD_KEY2,
      WORLD_AT_RUNTIME,
      ALIAS_REF_AT_RUNTIME
    } = constants);
    attemptReplace = (match, world, location) => {
      const replaceWith = (0, import_jsutils11.get)(world, location);
      return (0, import_jsutils11.isFunc)(replaceWith) ? replaceWith(world, location) : (0, import_jsutils11.exists)(replaceWith) ? replaceWith : match;
    };
    aliasReplace = (text, world) => {
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
    worldReplace = (text, world) => {
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
    replaceWorld = (text, world) => {
      return worldReplace(aliasReplace(text, world), world);
    };
  }
});

// src/parse/parseHelpers.ts
var RX_FEATURE, RX_RULE, RX_SCENARIO, RX_EXAMPLE, RX_BACKGROUND, setActiveParent;
var init_parseHelpers = __esm({
  "src/parse/parseHelpers.ts"() {
    RX_FEATURE = /^\s*Feature:(.*)$/;
    RX_RULE = /^\s*Rule:(.*)$/;
    RX_SCENARIO = /^\s*Scenario:(.*)$/;
    RX_EXAMPLE = /^\s*Example:(.*)$/;
    RX_BACKGROUND = /^\s*Background:(.*)$/;
    setActiveParent = (activeParent, feature, rule, scenario, background, line) => {
      return RX_SCENARIO.test(line) || RX_EXAMPLE.test(line) ? scenario : RX_FEATURE.test(line) ? feature : RX_RULE.test(line) ? rule : RX_BACKGROUND.test(line) ? background : activeParent;
    };
  }
});

// src/parse/ensureRule.ts
var RX_RULE2, ruleFactory, ensureRule;
var init_ensureRule = __esm({
  "src/parse/ensureRule.ts"() {
    init_helpers();
    RX_RULE2 = /^\s*Rule:(.*)$/;
    ruleFactory = (rule, index) => {
      return {
        index,
        rule,
        tags: [],
        scenarios: [],
        // The feature name should always be unique, so use that as a re-usable id
        ...rule && { uuid: sanitizeForId(rule, index) }
      };
    };
    ensureRule = (feature, rule, line, index) => {
      if (!RX_RULE2.test(line))
        return rule;
      let ruleText = getRXMatch(line, RX_RULE2, 1);
      !rule.rule ? rule.rule = ruleText : rule = ruleFactory(ruleText, index);
      !rule.index && (rule.index = index);
      !rule.uuid && (rule.uuid = sanitizeForId(rule.rule, index));
      rule.whitespace = getStartWhiteSpace(line);
      !feature.rules.includes(rule) && feature.rules.push(rule);
      return rule;
    };
  }
});

// src/parse/parseError.ts
var parseError;
var init_parseError = __esm({
  "src/parse/parseError.ts"() {
    parseError = (feature, type, index, message) => {
      feature.errors = feature.errors || [];
      feature.errors.push({
        type,
        index,
        content: message || `Failed to parse ${type}`
      });
    };
  }
});

// src/parse/ensureFeature.ts
var RX_FEATURE2, RX_HAS_FEATURE, featureFactory, ensureFeature;
var init_ensureFeature = __esm({
  "src/parse/ensureFeature.ts"() {
    init_types();
    init_parseError();
    init_helpers();
    RX_FEATURE2 = /^\s*Feature:(.*)$/;
    RX_HAS_FEATURE = /\s*Feature:(.*)/;
    featureFactory = (feature, content, index) => {
      return {
        index,
        content,
        feature,
        tags: [],
        rules: [],
        empty: [],
        reason: [],
        comments: [],
        scenarios: [],
        // The feature name should always be unique, so use that as a re-usable id
        ...feature && { uuid: sanitizeForId(feature, index) }
      };
    };
    ensureFeature = (featuresGroup, feature, line, content, index) => {
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
          feature.uuid = sanitizeForId(feature.feature, index);
        !featuresGroup.includes(feature) && featuresGroup.push(feature);
        return feature;
      }
      const builtFeature = featureFactory(featureText, content, index);
      featuresGroup.push(builtFeature);
      return builtFeature;
    };
  }
});

// src/parse/ensureScenario.ts
var RX_SCENARIO2, RX_EXAMPLE2, scenarioFactory, ensureScenario;
var init_ensureScenario = __esm({
  "src/parse/ensureScenario.ts"() {
    init_types();
    init_helpers();
    RX_SCENARIO2 = /^\s*Scenario:(.*)$/;
    RX_EXAMPLE2 = /^\s*Example:(.*)$/;
    scenarioFactory = (scenario, index) => {
      return {
        index,
        scenario,
        tags: [],
        steps: [],
        ...scenario && { uuid: sanitizeForId(scenario, index) }
      };
    };
    ensureScenario = (feature, rule, scenario, line, index) => {
      const hasScenario = RX_SCENARIO2.test(line);
      const hasExample = RX_EXAMPLE2.test(line);
      if (!hasScenario && !hasExample)
        return scenario;
      const scenarioText = hasScenario ? getRXMatch(line, RX_SCENARIO2, 1) : getRXMatch(line, RX_EXAMPLE2, 1);
      !scenario.scenario ? scenario.scenario = scenarioText : scenario = scenarioFactory(scenarioText, index);
      !scenario.index && (scenario.index = index);
      !scenario.uuid && (scenario.uuid = sanitizeForId(scenario.scenario, index));
      scenario.whitespace = getStartWhiteSpace(line);
      if (!hasScenario)
        scenario.alias = "Example" /* Example */;
      const parent = rule.uuid && scenario.whitespace > rule.whitespace ? rule : feature;
      !parent.scenarios.includes(scenario) && parent.scenarios.push(scenario);
      return scenario;
    };
  }
});

// src/parse/ensureBackground.ts
var RX_BACKGROUND2, backgroundFactory, ensureBackground;
var init_ensureBackground = __esm({
  "src/parse/ensureBackground.ts"() {
    init_helpers();
    RX_BACKGROUND2 = /^\s*Background:(.*)$/;
    backgroundFactory = (background, index) => {
      return {
        index,
        steps: [],
        background,
        ...background && { uuid: sanitizeForId(background, index) }
      };
    };
    ensureBackground = (feature, rule, background, line, index) => {
      if (!RX_BACKGROUND2.test(line))
        return background;
      const parent = rule.uuid ? rule : feature;
      const backgroundText = `${parent.uuid}-background`;
      !background.background ? background.background = backgroundText || "" : background = backgroundFactory(backgroundText, index);
      !background.index && (background.index = index);
      !background.uuid && (background.uuid = sanitizeForId(background.background, index));
      background.whitespace = getStartWhiteSpace(line);
      parent.background = background;
      return background;
    };
  }
});

// src/parse/ensureMeta.ts
var import_jsutils12, RX_TAG, RX_AS, RX_COMMENT, RX_I_WANT, RX_SO_THAT, RX_IN_ORDER, featureMetaTags, addReason, featureMeta, checkTag, featureComment, featureEmptyLine;
var init_ensureMeta = __esm({
  "src/parse/ensureMeta.ts"() {
    import_jsutils12 = __toESM(require_umd());
    init_helpers();
    RX_TAG = /^\s*@(.*)$/;
    RX_AS = /^\s*As (.*)$/;
    RX_COMMENT = /^\s*#(.*)$/;
    RX_I_WANT = /^\s*I want (.*)$/;
    RX_SO_THAT = /^\s*So that (.*)$/;
    RX_IN_ORDER = /^\s*In order (.*)$/;
    featureMetaTags = [
      { regex: RX_AS, key: "perspective" },
      { regex: RX_I_WANT, key: "desire" },
      { regex: RX_SO_THAT, key: "reason" },
      { regex: RX_IN_ORDER, key: "reason" }
    ];
    addReason = (feature, reason, index) => {
      if (!reason)
        return;
      const reasonArr = (0, import_jsutils12.eitherArr)(feature.reason, [feature.reason]);
      reasonArr.push({ content: reason, index });
      feature.reason = reasonArr;
    };
    featureMeta = (feature, line, index) => {
      let metaAdded = false;
      featureMetaTags.reduce((added, regTag) => {
        if (added)
          return added;
        const hasTag = regTag.regex.test(line);
        if (!metaAdded && hasTag)
          metaAdded = true;
        return hasTag ? regTag.key === "reason" ? addReason(feature, getRXMatch(line, regTag.regex, 0), index) : feature[regTag.key] = {
          content: getRXMatch(line, regTag.regex, 0),
          index
        } : hasTag;
      }, false);
      return metaAdded;
    };
    checkTag = (parent, feature, line) => {
      if (!RX_TAG.test(line))
        return false;
      const tagParent = (parent == null ? void 0 : parent.background) ? feature : parent;
      const tags = getRXMatch(line, RX_TAG, 0);
      tagParent.tags = (tagParent.tags || []).concat(tags.split(" "));
      return true;
    };
    featureComment = (feature, line, index) => {
      if (!RX_COMMENT.test(line))
        return false;
      const comment = line.match(RX_COMMENT)[0];
      feature.comments.push({ content: comment, index });
      return true;
    };
    featureEmptyLine = (feature, line, index) => {
      if (line.trim().length)
        return false;
      feature.empty.push({ content: line, index });
      return true;
    };
  }
});

// src/parse/parseFeature.ts
var import_jsutils13, RX_NEWLINE, parseFeature;
var init_parseFeature = __esm({
  "src/parse/parseFeature.ts"() {
    init_parseStep();
    import_jsutils13 = __toESM(require_umd());
    init_worldReplace();
    init_parseHelpers();
    init_ensureRule();
    init_ensureFeature();
    init_ensureScenario();
    init_ensureBackground();
    init_ensureMeta();
    RX_NEWLINE = /\r?\n/g;
    parseFeature = function(text, world) {
      world = world || this && this.world || import_jsutils13.noOpObj;
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
        if (!(activeParent == null ? void 0 : activeParent.feature) && parseStep(activeParent, lines, line, index))
          return featuresGroup;
        activeParent = setActiveParent(
          activeParent,
          feature,
          rule,
          scenario,
          background,
          line
        );
        checkTag(activeParent, feature, line);
        return featuresGroup;
      }, features);
    };
  }
});

// src/parse/parseDefinition.ts
var parseDefinition;
var init_parseDefinition = __esm({
  "src/parse/parseDefinition.ts"() {
    parseDefinition = function(text) {
      const registered = this.steps.register([text]);
      return registered;
    };
  }
});

// src/parse/index.ts
var init_parse = __esm({
  "src/parse/index.ts"() {
    init_parseFeature();
    init_parseDefinition();
  }
});

// src/utils/testMethods.ts
var import_jsutils14, SPEC_RESULT_LOG, LOG_JEST_SPEC_ENV, logResultToTerminal, getSuiteData, getTestMethod, buildReporter, skipTestsOnFail;
var init_testMethods = __esm({
  "src/utils/testMethods.ts"() {
    init_constants();
    init_errors();
    import_jsutils14 = __toESM(require_umd());
    init_globalScope();
    ({ SPEC_RESULT_LOG, LOG_JEST_SPEC_ENV } = constants);
    logResultToTerminal = (result) => {
      const timestamp = (/* @__PURE__ */ new Date()).getTime();
      (0, import_jsutils14.get)(process, `env.${LOG_JEST_SPEC_ENV}`) && process.stdout.write(
        [
          SPEC_RESULT_LOG,
          JSON.stringify({ ...result, timestamp }),
          SPEC_RESULT_LOG
        ].join(``)
      );
    };
    getSuiteData = (suite) => {
      const description = (0, import_jsutils14.get)(suite, `description`);
      const type = !description ? `Feature` : description.startsWith(`Scenario >`) ? `Scenario` : description.startsWith(`Background >`) ? `Background` : description.startsWith(`Rule >`) ? `Rule` : `Feature`;
      return {
        type: type.toLowerCase(),
        // Format the description to match the actual Gherkin syntax
        ...type !== `Feature` && {
          description: description.replace(`${type} >`, `${type}:`)
        }
      };
    };
    getTestMethod = (type, testMode) => {
      return testMode ? import_jsutils14.noOp : global[type] || testMethodFill(type);
    };
    buildReporter = (jasmineEnv) => {
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
            action: `start`
          });
        },
        specStarted: (result) => {
          logResultToTerminal({
            ...result,
            type: `step`,
            action: `start`
          });
        },
        specDone: (result) => {
          logResultToTerminal({
            ...result,
            type: `step`,
            action: `end`
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
            action: `end`
          });
        }
      };
    };
    skipTestsOnFail = (testMode) => {
      var _a;
      if (!hasJasmine)
        return;
      const jasmineEnv = resolveJasmine().getEnv();
      jasmineEnv && jasmineEnv.describe && ((_a = jasmineEnv == null ? void 0 : jasmineEnv.addReporter) == null ? void 0 : _a.call(jasmineEnv, buildReporter(jasmineEnv)));
    };
  }
});

// src/runner.js
var import_jsutils15, buildTitle, resolveFeatures, runStep, loopSteps, runScenario, runBackground, runRule, parseFeatureTags, itemMatch, filterFeatures, Runner;
var init_runner = __esm({
  "src/runner.js"() {
    init_parse();
    init_testMethods();
    init_errors();
    import_jsutils15 = __toESM(require_umd());
    buildTitle = (text, type) => {
      return `${(0, import_jsutils15.capitalize)(type)} > ${text}`;
    };
    resolveFeatures = (data, $world) => {
      return (0, import_jsutils15.isStr)(data) ? parseFeature(data, $world) : (0, import_jsutils15.isObj)(data) ? [data] : (0, import_jsutils15.isArr)(data) ? data.reduce(
        (features, feature) => features.concat(resolveFeatures(feature, $world)),
        []
      ) : throwMissingFeatureText();
    };
    runStep = async (stepsInstance, step, testMode) => {
      const test = getTestMethod("test", testMode);
      test(`${(0, import_jsutils15.capitalize)(step.type)} ${step.step}`, async () => {
        return await stepsInstance.resolve(step.step);
      });
    };
    loopSteps = (parent, title, stepsInstance, testMode) => {
      const describe2 = getTestMethod("describe", testMode);
      let responses = [];
      describe2(title, () => {
        const responses2 = parent.steps.map(
          (step) => runStep(stepsInstance, step, testMode)
        );
        Promise.all(responses2);
      });
      return responses;
    };
    runScenario = (stepsInstance, scenario, background, testMode) => {
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
    runBackground = (stepsInstance, title, background, testMode) => {
      return loopSteps(
        background,
        buildTitle(title, `Background`),
        stepsInstance,
        testMode
      );
    };
    runRule = (stepsInstance, rule, background, testMode) => {
      let responses = [];
      describe(`Rule > ${rule.rule}`, () => {
        background && responses.push(
          ...responses.concat(
            runBackground((void 0).steps, rule.rule, background, testMode)
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
    parseFeatureTags = (tags) => {
      return (0, import_jsutils15.isStr)(tags) && tags.match(/[@]\w*/g);
    };
    itemMatch = (name = "", tags = [], filterOptions = {}) => {
      const { name: filterName, tags: filterTags } = filterOptions;
      const parsedTags = (0, import_jsutils15.isStr)(filterTags) ? parseFeatureTags(filterTags) : (0, import_jsutils15.eitherArr)(filterTags, []);
      const nameMatch = !filterName || name.includes(filterName);
      const tagMatch = !parsedTags.length || parsedTags.every((clientTag) => tags.includes(clientTag));
      return nameMatch && tagMatch;
    };
    filterFeatures = (features, filterOptions = {}) => {
      return features.reduce((filtered, feature) => {
        const isMatchingFeature = itemMatch(
          feature.feature,
          feature.tags,
          filterOptions
        );
        if (isMatchingFeature) {
          filtered.push(feature);
          return filtered;
        }
        const matchingScenarios = feature.scenarios.filter(
          (scenario) => itemMatch(
            scenario.scenario,
            [...scenario.tags || [], ...feature.tags || []],
            filterOptions
          )
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
    Runner = class {
      constructor(steps, hooks, world) {
        !steps && throwMissingSteps();
        !hooks && throwMissingHooks();
        this.steps = steps;
        this.hooks = hooks;
        this._world = world;
      }
      /**
       * Gets the features to be run for a test
       * @param {string|Array<Object>|Object} data - Feature data as a string or parsed Feature model
       * @param {Object} options - Define how the steps are run
       * @param {Array<string>? | string?} options.tags - Tags to filter which features or scenarios are run
       * @param {string?} options.name - Name of feature
       */
      getFeatures = (data, options2) => {
        const features = resolveFeatures(data, this._world);
        return filterFeatures(features, options2);
      };
      /**
       * Parses and runs the steps of a feature text string
       * Matches each step to a registered steps of the Steps class instance
       * @memberof Runner
       * @function
       * @public
       * @param {string|Array<Object>|Object} data - Feature data as a string or parsed Feature model
       * @param {Object} options - Define how the steps are run
       * @param {Array<string>? | string?} options.tags - Tags to filter which features or scenarios are run
       * @param {string?} options.name - Name of feature
       *
       * @returns {boolean} - whether any tests ran
       */
      run = async (data, options2 = import_jsutils15.noOpObj) => {
        const testMode = this.run.PARKIN_TEST_MODE;
        skipTestsOnFail(testMode);
        const describe2 = getTestMethod("describe", testMode);
        const beforeAll = getTestMethod("beforeAll", testMode);
        const afterAll = getTestMethod("afterAll", testMode);
        const beforeEach = getTestMethod("beforeEach", testMode);
        const afterEach = getTestMethod("afterEach", testMode);
        const features = this.getFeatures(data, options2);
        if (!features.length)
          return false;
        const promises = await features.map(async (feature) => {
          let responses = [];
          beforeAll(this.hooks.getRegistered("beforeAll"));
          afterAll(this.hooks.getRegistered("afterAll"));
          beforeEach(this.hooks.getRegistered("beforeEach"));
          afterEach(this.hooks.getRegistered("afterEach"));
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
  }
});

// src/assemble/addContent.ts
var import_jsutils16, addContent;
var init_addContent = __esm({
  "src/assemble/addContent.ts"() {
    import_jsutils16 = __toESM(require_umd());
    addContent = (assembled, content, index) => {
      !(0, import_jsutils16.exists)(index) ? assembled.push(content) : (0, import_jsutils16.exists)(assembled[index]) ? assembled.splice(index, 0, content) : assembled[index] = content;
    };
  }
});

// src/assemble/addMeta.ts
var import_jsutils17, FEATURE_META, addMeta;
var init_addMeta = __esm({
  "src/assemble/addMeta.ts"() {
    init_constants();
    init_types();
    init_addContent();
    import_jsutils17 = __toESM(require_umd());
    ({ FEATURE_META } = constants);
    addMeta = (assembled, feature) => {
      FEATURE_META.map((key) => {
        switch (key) {
          case "feature":
            addContent(assembled, `${"Feature" /* Feature */}: ${feature[key]}`, feature.index);
            break;
          case "comments":
            const comments = feature[key];
            comments && (0, import_jsutils17.eitherArr)(comments, [comments]).map((item) => addContent(assembled, item.content, item.index));
            break;
          case "reason":
          case "desire":
          case "perspective":
            const other = feature[key];
            other && (0, import_jsutils17.eitherArr)(other, [other]).map((item) => addContent(assembled, `  ${item.content}`, item.index));
            break;
        }
      });
    };
  }
});

// src/assemble/addTags.ts
var import_jsutils18, addTags;
var init_addTags = __esm({
  "src/assemble/addTags.ts"() {
    init_addContent();
    import_jsutils18 = __toESM(require_umd());
    addTags = (assembled, tags, spacer = "") => {
      (0, import_jsutils18.isArr)(tags) && tags.length && addContent(assembled, `${spacer}${tags.join(" ")}`);
    };
  }
});

// src/assemble/addEmpty.ts
var addEmpty;
var init_addEmpty = __esm({
  "src/assemble/addEmpty.ts"() {
    init_addContent();
    addEmpty = (assembled, feature) => {
      var _a, _b;
      ((_a = feature == null ? void 0 : feature.empty) == null ? void 0 : _a.length) && ((_b = feature == null ? void 0 : feature.empty) == null ? void 0 : _b.forEach((item) => addContent(assembled, item.content, item.index)));
    };
  }
});

// src/assemble/addSteps.ts
var import_jsutils19, addSteps;
var init_addSteps = __esm({
  "src/assemble/addSteps.ts"() {
    init_addContent();
    import_jsutils19 = __toESM(require_umd());
    addSteps = (assembled, parent) => {
      (0, import_jsutils19.isArr)(parent.steps) && parent.steps.length && parent.steps.map((step) => {
        addContent(
          assembled,
          `${step.whitespace || `    `}${(0, import_jsutils19.capitalize)(step.type)} ${step.step}`,
          step.index
        );
      });
    };
  }
});

// src/assemble/addScenarios.ts
var addScenarios;
var init_addScenarios = __esm({
  "src/assemble/addScenarios.ts"() {
    init_addTags();
    init_addSteps();
    init_types();
    init_addContent();
    addScenarios = (assembled, parent) => {
      parent.scenarios && parent.scenarios.map((scenario) => {
        const whitespace = scenario.whitespace || `  `;
        const type = scenario.alias || "Scenario" /* Scenario */;
        addTags(assembled, scenario.tags, whitespace);
        addContent(assembled, `${whitespace}${type}: ${scenario.scenario}`, scenario.index);
        addSteps(assembled, scenario);
      });
    };
  }
});

// src/assemble/addBackground.ts
var addBackground;
var init_addBackground = __esm({
  "src/assemble/addBackground.ts"() {
    init_addTags();
    init_addSteps();
    init_types();
    init_addContent();
    addBackground = (assembled, parent) => {
      const { background } = parent;
      if (!background)
        return;
      const whitespace = background.whitespace || `  `;
      addTags(assembled, background.tags, whitespace);
      addContent(assembled, `${whitespace}${"Background" /* Background */}:`, background.index);
      addSteps(assembled, background);
    };
  }
});

// src/assemble/addRules.ts
var addRules;
var init_addRules = __esm({
  "src/assemble/addRules.ts"() {
    init_addTags();
    init_types();
    init_addContent();
    init_addScenarios();
    init_addBackground();
    addRules = (assembled, feature) => {
      feature.rules && feature.rules.map((rule) => {
        const whitespace = rule.whitespace || `  `;
        addTags(assembled, rule.tags, whitespace);
        addContent(assembled, `${whitespace}${"Rule" /* Rule */}: ${rule.rule}`, rule.index);
        addBackground(assembled, rule);
        addScenarios(assembled, rule);
      });
    };
  }
});

// src/assemble/format.ts
var import_jsutils20, formatComment, formatAssembled;
var init_format = __esm({
  "src/assemble/format.ts"() {
    import_jsutils20 = __toESM(require_umd());
    formatComment = (assembled, line, index) => {
      const next = assembled[index + 1];
      const prev = assembled[index - 1];
      let compareLine = (0, import_jsutils20.exists)(next) ? next : prev;
      if (!compareLine)
        return `${line}
`;
      const comment = line.split("#").pop();
      const whiteSpace = Array(
        compareLine.length - compareLine.trimStart().length
      ).join(" ");
      return `${whiteSpace} # ${comment}
`;
    };
    formatAssembled = (assembled) => {
      return Array.from(assembled, (line, index) => {
        return !(0, import_jsutils20.exists)(line) ? "\n" : line.startsWith("#") ? formatComment(assembled, line, index) : `${line}
`;
      }).join("").trim();
    };
  }
});

// src/assemble/feature.ts
var import_jsutils21, assembleFeature;
var init_feature = __esm({
  "src/assemble/feature.ts"() {
    init_addMeta();
    init_addTags();
    init_addEmpty();
    init_addRules();
    init_format();
    init_addScenarios();
    init_addBackground();
    import_jsutils21 = __toESM(require_umd());
    init_errors();
    assembleFeature = (toAssemble) => {
      return (0, import_jsutils21.eitherArr)(toAssemble, [toAssemble]).map((feature) => {
        let assembled = [];
        !(0, import_jsutils21.isObj)(feature) && throwFeatureNotAnObj(feature);
        addTags(assembled, feature.tags);
        addMeta(assembled, feature);
        addEmpty(assembled, feature);
        addBackground(assembled, feature);
        addRules(assembled, feature);
        addScenarios(assembled, feature);
        return formatAssembled(assembled);
      });
    };
  }
});

// src/assemble/assemble.ts
var assemble;
var init_assemble = __esm({
  "src/assemble/assemble.ts"() {
    init_feature();
    assemble = {
      feature: assembleFeature
    };
  }
});

// src/assemble/index.ts
var init_assemble2 = __esm({
  "src/assemble/index.ts"() {
    init_assemble();
  }
});

// src/parkin.ts
var import_jsutils22, Parkin, PKInstance;
var init_parkin = __esm({
  "src/parkin.ts"() {
    init_steps();
    init_hooks();
    init_runner();
    init_assemble2();
    init_matcher2();
    init_parse();
    import_jsutils22 = __toESM(require_umd());
    Parkin = class {
      #isInit = false;
      steps;
      hooks;
      parse;
      runner;
      run;
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
        (0, import_jsutils22.isObj)(world) && this.init(world, steps);
      }
      init = (world = import_jsutils22.noOpObj, steps, warn = true) => {
        if (this.#isInit) {
          return warn && console.warn(`This instance of parkin has already been initialized!`);
        }
        if (!(0, import_jsutils22.isObj)(world.$alias))
          world.$alias = {};
        this.#isInit = true;
        this.world = world;
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
        this.matcher = new Matcher();
        (0, import_jsutils22.isObj)(steps) && this.registerSteps(steps);
        this.steps.types.map((type) => {
          this[(0, import_jsutils22.capitalize)(type)] = (matcher2, method, meta) => this.steps.register(`_${type}`, type, matcher2, method, meta);
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
        Object.entries(steps).map(
          ([type, typedSteps]) => (
            // Loop each step type ( Given, When, Then, But, And )
            Object.entries(typedSteps).map(
              ([matcher2, content]) => (
                // Register the step based by type with the Step class instance
                this.steps[(0, import_jsutils22.capitalize)(type)](matcher2, ...(0, import_jsutils22.eitherArr)(content, [content]))
              )
            )
          )
        );
      };
    };
    PKInstance = new Parkin();
  }
});

// src/global.ts
var setGlobals;
var init_global = __esm({
  "src/global.ts"() {
    init_parkin();
    init_globalScope();
    setGlobals = (force) => {
      const globalObj = resolveGlobalObj();
      const forceGlobal = force || process.env.PARKIN_TEST_GLOBALS_OVERRIDE;
      if (!globalObj.Parkin || forceGlobal)
        globalObj.Parkin = Parkin;
      if (!globalObj.PK || forceGlobal)
        globalObj.PK = PKInstance;
    };
    setGlobals();
  }
});

// src/test/utils.ts
var import_jsutils23, helperTypes, globalTypes, Types, throwError, validateHelper, validateRootRun, validateItem, createItem, createDescribe, createRoot;
var init_utils = __esm({
  "src/test/utils.ts"() {
    import_jsutils23 = __toESM(require_umd());
    helperTypes = (0, import_jsutils23.keyMap)([
      `beforeAll`,
      `beforeEach`,
      `afterAll`,
      `afterEach`
    ]);
    globalTypes = {
      ...(0, import_jsutils23.keyMap)([`test`, `it`, `xtest`, `xit`, `describe`]),
      ...helperTypes
    };
    Types = {
      ...globalTypes,
      ...(0, import_jsutils23.keyMap)([`root`])
    };
    throwError = (error) => {
      throw new Error(error);
    };
    validateHelper = (type, action) => {
      !(0, import_jsutils23.isFunc)(action) && throwError(
        `The ${type} method requires a "function" as the first argument`
      );
    };
    validateRootRun = (root) => {
      root.type !== Types.root && throwError(`Invalid root type "${root.type}" set for root object`);
      !root.describes || !root.describes.length && throwError(`No tests have been registered to this ParkinTest instance`);
    };
    validateItem = (type, description, action) => {
      !(0, import_jsutils23.isStr)(type) && throwError(`Test item type is required as a string`);
      !(0, import_jsutils23.isFunc)(action) && throwError(
        `The ${type} method requires a "function" as the second argument`
      );
      !(0, import_jsutils23.isStr)(description) && throwError(`The ${type} method requires a "string" as the first argument`);
    };
    createItem = (type, metadata = import_jsutils23.noOpObj, validate = true) => {
      const { description, action } = metadata;
      validate && validateItem(type, description, action);
      return { ...metadata, type };
    };
    createDescribe = (description, action) => {
      const item = createItem(Types.describe, {
        ...createRoot(),
        action,
        tests: [],
        description
      });
      item.disabled = () => item.skip = true;
      return item;
    };
    createRoot = () => {
      return createItem(
        Types.root,
        {
          describes: [],
          ...Object.values(helperTypes).reduce((acc, type) => {
            acc[type] = [];
            return acc;
          }, {})
        },
        false
      );
    };
  }
});

// src/test/run.js
var import_jsutils24, runResult, loopHooks, loopTests, callBeforeHooks, callAfterHooks, loopDescribes, run;
var init_run = __esm({
  "src/test/run.js"() {
    import_jsutils24 = __toESM(require_umd());
    init_utils();
    runResult = (item, { id, fullName, action, failed, passed, testPath }) => {
      const result = {
        id,
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
      (0, import_jsutils24.isObj)(failed) && result.failedExpectations.push(failed);
      (0, import_jsutils24.isObj)(passed) && result.passedExpectations.push(passed);
      if (passed || failed)
        result.status = passed ? `passed` : `failed`;
      return result;
    };
    loopHooks = async (args) => {
      const { type, test, specId, suiteId, describe: describe2, root } = args;
      let hookIdx;
      const activeItem = root || describe2;
      const fullName = root ? root.description : test ? `${describe2 == null ? void 0 : describe2.description} > ${test == null ? void 0 : test.description} > ${type}` : `${describe2 == null ? void 0 : describe2.description} > ${type}`;
      try {
        activeItem[type].length && await Promise.all(
          activeItem[type].map((fn, idx) => {
            hookIdx = idx;
            return fn();
          })
        );
      } catch (error) {
        return runResult(activeItem, {
          fullName,
          action: type,
          status: "failed",
          id: test ? specId : suiteId,
          failed: { name: error.name, message: error.message },
          testPath: test ? `/${suiteId}/${specId}/${type}${hookIdx}` : `/${suiteId}/${type}${hookIdx}`
        });
      }
    };
    loopTests = async (args) => {
      const { suiteId, describe: describe2, testOnly, specDone, specStarted } = args;
      let describeFailed = false;
      const results = [];
      for (let testIdx = 0; testIdx < describe2.tests.length; testIdx++) {
        const test = describe2.tests[testIdx];
        const specId = `spec${testIdx}`;
        const testPath = `/${suiteId}/${specId}`;
        const fullName = `${describe2.description} > ${test.description}`;
        let testResult = runResult(test, {
          fullName,
          testPath,
          id: specId,
          action: "start"
        });
        if (testOnly && !test.only || test.skip) {
          specStarted({
            ...testResult,
            skipped: true,
            action: "skipped",
            status: "skipped"
          });
          continue;
        } else
          specStarted(testResult);
        const beforeEachResult = await loopHooks({
          test,
          specId,
          suiteId,
          describe: describe2,
          type: Types.beforeEach
        });
        if (beforeEachResult) {
          describeFailed = true;
          results.push(beforeEachResult);
          specDone(beforeEachResult);
          break;
        }
        try {
          const result = await test.action();
          testResult = runResult(test, {
            fullName,
            id: specId,
            testPath,
            action: Types.test,
            passed: result || true
          });
        } catch (error) {
          testResult = runResult(test, {
            fullName,
            id: specId,
            action: Types.test,
            testPath,
            failed: { name: error.name, message: error.message }
          });
          describeFailed = true;
        }
        const afterEachResult = await loopHooks({
          test,
          specId,
          suiteId,
          describe: describe2,
          type: Types.afterEach
        });
        if (afterEachResult) {
          describeFailed = true;
          results.push(afterEachResult);
          specDone(afterEachResult);
          break;
        }
        results.push(testResult);
        specDone({ ...testResult, action: "end" });
      }
      return {
        tests: results,
        failed: describeFailed
      };
    };
    callBeforeHooks = async ({ root, suiteId, describe: describe2 }) => {
      const beforeEachResult = await loopHooks({
        root,
        suiteId: Types.root,
        type: Types.beforeEach
      });
      const beforeAllResult = !beforeEachResult && await loopHooks({
        suiteId,
        describe: describe2,
        type: Types.beforeAll
      });
      return beforeEachResult || beforeAllResult;
    };
    callAfterHooks = async ({ root, suiteId, describe: describe2 }) => {
      const afterEachResult = await loopHooks({
        root,
        suiteId: Types.root,
        type: Types.afterEach
      });
      const afterAllResult = !afterEachResult && await loopHooks({
        suiteId,
        describe: describe2,
        type: Types.afterAll
      });
      return afterEachResult || afterAllResult;
    };
    loopDescribes = async (args) => {
      const {
        root,
        testOnly,
        specDone,
        suiteDone,
        specStarted,
        parentIdx = ``,
        suiteStarted,
        describeOnly
      } = args;
      let describeFailed = false;
      const results = [];
      for (let idx = 0; idx < root.describes.length; idx++) {
        const describe2 = root.describes[idx];
        const suiteId = `suite-${parentIdx}${idx}`;
        let describeResult = runResult(describe2, {
          id: suiteId,
          action: "start",
          testPath: `/${suiteId}`,
          fullName: describe2.description
        });
        const shouldSkip = describe2.skip || describeOnly && !describe2.only && !describe2.onlyChild || testOnly && !describe2.onlyChild;
        if (shouldSkip) {
          suiteStarted({
            ...describeResult,
            skipped: true,
            action: "skipped",
            status: "skipped"
          });
          continue;
        } else
          suiteStarted(describeResult);
        const beforeResult = await callBeforeHooks({
          root,
          suiteId,
          describe: describe2
        });
        if (beforeResult) {
          describeFailed = true;
          describeResult = { ...describeResult, ...beforeResult };
          suiteDone(describeResult);
          results.push(describeResult);
          continue;
        }
        const testResults = await loopTests({
          suiteId,
          describe: describe2,
          testOnly,
          specDone,
          specStarted
        });
        const describesResults = describe2.describes && describe2.describes.length && await loopDescribes({
          ...args,
          root: describe2,
          parentIdx: `${idx}-`
        });
        describeResult = {
          ...describeResult,
          ...describesResults,
          action: "end",
          tests: testResults.tests
        };
        if (testResults.failed || describesResults.failed) {
          describeFailed = true;
          describeResult.failed = true;
        } else
          describeResult.passed = true;
        const afterResult = await callAfterHooks({
          root,
          suiteId,
          describe: describe2
        });
        if (afterResult) {
          describeFailed = true;
          describeResult = { ...describeResult, ...afterResult };
          suiteDone(describeResult);
          results.push(describeResult);
          continue;
        }
        suiteDone(describeResult);
        results.push(describeResult);
      }
      return { describes: results, failed: describeFailed };
    };
    run = async (args) => {
      validateRootRun(args.root);
      const beforeAllResult = await loopHooks({
        root: args.root,
        suiteId: Types.root,
        type: Types.beforeAll
      });
      if (beforeAllResult)
        return [beforeAllResult];
      const { describes } = await loopDescribes(args);
      const afterAllResult = await loopHooks({
        root: args.root,
        suiteId: Types.root,
        type: Types.afterAll
      });
      afterAllResult && describes.push(afterAllResult);
      return describes;
    };
  }
});

// src/test/test.js
var import_jsutils25, ParkinTest;
var init_test = __esm({
  "src/test/test.js"() {
    init_run();
    import_jsutils25 = __toESM(require_umd());
    init_utils();
    ParkinTest = class {
      timeout = 6e3;
      #specDone = import_jsutils25.noOp;
      #suiteDone = import_jsutils25.noOp;
      #specStarted = import_jsutils25.noOp;
      #suiteStarted = import_jsutils25.noOp;
      #activeParent = void 0;
      #testOnly = false;
      #describeOnly = false;
      #autoClean = true;
      #root = createRoot();
      constructor(config = import_jsutils25.noOpObj) {
        this.#root.description = config.description || `root`;
        this.#addOnly();
        this.#addSkip();
        this.#addHelpers();
        this.it = this.test;
        this.xit = this.xtest;
        this.#activeParent = this.#root;
        this.#setConfig(config);
      }
      run = (config = import_jsutils25.noOpObj) => {
        if (config.description)
          this.#root.description = config.description;
        this.#setConfig(config);
        const result = run({
          root: this.#root,
          testOnly: this.#testOnly,
          specDone: this.#specDone,
          suiteDone: this.#suiteDone,
          specStarted: this.#specStarted,
          describeOnly: this.#describeOnly,
          suiteStarted: this.#suiteStarted
        });
        this.#autoClean && this.clean();
        return result;
      };
      /**
       * Resets the instance to it's initial state
       * Clears all previously loaded tests and describes
       */
      clean = () => {
        this.timeout = 6e3;
        this.#autoClean = true;
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
       * Sets the test config from the passed in object
       */
      setConfig = (config) => this.#setConfig(config || import_jsutils25.noOpObj);
      /**
       * Adds passed in framework hooks to the class instance
       */
      #setConfig = ({
        timeout,
        autoClean,
        specDone,
        suiteDone,
        specStarted,
        suiteStarted
      }) => {
        if (timeout)
          this.timeout = timeout;
        if (specDone)
          this.#specDone = specDone;
        if (suiteDone)
          this.#suiteDone = suiteDone;
        if (specStarted)
          this.#specStarted = specStarted;
        if (suiteStarted)
          this.#suiteStarted = suiteStarted;
        if (autoClean === false)
          this.#autoClean = autoClean;
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
          (0, import_jsutils25.checkCall)(this.#activeParent.hasOnlyChild);
        };
        this.test.only = (...args) => {
          this.test(...args);
          const item = this.#activeParent.tests[this.#activeParent.tests.length - 1];
          item.only = true;
          this.#testOnly = true;
          (0, import_jsutils25.checkCall)(this.#activeParent.hasOnlyChild);
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
        Object.values(helperTypes).map((type) => {
          this[type] = (action) => {
            validateHelper(type, action);
            this.#activeParent[type].push(action);
          };
        });
      };
      /**
       * Method the wraps test and helper methods
       * Acts as a top level method for defining tests
       * @param {string} description - Metadata about the describe
       * @param {function} action - Function to call for the describe
       *
       * @returns {void}
       */
      describe = (description, action) => {
        const item = createDescribe(description, action);
        this.#activeParent.describes.push(item);
        const lastParent = this.#activeParent;
        item.hasOnlyChild = () => {
          item.onlyChild = true;
          (0, import_jsutils25.checkCall)(lastParent.hasOnlyChild);
        };
        this.#activeParent = item;
        action();
        this.#activeParent = lastParent;
      };
      /**
       * Method that executes some test logic
       * Must be called within a Test#describe method
       * @param {string} description - Metadata about the test
       * @param {function} action - Function to call for the test
       *
       * @returns {void}
       */
      test = (description, action, timeout) => {
        if (!this.#activeParent || this.#activeParent.type === Types.root)
          throwError(
            `All ${Types.test} method calls must be called within a ${Types.describe} method`
          );
        const item = createItem(Types.test, { action, timeout, description });
        item.disabled = () => item.skip = true;
        this.#activeParent.tests.push(item);
      };
      /**
       * Called when a test method should be skipped
       * Must be called within a Test#describe method
       * @param {string} description - Metadata about the test
       *
       * @returns {void}
       */
      xtest = (description) => {
        if (!this.#activeParent || this.#activeParent.type === Types.root)
          throwError(
            `All ${Types.test} method calls must be called within a ${Types.describe} method`
          );
        !(0, import_jsutils25.isStr)(description) && throwError(
          `The ${Types.test} method requires a "string" as the first argument`
        );
        const item = createItem(Types.test, { description, skip: true }, false);
        item.disabled = () => item.skip = true;
        this.#activeParent.tests.push(item);
      };
    };
  }
});

// src/test/global.ts
var import_expect, setGlobals2;
var init_global2 = __esm({
  "src/test/global.ts"() {
    import_expect = __toESM(require("expect"));
    init_test();
    init_utils();
    init_globalScope();
    setGlobals2 = (force) => {
      const PTE = new ParkinTest();
      const globalObj = resolveGlobalObj();
      const forceGlobal = force || process.env.PARKIN_TEST_GLOBALS_OVERRIDE;
      if (!globalObj.expect || forceGlobal)
        globalObj.expect = import_expect.default;
      if (!globalObj.PTE || forceGlobal)
        globalObj.PTE = PTE;
      if (!globalObj.ParkinTest || forceGlobal)
        globalObj.ParkinTest = ParkinTest;
      Object.values(globalTypes).map(
        (name) => (!globalObj[name] || forceGlobal) && (globalObj[name] = PTE[name].bind(PTE))
      );
    };
    setGlobals2();
  }
});

// src/bin/globals.ts
var init_globals = __esm({
  "src/bin/globals.ts"() {
    init_global();
    init_global2();
  }
});

// src/bin/paths.ts
var import_os, import_path, import_jsutils26, cwd, homeDir, checkRootDir, __RootDir, setRoot, getRoot;
var init_paths = __esm({
  "src/bin/paths.ts"() {
    import_os = require("os");
    import_path = __toESM(require("path"));
    import_jsutils26 = __toESM(require_umd());
    cwd = process.cwd();
    homeDir = (0, import_os.homedir)();
    checkRootDir = (rootDir) => {
      return !(0, import_jsutils26.isStr)(rootDir) ? void 0 : rootDir.startsWith(`/`) ? rootDir : rootDir.startsWith(`~/`) ? import_path.default.join(homeDir, rootDir.replace(`~/`, ``)) : import_path.default.join(cwd, rootDir);
    };
    setRoot = (loc, force) => {
      (!__RootDir || force) && (__RootDir = checkRootDir(loc));
    };
    getRoot = () => {
      return __RootDir;
    };
  }
});

// src/bin/instance.ts
var initPK, getPTE, getPK, getParkin;
var init_instance = __esm({
  "src/bin/instance.ts"() {
    init_globals();
    init_globalScope();
    initPK = (world) => {
      const PK = getPK();
      PK.init(world, {}, false);
      return PK;
    };
    getPTE = (testConfig) => {
      const globalObj = resolveGlobalObj();
      const PTE = globalObj.PTE;
      PTE.setConfig(testConfig);
      return PTE;
    };
    getPK = () => {
      const globalObj = resolveGlobalObj();
      return globalObj.PK;
    };
    getParkin = (world, steps) => {
      const globalObj = resolveGlobalObj();
      const Parkin2 = globalObj.Parkin;
      return new Parkin2(world, steps);
    };
  }
});

// src/bin/options.ts
var options;
var init_options = __esm({
  "src/bin/options.ts"() {
    options = {
      features: {
        type: `array`,
        alias: [`files`, `file`, `fl`, `feature`, `feat`, `ft`]
      },
      defs: {
        type: `array`,
        alias: [`definitions`, `dfs`, `df`, `steps`, `step`, `st`]
      },
      world: {
        alias: [`wld`, `wd`]
      },
      rootDir: {
        alias: [`root`, `rt`]
      },
      ext: {
        alias: [`ex`]
      },
      exts: {
        type: `array`,
        alias: [`exs`]
      },
      exclude: {
        type: `array`,
        alias: [`exc`, `skip`, `ignore`]
      },
      include: {
        type: `array`,
        alias: [`in`, `only`]
      },
      timeout: {
        default: 5e3,
        type: `number`,
        alias: [`time`]
      }
    };
  }
});

// node_modules/get-all-files/dist/index.js
function l(r2, t2, n2, i2) {
  if (0 === r2.length)
    return void (n2.done = true);
  const s = [];
  let c2 = r2.length;
  for (const d of r2)
    i2.isExcludedDir(d) || import_fs.default.readdir(d, { withFileTypes: true }, (e2, r3) => {
      if (null == e2) {
        for (const e3 of r3) {
          const r4 = d + e3.name;
          e3.isDirectory() ? s.push(r4 + import_path2.sep) : t2.push(r4);
        }
        n2.resolve(), 0 == --c2 && l(s, t2, n2, i2);
      } else
        n2.reject(e2);
    });
}
var import_fs, import_path2, t, n, i, c;
var init_dist = __esm({
  "node_modules/get-all-files/dist/index.js"() {
    import_fs = __toESM(require("fs"), 1);
    import_path2 = require("path");
    t = import_fs.default.promises;
    n = ({ resolve: e2 = false, isExcludedDir: o2 = () => false } = {}) => ({ resolve: e2, isExcludedDir: o2 });
    i = (e2, t2) => (true === t2.resolve && (e2 = (0, import_path2.resolve)(e2)), e2.length > 0 && e2[e2.length - 1] !== import_path2.sep && (e2 += import_path2.sep), e2);
    c = (e2, o2) => {
      o2 = n(o2);
      const r2 = { async *[Symbol.asyncIterator]() {
        if (!(await t.lstat(e2)).isDirectory())
          return void (yield e2);
        const r3 = [], n2 = function() {
          let e3 = false, o3 = () => {
          }, r4 = () => {
          }, t2 = new Promise((e4, t3) => {
            o3 = e4, r4 = t3;
          });
          return { resolve() {
            const e4 = o3;
            t2 = new Promise((e5, t3) => {
              o3 = e5, r4 = t3;
            }), e4();
          }, reject(e4) {
            r4(e4);
          }, get done() {
            return e3;
          }, set done(o4) {
            e3 = o4;
          }, onResolved: () => t2 };
        }();
        l([i(e2, o2)], r3, n2, o2);
        do {
          for (await n2.onResolved(); r3.length > 0; )
            yield r3.pop();
        } while (!n2.done);
      }, toArray: async () => {
        const e3 = [];
        for await (const o3 of r2)
          e3.push(o3);
        return e3;
      } };
      return r2;
    };
  }
});

// src/bin/helpers.ts
var import_path3, import_jsutils27, locsByTypes, fullLoc;
var init_helpers2 = __esm({
  "src/bin/helpers.ts"() {
    import_path3 = __toESM(require("path"));
    import_jsutils27 = __toESM(require_umd());
    init_dist();
    init_paths();
    locsByTypes = async (loc, opts) => {
      const { exclude, include, ext, exts } = opts;
      if (!ext && (!exts || !exts.length))
        return [];
      const extsArr = (0, import_jsutils27.eitherArr)(exts, []);
      ext && !extsArr.includes(ext) && extsArr.push(ext);
      const extensions = extsArr.map((ex) => ex.startsWith(`.`) ? ex : `.${ex}`);
      const files = await c(loc, { resolve: true }).toArray();
      return files.filter((file) => {
        if ((exclude == null ? void 0 : exclude.length) && exclude.find((ex) => file.includes(ex)))
          return false;
        if ((include == null ? void 0 : include.length) && !include.find((inc) => file.includes(inc)))
          return false;
        const fileExt = import_path3.default.extname(file);
        return extensions.includes(fileExt);
      });
    };
    fullLoc = (loc) => {
      const root = getRoot() || cwd;
      return loc.startsWith(`/`) ? loc : loc.startsWith(`~/`) ? import_path3.default.join(homeDir, loc.replace(`~/`, ``)) : import_path3.default.join(root, loc);
    };
  }
});

// src/bin/getDefs.ts
var import_jsutils28, filterDefs, getDefs;
var init_getDefs = __esm({
  "src/bin/getDefs.ts"() {
    init_instance();
    init_paths();
    import_jsutils28 = __toESM(require_umd());
    init_helpers2();
    filterDefs = async (loc, opts) => {
      return await locsByTypes(loc, {
        ...opts,
        exts: (0, import_jsutils28.flatUnion)([
          opts == null ? void 0 : opts.ext,
          ...(opts == null ? void 0 : opts.exts) || [],
          `.js`,
          `.ts`,
          `.cjs`,
          `.ejs`,
          `.tsx`,
          `.jsx`
        ])
      });
    };
    getDefs = async (opts) => {
      let filesArr = (0, import_jsutils28.ensureArr)(opts.defs || []);
      const defs = !filesArr.length ? await filterDefs(getRoot() || cwd, opts) : await filesArr.reduce(async (resolve, loc) => {
        const acc = await resolve;
        const defs2 = await filterDefs(fullLoc(loc), opts);
        return acc.concat(defs2);
      }, Promise.resolve([]));
      await Promise.all(defs.map(async (loc) => require(fullLoc(loc))));
      const PK = getPK();
      const typeList = PK.steps.typeList();
      return Object.entries(typeList).reduce((acc, [type, defAsts]) => {
        const defMap = {};
        defAsts.map((ast) => defMap[ast.match] = ast.method);
        acc[type] = defMap;
        return acc;
      }, {});
    };
  }
});

// src/bin/getWorld.ts
var getWorld;
var init_getWorld = __esm({
  "src/bin/getWorld.ts"() {
    init_helpers2();
    getWorld = async (opts) => {
      const { world } = opts;
      const loc = fullLoc(world);
      const loaded = world ? require(loc) : { world: {} };
      const mod = (loaded == null ? void 0 : loaded.default) || loaded;
      return (mod == null ? void 0 : mod.world) || mod;
    };
  }
});

// src/bin/runTests.ts
var import_node_fs, runTests;
var init_runTests = __esm({
  "src/bin/runTests.ts"() {
    import_node_fs = require("node:fs");
    init_instance();
    runTests = async (features, world, steps, testConfig) => {
      return await features.reduce(async (resolve, feature) => {
        const acc = await resolve;
        const PK = getParkin(world, steps);
        const PTE = getPTE();
        const content = await import_node_fs.promises.readFile(feature, { encoding: `utf8` });
        const featureAst = PK.parse.feature(content);
        await PK.run(featureAst);
        const responses = await PTE.run({
          description: `Parkin > ${feature}`,
          ...testConfig
        });
        return acc.concat(responses);
      }, Promise.resolve([]));
    };
  }
});

// src/bin/getFeatures.ts
var import_jsutils29, filterFeatures2, featureFromArg, getFeatures;
var init_getFeatures = __esm({
  "src/bin/getFeatures.ts"() {
    init_paths();
    import_jsutils29 = __toESM(require_umd());
    init_helpers2();
    filterFeatures2 = async (loc, opts) => {
      return await locsByTypes(loc, {
        ...opts,
        ext: `.feature`
      });
    };
    featureFromArg = (args) => {
      return args.filter((arg, idx) => {
        const noFlag = !arg.startsWith(`-`) && !arg.includes(`=`) && arg !== `.` && arg !== `./`;
        if (!noFlag)
          return noFlag;
        const past = args[idx - 1];
        return !past || (past.startsWith(`-`) && past.length == 2 || past.startsWith(`--`)) ? false : true;
      });
    };
    getFeatures = async (opts, args) => {
      let optsFiles = (0, import_jsutils29.ensureArr)(opts.features || []);
      const featureArgs = featureFromArg(args);
      const options2 = featureArgs.length ? { ...opts, include: (0, import_jsutils29.flatArr)([...opts.include, ...featureArgs]) } : opts;
      const filesArr = optsFiles.length || !args.length ? optsFiles : args.filter((arg) => !arg.startsWith(`-`) && !arg.includes(`=`));
      if (!filesArr.length) {
        const root = __RootDir || cwd;
        return await filterFeatures2(root, options2);
      }
      const features = await filesArr.reduce(async (resolve, loc) => {
        const acc = await resolve;
        const full = fullLoc(loc);
        const features2 = await filterFeatures2(full, options2);
        return acc.concat(features2);
      }, Promise.resolve([]));
      return features;
    };
  }
});

// src/bin/parkin.ts
var parkin_exports = {};
var import_args_parse;
var init_parkin2 = __esm({
  "src/bin/parkin.ts"() {
    init_globals();
    init_paths();
    init_instance();
    init_options();
    init_getDefs();
    init_getWorld();
    init_runTests();
    init_getFeatures();
    import_args_parse = require("@keg-hub/args-parse");
    (async () => {
      const args = process.argv.slice(2);
      const parsed = await (0, import_args_parse.argsParse)({ args, task: { options } });
      parsed.rootDir && setRoot(parsed.rootDir);
      const world = await getWorld(parsed);
      initPK(world);
      const features = await getFeatures(parsed, args);
      const defs = await getDefs(parsed);
      const results = await runTests(
        features,
        world,
        defs,
        { timeout: parsed.timeout }
      );
      console.dir(results, { depth: null, colors: true });
    })();
  }
});

// src/bin/parkin.js
var { register } = require("esbuild-register/dist/node");
register({
  target: `esnext`,
  platform: `node`
});
init_parkin2();
//# sourceMappingURL=parkin.js.map
