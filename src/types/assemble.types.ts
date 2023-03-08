import type { TFeatureAst } from './features.types'

export type TAssembleFeature = (
  toAssemble:TFeatureAst|TFeatureAst[],
  opts:TAssembleFeatureOpts
) => string[]


export interface IAssemble {
  feature: TAssembleFeature
}

export type TAssembleFeatureOpts = {
  empty?:boolean
  indexes?:boolean
}