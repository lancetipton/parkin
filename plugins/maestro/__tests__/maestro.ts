jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

import { maestroFeature, maestroFlow } from '../__mocks__/maestroFeature'

const { Maestro } = require('../maestro')

describe(`formatters`, () => {

  const world = { $alias: {} }

  it(`should convert a feature file into a maestro flow`, () => {
    const maestro = new Maestro({ world })
    const converted = maestro.convert(maestroFeature)[0]
    expect(converted).toEqual(maestroFlow)
  })

})