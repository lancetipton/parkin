import { feature, registerMockSteps, parsedFeature } from '../__mocks__'
import { constants } from '../constants'

const { REGEX_VARIANT, EXPRESSION_VARIANT } = constants

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const worldObj = {}
const { Parkin } = require('../parkin')
let PK

describe('Runner', () => {
  beforeAll(() => {
    PK = new Parkin(worldObj)
    PK.run.PARKIN_TEST_MODE = true

    registerMockSteps(PK)
  })

  it('should handel features as a string', async () => {
    const resp = await PK.run(feature)
    expect(resp).toBe(true)
  })

  it('should handel features as an array of strings', async () => {
    const resp = await PK.run([ feature, feature ])
    expect(resp).toBe(true)
  })

  it('should handel features as a parsed feature object', async () => {
    const resp = await PK.run(parsedFeature)
    expect(resp).toBe(true)
  })

  it('should handel features as an array of parsed feature objects', async () => {
    const resp = await PK.run([ parsedFeature, parsedFeature ])
    expect(resp).toBe(true)
  })

  it('should handel a mixed array of parsed feature objects and feature strings', async () => {
    const resp = await PK.run([ feature, parsedFeature ])
    expect(resp).toBe(true)
  })
})
