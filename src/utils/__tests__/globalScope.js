import * as jsutils from '@keg-hub/jsutils'
const { noOpObj } = jsutils
jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

let shouldThrow = false
const mockCheckCall = jest.fn((func, ...args) => {
  if(shouldThrow) throw new Error('Force throw error')
  return func(...args)
})

jest.setMock('@keg-hub/jsutils', {
  ...jsutils,
  checkCall: mockCheckCall
})

describe('globalScope', () => {
  describe('resolveGlobalObj', () => {
    it('should return the window object when it exits', () => {
      const orgWin = global.window
      global.window = { test: 'global-window' }
      const { resolveGlobalObj } = require('../globalScope')
      const globalObj = resolveGlobalObj()
      expect(globalObj).toBe(global.window)
      global.window = orgWin
    })
  
    it('should return an empty object when an error is thrown', () => {
      shouldThrow = true
      const orgWin = global.window
      global.window = undefined
      const { resolveGlobalObj } = require('../globalScope')
      const globalObj = resolveGlobalObj()
      expect(globalObj).toBe(noOpObj)
      shouldThrow = false
      global.window = orgWin
    })
  })

  describe('resolveModule', () => {
    it('should return global.module when called', () => {
      const { resolveModule } = require('../globalScope')
      const mod = resolveModule()
      const moduleKeys = ['children', 'exports', 'filename', 'id', 'loaded', 'path', 'parent', 'paths', 'main']
      Object.keys(mod).map(key => {
        expect(moduleKeys.includes(key)).toBe(true)
      })
      expect(mod.main === module.main).toBe(true)
    })
  })

  describe('resolveJasmine', () => {
    it('should return the global jasmine object when it exists', () => {
      const { resolveJasmine } = require('../globalScope')
      expect(resolveJasmine()).toBe(global.jasmine)
    })
  })
})
