import type { TWorldConfig } from './world.types'
import type { TMatchResp } from './parkin.types'
import type { TStepDefs, TStepDef } from './features.types'

export type TStepAction = (...args:any[]) => any
export type TRegisterStepMethod = (step:string, action:TStepAction) => any
export type TRegisterStepMap = Record<string, TRegisterStepMethod>
export type TRegisterStepsList = Record<`given`|`when`|`then`|`and`|`but`, TRegisterStepMap>

export type TAddStepDefs = TStepDef|TStepDef[]|Record<string, TStepDef>
export type TRegisterOrAddStep = TAddStepDefs|TRegisterStepsList

export interface IParkinSteps {
  world:TWorldConfig
  clear: () => void
  list:() => TStepDefs
  But:TRegisterStepMethod
  And:TRegisterStepMethod
  When:TRegisterStepMethod
  Then:TRegisterStepMethod
  Given:TRegisterStepMethod
  typeList: () => TStepDefs
  resolve:(match:string) => any
  match: (match:string) => TMatchResp
  register:(def:string|TStepDef[]|TStepDef, match:string, TStepAction) => void
}