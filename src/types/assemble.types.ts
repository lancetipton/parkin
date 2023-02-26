import type { TFeatureAst } from './features.types'

export type TAssembleFeature = (
  toAssemble:TFeatureAst|TFeatureAst[]
) => string[]


export interface IAssemble {
  feature: TAssembleFeature
}