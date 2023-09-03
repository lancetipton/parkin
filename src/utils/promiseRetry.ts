import { wait } from "@keg-hub/jsutils"
import { TPromiseRetry } from "../types"
import { RetryError, throwAbortError } from './errors'

// import { TAbortPromise } from "../types"
// import { PromiseAbort } from './promiseAbort'
// ----- Uncomment to add a PromiseAbort wrapper -----
// Still working out how to do this properly, needs some work
// export const PromiseRetry = <T=any>(opts:TPromiseRetry<T>): TAbortPromise<T> => {
//   return PromiseAbort({
//     promise: (args) => loopRetry({...opts, ...args}, opts?.retry || 0)
//   })
// }

const loopRetry = async <T=any>(opts:TPromiseRetry<T>, orgRetry?:number): Promise<T> => {
  const {
    delay=0,
    retry=0,
    onRetry,
    controller,
    promise:fn,
    shouldAbort,
  } = opts

  const signal = controller?.signal

  try {
    const resp = await fn(opts)
    return signal?.aborted || shouldAbort?.()
      ?  throwAbortError()
      : resp
  }
  catch (err) {
    if(signal?.aborted || shouldAbort?.()) return throwAbortError()

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

