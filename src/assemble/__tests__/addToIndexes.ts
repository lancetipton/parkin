jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

import type { TFeatureAst } from '../../types'

const { addToIndexes } = require('../addToIndexes')

describe(`addToIndexes`, () => {
  const feature = { feature: `test`, index: 0 } as TFeatureAst
  const offset = [0]
  const indexes = []
  const parent = {}
  const item = { ast: { index: 0, type: `step`, step: `1` }, parent }
  const item2 = { ast: { index: 1, type: `step`, step: `2` }, parent }
  const item3 = { ast: { index: 0, type: `step`, step: `3` }, parent }
  const item4 = { ast: { index: 0, type: `step`, step: `4` }, parent }
  const item5 = { ast: { index: 0, type: `step`, step: `5` }, parent }
  const item6 = { ast: { index: 1, type: `step`, step: `6` }, parent }
  const item7 = { ast: { index: 2, type: `step`, step: `7` }, parent }
  const item8 = { ast: { index: 3, type: `step`, step: `8` }, parent }
  const item9 = { ast: { index: 4, type: `step`, step: `9` }, parent }
  const item10 = { ast: { index: 4, type: `step`, step: `10` }, parent }
  const item11 = { ast: { index: 2, type: `step`, step: `11` }, parent }
  const item12 = { ast: { index: 3, type: `step`, step: `12` }, parent }

  it(`should add an item to the indexes array`, () => {
    expect(addToIndexes(feature, indexes, item, offset)).toEqual([item])
  })

  it(`should add an item to the indexes array at the correct index`, () => {
    expect(addToIndexes(feature, indexes, item2, offset)).toEqual([item, item2])
  })

  it(`should add an item to the indexes array at the correct index with an offset`, () => {
    expect(addToIndexes(feature, [item], item3, [0])).toEqual([item, item3])
  })

  it(`should add an item to the indexes array at the correct index with a larger offset`, () => {
    expect(addToIndexes(feature, [item3,item], item4, [1])).toEqual([item3, item, item4])
  })

  it(`should add an item to the indexes array at the correct index with a smaller offset`, () => {
    expect(addToIndexes(feature, [item3, item4, item], item5, [0])).toEqual([item3, item5, item4, item])
  })

  it(`should add an item before existing items that have higher indexes then the item`, () => {
    const offset = []
    let indexes = addToIndexes(feature, [item, item2], item8, offset)
    indexes = addToIndexes(feature, indexes, item9, offset)
    indexes = addToIndexes(feature, indexes, item7, offset)
    expect(indexes).toEqual([item, item2, item7, item8, item9])
  })

  it(`should add an item after an existing items skipping an index if needed`, () => {
    const offset = [, 1, 1]
    const update6 = {...item6, ast:{...item6.ast, index: 2}}
    const update7 = {...item7, ast:{...item7.ast, index: 4}}
    
    const indexes = addToIndexes(
      feature,
      [item, item2, update6, update7],
      item8,
      offset
    )

    expect(indexes).toEqual([item, item2, update6, update7, undefined, item8])
  })

})

