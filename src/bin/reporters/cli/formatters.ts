import type { TFailedErrorResult, TRunResult } from '../../../types'

import { Logger } from '@keg-hub/cli-utils'

export type TFormatLine = {
  type:string
  text:string
  failed?:boolean
  isFailed?:boolean
  isParent?:boolean
  isFeature?:boolean
}

const Clrs = Logger.colors
const FailTag = `${Clrs.colorMap.red}✘`
const PassTag = `${Clrs.colorMap.green}✔`
const WarnTag = `${Clrs.colorMap.yellow}○`
const FPassTag = `\x1b[42m\x1b[30m PASS \x1b[0m`
const FFailTag = `\x1b[41m\x1b[30m FAIL \x1b[0m`
const FWarnTag = `\x1b[43m\x1b[30m WARN \x1b[0m`

export const Tags = {
  root: {
    fail: FFailTag,
    pass: FPassTag,
    warn: FWarnTag,
  },
  child: {
    fail: FailTag,
    pass: PassTag,
    warn: WarnTag,
  }
}

const DimText = (text:string) => (`${Clrs.colorMap.dim}${text}`)

const ColorMap = {
  Feature: {
    text: Clrs.colorMap.gray,
    type: Clrs.colorMap.yellow,
  },
  Rule: {
    text: Clrs.colorMap.gray,
    type: Clrs.colorMap.blue,
  },
  Parent: {
    text: Clrs.colorMap.gray,
    type: Clrs.colorMap.magenta,
  },
  Step: {
    text: Clrs.colorMap.gray,
    type: Clrs.colorMap.cyan,
  },
  Error: {
    text: Clrs.colorMap.white,
    type: Clrs.colorMap.red,
  }
}

export const FormatLine = (args:TFormatLine) => {
  const {
    type,
    text,
    failed,
    isParent,
    isFailed,
    isFeature,
  } = args

  const sep = isParent ? ` ${Clrs.colorMap.white}> ` : ` `
  const [PTag, FTag, WTag] = isFeature
    ? [FPassTag, FFailTag, FWarnTag]
    : [PassTag, FailTag, WarnTag]

  const tag = !failed ? PTag : isFailed ? FTag : WTag
  const colorType = ColorMap[type as keyof typeof ColorMap]

  const colors = failed && isFailed
    ? ColorMap.Error
    : colorType
      ? colorType
      : isParent
        ? ColorMap.Parent
        : ColorMap.Step

  
  const line = `${tag} ${colors.type}${type}${sep}${colors.text}${text}${Clrs.colorMap.reset}`

  /** Don't dim the text if not failed || this line is the line that failed */
  return (isFailed || !failed) ? line : DimText(line)

}

export const FormatParent = (text:string, failed?:boolean, isFailed?:boolean) => {
  const [first, description] = text.split(`>`)
  const type = first.trim()
  const isFeature = type.startsWith(`Feature`)

  const line = FormatLine({
    type,
    failed,
    isFailed,
    isParent: true,
    isFeature: type.startsWith(`Feature`),
    text: (description || ``)?.trim?.(),
  })

  return isFeature ? `\n${line}\n` : `  ${line}\n`
}

export const FormatChild = (text:string, failed?:boolean, isFailed?:boolean) => {
  const [type, ...rest] = text.split(` `)
  const line = FormatLine({
    failed,
    isFailed,
    isParent: false,
    type: type.trim(),
    text: (rest.join(` `) || ``)?.trim?.(),
  })

  return `    ${line}\n`
}

export const FormatError = (failed:TFailedErrorResult) => {
  const output = []
  const space = `      `

  const { fullName, description, error } = failed
  const message = error ? error.stack : `${fullName}\n${description}`

  const [first, ...lines] = message.split(`\n`)
  output.push(`\n${space}${Clrs.red(first)}\n`)
  output.push(Clrs.white(lines.map(line => `${space}${line}`).join(`\n`)))
  output.push(`\n\n`)

  return output.join(``)
}

export const FormatErrors = (failedExps:TFailedErrorResult[]) => {
  return failedExps.map(failed => FormatError(failed)).join(``)
}


export const Format = (text:string, failed?:boolean, isFailed?:boolean) => {
  return text.includes(`>`)
    ? FormatParent(text, failed, isFailed)
    : FormatChild(text, failed, isFailed)
}
