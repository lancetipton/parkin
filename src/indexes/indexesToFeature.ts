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
import { eitherArr } from '@keg-hub/jsutils'

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

const mergeParent = <T extends TWithUuid, P=TFeatureAst>(
  oldFeat:P,
  newFeat:P,
  parent:T,
  key:keyof typeof oldFeat,
) => {
  ;(newFeat[key] as T[]) = eitherArr<T[]>(newFeat[key], [])

  const existing = (newFeat[key] as T[])?.find(item => item.uuid === parent.uuid)
  if(existing) return parent
  
  const found = (oldFeat[key] as T[])?.find(item => item.uuid === parent.uuid)
  const merged = !found ? parent : {...found, ...parent}

  ;(newFeat[key] as T[]).push(merged)
  
  return merged
}

const findParent = <T>(
  oldFeat:TFeatureAst,
  newFeat:TFeatureAst,
  parent:TIndexParentAst
) => {
  
  switch(parent.type){
      case EAstObject.feature: {
        return newFeat as T
      }
      case EAstObject.background: {
        const background = mergeItem<TBackgroundAst, TFeatureAst>(
          { background: oldFeat.background },
          EAstObject.background,
          parent as TBackgroundAst,
        )
        if(background) newFeat.background = background

        return background as T
      }
      case EAstObject.rule: {
        return mergeParent<TRuleAst>(
          oldFeat,
          newFeat,
          parent as TRuleAst,
          EAstObject.rules
        ) as T
      }
      case EAstObject.scenario: {
        return mergeParent<TScenarioAst>(
          oldFeat,
          newFeat,
          parent as TScenarioAst,
          EAstObject.scenarios
        ) as T
      }
  }
  
}


/**
 * Builds a TFeatureAst from the passed in TIndexAst
 * Uses the current feature to fill missing feature values
 * Can be treated as a merge of a feature and updates to it
 * The indexes should be of the same feature
 */
export const indexesToFeature = (
  indexes:TIndexAst,
  feature:TFeatureAst,
) => {

  return indexes.reduce((feat, item, idx) => {
    const { ast } = item
    if(ast === feature) return feat

    switch(ast.type as EAstObject){
      case EAstObject.desire: {
        const parent = findParent<TFeatureAst>(
          feature,
          feat,
          item.parent
        )
        mergeItem<TBlockAst, TFeatureAst>(
          parent,
          EAstObject.desire,
          ast as TBlockAst
        )
        break
      }
      case EAstObject.perspective: {
        const parent = findParent<TFeatureAst>(
          feature,
          feat,
          item.parent
        )
        mergeItem<TBlockAst, TFeatureAst>(
          parent,
          EAstObject.perspective,
          ast as TBlockAst
        )
        break
      }
      case EAstObject.tags: {
        const parent = findParent<TTagsParentAst>(
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
          feature,
          feat,
          item.parent
        )
        mergeItem<TBackgroundAst, TBackgroundParentAst>(
          parent,
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
      case EAstObject.reason: {
        const parent = findParent<TFeatureAst>(
          feature,
          feat,
          item.parent
        )
        astArray<TBlockAst, TFeatureAst>(
          parent,
          EAstObject.reason,
          ast as TBlockAst
        )
        break
      }
      case EAstObject.empty: {
        const parent = findParent<TFeatureAst>(
          feature,
          feat,
          item.parent
        )
        astArray<TBlockAst, TFeatureAst>(
          parent,
          EAstObject.empty,
          ast as TBlockAst
        )
        break
      }
      case EAstObject.comment: {
        const parent = findParent<TFeatureAst>(
          feature,
          feat,
          item.parent
        )
        astArray<TBlockAst, TFeatureAst>(
          parent,
          EAstObject.comments,
          ast as TBlockAst
        )
        break
      }
      case EAstObject.rule: {
        const parent = findParent<TFeatureAst>(
          feature,
          feat,
          item.parent
        )
        astArray<TRuleAst, TFeatureAst>(
          parent,
          EAstObject.rules,
          ast as TRuleAst
        )
        break
      }
      case EAstObject.scenario: {
        const parent = findParent<TScenarioParentAst>(
          feature,
          feat,
          item.parent
        )
        astArray<TScenarioAst, TScenarioParentAst>(
          parent,
          EAstObject.scenarios,
          ast as TScenarioAst
        )
        break
      }
    }

    return feat
  }, {} as TFeatureAst)
}