jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

import type {
  TFeatureAst,
  TStepParentAst,
  TScenarioParentAst,
  TBackgroundParentAst
} from '../../types'
import { EAstObject } from '../../types'


const {
  formatSteps,
  formatStory,
  addEmptyLine,
  formatRules,
  formatFeature,
  formatOptions,
  formatScenarios,
  formatBackground,
  ensureBackgroundFirst,
} = require('../formatters')

const featId = `feature-1234`

describe(`formatters`, () => {

  const getEmpty = (idx:number, uuid:string) => ({
    uuid,
    index:idx,
    content: ``,
    whitespace: ``,
    type: EAstObject.empty,
  })

  describe(`ensureBackgroundFirst`, () => {
    test(`returns parent if backgroundAfterParent is false`, () => {
      const parent = { scenarios: [], background: {} } as TBackgroundParentAst
      const opts = { backgroundAfterParent: false }
      expect(ensureBackgroundFirst(parent, opts)).toEqual(parent)
    })

    test(`returns parent if no background or scenarios`, () => {
      const parent = { scenarios: [], background: null } as TBackgroundParentAst
      const opts = { backgroundAfterParent: true }
      expect(ensureBackgroundFirst(parent, opts)).toEqual(parent)
    })

    test(`updates background index if necessary`, () => {
      const parent = {
        scenarios: [{ index: 1 }, { index: 3 }],
        background: { index: 4 },
      } as TBackgroundParentAst
      const opts = { backgroundAfterParent: true }
      expect(ensureBackgroundFirst(parent, opts)).toEqual({
        scenarios: [{ index: 1 }, { index: 3 }],
        background: { index: 0 },
      })
    })
  })

  describe(`addEmptyLine`, () => {
    test('adds empty line to feature', () => {
      const feature = { uuid: featId,  empty: [] } as TFeatureAst
      const idx = 1
      const opts = {}
      const updated = addEmptyLine(feature, idx, opts)
      expect(updated).toEqual({
        uuid: featId,
        empty: [getEmpty(idx + 1, `${featId}.empty.0`)]
      })
    })
  })

  describe(`formatStory`, () => {
    test(`adds empty line after reason`, () => {
      const feature = { uuid: featId, reason: { index: 1 } } as TFeatureAst
      const opts = {}
      expect(formatStory(feature, opts)).toEqual({
        uuid: featId,
        reason: { index: 1 },
        empty: [getEmpty(2, `${featId}.empty.0`)]
      })
    })

    test(`adds empty line after desire if no reason`, () => {
      const feature = { uuid: featId, desire: { index: 1 } } as TFeatureAst
      const opts = {}
      expect(formatStory(feature, opts)).toEqual({
        uuid: featId,
        desire: { index: 1 },
        empty: [getEmpty(2, `${featId}.empty.0`)]
      })
    })

    test(`adds empty line after perspective if no reason or desire`, () => {
      const feature = { uuid: featId, perspective: { index: 1 } } as TFeatureAst
      const opts = {}
      expect(formatStory(feature, opts)).toEqual({
        uuid: featId,
        perspective: { index: 1 },
        empty: [getEmpty(2, `${featId}.empty.0`)]
      })
    })
  })

  describe(`formatOptions`, () => {
    test(`removes empty and comments if specified in options`, () => {
      const feature = { uuid: featId, empty: [], comments: [] } as TFeatureAst
      const opts = { removeEmpty: true, removeComments: true }
      expect(formatOptions(feature, opts)).toEqual({
        uuid: featId,
      })
    })

    test(`adds empty line after story if specified in options`, () => {
      const feature = { uuid: featId, index: 1 } as TFeatureAst
      const opts = { emptyAfterStory: true }
      expect(formatOptions(feature, opts)).toEqual({
        index: 1,
        uuid: featId,
        empty:[getEmpty(2, `${featId}.empty.0`)]
      })
    })

    test(`adds empty line after feature if specified in options`, () => {
      const feature = { uuid: featId, index: 1 } as TFeatureAst
      const opts = { emptyAfterFeature:true }
      expect(formatOptions(feature,opts)).toEqual({
        index: 1,
        uuid: featId,
        empty:[getEmpty(2, `${featId}.empty.0`)]
      })
    })
  })

  describe(`formatSteps`,()=>{
    test(`returns parent if emptyAfterSteps is false`,()=>{
      const feature={} as TFeatureAst
      const parent={steps:[],index :0} as TStepParentAst
      const opts={emptyAfterSteps:false}

      expect(formatSteps(feature,parent,opts)).toEqual(parent)
    })

    test(`adds empty line after steps if specified in options`,()=>{
      const opts={emptyAfterSteps:true}
      const feature = { uuid: featId, empty :[]} as TFeatureAst
      const parent = {steps:[{ index: 2 }], index: 0} as TStepParentAst
      const updated = formatSteps(feature, parent, opts)

      expect(feature.empty).toEqual([getEmpty(3, `${featId}.empty.0`)])
    })
  })

  describe(`formatBackground`, () => {
    test(`returns parent if no background`, () => {
      const feature = { uuid: featId, } as TFeatureAst
      const parent = {} as TBackgroundParentAst
      const opts = {}
      expect(formatBackground(feature, parent, opts)).toEqual(parent)
    })

    test(`adds empty line after background if specified in options`, () => {
      const feature = { uuid: featId, empty: [] } as TFeatureAst
      const parent = { background: { index: 1 } } as TBackgroundParentAst
      const opts = { emptyAfterBackground: true }
      formatBackground(feature, parent, opts)
      expect(feature.empty).toEqual([getEmpty(2, `${featId}.empty.0`)])
    })
  })

  describe(`formatScenarios`, () => {
    test(`returns parent if no scenarios`, () => {
      const feature = {} as TFeatureAst
      const parent = {} as TScenarioParentAst
      const opts = {}
      expect(formatScenarios(feature, parent, opts)).toEqual(parent)
    })

    test(`adds empty line after each scenario if specified in options`, () => {
      const feature = { uuid: featId, empty: [] } as TFeatureAst
      const parent = { scenarios: [{ index: 1 }, { index: 2 }] } as TScenarioParentAst
      const opts = { emptyAfterScenario: true }
      formatScenarios(feature, parent, opts)
      expect(feature.empty).toEqual([
        getEmpty(2, `${featId}.empty.0`),
        getEmpty(3, `${featId}.empty.1`)
      ])
    })
  })

  describe(`formatRules`, () => {
    test(`returns feature if no rules`, () => {
      const feature = {} as TFeatureAst
      const opts = {}
      expect(formatRules(feature, opts)).toEqual(feature)
    })

    test(`adds empty line after each rule if specified in options`, () => {
      const feature = { uuid: featId, rules: [{ index: 1 }, { index: 2 }], empty: [] } as TFeatureAst
      const opts = { emptyAfterRule: true }
      formatRules(feature, opts)
      expect(feature.empty).toEqual([
        getEmpty(2, `${featId}.empty.0`),
        getEmpty(3, `${featId}.empty.1`)
      ])
    })
  })

  describe(`formatFeature`, () => {
    test(`formats feature according to options`, () => {
      const feature = {
        uuid: featId,
        rules: [{ index: 1 }, { index: 2 }],
        scenarios: [{ index: 3 }, { index: 4 }],
        background: { index: 5 },
        empty:[],
        comments:[]
      } as TFeatureAst
      const opts = {
        removeEmpty:true,
        removeComments:true,
        emptyAfterRule:true,
        emptyAfterScenario:true,
        emptyAfterBackground:true
      }
      expect(formatFeature(feature,opts)).toEqual({
        uuid: featId,
        rules:[{index :1},{index :2}],
        scenarios:[{index :3},{index :4}],
        background:{index :5},
        empty:[
          getEmpty(6, `${featId}.empty.0`),
          getEmpty(2, `${featId}.empty.1`),
          getEmpty(3, `${featId}.empty.2`),
          getEmpty(4, `${featId}.empty.3`),
          getEmpty(5, `${featId}.empty.4`)
        ]
      })
    })
  })

})