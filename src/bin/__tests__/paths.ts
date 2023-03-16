jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

import { homedir } from 'os'
import path from 'path'

const homeDir = homedir()
const workDir = process.cwd() 

const { checkRootDir, setRoot, getRoot } = require('../paths')


describe(`paths`, () => {
  
  beforeEach(() => {
    setRoot(undefined, true)
  })
  
  afterAll(() => {
    setRoot(undefined, true)
  })
  
  describe(`setRoot`, () => {
    beforeEach(() => {
      setRoot(undefined, true)
    })

    it(`should set the cached root directory`, () => {

      expect(getRoot()).toBe(undefined)
      setRoot(`/some/root/path`)
      expect(getRoot()).toBe(`/some/root/path`)

    })

    it(`should not allow setting the root when its already test`, () => {
      setRoot(`/some/root/path`)
      expect(getRoot()).toBe(`/some/root/path`)

      setRoot(`/should/not/be/set`)
      expect(getRoot()).toBe(`/some/root/path`)
    })

    it(`should allow setting the root when its already test and force is passed`, () => {
      setRoot(`/some/root/path`)
      expect(getRoot()).toBe(`/some/root/path`)

      setRoot(`/should/be/set`, true)
      expect(getRoot()).toBe(`/should/be/set`)
    })

    it(`should check the passed in root and resolve the full path`, () => {
      setRoot(`~/some/loc`, true)
      expect(getRoot()).toBe(path.join(homeDir, `some/loc`))

      setRoot(`/some/loc`, true)
      expect(getRoot()).toBe(`/some/loc`)

      const cwd = getRoot()
      setRoot(`some/loc`, true)
      expect(getRoot()).toBe(path.join(workDir, `some/loc`))
    })
    
  })

})