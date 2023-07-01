import type { TStepAst } from './steps.types'
import type { EAstObject } from './helpers.types'

export type TTagsAst = {
  index: number
  uuid: string
  whitespace?:string
  type: EAstObject.tags
  content: string
  tokens: string[]
}

export type TBackgroundAst = {
  index: number
  uuid: string
  tags?: TTagsAst
  whitespace?: string
  background: string
  steps: TStepAst[]
  type:EAstObject.background
}

export type TRuleAst = {
  index: number
  uuid: string
  rule: string
  tags?: TTagsAst
  whitespace?: string
  type:EAstObject.rule
  background?: TBackgroundAst
  scenarios: TScenarioAst[]
}

export type TScenarioAst = {
  index: number
  uuid: string
  tags?: TTagsAst
  alias?:`Example`
  scenario: string
  steps: TStepAst[]
  whitespace?: string
  type:EAstObject.scenario
}

export type TBlockAst = {
  content: string
  index: number
  uuid: string
  whitespace?:string
  type:EAstObject.block
    | EAstObject.empty
    | EAstObject.comment
    | EAstObject.reason
    | EAstObject.desire
    | EAstObject.perspective
}

export type TAstParseError = {
  type:EAstObject
  content:string
  index:number
}

export type TFeatureAst = {
  index: number
  uuid: string
  tags?: TTagsAst
  feature: string
  content: string
  desire?: TBlockAst
  rules?: TRuleAst[]
  whitespace?: string
  empty?: TBlockAst[]
  comments: TBlockAst[]
  perspective?: TBlockAst
  type: EAstObject.feature
  scenarios: TScenarioAst[]
  errors?: TAstParseError[]
  background?: TBackgroundAst
  reason?: TBlockAst|TBlockAst[]
}

export type TBlockParentAst = TFeatureAst | TRuleAst | TBackgroundAst | TScenarioAst
export type TAstType = TBlockParentAst | TStepAst | TTagsAst | TBlockAst

export type TStepParentAst = TBackgroundAst | TScenarioAst
export type TScenarioParentAst = TRuleAst | TFeatureAst
export type TTagsParentAst = TScenarioParentAst | TStepParentAst | TStepAst
export type TBackgroundParentAst = TFeatureAst | TRuleAst
export type TParentAst = TFeatureAst | TRuleAst | TBackgroundAst | TScenarioAst

export type TBlockType = EAstObject.block
  | EAstObject.empty
  | EAstObject.comment
  | EAstObject.desire
  | EAstObject.reason
  | EAstObject.perspective

export type TParseFeatureOpts = {
  worldReplace?:boolean
}