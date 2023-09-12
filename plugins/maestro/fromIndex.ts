import type { TIndexAst } from '../../src/types'

import { Maestro } from './maestro'
import { EStepType, EAstObject } from '../../src/types'
import {
  assembleTags,
  assembleStep,
  assembleBlock,
  assembleFeature,
  assembleScenario,
} from './assembleParts'

export const fromIndex = (
  indexes:TIndexAst,
  maestro:Maestro,
) => {

  indexes.forEach(item => {
    switch(item.ast.type as string){
      case EStepType.given:
      case EStepType.when:
      case EStepType.then:
      case EStepType.and:
      case EStepType.but:
      case EStepType[`*`]:
      case EAstObject.step: {
        assembleStep(maestro, item)
        break
      }
      case EAstObject.tags: {
        assembleTags(maestro, item)
        break
      }
      case EAstObject.block:
      case EAstObject.empty:
      case EAstObject.desire:
      case EAstObject.reason:
      case EAstObject.comment:
      case EAstObject.perspective: {
        assembleBlock(maestro, item)
        break
      }
      case EAstObject.feature: {
        assembleFeature(maestro, item)
        break
      }
      case EAstObject.scenario: {
        assembleScenario(maestro, item)
        break
      }
    }

  }, [] as string[])

  return maestro
}
