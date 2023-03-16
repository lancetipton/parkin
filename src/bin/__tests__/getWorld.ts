jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

import path from 'path'
import { homedir } from 'os'

const rootDir = path.join(__dirname, `../../../`)
let mockRootDir = rootDir

const mockfullLoc = jest.fn((loc:string) => {
  const root = mockRootDir || process.cwd()
  return path.join(root, loc)
})

jest.setMock(`../../__mocks__/mockWorld`, {
  app: {
    url: `http://my.url.com`
  }
})

jest.setMock('../helpers', {
  fullLoc: mockfullLoc
})

jest.setMock('../paths', {
  cwd: process.cwd(),
  homeDir: homedir(),
  getRoot: jest.fn(() => mockRootDir),
})

const { getWorld } = require('../getWorld')

describe(`getWorld`, () => {

  beforeEach(() => {
    mockRootDir = undefined
    mockfullLoc.mockClear()
  })

  it(`should get the full location by calling fullLoc from helpers`, async () => {
    await getWorld({ world: `src/__mocks__/mockWorld.ts` })
    expect(mockfullLoc).toHaveBeenCalled()
  })

  it(`should get load the correct world file`, async () => {
    const world = await getWorld({ world: `src/__mocks__/mockWorld.ts` })
    expect(world.app.url).toBe(`http://my.url.com`)
  })

  it(`should not try to load the world file when the option is not passed`, async () => {
    await getWorld({})
    expect(mockfullLoc).not.toHaveBeenCalled()
  })

})