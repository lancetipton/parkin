#! /usr/bin/env node --no-warnings
import './globals'

import type { TRunResults } from '../types'
import type { TParkinOpts } from '../types/bin.types'

import { setRoot } from './paths'
import { initPK } from './instance'
import { options } from './options'
import { getDefs } from './getDefs'
import { getWorld } from './getWorld'
import { runTests } from './runTests'
import { getConfig } from './getConfig'
import { printResult } from './printResult'
import { getFeatures } from './getFeatures'
import { argsParse } from '@keg-hub/args-parse'

;(async () => {

  const args = process.argv.slice(2) as string[] 
  const opts = await argsParse({ args, task: { options }}) as TParkinOpts
  const parsed = getConfig(opts)

  parsed.rootDir && setRoot(parsed.rootDir)
  const world = await getWorld(parsed)
  initPK(world)

  const features = await getFeatures(parsed, args)
  const defs = await getDefs(parsed)

  const results = await runTests(
    features,
    world,
    defs,
    { timeout: parsed.timeout }
  )

  // TODO: add reporting ???
  // Should figure out a way to reuse Jest || Jasmine reporters
  // Need to setup way to use Jest instead of PTE based on task option
  // Need to create separate export for parkin in /.bin folder
  // console.dir(results, {depth: null, colors: true})
  printResult(results as TRunResults, {
    failedOnly: true,
    exitWithError:true,
    // steps: false,
    // features: true,
    // errorOnly: true,
    // stepParents: false,
  })

})()