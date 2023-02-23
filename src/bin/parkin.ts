#! /usr/bin/env node

/**
 * TODO: eventually this should allow running parkin from the cmd line
 */

import { Parkin } from '../parkin'
import { featureFull } from '../__mocks__'

;(() => {

  const PK = new Parkin({})
  const parsed = PK.parse.feature(featureFull)[0]

})()