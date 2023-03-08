import type { TStepParentAst, TAssembleFeatureOpts } from '../types'

import { addContent } from './addContent'
import { isArr, capitalize } from '@keg-hub/jsutils'

/**
 * Converts a parents steps into strings and adds them to the assembled array
 * @function
 *
 */
export const addSteps = (
  assembled:string[],
  parent:TStepParentAst,
  opts:TAssembleFeatureOpts
) => {
  const { indexes=true } = opts
  
  isArr(parent.steps)
    && parent.steps.length
    && parent.steps.map(step => {
        addContent(
          assembled,
          `${step.whitespace || `    `}${capitalize(step.type)} ${step.step}`,
          indexes && step.index
        )
      })
}
