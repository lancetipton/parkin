import type {
  TRuleAst,
  TTagsAst,
  TStepAst,
  TBlockAst,
  TFeatureAst,
  TScenarioAst,
  TIndexItemAst,
  TBackgroundAst,
} from '../types'

import { EDocType } from '../types'
import { capitalize, exists } from '@keg-hub/jsutils'
import { EFeatureTypes, EAstObject } from '../types'
import { getTextContent, getWhiteSpace, addContent } from './helpers'

export const assembleFeature = (
  assembled:string[],
  { ast, parent }:TIndexItemAst
) => {
  const feature = ast as TFeatureAst
  addContent(
    assembled,
    getTextContent(feature, parent, EFeatureTypes.Feature, ``),
    feature.index
  )
}


const assembleStepDoc = (
  assembled:string[],
  step:TStepAst
) => {

  const { doc, whitespace:ws } = step

  const docPrefix = doc.type === EDocType.tick ? EDocType.ticks : EDocType.quotes
  const whitespace = doc.whitespace ?? getWhiteSpace(doc, step, exists<string>(ws) ? ws : `      `)

  // Add prefix with white space
  addContent(assembled, `${whitespace}${docPrefix}`, doc.index)

  // Add each line of the content, with the whitespace added
  // Use the doc.index to calculate the line index
  const lines = doc.content.split(`\n`)
    .map((line:string, idx:number) => addContent(assembled, `${whitespace}  ${line}`, doc.index + idx + 1))

  // Add the postfix,
  // Use the doc.index plus the lines length to calculate the index
  addContent(assembled, `${whitespace}${docPrefix}`, doc.index + lines.length + 1)

}

const assembleStepTable = (
  assembled:string[],
  step:TStepAst
) => {
  
  const { table, whitespace:ws } = step
  const whitespace = table.whitespace ?? getWhiteSpace(table, step, exists<string>(ws) ? ws : `      `)
  
  const colLengths:Record<string, number> = {}

  // Get the length of the longest item in each table column
  table.content.forEach((row, idx) => {
    row.forEach((col, cIdx) => {
      const ref = `${cIdx}`
      const cur = colLengths[ref]
      const local = col.length
      if(!cur || cur < local) colLengths[ref] = local
    })
  })

  // Do a second loop and add each row to the assembled
  // For each column take into account the longest column length
  // Add extra whitespace to the column if it's less then the max column length
  table.content.forEach((row, idx) => {
    const joined = []
    row.forEach((col, cIdx) => {
      const ref = `${cIdx}`
      const cur = colLengths[ref]
      const local = col.length
      if(cur > local){
        const diff = cur - local
        const add = new Array(diff).fill(' ').join('')
        joined.push(`${col}${add}`)
      }
      else joined.push(col)
    })

    addContent(assembled, `${whitespace}| ${joined.join(` | `)} |`, table.index + idx)

  })

}

export const assembleStep = (
  assembled:string[],
  { ast, parent }:TIndexItemAst
) => {
  const step = ast as TStepAst
  const whitespace = getWhiteSpace(
    step,
    parent,
    exists<string>(parent?.whitespace)
      ? `${parent?.whitespace}  `
      : `    `
  )
  const type = (step.type as string) !== EAstObject.step ? capitalize(step.type) : `Step`
  const text = `${whitespace}${type} ${step.step || ``}`
  addContent(assembled, text, step.index)

  step.doc && assembleStepDoc(assembled, step)
  step.table && assembleStepTable(assembled, step)

}

export const assembleTags = (
  assembled:string[],
  { ast, parent }:TIndexItemAst
) => {
  const tags = ast as TTagsAst
  const whitespace = getWhiteSpace(
    tags,
    parent,
    `feature` in parent ? `` : `  `
  )

  const content = tags.tokens.reduce((acc, token) => {
    const trimmed = token?.trim?.()
    return trimmed.length ? `${acc} @${token.replace(/^@/, ``)}` : acc
  }, ``).trim()

  addContent(
    assembled,
    `${whitespace || ``}${content}`,
    parent.tags.index
  )
}

export const assembleRule = (
  assembled:string[],
  { ast, parent }:TIndexItemAst
) => {
  const rule = ast as TRuleAst
  const whitespace = rule.whitespace || `  `
  addContent(assembled, `${whitespace}${EFeatureTypes.Rule}: ${rule.rule || ``}`, rule.index)
}

export const assembleBackground = (
  assembled:string[],
  { ast, parent }:TIndexItemAst
) => {
  const background = ast as TBackgroundAst
  addContent(
    assembled,
    getTextContent(background, parent, EFeatureTypes.Background, `  `),
    background.index
  )
}

export const assembleScenario = (
  assembled:string[],
  { ast, parent }:TIndexItemAst
) => {
  const scenario = ast as TScenarioAst
  const type = scenario.alias as EFeatureTypes || EFeatureTypes.Scenario
  addContent(
    assembled,
    getTextContent(scenario, parent, type, `  `),
    scenario.index
  )
}

export const assembleBlock = (
  assembled:string[],
  { ast, parent }:TIndexItemAst
) => {
  const block = ast as TBlockAst
  const whitespace = getWhiteSpace(block, parent, `  `)
  addContent(assembled, `${whitespace}${block.content}`, block.index)
}