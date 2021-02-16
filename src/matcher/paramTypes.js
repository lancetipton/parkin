import {
  noOpObj,
  toStr,
  toInt,
  toFloat,
} from '@keg-hub/jsutils'

// TODO: implement registering custom types following this model
// Which matches cucumbers param types model
// Arguments for transformer should match the number of capture groups from the regexp
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
 * @Object
 */
export const paramTypes = {
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
