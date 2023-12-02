import { globalTypes } from '../utils'
import { exists } from '@keg-hub/jsutils/exists'

let globalObj = {}
const resolveGlobalObjMock = jest.fn(() => globalObj)
jest.setMock('../../utils/globalScope', {
  resolveGlobalObj: resolveGlobalObjMock,
})

describe(`global`, () => {
  it(`Should make a call to resolve the global object`, () => {
    require('../global')
    expect(resolveGlobalObjMock).toHaveBeenCalled()
    const globalKeys = Object.keys(globalObj)
    Object.values(globalTypes).map(name =>
      expect(globalKeys.includes(name)).toBe(true)
    )
  })

  it(`Should return a method to allow overriding the globals from the import`, () => {
    globalObj = {}
    const { setParkinTestGlobals } = require('../global')
    Object.values(globalTypes).map(name =>
      expect(Object.keys(globalObj).includes(name)).not.toBe(true)
    )
    setParkinTestGlobals()
    Object.values(globalTypes).map(name =>
      expect(Object.keys(globalObj).includes(name)).toBe(true)
    )
  })

  it(`Should return a reset method that reset the overide globals when the second argument is true`, () => {
    globalObj = {...globalThis}
    
    const { setParkinTestGlobals } = require('../global')
    const reset = setParkinTestGlobals(true, true)

    Object.values(globalTypes).map(name => {
      expect(exists(globalObj[name])).toBe(true)
      expect(exists(globalThis[name])).toBe(true)

      expect(globalThis[name]).not.toEqual(globalObj[name])
    })

    reset()

    Object.values(globalTypes).map(name => {
      expect(exists(globalObj[name])).toBe(true)
      expect(exists(globalThis[name])).toBe(true)

      expect(globalThis[name]).toEqual(globalObj[name])
    })

  })
  
})
