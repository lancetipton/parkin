import type { TWorldConfig } from './world.types'
import type { EExpParmType, TStepDefs, TFeatureAst, TStepDef } from './features.types'
import type { IParkinSteps, TRegisterStepMethod, TRegisterStepsList } from './steps.types'


export type TParkinHookName = `beforeAll`|`afterAll`|`beforeEach`|`afterEach`
export type TParkinHookMethod = (method:(...args:any[]) => any) => void

export interface IParkinHooks {
  instance:IParkin
  types:TParkinHookName[]
  afterAll:TParkinHookMethod
  beforeAll:TParkinHookMethod
  afterEach:TParkinHookMethod
  beforeEach:TParkinHookMethod
  getRegistered:(type:TParkinHookName) => () => void
}

export interface IParkinRunner {
  run:TParkinRun
  getFeatures:(
    data:string|string[]|TFeatureAst|TFeatureAst[],
    options:TParkinRunOpts
  ) => TFeatureAst[]
}

export type TAssemble = {
  feature: (feature:TFeatureAst) => string
}

export type TParse = {
  feature: (feature:string) => TFeatureAst
  definition: (def:string) => TStepDef
}

export type TParamType = {
  regex: string|RegExp
  useForSnippets: boolean
  name: EExpParmType|string
  type: EExpParmType|string
  preferForRegexpMatch: boolean
  transformer: (...args:any[]) => any
}

export type TParamTypeMap = Record<EExpParmType|string, TParamType>

export type TParamTypes = {
  register: (paramType:TParamType) => TParamTypeMap
}

export type TMatchResp = {
  match?: [string|TWorldConfig]
  definition?:TStepDef
}

export enum EPartMatchTypes {
  other = `other`,
  optional = `optional`,
  alternate = `alternate`,
  parameter = `parameter`,
}

export type TPartsMatch = {
  index:number
  input:string
  text: string
  regex: RegExp
  type: EPartMatchTypes
  paramType: EExpParmType
}

export type TExpFindResp = {
  escaped:string
  regexAlts:string
  regexAnchors:string
  regexConverted:string
  found:TMatchResp,
  transformers:TParamType[]
}

export type TMatchTokens = {
  type:string
  match:string
  index:number
  defIndex:number
}

export interface IMatcher {
  types: () => TParamTypeMap
  parts:(match:string) => TPartsMatch[]
  register:(paramType:TParamType) => Record<string, TParamType>
  stepTokens:(step:string, definition:TStepDef) => TMatchTokens[]
  find: (definitions:TStepDefs, step:string, world:TWorldConfig) => TMatchResp
  regex: (definition:TStepDef, step:string, world:TWorldConfig) => TMatchResp
  expression: (definition:TStepDef, step:string, world:TWorldConfig) => TMatchResp
  extract: (text:string, match:string, matchIdx:string[]) => Record<string|number, any>[]
  expressionFind: (definition:TStepDef, step:string) => TExpFindResp
}

export type TParkinRunOpts = {
  name?:string
  tags?: string|string[]
}

export type TParkinRun = (
  data:string|string[]|TFeatureAst|TFeatureAst[],
  options:TParkinRunOpts
) => any

export type TRegisterStepsMethod = (
  steps: TRegisterStepsList
) => void

export interface IParkin {
  parse:TParse
  run:TParkinRun
  matcher:IMatcher
  world:TWorldConfig
  assemble:TAssemble
  steps:IParkinSteps
  hooks:IParkinHooks
  runner:IParkinRunner
  Given:TRegisterStepMethod
  When:TRegisterStepMethod
  Then:TRegisterStepMethod
  And:TRegisterStepMethod
  But:TRegisterStepMethod
  paramTypes:TParamTypes
  registerSteps:TRegisterStepsMethod
}