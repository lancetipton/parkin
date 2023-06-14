import type {
  TStepDef,
  TStepMeta,
  TStepDefMethod,
} from '../types'


import { EStepType } from '../types'
import { constants } from '../constants'
import { capitalize, noOpObj } from '@keg-hub/jsutils'
import { strToId, sanitize, validateDefinition } from '../utils/helpers'

const { REGEX_VARIANT, EXPRESSION_VARIANT } = constants

/**
 * Builds the text content of a step definition call
 * @function
 * @private
 *
 */
const getContent = (def:TStepDef) => {
  const match =
    def.variant === REGEX_VARIANT ? def.match.toString() : `"${def.match}"`

  return `${capitalize(def.type)}(${match}, ${def.method.toString()})`
}

const stringToRegex = (str:string) => {
  const main = str.match(/\/(.+)\/.*/)[1]
  const options = str.match(/\/.+\/(.*)/)[1]

  return new RegExp(main, options)
}

/**
 * Registers a step definition by type
 * @function
 * @private
 *
 */
export const registerFromCall = function (
  internalType:EStepType,
  type:EStepType,
  match:string,
  method:TStepDefMethod,
  meta:TStepMeta = noOpObj
) {
  
  const variant = match.toString().indexOf('/') === 0 ? REGEX_VARIANT : EXPRESSION_VARIANT
  const formattedMatch = variant === REGEX_VARIANT
    ? stringToRegex(match.toString())
    : match.toString()

  const definition:Partial<TStepDef> = {
    type,
    meta,
    method,
    variant,
    tokens: [],
    match: formattedMatch,
  }

  definition.name = sanitize(definition as TStepDef)
  definition.content = getContent(definition as TStepDef)
  definition.uuid = strToId(definition.name, `def-`)

  const definitions = this.list()
  const newDefinition = validateDefinition(definition as TStepDef, definitions)

  newDefinition && this[internalType].push(newDefinition)

  return newDefinition
}
