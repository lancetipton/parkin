import type { Parkin } from '../parkin'

import { dataMappers } from './dataMappers'
import { indexFromAst } from './indexFromAst'
import { indexesToFeature } from './indexesToFeature'
import { featureToIndexes } from './featureToIndexes'

export class Indexes {

  parkin:Parkin
  tags:typeof dataMappers.tags
  steps:typeof dataMappers.steps
  rules:typeof dataMappers.rules
  empty:typeof dataMappers.empty
  scenarios:typeof dataMappers.scenarios
  background:typeof dataMappers.background
  parentSteps:typeof dataMappers.parentSteps

  constructor(parkin?:Parkin){
    this.parkin = parkin
    
    Object.assign(this, dataMappers)
  }

  indexFrom = indexFromAst.bind(this)
  toFeature = indexesToFeature.bind(this)
  toIndexes = featureToIndexes.bind(this)

}