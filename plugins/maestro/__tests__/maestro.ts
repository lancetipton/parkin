jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

import {
  maestroFlow,
  maestroFeature,
  maestroSimpleFlow,
  maestroSimpleFeature,
} from '../__mocks__/maestroFeature'

const { Maestro } = require('../maestro')

describe(`Maestro Converter`, () => {

  const world = { $alias: {} }

  it(`should convert a simple feature file into a simple maestro flow`, () => {
    const maestro = new Maestro({ world })
    const converted = maestro.convert(maestroSimpleFeature)[0]
    expect(converted).toEqual(maestroSimpleFlow)
  })

  it(`should convert a complex feature file into a complex maestro flow`, () => {
    const maestro = new Maestro({ world })
    const converted = maestro.convert(maestroFeature)[0]
    expect(converted).toEqual(maestroFlow)
  })

})