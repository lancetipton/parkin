import type { TFeatureAst, TRuleAst } from '../types'

import { EAstObject } from '../types'
import { idFromIdx } from './idFromIdx'
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
export const ruleFactory = (
  rule:string|false,
  feature?:TFeatureAst,
  index?:number
) => {
  const type = EAstObject.rule
  const loc = feature?.rules?.length || 0
  
  return {
    type,
    rule,
    index,
    scenarios: [],
    ...(rule && feature && { uuid: idFromIdx({ index: loc, type, parent: feature })}),
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

  // The initial rule is created with out the rule text
  // So check here if it should be added, or create a new rule
  !rule.rule ? (rule.rule = ruleText) : (rule = ruleFactory(ruleText, feature, index))

  // Ensure the line index is added
  !rule.index && (rule.index = index)

  !rule.uuid
    && (rule.uuid = idFromIdx({
        parent: feature,
        type: rule.type,
        index: feature?.rules?.length || 0,
      }))

  // Get the start whitespace, used when assembling the feature
  rule.whitespace = getStartWhiteSpace(line)

  // Add the rule if needed to the current feature
  !feature.rules.includes(rule)
    && feature.rules.push(rule)

  return rule
}
