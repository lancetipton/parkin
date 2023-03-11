import { TWorldConfig } from './world.types'

import type { EExpParmType } from './steps.types'


export type TTransformer = (arg:string, world?:TWorldConfig) => any

export type TParamTypeModel = {
  regex: RegExp | string
  useForSnippets?: boolean
  partial?: RegExp | string
  type: EExpParmType|string
  name: EExpParmType|string
  transformer: TTransformer
  preferForRegexpMatch?: boolean
}

export type TParamTypeMap = Record<EExpParmType|string, TParamTypeModel>

export type TParamTypes = {
  register: (paramType:TParamTypeModel, key?:string) => TParamTypeMap
}