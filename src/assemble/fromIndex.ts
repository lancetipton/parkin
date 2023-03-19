import type { TIndexAst } from '../types'

import { EStepType, EAstObject } from '../types'
import { formatAssembled } from './helpers'
import {
  assembleTags,
  assembleStep,
  assembleRule,
  assembleBlock,
  assembleFeature,
  assembleScenario,
  assembleBackground,
} from './assembleParts'

export const fromIndex = (
  indexes:TIndexAst,
) => {

  const assembled = indexes.reduce((assembled, item) => {
    switch(item.ast.type as string){
      case EStepType.given:
      case EStepType.when:
      case EStepType.then:
      case EStepType.and:
      case EStepType.but:
      case EStepType[`*`]:
      case EAstObject.step: {
        assembleStep(assembled, item)
        break
      }
      case EAstObject.tags: {
        assembleTags(assembled, item)
        break
      }
      case EAstObject.rule: {
        assembleRule(assembled, item)
        break
      }
      case EAstObject.block:
      case EAstObject.empty:
      case EAstObject.desire:
      case EAstObject.reason:
      case EAstObject.comment:
      case EAstObject.perspective: {
        assembleBlock(assembled, item)
        break
      }
      case EAstObject.feature: {
        assembleFeature(assembled, item)
        break
      }
      case EAstObject.scenario: {
        assembleScenario(assembled, item)
        break
      }
      case EAstObject.background: {
        assembleBackground(assembled, item)
        break
      }
    }

    return assembled
  }, [] as string[])

  return formatAssembled(assembled)
}