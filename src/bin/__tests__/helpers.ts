jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

import path from 'path'
import { homedir } from 'os'
import { setRoot } from '../paths'

const mockGetAllFiles = jest.fn((location:string, opts:Record<any, any>) => {
  return {
    toArray: jest.fn(() => Promise.resolve([
      `/some/test/dir/file1.js`,
      `/some/test/dir/file2.feature`,
      `/some/test/dir/file3.png`,
      `/some/test/dir/file4.feature`,
    ]))
  }
})

let mockRootDir:string

jest.setMock('../paths', {
  cwd: process.cwd(),
  homeDir: homedir(),
  getRoot: jest.fn(() => mockRootDir),
})

jest.setMock('get-all-files', {
  // @ts-ignore
  getAllFiles: mockGetAllFiles
})


const { locsByTypes, fullLoc, removeExt } = require('../helpers')


describe(`helpers`, () => {

  afterAll(() => {
    setRoot(undefined, true)
    mockGetAllFiles.mockClear()
  })

  describe(`locsByTypes`, () => {
    
    beforeEach(() => {
      mockGetAllFiles.mockClear()
    })
    
    it(`should load files by calling getAllFiles`, async () => {
      const res = await locsByTypes(`/some/test/dir`, { ext: `feature` })

      expect(mockGetAllFiles).toHaveBeenCalled()
    })

    it(`should resolve the full path`, async () => {
      const res = await locsByTypes(`/some/test/dir`, { ext: `feature` })
      const [loc, opts] = mockGetAllFiles.mock.calls[0]
  
      expect(opts.resolve).toBe(true)
    })

    it(`should return files the match the passed in extention`, async () => {
      const res = await locsByTypes(`/some/test/dir`, { ext: `feature` })
      expect(res).toEqual([`/some/test/dir/file2.feature`, `/some/test/dir/file4.feature`])
    })

    it(`should not return a file if its in the exclude array`, async () => {
      const res1 = await locsByTypes(`/some/test/dir`, { ext: `feature`, exclude: [`file4`] })
      expect(res1).toEqual([`/some/test/dir/file2.feature`])
      const res2 = await locsByTypes(`/some/test/dir`, { ext: `feature`, exclude: [`file4.feature`] })
      expect(res2).toEqual([`/some/test/dir/file2.feature`])
      const res3 = await locsByTypes(`/some/test/dir`, { ext: `feature`, exclude: [`dir/file4`] })
      expect(res3).toEqual([`/some/test/dir/file2.feature`])
    })

    it(`should only return a files in the include array if set`, async () => {
      const res1 = await locsByTypes(`/some/test/dir`, { ext: `feature`, include: [`file4`] })
      expect(res1).toEqual([`/some/test/dir/file4.feature`])
      const res2 = await locsByTypes(`/some/test/dir`, { ext: `feature`, include: [`file4.feature`] })
      expect(res2).toEqual([`/some/test/dir/file4.feature`])
      const res3 = await locsByTypes(`/some/test/dir`, { ext: `feature`, include: [`dir/file4`] })
      expect(res3).toEqual([`/some/test/dir/file4.feature`])
      
      const res4 = await locsByTypes(`/some/test/dir`, { ext: `feature`, include: [`feature`] })
      expect(res4).toEqual([`/some/test/dir/file2.feature`, `/some/test/dir/file4.feature`])
    })


    it(`should work when exts array is passed on not a ext string`, async () => {
      const res = await locsByTypes(`/some/test/dir`, { exts: [`feature`] })
      expect(res).toEqual([`/some/test/dir/file2.feature`, `/some/test/dir/file4.feature`])
    })

    it(`should work with both an exts array and an ext string`, async () => {
      const res = await locsByTypes(`/some/test/dir`, { exts: [`feature`], ext: `png` })
      expect(res).toEqual(expect.arrayContaining([
        `/some/test/dir/file2.feature`,
        `/some/test/dir/file3.png`,
        `/some/test/dir/file4.feature`,
      ]))
    })

    it(`should return an empty array when no ext is passed in`, async () => {
      const res = await locsByTypes(`/some/test/dir`, {})
      expect(res).toEqual([])
    })

  })


  describe(`fullLoc`, () => {
    
    beforeEach(() => {
      setRoot(undefined, true)
    })
    
    it(`should resolve the full path location from the home directory`, () => {
      const res = fullLoc(`~/users/full/location`)
      expect(res).toEqual(path.join(homedir(), `users/full/location`))
    })

    it(`should not change the path, when its an absolute path`, () => {
      const res = fullLoc(`/absolute/path/location`)
      expect(res).toEqual(`/absolute/path/location`)
    })

    it(`should resolve relative to the current working directory when no rootDir is set`, () => {
      const res = fullLoc(`relative/path/location`)
      expect(res).toEqual(path.join(process.cwd(), `relative/path/location`))
    })

    it(`should resolve relative to the rootDir it is set`, () => {
      mockRootDir = `/some/root/dir`
      const res = fullLoc(`relative/path/location`)
      expect(res).toEqual(path.join(`/some/root/dir/relative/path/location`))
    })

  })

  describe(`removeExt`, () => {

    it(`should remove the extension from the passed in path`, () => {
      const res = removeExt(`remove/some/ext.ext`)
      expect(res).toEqual(`remove/some/ext`)
    })

    it(`should work when more then 1 dot is in the path`, () => {
      const res = removeExt(`remove/extra.dot/ext.ts`)
      expect(res).toEqual(`remove/extra.dot/ext`)
    })
    
    it(`should return the same string that is passed in when no ext exist`, () => {
      const res = removeExt(`remove/extra/ext`)
      expect(res).toEqual(`remove/extra/ext`)
    })

    it(`should work when dot is in the path, but no extension exists`, () => {
      const res = removeExt(`remove/has.dot/no/ext`)
      expect(res).toEqual(`remove/has.dot/no/ext`)
    })

  })

})