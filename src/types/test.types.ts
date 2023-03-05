import { EAstObject } from './helpers.types'


export enum EResultAction {
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

export type TRunResult = {
  id:string
  testPath:string
  fullName:string
  failed?: boolean
  passed?: boolean
  timestamp: number
  description: string
  action:EResultAction
  children?:TSpec[]
  type:EAstObject
  failedExpectations?: Record<string, any>[]
  passedExpectations?: Record<string, any>[]
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

export type TParkinTestCB = (result:TRunResult) => void

export type TParkinTestConfig = {
  timeout?:number
  autoClean?:boolean
  description?:string
  specDone?:TParkinTestCB
  suiteDone?:TParkinTestCB
  specStarted?:TParkinTestCB
  suiteStarted?:TParkinTestCB
}