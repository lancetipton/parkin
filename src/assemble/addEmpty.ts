import type { TFeatureAst, TAssembleFeatureOpts } from '../types'

import { addContent } from './addContent'


export const addEmpty = (
  assembled:string[],
  feature:TFeatureAst,
  opts:TAssembleFeatureOpts
) => {
  const { indexes=true } = opts
  
  feature?.empty?.length
    && feature?.empty?.forEach(item => addContent(assembled, item.content, indexes && item.index))
}
