import type {
  TRuleAst,
  TTagsAst,
  TStepAst,
  TBlockAst,
  TIndexAst,
  TScenarioAst,
  TBackgroundAst,
} from '../types'
import type { TFeatureAst, TAssembleFeatureArgOpts } from '../types'

import { addContent } from './addContent'
import { emptyObj, capitalize, exists } from '@keg-hub/jsutils'
import { EFeatureTypes, EStepType, EAstObject } from '../types'

export const indexed = (
  indexes:TIndexAst,
  opts:TAssembleFeatureArgOpts=emptyObj as TAssembleFeatureArgOpts
) => {

  const assembled = indexes.reduce((assembled, item, idx) => {
    const { ast, parent } = item
    
    const type = item.ast.type as string
    switch(type){
      case EStepType.given:
      case EStepType.when:
      case EStepType.then:
      case EStepType.and:
      case EStepType.but:
      case EStepType[`*`]:
      case EAstObject.step: {
        const step = ast as TStepAst
        const parentWS = (parent as TRuleAst).whitespace
        const whitespace = step.whitespace || (parentWS ? `${parentWS}  ` : `    `)
        const type = (step.type as string) !== EAstObject.step ? capitalize(step.type) : `Step`
        addContent(
          assembled,
          `${whitespace}${type} ${step.step || ``}`,
          indexes && step.index
        )
        break
      }
      case EAstObject.tags: {
        const tags = ast as TTagsAst
        addContent(
          assembled,
          `${tags.whitespace || (parent as TRuleAst).whitespace || ``}${tags.tokens.join(' ')}`,
          indexes && parent.tags.index
        )
        break
      }
      case EAstObject.rule: {
        const rule = ast as TRuleAst
        const whitespace = rule.whitespace || `  `
        addContent(assembled, `${whitespace}${EFeatureTypes.Rule}: ${rule.rule || ``}`, rule.index)
        break
      }
      case EAstObject.block:
      case EAstObject.empty:
      case EAstObject.desire:
      case EAstObject.reason:
      case EAstObject.comment:
      case EAstObject.perspective: {
        const block = ast as TBlockAst
        addContent(assembled, block.content, block.index)
        break
      }
      case EAstObject.feature: {
        const feature = ast as TFeatureAst
        addContent(
          assembled,
          `${EFeatureTypes.Feature}: ${feature.feature}`,
          feature.index
        )
        break
      }
      case EAstObject.scenario: {
        const scenario = ast as TScenarioAst
        const parentWS = (parent as TRuleAst).whitespace
        const type = scenario.alias || EFeatureTypes.Scenario
        const whitespace = scenario.whitespace || (parentWS ? `${parentWS}  ` : `  `)
        addContent(assembled, `${whitespace}${type}: ${scenario.scenario || ``}`, scenario.index)
        break
      }
      case EAstObject.background: {
        const background = ast as TBackgroundAst
        const parentWS = (parent as TRuleAst).whitespace
        const whitespace = background.whitespace || (parentWS ? `${parentWS}  ` : `  `)
        addContent(assembled, `${whitespace}${EFeatureTypes.Background}: ${background.background || ``}`, background.index)
        break
      }
    }

    return assembled
  }, [] as string[])

  return  Array.from(assembled, (line) => !exists(line) ? '\n' : `${line}\n`).join(``)
}