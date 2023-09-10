import { EMaestroCmds } from './constants'
import {emptyObj, exists, flatUnion} from '@keg-hub/jsutils'

export type TAddStepParams = {
  cmd:EMaestroCmds
  sep?:string
  args?:string[]
  children?:Record<string, string>
}

export type TFlow = {
  appId?:string
  name?:string
  tags?:string[]
  stepSpacer?:string
  hookSpacer?:string
  env?:Record<string, string>
}

type AllowedParents = `onStart`|`onComplete`|`steps`

const buildLine = (params:Omit<TAddStepParams, `cmd`> & { cmd: string }) => {
  const {cmd, sep=`:`, args} = params
  return args?.length ? `${cmd}${sep} "${args.join(` `)}"` : `${cmd}${sep}`
}

const addParent = (key:string, value?:string) => buildLine({
  cmd:key,
  args: value ? [value] : undefined
})

export class Flow {
  sep=`---`
  name:string=``
  appId:string=``
  hookSpacer=`    `
  stepSpacer=`    `
  tags:string[]=[]
  steps:string[]=[]
  onStart:string[]=[]
  onComplete:string[]=[]
  env:Record<string, string>={}

  constructor(opts:TFlow=emptyObj){
    const {
      env,
      name,
      tags,
      appId,
      hookSpacer,
      stepSpacer,
    } = opts
    
    if(name) this.name = name
    if(appId) this.appId = appId
    if(hookSpacer) this.hookSpacer = hookSpacer
    if(stepSpacer) this.stepSpacer = stepSpacer
    
    if(env) Object.assign(this.env, env)
    if(tags) this.tags = flatUnion<string>([...this.tags, ...tags])

  }

  activeParent:AllowedParents=`steps`

  addStep = (params:TAddStepParams) => {
    const {cmd, sep=`:`, args, children} = params


    const activeArr = this[this.activeParent] || this.steps
    const command = buildLine({ sep, args, cmd: `- ${cmd}` })
    activeArr.push(command)
    if(!children) return

    const spacer = this.activeParent !== `steps`
      ? this.hookSpacer
      : this.stepSpacer
    
    Object.entries(children)
      .forEach(([key, value])=> {
        exists(value)
          && activeArr.push(`${spacer}${key}: "${value}"`)
      })
  }

  toString = () => {
    const lines:string[] = []

    this.appId && lines.push(addParent(EMaestroCmds.appId, this.appId))
    this.name && lines.push(addParent(EMaestroCmds.name, this.name))
    if(this.tags.length){
      lines.push(addParent(EMaestroCmds.tags))
      this.tags.forEach(tag => lines.push(`${this.stepSpacer}- ${tag}`))
    }

    const envEntries = Object.entries(this.env)

    if(envEntries.length){
      lines.push(addParent(EMaestroCmds.env))
      envEntries.forEach(([key, value]) => lines.push(`${this.hookSpacer}${key}: ${value}`))
    }

    if(this.onStart.length){
      lines.push(addParent(EMaestroCmds.onFlowStart))
      this.onStart.forEach(line => lines.push(`${this.hookSpacer}${line}`))
    }

    if(this.onComplete.length){
      lines.push(addParent(EMaestroCmds.onFlowComplete))
      this.onComplete.forEach(line => lines.push(`${this.hookSpacer}${line}`))
    }

    lines.push(this.sep)

    this.steps.length
      && this.steps.forEach(line => lines.push(line))

    return lines.join(`\n`).trim()
  }

}

