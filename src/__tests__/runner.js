import {
  feature,
  featureWithScenarioTags,
  registerMockSteps,
  parsedFeature,
  mockHooks,
} from '../__mocks__'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const worldObj = {}
const { Parkin } = require('../parkin')
const { Runner } = require('../runner')
let PK
let ogTest
let resetHooks

describe('Runner', () => {
  beforeAll(() => {
    PK = new Parkin(worldObj)
    PK.run.PARKIN_TEST_MODE = true

    registerMockSteps(PK)
  })

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
    const resp = await PK.run(feature)
    expect(resp).toBe(true)
  })

  it('should handle features as an array of strings', async () => {
    const resp = await PK.run([feature, feature])
    expect(resp).toBe(true)
  })

  it('should handle features as a parsed feature object', async () => {
    const resp = await PK.run(parsedFeature)
    expect(resp).toBe(true)
  })

  it('should handle features as an array of parsed feature objects', async () => {
    const resp = await PK.run([parsedFeature, parsedFeature])
    expect(resp).toBe(true)
  })

  it('should handle a mixed array of parsed feature objects and feature strings', async () => {
    const resp = await PK.run([feature, parsedFeature])
    expect(resp).toBe(true)
  })

  it('should filter on tags', () => {
    let features = PK.runner.getFeatures(feature, { tags: ['@random-tag'] })
    expect(features).toHaveLength(0)

    features = PK.runner.getFeatures(feature, { tags: ['@search'] })
    expect(features).toHaveLength(1)

    features = PK.runner.getFeatures(feature, { tags: '@google' })
    expect(features).toHaveLength(1)

    features = PK.runner.getFeatures(feature, { tags: '@google and @search' })
    expect(features).toHaveLength(1)

    features = PK.runner.getFeatures(feature, { tags: '@google,@search' })
    expect(features).toHaveLength(1)

    features = PK.runner.getFeatures(featureWithScenarioTags, {
      tags: '@scenario',
    })
    expect(features).toHaveLength(1)
    expect(features[0].scenarios).toHaveLength(1)
  })

  it('should filter on name', () => {
    let features = PK.runner.getFeatures(feature, { name: 'boo' })
    expect(features).toHaveLength(0)

    features = PK.runner.getFeatures(feature, { name: 'Google Search' })
    expect(features).toHaveLength(1)

    features = PK.runner.getFeatures(feature, { name: 'Google' })
    expect(features).toHaveLength(1)

    // test filtering on scenario name
    features = PK.runner.getFeatures(feature, { name: 'Search the web' })
    expect(features).toHaveLength(1)
    expect(features[0].scenarios).toHaveLength(1)
  })

  it('should return false if filters result in no tests', async () => {
    const testsRan = await PK.run(feature, { tags: '@non-existent-tag' })
    expect(testsRan).toEqual(false)
  })

  it('should throw when no steps class is passed to the runner class', async () => {
    expect(() => {
      new Runner()
    }).toThrow()
  })

  it('should throw when no hooks class is passed to the runner class', async () => {
    expect(() => {
      new Runner({})
    }).toThrow()
  })

  it('should now throw when steps and hooks classes are passed to the runner class', async () => {
    expect(() => {
      new Runner({}, {})
    }).not.toThrow()
  })
})
