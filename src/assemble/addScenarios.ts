import type { TScenarioParentAst, TScenarioAst, TAssembleFeatureOpts } from '../types'

import { addTags } from './addTags'
import { addSteps } from './addSteps'
import { EFeatureTypes } from '../types'
import { addContent } from './addContent'


/**
 * Converts a parents scenarios into strings and adds them to the assembled array
 * @function
 * @private
 *
 */
export const addScenarios = (
  assembled:string[],
  parent:TScenarioParentAst,
  opts:TAssembleFeatureOpts
) => {
  const { indexes=true } = opts

  parent.scenarios &&
    parent.scenarios.map((scenario:TScenarioAst) => {
      const whitespace = scenario.whitespace || `  `
      const type = scenario.alias || EFeatureTypes.Scenario

      addTags(assembled, scenario.tags, whitespace)
      addContent(assembled, `${whitespace}${type}: ${scenario.scenario}`, indexes && scenario.index)
      addSteps(assembled, scenario, opts)
    })
}
