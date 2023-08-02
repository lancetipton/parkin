import type {
  TParentAst
} from "../types"

import { EStepType, EAstObject } from "../types"


export type TIdFromLoc<T> = {
  index:number|string
  parent:T|TParentAst
  type:EAstObject|EStepType|string
}

export const idFromIdx = <
T extends Record<`uuid`, string>=TParentAst|Record<`uuid`, string>
>(props:TIdFromLoc<T>) => {
  const {
    type,
    index,
    parent,
  } = props

  return `${parent.uuid}.${type}.${index}`
}
