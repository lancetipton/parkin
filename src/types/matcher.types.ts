import { TStepDef } from './steps.types'
import { EPartMatchTypes } from './parkin.types'
import {TWorldConfig} from './world.types'
import {TParamTypeModel} from './paramTypes.types'

export type TFindOpts = {
  partial?: boolean
  parseParams?:boolean
  worldReplace?:boolean
}

export type TTokenOpts = TFindOpts & {
  include?:EPartMatchTypes[]
  exclude?:EPartMatchTypes[]
}

export type TRegExFoundResp = {
  definition?:TStepDef
  match?:string[]
}

export type TParseParams = {
  text:string
  match:string[]
  opts:TFindOpts
  definition:TStepDef
  $world?:TWorldConfig
  transformers:TParamTypeModel[]
}
