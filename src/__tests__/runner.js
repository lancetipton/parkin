import {
  definition,
  feature,
  parsedFeature,
  parsedDefinition,
  registerMockSteps,
} from '../__mocks__'
import { constants } from '../constants'

const { REGEX_VARIANT, EXPRESSION_VARIANT } = constants

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const worldObj = {}
const { Parkin } = require('../parkin')

describe('Runner', () => {

  it('should handel features as a string', async () => {
    const PK = new Parkin(worldObj)
    registerMockSteps(PK)

    const ogTest = global.test
    global.test = () => {}
    const resp = await PK.run(feature)
    global.test = ogTest
  })

})
