import type {
  TRuleAst,
  TStepAst,
  TBlockAst,
  TIndexAst,
  TBlockType,
  TFeatureAst,
  TScenarioAst,
  TBackgroundAst,
  TStepParentAst,
  TTagsParentAst,
  TBlockParentAst,
  TScenarioParentAst,
  TBackgroundParentAst
} from '../types'

import { EAstObject } from '../types'
import { addToIndexes } from './addToIndexes'
import { isArr } from '@keg-hub/jsutils/isArr'


const indexSteps = (
  feature:TFeatureAst,
  indexes:TIndexAst,
  steps:TStepAst[],
  parent:TStepParentAst,
  offset:number[]
) => {
  steps.forEach(step => {
    addToIndexes(feature, indexes, {ast: step, parent}, offset)

    step.tags && indexTags(feature, indexes, step, offset)
  })
} 

const indexScenario = (
  feature:TFeatureAst,
  indexes:TIndexAst,
  scenarios:TScenarioAst[],
  parent:TScenarioParentAst,
  offset:number[]
) => {
  scenarios.forEach(scenario => {
    addToIndexes(feature, indexes, {ast: scenario, parent}, offset)

    scenario.tags && indexTags(feature, indexes, scenario, offset)
    scenario.steps && indexSteps(feature, indexes, scenario.steps, scenario, offset)
  })
}

const indexRules = (
  feature:TFeatureAst,
  indexes:TIndexAst,
  rules:TRuleAst[],
  parent:TFeatureAst,
  offset:number[]
) => {
  rules.forEach(rule => {
    addToIndexes(feature, indexes, {ast: rule, parent}, offset)

    rule.tags && indexTags(feature, indexes, rule, offset)
    rule.scenarios && indexScenario(feature, indexes, rule.scenarios, rule, offset)
    rule.background && indexBackground(feature, indexes, rule.background, rule, offset)
  })
}

const indexReason = (
  feature:TFeatureAst,
  indexes:TIndexAst,
  reason:TBlockAst|TBlockAst[],
  parent:TFeatureAst,
  offset:number[]
) => {
  isArr<TBlockAst[]>(reason)
    ? (reason as TBlockAst[]).forEach((res) => addToIndexes(feature, indexes,{ast: res, parent},offset))
    : addToIndexes(feature, indexes, {ast: reason as TBlockAst, parent}, offset)
}

const indexBackground = (
  feature:TFeatureAst,
  indexes:TIndexAst,
  background:TBackgroundAst,
  parent:TBackgroundParentAst,
  offset:number[]
) => {

  addToIndexes(feature, indexes, {ast: background, parent}, offset)

  background.tags && indexTags(feature, indexes, background, offset)
  background?.steps && indexSteps(feature, indexes, background.steps, background, offset)

}

const indexBlocks = (
  feature:TFeatureAst,
  indexes:TIndexAst,
  blocks:TBlockAst[],
  type:TBlockType,
  parent:TBlockParentAst,
  offset:number[]
) => {
  blocks.forEach(block => {
    if(block.type !== type) block.type = type

    addToIndexes(feature, indexes, {ast: block, parent}, offset)
  })
}

const indexTags = (
  feature:TFeatureAst,
  indexes:TIndexAst,
  parent:TTagsParentAst,
  offset:number[]
) => {
  const tags = parent?.tags
  tags?.tokens?.length
    && addToIndexes(feature, indexes, {ast: tags, parent}, offset)
}

export const featureToIndexes = (
  feature:TFeatureAst,
) => {
  const indexes:TIndexAst = []
  let offset:number[] = []

  feature?.tags
    && indexTags(feature, indexes, feature, offset)

  indexes[feature.index || indexes.length] = {ast: feature, parent: feature}

  feature?.empty
    && indexBlocks(
      feature,
      indexes,
      feature?.empty,
      EAstObject.empty,
      feature,
      offset
    )

  feature?.comments
    && indexBlocks(
        feature,
        indexes,
        feature?.comments,
        EAstObject.comment,
        feature,
        offset
      )

  feature.desire
    && indexBlocks(
        feature,
        indexes,
        [feature.desire],
         EAstObject.desire,
         feature,
         offset
      )
  feature.perspective
    && indexBlocks(
        feature,
        indexes,
        [feature.perspective],
         EAstObject.perspective,
         feature,
         offset
      )

  feature.reason
    && indexReason(
        feature,
        indexes,
        feature.reason,
        feature,
        offset
      )

  feature.background
    && indexBackground(
        feature,
        indexes,
        feature.background,
        feature,
        offset
      )

  feature.rules
    && indexRules(
        feature,
        indexes,
        feature.rules,
        feature,
        offset
      )

  feature.scenarios
    && indexScenario(
        feature,
        indexes,
        feature.scenarios,
        feature,
        offset
      )

  offset = undefined

  // Remove any empty items in the array
  // Items can be added in a non-linear fashion
  // So their may be empty items within the array
  return indexes.filter(item => item)

}
