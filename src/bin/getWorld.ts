import type { TWorldConfig } from '../types'
import type { TParkinOpts } from '../types/bin.types'

import { fullLoc } from './helpers'

export const getWorld = async (
  opts:TParkinOpts
) => {
  const { world } = opts
  const loc = world && fullLoc(world)

  const loaded = loc ? require(loc) : { world: {} }
  const mod = loaded?.default || loaded

  return (mod?.world || mod) as TWorldConfig
}