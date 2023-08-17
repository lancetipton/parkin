import type { Parkin } from '../parkin'

import { fromIndex } from './fromIndex'
import { findIndex } from './findIndex'
import { formatFeature } from './formatters'
import { assembleFeature as feature } from './feature'
import { featureToIndexes as toIndexes } from './featureToIndexes'

import {
  addContent,
  getWhiteSpace,
  getTextContent,
  formatAssembled,
} from './helpers'

export class Assemble {

  parkin:Parkin
  feature:typeof feature
  toIndexes:typeof toIndexes
  findIndex:typeof findIndex
  fromIndex:typeof fromIndex
  format:typeof formatFeature
  addContent:typeof addContent
  getWhiteSpace:typeof getWhiteSpace
  getTextContent:typeof getTextContent
  formatAssembled:typeof formatAssembled

  constructor(parkin:Parkin){
    this.parkin = parkin
    this.format = formatFeature.bind(this)
    this.feature = feature.bind(this)
    this.toIndexes = toIndexes.bind(this)
    this.findIndex = findIndex.bind(this)
    this.fromIndex = fromIndex.bind(this)
    this.addContent = addContent.bind(this)
    this.getWhiteSpace = getWhiteSpace.bind(this)
    this.getTextContent = getTextContent.bind(this)
    this.formatAssembled = formatAssembled.bind(this)
  }

}
