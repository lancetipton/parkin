import { homedir } from 'os'

import path from 'path'
import { isStr } from '@keg-hub/jsutils'

export const cwd = process.cwd()
export const homeDir = homedir()

const checkRootDir = (rootDir:string|undefined) => {
  return !isStr(rootDir)
    ? undefined
    : rootDir.startsWith(`/`)
      ? rootDir
      : rootDir.startsWith(`~/`)
        ? path.join(homeDir, rootDir.replace(`~/`, ``))
        : path.join(cwd, rootDir)
}

let __RootDir:string
const setRoot = (loc:string|undefined, force?:boolean) => {
  (!__RootDir || force) && (__RootDir = checkRootDir(loc))
}

const getRoot = () => {
  return __RootDir
}


export {
  getRoot,
  setRoot,
  __RootDir as rootDir,
}
