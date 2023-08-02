import {isStr} from '@keg-hub/jsutils'
import { EHookType } from '../types'

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

  constructor(msg:string|Error, error?:string|Error, replaceStack:boolean=true){
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
    // Reset the original stacktrace limit
    Error.stackTraceLimit = stackTraceLimit
    this.name = this.constructor.name
    
    if(replaceStack){
      if(err?.stack) this.stack = replaceStackMsg(err, message)
      err && Error.captureStackTrace(err, this.constructor)
    }
  }
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
