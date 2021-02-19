import { parsedFeature, feature } from '../../__mocks__'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const worldObj = {}
const { Parkin } = require('../../parkin')
const { assembleFeature } = require('../feature')

describe('Assemble Feature', () => {
  it('should rebuild a feature into a string', () => {
    const content = parsedFeature.content
    const [assembled] = assembleFeature([parsedFeature])
    expect(assembled).toEqual(content)
  })

  it('should work with multiple features', () => {
    const content = parsedFeature.content
    const [ assembled1, assembled2 ] = assembleFeature([
      parsedFeature,
      parsedFeature,
    ])
    expect(assembled1).toEqual(content)
    expect(assembled2).toEqual(content)
  })

  it('should allow passing in a feature model object', () => {
    const content = parsedFeature.content
    const [assembled] = assembleFeature(parsedFeature)
    expect(assembled).toEqual(content)
  })

  it('should create output that is equal to the input', () => {
    const PK = new Parkin(worldObj)
    const parsed = PK.parse.feature(feature)[0]
    const assembled = assembleFeature(parsed)[0]

    expect(assembled).toEqual(feature)
  })
})
