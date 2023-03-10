import { TWorldConfig } from './world.types'

export type TTransformer = (arg:string, world?:TWorldConfig) => any

export type TTypeModel = {
  type: string,
  name: string,
  regex: string,
  partial?: string,
  useForSnippets?: boolean,
  transformer: TTransformer
  preferForRegexpMatch?: boolean,
}