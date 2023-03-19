import type { TStepAst, TStepParentAst, TBlockParentAst } from '../types'

import { EStepType } from '../types'
import { uuid } from '@keg-hub/jsutils'
import { getRXMatch, getStartWhiteSpace } from '../utils/helpers'

const RX_STEP = /^\s*Step (.*)$/
const RX_GIVEN = /^\s*Given (.*)$/
const RX_WHEN = /^\s*When(.*)$/
const RX_THEN = /^\s*Then (.*)$/
const RX_AND = /^\s*And (.*)$/
const RX_BUT = /^\s*But (.*)$/
const RX_ASTERISK = /^\s*\* (.*)$/
const RX_DOC_QUOTES = /^\s*?"""\s*?/
const RX_DOC_QUOTES_FULL = /^\s*?"""(\s*?|.*?)*?"""/gm
const RX_DOC_TICKS = /^\s*?```\s*?/
const RX_DOC_TICKS_FULL = /^\s*?```(\s*?|.*?)*?```/gm
const RX_DATA_TABLE = /^\s*?\|/
const RX_DATA_TABLE_FULL = /^\s*?\|([^\S\r\n]*?|.*)\|/gm

/**
 * Regular expressions and types for matching step keywords
 * @type {Array}
 * @private
 */
const RegStepTags = [
  { regex: RX_STEP, type: EStepType.step },
  { regex: RX_GIVEN, type: EStepType.given },
  { regex: RX_WHEN, type: EStepType.when },
  { regex: RX_THEN, type: EStepType.then },
  { regex: RX_AND, type: EStepType.and },
  { regex: RX_BUT, type: EStepType.but },
  { regex: RX_ASTERISK, type: EStepType[`*`] },
]

/**
 * Check for a data table in the in the steps content
 * The string should be passed to the step def as the last argument
 * Each line of the data stable should be split in to arguments separated by |
 * @function
 * @private
 *
 * @todo Implement data table parsing
 *
 */
const checkDataTable = (
  step:TStepAst,
  lines:string[],
  line:string,
  index:number
) => {
  if (!RX_DATA_TABLE.test(line)) return step

  let tableEnd

  step.table = {
    index,
    content: lines.reduce((table, ln) => {
      tableEnd = tableEnd || !RX_DATA_TABLE.test(ln)
      !tableEnd &&
        table.push(
          ln.split('|').reduce((row, item) => {
            const column = item.trim()
            column && row.push(column)

            return row
          }, [])
        )

      return table
    }, []),
  }

  return step
}

/**
 * Check for doc strings in the steps
 * The string should be passed to the step def as the last argument
 * Space inside the doc string should be left as is
 * @function
 * @private
 *
 * @todo Implement doc string parsing
 *
 */
const checkDocString = (
  step:TStepAst,
  lines:string,
  line:string,
  index:number
) => {
  let docMatch = RX_DOC_QUOTES.test(line) && '"""'
  docMatch = docMatch || (RX_DOC_TICKS.test(line) && '```')

  if (!docMatch) return step

  // Get the white space leading up to the doc-string identifier
  // Create a regex white space chars to remove the same amount of white space
  // from the start of each line relative to the doc-string identifier
  // See here for more info => https://cucumber.io/docs/gherkin/reference/
  const whiteSpace = line.split(docMatch)[0]
  const spacer = new Array(whiteSpace.length).fill('\\s')
    .join('')
  const spacerRegex = new RegExp(`^${spacer}`)

  step.doc = {
    index,
    whiteSpace,
    type: docMatch === `"""` ? 'quote' : 'tick',
    // Split the passed in lines on the matching doc-string identifier
    // Then pull the second element from the array
    // Which is the content between the opening and closing doc-string identifiers
    // Then split it into an array single lines, and remove the starting white-space
    content: lines
      .split(docMatch)
      .slice(1)
      .shift()
      .trim()
      .split('\n')
      .reduce((cleaned, ln) => {
        cleaned.push(ln.replace(spacerRegex, '').trim())
        return cleaned
      }, [])
      .join('\n'),
  }

  return step
}

/*
 * Helper factory function to build a step object
 * @function
 * @private
 *
 */
const stepFactory = (
  type:EStepType,
  stepText:string,
  lines:string[],
  line:string,
  index:number
) => {
  let step = {
    type,
    index,
    step: stepText,
    whitespace: getStartWhiteSpace(line),
    uuid: uuid(),
  } as TStepAst

  // TODO: Need to add check if next line is empty of a comment
  // If it is, then need to go to line after that
  // And use that line for checking data tables and dock strings
  // Otherwise this will fail unless the table or doc comes directly after the step
  const nextIndex = index + 1
  const nextLine = lines[nextIndex]
  const afterLines = lines.slice(nextIndex)

  step = checkDataTable(step, afterLines, nextLine, nextIndex)
  step = checkDocString(step, afterLines.join('\n'), nextLine, nextIndex)

  return step
}

/**
 * Checks each step tag type, and adds it to current scenario when it exists
 * @function
 *
 */
export const parseStep = (
  parent:TBlockParentAst,
  lines:string[],
  line:string,
  index:number
) => {
  const stepParent = parent as TStepParentAst

  return RegStepTags.reduce((added, regTag) => {
    // If the line was already added, just return
    if (added) return added

    // Check if the line is a step tag
    const hasTag = regTag.regex.test(line)
    // If if is, add the extracted line to the steps of the current scenario
    hasTag &&
      stepParent.steps.push(
        stepFactory(
          regTag.type,
          getRXMatch(line, regTag.regex, 1),
          lines,
          line,
          index
        )
      )

    // Return if the line was added to the steps
    return hasTag
  }, false)
}
