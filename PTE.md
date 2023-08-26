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

### Hooks

* There are four different types of hooks that can be registered.
* Additionally Each hook is registered to its parent describe block, or the root describe block, if called outside.
* The hook call order follows the following pattern
  * Before hooks **outside** of a describe block will **always** be called **first**
  * Before hooks **inside** of a describe block will **always** be called **after** any parent before hooks
  * After hooks **inside** of a describe block will **always** be called **after** any tests within the same parent
  * After hooks **outside** of a describe block will **always** be called **last**

* **beforeAll**
  * Always called before **all children** within the **same parent**
  * Is called only **once**
  * If the hook throws an error, no other **children** of the same parent will be called
* **beforeEach**
  * Called before **each child** within the **same parent**
  * Is called multiple times, **once per-child**
  * If the hook throws an error, no other **children** of the same parent will be called
* **afterAll**
  * Always called after **all children** within the **same parent**
  * Even if a child fails, or throws an error, the **afterAll** will still be called
  * For child **afterAll** hooks, If a **before** hook throws an error, the hook will **not** be called
  * If a root **afterAll** hook exists, it will **always** be called
* **afterEach**
  * Always called after **each child** within the **same parent**
  * Even if a child fails, or throws an error, the **afterEach** will still be called
  * If a **before** hook throws an error, the **afterEach** hooks will not be called

> **IMPORTANT**
>   * If a test run is aborted, the **afterEach** and **afterAll** hooks will not be called


## Execution order

* Parkin Test Executer (PTE) executes all `describe` handler as soon as the `PTE.describe` method is called. This is in contrast to `PTE.test` and `PTE.<hook>` handlers which are executed when the `PTE.run` method is called. This is a good reason to do all test setup and teardown inside `before*` and `after*` hooks rather than directly inside the `describe` handler.
  * This allows building a tree of `tests` and `hooks` based on the order in which their parent `describe` method was called
    * This is similar to the `prepare` or `plan` method of some test frameworks, it just happends automatically
    * Then, when the `PTE.run` method is called, it executes the tree in the same the `tests` and `hooks` were added
* By default PTE runs all the tests serially in the order they were encountered durning the initial `describe` handler execution.
  * As tests are run, it will wait for each `test` handler to complete before moving on to the next.

## Example

```js

import { ParkinTest } from 'parkin/test'

const PTE = new ParkinTest()
const { describe, test, it, beforeAll, beforeEach, afterAll, afterEach } = PTE

describe(`describe-1`, () => {

  it(`test-1-1`, () => console.log(`call #3`))

  describe(`describe-1-2`, () => {

    afterAll(() => console.log(`call #6`))

    it(`test-1-2-1`, () => console.log(`call #5`))
  })
  
  beforeAll(() => console.log(`call #1`))
  beforeEach(() => console.log(`call #2 & #4`))

})

// Output
call #1 // - beforeAll
call #2 & #4 // - beforeEach
call #3 // - test-1-1
call #2 & #4 // - beforeEach
call #5 // - test-1-2-1
call #6 // - afterAll
```

