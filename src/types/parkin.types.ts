import type { TWorldConfig } from './world.types'
import type { TFeatureAst } from './features.types'
import type {
  TStepDef,
  TStepDefs,
  IParkinSteps,
  EExpParmType,
  TRegisterStepMethod,
  TRegisterStepsList,
  TStepTable
} from './steps.types'

import type { parseFeature } from '../parse/parseFeature'
import type {
  TParamTypes,
  TParamTypeMap,
  TParamTypeModel,
} from './paramTypes.types'
import { TAssemble } from './assemble.types'

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

export type TParse = {
  feature: typeof parseFeature
  definition: (def:string) => TStepDef
}

export type TMatchRespExt = {
  world:TWorldConfig
  doc?: any
  table?: TStepTable
  options?:Record<string, any>
  [key:string]: any
}

export type TNoExtMatchResp = {
  match?: [...any]
  definition?:TStepDef
}

export type TMatchResp = {
  match?: [...any, TMatchRespExt]
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
  transformers:TParamTypeModel[]
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
  register:(paramType:TParamTypeModel) => Record<string, TParamTypeModel>
  stepTokens:(step:string, definition:TStepDef) => TMatchTokens[]
  find: (definitions:TStepDefs, step:string, world:TWorldConfig) => TMatchResp
  regex: (definition:TStepDef, step:string, world:TWorldConfig) => TMatchResp
  expression: (definition:TStepDef, step:string, world:TWorldConfig) => TMatchResp
  extract: (text:string, match:string, matchIdx:string[]) => Record<string|number, any>[]
  expressionFind: (definition:TStepDef, step:string) => TExpFindResp
}

export type TParkinRunStepOptsMap = {
  [K:string]:Record<any, any>
}

export type TParkinRunOpts = {
  name?:string
  timeout?:number
  tags?: string|string[]
  testOptions?:TParkinRunStepOptsMap
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

export type TParkinRunFeaturesInput = string|string[]|TFeatureAst[]|TFeatureAst