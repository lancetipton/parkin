import type { TFeatureAst } from '../types'

import { addContent } from './addContent'


export const addEmpty = (
  assembled:string[],
  feature:TFeatureAst
) => {
  feature?.empty?.length
    && feature?.empty?.forEach(item => addContent(assembled, item.content, item.index))
}
