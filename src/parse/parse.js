import { feature } from './feature'
import { noPropArr } from '@keg-hub/jsutils'

/**
 * NoOp place holder for the parse.definition method
 * @function
 * @public
 *
 * @returns {Array} Empty noOp array
 */
const definitionNoOp = () => {
  console.error(
    `Parking.parse.definition method not set!\n`,
    `A definition parse method must be passed as the third argument on Parkin init.`
  )
  return noPropArr
}

export const parse = {
  feature,
  definition: definitionNoOp,
}
