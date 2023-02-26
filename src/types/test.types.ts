
export enum TResultAction {
  skipped=`skipped`,
  start=`start`
  
}

export enum TResultStatus {
  skipped=`skipped`,
  passed=`passed`,
  failed=`failed`,
}

export enum TResultType {
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
  type:TResultType
  timestamp: number
  description: string
  action:TResultAction
  failedExpectations?: Record<string, any>[]
  passedExpectations?: Record<string, any>[]
}

export type TSpecResult = TRunResult & {
  status?:TResultStatus
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