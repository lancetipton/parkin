jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { testMethodFill, ...errorMethods } = require('../errors')

describe('Errors', () => {
  const oldErr = console.error
  console.error = jest.fn()

  beforeEach(() => {
    // @ts-ignore
    console.error.mockClear()
  })

  afterAll(() => {
    console.error = oldErr
  })

  describe('testMethodFill', () => {
    it('should return a function', () => {
      expect(typeof testMethodFill()).toBe('function')
    })
    it('the returned function should throw when called', () => {
      expect(() => testMethodFill()()).toThrow()
    })
  })

  Object.entries(errorMethods as Record<string, ()=>any>).map(([ name, method ]) => {
    describe(name, () => {
      it('should throw an error when called', () => {
        expect(() => method()).toThrow()
      })
    })
  })
})
