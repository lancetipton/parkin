jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()


import { mockFeatToIdx as feature } from '../../__mocks__'
import { EAstObject } from '../../types'



const { findIndex } = require('../findIndex')

describe('findIndex', () => {

  it('should the correct index for a comment', () => {
    expect(
      findIndex({
        feature,
        loc: `after`,
        parent: feature,
        type:EAstObject.comments,
      })
    ).toBe(3)
  })

  it('should the correct index for a tags of a feature', () => {
    expect(
      findIndex({
        feature,
        loc: `before`,
        parent: feature,
        type:EAstObject.tags,
      })
    ).toBe(0)
  })

  it('should the correct index for a tags of a feature rule', () => {
    expect(
      findIndex({
        feature,
        loc: `before`,
        type:EAstObject.tags,
        parent: feature.rules[0],
      })
    ).toBe(9)
  })


  it('should the correct index for an empty line of a feature', () => {
    expect(
      findIndex({
        feature,
        loc: `after`,
        type:EAstObject.empty,
        parent: feature.rules[0],
      })
    ).toBe(11)
    expect(
      findIndex({
        feature,
        loc: `before`,
        type:EAstObject.empty,
        parent: feature.rules[0],
      })
    ).toBe(8)
  })

  it('should the correct index for a rule of a feature', () => {
    expect(
      findIndex({
        feature,
        type:EAstObject.rules,
        parent: feature,
      })
    ).toBe(14)
  })

  it('should the correct index for a scenario of a feature', () => {
    expect(
      findIndex({
        feature,
        type:EAstObject.scenario,
        parent: feature,
      })
    ).toBe(19)
  })


  it('should the correct index for a scenario of a rule', () => {
    expect(
      findIndex({
        feature,
        type:EAstObject.scenario,
        parent: feature.rules[0],
      })
    ).toBe(14)
  })


  it('should the correct index for a background of a feature', () => {
    expect(
      findIndex({
        feature,
        type:EAstObject.background,
        parent: feature,
      })
    ).toBe(9)
  })


  it('should the correct index for a background of a rule', () => {
    expect(
      findIndex({
        feature,
        type:EAstObject.background,
        parent: feature.rules[0],
      })
    ).toBe(16)
  })

  it('should return undefined for invalid type', () => {
    expect(
      findIndex({
        feature,
        parent: feature,
        type: `invalid-type`,
      })
    ).toBe(undefined)
  })

})

