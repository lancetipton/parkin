jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { PromiseTimeout } = require('../promiseTimeout')

describe(`PromiseTimeout`, () => {
  it(`should not throw when the promise finishes before the timer`, (done) => {
    const timeout = 1000
    const testFn = jest.fn()
    const promise = new Promise((res) => setTimeout(() => {
      testFn()
      res(true)
    }, 500))
    
    return PromiseTimeout({promise, timeout})
      .then(() => expect(testFn).toHaveBeenCalled())
      .finally(() => done())
  })

  it(`should throw when the timer finishes before the promise`, (done) => {
    const timeout = 500
    const testFn = jest.fn()
    const promise = new Promise((res) => setTimeout(() => {
      testFn()
      res(true)
    }, 1000))
    
    return PromiseTimeout({promise, timeout})
      .catch((err) => {
        expect(testFn).not.toHaveBeenCalled()
        expect(err.name).toBe(`TimeoutError`)
        expect(err.message).toBe(`The method timed out after 500 ms.`)
      })
      .finally(() => done())
  })

})
