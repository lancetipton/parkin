import type { TStepAst } from './steps.types'
import type { EAstObject } from './helpers.types'

export type TBackgroundAst = {
  index?: number
  uuid: string
  tags: string[]
  whitespace?: string
  background: string
  steps: TStepAst[]
}

export type TRuleAst = {
  index?: number
  uuid: string
  tags: string[]
  rule: string
  whitespace?: string
  background?: TBackgroundAst
  scenarios: TScenarioAst[]
}

export type TScenarioAst = {
  index?: number
  uuid: string
  tags: string[]
  alias?:`Example`
  scenario: string
  steps: TStepAst[]
  whitespace?: string
}

export type TAstBlock = {
  content: string
  index?: number
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

