import { rulesFeature, backgroundFeature } from '../../__mocks__'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { parseFeature } = require('../parseFeature')

describe(`parseFeature`, () => {
  describe(`Feature Tags`, () => {
    it(`should parse a Features tags`, () => {
      const { tags } = parseFeature(backgroundFeature)[0]
      expect(tags.index).toBe(0)
      expect(Array.isArray(tags.tokens)).toBe(true)
      expect(tags.tokens[0]).toBe(`@background`)
    })
  })

  describe(`Feature Comments`, () => {
    it(`should parse comments within a Feature`, () => {
      const { comments } = parseFeature(backgroundFeature)[0]
      expect(Array.isArray(comments)).toBe(true)
      expect(comments[0]).toEqual({
        index: 2,
        type: `comment`,
        content: `  # This is a test comment`,
      })
    })
  })

  describe(`Feature Rule`, () => {
    it(`should parse the rules of a feature`, () => {
      const { rules } = parseFeature(rulesFeature)[0]
      expect(rules.length).toBe(2)
      expect(rules[0].rule).toBe(`This is Rule 1`)
      expect(rules[1].rule).toBe(`This is Rule 2`)
    })

    it(`should add the parsed steps to the correct rule scenarios`, () => {
      const { rules } = parseFeature(rulesFeature)[0]
      const { scenarios } = rules[0]
      const { scenarios: scenarios2 } = rules[1]

      expect(scenarios[0].steps.length).toBe(2)
      expect(scenarios[0].steps[0].type).toBe(`given`)
      expect(scenarios[0].steps[0].step).toBe(
        `that this Feature has a background`
      )
      expect(scenarios[0].steps[1].type).toBe(`then`)
      expect(scenarios[0].steps[1].step).toBe(
        `this rules scenario's steps should be run after the background's steps`
      )
      expect(scenarios[1].steps.length).toBe(2)
      expect(scenarios[1].steps[0].type).toBe(`given`)
      expect(scenarios[1].steps[0].step).toBe(`that a second scenario exists`)
      expect(scenarios[1].steps[1].type).toBe(`then`)
      expect(scenarios[1].steps[1].step).toBe(
        `the rules second scenario's steps should be run after a second background's steps`
      )

      expect(scenarios2[0].steps.length).toBe(2)
      expect(scenarios2[0].steps[0].type).toBe(`given`)
      expect(scenarios2[0].steps[0].step).toBe(
        `that this Feature has two rules`
      )
      expect(scenarios2[0].steps[1].type).toBe(`then`)
      expect(scenarios2[0].steps[1].step).toBe(
        `this scenario's steps should be run after the the first rules steps`
      )
      expect(scenarios2[1].steps.length).toBe(2)
      expect(scenarios2[1].steps[0].type).toBe(`given`)
      expect(scenarios2[1].steps[0].step).toBe(
        `that a second scenario exists in the second rule`
      )
      expect(scenarios2[1].steps[1].type).toBe(`then`)
      expect(scenarios2[1].steps[1].step).toBe(
        `the second scenario's steps should be run after a second rules scenario steps`
      )
    })
  })

  describe(`Feature Scenario`, () => {
    it(`should parse the Scenarios of a feature`, () => {
      const { scenarios } = parseFeature(backgroundFeature)[0]
      expect(scenarios.length).toBe(2)
      expect(scenarios[0].scenario).toBe(`Run scenario after the background`)
      expect(scenarios[1].scenario).toBe(
        `Run second scenario after a second background`
      )
    })

    it(`should add the parsed steps to the correct Scenarios`, () => {
      const { scenarios } = parseFeature(backgroundFeature)[0]

      expect(scenarios[0].steps.length).toBe(2)
      expect(scenarios[0].steps[0].type).toBe(`given`)
      expect(scenarios[0].steps[0].step).toBe(
        `that this Feature has a background`
      )
      expect(scenarios[0].steps[1].type).toBe(`then`)
      expect(scenarios[0].steps[1].step).toBe(
        `this scenario's steps should be run after the background's steps`
      )

      expect(scenarios[1].steps.length).toBe(2)
      expect(scenarios[1].steps[0].type).toBe(`given`)
      expect(scenarios[1].steps[0].step).toBe(`that a second scenario exists`)
      expect(scenarios[1].steps[1].type).toBe(`then`)
      expect(scenarios[1].steps[1].step).toBe(
        `the second scenario's steps should be run after a second background's steps`
      )
    })
  })

  describe(`Feature Background`, () => {
    it(`should parse a background and its steps when it exists`, () => {
      const feature = parseFeature(backgroundFeature)[0]
      expect(feature.background).not.toBe(undefined)
      expect(feature.background.background).toBe(`Background steps`)
    })

    it(`should parse a background's steps`, () => {
      const feature = parseFeature(backgroundFeature)[0]
      expect(Array.isArray(feature.background.steps)).toBe(true)

      const [ givenStep, thenStep ] = feature.background.steps

      expect(givenStep.type).toBe(`given`)
      expect(givenStep.step).toBe(`that background exists`)
      expect(givenStep.uuid).not.toBe(undefined)
      expect(givenStep.index).not.toBe(undefined)

      expect(thenStep.type).toBe(`then`)
      expect(thenStep.step).toBe(
        `the background steps should be called before each scenario`
      )
      expect(thenStep.uuid).not.toBe(undefined)
      expect(thenStep.index).not.toBe(undefined)
    })
  })
})
