import { registerBasicSteps } from './basicSteps'
import { registerFailSteps } from './failSteps'
import { registerPromiseSteps } from './promiseSteps'

export const registerMockSteps = PK => {
  registerBasicSteps(PK)
  registerFailSteps(PK)
  registerPromiseSteps(PK)
}
