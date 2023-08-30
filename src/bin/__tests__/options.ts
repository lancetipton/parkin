jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { options:cliOptions } = require('../options')

const allowOpts = [
  `features`,
  `defs`,
  `world`,
  `rootDir`,
  `ext`,
  `exts`,
  `exclude`,
  `include`,
  `timeout`,
  `config`,
  `disabled`,
  `filter`,
  `name`,
  `exitOnFailed`,
  `skipAfterFailed`
]

const allowedTypes = [
  `bool`,
  `boolean`,
  `string`,
  `array`,
  `number`,
  `object`
]

type TOption = {
  default?:any
  type?: string
  alias: string[]
}

describe(`options`, () => {
  it(`should be a list of allow command line options`, () => {
    Object.entries(cliOptions).map(([key, value]:[string, TOption]) => {
      expect(allowOpts.includes(key)).toBe(true)
      expect(Array.isArray(value.alias)).toBe(true)

      if(value.type) expect(allowedTypes.includes(value.type)).toBe(true)
      if(value.default)
        value.type === `array`
          ? expect(Array.isArray(value.default)).toBe(true)
          : expect(typeof value.default).toBe(value.type || `string`)
    })
  })
})
