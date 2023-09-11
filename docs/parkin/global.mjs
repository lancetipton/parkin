import {
  PKInstance,
  Parkin
} from "./chunk-AH4VKI4X.mjs";
import {
  resolveGlobalObj
} from "./chunk-366SDYBS.mjs";
import "./chunk-VPIJEAAD.mjs";
import "./chunk-GN2YQI35.mjs";

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
export {
  setParkinGlobals
};
//# sourceMappingURL=global.mjs.map