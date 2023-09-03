import { ParkinTest } from '../test'

describe(`ParkinTest.run`, () => {

  it(`should stop executing test when exitOnFailed is true and a test fails`, async () => {
    const test1 = jest.fn()
    const test2 = jest.fn()
    const test3 = jest.fn()
    const test4 = jest.fn()

    const PTE = new ParkinTest({
      exitOnFailed: true,
    })

    PTE.describe(`describe-1`, () => {
      PTE.test(`test-1-1`, test1)
      PTE.test(`test-failed`, () => {
        throw new Error(`Failed Test`)
      })
      PTE.test(`test-skipped`, test2)
    })

    PTE.describe(`describe-2`, () => {
      PTE.test(`test-2-1`, test3)
      PTE.test(`test-2-2`, test4)
    })
    
    let result
    try {
      await PTE.run()
      expect(`Expected Parkin Test to throw an error`).toBe(true)
    }
    catch(err){
      expect(err.name).toBe(`ParkinBailError`)
      expect(err.results).not.toBe(undefined)
      result = err.results[0]
    }

    expect(result.failed).toBe(true)
    expect(result.passed).toBe(false)
    expect(test1).toHaveBeenCalled()
    expect(test2).not.toHaveBeenCalled()
    expect(test3).not.toHaveBeenCalled()
    expect(test4).not.toHaveBeenCalled()

  })

  it(`should include valid stats when exitOnFailed error is thrown`, async () => {
    const test1 = jest.fn()
    const test2 = jest.fn()

    const PTE = new ParkinTest({ exitOnFailed: true })

    PTE.describe(`describe-1`, () => {
      PTE.test(`test-1-1`, test1)
      PTE.test(`test-failed`, () => {
        throw new Error(`Failed Test`)
      })
      PTE.test(`test-skipped`, test2)
    })

    let stats
    try {
      await PTE.run()
      expect(`Expected Parkin Test to throw an error`).toBe(true)
    }
    catch(err){
      expect(err.name).toBe(`ParkinBailError`)
      expect(err.results).not.toBe(undefined)
      stats = err.results[0].stats
    }

    expect(stats.failedSpecs).toBe(1)
    expect(stats.passedSpecs).toBe(1)
    expect(stats.failedSuites).toBe(1)
    expect(stats.passedSuites).toBe(0)
    expect(stats.runEnd > 0).toBe(true)
    expect(stats.runStart > 0).toBe(true)

  })


  it(`should stop executing test when the number of failed tests equals the bail amount`, async () => {
    const test1 = jest.fn()
    const test2 = jest.fn()
    const test3 = jest.fn()
    const test4 = jest.fn()

    const PTE = new ParkinTest({
      bail: 2,
    })

    PTE.describe(`describe-1`, () => {
      PTE.test(`test-1-1`, test1)

      PTE.test(`test-failed-1`, () => {
        throw new Error(`Failed Test`)
      })

      // Still called after a failed test
      PTE.test(`test-1-2`, test2)

      PTE.test(`test-failed-2`, () => {
        throw new Error(`Failed Test`)
      })
      // Never called, because bailed === 2
      PTE.test(`test-skipped-1`, test3)
      PTE.test(`test-skipped-2`, test4)
    })


    let result
    try {
      await PTE.run()
      expect(`Expected Parkin Test to throw an error`).toBe(true)
    }
    catch(err){
      expect(err.name).toBe(`ParkinBailError`)
      expect(err.results).not.toBe(undefined)
      result = err.results[0]
    }

    expect(result.failed).toBe(true)
    expect(result.passed).toBe(false)
    expect(test1).toHaveBeenCalled()
    expect(test2).toHaveBeenCalled()
    expect(test3).not.toHaveBeenCalled()
    expect(test4).not.toHaveBeenCalled()

  })


  it(`should stop executing test when the number of failed tests equals a high bail amount`, async () => {
    const test1 = jest.fn()
    const test2 = jest.fn()
    const test3 = jest.fn()
    const test4 = jest.fn()
    const test5 = jest.fn()
    const test6 = jest.fn()
    const test7 = jest.fn()

    const PTE = new ParkinTest({
      bail: 9,
    })

    PTE.describe(`describe-1`, () => {

      PTE.test(`test-failed-1`, () => {
        throw new Error(`Failed Test`)
      })

      PTE.test(`test-1-1`, test1)

      PTE.test(`test-failed-2`, () => {
        throw new Error(`Failed Test`)
      })
      PTE.test(`test-failed-3`, () => {
        throw new Error(`Failed Test`)
      })
      PTE.test(`test-failed-4`, () => {
        throw new Error(`Failed Test`)
      })

      // Still called after a failed test
      PTE.test(`test-1-2`, test2)

      PTE.test(`test-failed-5`, () => {
        throw new Error(`Failed Test`)
      })
      
      // Still called after multiple failed test
      PTE.test(`test-1-2`, test3)

      PTE.test(`test-failed-6`, () => {
        throw new Error(`Failed Test`)
      })
      PTE.test(`test-failed-7`, () => {
        throw new Error(`Failed Test`)
      })
      
      // Still called after multiple failed test
      PTE.test(`test-1-3`, test4)

      // Still called after multiple failed test, then a passed test
      PTE.test(`test-1-4`, test5)

      PTE.test(`test-failed-8`, () => {
        throw new Error(`Failed Test`)
      })
      PTE.test(`test-failed-9`, () => {
        throw new Error(`Failed Test`)
      })

      // Never called, because bailed === 9
      PTE.test(`test-skipped-1`, test6)
      PTE.test(`test-skipped-2`, test7)
    })


    let result
    try {
      await PTE.run()
      expect(`Expected Parkin Test to throw an error`).toBe(true)
    }
    catch(err){
      expect(err.results).not.toBe(undefined)
      result = err.results[0]
    }

    expect(result.failed).toBe(true)
    expect(result.passed).toBe(false)
    expect(test1).toHaveBeenCalled()
    expect(test2).toHaveBeenCalled()
    expect(test3).toHaveBeenCalled()
    expect(test4).toHaveBeenCalled()
    expect(test5).toHaveBeenCalled()
    expect(test6).not.toHaveBeenCalled()
    expect(test7).not.toHaveBeenCalled()

  })


  it(`should not bail if bail is equal to 0`, async () => {
    const test1 = jest.fn()
    const test2 = jest.fn()
    const test3 = jest.fn()
    const test4 = jest.fn()
    const test5 = jest.fn()
    const test6 = jest.fn()
    const test7 = jest.fn()

    const PTE = new ParkinTest({
      bail: 0,
    })

    PTE.describe(`describe-1`, () => {

      PTE.test(`test-failed-1`, () => {
        throw new Error(`Failed Test`)
      })

      PTE.test(`test-1-1`, test1)

      PTE.test(`test-failed-2`, () => {
        throw new Error(`Failed Test`)
      })
      PTE.test(`test-failed-3`, () => {
        throw new Error(`Failed Test`)
      })
      PTE.test(`test-failed-4`, () => {
        throw new Error(`Failed Test`)
      })

      // Still called after a failed test
      PTE.test(`test-1-2`, test2)

      PTE.test(`test-failed-5`, () => {
        throw new Error(`Failed Test`)
      })
      
      // Still called after multiple failed test
      PTE.test(`test-1-2`, test3)

      PTE.test(`test-failed-6`, () => {
        throw new Error(`Failed Test`)
      })
      PTE.test(`test-failed-7`, () => {
        throw new Error(`Failed Test`)
      })
      
      // Still called after multiple failed test
      PTE.test(`test-1-3`, test4)

      // Still called after multiple failed test, then a passed test
      PTE.test(`test-1-4`, test5)

      PTE.test(`test-failed-8`, () => {
        throw new Error(`Failed Test`)
      })
      PTE.test(`test-failed-9`, () => {
        throw new Error(`Failed Test`)
      })

      PTE.test(`test-1-5`, test6)
      PTE.test(`test-1-6`, test7)
    })


    const [result] = await PTE.run()

    expect(result.failed).toBe(true)
    expect(result.passed).toBe(false)
    expect(test1).toHaveBeenCalled()
    expect(test2).toHaveBeenCalled()
    expect(test3).toHaveBeenCalled()
    expect(test4).toHaveBeenCalled()
    expect(test5).toHaveBeenCalled()
    expect(test6).toHaveBeenCalled()
    expect(test7).toHaveBeenCalled()

  })


  it(`should bail all test execution across all describes and tests`, async () => {
    const test1 = jest.fn()
    const test2 = jest.fn()
    const test3 = jest.fn()
    const test4 = jest.fn()
    const test5 = jest.fn()

    const PTE = new ParkinTest({
      bail: 2,
    })

    PTE.describe(`describe-1`, () => {
      PTE.test(`test-1-1`, test1)
      PTE.test(`test-failed-1`, () => {
        throw new Error(`Failed Test`)
      })
    })

    PTE.describe(`describe-2`, () => {
      PTE.test(`test-2-1`, test2)
      
      // Second error, should cause runner to bail
      PTE.test(`test-failed-2`, () => {
        throw new Error(`Failed Test`)
      })
    })
    
    PTE.describe(`describe-3`, () => {
      // Still called after a failed test
      PTE.test(`test-3-1`, test3)
      // Never called, because bailed === 2
      PTE.test(`test-3-2`, test4)
      PTE.test(`test-3-3`, test5)
    })

    let result
    try {
      await PTE.run()
      expect(`Expected Parkin Test to throw an error`).toBe(true)
    }
    catch(err){
      expect(err.name).toBe(`ParkinBailError`)
      expect(err.results).not.toBe(undefined)
      result = err.results[0]
    }

    expect(result.failed).toBe(true)
    expect(result.passed).toBe(false)
    expect(test1).toHaveBeenCalled()
    expect(test2).toHaveBeenCalled()
    expect(test3).not.toHaveBeenCalled()
    expect(test4).not.toHaveBeenCalled()
    expect(test5).not.toHaveBeenCalled()

  })


  it(`should include valid stats when a bailed error is thrown`, async () => {
    const test1 = jest.fn()
    const test2 = jest.fn()

    const PTE = new ParkinTest({ exitOnFailed: true })

    PTE.describe(`describe-1`, () => {
      PTE.test(`test-1-1`, test1)
      PTE.test(`test-failed`, () => {
        throw new Error(`Failed Test`)
      })
      PTE.test(`test-skipped`, test2)
    })

    let stats
    let results
    try {
      await PTE.run()
      expect(`Expected Parkin Test to throw an error`).toBe(true)
    }
    catch(err){
      expect(err.name).toBe(`ParkinBailError`)
      expect(err.results).not.toBe(undefined)
      results = err.results
      stats = err.results[0].stats
    }

    expect(results.bailed).toBe(true)
    expect(stats.failedSpecs).toBe(1)
    expect(stats.passedSpecs).toBe(1)
    expect(stats.failedSuites).toBe(1)
    expect(stats.passedSuites).toBe(0)
    expect(stats.runEnd > 0).toBe(true)
    expect(stats.runStart > 0).toBe(true)

  })

  it(`should report status across multiple describes, when the first describe does not bail`, async () => {
    const test1 = jest.fn()
    const test2 = jest.fn()
    const test3 = jest.fn()
    const test4 = jest.fn()
    const test5 = jest.fn()
    const test6 = jest.fn()
    const test7 = jest.fn()

    const PTE = new ParkinTest({
      bail: 0,
    })

    PTE.describe(`describe-1`, () => {

      PTE.test(`test-failed-1`, () => {
        throw new Error(`Failed Test`)
      })

      PTE.test(`test-1-1`, test1)

      PTE.test(`test-failed-2`, () => {
        throw new Error(`Failed Test`)
      })
      PTE.test(`test-failed-3`, () => {
        throw new Error(`Failed Test`)
      })
      PTE.test(`test-failed-4`, () => {
        throw new Error(`Failed Test`)
      })

      // Still called after a failed test
      PTE.test(`test-1-2`, test2)

      PTE.test(`test-failed-5`, () => {
        throw new Error(`Failed Test`)
      })
      
      // Still called after multiple failed test
      PTE.test(`test-1-3`, test3)

    })

    PTE.describe(`describe-2`, () => {

      PTE.test(`test-2-1`, test4)

      PTE.test(`test-failed-6`, () => {
        throw new Error(`Failed Test`)
      })

      PTE.test(`test-2-2`, test5)

    })

    PTE.describe(`describe-3`, () => {
      PTE.test(`test-3-1`, test6)
      PTE.test(`test-3-2`, test7)
    })

    const resp = await PTE.run()

    expect(resp.passedSpecs).toBe(7)
    expect(resp.passedSuites).toBe(1)
    expect(resp.failedSpecs).toBe(6)
    expect(resp.failedSuites).toBe(2)
    const result = resp[0]
    expect(result.failed).toBe(true)
    expect(result.passed).toBe(false)
    expect(test1).toHaveBeenCalled()
    expect(test2).toHaveBeenCalled()
    expect(test3).toHaveBeenCalled()
    expect(test4).toHaveBeenCalled()
    expect(test5).toHaveBeenCalled()
    expect(test6).toHaveBeenCalled()
    expect(test7).toHaveBeenCalled()

  })


})
