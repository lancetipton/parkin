jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()


const world = {$alias: {}}
const ParkinInstance = {}
const ParkinTestInstance = {}
const ParkinMock = jest.fn()
const ParkinTestMock = jest.fn()
const globalObj = {
  PK: {
    init: jest.fn()
  },
  Parkin: function() {
    ParkinMock()
    return ParkinInstance
  },
  ParkinTest: function() {
    ParkinTestMock()
    return ParkinTestInstance
  },
  PTE: {
    setConfig: jest.fn()
  }
}

const resolveGlobalObjMock = jest.fn(() => globalObj)
jest.setMock('../../utils/globalScope', {
  resolveGlobalObj:resolveGlobalObjMock
})


const {
  initPK,
  getParkinTest,
  getPTE,
  getPK,
  getParkin
} = require('../instance')


describe(`instance`, () => {
  
  beforeEach(() => {
    
  })
  
  afterAll(() => {
    
  })

  describe(`initPK`, () => {

    beforeEach(() => {
      resolveGlobalObjMock.mockClear()
      globalObj.PK.init.mockClear()
    })

    it(`It should get the PK instance by calling resolveGlobalObj helper`, async () => {
      expect(resolveGlobalObjMock).not.toHaveBeenCalled()
      initPK(world)
      expect(resolveGlobalObjMock).toHaveBeenCalled()
    })

    it(`It should initialize the PK instance`, async () => {
      expect(globalObj.PK.init).not.toHaveBeenCalled()
      initPK(world)
      expect(globalObj.PK.init).toHaveBeenCalled()
    })

    it(`It should return the PK instance`, async () => {
      const instance = initPK(world)
      expect(instance).toBe(globalObj.PK)
    })

  })


  describe(`getParkinTest`, () => {

    beforeEach(() => {
      resolveGlobalObjMock.mockClear()
      ParkinTestMock.mockClear()
    })

    it(`It should get the ParkinTest instance by calling resolveGlobalObj helper`, async () => {
      expect(resolveGlobalObjMock).not.toHaveBeenCalled()
      getParkinTest({})
      expect(resolveGlobalObjMock).toHaveBeenCalled()
    })

    it(`It should create a new instance of ParkinTest`, async () => {
      getParkinTest({})
      expect(ParkinTestMock).toHaveBeenCalled()
    })

    it(`It should return an instance of ParkinTest`, async () => {
      const instance = getParkinTest({})
      expect(instance).toBe(ParkinTestInstance)
    })

  })

  describe(`getPTE`, () => {

    beforeEach(() => {
      resolveGlobalObjMock.mockClear()
      globalObj.PTE.setConfig.mockClear()
    })

    it(`It should get the PK instance by calling resolveGlobalObj helper`, async () => {
      expect(resolveGlobalObjMock).not.toHaveBeenCalled()
      getPTE(world)
      expect(resolveGlobalObjMock).toHaveBeenCalled()
    })

    it(`It should return the PTE instance`, async () => {
      const instance = getPTE({})
      expect(instance).toBe(globalObj.PTE)
    })

    it(`It should call PTE.setConfig with the passed in config`, async () => {
      const config = {}
      getPTE(config)
      expect(globalObj.PTE.setConfig).toHaveBeenCalledWith(config)
    })

  })

  describe(`getPK`, () => {

    beforeEach(() => {
      resolveGlobalObjMock.mockClear()
    })

    it(`It should get the PK instance by calling resolveGlobalObj helper`, async () => {
      expect(resolveGlobalObjMock).not.toHaveBeenCalled()
      getPK(world)
      expect(resolveGlobalObjMock).toHaveBeenCalled()
    })

    it(`It should return the PK instance`, async () => {
      const instance = getPK(world)
      expect(instance).toBe(globalObj.PK)
    })

  })

  describe(`getParkin`, () => {

    beforeEach(() => {
      resolveGlobalObjMock.mockClear()
      ParkinMock.mockClear()
    })

    it(`It should get the Parkin instance by calling resolveGlobalObj helper`, async () => {
      expect(resolveGlobalObjMock).not.toHaveBeenCalled()
      getParkin({})
      expect(resolveGlobalObjMock).toHaveBeenCalled()
    })

    it(`It should create a new instance of Parkin`, async () => {
      getParkin({})
      expect(ParkinMock).toHaveBeenCalled()
    })

    it(`It should return an instance of Parkin`, async () => {
      const instance = getParkin({})
      expect(instance).toBe(ParkinInstance)
    })

  })

})