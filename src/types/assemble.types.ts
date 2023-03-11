import type { TFeatureAst } from './features.types'

export type TAssembleFeature = (
  toAssemble:TFeatureAst|TFeatureAst[],
  opts:TAssembleFeatureOpts
) => string[]


export interface IAssemble {
  feature: TAssembleFeature
}

export type TBreakSections = {
  rule?: boolean
  scenario?:boolean
  background?:boolean
  ruleScenario?:boolean
  ruleBackground?:boolean
}

export type TAssembleFeatureArgOpts = Omit<TAssembleFeatureOpts, `breaks`> & {
  breaks?: true | TBreakSections
}

export type TAssembleFeatureOpts = {
  empty?:boolean
  indexes?:boolean
  whitespace?: number
  breaks?: TBreakSections
}