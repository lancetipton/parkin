import {
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

import { throwParamTypeExists } from '../utils/errors'

/**
 * Default param type model used when registering param types
 * @type {Object}
 */
const typeModel = {
  name: '',
  regexp: '',
  type: 'string',
  useForSnippets: true,
  transformer: (arg, $world) => arg,
  preferForRegexpMatch: false,
}

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
const checkWorldValue = (arg, $world) => {
  // TODO validate this test works properly
  return arg.match(RX_WORLD)
    ? get($world, removeQuotes(val).replace('$world.', ''))
    : undefined
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
    transformer: (arg, $world) => {
      const val = checkWorldValue(arg, $world)
      return exists(val) ? val : !isQuoted(arg) ? toStr(arg) : undefined
    },
  },
  float: {
    ...typeModel,
    name: 'float',
    type: 'number',
    regex: RX_FLOAT,
    transformer: (arg, $world) => {
      const val = checkWorldValue(arg, $world)
      const result = parseFloat(exists(val) ? val : arg)

      return equalsNaN(result) ? undefined : result
    },
  },
  int: {
    ...typeModel,
    name: 'int',
    type: 'number',
    regex: RX_INT,
    transformer: (arg, $world) => {
      const val = checkWorldValue(arg, $world)
      const result = parseInt(exists(val) ? val : arg)

      return equalsNaN(result) || (!exists(val) && arg.includes('.'))
        ? undefined
        : result
    },
  },
  string: {
    ...typeModel,
    name: 'string',
    regex: joinRegex(RX_DOUBLE_QUOTED, RX_SINGLE_QUOTED),
    transformer: (arg, $world) => {
      const val = checkWorldValue(arg, $world)

      return val
        ? val
        : isQuoted(arg) ? removeQuotes(arg) : undefined
    },
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
 * @function
 * @public
 * @export
 *
 * @return {Object} Registered param types
 */
export const registerParamType = (model = noOpObj, key = model.name) => {
  __paramTypes[key]
    ? throwParamTypeExists(key)
    : (__paramTypes[key] = { ...typeModel, ...model })
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
      const paramType = transformers[i]
      if (!paramType) return item
      const asType = checkCall(paramType.transformer, item, $world)
      return typeof asType === paramType.type ? asType : null
    })
    .filter(exists)
}
