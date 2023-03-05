import { TStepDef } from '../types'
import { joinRegex } from '@keg-hub/jsutils'
import { getRegexParts } from './regex'

import {
  RX_INT,
  RX_FLOAT,
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

// @ts-ignore
const tokenRegex = joinRegex(
  RX_INT,
  // @ts-ignore
  RX_FLOAT,
  RX_PARAMETER,
  RX_DOUBLE_QUOTED,
  RX_SINGLE_QUOTED,
  'g' as unknown as RegExp
) as RegExp

export const tokenizeStep = (step:string, def:TStepDef) => {
  const parts = getRegexParts(def.match as string)

  const tokens:TMatchTokens[] = []

  let match:RegExpExecArray
  let idx:number=0
  while((match = tokenRegex.exec(step)) !== null) {
    const [val, __, ...rest] = match
    let type = rest.pop()
    const part = parts[idx]

    const trimmed = val.trimStart()
    const diff = val.length - trimmed.length

    tokens.push({
      match: val.trim(),
      defIndex: part?.index,
      index: match.index + diff,
      type: type || part?.paramType || `any`,
    })
    idx++
  }

  return tokens
}
