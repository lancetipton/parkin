jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

let mockGlobals = {
  PK: undefined,
  Parkin: undefined
}
const mockResolveGlobalObj = jest.fn(() => {
  return mockGlobals
})

jest.setMock('../utils/globalScope', {
  resolveGlobalObj:mockResolveGlobalObj
})

const { setParkinGlobals } = require('../global')

describe('setParkinGlobals', () => {
  
  beforeEach(() => {
    mockGlobals = {
      PK: undefined,
      Parkin: undefined
    }
    mockResolveGlobalObj.mockClear()
  })
  
  it(`should call the resolveGlobalObj method`, () => {
    expect(mockResolveGlobalObj).not.toHaveBeenCalled()
    setParkinGlobals()
    expect(mockResolveGlobalObj).toHaveBeenCalled()
  })

  it(`should add the Parkin and PKInstance to the global scope`, () => {
    expect(mockGlobals.PK).toBeUndefined()
    expect(mockGlobals.Parkin).toBeUndefined()
    setParkinGlobals()
    expect(mockGlobals.PK).not.toBeUndefined()
    expect(mockGlobals.Parkin).not.toBeUndefined()
  })

  it(`should not add the Parkin and PKInstance if they already exist and false is passed`, () => {
    expect(mockGlobals.PK).toBeUndefined()
    expect(mockGlobals.Parkin).toBeUndefined()
    setParkinGlobals()
    const orgPK = mockGlobals.PK
    const orgParkin = mockGlobals.Parkin

    mockGlobals = {
      PK: undefined,
      Parkin: undefined
    }

    setParkinGlobals()
    expect(mockGlobals.PK).toBe(orgPK)
    expect(mockGlobals.Parkin).toBe(orgParkin)

    mockGlobals.PK = {}
    mockGlobals.Parkin = {}
    
    setParkinGlobals(false)

    expect(mockGlobals.PK).not.toBe(orgPK)
    expect(mockGlobals.Parkin).not.toBe(orgParkin)
  })


  it(`should add the Parkin and PKInstance if they already exist and false is not passed`, () => {
    expect(mockGlobals.PK).toBeUndefined()
    expect(mockGlobals.Parkin).toBeUndefined()
    setParkinGlobals()
    const orgPK = mockGlobals.PK
    const orgParkin = mockGlobals.Parkin

    mockGlobals = {
      PK: undefined,
      Parkin: undefined
    }

    setParkinGlobals()
    expect(mockGlobals.PK).toBe(orgPK)
    expect(mockGlobals.Parkin).toBe(orgParkin)

    mockGlobals.PK = {}
    mockGlobals.Parkin = {}
    
    setParkinGlobals()

    expect(mockGlobals.PK).toBe(orgPK)
    expect(mockGlobals.Parkin).toBe(orgParkin)
  })

})