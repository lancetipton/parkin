# Parkin Test Executer
* Parkin Test Executer (PTE) is a Node.js and Browser Test runner, with a similar API to [Jest](https://jestjs.io/) or [Vitest](https://vitest.dev/)
* **It is not designed to be a full Testing Suite replacement**
* Instead acts as fallback for Parkin when no other Testing Suite is defined
* Because of this, it has a smaller feature set, only implementing features required by Parkin


## Use
```js
// With esm imports
import { ParkinTest } from 'parkin/test'

// Or with cjs require
const { ParkinTest } = require('parkin/test')

// ParkinTest is a class, so you should create a new instance of it before using
const PTE = new ParkinTest()
const { describe, test, it, beforeAll, beforeEach, afterAll, afterEach } = PTE

describe(`Test the thing`, () => {
  it(`should work`, () => {
    // ...write your test
  })
})
```

### Global Scope
* In many test frameworks, many of the methods such as `describe` and `test` are automatically added to the global scope
  * This allows calling them with out needing to first import them as shown in the [Use section](#use)
* `ParkinTest` does not do this by **default**, but it can be accomplished by one of the following:
  * Adding `import '@ltipton/parkin/global' || require('@ltipton/parkin/global')` at the top of a file
  * Setting the environment variable `PARKIN_TEST_GLOBALS` before importing Parkin at some point in time
    * Example: `PARKIN_TEST_GLOBALS=true node ./tests/index.js`
      * Here we assume `./tests/index.js` imports the `@ltipton/parkin` library
* If using another framework such as [Jest](https://jestjs.io/), and the ParkinTest globals are imported
  * They will **NOT** override the existing global methods by default
  * If needed, the global methods can be overridden in one of the following ways
    *  Setting `PARKIN_TEST_GLOBALS_OVERRIDE=true` before importing them
      * Example: `process.env.PARKIN_TEST_GLOBALS_OVERRIDE = true; import '@ltipton/parkin/global'`
    *  Calling the returned `setParkinTestGlobals` method from the Parkin Global import
       * Example: `require('@ltipton/parkin/global').setParkinTestGlobals()`


## Execution order
* Parkin Test Executer (PTE) executes all `describe` handler as soon as the `PTE.describe` method is called. This is in contrast to `PTE.test` actions which are executed when the `PTE.run` method is called. This is a good reason to do all test setup and teardown inside `before*` and `after*` hooks rather than directly inside the `describe` handler.
* By default PTE runs all the tests serially in the order they were encountered durning the initial `describe` handler execution. As tests are run, it will wait for each `test` handler to complete before moving on to the next `test` handler.
