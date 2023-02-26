import type { TParkinOpts } from '../types/bin.types'

import path from 'node:path'
import { eitherArr } from '@keg-hub/jsutils'
import { getAllFiles } from 'get-all-files'
import { homeDir, cwd, rootDir } from './paths'

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
    if(exclude.find(ex => file.includes(ex))) return false
    if(include?.length && !include.find(inc => file.includes(inc))) return false

    const fileExt = path.extname(file)
    return extensions.includes(fileExt)
  })

}

export const fullLoc = (loc:string) => {
  const root = rootDir || cwd

  return loc.startsWith(`/`)
    ? loc
    : loc.startsWith(`~/`)
      ? path.join(homeDir, loc.replace(`~/`, ``))
      : path.join(root, loc)
}


export const removeExt = (loc:string) => {
  const ext = path.extname(loc)
  const split = loc.split(ext)
  split.pop()

  return split.join(ext)
}
