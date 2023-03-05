import type { TWorldConfig } from './world.types'
import type { TMatchResp } from './parkin.types'
import type { EStepType } from './helpers.types'

export type TStepAction = (...args:any[]) => any
export type TRegisterStepMethod = (step:string, action:TStepAction) => any
export type TRegisterStepMap = Record<string, TRegisterStepMethod>
export type TRegisterStepsList = Record<`given`|`when`|`then`|`and`|`but`, TRegisterStepMap>

export type TStepDefsList = Record<string, TStepDef>
export type TAddStepDefs = TStepDef|TStepDef[]|TStepDefsList
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

export type TStepAst = {
  uuid: string
  index: number
  step: string
  type: EStepType
  whitespace: string
  definition?:string
  table?: TStepTable
  doc?: any
}

export enum EStepVariant {
  regex = 'regex',
  expression = 'expression'
}

export type TStepToken = {
  [key:string]: any
}

export enum EStepKey {
  given=`given`,
  when=`when`,
  then=`then`,
  and=`and`,
  but=`but`,
  Given=`given`,
  When=`when`,
  Then=`then`,
  And=`and`,
  But=`but`,
} 

export enum EExpParmKind {
  url = `url`,
  text = `text`,
  alias = `alias`,
  pairs = `pairs`,
  group = `group`,
  number = `number`,
  element = `element`,
  selector = `selector`,
}

export enum EExpParmType {
  any = `any`,
  int = `int`,
  word = `word`,
  array = `array`,
  float = `float`,
  string = `string`,
  number = `number`,
  object = `object`,
}

export type TStepMetaExpression = {
  kind?: EExpParmKind
  type: EExpParmType
  example: string,
  description: string,
}


export type TStepMeta = {
  // TO Be Removed once all steps are updated
  race?: boolean
  // TO Be Removed once all steps are updated

  module?:string
  name?:string
  info?:string
  alias?: string[]
  examples?: string[]
  description?:string
  expressions?:TStepMetaExpression[]
}

export type TStepParent = {
  uuid: string
  location: string
}

export type TStepDefMethod = (...args:any) => any
export type TStepDef = {
  type: string
  name: string
  uuid: string
  variant:string
  content: string
  meta: TStepMeta
  location?: string,
  definition?:string
  match: string | RegExp
  parent?: TStepParent
  tokens: TStepToken[]
  method: TStepDefMethod
}
export type TStepDefsArr = TStepDef[]

export type TStepDefs = {
  [key in keyof EStepType]: TStepDefsArr
}

export type TStepTable = {
  index: number
  content: string[][]
}

export type TStepDoc = {
  index:number
  whiteSpace:string
  type:`quote`|`tick`
  content: string[]
}
