import { run } from '../run'
import { Test } from '../test'



describe(`run`, () => {

  it(`should run the passed in Test methods in correct order`, async () => {
    const callorder = []
    const beforeAll1 = jest.fn(() => callorder.push(`beforeAll1`))
    const beforeAll2 = jest.fn(() => callorder.push(`beforeAll2`))
    const testMethod1 = jest.fn(() => callorder.push(`testMethod1`))
    const testMethod2 = jest.fn(() => callorder.push(`testMethod2`))
    const testMethod21 = jest.fn(() => callorder.push(`testMethod21`))
    const testMethod22 = jest.fn(() => callorder.push(`testMethod22`))
    
    const PKTest = new Test()

    PKTest.describe(`describe-1 method`, () => {
      PKTest.test(`test-1 method`, () => {
        testMethod1()
      })
    })
    PKTest.describe(`describe-2 method`, () => {
      PKTest.test(`test-2 method`, testMethod2)

      PKTest.describe(`describe-2-1 method`, () => {
        PKTest.test(`test-2-1 method`, testMethod21)
      })
      PKTest.beforeAll(beforeAll1)
      PKTest.describe(`describe-2-2 child method`, () => {
        PKTest.test(`test-2-2 method`, testMethod22)
        PKTest.beforeAll(beforeAll2)
      })
    })

    await PKTest.run()

    ;([
      `testMethod1`,
      'beforeAll1',
      `testMethod2`,
      `testMethod21`,
      `beforeAll2`,
      `testMethod22`
    ]).map((name, index) => expect(callorder[index]).toBe(name))

  })


  it(`should return the results from the run method`, async () => {    
    const PKTest = new Test()

    PKTest.describe(`describe-1 method`, () => {
      PKTest.beforeAll(() => {})
      PKTest.test(`test-1 method`, () => {})
      PKTest.describe(`describe-2-1 method`, () => {
        PKTest.test(`test-2-1 method`, () => {
          throw new Error(`I am a failed test`)
        })
        PKTest.test(`test-2-2 method`, () => {})
      })
    })

    const results = await PKTest.run()
   
    const result = results[0]
    const test = result.tests[0]
    expect(test.passed).toBe(true)
    expect(test.failed).toBe(false)

    const describeObj = result.describes[0]
    expect(describeObj.passed).toBe(false)
    expect(describeObj.failed).toBe(true)

    const failedTest = describeObj.tests[0]
    expect(failedTest.passed).toBe(false)
    expect(failedTest.failed).toBe(true)
  })

})
