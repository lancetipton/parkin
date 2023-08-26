export type TPromiseRetryCB<T> = (...args:any[]) => Promise<T>

export type TPromiseRetry<T> = {
  error?:string
  retry?:number
  delay?: number
  promise:TPromiseRetryCB<T>
  onRetry?:TPromiseRetryCB<T>
}


export type TPromiseTimeout<T> = {
  name?:string
  error?:string
  timeout:number
  promise:Promise<T>
}
