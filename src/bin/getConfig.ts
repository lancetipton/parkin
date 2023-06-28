
import { fullLoc } from './helpers'
import { TParkinOpts } from "src/types/bin.types"
import { ensureArr, flatUnion } from '@keg-hub/jsutils'

const mergeConfig = (base:Partial<TParkinOpts>, override:Partial<TParkinOpts>) => {
  const {
    defs:bDefs,
    exts:bExts,
    config:bConfig,
    exclude:bExclude,
    include:bInclude,
    features:bFeatures,
    ...baseRest
  } = base

  const {
    defs,
    exts,
    config,
    exclude,
    include,
    features,
    ...ovRest
  } = override

  return {
    ...baseRest,
    ...ovRest,
    defs:flatUnion(ensureArr(bDefs), ensureArr(defs)),
    exts:flatUnion(ensureArr(bExts), ensureArr(exts)),
    exclude:flatUnion(ensureArr(bExclude), ensureArr(exclude)),
    include:flatUnion(ensureArr(bInclude), ensureArr(include)),
    features:flatUnion(ensureArr(bFeatures), ensureArr(features)),
  }
}

export const getConfig = (opts:TParkinOpts) => {
  return !opts.config
    ? opts
    : mergeConfig(
        require(fullLoc(opts.config, opts.rootDir)),
        opts
      )
}