import { worldFeature, worldReplaceObj, registerMockSteps } from '../__mocks__'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { Parkin } = require('../parkin')
const PK = new Parkin(worldReplaceObj)

registerMockSteps(PK)
;(async () => {
  await PK.run(worldFeature)
})()
