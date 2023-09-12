import type {
  TTagsAst,
  TStepAst,
  TBlockAst,
  TFeatureAst,
  TScenarioAst,
  TIndexItemAst,
} from '../../src/types'


import { isArr } from '@keg-hub/jsutils'
import {
  AfterTag,
  BeforeTag,
  EMaestroCmds,
  EnvTagPrefix,
} from './constants'
import {Maestro} from './maestro'

const isEnv = (tag:string) => tag.startsWith(EnvTagPrefix)
const isAppId = (tag:string) => tag.startsWith(`@${EMaestroCmds.appId}`)
const hasTag = (tag:string, tokens?:string[]) => isArr(tokens) && tokens.find(tok => tok === tag)

export const assembleTags = (
  maestro:Maestro,
  { ast, parent }:TIndexItemAst
) => {
  // Scenario tags are parsed in the assembleScenario method
  if(!(`feature` in parent)) return

  ;(ast as TTagsAst).tokens.forEach(token => {
    
    if(isAppId(token)){
      maestro.flow.appId = (token.split(`=`).pop() || ``).trim()
      return 
    }
    else if(isEnv(token)){
      const [prefixed, part] = token.split(`=`)
      const value = part.trim()
      if(!value) return

      const key = prefixed.replace(new RegExp(`^${EnvTagPrefix}`), ``)
      maestro.flow.env[key] = value
    }
    else maestro.flow.tags.push(token.replace(/^@/, ``).trim())

  })
}

export const assembleFeature = (
  maestro:Maestro,
  { ast, parent }:TIndexItemAst
) => {
  const feature = ast as TFeatureAst
  maestro.flow.name = feature.feature
}

export const assembleStep = (
  maestro:Maestro,
  { ast, parent }:TIndexItemAst
) => {
  const step = ast as TStepAst
  maestro.parkin.steps.resolve(step.step, step)
}

export const assembleScenario = (
  maestro:Maestro,
  { ast, parent }:TIndexItemAst
) => {
  const scenario = ast as TScenarioAst

  if(hasTag(BeforeTag, scenario?.tags?.tokens)){
    maestro.flow.activeParent = `onStart` as const
    return
  }
  else if(hasTag(AfterTag, scenario?.tags?.tokens)){
    maestro.flow.activeParent = `onComplete` as const
    return
  }

  maestro.flow.activeParent = `steps` as const
}

export const assembleBlock = (
  maestro:Maestro,
  { ast, parent }:TIndexItemAst
) => {
  const block = ast as TBlockAst

}
