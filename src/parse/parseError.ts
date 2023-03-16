import { EAstObject, TFeatureAst } from '../types'


export const parseError = (
  feature:TFeatureAst,
  type:EAstObject,
  index:number,
  message?:string
) => {
  feature.errors = feature.errors || []
  feature.errors.push({
    type,
    index,
    content: message || `Failed to parse ${type}`
  })
}