import type {
  TAbortPromise,
  TPromiseAbort,
} from '../types'


const cleanup = <T=any>(prom:TAbortPromise<T>) => {
  if(!prom) return
  prom.abort = undefined
  prom.controller = undefined
  delete prom.abort
  delete prom.controller
}

/**
 * **WIP: This is still a work in progress and not currently being used**
 */
export const PromiseAbort = <T=any>(opts:TPromiseAbort<T>): TAbortPromise<T> => {
  const controller = opts.controller || new AbortController()
  const signal = controller.signal

  const promise = new Promise(async (res, rej) => {
    let resp:any
    let error:any
    try { resp = await opts.promise({ signal }) }
    catch(err){
      error = err
    }
    finally {
      cleanup(promise)

      return signal.aborted
        ? res(undefined)
        : error ? rej(error) : res(resp)
    }

  }) as TAbortPromise<T>

  promise.controller = controller
  promise.abort = () => {
    controller?.abort?.()
    cleanup(promise)
  }

  return promise
}
