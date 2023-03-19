import type {
  TAstType,
  TIndexItemAst,
  TIndexParentAst,
  TIndexSearchOpts,
} from '../types'

import { emptyObj } from '@keg-hub/jsutils'

export const searchIndexes = (props:TIndexSearchOpts) => {
  const {
    child,
    type,
    uuid,
    start,
    parent,
    indexes,
  } = props

  const found = indexes.find((index, idx) => {
    if(start && idx < start) return false

    if(type){
      if(child && index.ast.type !== type) return false
      else if(parent && index.parent.type !== type) return false
    }

    if(child && index.ast.uuid === child) return true
    else if(parent && index.parent.uuid === parent) return true

    return index.ast.uuid === uuid
  })

  return found || emptyObj as TIndexItemAst
}