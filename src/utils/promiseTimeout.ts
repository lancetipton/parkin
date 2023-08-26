import { TPromiseTimeout } from "../types"

class TimeoutError extends Error {
  constructor(message:string, name?:string) {
    super(message)
    this.name = name || this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}


export const PromiseTimeout = async <T=any>({
  name,
  error,
  promise,
  timeout=5000,
}:TPromiseTimeout<T>):Promise<T> => {
  const method = name ? `${name} method` : `method`

  let timer:NodeJS.Timeout
  const timePromise = new Promise((res, rej) => {
    timer = setTimeout(() => rej(
      new TimeoutError(
        error || `The ${method} timed out after ${timeout} ms.`,
        `TimeoutError`
      )
    ), timeout)
  })

  return await Promise.race([promise, timePromise] as [Promise<T>, Promise<any>])
    .finally(() => clearTimeout(timer))
}
