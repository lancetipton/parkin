import {
  feature,
  parsedFeature,
  docAndDataFeature,
  featureRulesScenarios,
} from '../../__mocks__'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const worldObj = {}
const { Parkin } = require('../../parkin')
const { assembleFeature } = require('../feature')

describe(`Assemble Feature`, () => {
  it(`should rebuild a feature into a string`, () => {
    const content = parsedFeature.content
    const [assembled] = assembleFeature([parsedFeature])
    expect(assembled.trim()).toEqual(content.trim())
  })

  it(`should work with multiple features`, () => {
    const content = parsedFeature.content
    const [ assembled1, assembled2 ] = assembleFeature([
      parsedFeature,
      parsedFeature,
    ])
    expect(assembled1.trim()).toEqual(content.trim())
    expect(assembled2.trim()).toEqual(content.trim())
  })

  it(`should allow passing in a feature model object`, () => {
    const content = parsedFeature.content
    const [assembled] = assembleFeature(parsedFeature)
    expect(assembled.trim()).toEqual(content.trim())
  })

  it(`should create output that is equal to the input`, () => {
    const PK = new Parkin(worldObj)

    const parsed = PK.parse.feature(feature)[0]
    const assembled = assembleFeature(parsed)[0]
    expect(assembled.trim()).toEqual(feature.trim())

    const parsedAdvanced = PK.parse.feature(featureRulesScenarios)[0]
    const assembledAdvanced = assembleFeature(parsedAdvanced)[0]
    expect(assembledAdvanced.trim()).toEqual(featureRulesScenarios.trim())

  })

  it(`should handle steps with tables and doc-strings`, () => {
    const PK = new Parkin(worldObj)
    const parsed = PK.parse.feature(docAndDataFeature, {}, { worldReplace: false })[0]
    const assembled = assembleFeature(parsed)[0]

    expect(docAndDataFeature.trim()).toEqual(assembled.trim())
  })

})
