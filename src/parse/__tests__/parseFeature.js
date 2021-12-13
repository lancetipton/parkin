import { backgroundFeature } from '../../__mocks__'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { parseFeature } = require('../parseFeature')

describe('parseFeature', () => {
  describe('Feature Tags', () => {
    it('should parse a Features tags', () => {
      const { tags } = parseFeature(backgroundFeature)[0]
      expect(Array.isArray(tags)).toBe(true)
      expect(tags[0]).toBe('@background')
    })
  })

  describe('Feature Comments', () => {
    it('should parse comments within a Feature', () => {
      const { comments } = parseFeature(backgroundFeature)[0]
      expect(Array.isArray(comments)).toBe(true)
      expect(comments[0]).toEqual({
        content: '  # This is a test comment',
        index: 2,
      })
    })
  })

  describe('Feature Scenario', () => {
    it('should parse the Scenarios of a feature', () => {
      const { scenarios } = parseFeature(backgroundFeature)[0]
      expect(scenarios.length).toBe(2)
      expect(scenarios[0].scenario).toBe('Run scenario after the background')
      expect(scenarios[1].scenario).toBe(
        'Run second scenario after a second background'
      )
    })

    it('should add the parsed steps to the correct Scenarios', () => {
      const { scenarios } = parseFeature(backgroundFeature)[0]

      expect(scenarios[0].steps.length).toBe(2)
      expect(scenarios[0].steps[0].type).toBe('given')
      expect(scenarios[0].steps[0].step).toBe(
        'that this Feature has a background'
      )
      expect(scenarios[0].steps[1].type).toBe('then')
      expect(scenarios[0].steps[1].step).toBe(
        "this scenario's steps should be run after the background's steps"
      )

      expect(scenarios[1].steps.length).toBe(2)
      expect(scenarios[1].steps[0].type).toBe('given')
      expect(scenarios[1].steps[0].step).toBe('that a second scenario exists')
      expect(scenarios[1].steps[1].type).toBe('then')
      expect(scenarios[1].steps[1].step).toBe(
        "the second scenario's steps should be run after a second background's steps"
      )
    })
  })

  describe('Feature Background', () => {
    it('should parse a background and its steps when it exists', () => {
      const feature = parseFeature(backgroundFeature)[0]
      expect(feature.background).not.toBe(undefined)
      expect(feature.background.background).toBe(
        'background-steps-16-background'
      )
    })

    it("should parse a background's steps", () => {
      const feature = parseFeature(backgroundFeature)[0]
      expect(Array.isArray(feature.background.steps)).toBe(true)

      const [ givenStep, thenStep ] = feature.background.steps

      expect(givenStep.type).toBe('given')
      expect(givenStep.step).toBe('that background exists')
      expect(givenStep.uuid).not.toBe(undefined)
      expect(givenStep.index).not.toBe(undefined)

      expect(thenStep.type).toBe('then')
      expect(thenStep.step).toBe(
        'the background steps should be called before each scenario'
      )
      expect(thenStep.uuid).not.toBe(undefined)
      expect(thenStep.index).not.toBe(undefined)
    })
  })
})
