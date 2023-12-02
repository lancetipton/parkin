import type { TParkinOpts } from '../types/bin.types'
import type { TRegisterStepsList, TRegisterStepMap, TStepDefs } from '../types'

import { getPK } from './instance'
import { cwd, getRoot } from './paths'
import { locsByTypes, fullLoc } from './helpers'
import { flatUnion } from '@keg-hub/jsutils/flatUnion'
import { ensureArr } from '@keg-hub/jsutils/ensureArr'

const filterDefs = async (loc:string, opts:TParkinOpts) => {
  return await locsByTypes(loc, {
    ...opts,
    exts: flatUnion([
      opts?.ext,
      ...(opts?.exts || []),
      `.js`,
      `.ts`,
      `.cjs`,
      `.ejs`,
      `.tsx`,
      `.jsx`
    ])
  })
}

export const getDefs = async (
  opts:TParkinOpts
) => {

  let filesArr = ensureArr<string>(opts.defs || [])
  // If no paths, then load from the root / cwd
  const defs = !filesArr.length
    ? await filterDefs(getRoot() || cwd, opts)
    : await filesArr.reduce(async (resolve, loc) => {
        const acc = await resolve
        const defs = await filterDefs(fullLoc(loc), opts)

        return acc.concat(defs)
      }, Promise.resolve([] as string[]))

  await Promise.all(defs.map(async (loc:string) => require(fullLoc(loc))))

  const PK = getPK()
  const typeList = PK.steps.typeList() as TStepDefs

  return Object.entries(typeList).reduce((acc, [type, defAsts]) => {
    const defMap = {} as TRegisterStepMap
    defAsts.map(ast => defMap[ast.match as string] = ast.method)
    acc[type] = defMap

    return acc
  }, {} as TRegisterStepsList)

}