import { registerDocSteps } from './docSteps'
import { registerFailSteps } from './failSteps'
import { registerBasicSteps } from './basicSteps'
import { registerPromiseSteps } from './promiseSteps'
import { registerBackgroundSteps } from './backgroundSteps'
import { registerWorldSteps } from './worldSteps'
import { registerAliasSteps } from './aliasSteps'

export const registerMockSteps = PK => {
  // The tests depend on the register order of the definitions
  // Changing the function call order will break the tests
  registerBasicSteps(PK)
  registerFailSteps(PK)
  registerPromiseSteps(PK)
  registerBackgroundSteps(PK)
  registerDocSteps(PK)
  registerWorldSteps(PK)
  registerAliasSteps(PK)
}
