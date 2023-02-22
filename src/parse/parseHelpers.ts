import type { TFeatureAst, TRuleAst, TBackgroundAst, TScenarioAst, TParseParentAst } from '../types'

/**
 * Regular expressions for matching feature file keywords
 * @type {object}
 */

const RX_FEATURE = /^\s*Feature:(.*)$/
const RX_RULE = /^\s*Rule:(.*)$/
const RX_SCENARIO = /^\s*Scenario:(.*)$/
const RX_EXAMPLE = /^\s*Example:(.*)$/
const RX_BACKGROUND = /^\s*Background:(.*)$/

/**
 * Determine the active parent base on the line to be evaluated
 * If a new parent is not found, then returns the current activeParent
 * @function
 *
 */
export const setActiveParent = (
  activeParent:TParseParentAst,
  feature:TFeatureAst,
  rule:TRuleAst,
  scenario:TScenarioAst,
  background:TBackgroundAst,
  line:string
) => {
  return RX_SCENARIO.test(line) || RX_EXAMPLE.test(line)
    ? scenario
    : RX_FEATURE.test(line)
      ? feature
      : RX_RULE.test(line)
        ? rule
        : RX_BACKGROUND.test(line)
          ? background
          : activeParent
}
