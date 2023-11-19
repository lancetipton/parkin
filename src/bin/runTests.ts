#! /usr/bin/env node
import type {
  TRunResults,
  TWorldConfig,
  TParkinTestConfig,
  TRegisterStepsList,
  TParkinRunOpts
} from '../types'

import { promises as fs } from 'fs'
import { getParkin, getPTE } from './instance'


export const runTests = async (
  features:string[],
  world:TWorldConfig,
  steps:TRegisterStepsList,
  testConfig:TParkinTestConfig,
  runOpts:TParkinRunOpts
) => {

  let hasFailed:boolean
  return await features.reduce(async (resolve, feature) => {
    const acc = await resolve
    if(hasFailed) return acc

    const PK = getParkin(world, steps)
    const PTE = getPTE()

    const content = await fs.readFile(feature, { encoding: `utf8` })
    const featureAst = PK.parse.feature(content, { worldReplace: false })

    const resp = await PK.run(featureAst, runOpts)
    if(!resp) return acc

    const responses = await PTE.run({
      description: `Parkin > ${feature}`,
      ...testConfig,
    }) as TRunResults
    
    if(testConfig?.exitOnFailed)
      hasFailed = Boolean(responses.find(resp => resp.failed))

    return acc.concat(responses)
  }, Promise.resolve([] as TRunResults))
}

