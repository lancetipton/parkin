import * as jsutils from '@keg-hub/jsutils'
const { emptyObj } = jsutils
jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

let shouldThrow = false
const mockCheckCall = jest.fn((func, ...args) => {
  if (shouldThrow) throw new Error('Force throw error')
  return func(...args)
})

jest.setMock('@keg-hub/jsutils', {
  ...jsutils,
  checkCall: mockCheckCall,
})

jest.setMock('@keg-hub/jsutils/checkCall', {
  ...jsutils,
  checkCall: mockCheckCall,
})

describe('globalScope', () => {
  const orgBool = global.Boolean

  beforeAll(() => {
    // @ts-ignore
    global.Boolean = function () {
      return false
    }
  })

  afterAll(() => {
    global.Boolean = orgBool
  })

  describe('resolveGlobalObj', () => {
    it('should return an empty object when global can not be resolved', () => {
      const { resolveGlobalObj } = require('../globalScope')
      const globalObj = resolveGlobalObj()
      expect(globalObj).toEqual(emptyObj)
    })
  })

  describe('resolveModule', () => {
    it('should return empty exports object when module does not exist', () => {
      const { resolveModule } = require('../globalScope')
      const mod = resolveModule()
      expect(mod).toEqual({ exports: {} })
    })
  })

  describe('resolveJasmine', () => {
    it('should return the mocked jasmine object when global.jasmine does not exists', () => {
      const { resolveJasmine } = require('../globalScope')
      const mockJasmine = resolveJasmine()
      expect(Object.keys(mockJasmine).length).toBe(2)
      expect(typeof mockJasmine.getEnv).toBe('function')
      expect(typeof mockJasmine.testPath).toBe('string')
      expect(mockJasmine.getEnv()).toEqual(emptyObj)
    })
  })
})
