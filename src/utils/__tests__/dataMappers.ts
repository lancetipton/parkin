jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()
import { dataMapperMocks } from '../../__mocks__'
import { deepMerge } from '@keg-hub/jsutils/deepMerge'

const { dataMappers } = require('../dataMappers')

describe(`dataMappers`, () => {

  describe(`dataMappers.empty`, () => {
    it(`should return an empty array if updated array is empty`, () => {
      const result = dataMappers.empty([], [])
      expect(result).toEqual([])
    })

    it(`should return an empty array if current array and updated array is undefined`, () => {
      const result = dataMappers.empty(undefined, undefined)
      expect(result).toEqual([])
    })

    it(`should return the updated array if current array is undefined`, () => {
      const updated = [{ uuid: `123` }]
      const result = dataMappers.empty(undefined, updated)
      expect(result).toBe(updated)
    })

    it(`should return the current array if the arrays are deeply equal`, () => {
      const current = [{ uuid: `123` }]
      const updated = [{ uuid: `123` }]
      const result = dataMappers.empty(current, updated)
      expect(result).toBe(current)
    })

    it(`should return a new array if the arrays are not deeply equal`, () => {
      const current = [{ uuid: `123`, foo: `bar` }]
      const updated = [{ uuid: `123`, foo: `baz` }]
      const result = dataMappers.empty(current, updated)
      expect(result).not.toBe(current)
      expect(result).toEqual(updated)
    })
  })

  describe(`dataMappers.tags`, () => {
    it(`should return an current if updated tags are undefined or have no tokens`, () => {
      const current = { tokens: [`foo`] }
      const result1 = dataMappers.tags(current, undefined)
      const result2 = dataMappers.tags(current, { tokens: [] })
      expect(result1).toBe(current)
      expect(result2).toBe(current)
    })

    it(`should return updated tags if current tags have no tokens`, () => {
      const updated = { tokens: [`foo`] }
      const result = dataMappers.tags({ tokens: [] }, updated)
      expect(result).toBe(updated)
    })

    it(`should return current tags if both tags are deeply equal`, () => {
      const current = { tokens: [`foo`, `bar`] }
      const updated = { tokens: [`foo`, `bar`] }
      const result = dataMappers.tags(current, updated)
      expect(result).toBe(current)
    })

    it(`should return a new tags object if tags are not deeply equal`, () => {
      const current = { tokens: [`foo`, `bar`] }
      const updated = { tokens: [`foo`, `baz`] }
      const result = dataMappers.tags(current, updated)
      expect(result).not.toBe(current)
      expect(result).toEqual({
        ...updated,
        content: `foo bar baz`,
        tokens: [`foo`, `bar`, `baz`],
      })
    })
  })

  describe(`dataMappers.steps`, () => {
    const { current, updated } = dataMapperMocks.steps

    test('should return an empty array if `updated` is empty and `current` is undefined', () => {
      expect(dataMappers.steps(undefined, [])).toEqual([])
    })
    
    test('should return `current` if `updated` is empty and `current` is defined', () => {
      expect(dataMappers.steps(current, [])).toEqual([])
    })

    test('should return `updated` if `current` is undefined', () => {
      expect(dataMappers.steps(undefined, updated)).toEqual(updated)
    })

    test('should return `current` step when equal with updated', () => {
      const [s1, s2, s3] = dataMappers.steps(current, updated) 
      expect(s1).toBe(current[0])
    })

    test('should return a merged step when current and updated are deep equal', () => {
      const [s1, s2, s3] = dataMappers.steps(current, updated) 
      expect(s2).not.toEqual(current[1])
      expect(s2).not.toBe(updated[1])
      expect(s2).toEqual(updated[1])
    })

    test('should return a updated step it doesnt exist in current', () => {
      const [s1, s2, s3] = dataMappers.steps(current, updated) 
      expect(s3).toEqual(updated[2])
    })

    test('should return updated steps with merged data when a step has changed', () => {
      const expected = dataMapperMocks.steps.expected
      expect(dataMappers.steps(current, updated)).toEqual(expected)
    })
  })

  describe(`dataMappers.parentSteps`, () => {
    const {exSteps, exTags, uSteps, uTags, expectedTags, updatedTags} = dataMapperMocks.parentSteps
    const ex = { steps: exSteps, tags: exTags, uuid: 'exUUID' }
    const updated = { steps: uSteps, tags: uTags, uuid: 'uUUID' }

    it('returns updated when current is undefined', () => {
      expect(dataMappers.parentSteps(undefined, updated)).toEqual(updated)
    })

    it('returns undefined when updated is undefined', () => {
      expect(dataMappers.parentSteps(ex, undefined)).toBeUndefined()
    })

    it('returns current when there are no changes', () => {
      expect(dataMappers.parentSteps(ex, { ...ex })).toEqual(ex)
    })

    it('updates tags when they change', () => {
      const newTags = { uuid: 'uUUID', tokens: ['@u', '@new'] }
      const expected = { ...updated, tags: newTags }
      expect(dataMappers.parentSteps(ex, expected)).toEqual({...expected, tags: updatedTags})
    })

    it('updates steps when they change', () => {
      const newStep = { uuid: 'uUUID', type: 'given', step: 'New step' }
      const expected = { ...updated, steps: [{ ...uSteps[0], step: 'New step' }] }
      expect(dataMappers.parentSteps(ex, expected)).toEqual({...expected, tags: expectedTags})
    })

    it('adds new tags when they do not exist in current', () => {
      const newTags = { uuid: 'uUUID', tokens: ['@u', '@new'] }
      const expected = { ...updated, tags: newTags }
      expect(dataMappers.parentSteps({ steps: exSteps, uuid: 'exUUID' }, expected)).toEqual(expected)
    })

    it('adds new steps when they do not exist in current', () => {
      const newStep = { uuid: 'uUUID', type: 'Given', step: 'New step' }
      const expected = { ...updated, steps: [...uSteps, newStep] }
      expect(dataMappers.parentSteps({ tags: exTags, uuid: 'exUUID' }, expected))
        .toEqual({...expected, tags: expectedTags})
    })
  })

  describe(`dataMappers.background`, () => {
    const {current, updated, updatedWithoutSteps} = dataMapperMocks.background

    it('should return undefined if updated is undefined', () => {
      const result = dataMappers.background(current, undefined)
      expect(result).toBeUndefined()
    })

    it('should return updated if current is undefined', () => {
      const result = dataMappers.background(undefined, updated)
      expect(result).toEqual(updated)
    })

    it('should return the same object if updated and current are deeply equal', () => {
      const result = dataMappers.background(current, current)
      expect(result).toBe(current)
    })

    it('should return the updated object with new steps added', () => {
      const result = dataMappers.background(current, updated)
      expect(result).toEqual(dataMapperMocks.background.expected)
    })

    it('should return the updated object without steps if updated does not have steps', () => {
      const result = dataMappers.background(current, updatedWithoutSteps)
      expect(result).toEqual(updatedWithoutSteps)
    })

    it('should return the current object if updated has no changes', () => {
      const result = dataMappers.background(current, current)
      expect(result).toBe(current)
    })
  })

  describe(`dataMappers.rules`, () => {
    const {
      newRule,
      currentRule1,
      currentRule2,
      updatedRule1,
      updatedRule2,
    } = dataMapperMocks.rules
    const currentRules = [currentRule1, currentRule2]
    const updatedRules = [updatedRule1, updatedRule2]

    it('should return empty array if the updated rules are empty', () => {
      expect(dataMappers.rules(currentRules, [])).toEqual([])
    })

    it('should return the updated rules if the current rules are empty', () => {
      expect(dataMappers.rules([], updatedRules)).toEqual(updatedRules)
    })

    it('should update existing rules and keep the same reference if nothing has changed', () => {
      const updatedRule2SameRef = { ...updatedRule2 }
      const result = dataMappers.rules([currentRule1], updatedRules)

      expect(result).toHaveLength(2)
      expect(result[1]).toBe(updatedRule2)
      expect(result[1]).toEqual(updatedRule2SameRef)
    })

    it('should update existing rules with new scenarios and return new reference', () => {
      const result = dataMappers.rules(currentRules, updatedRules)

      expect(result).toHaveLength(2)
      expect(result[0]).not.toBe(currentRule1)
      expect(result[0]).toEqual(updatedRule1)
      expect(result[1]).toEqual(updatedRule2)
      expect(result[1].scenarios).toHaveLength(0)
    })

    it('should add new rules to the list and return new reference', () => {
      const updatedRulesWithNewRule = [updatedRule1, updatedRule2, newRule]
      const result = dataMappers.rules(currentRules, updatedRulesWithNewRule)

      expect(result).toHaveLength(3)
      expect(result[0]).toEqual(updatedRule1)
      expect(result[1]).toEqual(updatedRule2)
      expect(result[2]).toBe(newRule)
    })

    it('should return the current rules if nothing has changed', () => {
      const currentRulesSameRef = [...currentRules]
      const result = dataMappers.rules(currentRules, currentRulesSameRef)

      expect(result).toHaveLength(2)
      expect(result[0]).toBe(currentRule1)
      expect(result[1]).toBe(currentRule2)
    })
  })

  describe(`dataMappers.scenarios`, () => {
    it('should return an empty array when given no scenarios', () => {
      const result = dataMappers.scenarios(undefined, undefined)

      expect(result).toEqual([])
    })

    it('should return the updated array when given no current scenarios', () => {
      const updated = dataMapperMocks.scenarios.updated
      const result = dataMappers.scenarios(undefined, updated)

      expect(result).toEqual(updated)
    })

    it('should return an empty array when no updated scenarios are passed', () => {
      const current = dataMapperMocks.scenarios.current
      const result = dataMappers.scenarios(current, undefined)

      expect(result).toEqual([])
    })

    it('should return the updated array when an empty current array is passed', () => {
      const current = []
      const updated = dataMapperMocks.scenarios.current
      const result = dataMappers.scenarios(current, updated)

      expect(result).toEqual(updated)
    })

    it('should return an empty array when given an empty updated array', () => {
      const {current} = dataMapperMocks.scenarios
      const updated = []
      const result = dataMappers.scenarios(current, updated)
      expect(result).toEqual(updated)
    })

    it('should return the current array when no scenarios have changed', () => {
      const { current, expected } = dataMapperMocks.scenarios
      const scenarios = [current[0], current[1]]
      const updated = [deepMerge(current[0]), deepMerge(current[1])]
      const result = dataMappers.scenarios(scenarios, updated)
      expect(result).toEqual(expected)
    })

    it('should return the updated array when new scenarios have been added', () => {
      const { updated, expected } = dataMapperMocks.scenarios
      const scenarios = [expected[0]]
      const scenariosUp = [expected[0], updated[1]]
      const result = dataMappers.scenarios(scenarios, scenariosUp)

      expect(result).toEqual(scenariosUp)
    })

    it('should return the updated array when scenarios have been updated', () => {
      const {current, updated, expected} = dataMapperMocks.scenarios
      const result = dataMappers.scenarios(current, updated)

      expect(result).toEqual([expected[0], updated[1]])
    })
  })

})
