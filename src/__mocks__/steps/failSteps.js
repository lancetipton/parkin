import { resolveJasmine, hasJasmine } from '../../utils/globalScope'

const jasmineEnv = resolveJasmine().getEnv()
const defDescribe = jasmineEnv.describe

export const registerFailSteps = PK => {
  PK.Given(`that the default describe is overwritten`, ctx => {
    const updatedEnv = resolveJasmine()
    expect(updatedEnv.describe === defDescribe).toBe(!hasJasmine)
  })

  PK.And(`this step fails`, ctx => {
    // Uncomment this to validate the next steps are skipped
    // Commenting out otherwise the tests will fail when this throws
    // But I don't really know a better way to validate when a tests failed
    // And cause the other tests to be skipped
    // throw new Error(`This Step Failed!`)
  })

  PK.Then(`this step should be skipped`, ctx => {})

  PK.And(`this step should also be skipped`, ctx => {})
}
