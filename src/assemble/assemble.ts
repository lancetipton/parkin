import type { Parkin } from '../parkin'

import { fromIndex } from './fromIndex'
import { findIndex } from './findIndex'
import { assembleFeature as feature } from './feature'
import { featureToIndexes as toIndexes } from './featureToIndexes'


export class Assemble {

  parkin:Parkin
  feature:typeof feature
  toIndexes:typeof toIndexes
  findIndex:typeof findIndex
  fromIndex:typeof fromIndex

  constructor(parkin:Parkin){
    this.parkin = parkin
    this.feature = feature.bind(this)
    this.toIndexes = toIndexes.bind(this)
    this.findIndex = findIndex.bind(this)
    this.fromIndex = fromIndex.bind(this)
  }

}
