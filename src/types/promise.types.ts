export type TAbortSignal = {
  signal:AbortSignal
}

export type TPromiseAbort<T=any> = {
  controller?:AbortController
  promise:(opts:TAbortSignal, ...args:any[]) => Promise<T>
}

export type TAbortPromise<T=any> = (Promise<T> & {
  abort:() => void
  controller:AbortController
})


export type TPromiseRetryCB<T=any> = (opts:TPromiseRetry<T>) => Promise<T>

export type TPromiseRetry<T=any> = {
  error?:string
  retry?:number
  delay?: number
  shouldAbort?:() => boolean
  promise:TPromiseRetryCB<T>
  controller?:AbortController
  onRetry?:(opts:TPromiseRetry<T>) => any
}

export type TPromiseTimeout<T=any> = {
  name?:string
  error?:string
  timeout:number
  promise:Promise<T>
  shouldAbort?:() => boolean
}
