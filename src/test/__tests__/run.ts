import { ParkinTest } from '../test'

describe(`ParkinTest.run`, () => {

  it(`should match the readme example call order`, async () => {
    const callOrder = []
    const PTE = new ParkinTest()
    PTE.describe(`describe-1`, () => {

      PTE.test(`test-1-1`, () => callOrder.push(`call #3`))

      PTE.describe(`describe-1-2`, () => {

        PTE.afterAll(() => callOrder.push(`call #6`))

        PTE.test(`test-1-2-1`, () => callOrder.push(`call #5`))
      })
      
      PTE.beforeAll(() => callOrder.push(`call #1`))
      PTE.beforeEach(() => callOrder.push(`call #2 & #4`))

    })
    
    await PTE.run()

    expect(callOrder[0]).toBe(`call #1`)
    expect(callOrder[1]).toBe(`call #2 & #4`)
    expect(callOrder[2]).toBe(`call #3`)
    expect(callOrder[3]).toBe(`call #2 & #4`)
    expect(callOrder[4]).toBe(`call #5`)
    expect(callOrder[5]).toBe(`call #6`)

  })

  it(`should run the passed in hook and test methods in correct order`, async () => {
    const callorder = []
    const beforeEach1 = jest.fn(() => callorder.push(`beforeEach1`))
    const beforeEach2 = jest.fn(() => callorder.push(`beforeEach2`))
    const afterEach1 = jest.fn(() => callorder.push(`afterEach1`))
    const beforeAll1 = jest.fn(() => callorder.push(`beforeAll1`))
    const beforeAll2 = jest.fn(() => callorder.push(`beforeAll2`))
    const afterAll1 = jest.fn(() => callorder.push(`afterAll1`))
    const afterAll2 = jest.fn(() => callorder.push(`afterAll2`))
    const testMethod1 = jest.fn(() => callorder.push(`testMethod1`))
    const testMethod2 = jest.fn(() => callorder.push(`testMethod2`))
    const testMethod21 = jest.fn(() => callorder.push(`testMethod21`))
    const testMethod22 = jest.fn(() => callorder.push(`testMethod22`))
    const testMethod23 = jest.fn(() => {
      callorder.push(`testMethod23`)
      return { status: 'passed' }
    })

    const PTE = new ParkinTest()

    PTE.describe(`describe-1 method`, () => {
      PTE.beforeEach(beforeEach1)
      PTE.test(`test-1 method`, () => {
        testMethod1()
      })
      PTE.afterEach(afterEach1)
    })

    PTE.describe(`describe-2 method`, () => {
      PTE.test(`test-2 method`, testMethod2)
      PTE.afterAll(afterAll1)
      PTE.describe(`describe-2-1 method`, () => {
        PTE.test(`test-2-1 method`, testMethod21)
      })
      PTE.beforeAll(beforeAll1)
      PTE.describe(`describe-2-2 child method`, () => {
        PTE.afterAll(afterAll2)
        PTE.beforeEach(beforeEach2)
        PTE.test(`test-2-2 method`, testMethod22)
        PTE.test(`test-2-3 method`, testMethod23)
        PTE.beforeAll(beforeAll2)
      })
    })

    await PTE.run()

    expect(beforeEach1).toHaveBeenCalled()
    expect(beforeEach2).toHaveBeenCalled()
    expect(afterEach1).toHaveBeenCalled()
    expect(beforeAll1).toHaveBeenCalled()
    expect(beforeAll2).toHaveBeenCalled()
    expect(afterAll1).toHaveBeenCalled()
    expect(afterAll2).toHaveBeenCalled()
    expect(testMethod1).toHaveBeenCalled()
    expect(testMethod2).toHaveBeenCalled()
    expect(testMethod21).toHaveBeenCalled()
    expect(testMethod22).toHaveBeenCalled()
    expect(testMethod23).toHaveBeenCalled()
    ;[
      `beforeEach1`,
      `testMethod1`,
      `afterEach1`,
      `beforeAll1`,
      `testMethod2`,
      `testMethod21`,
      `beforeAll2`,
      `beforeEach2`,
      `testMethod22`,
      `beforeEach2`,
      `testMethod23`,
      `afterAll2`,
      `afterAll1`,
    ].map((name, index) => expect(callorder[index]).toBe(name))
  })

  it(`should return the results from the run method`, async () => {
    const PTE = new ParkinTest()

    PTE.describe(`describe-1 method`, () => {
      PTE.beforeAll(() => {})
      PTE.test(`test-1 method`, () => {})
      PTE.describe(`describe-2-1 method`, () => {
        PTE.test(`test-2-1 method`, () => {
          throw new Error(`I am a failed test`)
        })
        PTE.test(`test-2-2 method`, () => {})
      })
    })

    const results = await PTE.run()

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

  it(`should call the test callback hooks`, async () => {
    const config = {
      timeout: 8543,
      specDone: jest.fn(),
      suiteDone: jest.fn(),
      specStarted: jest.fn(),
      suiteStarted: jest.fn(),
    }
    const PTE = new ParkinTest(config)

    PTE.describe(`describe-1 method`, () => {
      PTE.beforeAll(() => {})
      PTE.test(`test-1 method`, () => {})
      PTE.describe(`describe-2-1 method`, () => {
        PTE.test(`test-2-1 method`, () => {
          throw new Error(`I am a failed test`)
        })
        PTE.test(`test-2-2 method`, () => {})
      })
    })

    await PTE.run()
    expect(config.suiteStarted).toHaveBeenCalledTimes(2)
    expect(config.suiteDone).toHaveBeenCalledTimes(2)
    expect(config.specStarted).toHaveBeenCalledTimes(3)
    expect(config.specDone).toHaveBeenCalledTimes(3)
  })

  it(`should only run tests in a describe.only block when set`, async () => {
    const PTE = new ParkinTest()
    const beforeAllNoOnly1 = jest.fn()
    const beforeAllOnly1 = jest.fn()
    const testNoOnly1 = jest.fn()
    const testNoOnly2 = jest.fn()
    const testOnly1 = jest.fn()
    const testOnly2 = jest.fn()

    PTE.describe(`describe-no-only method`, () => {
      PTE.beforeAll(beforeAllNoOnly1)
      PTE.test(`test-no-only-1 method`, testNoOnly1)
    })

    PTE.describe.only(`describe-only-1 method`, () => {
      PTE.describe.only(`describe-only-1-1 method`, () => {
        PTE.beforeAll(beforeAllOnly1)
        PTE.test(`test-only-1 method`, testOnly1)
        PTE.test(`test-only-2 method`, testOnly2)
      })

      PTE.describe(`describe-no-only-1-2 method`, () => {
        PTE.test(`test-no-only-2`, testNoOnly2)
      })
    })

    await PTE.run()

    expect(testNoOnly1).not.toHaveBeenCalled()
    expect(testNoOnly2).not.toHaveBeenCalled()
    expect(beforeAllNoOnly1).not.toHaveBeenCalled()

    expect(beforeAllOnly1).toHaveBeenCalled()
    expect(testOnly1).toHaveBeenCalled()
    expect(testOnly2).toHaveBeenCalled()
  })

  it(`should only run tests in a test.only block when set`, async () => {
    const PTE = new ParkinTest()
    const afterAllNoOnly1 = jest.fn()
    const afterAllOnly1 = jest.fn()
    const testNoOnly1 = jest.fn()
    const testNoOnly2 = jest.fn()
    const testOnly1 = jest.fn()
    const testOnly2 = jest.fn()

    PTE.describe(`describe-no-only method`, () => {
      PTE.afterAll(afterAllNoOnly1)
      PTE.test(`test-no-only-1 method`, testNoOnly1)
    })

    PTE.describe(`describe-only-1 method`, () => {
      PTE.describe(`describe-only-1-1 method`, () => {
        PTE.afterAll(afterAllOnly1)
        PTE.test.only(`test-only-1 method`, testOnly1)
        PTE.test(`test-no-only-2 method`, testOnly2)
      })

      PTE.describe(`describe-no-only-1-2 method`, () => {
        PTE.test(`test-no-only-2`, testNoOnly2)
      })
    })

    await PTE.run()

    expect(testNoOnly1).not.toHaveBeenCalled()
    expect(testNoOnly2).not.toHaveBeenCalled()
    expect(afterAllNoOnly1).not.toHaveBeenCalled()
    expect(testOnly2).not.toHaveBeenCalled()

    expect(afterAllOnly1).toHaveBeenCalled()
    expect(testOnly1).toHaveBeenCalled()
  })

  it(`should not run tests in a describe.skip block when set`, async () => {
    const PTE = new ParkinTest()
    const beforeAllNoSkip1 = jest.fn()
    const beforeAllSkip1 = jest.fn()
    const testNoSkip1 = jest.fn()
    const testNoSkip2 = jest.fn()
    const testSkip1 = jest.fn()
    const testSkip2 = jest.fn()

    PTE.describe.skip(`describe-no-only method`, () => {
      PTE.beforeAll(beforeAllSkip1)
      PTE.test(`test-no-only-1 method`, testSkip1)
    })

    PTE.describe(`describe-only-1 method`, () => {
      PTE.describe(`describe-only-1-1 method`, () => {
        PTE.beforeAll(beforeAllNoSkip1)
        PTE.test(`test-only-1 method`, testNoSkip1)
        PTE.test(`test-only-2 method`, testNoSkip2)
      })

      PTE.describe.skip(`describe-no-only-1-2 method`, () => {
        PTE.test(`test-no-only-2`, testSkip2)
      })
    })

    await PTE.run()

    expect(testSkip1).not.toHaveBeenCalled()
    expect(testSkip2).not.toHaveBeenCalled()
    expect(beforeAllSkip1).not.toHaveBeenCalled()

    expect(beforeAllNoSkip1).toHaveBeenCalled()
    expect(testNoSkip1).toHaveBeenCalled()
    expect(testNoSkip2).toHaveBeenCalled()
  })

  it(`should not run tests in a test.skip block when set`, async () => {
    const PTE = new ParkinTest()
    const beforeAllNoSkip1 = jest.fn()
    const beforeAllSkip1 = jest.fn()
    const testNoSkip1 = jest.fn()
    const testNoSkip2 = jest.fn()
    const testSkip1 = jest.fn()
    const testSkip2 = jest.fn()

    PTE.describe(`describe-no-only method`, () => {
      PTE.beforeAll(beforeAllSkip1)
      PTE.test.skip(`test-no-only-1 method`, testSkip1)
    })

    PTE.describe(`describe-only-1 method`, () => {
      PTE.describe(`describe-only-1-1 method`, () => {
        PTE.beforeAll(beforeAllNoSkip1)
        PTE.test(`test-only-1 method`, testNoSkip1)
        PTE.test(`test-only-2 method`, testNoSkip2)
      })

      PTE.describe.skip(`describe-no-only-1-2 method`, () => {
        PTE.test.skip(`test-no-only-2`, testSkip2)
      })
    })

    await PTE.run()

    expect(testSkip1).not.toHaveBeenCalled()
    expect(testSkip2).not.toHaveBeenCalled()
    expect(testNoSkip1).toHaveBeenCalled()
    expect(testNoSkip2).toHaveBeenCalled()
  })

  it(`should stop test execution in a describe block when a beforeAll or beforeEach throws`, async () => {
    const PTE = new ParkinTest()
    const testCalled1 = jest.fn()
    const testCalled2 = jest.fn()
    const testNotCalled1 = jest.fn()
    const testNotCalled2 = jest.fn()
    const testNotCalled3 = jest.fn()

    PTE.describe(`describe-1 method`, () => {
      PTE.test(`test-1 method`, testCalled1)

      PTE.describe(`describe-2 method`, () => {
        PTE.beforeAll(() => {
          throw new Error(`Before All hook error`)
        })
        PTE.test(`test-2-1 method`, testNotCalled1)
      })

      PTE.describe(`describe-3 method`, () => {
        PTE.beforeEach(() => {
          throw new Error(`Before All hook error`)
        })
        PTE.test(`test-3-1 method`, testNotCalled2)
        PTE.test(`test-3-2 method`, testNotCalled3)
      })

      PTE.describe(`describe-4 method`, () => {
        PTE.beforeEach(() => {})
        PTE.test(`test-4-1 method`, testCalled2)
      })
    })

    await PTE.run()

    expect(testCalled1).toHaveBeenCalled()
    expect(testCalled2).toHaveBeenCalled()
    expect(testNotCalled1).not.toHaveBeenCalled()
    expect(testNotCalled2).not.toHaveBeenCalled()
    expect(testNotCalled3).not.toHaveBeenCalled()
  })

  it(`should stop test execution in a describe block when a afterAll or afterEach throws`, async () => {
    const PTE = new ParkinTest()
    const testCalled1 = jest.fn()
    const testCalled2 = jest.fn()
    const testCalled3 = jest.fn()
    const testNotCalled1 = jest.fn()

    PTE.describe(`describe-1 method`, () => {
      PTE.test(`test-1 method`, testCalled1)

      PTE.describe(`describe-2 method`, () => {
        PTE.afterAll(() => {
          throw new Error(`Before All hook error`)
        })
        PTE.test(`test-2-1 method`, testCalled2)
      })

      PTE.describe(`describe-3 method`, () => {
        PTE.afterEach(() => {
          throw new Error(`Before All hook error`)
        })
        PTE.test(`test-3-1 method`, testCalled3)
        PTE.test(`test-3-2 method`, testNotCalled1)
      })
    })

    await PTE.run()

    expect(testCalled1).toHaveBeenCalled()
    expect(testCalled2).toHaveBeenCalled()
    expect(testCalled3).toHaveBeenCalled()
    expect(testNotCalled1).not.toHaveBeenCalled()
  })
  
  it(`should call the parent afterAll hooks when a test throws`, async () => {

    const PTE = new ParkinTest()
    const testCalled1 = jest.fn()
    const afterAll1 = jest.fn()
    const afterAll2 = jest.fn()

    PTE.describe(`describe-1 method`, () => {
      PTE.test(`test-1 method`, testCalled1)

      PTE.describe(`describe-2 method`, () => {
        PTE.test(`test-2-1 method`, () => {
          throw new Error(`test-2-1 test error`)
        })
        
        PTE.afterAll(afterAll1)
      })

      PTE.afterAll(afterAll2)
    })

    await PTE.run()

    expect(afterAll1).toHaveBeenCalled()
    expect(afterAll2).toHaveBeenCalled()

  })

  it(`should call the parent afterAll hooks when a test throws`, async () => {

    const PTE = new ParkinTest()
    const testCalled1 = jest.fn()
    const afterEach1 = jest.fn()
    const afterAll1 = jest.fn()

    PTE.describe(`describe-1 method`, () => {
      PTE.test(`test-1 method`, testCalled1)
      
      PTE.afterEach(afterEach1)

      PTE.describe(`describe-2 method`, () => {
        PTE.test(`test-1 method`, () => {
          throw new Error(`describe-2 error`)
        })
      })

      PTE.afterAll(afterAll1)
    })

    await PTE.run()

    expect(afterEach1).toHaveBeenCalled()
    expect(afterAll1).toHaveBeenCalled()

  })


  it(`should call the root afterAll hooks when a test throws`, async () => {

    const PTE = new ParkinTest()
    const testCalled1 = jest.fn()
    const afterEach = jest.fn()
    const afterAll = jest.fn()

    PTE.afterEach(afterEach)
    PTE.afterAll(afterAll)

    PTE.describe(`describe-1 method`, () => {
      PTE.test(`test-1 method`, testCalled1)

      PTE.describe(`describe-2 method`, () => {
        PTE.test(`test-1 method`, () => {
          throw new Error(`describe-2 error`)
        })
      })

    })

    await PTE.run()

    expect(afterEach).toHaveBeenCalled()
    expect(afterAll).toHaveBeenCalled()

  })


  it(`should not call the after hooks when a before hook throws`, async () => {

    const PTE = new ParkinTest()
    const testCalled1 = jest.fn()
    const beforeAll = jest.fn(() => {
      throw new Error(`BeforeAll Error`)
    })
    const afterEach = jest.fn()
    const afterAll = jest.fn()


    PTE.describe(`describe-1 method`, () => {

      PTE.beforeAll(beforeAll)

      PTE.test(`test-1 method`, testCalled1)

      PTE.describe(`describe-2 method`, () => {
        PTE.test(`test-1 method`, () => {
          throw new Error(`describe-2 error`)
        })
      })

      PTE.afterEach(afterEach)
      PTE.afterAll(afterAll)
    })

    await PTE.run()


    expect(afterEach).not.toHaveBeenCalled()
    expect(afterAll).not.toHaveBeenCalled()

  })


  it(`should call the root afterAll hook when a before hook throws`, async () => {

    const PTE = new ParkinTest()
    const testCalled1 = jest.fn()
    const beforeAll = jest.fn(() => {
      throw new Error(`BeforeAll Error`)
    })
    const afterEach = jest.fn()
    const afterAll = jest.fn()
    const afterAll1 = jest.fn()

    PTE.afterEach(afterEach)
    PTE.afterAll(afterAll)

    PTE.describe(`describe-1 method`, () => {

      PTE.beforeAll(beforeAll)

      PTE.test(`test-1 method`, testCalled1)

      PTE.describe(`describe-2 method`, () => {
        PTE.test(`test-1 method`, () => {
          throw new Error(`describe-2 error`)
        })
      })
      
      PTE.afterAll(afterAll1)

    })

    await PTE.run()

    expect(afterEach).not.toHaveBeenCalled()
    expect(afterAll1).not.toHaveBeenCalled()

    expect(afterAll).toHaveBeenCalled()

  })


})
