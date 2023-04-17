import { TStepDef } from './steps.types'
import { EPartMatchTypes } from './parkin.types'

export type TFindOpts = {
  partial?: boolean
}

export type TTokenOpts = TFindOpts & {
  include?:EPartMatchTypes[]
  exclude?:EPartMatchTypes[]
}

export type TRegExFoundResp = {
  definition?:TStepDef
  match?:string[]
}