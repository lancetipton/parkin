import { addContent } from './addContent'
import { isArr, capitalize } from '@keg-hub/jsutils'


/**
 * Converts a scenarios steps into strings and adds them to the assembled array
 * @function
 *
 */
export const addSteps = (
  assembled:string[],
  scenario:Record<any, any>
) => {
  isArr(scenario.steps) &&
    scenario.steps.length &&
    scenario.steps.map(step =>
      addContent(
        assembled,
        `    ${capitalize(step.type)} ${step.step}`,
        step.index
      )
    )
}
