#! /usr/bin/env node

/**
 * TODO: eventually this should allow running parkin from the cmd line
 */

import { Parkin } from '../parkin'
import { featureRulesScenarios } from '../__mocks__'

;(() => {

  const PK = new Parkin({})
  const parsed = PK.parse.feature(featureRulesScenarios)[0]

  const assembled = PK.assemble.feature(parsed)

  console.log(featureRulesScenarios === assembled[0])

})()