import type {
  TAnyFunc,
  TWorldConfig,
  TTransformer,
  TParamTypeMap,
  TParamTypeModel,
} from '../types'

import { constants } from '../constants'
import { removeQuotes } from '../utils/helpers'
import {
  get,
  isObj,
  noOpObj,
  toStr,
  exists,
  isQuoted,
  checkCall,
  equalsNaN,
  joinRegex,
} from '@keg-hub/jsutils'

import {
  RX_ANY,
  RX_INT,
  RX_FLOAT,
  RX_ALIAS,
  RX_WORLD,
  RX_DOUBLE_QUOTED,
  RX_SINGLE_QUOTED,
} from './patterns'

import { throwParamTypeExists, throwMissingWorldValue } from '../utils/errors'

const { WORLD_KEY, ALIAS_WORLD_KEY, ALIAS_REF } = constants

/**
 * TODO: FIX-ME - The types are wrong for joinRegex
 * This force the correct type to avoid typescript warnings
 */
const mergeRegex = joinRegex as (...expressions: RegExp[]) => RegExp

/**
 * Checks if the arg is a path to a value on the world object
 * If it is, it pulls the value from the world
 * @type {function}
 * @param {*} arg - Value to check if it's a world path
 * @param {object} $world - Parkin global world object
 *
 * @returns {*} Found value on the world object or undefined
 */
const checkWorldValue = (func:TAnyFunc, type:string):TTransformer => {
  return (arg:string, $world?:TWorldConfig, worldReplace?:boolean) => {
    const hasWorldVal = arg.match(RX_WORLD)
    const hasAliasVal = arg.match(RX_ALIAS)

    if(worldReplace === false && (hasWorldVal || hasAliasVal))
      return removeQuotes(arg)

    // If not world value, just return func response
    if (!isObj($world) || (!hasWorldVal && !hasAliasVal))
      return matchType(func(arg, $world, worldReplace), type)

    // Try to pull from world object
    const worldVal = hasWorldVal
      ? get($world, removeQuotes(arg).replace(`${WORLD_KEY}.`, ''))
      : get(
        $world,
        removeQuotes(arg).replace(`${ALIAS_REF}`, `${ALIAS_WORLD_KEY}.`)
      )

    // If has a wold value, then return world value else thrown an error
    return exists(worldVal)
      ? matchType(worldVal, type)
      : hasWorldVal
        ? throwMissingWorldValue(arg)
        : matchType(func(arg, $world), type)
  }
}

/**
 * Checks if the val matches the type
 * If matching, returns val, else return null
 *
 */
const matchType = (val:any, type:string) => {
  return typeof val === type ? val : null
}

/**
 * Default param type model used when registering param types
 * @type {Object}
 */
const typeModel = {
  name: ``,
  regex: ``,
  partial: ``,
  type: `string`,
  useForSnippets: true,
  preferForRegexpMatch: false,
  transformer: checkWorldValue(arg => arg, `string`),
}

/**
 * Maps param types to function, for type conversion
 * Follows the default conversions for cucumber expressions
 * See https://cucumber.io/docs/cucumber/cucumber-expressions/
 * @type {Object}
 */
const __paramTypes:TParamTypeMap = {
  any: {
    ...typeModel,
    name: `any`,
    regex: RX_ANY,
    partial: mergeRegex(RX_ANY, /{any}/, /{\*}/),
  },
  word: {
    ...typeModel,
    name: `word`,
    regex: RX_ANY as RegExp,
    partial: mergeRegex(RX_ANY, /{word}/),
    transformer: checkWorldValue(arg => {
      return !isQuoted(arg) ? toStr(arg) : undefined
    }, typeModel.type),
  },
  float: {
    ...typeModel,
    name: `float`,
    type: `number`,
    regex: RX_FLOAT,
    partial: mergeRegex(RX_INT, /{float}/),
    transformer: checkWorldValue(arg => {
      const result = parseFloat(arg)
      return equalsNaN(result) ? undefined : result
    }, `number`),
  },
  int: {
    ...typeModel,
    name: `int`,
    type: `number`,
    regex: RX_INT,
    partial: mergeRegex(RX_INT, /{int}/, /{number}/),
    transformer: checkWorldValue(arg => {
      const result = parseInt(arg)
      return equalsNaN(result) || arg.includes(`.`) ? undefined : result
    }, `number`),
  },
  string: {
    ...typeModel,
    name: `string`,
    regex: mergeRegex(RX_DOUBLE_QUOTED, RX_SINGLE_QUOTED),
    partial: mergeRegex(RX_DOUBLE_QUOTED, RX_SINGLE_QUOTED, /{string}/),
    transformer: checkWorldValue(arg => {
      return isQuoted(arg) ? removeQuotes(arg) : undefined
    }, typeModel.type),
  },
}

/**
 * Get the registered __paramTypes
 * @function
 * @public
 * @export
 *
 * @return {Object} Registered param types
 */
export const getParamTypes = () => __paramTypes

/**
 * Register custom types following the typeModel object
 * See https://cucumber.io/docs/cucumber/cucumber-expressions/ for more info
 * Wraps the transformer method in the checkWorldValue HOF
 * @function
 * @public
 * @export
 *
 * @return {Object} Registered param types
 */
export const registerParamType = (
  model:TParamTypeModel = noOpObj as TParamTypeModel,
  key:string=model.name
) => {
  if (__paramTypes[key]) return throwParamTypeExists(key)

  // Build the new type joining with the default
  __paramTypes[key] = { ...typeModel, ...model }

  // Wrap the transformer in the world value check helper
  __paramTypes[key].transformer = checkWorldValue(
    __paramTypes[key].transformer,
    __paramTypes[key].type
  )

  return __paramTypes
}

/**
 * Converts the found matching values into the correct types
 * Using transformer methods of the matched paramType names
 * @function
 * @public
 * @export
 * @param {Array<string>} matches - All found dynamic arguments
 * @param {Array<function>} transformers - Matching paramTypes by index
 * @param {Object} $world - Global parkin world object
 *
 * @returns {Array<*>} Matches converted into the correct type
 */
export const convertTypes = (
  matches:string[],
  transformers:TParamTypeModel[],
  $world:TWorldConfig,
  worldReplace?:boolean
) => {
  return matches
    .map((item, i) => {
      const paramType = transformers[i] || __paramTypes.any
      return checkCall(paramType.transformer, item, $world, worldReplace)
    })
    .filter(exists)
}
