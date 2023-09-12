import type { Maestro } from "../maestro"

import { buildWhenSteps } from './when'
import { buildGivenSteps } from './given'
import { buildThenSteps } from './then'

export const buildFlowSteps = (maestro:Maestro) => {
  buildGivenSteps(maestro)
  buildWhenSteps(maestro)
  buildThenSteps(maestro)
}