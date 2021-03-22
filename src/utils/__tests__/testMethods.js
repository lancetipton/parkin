import { noOp } from '@keg-hub/jsutils'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const testMethodMock = jest.fn()
jest.setMock('../errors', { testMethodFill: testMethodMock })

const { getTestMethod } = require('../testMethods')

describe('testMethods', () => {
  describe('getTestMethod', () => {
    it('should return a noOp when the second argument is true', () => {
      expect(getTestMethod('test', true).toString()).toEqual(noOp.toString())
    })

    it('should return a global method based on the passed in type', () => {
      expect(getTestMethod('describe')).toBe(describe)
    })

    it('should call the testMethodMock when the global method does not exist', () => {
      getTestMethod('__test_no_exists_global')
      expect(testMethodMock).toHaveBeenCalledWith('__test_no_exists_global')
    })
  })
})
