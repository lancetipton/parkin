import { TWorldConfig } from './world.types'
import { EExpParmType, TStepDefs, TFeatureAst, TStepDef } from './features.types'

export type TStepDefTypeList = {
  given:TStepDefs
  when:TStepDefs
  then:TStepDefs
  and:TStepDefs
  but:TStepDefs
}

export interface IParkinSteps {
  world:TWorldConfig
  clear: () => void
  list:() => TStepDefs
  But:TRegisterStepMethod
  And:TRegisterStepMethod
  When:TRegisterStepMethod
  Then:TRegisterStepMethod
  Given:TRegisterStepMethod
  typeList: () => TStepDefTypeList
  resolve:(match:string) => any
  match: (match:string) => TMatchResp
  register:(def:string|TStepDef[]|TStepDef, match:string, TStepAction) => void
}

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

export type TStepAction = (...args:any[]) => any
export type TRegisterStepMethod = (step:string, action:TStepAction) => any

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
  match?: string[]
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

export interface IMatcher {
  types: () => TParamTypeMap
  parts:(match:string) => TPartsMatch[]
  register:(paramType:TParamType) => Record<string, TParamType>
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
  steps: Record<`given`|`when`|`then`|`and`|`but`, Record<string, TRegisterStepMethod>>
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