import {
  noOpObj,
  toStr,
  toInt,
  toFloat,
  checkCall,
  exists,
} from '@keg-hub/jsutils'
import { throwParamTypeExists } from '../errors'

/**
 * Default param type model used when registering param types
 * @type {Object}
 */
const typeModel = {
  name: '',
  regexp: '',
  type: 'string',
  useForSnippets: true,
  transformer: arg => arg,
  preferForRegexpMatch: false,
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
  },
  word: {
    ...typeModel,
    name: 'word',
    transformer: arg => toStr(arg)
  },
  float: {
    ...typeModel,
    name: 'float',
    type: 'number',
    transformer: arg => toFloat(arg)
  },
  int: {
    ...typeModel,
    name: 'int',
    type: 'number',
    transformer: arg => !arg.includes('.') && toInt(arg)
  },
  string: {
    ...typeModel,
    name: 'string',
    transformer: arg => arg.trim().replace(/^("|')/, '').replace(/("|')$/, '')
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
export const registerParamType = (model=noOpObj, key=model.name) => {
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
 *
 * @returns {Array<*>} Matches converted into the correct type
 */
export const convertTypes = (matches, transformers) => {
  return matches.map((item, i) => {
    const paramType = transformers[i]
    const asType = checkCall(paramType.transformer, item)

    return typeof asType === paramType.type ? asType : null
  })
  .filter(item => exists(item) && item)
}