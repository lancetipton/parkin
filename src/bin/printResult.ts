import type { TRunResults } from '../types'

import { Logger } from '@keg-hub/cli-utils'
import {emptyObj} from '@keg-hub/jsutils'

const FailText = (text:string) => `${Logger.colors.red(`✘`)} ─ ${text}`
const PassText = (text:string) => `${Logger.colors.green(`✔`)} ─ ${text}`

export type TPrintResultOpts = {
  failedOnly?:boolean
  steps?:boolean
  rules?:boolean
  features?:boolean
  errorOnly?:boolean
  stepParents?:boolean
}

export const printResult = (
  results:TRunResults,
  opts:TPrintResultOpts=emptyObj
) => {
  const {
    errorOnly,
    failedOnly,
    steps=true,
    features=true,
    stepParents=true,
  } = opts

  results.forEach((result) => {
    if((failedOnly || errorOnly) && result.passed) return

    const HeaderText = result.passed ? PassText : FailText
    if(features || !errorOnly || !result.passed)
      Logger.log(`${HeaderText(result.fullName)}\n`)

    result.describes.forEach(describe => {
      if((failedOnly || errorOnly) && describe.passed) return

      const DesText = describe.passed ? PassText : FailText
      if(stepParents || !errorOnly || !describe.passed)
        Logger.log(`  ${DesText(describe.description)}\n`)

      describe.tests.forEach(test => {
        if((failedOnly || errorOnly) && test.passed) return

        const TestText = test.passed ? PassText : FailText
        if(steps || !test.passed)
          Logger.log(`    ${TestText(test.description)}`)

        if(test.passed) return

        const space = `      `
        test.failedExpectations.forEach(failed => {
          Logger.log(`${space}${Logger.colors.red(failed.fullName)}:`)
          Logger.log(Logger.colors.red(
            failed.description.split(`\n`).map(line => `${space}  ${line}`).join(`\n`)
          ))
          Logger.empty()
        })

      })

    })
  })
  
  
  
  
}

