import type { Steps } from '../steps'
import type {
  TTempContainer,
  TTempRegisterArgs,
} from '../types'

import { EStepMethodType } from '../types'

/**
 * Helper method to wrap the default register method of a step definition
 * Allows capturing the definition when it's registered
 * Contains only newly registered definitions, NOT all definitions
 * @function
 * @private
 *
 */
export const tempRegister = (
  parent:Steps,
  type:EStepMethodType,
  container:TTempContainer
) => {
  /**
   * Captures a registered step definition and adds it the the container object
   * @function
   * @internal
   *
   */
  return (...args:TTempRegisterArgs) => {
    const definition = parent[type](...args)
    container[type].push(definition)

    return definition
  }
}
