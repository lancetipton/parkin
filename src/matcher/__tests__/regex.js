jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const matchText = 'I eat {int} from a total of {int} {string} apple(s)'
const { getRegexParts } = require('../regex')

describe('getRegexParts', () => {
  describe('correct number of results', () => {
    it(`should return the correct number of results`, () => {
      expect(getRegexParts(matchText).length).toBe(4)
    })
  })

  describe('correct index', () => {
    it(`should get the correct index`, () => {
      const result = getRegexParts(matchText)
      const first = result[0]
      const second = result[1]
      const third = result[2]
      const forth = result[3]

      expect(first.index).toBe(6)
      expect(second.index).toBe(28)
      expect(third.index).toBe(34)
      expect(forth.index).toBe(43)
    })
  })

  describe('correct type', () => {
    it(`should get the correct paramType and expression type`, () => {
      const result = getRegexParts(matchText)
      const first = result[0]
      const second = result[1]
      const third = result[2]
      const forth = result[3]

      expect(first.type).toBe(`parameter`)
      expect(first.paramType).toBe(`int`)
      expect(second.type).toBe(`parameter`)
      expect(second.paramType).toBe(`int`)
      expect(third.type).toBe(`parameter`)
      expect(third.paramType).toBe(`string`)
      expect(forth.type).toBe(`optional`)
      expect(forth.paramType).toBe(undefined)
    })
  })
})
