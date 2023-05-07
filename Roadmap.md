# Roadmap

## Parkin

* Investigate migrating to monorepo, with these packages
  * `parkin-cli` - Command line CLI for executing `Parkin` methods
    * Runner to execute feature files from the command line 
    * Parse a feature file into an AST and export it to stdout, or file
    * Validates a feature file
    * Formats a features file - Need to investigate
  * `parkin-test` - Cross platform test executor with a subset of the `Jest` API
    * Replacement for `Jest` in the browser
  * `parkin-parser` - Core features and definition parser
  * `parkin-pretty` - Formats features files to be pretty
  * `parkin-runner` - Runs the features using the registered definitions
    * Integrates with any test framework that provides `describe` and `test` methods
    * For example `Jest`, `Mocha`, `Jasmine`, and `parkin-test`,
* Update Readme to match with current Parkin API
  * Missing a number of methods and models
  * Investigate moving to the doc folder, and include in demo website

### Parsing

* Add a `Debug` method that works just like the `Given`, `When`, `Then` methods
  * Pass an option to Runner that defines when it runs
    * Allows skipping specific environments
    * This allows registering steps that will not run in specific environments
      * Used for things like logging the world object || pausing on step execution
  * Works like a `@<TAG>` but is passed as an option
* Add better parsing for User story section of a feature
  * Should include any content after the `Feature:` key up to the next found keyword
  * Should parse it out into a user story if the content follows that format
* Finish data tables and dock strings parsing
  * Currently only partially parsed
  * Need to add data table helper methods for access from definition method

### Runner

* Integrate with data tables and dock strings as arguments
* Update to accept environment specific actions

### Definitions
* Add data table helper methods for access from definition method

### Test

* Add `each` methods to `describe` and `test` to match `Jest` API

## Parkin CLI

### Test
* Add tests for `src/bin` folder code
* Add more features and definitions for examples of using the CLI

### NPM Package

* Create separate export for parkin in /.bin folder that includes it's own package.json
* Create a new npm package for Parkin CLI
  * In a cmd line executor
  * Uses code from `src/bin` folder
  * Is published separately from main Parkin lib
  * Maybe convert parkin to mono-repo?

## Jest

* Setup way to use Jest instead of PTE as test runner based on task option
* Add Reporters, try to reuse Jest / Jasmine Reporter

