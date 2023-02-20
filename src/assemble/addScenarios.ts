import type { TScenarioParentAst, TScenarioAst } from '../types'

import { addTags } from './addTags'
import { addSteps } from './addSteps'
import { addContent } from './addContent'


/**
 * Converts a parents scenarios into strings and adds them to the assembled array
 * @function
 * @private
 *
 */
export const addScenarios = (
  assembled:string[],
  parent:TScenarioParentAst
) => {
  parent.scenarios &&
    parent.scenarios.map((scenario:TScenarioAst) => {
      addTags(assembled, scenario.tags, `  `)
      addContent(assembled, `  Scenario: ${scenario.scenario}`, scenario.index)
      addSteps(assembled, scenario)
    })
}
