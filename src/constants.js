import { deepFreeze } from '@keg-hub/jsutils'

export const constants = deepFreeze({
  REGEX_VARIANT: 'regex',
  EXPRESSION_VARIANT: 'expression',
  STEP_TYPES: [ 'given', 'when', 'then', 'and', 'but' ],
  HOOK_TYPES: [ 'beforeAll', 'afterAll', 'beforeEach', 'afterEach' ],
  FEATURE_META: [ 'feature', 'perspective', 'desire', 'reason', 'comments' ],
  WORLD_AT_RUNTIME: `$:`,
})
