import {
  parsedFeature,
} from '../../__mocks__'
import { Parkin } from '../../parkin'


jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const worldObj = { $alias: {} }
const { findInFeature } = require('../findInFeature')

const PK = new Parkin(worldObj)

describe(`findInFeature`, () => {
  
  it(`should find items within the feature with a valid id path`, () => {

    const stepId = PK.generateId({
      index: 1,
      type: `step`,
      parent: parsedFeature.scenarios[0]
    })

    const found = findInFeature({
      id: stepId,
      feature: parsedFeature,
    })

    expect(found).toEqual(parsedFeature.scenarios[0].steps[1])

  })

  it(`should work with standard step types`, () => {

    const given = findInFeature({
      uuid: `${parsedFeature.uuid}.scenario.0.given.0`,
      feature: parsedFeature,
    })

    expect(given).toEqual(parsedFeature.scenarios[0].steps[0])

    const when = findInFeature({
      id: `${parsedFeature.uuid}.scenario.0.when.1`,
      feature: parsedFeature,
    })

    expect(when).toEqual(parsedFeature.scenarios[0].steps[1])

    const then = findInFeature({
      id: `${parsedFeature.uuid}.scenario.0.then.4`,
      feature: parsedFeature,
    })
    expect(then).toEqual(parsedFeature.scenarios[0].steps[4])

  })

  it(`should work with non-standard step types`, () => {
    const step = {
      index: 0,
      type: `and`,
      step: `test`,
      whitespace: `    `,
      uuid: `${parsedFeature.uuid}.scenario.1.and.0`,
    }
    
    const feat = {
      ...parsedFeature,
      scenarios: [
        ...parsedFeature.scenarios,
        {
          index: 14,
          type: `scenario`,
          scenario: 'test-added',
          uuid: `feature-17965329.scenario.1`,
          whitespace: `  `,
          steps: [
            step,
            {...step, index: 16, type: `but`},
            {...step, index: 17, type: `*`},
            {...step, index: 18, type: `step`},
            {...step, index: 19, type: `steps`},
          ]
        }
      ]
    }

    const and = findInFeature({
      uuid: `${feat.uuid}.scenario.1.and.0`,
      feature: feat,
    })
    expect(and).toEqual(feat.scenarios[1].steps[0])

    const but = findInFeature({
      id: `${feat.uuid}.scenario.1.but.1`,
      feature: feat,
    })
    expect(but).toEqual(feat.scenarios[1].steps[1])

    const star = findInFeature({
      id: `${feat.uuid}.scenario.1.*.2`,
      feature: feat,
    })
    expect(star).toEqual(feat.scenarios[1].steps[2])

    const stepStep = findInFeature({
      id: `${feat.uuid}.scenario.1.step.3`,
      feature: feat,
    })
    expect(stepStep).toEqual(feat.scenarios[1].steps[3])
  })

  it(`should work with scenarios backgrounds and rules`, () => {

    const scenario = findInFeature({
      id: `${parsedFeature.uuid}.scenario.0`,
      feature: parsedFeature,
    })
    expect(scenario).toEqual(parsedFeature.scenarios[0])

  })

  it(`should work with singular or plural names`, () => {

    const single = findInFeature({
      id: `${parsedFeature.uuid}.scenario.0`,
      feature: parsedFeature,
    })

    const plural = findInFeature({
      id: `${parsedFeature.uuid}.scenario.0`,
      feature: parsedFeature,
    })

    expect(single).toEqual(parsedFeature.scenarios[0])
    expect(plural).toEqual(parsedFeature.scenarios[0])
    expect(single).toEqual(plural)

  })

  it(`should return undefined when the item does not exist`, () => {

    const rule = findInFeature({
      id: `${parsedFeature.uuid}.rule.0`,
      feature: parsedFeature,
    })

    expect(rule).toBe(undefined)

  })


})