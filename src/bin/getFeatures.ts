import type { TParkinOpts } from '../types/bin.types'

import { cwd, rootDir } from './paths'
import { ensureArr, flatArr, emptyArr } from '@keg-hub/jsutils'
import { locsByTypes, fullLoc } from './helpers'

const filterFeatures = async (loc:string, opts:TParkinOpts) => {
  return await locsByTypes(loc, {
    ...opts,
    ext: `.feature`
  })
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