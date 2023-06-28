
export type TParkinOpts = TLoadOpts & {
  world?: string
  rootDir?:string
  config?:string
  defs?:string|string[]
  features?: string|string[]
}

export type TLoadOpts = {
  ext?:string
  exts?:string[]
  timeout?:number
  exclude?: string[]
  include?: string[]
}
