import type {
  TFeatureAst,
  TScenarioAst,
  TAssembleOpts,
  TStepParentAst,
  TScenarioParentAst,
  TBackgroundParentAst
} from '../types'
import { featureEmptyLine } from '../parse/ensureMeta'
import { ensureArr, emptyObj, omitKeys, isArr } from '@keg-hub/jsutils'

export const ensureBackgroundFirst = <T extends TBackgroundParentAst>(parent:T, opts:TAssembleOpts) => {
  if(!opts.backgroundAfterParent) return parent

  const { scenarios, background } = parent
  if(!background || !scenarios?.length) return parent

  const backgroundIdx = background.index
  let lowIdx = backgroundIdx

  scenarios.forEach(scenario => lowIdx > scenario.index && (lowIdx = scenario.index))
  const bgIdx = lowIdx !== backgroundIdx ? lowIdx - 1 : backgroundIdx
  parent.background = {...background, index: bgIdx}

  return parent
}

export const addEmptyLine = (feature:TFeatureAst, idx:number, opts:TAssembleOpts) => {
  if(!feature.empty?.length) feature.empty = []

  featureEmptyLine(feature, ``, idx + 1)

  return feature
}

export const formatStory = (
  feature:TFeatureAst,
  opts:TAssembleOpts=emptyObj
) => {
  const {desire, perspective, reason} = feature

  let lastIdx = feature.index
  if(reason)
    isArr(reason)
      ? ensureArr(reason).forEach(res => lastIdx = res.index > lastIdx ? res.index : lastIdx)
      : (lastIdx = reason.index)
  else if(desire) lastIdx = desire.index
  else if(perspective) lastIdx = perspective.index

  addEmptyLine(feature, lastIdx, opts)
  
  return feature
}

export const formatOptions = (
  feature:TFeatureAst,
  opts:TAssembleOpts=emptyObj
) => {
  const keys = []
  const {
    removeEmpty,
    removeComments,
    emptyAfterStory,
    emptyAfterFeature
  } = opts
  
  removeEmpty && keys.push(`empty`)
  removeComments && keys.push(`comments`)

  const updated = omitKeys<TFeatureAst>(feature, keys)
  if(emptyAfterStory || emptyAfterFeature)
    !emptyAfterStory
      ? addEmptyLine(updated, updated.index, opts)
      : formatStory(updated, opts)

  return updated
}

export const formatSteps = <T extends TStepParentAst>(
  feature:TFeatureAst,
  parent:T,
  opts:TAssembleOpts
) => {

  if(!opts.emptyAfterSteps) return parent

  const lastIdx = parent.steps.reduce((index, step) => (
    step.index > index ? step.index : index
  ), parent.index)

  addEmptyLine(feature, lastIdx, opts)

  return parent
}

export const formatBackground = <T extends TBackgroundParentAst>(
  feature:TFeatureAst,
  parent:T,
  opts:TAssembleOpts
) => {
  if(!parent?.background) return parent
  
  const { emptyAfterBackground } = opts
  let updated = ensureBackgroundFirst(parent, opts)
  emptyAfterBackground && addEmptyLine(feature, parent.background.index, opts)

  const background = formatSteps(feature, parent.background, opts)
  updated.background = background

  return updated as T
}

export const formatScenarios = <T extends TScenarioParentAst>(
  feature:TFeatureAst,
  parent:T,
  opts:TAssembleOpts,
) => {
  if(!parent?.scenarios) return parent

  const { emptyAfterScenario } = opts

  const scenarios = parent.scenarios.reduce((acc, scenario) => {
    emptyAfterScenario && addEmptyLine(feature, scenario.index, opts)
    const updated = formatSteps(feature, scenario, opts)

    acc.push(updated)

    return acc
  }, [] as TScenarioAst[])

  parent.scenarios = scenarios

  return parent
}

export const formatRules = (feature:TFeatureAst, opts:TAssembleOpts) => {
  if(!feature?.rules) return feature

  const { emptyAfterRule } = opts

  const rules = feature.rules.reduce((acc, rule) => {
    emptyAfterRule && addEmptyLine(feature, rule.index, opts)

    let updated = formatBackground(feature, rule, opts)

    updated?.scenarios?.length
      && (updated = formatScenarios(feature, updated, opts))
    
    acc.push(updated)

    return acc
  }, [])

  return {...feature, rules}
}

export const formatFeature = (
  feature:TFeatureAst,
  opts:TAssembleOpts=emptyObj
) => {
  let updated = formatOptions(feature, opts)  
  updated = formatBackground(updated, updated, opts)
  updated = formatRules(updated, opts)
  updated = formatScenarios(updated, updated, opts)

  return updated
}

