import { noOp } from '@keg-hub/jsutils'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

import * as globalScope from '../globalScope'

let mockJasmineVal = true
const mockResult = {
  status: 'failed'
}
const mockSpec = {
  disable: jest.fn(),
  result: mockResult
}
const mockSuite = {children: [mockSpec]}

const addReporterMock = jest.fn()
const getEnvMock = jest.fn(() => ({
  hasWindow: true,
  hasJasmine: mockJasmineVal,
  addReporter: addReporterMock,
  describe: jest.fn(() => mockSuite),
}))

const resolveJasmineMock = jest.fn(() => {
  return {
    getEnv: getEnvMock,
  }
})

jest.setMock('../globalScope', {
  ...globalScope,
  resolveJasmine: resolveJasmineMock
})
const testMethodMock = jest.fn()
jest.setMock('../errors', { testMethodFill: testMethodMock })

const { getTestMethod, skipTestsOnFail } = require('../testMethods')

describe('testMethods', () => {
  describe('getTestMethod', () => {

    beforeEach(() => {
      getEnvMock.mockClear()
      addReporterMock.mockClear()
      resolveJasmineMock.mockClear()
    })
    
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

  describe('skipTestsOnFail', () => {

    beforeEach(() => {
      getEnvMock.mockClear()
      addReporterMock.mockClear()
      resolveJasmineMock.mockClear()
    })
    
    it(`should call resolveJasmine to check if jasmine exists in the env`, () => {
      skipTestsOnFail()
      expect(resolveJasmineMock).toHaveBeenCalled()
    })

    it(`should call getEnv when jasmine exists in the env`, () => {
      skipTestsOnFail()
      expect(getEnvMock).toHaveBeenCalled()
    })
    
    it(`should return to the addReporter method`, () => {
      skipTestsOnFail()
      const reporter = addReporterMock.mock.calls[0][0]
      expect(typeof reporter.specDone).toBe('function')
    })

  })
  
  describe('custom reporter', () => {

    beforeEach(() => {
      getEnvMock.mockClear()
      addReporterMock.mockClear()
      resolveJasmineMock.mockClear()
      mockSpec.disable.mockClear()
      jest.setMock('../globalScope', {
        ...globalScope,
        resolveJasmine: resolveJasmineMock
      })
    })

    it(`should call each specs disable when spec.result.status === failed`, () => {
      skipTestsOnFail()
      const reporter = addReporterMock.mock.calls[0][0]
      const suite = addReporterMock.mock.instances[0].describe()
      reporter.specDone(mockResult)
      expect(suite.children[0].disable).toHaveBeenCalled()
    })

    it(`should not call each specs disable when spec.result.status !== failed`, () => {
      skipTestsOnFail()
      const reporter = addReporterMock.mock.calls[0][0]
      const suite = addReporterMock.mock.instances[0].describe()
      reporter.specDone({status: 'passed'})
      expect(suite.children[0].disable).not.toHaveBeenCalled()
    })

  })

})
