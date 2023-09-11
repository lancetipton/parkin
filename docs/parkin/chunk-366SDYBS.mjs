import {
  __require,
  checkCall,
  noOp,
  noOpObj
} from "./chunk-GN2YQI35.mjs";

// src/utils/globalScope.ts
var hasWindow = Boolean(typeof window !== "undefined");
var hasGlobal = Boolean(typeof global !== "undefined");
var hasModule = Boolean(typeof module === "object");
var hasRequire = Boolean(typeof __require === "function");
var hasJasmine = Boolean(
  hasGlobal && typeof global.jasmine !== "undefined"
);
var resolveJasmine = () => hasJasmine ? checkCall(() => global.jasmine) : { getEnv: () => noOpObj, testPath: `` };
var resolveModule = () => hasModule ? checkCall(() => module) : { exports: {} };
var resolveRequire = () => hasRequire ? checkCall(() => __require) : noOp;
var resolveGlobalObj = () => {
  try {
    return hasWindow ? checkCall(() => window) : hasGlobal ? checkCall(() => global) : noOpObj;
  } catch (err) {
    return noOpObj;
  }
};

export {
  hasWindow,
  hasJasmine,
  resolveJasmine,
  resolveModule,
  resolveRequire,
  resolveGlobalObj
};
//# sourceMappingURL=chunk-366SDYBS.mjs.map