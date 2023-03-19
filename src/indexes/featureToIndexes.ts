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
import { isArr } from '@keg-hub/jsutils'

const indexSteps = (
  indexes:TIndexAst,
  steps:TStepAst[],
  parent:TStepParentAst
) => {
  steps.forEach(step => {
    indexes[step.index] = {ast: step, parent}
  })
} 

const indexScenario = (
  indexes:TIndexAst,
  scenarios:TScenarioAst[],
  parent:TScenarioParentAst
) => {
  scenarios.forEach(scenario => {
    indexes[scenario.index] = {ast: scenario, parent}

    scenario.tags && indexTags(indexes, scenario)
    scenario.steps && indexSteps(indexes, scenario.steps, scenario)
  })
}

const indexRules = (
  indexes:TIndexAst,
  rules:TRuleAst[],
  parent:TFeatureAst
) => {
  rules.forEach(rule => {
    indexes[rule.index] = {ast: rule, parent}

    rule.tags && indexTags(indexes, rule)
    rule.scenarios && indexScenario(indexes, rule.scenarios, rule)
    rule.background && indexBackground(indexes, rule.background, rule)
  })
}

const indexReason = (
  indexes:TIndexAst,
  reason:TBlockAst|TBlockAst[],
  parent:TFeatureAst
) => {
  isArr<TBlockAst[]>(reason)
    ? reason.forEach(reason => {
        indexes[reason.index] = {ast: reason, parent}
      })
    : (() => {
        indexes[reason.index] = {ast: reason, parent}
      })()
}

const indexBackground = (
  indexes:TIndexAst,
  background:TBackgroundAst,
  parent:TBackgroundParentAst
) => {
  indexes[background.index] = {ast: background, parent}
  background.tags && indexTags(indexes, background)
  background?.steps && indexSteps(indexes, background.steps, background)
}

const indexBlocks = (
  indexes:TIndexAst,
  blocks:TBlockAst[],
  type:TBlockType,
  parent:TBlockParentAst
) => {
  blocks.forEach(block => {
    if(block.type !== type) block.type = type

    indexes[block.index] = {ast: block, parent}
  })
}

const indexTags = (
  indexes:TIndexAst,
  parent:TTagsParentAst
) => {
  const tags = parent?.tags
  tags?.tokens?.length
    && (indexes[tags.index] = {ast: tags, parent})
}

export const featureToIndexes = (
  feature:TFeatureAst,
) => {
  const indexes = [] as unknown as TIndexAst

  feature?.tags
    && indexTags(indexes, feature)

  indexes[feature.index || indexes.length] = {ast: feature, parent: feature}

  feature?.empty
    && indexBlocks(
      indexes,
      feature?.empty,
      EAstObject.empty,
      feature
    )

  feature?.comments
    && indexBlocks(
        indexes,
        feature?.comments,
        EAstObject.comment,
        feature
      )

  feature.desire
    && indexBlocks(
        indexes,
        [feature.desire],
         EAstObject.desire,
         feature
      )
  feature.perspective
    && indexBlocks(
        indexes,
        [feature.perspective],
         EAstObject.perspective,
         feature
      )

  feature.reason
    && indexReason(
        indexes,
        feature.reason,
        feature
      )

  feature.background
    && indexBackground(
        indexes,
        feature.background,
        feature
      )
  feature.rules
    && indexRules(
        indexes,
        feature.rules,
        feature
      )
  feature.scenarios
    && indexScenario(
        indexes,
        feature.scenarios,
        feature
      )

  return indexes
}
