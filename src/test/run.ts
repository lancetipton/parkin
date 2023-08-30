import type {
  TRun,
  TRunResults,
  TRootTestObj,
} from '../types'

import { loopHooks } from './hooks'
import { runResult } from './runResult'
import { loopDescribes } from './loopDescribes'
import { Types, validateRootRun } from './utils'
import { EResultStatus, EResultAction } from '../types'

/**
 * Executes all methods registered to the ParkinTest instance
 * @param {Object} args - Config to overwrite the initial test config object
 *
 * @returns {Object} - Results of the test run
 */
export const run = async (args:TRun):Promise<TRunResults> => {
  const {
    root,
    onAbort,
    onRunDone,
    shouldAbort,
    onRunStart,
  } = args

  let describesFailed:boolean
  let describes:TRunResults = []

  validateRootRun(root as TRootTestObj)
  // Create a runResult with general information that can be reused below
  let rootResult = runResult(root, {
    id: Types.root,
    fullName: root.description,
    testPath: `/${Types.root}`,
  })

  onRunStart({
    ...rootResult,
    action: EResultAction.start,
    description: `Starting test execution`,
  })

  const beforeAllResults = await loopHooks({
    root,
    suiteId: Types.root,
    type: Types.beforeAll,
  })

  if(shouldAbort()){
    onAbort?.()

    onRunDone({
      ...rootResult,
      action: EResultAction.abort,
      description: `Test execution aborted`,
    })

    describes.aborted = true
    return describes
  }

  // If a before all throws an error, we don't want to run the rest of the tests, so just return
  if (beforeAllResults?.length) return beforeAllResults

  // Ensure the afterAll hooks are always called
  // Wrap the loopDescribes in a ty/catch/finally to ensure they are called at the end
  try {
    const resp = await loopDescribes(args)
    describes = resp.describes
    describesFailed = resp.failed

    if(shouldAbort()){
      onAbort?.()
      onRunDone({
        ...rootResult,
        action: EResultAction.abort,
        description: `Test execution aborted`,
      })
      describes.aborted = true
      return describes
    }
  }
  catch(err){
    describesFailed = true
    describes.push(
      err.result
      || runResult(root, {
          describes,
          id: Types.root,
          fullName: root.description,
          testPath: `/${Types.root}`,
          action: EResultAction.end,
          status: EResultStatus.failed,
          failed: {
            error: err,
            description: err.message,
            fullName: root.description,
            status: EResultStatus.failed,
          }
        })
    )
  }
  finally {
    const afterAllResult = await loopHooks({
      root: root,
      suiteId: Types.root,
      type: Types.afterAll,
    })
    afterAllResult?.length && describes.push(...afterAllResult)

    onRunDone({
      ...rootResult,
      describes,
      failed: describesFailed,
      passed: !describesFailed,
      action: EResultAction.end,
      description: `Test execution complete`,
      status: describesFailed ? EResultStatus.failed : EResultStatus.passed
    })
  }

  return describes
}
