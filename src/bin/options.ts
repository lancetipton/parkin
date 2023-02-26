
export const options = {
  features: {
    type: `array`,
    alias: [ `files`, `file`, `fl`, `feature`, `feat`, `ft`]
  },
  defs: {
    type: `array`,
    alias: [`definitions`, `dfs`, `df`, `steps`, `step`, `st`]
  },
  world: {
    alias: [`wld`, `wd`]
  },
  rootDir: {
    alias: [`root`, `rt`]
  },
  ext: {
    alias: [`ex`]
  },
  exts: {
    type: `array`,
    alias: [`exs`]
  },
  exclude: {
    type: `array`,
    alias: [`exc`, `skip`, `ignore`]
  },
  include: {
    type: `array`,
    alias: [`in`, `only`]
  },
  timeout: {
    default: 5000,
    type: `number`,
    alias: [`time`],
  }
}
