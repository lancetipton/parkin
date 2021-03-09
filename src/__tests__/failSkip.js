import { failStepFeature } from '../__mocks__'
import { registerFailSteps } from '../__mocks__/steps/failSteps'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { Parkin } = require('../parkin')
const worldObj = { testMethod: jest.fn() }
const PK = new Parkin(worldObj)
registerFailSteps(PK)

const jasmineEnv = global.jasmine.getEnv()
const defDescribe = jasmineEnv.describe

describe('Fail and skip steps within a describe block', () => {
  beforeAll(async () => {
    await PK.run(failStepFeature)
  })

  // (async () => {
  //   await PK.run(failStepFeature)
  // })()

  it('should override the default jasmine describe', async () => {
    const updatedEnv = global.jasmine.getEnv()
    expect(updatedEnv.describe === defDescribe).toBe(false)
  })
})
