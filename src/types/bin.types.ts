
export type TParkinOpts = TLoadOpts & {
  world?: string
  rootDir?:string
  defs?:string|string[]
  features?: string|string[]
}

export type TLoadOpts = {
  ext?:string
  exts?:string[]
  exclude?: string[]
  include?: string[]
  timeout?:number
}
