import { backgroundFeature } from '../__mocks__'
import { registerBackgroundSteps } from '../__mocks__/steps/backgroundSteps'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { Parkin } = require('../parkin')

const worldObj = {}
const PK = new Parkin(worldObj)

registerBackgroundSteps(PK)

;(async () => {
  await PK.run(backgroundFeature)
})()

