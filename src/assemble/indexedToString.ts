import type {
  TAstType,
  TRuleAst,
  TTagsAst,
  TStepAst,
  TBlockAst,
  TIndexAst,
  TScenarioAst,
  TBackgroundAst,
} from '../types'
import type { TFeatureAst } from '../types'

import { capitalize, exists } from '@keg-hub/jsutils'
import { EFeatureTypes, EStepType, EAstObject } from '../types'

/**
 * Converts the assembled array into a formatted feature string
 * Calls helper to format comment lines containing a #
 * Adds a line ending char at the end of each line => '\n'
 * @function
 * @private
 */
const formatAssembled = (
  assembled:string[],
) => {
  // Use array.from to allow access to empty array position
  // This ensures we can replace it with an empty string
  return Array.from(assembled, (line) => exists(line) ? `${line}\n` : '\n').join('')
}

/**
 * Adds content to the assembled array based on the passed in index
 * If no index exists, then the content is added to the end
 * If the index already exists, then the content is spliced into the array at the index
 * @function
 * @private
 *
 */
const addContent = (
  assembled:string[],
  content:string,
  index?:number | false
) => {
  !exists(index) || index === false
    ? assembled.push(content)
    : exists(assembled[index])
      ? assembled.splice(index, 0, content)
      : (assembled[index] = content)
}


const getWhiteSpace = (ast:TAstType|TBlockAst|TTagsAst, parent:TAstType, def=``) => {
  return exists<string>(ast.whitespace)
    ? ast.whitespace
    : exists<string>(parent?.whitespace)
      ? `${parent.whitespace}${def}`
      : def
}

const getTextContent = (
  ast:TAstType|TBlockAst|TTagsAst,
  parent:TAstType,
  type:EFeatureTypes,
  def=``
) => {
    const content = ast[ast.type] as string || ``
    const whitespace = getWhiteSpace(ast, parent, def)
    const prefix = `${whitespace}${type}:`

    return content.length ? `${prefix} ${content}` : prefix
}


export const indexedToString = (
  indexes:TIndexAst,
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
        const whitespace = getWhiteSpace(step, parent, `    `)
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
        const whitespace = getWhiteSpace(tags, parent)
        addContent(
          assembled,
          `${whitespace || ``}${tags.tokens.join(' ')}`,
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
        const whitespace = getWhiteSpace(block, parent, `  `)
        addContent(assembled, `${whitespace}${block.content}`, block.index)
        break
      }
      case EAstObject.feature: {
        const feature = ast as TFeatureAst
        addContent(
          assembled,
          getTextContent(feature, parent, EFeatureTypes.Feature, ``),
          feature.index
        )
        break
      }
      case EAstObject.scenario: {
        const scenario = ast as TScenarioAst
        const type = scenario.alias as EFeatureTypes || EFeatureTypes.Scenario
        addContent(
          assembled,
          getTextContent(scenario, parent, type, `  `),
          scenario.index
        )
        break
      }
      case EAstObject.background: {
        const background = ast as TBackgroundAst
        addContent(
          assembled,
          getTextContent(background, parent, EFeatureTypes.Background, `  `),
          background.index
        )
        break
      }
    }

    return assembled
  }, [] as string[])

  return formatAssembled(assembled)
}