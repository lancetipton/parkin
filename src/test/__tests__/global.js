import { globalTypes } from '../utils'

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
    const { setGlobals } = require('../global')
    Object.values(globalTypes).map(name =>
      expect(Object.keys(globalObj).includes(name)).not.toBe(true)
    )
    setGlobals()
    Object.values(globalTypes).map(name =>
      expect(Object.keys(globalObj).includes(name)).toBe(true)
    )
  })
})
