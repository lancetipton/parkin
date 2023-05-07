import type { TTokenOpts, TStepDef } from '../types'


import { getRegexParts } from './regex'
import { EPartMatchTypes } from '../types'
import { includePartType } from '../utils/helpers'
import { joinRegex, emptyObj } from '@keg-hub/jsutils'

import {
  RX_INT,
  RX_ALT,
  RX_FLOAT,
  RX_OPTIONAL,
  RX_SINGLE_QUOTED,
  RX_DOUBLE_QUOTED,
  RX_PARAMETER,
} from './patterns'

export type TMatchTokens = {
  type:string
  match:string
  index:number
  defIndex:number
}

const tokenRegex = joinRegex(
  RX_INT,
  RX_FLOAT,
  RX_ALT,
  RX_OPTIONAL,
  RX_PARAMETER,
  RX_DOUBLE_QUOTED,
  RX_SINGLE_QUOTED,
  'g' as unknown as RegExp
) as unknown as RegExp

export const tokenizeStep = (
  step:string,
  def:TStepDef,
  opts:TTokenOpts=emptyObj
) => {

  /**
   * By default all part types are included
   * Can use the `opts.include` || `opts.exclude`
   * To get parts of a specific type
   */
  const parts = getRegexParts(def.match as string, opts)
  const tokens:TMatchTokens[] = []

  let idx:number=0
  let match:RegExpExecArray

  while((match = tokenRegex.exec(step)) !== null) {

    const part = parts[idx]
    if(!part) continue

    const [val] = match

    if(!includePartType(part.type, opts)) continue

    const trimmed = val.trimStart()
    const diff = val.length - trimmed.length

    tokens.push({
      match: val.trim(),
      defIndex: part?.index,
      index: match.index + diff,
      type: part?.paramType
        || part?.type
        || EPartMatchTypes.other,
    })
    idx++
  }

  return tokens
}
