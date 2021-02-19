import { promiseFeature, registerMockSteps } from '../__mocks__'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { Parkin } = require('../parkin')

const worldObj = { testMethod: jest.fn() }
const PK = new Parkin(worldObj)

registerMockSteps(PK, true)

describe('End-2-End', () => {
  ;(async () => await PK.run(promiseFeature))()
})
