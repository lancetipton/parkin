import type {
  TAstType,
  TBlockAst,
  TFindIndex,
  TFeatureAst,
  TStepParentAst,
  TScenarioParentAst,
  TBackgroundParentAst,
} from '../types'

import { EBlockLoc } from '../types'
import { EStepType, EAstObject } from '../types'
import { emptyArr, exists, isArr, isObj, isNum } from '@keg-hub/jsutils'


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

const validObj = (child:TAstType) => {
  return isObj<TBlockAst>(child) && isNum(child?.index)
}

const validArr = (childArr:TAstType[]) => {
  return isArr<TAstType[]>(childArr) && childArr?.length
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

  if(loc){
    const found = loc === EBlockLoc.before ? parent.index - 1 : parent.index + 1
    const tagCheck = parent?.tags?.index === found ? found - 1 : found

    return tagCheck > 0 ? tagCheck : 0
  }

  const blocks = type === EAstObject.empty ? feature.empty : feature.comments

  if(blocks?.length)
    return blocks[blocks.length - 1].index + 1

  // If no empty exist, add it to the end
  const contentSplit = feature.content.split(`\n`)
  return contentSplit.length
}

const indexFromStory = (feature:TFeatureAst) => {
  const {
    index,
    reason,
    desire,
    perspective,
  } = feature
  
  if(validArr(reason as TBlockAst[])){
    const arr = reason as TBlockAst[]
    const re = arr[arr.length - 1]

    if(validObj(re)) return re.index + 1
  }
  else if(validObj(reason as TBlockAst)) return (reason as TBlockAst).index + 1

  if(validObj(desire)) return desire.index + 1

  if(validObj(perspective)) return perspective.index + 1

  return index + 1
}

const indexFromBackground = (
  parent:TBackgroundParentAst,
  feature:TFeatureAst
) => {

  if(validObj(parent?.background)){
    const idx = indexFromSteps(parent.background)
    if(exists(idx)) return idx
  }

  return parent === feature ? indexFromStory(feature) : parent.index + 1
}

const indexFromRule = (
  feature:TFeatureAst
) => {
  if(!validArr(feature?.rules)) return indexFromBackground(feature, feature)

  const rule = feature?.rules?.[feature.rules.length - 1]

  return validArr(rule?.scenarios)
    ? indexFromScenarios(rule, feature)
    : validObj(rule?.background)
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
  if(validArr(parent?.scenarios)){
    // If last scenario has steps, then use the last steps index + 1
    // Otherwise use the last scenario's index
    const scenario = parent.scenarios[parent.scenarios.length - 1]

    if(validObj(scenario)) return indexFromSteps(scenario)
  }

  return parent === feature
    ? indexFromRule(feature)
    : indexFromBackground(parent, feature)
}

const indexFromSteps = (
  parent:TStepParentAst
) => {

  const step = validArr(parent?.steps)
    && parent.steps[parent.steps.length - 1]

  if(!validObj(step)) return parent?.index + 1

  if(step.doc){
    const docIdx = step.doc.index
    const contentLength = step.doc.content.split(`\n`).length
    // Add 2 because the opening and closing prefixes, i.e. ``` || """
    return docIdx + contentLength + 2
  }

  if(step.table){
    const tableIdx = step.table.index
    const contentLength = step.table.content.length
    // Add 2 because the opening and closing prefixes, i.e. ``` || """
    return tableIdx + contentLength + 2
  }

  return step.index + 1
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