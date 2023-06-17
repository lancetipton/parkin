jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { sanitize, strToId } = require('../helpers')

const defMatches = {
  [`I click on the {string}`]: `/I click on the {string}$`,
  [`I click {word} with the {string}`]: `^I click {word} with the {string}/`
}

const defIds = {
  [`I click on the {string}`]: `264267236`,
  [`I click {word} with the {string}`]: `1392272769`
}

describe('Utils Helpers', () => {

  describe(`sanitize`, () => {
    it(`should sanitize the match property of a definition`, () => {
      Object.entries(defMatches).forEach(([key, match]) => {
        expect(sanitize({ match })).toBe(key)
      })
    })
  })

  describe(`strToId`, () => {
    it(`should generate a consistent ID from the same text content`, () => {
      Object.entries(defIds).forEach(([match, id]) => {
        expect(strToId(sanitize({ match }))).toBe(id)
      })
    })
    
    it(`should allow passing a prefix`, () => {
      Object.entries(defIds).forEach(([match, id]) => {
        expect(strToId(sanitize({ match }), `test-`)).toBe(`test-${id}`)
      })
    })

    it(`should allow passing a postfix`, () => {
      Object.entries(defIds).forEach(([match, id]) => {
        expect(strToId(sanitize({ match }), ``, `-test`)).toBe(`${id}-test`)
      })
    })

  })

})
