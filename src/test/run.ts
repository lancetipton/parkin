import type {
  TRun,
  TRunResults,
  TRootTestObj,
} from '../types'

import { loopHooks } from './hooks'
import { runResult } from './runResult'

import { ParkinError } from '../utils/errors'
import { ParkinBailErrName, ParkinAbortErrName } from '../constants'
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
    stats,
    onAbort,
    onRunDone,
    shouldAbort,
    onRunStart,
  } = args

  let bailError:ParkinError
  let describesFailed:boolean
  let describes:TRunResults = []


  validateRootRun(root as TRootTestObj)
  // Create a runResult with general information that can be reused below
  let rootResult = runResult(root, {
    stats,
    id: Types.root,
    fullName: root.description,
    testPath: `/${Types.root}`,
  })

  await onRunStart({
    ...rootResult,
    stats,
    action: EResultAction.start,
    description: `Starting test execution`,
  })

  const beforeAllResults = await loopHooks({
    root,
    stats,
    suiteId: Types.root,
    type: Types.beforeAll,
  })

  if(shouldAbort()){
    await onAbort?.()
    stats.runEnd = new Date().getTime()
    await onRunDone({
      ...rootResult,
      stats,
      action: EResultAction.abort,
      description: `Test execution aborted`,
    })

    describes.aborted = true
    return Object.assign(describes, stats)
  }

  // If a before all throws an error, we don't want to run the rest of the tests, so just return
  if (beforeAllResults?.length) return Object.assign(beforeAllResults, stats)

  // Ensure the afterAll hooks are always called
  // Wrap the loopDescribes in a ty/catch/finally to ensure they are called at the end
  try {
    const resp = await loopDescribes(args)
    describes = resp.describes
    describesFailed = resp.failed

    if(shouldAbort()){
      await onAbort?.()
      stats.runEnd = new Date().getTime()
      await onRunDone({
        ...rootResult,
        stats,
        action: EResultAction.abort,
        description: `Test execution aborted`,
      })
      describes.aborted = true
    }
  }
  catch(err){
    describesFailed = true
    const isBailErr = err.name === ParkinBailErrName
    const isAbortErr = err.name === ParkinAbortErrName

    bailError = isBailErr || isAbortErr ? err : undefined

    if(isBailErr) describes.bailed = true
    if(isAbortErr) describes.aborted = true

    err.results
      ? describes.push(...err.results)
      : describes.push(runResult(root, {
            stats,
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
      root,
      stats,
      suiteId: Types.root,
      type: Types.afterAll,
    })
    afterAllResult?.length && describes.push(...afterAllResult)
    stats.runEnd = stats.runEnd || new Date().getTime()

    await onRunDone({
      ...rootResult,
      stats,
      describes,
      failed: describesFailed,
      passed: !describesFailed,
      action: EResultAction.end,
      description: `Test execution complete`,
      status: describesFailed ? EResultStatus.failed : EResultStatus.passed
    })

    if(bailError){
      // After joining the error results with the already captured results
      // Ensure the stats object is added as well
      bailError.results = Object.assign(describes, stats)
      throw bailError
    }
  }

  return Object.assign(describes, stats)
}
