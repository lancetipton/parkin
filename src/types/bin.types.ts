
export type TParkinOpts = TLoadOpts & {
  name?:string
  feature?:string
  world?: string
  rootDir?:string
  config?:string
  exitOnFailed?:boolean
  skipAfterFailed?:boolean
  defs?:string|string[]
  features?:string|string[]
  filter?:string|string[]
  disabled?:string|string[]
}

export type TLoadOpts = {
  ext?:string
  exts?:string[]
  timeout?:number
  exclude?: string[]
  include?: string[]
}
