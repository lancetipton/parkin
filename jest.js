
/*
 * Simple polyfill for jest when in a browser context.
 * For example purposes only, for real apps use something like jest-lite
 * Overrides required - "describe" and "test"
 * Methods from other test frameworks could implemented using this pattern
 */
(() => {

  const isFunc = item => typeof item === 'function'

  window.describe = (message, method) => {
    console.log(message)
    isFunc(method) && method()
  }

  window.test = (message, method) => {
    console.log(message)
    isFunc(method) && method(() => {})
  }

  window.beforeAll = (method) => {
    isFunc(method) && method()
  }
  window.afterAll = (method) => {
    isFunc(method) && method()
  }
  window.beforeEach = (method) => {
    isFunc(method) && method()
  }
  window.afterEach = (method) => {
    isFunc(method) && method()
  }

})()