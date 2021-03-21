import { failStepFeature } from '../__mocks__'
import { registerFailSteps } from '../__mocks__/steps/failSteps'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { Parkin } = require('../parkin')
const worldObj = {}
const PK = new Parkin(worldObj)
registerFailSteps(PK)

;(async () => {
  await PK.run(failStepFeature)
})()