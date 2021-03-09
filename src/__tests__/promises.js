import { promiseFeature, registerMockSteps } from '../__mocks__'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { Parkin } = require('../parkin')

const worldObj = { testMethod: jest.fn() }
const PK = new Parkin(worldObj)

registerMockSteps(PK, true)

describe('Steps with promises', () => {
  ;(async () => {
    await PK.run(promiseFeature)
  })()
})
