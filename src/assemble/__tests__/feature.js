import { parsedFeature, parsedScenarios } from '../../__mocks__'
import { isInt } from '@keg-hub/jsutils'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { assembleFeature } = require('../feature')

const feature = {
  ...parsedFeature,
  scenarios: [ ...parsedScenarios ]
}

describe('Assemble Feature', () => {

  it('should rebuild a feature into a string', () => {
    assembleFeature([feature, feature])
  })

})
