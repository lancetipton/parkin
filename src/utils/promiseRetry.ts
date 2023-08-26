import { wait } from "@keg-hub/jsutils"
import { TPromiseRetry } from "../types"


class RetryError extends Error {
  constructor(err:Error, message?:string) {
    super(message || err.message)
    this.stack = err.stack

    // Only overwrite the default Error name
    // Keep custom named errors incase they are depended on
    this.name = err.name !== `Error` ? err.name : this.constructor.name

    if(message) this.cause = err.message
  }
}


export const PromiseRetry = async <T=any>(opts:TPromiseRetry<T>): Promise<T> => {
  const fn = opts.promise
  const onRetry = opts?.onRetry
  const delay = opts?.delay || 0
  const retry = opts?.retry || 0

  try {
    return await fn()
  }
  catch (err) {
    if (retry <= 0) throw new RetryError(err, opts?.error)

    const next = {...opts, retry: retry - 1}
    onRetry && await onRetry?.(next)
    delay && await wait(delay)

    return PromiseRetry(next)
  }
}



