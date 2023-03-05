jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()
import path from 'path'
import { homedir } from 'os'
import { setRoot, cwd } from '../paths'


const dockSteps = path.resolve(__dirname, `../../__mocks__/steps/docSteps`)
const basicSteps = path.resolve(__dirname, `../../__mocks__/steps/basicSteps`)

const fullRootDir = path.join(__dirname, `../../../`)
const mockLocsByTypes = jest.fn(() => ([
  `${dockSteps}.js`,
  `${basicSteps}.js`
]))

const mockFullLoc = jest.fn((loc:string) => loc)

jest.setMock(`../helpers`, {
  fullLoc: mockFullLoc,
  locsByTypes: mockLocsByTypes,
})

const defList = {
  [`given`]: [
    {
      match: `I am a test step 1`,
      method: () => {}
    },
    {
      match: `I am a test step 2`,
      method: () => {}
    },
  ],
  [`when`]: [
    {
      match: `I am a test step 3`,
      method: () => {}
    },
    {
      match: `I am a test step 4`,
      method: () => {}
    },
  ]
}

const typeList = jest.fn(() => defList)

jest.setMock(`../instance`, {
  getPK: jest.fn(() => ({ steps: { typeList } }))
})

let mockRootDir:string
jest.setMock('../paths', {
  setRoot,
  cwd: process.cwd(),
  homeDir: homedir(),
  getRoot: jest.fn(() => mockRootDir),
})

const { getDefs } = require('../getDefs')

const opts = [
  {
    defs: [],
    world: ``,
    rootDir:``,
    features:[],
  },
  {
    defs: [],
    world: ``,
    rootDir:``,
    features:[],
    ext: `.parkin`,
    exts: [`.test`]
  },
  {
    defs: [fullRootDir],
    world: ``,
    rootDir:``,
    features:[],
  },
  {
    defs: fullRootDir,
    world: ``,
    rootDir:``,
    features:[],
  },
]


describe(`getDefs`, () => {
  
  beforeEach(() => {
    mockLocsByTypes.mockClear()
    mockFullLoc.mockClear()
  })
  
  afterAll(() => {
    setRoot(undefined, true)
  })

  it(`should should call locsByTypes with cwd when not rootDir is set when no defs passed`, async () => {
    await getDefs(opts[0])
    expect(mockLocsByTypes).toHaveBeenCalled()
    const [loc] = mockLocsByTypes.mock.calls[0]

    expect(loc).toEqual(cwd)
  })


  it(`should should call locsByTypes with rootDir when it is set`, async () => {
    mockRootDir = `/some/root/dir`
    await getDefs(opts[0])
    expect(mockLocsByTypes).toHaveBeenCalled()
    const [loc] = mockLocsByTypes.mock.calls[0]
    expect(loc).toBe(`/some/root/dir`)
  })

  it(`should use the default ext when loading the definitions`, async () => {
    await getDefs(opts[0])
    expect(mockLocsByTypes).toHaveBeenCalled()
    const [_, loadOpts] = mockLocsByTypes.mock.calls[0]
    expect(loadOpts.exts).toEqual(expect.arrayContaining([
      `.js`,
      `.ts`,
      `.cjs`,
      `.ejs`,
      `.tsx`,
      `.jsx`,
    ]))
  })

  it(`should use merge the default ext with the passed in exts`, async () => {
    await getDefs(opts[1])
    expect(mockLocsByTypes).toHaveBeenCalled()
    const [_, loadOpts] = mockLocsByTypes.mock.calls[0]
    expect(loadOpts.exts).toEqual(expect.arrayContaining([
      `.js`,
      `.ts`,
      `.cjs`,
      `.ejs`,
      `.tsx`,
      `.jsx`,
      `.test`,
      `.parkin`
    ]))
  })

  it('should return the step definitions when they are passed as an array', async () => {
    const res = await getDefs(opts[2])
    
    expect(res).toEqual({
      given: {
        'I am a test step 1': defList.given[0].method,
        'I am a test step 2': defList.given[1].method
      },
      when: {
        'I am a test step 3': defList.when[0].method,
        'I am a test step 4': defList.when[1].method
      }
    })
  })

  it('should work when defs options is a string', async () => {
    const res = await getDefs(opts[3])
    
    expect(res).toEqual({
      given: {
        'I am a test step 1': defList.given[0].method,
        'I am a test step 2': defList.given[1].method
      },
      when: {
        'I am a test step 3': defList.when[0].method,
        'I am a test step 4': defList.when[1].method
      }
    })
  })



})