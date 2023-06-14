import type {
  TParentAst
} from "../types"

import { EStepType, EAstObject } from "../types"

export type TIdFromLoc = {
  loc:number
  parent:TParentAst
  type:EAstObject|EStepType
}

export const idFromLoc = (props:TIdFromLoc) => {
  const {
    loc,
    type,
    parent,
  } = props
  
  return `${parent.uuid}.${type}.${loc}`
}
