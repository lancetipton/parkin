import type { TWorldConfig, TRegisterStepsList, TParkinTestConfig } from '../types'

import './globals'
import { resolveGlobalObj } from '../utils/globalScope'

export const initPK = (world:TWorldConfig) => {
  const PK = getPK()
  PK.init(world, {}, false)

  return PK
}

export const getParkinTest = (testConfig?:TParkinTestConfig) => {
  const globalObj = resolveGlobalObj()
  const ParkinTest = globalObj.ParkinTest

  return new ParkinTest(testConfig)
}

export const getPTE = (testConfig?:TParkinTestConfig) => {
  const globalObj = resolveGlobalObj()
  const PTE = globalObj.PTE
  PTE.setConfig(testConfig)

  return PTE
}


export const getPK = () => {
  const globalObj = resolveGlobalObj()
  return globalObj.PK
}

export const getParkin = (
  world:TWorldConfig,
  steps:TRegisterStepsList
) => {
  const globalObj = resolveGlobalObj()
  const Parkin = globalObj.Parkin

  return new Parkin(world, steps)
}



