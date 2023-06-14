jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

import type { TFeatureAst } from '../../types'

const { addToIndexes } = require('../addToIndexes')

describe('addToIndexes', () => {
  const feature = { feature: 'test', index: 0 } as TFeatureAst
  const offset = [0]
  const indexes = []
  const item = { ast: { index: 0, type: 'step' }, parent: {} }
  const item2 = { ast: { index: 1, type: 'step' }, parent: {} }
  const item3 = { ast: { type: 'step', index: 0 }, parent: {} }
  const item4 = { ast: { index: 0, type: 'step' }, parent: {} }
  const item5 = { ast: { index: 0, type: 'step' }, parent: {} }

  it('should add an item to the indexes array', () => {
    expect(addToIndexes(feature, indexes, item, offset)).toEqual([item])
  })

  it('should add an item to the indexes array at the correct index', () => {
    expect(addToIndexes(feature, indexes, item2, offset)).toEqual([item, item2])
  })

  it('should add an item to the indexes array at the correct index with an offset', () => {
    expect(addToIndexes(feature, [item], item3, [0])).toEqual([item3, item])
  })

  it('should add an item to the indexes array at the correct index with a larger offset', () => {
    expect(addToIndexes(feature, [item3,item], item4, [1])).toEqual([item3, item4, item])
  })

  it('should add an item to the indexes array at the correct index with a smaller offset', () => {
    expect(addToIndexes(feature, [item3, item4, item], item5, [0])).toEqual([item5, item3, item4, item])
  })

})

