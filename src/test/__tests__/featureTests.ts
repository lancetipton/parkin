import { setParkinGlobals } from '../../global'
import {setParkinTestGlobals} from '../global'
import { resolveGlobalObj } from '../../utils/globalScope'
import {
  malformedStep,
  defMetaFeature,
  registerMockSteps
} from '../../__mocks__'


describe(`Feature Tests`, () => {


  it(`should throw an error on malformed step params`, async () => {

    setParkinGlobals(false)
    const reset = setParkinTestGlobals(true, true)
    const gObj = resolveGlobalObj()

    const PK = new gObj.Parkin({ $alias: {} })
    registerMockSteps(PK)
    const PTE = gObj.PTE
    await PK.run(malformedStep)

    const responses = await PTE.run({ description: `Malformed Steps` })

    const [result] = responses
    expect(result.failed).toBe(true)
    expect(result.passed).toBe(false)

    const describe = result.describes[0]
    expect(describe.failed).toBe(true)
    expect(describe.passed).toBe(false)

    const test = describe.tests[0]
    expect(test.failed).toBe(true)
    expect(test.passed).toBe(false)

    const failed = test.failedExpectations[0]
    expect(failed.error.message.includes(`Malformed step text`)).toBe(true)

    reset?.()

  })


  it(`should use the options from the step def meta`, async () => {
    process.env.JEST_FORCE_OVERRIDE = `1`
    
    setParkinGlobals(false)
    const reset = setParkinTestGlobals(true, true)
    const gObj = resolveGlobalObj()

    const PK = new gObj.Parkin({ $alias: {} })
    registerMockSteps(PK)
    await PK.run(defMetaFeature)

    const PTE = gObj.PTE
    const parent = PTE.getActiveParent()

    const [test1, test2] = parent.describes[0].describes[0].tests
    expect(test1.retry).toBe(2)
    expect(test1.timeout).toBe(5000)
    
    expect(test2.retry).toBe(0)
    expect(test2.timeout).toBe(60000)

    process.env.JEST_FORCE_OVERRIDE = undefined
    reset?.()

  })

})
