import type {
  TAstType,
  TRuleAst,
  TTagsAst,
  TStepAst,
  TBlockAst,
  TFeatureAst,
  TScenarioAst,
  TIndexItemAst,
  TBackgroundAst,
} from '../types'

import { capitalize } from '@keg-hub/jsutils'
import { EFeatureTypes, EAstObject } from '../types'
import { getTextContent, getWhiteSpace, addContent } from './helpers'

export const assembleFeature = (
  assembled:string[],
  { ast, parent }:TIndexItemAst
) => {
  const feature = ast as TFeatureAst
  addContent(
    assembled,
    getTextContent(feature, parent, EFeatureTypes.Feature, ``),
    feature.index
  )
}

export const assembleStep = (
  assembled:string[],
  { ast, parent }:TIndexItemAst
) => {
  const step = ast as TStepAst
  const whitespace = getWhiteSpace(step, parent, `  `)
  const type = (step.type as string) !== EAstObject.step ? capitalize(step.type) : `Step`
  addContent(
    assembled,
    `${whitespace}${type} ${step.step || ``}`,
    step.index
  )
}

export const assembleTags = (
  assembled:string[],
  { ast, parent }:TIndexItemAst
) => {
  const tags = ast as TTagsAst
  const whitespace = getWhiteSpace(tags, parent)
  addContent(
    assembled,
    `${whitespace || ``}${tags.tokens.join(' ')}`,
    parent.tags.index
  )
}

export const assembleRule = (
  assembled:string[],
  { ast, parent }:TIndexItemAst
) => {
  const rule = ast as TRuleAst
  const whitespace = rule.whitespace || `  `
  addContent(assembled, `${whitespace}${EFeatureTypes.Rule}: ${rule.rule || ``}`, rule.index)
}

export const assembleBackground = (
  assembled:string[],
  { ast, parent }:TIndexItemAst
) => {
  const background = ast as TBackgroundAst
  addContent(
    assembled,
    getTextContent(background, parent, EFeatureTypes.Background, `  `),
    background.index
  )
}

export const assembleScenario = (
  assembled:string[],
  { ast, parent }:TIndexItemAst
) => {
  const scenario = ast as TScenarioAst
  const type = scenario.alias as EFeatureTypes || EFeatureTypes.Scenario
  addContent(
    assembled,
    getTextContent(scenario, parent, type, `  `),
    scenario.index
  )
}

export const assembleBlock = (
  assembled:string[],
  { ast, parent }:TIndexItemAst
) => {
  const block = ast as TBlockAst
  const whitespace = getWhiteSpace(block, parent, `  `)
  addContent(assembled, `${whitespace}${block.content}`, block.index)
}