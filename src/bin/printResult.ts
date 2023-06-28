import type { TRunResults } from '../types'

import { Logger } from '@keg-hub/cli-utils'
import {emptyObj} from '@keg-hub/jsutils'

const FailText = (text:string) => `${Logger.colors.red(`✘`)} ${Logger.colors.gray(`-`)} ${text}`
const PassText = (text:string) => `${Logger.colors.green(`✔`)} ${Logger.colors.gray(`-`)} ${text}`

export type TPrintResultOpts = {
  failedOnly?:boolean
  steps?:boolean
  rules?:boolean
  features?:boolean
  errorOnly?:boolean
  stepParents?:boolean
  throwOnFailed?:boolean
  exitWithError?:boolean
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
    exitWithError,
    throwOnFailed
  } = opts

  let hasFailed:boolean
  const output:string[] = []

  results.forEach((result) => {
    if((failedOnly || errorOnly) && result.passed) return

    hasFailed = true
    const HeaderText = result.passed ? PassText : FailText
    if(features || !errorOnly || !result.passed)
      output.push(`${HeaderText(result.fullName)}\n`)

    result.describes.forEach(describe => {
      if((failedOnly || errorOnly) && describe.passed) return

      const DesText = describe.passed ? PassText : FailText
      if(stepParents || !errorOnly || !describe.passed)
        output.push(`  ${DesText(describe.description)}\n`)

      describe.tests.forEach(test => {
        if((failedOnly || errorOnly) && test.passed) return

        const TestText = test.passed ? PassText : FailText
        if(steps || !test.passed)
          output.push(`    ${TestText(test.description)}\n`)

        if(test.passed) return

        const space = `      `
        test.failedExpectations.forEach(failed => {
          output.push(`${space}${Logger.colors.red(failed.fullName)}:\n`)
          output.push(Logger.colors.red(
            failed.description.split(`\n`).map(line => `${space}  ${line}`).join(`\n`)
          ))
          output.push(`\n`)
        })

      })

    })
  })
  
  if(!hasFailed){
    if(!exitWithError) return output.length && Logger.log(output.join(``))
    output.length && Logger.log(output.join(``))
    Logger.empty()
    Logger.log(PassText(`All features ${Logger.colors.green(`passed`)}\n`))
    process.exit(0)
  }

  if(exitWithError){
    output.length && Logger.log(output.join(``))
    Logger.empty()
    Logger.log(FailText(`One or more Features ${Logger.colors.red(`failed`)}\n`))
    Logger.empty()
    process.exit(1)
  }

  output.length && Logger.log(output.join(``))

  if(throwOnFailed)
    throw new Error(`One or more Features failed`)

}

