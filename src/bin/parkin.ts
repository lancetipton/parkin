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
import { CLIReporter } from './reporters'
import { pickKeys } from '@keg-hub/jsutils'
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
    {
      timeout: parsed.timeout,
      exitOnFailed: parsed.exitOnFailed,
      skipAfterFailed: parsed.skipAfterFailed,
    },
    {
      name: parsed.name,
      timeout: parsed.timeout,
      tags: pickKeys(parsed,[`disabled`, `filter`])
    },
  )
  
    // console.log(require('util').inspect(results, false, null, true))

  // TODO: add reporting ???
  // Should figure out a way to reuse Jest || Jasmine reporters
  // Need to setup way to use Jest instead of PTE based on task option
  // Need to create separate export for parkin in /.bin folder
  // console.dir(results, {depth: null, colors: true})
  CLIReporter.results(results as TRunResults, {
    // steps: false,
    // features: false,
    // stepParents: false,
    // errorOnly: true,
    // failedOnly: true,
    // exitWithError: true,
  })

})()