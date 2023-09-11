import {
  deepFreeze,
  isStr
} from "./chunk-GN2YQI35.mjs";

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

export {
  EPartMatchTypes,
  EHookType,
  EStepType,
  EStepMethodType,
  EAstObject,
  EFeatureTypes,
  EResultAction,
  EResultStatus,
  EResultType,
  ETestType,
  EStepVariant,
  EStepKey,
  EExpParmKind,
  EExpParmType,
  EBlockLoc,
  constants,
  ParentTypes,
  StepTypes,
  ParkinBailErrName,
  ParkinAbortErrName,
  ParkinError,
  RetryError,
  throwAbortError,
  throwBailError,
  throwExitOnFailed,
  testMethodFill,
  throwMissingSteps,
  throwMissingHooks,
  throwMissingFeatureText,
  throwNoMatchingStep,
  throwParamTypeExists,
  throwFeatureNotAnObj,
  throwMissingWorldValue,
  throwInvalidHookType,
  throwWorldReplace,
  throwAliasReplace
};
//# sourceMappingURL=chunk-VPIJEAAD.mjs.map