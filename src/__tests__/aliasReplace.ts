import {
  aliasFeature,
  aliasWorldReplaceObj,
  registerMockSteps,
} from '../__mocks__'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { Parkin } = require('../parkin')
const PK = new Parkin(aliasWorldReplaceObj)

registerMockSteps(PK)
;(async () => {
  await PK.run(aliasFeature)
})()
