import { deepMerge } from '@keg-hub/jsutils'
const { indexFromAst } = require('../indexFromAst')

describe('indexFromAst', () => {

  const buildProps = () => {
    const child = { step: `child`, uuid: `child`, }
    const scenario = { index: 3, scenario: `parent`, uuid: `parent`, steps:[] }
    const empty = { index: 1, uuid: `empty`, content: `` }
    const feature = {
      feature: `feature`,
      index: 0,
      uuid: `feature`,
      comments: [],
      empty: [empty],
      scenarios:[scenario]
    }
    const indexes:any[] = [
      { ast: feature, parent: feature },
      { ast: empty, parent: feature },
      { ast: scenario, parent: feature },
    ]

    return { parent:scenario, child, indexes, feature, key: 'steps', empty }
  }
  beforeEach(() => {

  })

  it('should update child step index with the next available index and reindex the rest of the items', () => {
    const props = buildProps()
    const { indexed } = indexFromAst(props)

    expect(indexed[0].ast.index).toBe(0)
    expect(indexed[1].ast.index).toBe(1)
    expect(indexed[3].ast).toBe(props.child)
    expect(indexed[3].ast.index).toBe(4)
  })

  it('should correctly handle comments before and after child', () => {
    const { feature, indexes, ...props } = buildProps()
    const before = { index: 2, uuid: `comment-1`, content: `# Before comment` }
    const afterIdx = 5
    const after = { index: afterIdx, uuid: `comment-1`, content: `# After comment` }

    feature.comments = [before, after]
    indexes.splice(before.index, 0, { ast: before, parent: feature })
    indexes.splice(after.index, 0, { ast: after, parent: feature})

    const { indexed } = indexFromAst({
      ...props,
      indexes,
      feature,
    })

    expect(indexed[2]?.ast).toBe(before)
    expect(indexed[2]?.ast.index).toBe(before.index)
    expect(indexed[4]?.ast).toBe(props.child)
    expect(indexed[4]?.ast.index).toBe(4)
    expect(indexed[5]?.ast).toBe(after)
    expect(indexed[5]?.ast.index).toBe(afterIdx + 1)

  })

  it('should add item to end of existing children', () => {
    const { indexes, parent, ...props } = buildProps()
    const before1 = { index: 4, step: `before1 child`, uuid: `before1-child` }
    const before2 = { index: 5, step: `before2 child`, uuid: `before2-child` }

    parent.steps.push(before1, before2)
    indexes.splice(before1.index, 0, { ast: before1, parent })
    indexes.splice(before2.index, 0, { ast: before2, parent})

    const { indexed } = indexFromAst({
      ...props,
      parent,
      indexes,
    })

    expect(indexed[5].ast).toBe(props.child)
    expect(indexed[5].ast.index).toBe(6)

  })

  it(`should add item to end of existing children of the correct parent`, () => {
    const { indexes, feature, parent, empty, ...props } = buildProps()
    const before1 = { index: 4, step: `before1 child`, uuid: `before1-child` }
    const before2 = { index: 5, step: `before2 child`, uuid: `before2-child` }

    parent.steps.push(before1, before2)
    indexes.splice(before1.index, 0, { ast: before1, parent })
    indexes.splice(before2.index, 0, { ast: before2, parent})

    const copy = deepMerge(parent, {steps: undefined}, {
      index: 7,
      uuid: `scenario-2`,
      steps: [
        {step: `after1 child`, uuid: `after1-child`, index: 8},
        {step: `after2 child`, uuid: `after2-child`, index: 9},
      ]
    })

    indexes[7] = { ast: copy, parent: feature }
    indexes[8] = { ast: copy.steps[0], parent: copy }
    indexes[9] = { ast: copy.steps[1], parent: copy }

    feature.scenarios.push(copy)

    const { indexed } = indexFromAst({
      ...props,
      feature,
      parent,
      indexes,
    })
    
    expect(indexed[3].ast).toBe(before1)
    expect(indexed[4].ast).toBe(before2)

    expect(indexed[5].ast).toBe(props.child)
    expect(indexed[5].ast.index).toBe(6)
    expect(indexed[6].ast).toBe(copy)

    expect(indexed[7].ast).toBe(copy.steps[0])
    expect(indexed[7].ast.index).toBe(9)
    expect(indexed[8].ast).toBe(copy.steps[1])
    expect(indexed[8].ast.index).toBe(10)

  })


  it(`should add item to end of existing children of a different parent`, () => {
    const { indexes, feature, empty, parent, ...props } = buildProps()
    const before1 = { index: 4, step: `before1 child`, uuid: `before1-child` }
    const before2 = { index: 5, step: `before2 child`, uuid: `before2-child` }
    parent.steps.push(before1, before2)
    indexes.splice(before1.index, 0, { ast: before1, parent })
    indexes.splice(before2.index, 0, { ast: before2, parent})

    const empty2 = { content: ``, index: 6, uuid: `empty-2` }
    feature.empty.push(empty2)
    indexes.splice(empty2.index, 0, { ast: empty2, parent: feature })

    const bg = {
      index: 7,
      uuid: `background-parent`,
      background: `background-parent`,
      steps:[
        {step: `background1 child`, uuid: `background1-child`, index: 8},
        {step: `background2 child`, uuid: `background2-child`, index: 9},
      ]
    }

    // @ts-ignore
    feature.background = bg
    indexes[6] = { ast: bg, parent: feature }
    indexes[7] = { ast: bg.steps[0], parent: bg }
    indexes[8] = { ast: bg.steps[1], parent: bg }

    const { indexed } = indexFromAst({
      ...props,
      feature,
      indexes,
      parent: bg,
      key: `steps`,
    })

    expect(indexed[7].ast).toBe(bg.steps[0])
    expect(indexed[8].ast).toBe(bg.steps[1])
    expect(indexed[9].ast).toBe(props.child)
    expect(indexed[9].ast.index).toBe(10)

  })

})
