import { wait } from "@keg-hub/jsutils"
import { TPromiseRetry, TRunResults } from "../types"

class RetryError extends Error {
  results?:TRunResults
  constructor(err:Error, message?:string, retry?:number) {
    super(message || err.message)
    this.stack = err.stack
    // Only overwrite the default Error name when retry was actually set
    // Keep custom named errors incase they are depended on
    this.name = !retry ? err.name : this.constructor.name

    if(message) this.cause = err.message
    if((err as RetryError).results) this.results = (err as RetryError).results
  }
}

const loopRetry = async <T=any>(opts:TPromiseRetry<T>, orgRetry?:number): Promise<T> => {
  const fn = opts.promise
  const onRetry = opts?.onRetry
  const delay = opts?.delay || 0
  const retry = opts?.retry || 0

  try {
    return await fn()
  }
  catch (err) {
    if (retry <= 0) throw new RetryError(err, opts?.error, orgRetry)

    const next = {...opts, retry: retry - 1}
    onRetry && await onRetry?.(next)
    delay && await wait(delay)

    return loopRetry(next, orgRetry)
  }
}

export const PromiseRetry = async <T=any>(opts:TPromiseRetry<T>): Promise<T> => loopRetry(
  opts,
  opts?.retry || 0
)

