jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { testMethodFill, ...errorMethods } = require('../errors')

describe('Errors', () => {
  describe('testMethodFill', () => {
    it('should return a function', () => {
      expect(typeof testMethodFill()).toBe('function')
    })
    it('the returned function should throw when called', () => {
      expect(() => testMethodFill()()).toThrow()
    })
  })

  Object.entries(errorMethods).map(([name, method]) => {
    describe(name, () => {
      it('should throw an error when called', () => {
        expect(() => method()).toThrow()
      })
    })
  })
})
