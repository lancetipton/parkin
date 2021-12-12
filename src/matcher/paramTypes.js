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
  RX_FLOAT,
  RX_INT,
  RX_DOUBLE_QUOTED,
  RX_SINGLE_QUOTED,
  RX_WORLD,
} from './patterns'

import {
  throwParamTypeExists,
  throwMissingWorldValue,
} from '../utils/errors'

/**
 * Remove single and double quotes from a string's starting and ending
 * @param {string} arg - String containing single or double quotes at the start and end
 * 
 * @returns {string} - Passed in arg string with start and end quotes removed
 */
const removeQuotes = arg => arg.trim().replace(/^("|')/, '').replace(/("|')$/, '')

/**
 * Checks if the arg is a path to a value on the world object
 * If it is, it pulls the value from the world
 * @type {function}
 * @param {*} arg - Value to check if it's a world path
 * @param {object} $world - Parkin global world object
 * 
 * @returns {*} Found value on the world object or undefined
 */
const checkWorldValue = (func, type) => {
  return (arg, $world) => {
    const hasWorldVal = arg.match(RX_WORLD)

    // If not world value, just return func response
    if(!isObj($world) || !hasWorldVal) return matchType(func(arg), type)

    // Try to pull from world object
    const worldVal = get($world, removeQuotes(arg).replace('$world.', ''))

    // If has a wold value, then return world value else thrown an error
    return exists(worldVal)
      ? worldVal
      : throwMissingWorldValue(arg, $world)
  }
}

// Checks if the val matches the type
// If matching, returns val, else return null
const matchType = (val, type) => {
  return typeof val === type ? val : null
}

/**
 * Default param type model used when registering param types
 * @type {Object}
 */
 const typeModel = {
  name: '',
  regex: '',
  type: 'string',
  useForSnippets: true,
  preferForRegexpMatch: false,
  transformer: checkWorldValue(arg => (arg), 'string'),
}

/**
 * Maps param types to function, for type conversion
 * Follows the default conversions for cucumber expressions
 * See https://cucumber.io/docs/cucumber/cucumber-expressions/
 * @type {Object}
 */
const __paramTypes = {
  any: {
    ...typeModel,
    name: 'any',
    regex: RX_ANY,
  },
  word: {
    ...typeModel,
    name: 'word',
    regex: RX_ANY,
    transformer: checkWorldValue(arg => {
      return !isQuoted(arg) ? toStr(arg) : undefined
    }, typeModel.type),
  },
  float: {
    ...typeModel,
    name: 'float',
    type: 'number',
    regex: RX_FLOAT,
    transformer: checkWorldValue(arg => {
      const result = parseFloat(arg)
      return equalsNaN(result) ? undefined : result
    }, 'number'),
  },
  int: {
    ...typeModel,
    name: 'int',
    type: 'number',
    regex: RX_INT,
    transformer: checkWorldValue(arg => {
      const result = parseInt(arg)
      return equalsNaN(result) || arg.includes('.')
        ? undefined
        : result
    }, 'number'),
  },
  string: {
    ...typeModel,
    name: 'string',
    regex: joinRegex(RX_DOUBLE_QUOTED, RX_SINGLE_QUOTED),
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
export const registerParamType = (model = noOpObj, key = model.name) => {
  if(__paramTypes[key])
    return throwParamTypeExists(key)

  // Build the new type joining with the default
  __paramTypes[key] = {...typeModel, ...model}

  // Wrap the transformer in the world value check helper
  __paramTypes[key].transformer = checkWorldValue(
    __paramTypes[key].transformer,
    __paramTypes[key].type,
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
export const convertTypes = (matches, transformers, $world) => {
  return matches
    .map((item, i) => {
      const paramType = transformers[i] || __paramTypes.any
      return checkCall(paramType.transformer, item, $world)
    })
    .filter(exists)
}
