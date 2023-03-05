import type { TParkinOpts } from '../types/bin.types'

import path from 'path'
import { eitherArr } from '@keg-hub/jsutils'
import { getAllFiles } from 'get-all-files'
import { getRoot, homeDir, cwd } from './paths'

/**
 * Gets a list of paths based on the passed in options
 * Can filter by extension, and include or exclude array
 * If no extensions passed, returns an empty array
 */
export const locsByTypes = async (
  loc:string,
  opts:TParkinOpts
) => {
  const { exclude, include, ext, exts }  = opts
  if(!ext && (!exts || !exts.length)) return []

  const extsArr = eitherArr<string[]>(exts, [])
  ext && !extsArr.includes(ext) && extsArr.push(ext)

  const extensions = extsArr.map((ex:string) => ex.startsWith(`.`) ? ex : `.${ex}`)

  const files = await getAllFiles(loc, { resolve: true }).toArray()
  return files.filter(file => {
    if(exclude?.length && exclude.find(ex => file.includes(ex))) return false
    if(include?.length && !include.find(inc => file.includes(inc))) return false

    const fileExt = path.extname(file)
    return extensions.includes(fileExt)
  })

}

/**
 * Resolve the full path to a location similar to path.resolve
 * But can use custom root path values
 */
export const fullLoc = (loc:string) => {
  const root = getRoot() || cwd

  return loc.startsWith(`/`)
    ? loc
    : loc.startsWith(`~/`)
      ? path.join(homeDir, loc.replace(`~/`, ``))
      : path.join(root, loc)
}

/**
 * Removes the extension from the passed in path location
 */
export const removeExt = (loc:string) => {
  const ext = path.extname(loc)
  if(!ext) return loc
  
  const split = loc.split(ext)
  split.pop()

  return split.join(ext)
}
