#! /usr/bin/env node
import type { TWorldConfig, TParkinTestConfig, TRegisterStepsList } from '../types'

import { promises as fs } from 'fs'
import { getParkin, getPTE } from './instance'


export const runTests = async (
  features:string[],
  world:TWorldConfig,
  steps:TRegisterStepsList,
  testConfig:TParkinTestConfig
) => {

  return await features.reduce(async (resolve, feature) => {
    const acc = await resolve

    const PK = getParkin(world, steps)
    const PTE = getPTE()

    const content = await fs.readFile(feature, { encoding: `utf8` })
    const featureAst = PK.parse.feature(content)

    await PK.run(featureAst)

    const responses = await PTE.run({
      description: `Parkin > ${feature}`,
      ...testConfig,
    })

    return acc.concat(responses)
  }, Promise.resolve([]))
}

