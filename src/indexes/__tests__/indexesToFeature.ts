jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

import { EAstObject } from '../../types'
import { indexesMocks } from '../../__mocks__'
import { deepMerge } from '@keg-hub/jsutils'

const { indexesToFeature } = require('../indexesToFeature')

describe('indexesToFeature', () => {


  test('should return an empty object if its the same feature in the indexes', () => {
    const feature = { type: EAstObject.feature, feature: `feature`, uuid: 'a', index: 0 }
    const indexes = [{ ast: feature, parent: feature }]
    expect(indexesToFeature(indexes, feature)).toEqual({})
  })

  
  test('should return an empty object if the indexes are empty', () => {
    const feature = { type: EAstObject.feature, uuid: 'a', index: 0 }
    const indexes = []
    expect(indexesToFeature(indexes, feature)).toEqual({})
  })

  test('should return a merge of the index changes with a passed in feature', () => {
    const { rule, feature, scenario, step } = deepMerge(indexesMocks)
    feature.rules.push(rule)
    const indexes = [
      {ast: feature, parent: feature},
      {ast: rule, parent: feature},
      // Does not exist in the feature
      {ast: scenario, parent: rule},
      {ast: step, parent: scenario},
    ]

    const merged = indexesToFeature(indexes, feature)
    const expected = { rules: [{ ...rule, scenarios: [scenario] }] }

    expect(merged).toEqual(expected)
  })


  test('should merge a feature with the user story properties', () => {
    const { feature, desire, perspective, reason } = deepMerge(indexesMocks)
    const indexes = [
      {ast: feature, parent: feature},
      {ast: perspective, parent: feature},
      {ast: desire, parent: feature},
      {ast: reason, parent: feature},
    ]

    expect(indexesToFeature(indexes, feature)).toEqual({
      desire,
      perspective,
      reason: [reason],
    })
  })


  test('should properly merge a feature with feature background and rule background', () => {
    const { feature, background, rule, step } = deepMerge(indexesMocks)
    feature.rules.push(rule)
    const background2 = deepMerge(background, { index: 2, background: `feature-background` })
    const step2 = deepMerge(step, { index: 3, step: `feature-background-step` })
    background2.steps.push(step2) 

    const indexes = [
      {ast: feature, parent: feature},
      {ast: background2, parent: feature},
      {ast: step2, parent: background2},
      {ast: rule, parent: feature},
      {ast: background, parent: rule},
      {ast: step, parent: background},
    ]

    const merged = indexesToFeature(indexes, feature)

    expect(merged.background).toEqual(background2)
    expect(merged.background.steps[0]).toEqual(step2)
    expect(merged.rules[0].background).toEqual(background)
    expect(merged.rules[0].background.steps[0]).toEqual(step)

  })

  test('should properly merge a feature with existing background and rule background', () => {
    const { feature, background, rule, step } = deepMerge(indexesMocks)
    feature.rules.push(rule)
    const background2 = deepMerge(background, { index: 2, background: `feature-background` })
    const step2 = deepMerge(step, { index: 3, step: `feature-background-step` })
    background2.steps.push(step2) 

    feature.background = background2

    const indexes = [
      {ast: feature, parent: feature},
      {ast: background2, parent: feature},
      {ast: step2, parent: background2},
      {ast: rule, parent: feature},
      {ast: background, parent: rule},
      {ast: step, parent: background},
    ]

    const merged = indexesToFeature(indexes, feature)

    expect(merged.background).toEqual(background2)
    expect(merged.background.steps[0]).toEqual(step2)
    expect(merged.rules[0].background).toEqual(background)
    expect(merged.rules[0].background.steps[0]).toEqual(step)
  })

})
