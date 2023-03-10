import { TStepDef } from './steps.types'

export type TFindOpts = {
  partial?: boolean
}

export type TRegExFoundResp = {
  definition?:TStepDef
  match?:string[]
}