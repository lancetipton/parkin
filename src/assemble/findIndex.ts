import type {
  TBlockAst,
  TFindIndex,
  TFeatureAst,
  TStepParentAst,
  TScenarioParentAst,
  TBackgroundParentAst,
} from '../types'

import { EBlockLoc } from '../types'
import { emptyArr, isArr } from '@keg-hub/jsutils'
import { EStepType, EAstObject } from '../types'


/**
 * Map step and singular types to plural types of the EAstObject enum
 */
const AstTypeMap = {
  ...EAstObject,
  [EStepType.step]: EAstObject.steps,
  [EStepType.given]: EAstObject.steps,
  [EStepType.when]: EAstObject.steps,
  [EStepType.then]: EAstObject.steps,
  [EStepType.and]: EAstObject.steps,
  [EStepType.but]: EAstObject.steps,
  [EStepType[`*`]]: EAstObject.steps,
  [EAstObject.rule]: EAstObject.rules,
  [EAstObject.comment]: EAstObject.comments,
  [EAstObject.scenario]: EAstObject.scenarios,
}

/**
 * Checks all empty and comment block types for a matching index
 * If a match if found then add 1 to the index and check again
 * This ensures we don't overwrite an existing comment or empty line
 *
 */
const checkBlocks = (blocks:TBlockAst[], idx:number):number => {
  const filtered = blocks.filter(block => block.index <= idx)
  const match = filtered.find(block => block.index === idx)

  return match ? checkBlocks(filtered, idx + 1) : idx
}

/**
 * Checks the global blocks to ensure we don't overwrite one of them
 */
const validateIndex = (
  feature:TFeatureAst,
  index:number
) => {
   return checkBlocks(
    [
    ...(feature.empty || emptyArr),
    ...(feature.comments || emptyArr)
  ], index)
}

const indexFromBlocks = ({
  loc,
  type,
  parent,
  feature,
}:TFindIndex) => {

  if(type === EAstObject.tags){
    const idx = parent.index - 1
    // Ensure we don't go -1 when feature is at 0 index
    return idx >= 0 ? idx : 0
  }

  if(loc)
    return loc === EBlockLoc.before ? parent.index - 1 : parent.index + 1

  const blocks = type === EAstObject.empty? feature.empty : feature.comments

  if(blocks?.length)
    return blocks[blocks.length - 1].index + 1

  // If no empty exist, add it to the end
  const contentSplit = feature.content.split(`\n`)
  return contentSplit.length
}

const indexFromStory = (
  feature:TFeatureAst
) => {
  return isArr<TBlockAst[]>(feature?.reason)
    ? feature.reason[feature.reason.length - 1].index + 1
    : feature?.reason
      ? feature.reason.index + 1
      : feature?.desire?.index
        ? feature.desire.index + 1
        : feature.perspective.index
          ? feature?.perspective?.index + 1
          : feature.index + 1
}

const indexFromBackground = (
  parent:TBackgroundParentAst,
  feature:TFeatureAst
) => {

  return parent?.background
    ? indexFromSteps(parent.background)
    : parent === feature
      ? indexFromStory(feature)
      : parent.index + 1
}

const indexFromRule = (
  feature:TFeatureAst
) => {

  if(!feature?.rules?.length)
    return indexFromBackground(feature, feature)

  const rule = feature.rules[feature.rules.length - 1]

  return rule?.scenarios?.length
    ? indexFromScenarios(rule, feature)
    : rule?.background
      ? indexFromBackground(rule, feature)
      : rule.index + 1
}

const indexFromScenarios = (
  parent:TScenarioParentAst,
  feature:TFeatureAst
) => {

  // Check existing scenarios
  // If the parent is the feature, index from the rules
  // Otherwise parent is a rule, so index from the it's background
  if(!parent?.scenarios?.length)
    return  parent === feature
      ? indexFromRule(feature)
      : indexFromBackground(parent, feature)

  // If last scenario has steps, then use the last steps index + 1
  // Otherwise use the last scenario's index
  const scenario = parent.scenarios[parent.scenarios.length - 1]

  return indexFromSteps(scenario)
}

const indexFromSteps = (
  parent:TStepParentAst
) => {
  return parent?.steps?.length
    ? parent.steps[parent.steps.length - 1].index + 1
    : parent.index + 1
}


/**
 * Get the parent index, and add the step length to it
 * So parent == 4 + step length == 2 + 1, next index is 7
 * Index is global, but stepParent.steps is local
 * So add 1 because we don't count the 0 index at local
 * Validate the index with the feature blocks
 * Ensure we don't overwrite a comment of empty line
 */
export const findIndex = (props:TFindIndex) => {

  const {
    type,
    parent,
    feature,
  } = props

  const astType = AstTypeMap[type] || type

  switch(astType){

    // ---- Comments Index ---- //
    case EAstObject.comments: {
      const idx = indexFromBlocks(props)
      return validateIndex(feature, idx)
    }

    // ---- Empty Index ---- //
    case EAstObject.empty: {
      const idx = indexFromBlocks(props)
      return validateIndex(feature, idx)
    }

    // ---- Tags Index ---- //
    case EAstObject.tags: {
      const idx = indexFromBlocks(props)
      return validateIndex(feature, idx)
    }

    // ---- Background Index ---- //
    case EAstObject.background: {
      const backParent = parent as TBackgroundParentAst
      const idx = indexFromBackground(backParent, feature)
      
      return validateIndex(feature, idx)
    }

    // ---- Rules Index ---- //
    case EAstObject.rules: {
      const feat = parent as TFeatureAst
      const idx = indexFromRule(feat)

      return validateIndex(feat, idx)
    }

    // ---- Scenarios Index ---- //
    case EAstObject.scenarios: {
      const sParent = parent as TScenarioParentAst
      const idx = indexFromScenarios(sParent, feature)

      return validateIndex(feature, idx)
    }
    
    // ---- Steps Index ---- //
    case EAstObject.steps: {
      const stepParent = parent as TStepParentAst
      const idx = indexFromSteps(stepParent)

      return validateIndex(feature, idx)
    }
  }

}