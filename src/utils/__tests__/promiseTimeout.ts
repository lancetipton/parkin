jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { PromiseTimeout } = require('../promiseTimeout')

describe(`PromiseTimeout`, () => {
  it(`should not throw when the promise finishes before the timer`, (done) => {
    const timeout = 1000
    const testFn = jest.fn()
    const prom = new Promise((res) => setTimeout(() => {
      testFn()
      res(true)
    }, 500))
    
    return PromiseTimeout(prom, timeout)
      .then(() => expect(testFn).toHaveBeenCalled())
      .finally(() => done())
  })

  it(`should throw when the timer finishes before the promise`, (done) => {
    const timeout = 500
    const testFn = jest.fn()
    const prom = new Promise((res) => setTimeout(() => {
      testFn()
      res(true)
    }, 1000))
    
    return PromiseTimeout(prom, timeout)
      .catch((err) => {
        expect(testFn).not.toHaveBeenCalled()
        expect(err).toBe(`The method timed out after 500 ms.`)
      })
      .finally(() => done())
  })

})
