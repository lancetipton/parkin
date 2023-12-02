import type {
  TTagsAst,
  TRuleAst,
  TStepAst,
  TBlockAst,
  TScenarioAst,
  TBackgroundAst,
  TStepParentAst,
} from '../types'

import { deepEqual } from '@keg-hub/jsutils/deepEqual'
import { flatUnion } from '@keg-hub/jsutils/flatUnion'


export const dataMappers = {
  empty: (
    current?:TBlockAst[],
    updated?:TBlockAst[],
  ) => {
    if(!updated?.length) return !current?.length ? current || [] : []
    if(!current?.length) return updated || []

    let hasChange = false
    const empty = updated.map(empty => {
      const found = current?.find?.(st => st.uuid === empty.uuid)
      if(deepEqual(found, empty)) return found

      hasChange = true
      return !found ? empty : {...found, ...empty} as TBlockAst
    })

    return (hasChange ? empty : current || []) as TBlockAst[]
  },
  tags: (
    current?:TTagsAst,
    updated?:TTagsAst,
    merge:boolean=true
  ) => {
    const uToken = updated?.tokens || []
    const cToken = current?.tokens || []

    if(!uToken?.length)
      return !merge || !cToken.length ? undefined : current

    if(!cToken.length) return updated

    if(deepEqual(current, updated)) return current

    const tokens = flatUnion(current?.tokens, updated?.tokens)
    
    return {
      ...current,
      ...updated,
      tokens,
      content: tokens.join(` `)
    }
    
  },
  steps: (
    current:TStepAst[],
    updated:TStepAst[]
  ) => {
    if(!updated?.length) return !current?.length ? current || [] : []
    if(!current?.length) return updated || []

    let hasChange = false
    const steps = updated.map(step => {
      const found = current?.find?.(st => st.uuid === step.uuid)

      if(deepEqual(found, step)) return found

      hasChange = true
      return !found ? step : {...found, ...step} as TStepAst
    })

    return hasChange ? steps : current
  },
  parentSteps: <T extends TStepParentAst>(
    current:T,
    updated:T
  ) => {
    if(!current || !updated) return updated

    const { steps:exSteps, tags:exTags, ...exNoSteps } = current
    const { steps:uSteps, tags:uTags, ...uNoSteps } = updated

    const tags = dataMappers.tags(exTags, uTags)
    const tagsEql = tags === exTags

    const steps = dataMappers.steps(exSteps, uSteps)
    const stepsEql = steps === exSteps

    if(tagsEql && stepsEql && deepEqual(exNoSteps, uNoSteps)) return current

    const item = {...exNoSteps, ...uNoSteps, steps} as T

    // Only add tags if they still exist
    if(tags) item.tags = tags

    return item
  },
  background: (
    current?:TBackgroundAst,
    updated?:TBackgroundAst,
  ) => {
    if(!updated) return undefined
    if(!current) return updated

    return dataMappers.parentSteps<TBackgroundAst>(current, updated)
  },
  scenarios: (
    current?:TScenarioAst[],
    updated?:TScenarioAst[],
  ) => {
    if(!updated?.length) return !current?.length ? current || [] : []
    if(!current?.length) return updated || []

    let hasChange = false
    const scenarios = updated.map(scenario => {
      const existing = current?.find?.(sc => sc.uuid === scenario.uuid)

      if(!existing){
        hasChange = true
        return scenario
      }

      const mapped = dataMappers.parentSteps<TScenarioAst>(existing, scenario)
      if(!hasChange) hasChange = mapped !== existing

      return mapped
    }).filter(Boolean)

    return hasChange ? scenarios : current
  },
  rules: (
    current?:TRuleAst[],
    updated?:TRuleAst[],
  ) => {
    if(!updated?.length) return !current?.length ? current || [] : []
    if(!current?.length) return updated || []

    let hasChange = false
    const rules = updated.map(rule => {
      const existing = current?.find?.(rl => rl.uuid === rule.uuid)

      if(!existing){
        hasChange = true
        return rule
      }

      const { scenarios:exScenarios, background:exBack, ...exRule } = existing
      const { scenarios:uScenarios, background:UBack, ...uRule } = rule

      const background = dataMappers.background(exBack, UBack)
      const backEql = exBack === background

      const scenarios = dataMappers.scenarios(exScenarios, uScenarios)
      const scenarioEql = scenarios === exScenarios

      if(scenarioEql && backEql && deepEqual(exRule, uRule))
        return existing

      hasChange = true
      const item = {...exRule, ...uRule, scenarios } as TRuleAst

      // Only add the background if the update still has one
      if(background) item.background = background

      return item
    })

    return hasChange ? rules : current
  }
}
