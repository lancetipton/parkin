jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

import path from 'path'

const rootDir = `/my/root/dir`
const mockHelpers = {
  locsByTypes: jest.fn((loc:string, opts:any) => {
    return [loc]
  }),
  fullLoc: jest.fn((loc:string) => path.join(rootDir, loc))
}

const pathsMock = {
  rootDir,
  cwd: path.join(rootDir, `cwd`),
}
jest.setMock('../paths', pathsMock)

jest.setMock('../helpers', mockHelpers)

// const mockUtils = {
//   ensureArr: jest.fn(),
//   flatArr: jest.fn(),
// }
// jest.setMock('@keg-hub/jsutils', mockUtils)

const { getFeatures } = require('../getFeatures')

describe('getFeatures', () => {
  afterEach(() => {
    jest.clearAllMocks()
    pathsMock.rootDir = rootDir
  })

  it('should return an array of files based on provided options', async () => {
    const loc = `my.feature`
    const result = await getFeatures({ features: [loc] }, [])
    expect(result).toEqual([path.join(rootDir, loc)])
  })

  it('should use rootDir if it exists and no paths are provided', async () => {
    const mockFilterFeatures = jest.fn().mockResolvedValue([])
    mockHelpers.locsByTypes.mockImplementation(mockFilterFeatures)
    const result = await getFeatures({}, [])
    expect(result).toEqual([])
    expect(mockFilterFeatures).toHaveBeenCalledWith(pathsMock.rootDir, {
      ext: '.feature',
    })

  })

  it('should use cwd if no paths are provided and rootDir does not exist', async () => {
    const mockFilterFeatures = jest.fn().mockResolvedValue([])
    mockHelpers.locsByTypes.mockImplementation(mockFilterFeatures)
    pathsMock.rootDir = ``
    const result = await getFeatures({}, [])
    expect(result).toEqual([])
    expect(mockFilterFeatures).toHaveBeenCalledWith(pathsMock.cwd, {
      ext: '.feature',
    })
  })

  it('should filter features by file extension .feature', async () => {
    const mockFilterFeatures = jest.fn().mockResolvedValue([])
    mockHelpers.locsByTypes.mockImplementation(mockFilterFeatures)
    const argFile = '/my/path/to/features'
    const result = await getFeatures({}, [argFile])
    expect(result).toEqual([])
    expect(mockFilterFeatures).toHaveBeenCalledWith(path.join(rootDir, argFile), {
      ext: '.feature',
      include: [argFile],
    })
  })

  it('should use options.features as the filesArr if provided', async () => {
    const mockFilterFeatures = jest.fn().mockResolvedValue([])
    mockHelpers.locsByTypes.mockImplementation(mockFilterFeatures)
    const mockOpts = {
      features: ['/path/to/feature1', '/path/to/feature2'],
    }

    const result = await getFeatures(mockOpts, [])
    expect(result).toEqual([])
    expect(mockFilterFeatures).toHaveBeenCalledWith(path.join(rootDir, '/path/to/feature1'), {
      ext: '.feature',
      ...mockOpts
    })
    expect(mockFilterFeatures).toHaveBeenCalledWith(path.join(rootDir, '/path/to/feature2'), {
      ext: '.feature',
      ...mockOpts
    })
  })

  it('should find features from args if provided and no options.features and ignore non file arguments ', async () => {
    const mockFilterFeatures = jest.fn().mockResolvedValue([])
    mockHelpers.locsByTypes.mockImplementation(mockFilterFeatures)
    const mockOpts = {}
    const argFile = '/path/to/feature3'
    const mockArgs = ['-i', 'myInclude', argFile]

    const result = await getFeatures(mockOpts, mockArgs)
    expect(result).toEqual([])

    expect(mockFilterFeatures).toHaveBeenCalledWith(path.join(rootDir, argFile), {
      ext: '.feature',
      include: [argFile],
    })
    
  })

})