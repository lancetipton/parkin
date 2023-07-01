import type { assemble } from '../assemble'
import type { EAstObject, EStepType } from './helpers.types'
import type { TParentAst, TFeatureAst, } from './features.types'
import {TStepAst} from './steps.types'

export type TAssemble = typeof assemble

export enum EBlockLoc {
  after=`after`,
  before=`before`,
}

export type TFindIndex = {
  type:EAstObject|EStepType
  feature:TFeatureAst
  loc?:EBlockLoc|string
  parent:TParentAst|TStepAst
}

export type TAssembleOpts = {
  removeEmpty?: boolean
  removeComments?: boolean
  emptyAfterRule?: boolean
  emptyAfterSteps?:boolean
  emptyAfterStory?: boolean
  emptyAfterFeature?: boolean
  emptyAfterScenario?: boolean
  emptyAfterBackground?: boolean
  backgroundAfterParent?: boolean
}