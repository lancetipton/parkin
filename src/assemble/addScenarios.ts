import { addTags } from './addTags'
import { addSteps } from './addSteps'
import { addContent } from './addContent'


/**
 * Converts a features scenarios into strings and adds them to the assembled array
 * @function
 * @private
 *
 */
export const addScenarios = (
  assembled:string[],
  feature:Record<any, any>
) => {
  feature.scenarios &&
    feature.scenarios.map(scenario => {
      addTags(assembled, scenario.tags, `  `)
      addContent(assembled, `  Scenario: ${scenario.scenario}`, scenario.index)
      addSteps(assembled, scenario)
    })
}
