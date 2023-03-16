import { promiseFeature, registerMockSteps } from '../__mocks__'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { Parkin } = require('../parkin')

const worldObj = {
  testMethod: function () {
    this.calledTestMethod = this.called || 0
    this.calledTestMethod += 1
  },
}
const PK = new Parkin(worldObj)

registerMockSteps(PK)
;(async () => {
  await PK.run(promiseFeature)
})()
