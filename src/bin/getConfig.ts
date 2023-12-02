
import { fullLoc } from './helpers'
import { TParkinOpts } from "src/types/bin.types"
import { ensureArr } from '@keg-hub/jsutils/ensureArr'
import { flatUnion } from '@keg-hub/jsutils/flatUnion'

const mergeConfig = (base:Partial<TParkinOpts>, override:Partial<TParkinOpts>) => {
  const {
    defs:bDefs,
    exts:bExts,
    filter:bFilter,
    config:bConfig,
    exclude:bExclude,
    include:bInclude,
    disabled:bDisabled,
    features:bFeatures,
    ...baseRest
  } = base

  const {
    defs,
    exts,
    config,
    filter,
    exclude,
    include,
    features,
    disabled,
    ...ovRest
  } = override

  return {
    ...baseRest,
    ...ovRest,
    defs:flatUnion(ensureArr(bDefs), ensureArr(defs)),
    exts:flatUnion(ensureArr(bExts), ensureArr(exts)),
    filter:flatUnion(ensureArr(filter), ensureArr(bFilter)),
    exclude:flatUnion(ensureArr(bExclude), ensureArr(exclude)),
    include:flatUnion(ensureArr(bInclude), ensureArr(include)),
    features:flatUnion(ensureArr(bFeatures), ensureArr(features)),
    disabled:flatUnion(ensureArr(disabled), ensureArr(bDisabled)),
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