jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

import type {
  TWorldConfig,
  TRegisterStepsList
} from '../../types'


const fsMock = {readFile: jest.fn()}
jest.setMock('fs', { promises: fsMock })

const instanceMock = { getParkin: jest.fn(), getPTE: jest.fn()}
jest.setMock('../instance', instanceMock)

const { runTests } = require('../runTests')

describe('runTests', () => {
  const world = { $alias: {} } as TWorldConfig
  const steps = {} as TRegisterStepsList

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return an array of responses', async () => {

    const features = ['feature1', 'feature2']
    const testConfig = {}

    const featureContent = 'Feature: My feature\nScenario: My scenario\nGiven something\nWhen I do something\nThen I expect something\n'
    const response = {}

    fsMock.readFile.mockResolvedValue(featureContent)
    instanceMock.getParkin.mockReturnValue({ parse: { feature: jest.fn() }, run: jest.fn() })
    instanceMock.getPTE.mockReturnValue({ run: jest.fn().mockResolvedValue(response) })

    const result = await runTests(features, world, steps, testConfig)

    expect(result).toEqual([response, response])
    expect(instanceMock.getParkin).toHaveBeenCalledTimes(2)
    expect(instanceMock.getPTE).toHaveBeenCalledTimes(2)
    expect(fsMock.readFile).toHaveBeenCalledTimes(2)
    expect(fsMock.readFile).toHaveBeenNthCalledWith(1, 'feature1', { encoding: 'utf8' })
    expect(fsMock.readFile).toHaveBeenNthCalledWith(2, 'feature2', { encoding: 'utf8' })
  })

  it('should return an empty array if no features are provided', async () => {

    const features = []
    const testConfig = {}
    const result = await runTests(features, world, steps, testConfig)

    expect(result).toEqual([])
  })
})
