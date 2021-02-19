import { feature, registerMockSteps, mockHooks } from '../__mocks__'
import { constants } from '../constants'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const worldObj = {}
const { Parkin } = require('../parkin')

describe('Runner', () => {

  let ogTest;
  let resetHooks;
  beforeEach(() => {
    ogTest = global.test
    global.test = () => {}
    resetHooks = mockHooks()
  })
  afterEach(() => {
    global.test = ogTest
    resetHooks()
  })

  it('should handle features as a string', async () => {
    const PK = new Parkin(worldObj)
    registerMockSteps(PK)

    const resp = await PK.run(feature)
    expect(resp).toBe(true)
  })

  it ('should call hooks', async () => {
    const PK = new Parkin(worldObj)
    registerMockSteps(PK)

    const testBefore = jest.fn()
    const testAfter = jest.fn()
    PK.hooks.beforeAll(testBefore)
    PK.hooks.afterAll(testAfter)

    const resp = await PK.run(feature)
    expect(resp).toBe(true)    

    expect(testBefore).toHaveBeenCalled()
    expect(testAfter).toHaveBeenCalled()
  })
})
