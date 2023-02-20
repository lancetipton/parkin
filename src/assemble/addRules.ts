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
  feature:Record<any, any>
) => {
  feature.rules &&
    feature.rules.map((rule:Record<any, any>) => {
      addTags(assembled, rule.tags, `  `)
      addContent(assembled, `  Rule: ${rule.rule}`, rule.index)
      addScenarios(assembled, rule)
    })
}
