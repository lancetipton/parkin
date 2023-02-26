import { homedir } from 'os'

import path from 'node:path'
export const cwd = process.cwd()
export const homeDir = homedir()

const checkRootDir = (rootDir:string) => {
  return rootDir.startsWith(`/`)
    ? rootDir
    : rootDir.startsWith(`~/`)
      ? path.join(homeDir, rootDir.replace(`~/`, ``))
      : path.join(cwd, rootDir)
}


let __RootDir:string
const setRoot = (loc:string) => {
  !__RootDir && (__RootDir = checkRootDir(loc))
}

export {
  setRoot,
  __RootDir as rootDir,
}
