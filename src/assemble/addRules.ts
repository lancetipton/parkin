import type { TFeatureAst, TRuleAst } from '../types'

import { addTags } from './addTags'
import { EFeatureTypes } from '../types'
import { addContent } from './addContent'
import { addScenarios } from './addScenarios'
import { addBackground } from './addBackground'

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
      const whitespace = rule.whitespace || `  `

      addTags(assembled, rule.tags, whitespace)
      addContent(assembled, `${whitespace}${EFeatureTypes.Rule}: ${rule.rule}`, rule.index)
      addBackground(assembled, rule)
      addScenarios(assembled, rule)
    })
}
