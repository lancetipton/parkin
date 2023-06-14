import type { Steps } from '../steps'
import type { TStepDef } from '../types'

import { EStepType } from '../types'

/**
 * Join all step types together into a single array
 * @function
 * @private
 *
 */
export const joinAllDefs = (instance:Steps):TStepDef[] => {
  return instance.types.reduce(
    (stepDefs, type:EStepType) => stepDefs.concat(instance[`_${type}`]),
    []
  )
}
