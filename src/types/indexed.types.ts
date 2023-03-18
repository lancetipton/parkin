import type {
  TRuleAst,
  TTagsAst,
  TBlockAst,
  TFeatureAst,
  TScenarioAst,
  TBackgroundAst,
  TParseParentAst,
  TStepParentAst,
  TScenarioParentAst,
  TBackgroundParentAst,
} from './features.types'

import type { TStepAst } from './steps.types'

export type TIndexParentAst = TRuleAst
  | TScenarioAst
  | TFeatureAst
  | TBackgroundAst

export type TIndexAstAst<T, P> = {
  ast: T
  parent:P
}

export type TIndexRuleAst = TIndexAstAst<TRuleAst, TFeatureAst>
export type TIndexTagsAst = TIndexAstAst<TTagsAst, TParseParentAst>
export type TIndexStepAst = TIndexAstAst<TStepAst, TStepParentAst>
export type TIndexFeatureAst = TIndexAstAst<TFeatureAst, TFeatureAst>
export type TIndexBlockAst = TIndexAstAst<TBlockAst, TParseParentAst>
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