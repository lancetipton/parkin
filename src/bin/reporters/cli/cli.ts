import type { TFailedErrorResult, TRunResults } from '../../../types'

import { Logger } from '@keg-hub/cli-utils'
import {emptyObj} from '@keg-hub/jsutils'

import {
  Tags,
  Format,
  FormatLine,
  FormatError,
  FormatChild,
  FormatParent,
  FormatErrors,
} from './formatters'


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

const FailText = (text:string) => `${Logger.colors.red(`✘`)} ${Logger.colors.gray(`-`)} ${text}`
const PassText = (text:string) => `${Logger.colors.green(`✔`)} ${Logger.colors.gray(`-`)} ${text}`

const printResult = (
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
 
    if(!hasFailed && result.failed) hasFailed = result.failed

    if(features && (!errorOnly || !result.passed))
      output.push(FormatParent(result.fullName, result.failed, result.failed))

    result.describes.forEach(describe => {
      if((failedOnly || errorOnly) && describe.passed) return

      if(stepParents && (!errorOnly || !describe.passed))
        output.push(FormatParent(describe.description, result.failed, describe.failed))

      describe.tests.forEach(test => {
        if((failedOnly || errorOnly) && test.passed) return

        if(steps || !test.passed)
          output.push(FormatChild(test.description, result.failed, test.failed))

        test.failed && output.push(FormatErrors(test.failedExpectations as TFailedErrorResult[]))

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

export const CLIReporter = {
  tags: Tags,
  fail: FailText,
  pass: PassText,
  results: printResult,
  format: {
    format: Format,
    line: FormatLine,
    error: FormatError,
    child: FormatChild,
    parent: FormatParent,
    errors: FormatErrors,
  }
}
