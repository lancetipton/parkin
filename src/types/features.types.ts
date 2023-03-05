import { EAstObject, EStepType } from './helpers.types'

export enum EStepVariant {
  regex = 'regex',
  expression = 'expression'
}

export type TStepToken = {
  [key:string]: any
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
  location?: string,
  meta: TStepMeta
  match: string | RegExp
  parent?: TStepParent
  tokens: TStepToken[]
  method: TStepDefMethod
}

export type TStepDefsArr = TStepDef[]

export type TStepDefs = {
  [key in keyof EStepType]: TStepDefsArr
}

export type TBackgroundAst = {
  index: number
  uuid: string
  tags: string[]
  whitespace: string
  background: string
  steps: TStepAst[]
}

export type TRuleAst = {
  index: number
  uuid?: string
  tags: string[]
  rule: string
  whitespace: string
  background?: TBackgroundAst
  scenarios: TScenarioAst[]
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

export type TStepAst = {
  uuid: string
  index: number
  step: string
  type: EStepType
  whitespace: string
  definition?:keyof TStepDefs
  table?: TStepTable
  doc?: any
}

export type TScenarioAst = {
  index: number
  uuid: string
  tags: string[]
  alias?:`Example`
  scenario: string
  steps: TStepAst[]
  whitespace: string
}

export type TAstBlock = {
  content: string
  index: number
}

export type TAstParseError = {
  type:EAstObject
  content:string
  index:number
}

export type TFeatureAst = {
  index?: number
  tags: string[]
  uuid?: string
  feature: string
  content: string
  empty?: TAstBlock[]
  reason?: TAstBlock|TAstBlock[]
  desire?: TAstBlock
  comments: TAstBlock[]
  perspective?: TAstBlock
  background?: TBackgroundAst
  rules?: TRuleAst[]
  scenarios: TScenarioAst[]
  errors?: TAstParseError[]
}

export type TParseParentAst = TFeatureAst | TRuleAst | TBackgroundAst | TScenarioAst
export type TAstType = TParseParentAst | TStepAst

export type TStepParentAst = TBackgroundAst | TScenarioAst
export type TScenarioParentAst = TRuleAst | TFeatureAst
export type TTagsParentAst = TScenarioParentAst | TStepParentAst
export type TBackgroundParentAst = TFeatureAst | TRuleAst
