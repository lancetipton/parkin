import type {
  TTestTestObj,
  TDescribeTestObj,
} from "../types"

export type TShouldSkipTest = {
  testOnly?:boolean
  test: TTestTestObj
}

export type TBuildTestArgs = {
  suiteId:string
  testIdx:number
  describe:TDescribeTestObj
}

export type TShouldSkipDescribe = {
  testOnly?:boolean
  describeOnly?:boolean
  describe: TDescribeTestObj
}


export const shouldSkipTest = ({ testOnly, test }:TShouldSkipTest) => {
  return (testOnly && !test.only) || test.skip
}

export const buildTestArgs = ({
  suiteId,
  testIdx,
  describe
}:TBuildTestArgs) => {
  const test = describe.tests[testIdx]
  const specId = `spec${testIdx}`

  return {
    test,
    specId,
    testPath: `/${suiteId}/${specId}`,
    fullName: `${describe.description} > ${test.description}`,
  }
}


export const shouldSkipDescribe = ({ describe, describeOnly, testOnly }:TShouldSkipDescribe) => {
  return describe.skip ||
    (describeOnly && !describe.only && !describe.onlyChild) ||
    (testOnly && !describe.onlyChild)
}