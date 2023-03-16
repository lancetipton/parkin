import type { TFeatureAst, TRuleAst } from '../types'

import { EAstObject } from '../types'
import { uuid } from '@keg-hub/jsutils'
import { getRXMatch, getStartWhiteSpace } from '../utils/helpers'

/**
 * Regular expressions for matching feature file keywords
 * @type {object}
 */
const RX_RULE = /^\s*Rule:(.*)$/

/*
 * Helper factory function to build a rule object
 * @function
 *
 */
export const ruleFactory = (rule:string|false, index?:number) => {
  return {
    index,
    rule,
    scenarios: [],
    type: EAstObject.rule,
    // The feature name should always be unique, so use that as a re-usable id
    ...(rule && { uuid: uuid() }),
  } as TRuleAst
}


/**
 * Check for new feature scenario, and add scenario to feature object
 * @function
 *
 */
export const ensureRule = (
  feature:TFeatureAst,
  rule:TRuleAst,
  line:string,
  index:number
):TRuleAst => {
  // Check for "Rule:" keyword
  if (!RX_RULE.test(line)) return rule

  // Get text after the "Rule:" key word
  let ruleText = getRXMatch(line, RX_RULE, 1)

  // Check if the scenario text was already added, and add it if needed
  // Otherwise create a new scenario with the scenario text
  !rule.rule ? (rule.rule = ruleText) : (rule = ruleFactory(ruleText, index))

  // Ensure the line index is added
  !rule.index && (rule.index = index)
  // Add the uuid from the rule text if it doesn't exist
  !rule.uuid && (rule.uuid = uuid())

  // Get the start whitespace, used when assembling the feature
  rule.whitespace = getStartWhiteSpace(line)

  // Add the rule if needed to the current feature
  !feature.rules.includes(rule)
    && feature.rules.push(rule)

  return rule
}
