import { noOp } from '@keg-hub/jsutils'
import { constants } from '../../constants'
const { SPEC_RESULT_LOG, LOG_JEST_SPEC_ENV } = constants

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

import * as globalScope from '../globalScope'

let mockJasmineVal = true
const mockResult = {
  status: 'failed',
}
const mockSpec = {
  disable: jest.fn(),
  result: mockResult,
}
const mockSuite = { children: [mockSpec] }

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
  resolveJasmine: resolveJasmineMock,
})
const testMethodMock = jest.fn()
jest.setMock('../errors', { testMethodFill: testMethodMock })

const orgGetTime = Date.prototype.getTime
Date.prototype.getTime = jest.fn(() => 'fake-time')

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
    afterAll(() => {
      Date.prototype.getTime = orgGetTime
    })

    beforeEach(() => {
      getEnvMock.mockClear()
      addReporterMock.mockClear()
      resolveJasmineMock.mockClear()
      mockSpec.disable.mockClear()
      Date.prototype.getTime.mockClear()
      jest.setMock('../globalScope', {
        ...globalScope,
        resolveJasmine: resolveJasmineMock,
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
      reporter.specDone({ status: 'passed' })
      expect(suite.children[0].disable).not.toHaveBeenCalled()
    })

    it(`should call stdout when LOG_JEST_SPEC_ENV env is set`, () => {
      process.env[LOG_JEST_SPEC_ENV] = true
      const orgStdOut = process.stdout.write
      process.stdout.write = jest.fn((...data) => {
        orgStdOut.call(process.stdout, ...data)
      })

      skipTestsOnFail()
      const reporter = addReporterMock.mock.calls[0][0]
      reporter.specStarted({ id: 'spec01' })
      expect(process.stdout.write).toHaveBeenCalledWith(
        `${SPEC_RESULT_LOG}{"id":"spec01","type":"step","action":"start","timestamp":"fake-time"}${SPEC_RESULT_LOG}`
      )
      process.stdout.write = orgStdOut
    })

    it(`should call stdout with the correct type`, () => {
      process.env[LOG_JEST_SPEC_ENV] = true
      const orgStdOut = process.stdout.write
      process.stdout.write = jest.fn((...data) => {
        orgStdOut.call(process.stdout, ...data)
      })

      skipTestsOnFail()
      const reporter = addReporterMock.mock.calls[0][0]

      reporter.suiteStarted({ id: 'suite01', description: `Scenario >` })
      expect(process.stdout.write).toHaveBeenCalledWith(
        [
          SPEC_RESULT_LOG,
          `{"id":"suite01","description":"Scenario:","type":"scenario","action":"start","timestamp":"fake-time"}`,
          SPEC_RESULT_LOG,
        ].join(``)
      )
      process.stdout.write.mockClear()

      reporter.suiteStarted({ id: 'suite01', description: `Background >` })
      expect(process.stdout.write).toHaveBeenCalledWith(
        [
          SPEC_RESULT_LOG,
          `{"id":"suite01","description":"Background:","type":"background","action":"start","timestamp":"fake-time"}`,
          SPEC_RESULT_LOG,
        ].join(``)
      )
      process.stdout.write.mockClear()

      reporter.suiteStarted({ id: 'suite01', description: `Rule >` })
      expect(process.stdout.write).toHaveBeenCalledWith(
        [
          SPEC_RESULT_LOG,
          `{"id":"suite01","description":"Rule:","type":"rule","action":"start","timestamp":"fake-time"}`,
          SPEC_RESULT_LOG,
        ].join(``)
      )
      process.stdout.write.mockClear()

      reporter.suiteStarted({ id: 'suite01' })
      expect(process.stdout.write).toHaveBeenCalledWith(
        `${SPEC_RESULT_LOG}{"id":"suite01","type":"feature","action":"start","timestamp":"fake-time"}${SPEC_RESULT_LOG}`
      )
      process.stdout.write.mockClear()

      process.stdout.write = orgStdOut
    })
  })
})
