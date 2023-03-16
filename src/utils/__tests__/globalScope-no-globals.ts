import * as jsutils from '@keg-hub/jsutils'
const { noOpObj } = jsutils
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
      expect(globalObj).toBe(noOpObj)
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
      expect(Object.keys(mockJasmine).length).toBe(1)
      expect(typeof mockJasmine.getEnv).toBe('function')
      expect(mockJasmine.getEnv()).toEqual(noOpObj)
    })
  })
})
