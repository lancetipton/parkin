import { EAstObject, EStepType, EHookType } from './types'
import { deepFreeze } from '@keg-hub/jsutils/deepFreeze'

const ignoreTypes = [
  `*`,
  ``,
]

export const constants = deepFreeze({
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
  STEP_TYPES: Object.keys(EStepType).filter(type => !ignoreTypes.includes(type)),
  FEATURE_META: [ `feature`, `perspective`, `desire`, `reason`, `comments` ],
})

export const ParentTypes = [
  EAstObject.rule,
  EAstObject.scenario,
  EAstObject.background,
]

export const StepTypes = [
  EAstObject.given,
  EAstObject.when,
  EAstObject.then,
  EAstObject.and,
  EAstObject.but,
  EAstObject[`*`],
  EAstObject.step,
  EAstObject.steps,
]

export const ParkinBailErrName = `ParkinBailError`
export const ParkinAbortErrName = `ParkinAbortError`