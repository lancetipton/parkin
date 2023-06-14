
import type { TStepDefMethod, TStepMeta, TStepDef } from './steps.types'
import type { EStepMethodType } from './helpers.types'

export type TTempRegisterArgs = [
  match:string,
  method:TStepDefMethod,
  meta:TStepMeta
]

export type TTempContainer = Record<EStepMethodType, TStepDef[]>
