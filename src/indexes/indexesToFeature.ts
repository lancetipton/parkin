import type {
  TTagsAst,
  TStepAst,
  TRuleAst,
  TIndexAst,
  TBlockAst,
  TFeatureAst,
  TScenarioAst,
  TIndexParentAst,
  TTagsParentAst,
  TBackgroundAst,
  TStepParentAst,
  TScenarioParentAst,
  TBackgroundParentAst,
} from '../types'

import { EAstObject } from '../types'
import { eitherArr, isArr } from '@keg-hub/jsutils'
import { searchIndexes } from './searchIndexes'

type TWithUuid = {
  uuid: string
  index: number
  content?:string
}


const mergeItem = <T extends TWithUuid, P>(
  parent:Partial<P>,
  key:keyof typeof parent,
  ast:T
) => {
  const existing = parent[key] as T

  ;(parent[key] as T) = !existing
    ? ast
    : existing?.uuid === ast?.uuid
      ? {...existing as T, ...ast}
      : ast

  return parent[key] as T
}

const astArray = <T extends TWithUuid, P>(
  parent:Partial<P>,
  key:keyof typeof parent,
  ast:T
) => {
  ;(parent[key] as T[]) = eitherArr<T[]>(parent[key], [])

  const typeArr = parent[key] as T[]
  const found = typeArr.find(item => item?.uuid === ast?.uuid)

  if(!found) return (parent[key] as T[]) = [...typeArr, ast]
  else if(key === EAstObject.empty && found.index === ast.index) return
  else if(key === EAstObject.comments && found?.content === ast?.content) return
  else {
    const idx = typeArr.indexOf(found)
    const updated = [...typeArr]
    updated[idx] = { ...found, ...ast}

    ;(parent[key] as T[]) = updated
  }

}


const mergeParent = <T extends TWithUuid, P=TIndexParentAst>(
  oldParent:P,
  newParent:P,
  item:T,
  key:keyof typeof oldParent,
) => {

  newParent[key] = key === EAstObject.background
    ? (newParent[key] || {}) as P[keyof P]
    : eitherArr<P[keyof P]>(newParent[key], [])

  const existing = eitherArr(newParent[key], [newParent[key]])?.find((item:T) => item?.uuid === item?.uuid)
  if(existing) return item

  const found = eitherArr(oldParent[key], [oldParent[key]])?.find((item:T) => item?.uuid === item?.uuid)
  const merged = !found ? item : {...found, ...item}

  isArr(newParent[key])
    ? (newParent[key] as T[]).push(merged)
    : (newParent[key] = merged)

  return merged
}

const throwMissing = (parent:TIndexParentAst) => {
  throw new Error(`The parent ${parent.uuid} does not exist in the Indexes array`)
}

const findParent = <T>(
  indexes:TIndexAst,
  oldFeature:TFeatureAst,
  newFeature:TFeatureAst,
  parent:TIndexParentAst
) => {
  if(parent.type === EAstObject.feature) return newFeature

  if(parent.type === EAstObject.rule)
    return mergeParent(
      oldFeature,
      newFeature,
      parent,
      EAstObject.rules
    ) as T

  // Find the parent in the indexes where it's a child, and has a parent
  const found = searchIndexes({
    indexes,
    uuid: parent.uuid,
    type: parent.type,
  })

  // If not found throw an error
  if(!found.ast) return throwMissing(parent) || parent

  const parentKey = parent.type === EAstObject.scenario
    ? EAstObject.scenarios
    : EAstObject.background

  // If the Parents Parent is the feature, then add the parent directly to the feature
  if(found.parent === oldFeature)
    return mergeParent(
      oldFeature,
      newFeature,
      parent,
      parentKey
    ) as T

  // Parents Parent is in the rules array then lookup the Parents Parent
  // And use that as the new Parents Parent
  const oldPP = found.parent
  const newPP = findParent<T>(indexes, oldFeature, newFeature, oldPP as TIndexParentAst)

  return mergeParent(
    oldPP,
    newPP,
    parent,
    parentKey
  ) as T
}

/**
 * Builds a TFeatureAst of changes by comparing in TIndexAst and TFeatureAst
 * Uses the current feature as the base to compare for differences
 * The indexes should be of the same feature, but can contain changes the feature does not have
 * This will return a partial TFeatureAst with those changes
 */
export const indexesToFeature = (
  indexes:TIndexAst,
  feature:TFeatureAst,
) => {

  return indexes.reduce((feat, item, idx) => {
    const { ast } = item
    if(ast === feature) return feat

    switch(ast.type as EAstObject){
    // --- These items parent is always Top level feature
      case EAstObject.desire: {
        mergeItem<TBlockAst, TFeatureAst>(
          feat,
          EAstObject.desire,
          ast as TBlockAst
        )
        break
      }
      case EAstObject.perspective: {
        mergeItem<TBlockAst, TFeatureAst>(
          feat,
          EAstObject.perspective,
          ast as TBlockAst
        )
        break
      }
      case EAstObject.reason: {
        astArray<TBlockAst, TFeatureAst>(
          feat as TFeatureAst,
          EAstObject.reason,
          ast as TBlockAst
        )
        break
      }
      case EAstObject.empty: {
        astArray<TBlockAst, TFeatureAst>(
          feat,
          EAstObject.empty,
          ast as TBlockAst
        )
        break
      }
      case EAstObject.comment: {
        astArray<TBlockAst, TFeatureAst>(
          feat,
          EAstObject.comments,
          ast as TBlockAst
        )
        break
      }
      case EAstObject.rule: {
        astArray<TRuleAst, TFeatureAst>(
          feat,
          EAstObject.rules,
          ast as TRuleAst
        )
        break
      }

    // --- These items have parents other then the Top level feature
      case EAstObject.scenario: {
        const parent = findParent<TScenarioParentAst>(
          indexes,
          feature,
          feat,
          item.parent
        )
        astArray<TScenarioAst, TScenarioParentAst>(
          parent as TScenarioParentAst,
          EAstObject.scenarios,
          ast as TScenarioAst
        )
        break
      }
      case EAstObject.tags: {
        const parent = findParent<TTagsParentAst>(
          indexes,
          feature,
          feat,
          item.parent
        )
        mergeItem<TTagsAst, TTagsParentAst>(
          parent,
          EAstObject.tags,
          ast as TTagsAst
        )
        break
      }
      case EAstObject.background: {
        const parent = findParent<TBackgroundParentAst>(
          indexes,
          feature,
          feat,
          item.parent
        )
        mergeItem<TBackgroundAst, TBackgroundParentAst>(
          parent as TBackgroundParentAst,
          EAstObject.background,
          ast as TBackgroundAst
        )
        break
      }
      case EAstObject.given:
      case EAstObject.when:
      case EAstObject.then:
      case EAstObject.and:
      case EAstObject.but:
      case EAstObject[`*`]:
      case EAstObject.step: {
        const parent = findParent<TStepParentAst>(
          indexes,
          feature,
          feat,
          item.parent
        )
        astArray<TStepAst, TStepParentAst>(
          parent,
          EAstObject.steps,
          ast as TStepAst
        )
        break
      }
    }

    return feat
  }, {} as TFeatureAst)
}