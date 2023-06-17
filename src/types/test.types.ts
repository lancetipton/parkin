import type { Types } from '../test/utils'
import type { EAstObject, EStepType } from './helpers.types'

export enum EResultAction {
  test=`test`,
  skipped=`skipped`,
  start=`start`,
  end=`end`
  
}

export enum EResultStatus {
  skipped=`skipped`,
  passed=`passed`,
  failed=`failed`,
}

export enum EResultType {
  it=`it`,
  xit=`xit`,
  root=`root`,
  test=`test`,
  xtest=`xtest`,
  describe=`describe`,
  xdescribe=`xdescribe`
}

export enum ETestType {
  it = `it`,
  itx = `itx`,
  test = `test`,
  testx = `testx`,
  describe = `describe`,
  describex = `describex`,
  beforeAll = `beforeAll`,
  afterAll = `afterAll`,
  beforeEach = `beforeEach`,
  afterEach = `afterEach`,
}

export type TParkinResultMeta = {
  uuid:string
  index:number
  type:EStepType
}

export type TRunResultStepMeta = TParkinResultMeta & {
  step:string
  definition?:string
}

export type TRunResultScenarioMeta = TParkinResultMeta & {
  tags?:string[]
  scenario:string
}

export type TRunResultBackgroundMeta = TParkinResultMeta & {
  tags?:string[]
  background:string
}

export type TRunResultRuleMeta = TParkinResultMeta & {
  tags?:string[]
  rule:string
}

export type TRunResultFeatureMeta = TParkinResultMeta & {
  tags?:string[]
  feature:string
  errors?:string[]
}

export type TRunResultActionMeta = TRunResultFeatureMeta
  | TRunResultRuleMeta
  | TRunResultBackgroundMeta
  | TRunResultScenarioMeta
  | TRunResultStepMeta

export type TRunResultTestMeta = Omit<Partial<TRunResult>, `passed`|`failed`> & {
  failed?:Partial<TRunResult>
  passed?:Partial<TRunResult>
}

export type TRunResult = {
  id:string
  testPath:string
  fullName:string
  failed?:boolean
  passed?:boolean
  skipped?:boolean
  timestamp:number
  children?:TSpec[]
  tests?:TRunResult[]
  description: string
  action:EResultAction
  status?:EResultStatus
  describes?:TRunResult[]
  metaData?:TRunResultActionMeta
  type:keyof typeof Types | EAstObject,
  failedExpectations?:Partial<TRunResult>[]
  passedExpectations?:Partial<TRunResult>[]
}

export type TSpecResult = TRunResult & {
  status?:EResultStatus
}

export type TSpec = {
  result: TSpecResult
  disable: () => void
}

export type TSuite = {
  description: string
  children: TSpec[]
}

export type TParkinTestAbort = () => void
export type TParkinTestCB = (result:TRunResult) => void

export type TDescribeAction = (() => void) & {
  ParkinMetaData?:TRunResultActionMeta
}

export type TTestAction = ((done?:()=> void) => any) & {
  ParkinMetaData?:TRunResultActionMeta
}

export type TTestHookMethod = ((fn:(...args:any[]) => any, ...args:any[]) => any) & {
  ParkinMetaData?:TRunResultActionMeta
}

type TDescribeFactory = (description:string, action:TDescribeAction) => void
export type TParkinDescribeFactory = TDescribeFactory & {
  skip:TDescribeFactory
  only:TDescribeFactory
}

type TTestFactory = (description:string, action:TTestAction, timeout?:number) => void
export type TParkinTestFactory = TTestFactory & {
  skip:TTestFactory
  only:TTestFactory
}


export type TParkinTestConfig = {
  timeout?:number
  autoClean?:boolean
  description?:string
  onAbort?:TParkinTestAbort
  specDone?:TParkinTestCB
  suiteDone?:TParkinTestCB
  specStarted?:TParkinTestCB
  suiteStarted?:TParkinTestCB
}

// TODO: fix these types
export type TBaseTestObj = {
  only?:boolean
  skip?: boolean
  timeout?:number
  description:string
  onlyChild?: boolean
  disabled: () => void
  hasOnlyChild: () => void
  // type:keyof typeof Types,
}

export type TTestTestObj = TBaseTestObj & {
  type: `test` | `it` | `xtest` | `xit`
  action:TTestAction
}

export type THookTestObj = {
  type: `beforeAll` | `beforeEach` | `afterAll` | `afterEach`
  description?:string
  action:TTestHookMethod
}

export type TDescribeTestObj = TBaseTestObj & {
  type: `describe`
  tests?:TTestTestObj[]
  action:TDescribeAction
  describes?:TDescribeTestObj[]
  afterAll?:TTestHookMethod[]
  beforeAll?:TTestHookMethod[]
  afterEach?:TTestHookMethod[]
  beforeEach?:TTestHookMethod[]
}

export type TRootTestObj = TBaseTestObj & {
  type: `root`
  tests?:TTestTestObj[]
  action:TDescribeAction
  describes?:TDescribeTestObj[]
  afterAll?:TTestHookMethod[]
  beforeAll?:TTestHookMethod[]
  afterEach?:TTestHookMethod[]
  beforeEach?:TTestHookMethod[]
}

export type TNonRootTestObj = TDescribeTestObj | TTestTestObj

export type TTestObj = TRootTestObj
  | TNonRootTestObj
  | THookTestObj



export type THookTypes = {
  beforeAll:`beforeAll`
  beforeEach:`beforeEach`
  afterAll:`afterAll`
  afterEach:`afterEach`
}

export type TGlobalTypes = THookTypes & {
  test:`test`
  it:`it`
  xtest:`xtest`
  xit:`xit`
  describe:`describe`
}

export type TType = TGlobalTypes & {
  root: `root`
}
