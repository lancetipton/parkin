import {isStr} from '@keg-hub/jsutils/isStr'
import { ParkinAbortErrName, ParkinBailErrName } from '../constants'
import { EHookType, TRunResults } from '../types'

const resolveErrMsg = (error?:string|Error, maybe?:Error|string):[string, Error] => {
  return isStr(error)
    ? [error as string, maybe as Error]
    : [((error || maybe) as Error)?.message, (error || maybe) as Error]
}

const replaceStackMsg = (err:Error, msg:string) => {
  const split = err.stack.split(`\n`)
  split[0] = msg

  return split.join(`\n`)
}

export class ParkinError extends Error {
  name = `ParkinError`
  results?:TRunResults
  testResults?:TRunResults

  constructor(msg:string|Error, error?:string|Error|ParkinError, replaceStack:boolean=true){
    const [message, err] = resolveErrMsg(msg, error)
    const { stackTraceLimit } = Error
    if(err && replaceStack){
      // Create a new error without a stacktrace
      Error.stackTraceLimit = 0
    }

    // Set the error cause if it's different form the message
    const opts = err && message !== err?.message
      ? { cause: err?.message }
      : undefined

    super(message, opts)

    this.results = (err as ParkinError)?.results || []
    this.testResults = (err as ParkinError)?.testResults || []

    if((err as any)?.result && !this.results.includes((err as any).result))
      this.results.push((err as any).result)

    // Reset the original stacktrace limit
    Error.stackTraceLimit = stackTraceLimit
    this.name = this.constructor.name
    
    if(replaceStack){
      if(err?.stack) this.stack = replaceStackMsg(err, message)
      err && Error.captureStackTrace(err, this.constructor)
    }
  }
}

export class ParkinBailError extends ParkinError {
  name = ParkinBailErrName
  constructor(msg:string|Error, error?:string|Error, replaceStack:boolean=true){
    super(msg, error, replaceStack)
  }
}

export class ParkinAbortError extends ParkinError {
  name = ParkinAbortErrName
  constructor(msg:string|Error, error?:string|Error, replaceStack:boolean=true){
    super(msg, error, replaceStack)
  }
}

export class RetryError extends Error {
  results?:TRunResults
  constructor(err:Error, message?:string, retry?:number) {
    super(message || err.message)
    this.stack = err.stack
    // Only overwrite the default Error name when retry was actually set
    // Keep custom named errors incase they are depended on
    this.name = !retry ? err.name : this.constructor.name

    if(message) this.cause = err.message
    if((err as RetryError).results) this.results = (err as RetryError).results
  }
}

/*
 * Helper method to use throw a Parkin Bail error
 * @function
 * @public
 * @throws
 *
 */
export const throwAbortError = (err?:Error) => {
  throw new ParkinAbortError(
    `Test execution \x1b[33m"aborted"\x1b[0m`,
    err,
    true
  )
}

/*
 * Helper method to use throw a Parkin Bail error
 * @function
 * @public
 * @throws
 *
 */
export const throwBailError = (err:Error, bail?:number) => {
  const colored = `\x1b[33m${bail}\x1b[0m`
  throw new ParkinBailError(
    `Stopping test execution. Max allowed failed${bail ? ` ${colored} ` : ` `}tests has been reached`,
    err,
    true
  )
}

export const throwExitOnFailed = (err:Error) => {
  throw new ParkinBailError(
    `Stopping test execution. A test failed and \x1b[33m"exitOnFailed"\x1b[0m is active`,
    err,
    true
  )
}

/*
 * Helper method to use the a test method can not be found on the global scope
 * @function
 * @public
 * @throws
 *
 */
export const testMethodFill = (type:string) => {
  /*
   * Internal method that throws an error when a test method does not exist on the global scope
   * @function
   * @private
   * @inner
   *
   */
  return () => {
    throw new ParkinError(
      `` +
        `Test method ${type} does not exist on the global scope.\n` +
        `Please ensure ${type} exists before calling the run method!\n`
    )
  }
}

/**
 * Throws an error when a Steps class instance is not passed to the runner class constructor
 * @function
 * @public
 * @throws
 *
 */
export const throwMissingSteps = () => {
  throw new ParkinError(
    `Runner class constructor requires an instance of the Steps class`
  )
}

/**
 * Throws an error when a Hooks class instance is not passed to the runner class constructor
 * @function
 * @public
 * @throws
 *
 */
export const throwMissingHooks = (found:any) => {
  throw new ParkinError(
    `Runner class constructor requires an instance of the Hooks class. Found: ${found}`
  )
}

/**
 * Throws an error when a feature text is not passed to the Runner class instance
 * @function
 * @public
 * @throws
 *
 */
export const throwMissingFeatureText = () => {
  throw new ParkinError(
    `Runner class requires feature text when calling the run method`
  )
}

/**
 * Throws an error when a feature text is not passed to the Runner class instance
 * @function
 * @public
 * @throws
 *
 */
export const throwInvalidDefParams = (msg:string=``) => {
  throw new ParkinError(
    `Malformed step text, could not extract the expected step definition parameters. ${msg}`.trim()
  )
}


/**
 * Throws an error when a feature step does not match a step definition's text
 * @function
 * @public
 * @throws
 *
 */
export const throwMissingDef = (step:string) => {
  throw new ParkinError(`Matching definition could not be found for step: "${step}"`)
}

/**
 * Throws an error when a feature step does not match a step definition
 * @function
 * @public
 * @throws
 *
 */
export const throwNoMatchingStep = (text:string) => {
  throw new ParkinError(text)
}

/**
 * Throws an error when a registering a param type that already exists
 * @function
 * @public
 * @throws
 *
 */
export const throwParamTypeExists = (name:string) => {
  throw new ParkinError(`Cannot register param type "${name}". It already exists!`)
}

/**
 * Throws an error when a assembling a parsed feature, and no parsed feature object exists
 * @function
 * @public
 * @throws
 * 
 */
export const throwFeatureNotAnObj = (feature:any) => {
  throw new ParkinError(`Assemble feature requires an object matching the feature model spec!`)
}

/**
 * Throws an error when a registering a param type that already exists
 * @function
 * @public
 * @throws
 *
 */
export const throwMissingWorldValue = (arg:string) => {
  throw new ParkinError(
    `Can not replace ${arg} with value from $world, it does not exist on the world object`,
  )
}

/**
 * Throws an error when a registering an invalid hook type
 * @function
 * @public
 * @throws
 *
 */
export const throwInvalidHookType = (hookTypes:EHookType, type:string) => {
  throw new ParkinError(
    [
      `Expected client hook type to be one of ', ${hookTypes}.`,
      `Found: ${type}`,
    ].join('\n')
  )
}

/**
 * Throws an error when running world replace on feature text content
 * @function
 * @public
 * @throws
 *
 */
export const throwWorldReplace = (err:Error, currentMatch:string) => {
  throw new ParkinError(`Error replacing $world value in feature text. Current match was ${currentMatch}`, err)
}

/**
 * Throws an error when running world.alias replace on feature text content
 * @function
 * @public
 * @throws
 *
 */
export const throwAliasReplace = (err:Error, currentMatch:string) => {
  throw new ParkinError(
    `Error replacing $$alias ( $world.$alias ) in feature text. Current match was ${currentMatch}`,
    err
  )
}
