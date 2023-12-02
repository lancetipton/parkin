import type { TParkinOpts } from '../types/bin.types'

import { cwd, rootDir } from './paths'
import { locsByTypes, fullLoc } from './helpers'
import { flatArr } from '@keg-hub/jsutils/flatArr'
import { emptyArr } from '@keg-hub/jsutils/emptyArr'
import { ensureArr } from '@keg-hub/jsutils/ensureArr'

const filterFeatures = async (loc:string, opts:TParkinOpts) => {
  const foundFeats = await locsByTypes(loc, {
    ...opts,
    ext: `.feature`
  })

  return opts.feature
    ? foundFeats.filter(loc => loc.includes(opts.feature))
    : foundFeats
}

const featureFromArg = (args:string[]) => {
  return args.filter((arg, idx) => {
    const noFlag = !arg.startsWith(`-`)
      && !arg.includes(`=`)
      && arg !== `.`
      && arg !== `./`

    if(!noFlag) return noFlag

    const past = args[idx -1]

    return past && ((past.startsWith(`-`) && past.length == 2) || (past.startsWith(`--`) && past.length >= 3))
      ? false
      : true
  })
}

export const getFeatures = async (
  opts:TParkinOpts,
  args:string[],
) => {
  let optsFiles = ensureArr<string>(opts.features || [])
  const featureArgs = featureFromArg(args)

  const options = featureArgs.length
    ? { ...opts, include: flatArr([...(opts?.include || emptyArr), ...featureArgs]) }
    : opts

  const filesArr = optsFiles.length || !args.length ? optsFiles  : featureArgs

  // If no paths, then load from the root / cwd
  if(!filesArr.length){
    const root = rootDir || cwd

    return await filterFeatures(root, options)
  }

  const features = await filesArr.reduce(async (resolve, loc) => {
    const acc = await resolve
    const full = fullLoc(loc)
    const features = await filterFeatures(full, options)

    return acc.concat(features)
  }, Promise.resolve([]))

  return features
}