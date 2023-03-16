import type { TFeatureAst, TRuleAst, TAssembleFeatureOpts } from '../types'

import { addTags } from './addTags'
import { addEmpty } from './addEmpty'
import { EFeatureTypes } from '../types'
import { addContent } from './addContent'
import { mergeBreaks } from './mergeBreaks'
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
  feature:TFeatureAst,
  opts:TAssembleFeatureOpts
) => {
  const { indexes=true, breaks } = opts
  feature.rules &&
    feature.rules.map((rule:TRuleAst) => {

      breaks?.rule && addEmpty(assembled, opts)
      
      const whitespace = rule.whitespace || `  `

      addTags(assembled, rule, opts, whitespace)
      addContent(assembled, `${whitespace}${EFeatureTypes.Rule}: ${rule.rule}`, indexes && rule.index)
      addBackground(
        assembled,
        rule,
        mergeBreaks(opts, { background: breaks?.ruleBackground ?? breaks?.background })
      )
      addScenarios(
        assembled,
        rule,
        mergeBreaks(opts, { background: breaks?.ruleScenario ?? breaks?.scenario })
      )
    })
}
