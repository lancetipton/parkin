import type {
  TAstType,
  TRuleAst,
  TTagsAst,
  TBlockAst,
  TFeatureAst,
  TScenarioAst,
  TBackgroundAst,
  TBlockParentAst,
  TStepParentAst,
  TScenarioParentAst,
  TBackgroundParentAst,
} from './features.types'

import type { TStepAst } from './steps.types'
import type { EAstObject } from './helpers.types'

export type TIndexParentAst = TRuleAst
  | TScenarioAst
  | TFeatureAst
  | TBackgroundAst

export type TIndexAstAst<T, P> = {
  ast: T
  parent:P
}

export type TIndexRuleAst = TIndexAstAst<TRuleAst, TFeatureAst>
export type TIndexTagsAst = TIndexAstAst<TTagsAst, TBlockParentAst>
export type TIndexStepAst = TIndexAstAst<TStepAst, TStepParentAst>
export type TIndexFeatureAst = TIndexAstAst<TFeatureAst, TFeatureAst>
export type TIndexBlockAst = TIndexAstAst<TBlockAst, TBlockParentAst>
export type TIndexScenarioAst = TIndexAstAst<TScenarioAst, TScenarioParentAst>
export type TIndexBackgroundAst = TIndexAstAst<TBackgroundAst, TBackgroundParentAst>

export type TIndexItemAst = TIndexTagsAst
  | TIndexRuleAst
  | TIndexStepAst
  | TIndexFeatureAst
  | TIndexBlockAst
  | TIndexScenarioAst
  | TIndexBackgroundAst

export type TIndexAst = TIndexItemAst[]

export type TIndexFromAst = {
  key:string
  child:TAstType
  indexes:TIndexAst
  feature:TFeatureAst
  parent:TIndexParentAst
}

export type TIndexSearchOpts = {
  child?:string,
  parent?:string
  uuid?:string
  start?:number
  type?:EAstObject
  only?:`ast`|`parent`
  indexes:TIndexAst
}