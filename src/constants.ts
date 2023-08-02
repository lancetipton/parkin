import { EAstObject, EStepType, EHookType } from './types'
import { deepFreeze } from '@keg-hub/jsutils'

const ignoreTypes = [
  `*`,
  ``,
]

export const constants = deepFreeze({
  ALIAS_REF: `$$`,
  ALIAS_WORLD_KEY: `$alias`,
  ALIAS_REF_AT_RUNTIME: `$$:`,
  REGEX_VARIANT: 'regex',
  WORLD_REF: `$`,
  WORLD_KEY: `$world`,
  WORLD_AT_RUNTIME: `$:`,
  EXPRESSION_VARIANT: 'expression',
  HOOK_TYPES: Object.keys(EHookType),
  STEP_TYPES: Object.keys(EStepType).filter(type => !ignoreTypes.includes(type)),
  FEATURE_META: [ 'feature', 'perspective', 'desire', 'reason', 'comments' ],
  LOG_JEST_SPEC_ENV: `PARKIN_LOG_JEST_SPEC`,
  SPEC_RESULT_LOG: `------- PARKIN SPEC RESULT LOG -------`,
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
