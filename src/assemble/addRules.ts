import type { TFeatureAst, TRuleAst } from '../types'

import { addTags } from './addTags'
import { addContent } from './addContent'
import { addScenarios } from './addScenarios'

/**
 * Converts a features rules into strings and adds them to the assembled array
 * @function
 * @private
 *
 */
export const addRules = (
  assembled:string[],
  feature:TFeatureAst
) => {
  feature.rules &&
    feature.rules.map((rule:TRuleAst) => {
      addTags(assembled, rule.tags, `  `)
      addContent(assembled, `  Rule: ${rule.rule}`, rule.index)
      addScenarios(assembled, rule)
    })
}
