export type TWorldApp = {
  url?: string
  [key:string]: any
}

export type TWorldConfig = {
  url?:string
  app?: TWorldApp
  merge?: string[]
  environment?: string
  data?: Record<string, any>
  $alias: Record<string, any>
  context?: Record<string, any>
}
