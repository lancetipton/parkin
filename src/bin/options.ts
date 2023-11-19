
export const options = {
  features: {
    type: `array`,
    alias: [ `files`, `fls`, `feats`, `fts`],
    description: `Path to a folder that contains the feature files to be run`
  },
  feature: {
    alias: [ `file`, `fl`, `feat`, `fts`],
    description: `Partial path or name of a feature file to be run`
  },
  defs: {
    type: `array`,
    alias: [`definitions`, `dfs`, `df`, `steps`, `step`, `st`],
    description: `Path to a folder that contains the step definitions for the feature files`
  },
  world: {
    alias: [`wld`, `wd`],
    description: `Path to the world file to be loaded`
  },
  rootDir: {
    alias: [`root`, `rt`],
    description: `Root directory the parkin test executor will be run from`
  },
  ext: {
    alias: [`ex`]
  },
  exts: {
    type: `array`,
    alias: [`exs`],
    description: `Array of file extensions of files that search for and loaded`
  },
  exclude: {
    type: `array`,
    alias: [`exc`, `skip`, `ignore`],
    description: `Blacklist of files or folders to NOT include in the test run`
  },
  include: {
    type: `array`,
    alias: [`in`, `only`],
    description: `Whitelist of files or folders to include in the test run`
  },
  timeout: {
    default: 5000,
    type: `number`,
    alias: [`t`, `time`],
    description: `Global test timeout`
  },
  config: {
    alias: [`c`],
    example:`--config ./parkin.ts`,
    description: `Path to parkin config file. The default export must be a parkin config Object`,
  },
  filter: {
    alias: [`f`],
    type: `array`,
    example:`--filter @feature-tag,@other-feature-tag`,
    description: `Filter which feature, rules, scenarios, or backgrounds are run based on matching tags`,
  },
  disabled: {
    alias: [`d`],
    type: `array`,
    example:`--disabled @rule-tag,@step-tag`,
    description: `Disable a tests from running based on matching tags`,
  },
  name: {
    alias: [`n`],
    type: `string`,
    example:`--name my-feature`,
    description: `Specify a name of a specific feature to run (not the file name). All other features will be skipped.`,
  },
  exitOnFailed: {
    type: `bool`,
    alias: [`eof`],
    description: `Exit test execution when a test step fails`
  },
  skipAfterFailed: {
    type: `bool`,
    alias: [`saf`],
    description: `Skip proceeding tests within the same parent when a test step fails`
  },
}
