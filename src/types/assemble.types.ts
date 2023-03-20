import type { assemble } from '../assemble'
import type { EAstObject, EStepType } from './helpers.types'
import type { TParentAst, TFeatureAst, } from './features.types'

export type TAssemble = typeof assemble

export enum EBlockLoc {
  after=`after`,
  before=`before`,
}

export type TFindIndex = {
  type:EAstObject|EStepType
  parent:TParentAst
  feature:TFeatureAst
  loc?:EBlockLoc|string
}