import type {
  TWorldConfig,
  TFeatureAst,
  TAssembleOpts
} from '../../src/types'

import { Flow } from './flow'
import { Parkin } from '../../src/parkin'
import { fromIndex } from './fromIndex'
import { buildFlowSteps } from './steps'
import {emptyObj, isArr, isObj, isStr} from '@keg-hub/jsutils'
import { throwMissingFeatureText } from '../../src/utils/errors'

export type TFeatureConvert = string|string[]|TFeatureAst[]|TFeatureAst

export type TMaestroOpts = {
  world:TWorldConfig
}

export class Maestro {
  
  flow:Flow
  parkin:Parkin

  constructor(opts:TMaestroOpts){
    const {
      world
    } = opts

    world.$maestro = this

    this.parkin = new Parkin(world)
    this.flow = new Flow()
    buildFlowSteps(this)
  }

  #resolveFeatures = (
    data:TFeatureConvert,
    $world:TWorldConfig
  ):TFeatureAst[] => {
    return isStr(data)
      ? this.parkin.parse.feature(data, $world)
      : isObj<TFeatureAst>(data)
        ? [data]
        : isArr<TFeatureAst[]>(data)
          ? (data as TFeatureAst[]).reduce(
            (features, feature) =>
              features.concat(this.#resolveFeatures(feature, $world)),
            [] as TFeatureAst[]
          )
          : throwMissingFeatureText()
  }

  convert = (
    feature:TFeatureConvert,
    opts:TAssembleOpts=emptyObj
  ) => {
    const asts = this.#resolveFeatures(feature, this.parkin.world)
    return asts.map(ast => {
      this.flow = new Flow()
      const updated = this.parkin.assemble.format(ast, opts)
      const indexes = this.parkin.assemble.toIndexes(updated)
      fromIndex(indexes, this)

      return this.flow.toString()
    })
    
  }

}