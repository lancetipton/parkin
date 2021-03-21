import { backgroundFeature } from '../../__mocks__'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { parseFeature } = require('../parseFeature')

describe('parseFeature', () => {
  describe('Feature Background', () => {
    it('should parse a background and its steps when it exists', () => {
      const feature = parseFeature(backgroundFeature)[0]
      expect(feature.background).not.toBe(undefined)
      expect(feature.background.background).toBe(
        'background-steps-16-background'
      )
    })

    it('should parse a background steps', () => {
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
