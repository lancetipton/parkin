jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { PromiseRetry } = require('../promiseRetry')

describe(`PromiseRetry`, () => {
  it(`should not throw, and instead resolve on the second retry`, async () => {
    const retry = 3
    let called = 0

    const promise = () => {
      return new Promise((res) => {
        if(called >= 3) return res(true)

        called = called + 1
        throw new Error()
      })
    }
    
    return await PromiseRetry({
      retry,
      promise,
    })
      .then(() => expect(called).toBe(3))

  })

  it(`should call the onRetry callback for every retry`, async () => {
    const retry = 3
    let called = 0

    const promise = () => {
      return new Promise((res) => {
        if(called >= 3) return res(true)

        called = called + 1
        throw new Error()
      })
    }
    
    const onRetry = jest.fn()
    
    return await PromiseRetry({
      retry,
      promise,
      onRetry,
    })
      .then(() => expect(onRetry).toHaveBeenCalledTimes(3))

  })

  it(`should throw when there are no more retries`, (done) => {
    const retry = 3

    const promise = () => {
      return new Promise((res) => {
        throw new Error()
      })
    }

    PromiseRetry({promise, retry})
      .catch((err:Error) => {
        expect(err.name).toBe(`RetryError`)
        // Ensure the stacktrace does not include the PromiseRetry code
        // The first line should be from the original caller, i.e. this file
        expect(err.message.split(`\n`)[0].includes(`__tests__/promiseRetry.ts`))
      })
      .finally(() => done())
  })


  it(`should not retry when no reties are passed`, (done) => {
    const retry = 0
    const onRetry = jest.fn()
    const inside = jest.fn()

    const promise = () => {
      return new Promise((res) => {
        inside()
        throw new Error()
      })
    }

    PromiseRetry({promise, retry, onRetry})
      .catch((err:Error) => {
        expect(inside).toHaveBeenCalledTimes(1)
        expect(onRetry).not.toHaveBeenCalled()
      })
      .finally(() => done())
  })

})
