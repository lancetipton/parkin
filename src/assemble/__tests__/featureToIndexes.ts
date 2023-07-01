import type { TBlockAst } from '../../types'

import { mockFeatToIdx } from '../../__mocks__'
const { featureToIndexes } = require('../featureToIndexes')

describe(`featureToIndexes`, () => {

  const indexes = featureToIndexes(mockFeatToIdx)

  it(`should index feature global properties`, () => {
    expect(indexes[mockFeatToIdx.index]).toBeDefined()
    expect(indexes[mockFeatToIdx.index]).toEqual({
      parent: mockFeatToIdx,
      ast: mockFeatToIdx,
    })
    
    expect(indexes[mockFeatToIdx.tags.index]).toBeDefined()
    expect(indexes[mockFeatToIdx.tags.index]).toEqual({
      parent: mockFeatToIdx,
      ast: mockFeatToIdx.tags,
    })
    
    expect(indexes[mockFeatToIdx.empty[0].index]).toBeDefined()
    expect(indexes[mockFeatToIdx.empty[0].index]).toEqual({
      parent: mockFeatToIdx,
      ast: mockFeatToIdx.empty[0],
    })
    
    expect(indexes[mockFeatToIdx.comments[0].index]).toBeDefined()
    expect(indexes[mockFeatToIdx.comments[0].index]).toEqual({
      parent: mockFeatToIdx,
      ast: mockFeatToIdx.comments[0],
    })
  })

  it(`should index feature story properties`, () => {
    expect(indexes[mockFeatToIdx.desire.index]).toBeDefined()
    expect(indexes[mockFeatToIdx.desire.index]).toEqual({
      parent: mockFeatToIdx,
      ast: mockFeatToIdx.desire,
    })
    
    expect(indexes[mockFeatToIdx.perspective.index]).toBeDefined()
    expect(indexes[mockFeatToIdx.perspective.index]).toEqual({
      parent: mockFeatToIdx,
      ast: mockFeatToIdx.perspective,
    })

    expect(indexes[(mockFeatToIdx.reason as TBlockAst).index]).toBeDefined()
    expect(indexes[(mockFeatToIdx.reason as TBlockAst).index]).toEqual({
      parent: mockFeatToIdx,
      ast: mockFeatToIdx.reason,
    })
  })

  it(`should index feature.background and its steps`, () => {
    expect(indexes[mockFeatToIdx.background.index]).toBeDefined()
    expect(indexes[mockFeatToIdx.background.index]).toEqual({
      parent: mockFeatToIdx,
      ast: mockFeatToIdx.background,
    })

    expect(indexes[mockFeatToIdx.background.steps[0].index]).toBeDefined()
    expect(indexes[mockFeatToIdx.background.steps[0].index]).toEqual({
      parent: mockFeatToIdx.background,
      ast: mockFeatToIdx.background.steps[0],
    })
  })

  it(`should feature.rules and their properties`, () => {
    expect(indexes[mockFeatToIdx.rules[0].index]).toBeDefined()
    expect(indexes[mockFeatToIdx.rules[0].index]).toEqual({
      parent: mockFeatToIdx,
      ast: mockFeatToIdx.rules[0],
    })

    expect(indexes[mockFeatToIdx.rules[0].tags.index]).toBeDefined()
    expect(indexes[mockFeatToIdx.rules[0].tags.index]).toEqual({
      parent: mockFeatToIdx.rules[0],
      ast: mockFeatToIdx.rules[0].tags,
    })
    
    expect(indexes[mockFeatToIdx.rules[0].background.index]).toBeDefined()
    expect(indexes[mockFeatToIdx.rules[0].background.index]).toEqual({
      parent: mockFeatToIdx.rules[0],
      ast: mockFeatToIdx.rules[0].background,
    })
    
    expect(indexes[mockFeatToIdx.rules[0].background.steps[0].index]).toBeDefined()
    expect(indexes[mockFeatToIdx.rules[0].background.steps[0].index]).toEqual({
      parent: mockFeatToIdx.rules[0].background,
      ast: mockFeatToIdx.rules[0].background.steps[0],
    })
  })

  it(`should feature.rule[].scenarios`, () => {
    expect(indexes[mockFeatToIdx.rules[0].scenarios[0].index]).toBeDefined()
    expect(indexes[mockFeatToIdx.rules[0].scenarios[0].index]).toEqual({
      parent: mockFeatToIdx.rules[0],
      ast: mockFeatToIdx.rules[0].scenarios[0],
    })
    
    expect(indexes[mockFeatToIdx.rules[0].scenarios[0].tags.index]).toBeDefined()
    expect(indexes[mockFeatToIdx.rules[0].scenarios[0].tags.index]).toEqual({
      parent: mockFeatToIdx.rules[0].scenarios[0],
      ast: mockFeatToIdx.rules[0].scenarios[0].tags,
    })
    
    expect(indexes[mockFeatToIdx.rules[0].scenarios[0].steps[0].index]).toBeDefined()
    expect(indexes[mockFeatToIdx.rules[0].scenarios[0].steps[0].index]).toEqual({
      parent: mockFeatToIdx.rules[0].scenarios[0],
      ast: mockFeatToIdx.rules[0].scenarios[0].steps[0],
    })
  })

  it(`should feature.scenarios and their properties`, () => {
    expect(indexes[mockFeatToIdx.scenarios[0].index]).toBeDefined()
    expect(indexes[mockFeatToIdx.scenarios[0].index]).toEqual({
      parent: mockFeatToIdx,
      ast: mockFeatToIdx.scenarios[0],
    })
    
    expect(indexes[mockFeatToIdx.scenarios[0].tags.index]).toBeDefined()
    expect(indexes[mockFeatToIdx.scenarios[0].tags.index]).toEqual({
      parent: mockFeatToIdx.scenarios[0],
      ast: mockFeatToIdx.scenarios[0].tags,
    })

    expect(indexes[mockFeatToIdx.scenarios[0].steps[0].tags.index]).toBeDefined()
    expect(indexes[mockFeatToIdx.scenarios[0].steps[0].tags.index]).toEqual({
      parent: mockFeatToIdx.scenarios[0].steps[0],
      ast: mockFeatToIdx.scenarios[0].steps[0].tags,
    })

    expect(indexes[mockFeatToIdx.scenarios[0].steps[0].index]).toEqual({
      parent: mockFeatToIdx.scenarios[0],
      ast: mockFeatToIdx.scenarios[0].steps[0],
    })
  })

})