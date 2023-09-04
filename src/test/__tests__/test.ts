
let failRunMock = false
const runMock = jest.fn(async () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if(failRunMock) return rej(new Error(`Failed Run Mock`))

      res(true)
    }, 50)
  })
})
jest.setMock(`../run`, { run: runMock })

const { ParkinTest } = require('../test')

describe(`ParkinTest`, () => {
  describe(`ParkinTest.constructor`, () => {
    it(`Should create a new instance of the ParkinTest class`, () => {
      const PTE = new ParkinTest()
      ;[
        `it`,
        `xit`,
        `run`,
        `test`,
        `xtest`,
        `describe`,
        `afterAll`,
        `beforeAll`,
        `afterEach`,
        `beforeEach`,
        `suiteTimeout`,
      ].map(prop => expect(typeof PTE[prop]).not.toBe('undefined'))
    })

    it(`Should allow passing a config object to set option`, () => {
      expect(() => {
        const PTE = new ParkinTest({
          suiteTimeout: 8543,
          testTimeout: 5000,
          onSpecDone: jest.fn(),
          onSuiteDone: jest.fn(),
          onSpecStart: jest.fn(),
          onSuiteStart: jest.fn(),
          description: `Test Description`,
        })
        expect(PTE.suiteTimeout).toBe(8543)
        expect(PTE.testTimeout).toBe(5000)
      }).not.toThrow()
    })
  })

  describe(`Test.getActiveParent`, () => {
    it(`Should return the root object when calling Test.getActiveParent`, () => {
      const PTE = new ParkinTest()
      const parent = PTE.getActiveParent()
      expect(parent.type).toBe('root')
    })

    it(`should set the root.description from the config.description`, () => {
      const PTE = new ParkinTest({ description: `Root description` })
      const parent = PTE.getActiveParent()
      expect(parent.description).toBe(`Root description`)
    })
  })

  describe(`Test.describe`, () => {
    it(`Should register a new describe method when describe is called`, () => {
      const PTE = new ParkinTest()
      PTE.describe(`Test describe`, () => {})
      const parent = PTE.getActiveParent()
      expect(parent.describes.length === 1).toBe(true)
    })

    it(`Should call the second argument passed into the describe method`, () => {
      const PTE = new ParkinTest()
      const describeFnc = jest.fn()
      PTE.describe(`Test describe`, describeFnc)
      expect(describeFnc).toHaveBeenCalled()
    })

    it(`Should allow registering multi-level describe methods`, () => {
      const PTE = new ParkinTest()
      PTE.describe(`Top describe`, () => {
        PTE.describe(`Primary describe`, () => {
          PTE.describe(`Secondary describe`, () => {})
        })
      })
      const parent = PTE.getActiveParent()
      expect(parent.describes.length === 1).toBe(true)
      const describeTop = parent.describes[0]
      expect(describeTop.describes.length === 1).toBe(true)
      const describePrimary = describeTop.describes[0]
      expect(describePrimary.describes.length === 1).toBe(true)
      const describeSecondary = describePrimary.describes[0]
      expect(describeSecondary.describes.length === 0).toBe(true)
    })

    it(`Should allow registering multiple top-level describe methods`, () => {
      const PTE = new ParkinTest()
      PTE.describe(`Top describe 1`, () => {})
      PTE.describe(`Top describe 2`, () => {})
      const parent = PTE.getActiveParent()
      expect(parent.describes.length === 2).toBe(true)
      const describeTop1 = parent.describes[0]
      expect(describeTop1.description).toBe(`Top describe 1`)
      const describeTop2 = parent.describes[1]
      expect(describeTop2.description).toBe(`Top describe 2`)
    })

    it(`Should add the correct properties to the register describe method`, () => {
      const PTE = new ParkinTest()
      PTE.describe(`Test describe`, () => {})
      const parent = PTE.getActiveParent()
      const describeObj = parent.describes[0]
      Object.entries({
        tests: `array`,
        type: `string`,
        afterAll: `array`,
        afterEach: `array`,
        action: `function`,
        beforeAll: `array`,
        describes: `object`,
        beforeEach: `array`,
        disabled: `function`,
        description: `string`,
      }).map(([ prop, type ]) => {
        type === 'array'
          ? expect(Array.isArray(describeObj[prop])).toBe(true)
          : expect(typeof describeObj[prop]).toBe(type)
      })
    })
  })

  describe(`Test.describe.only`, () => {
    beforeEach(() => {
      runMock.mockClear()
    })

    it(`Should register a new describe method when describe is called`, () => {
      const PTE = new ParkinTest()
      PTE.describe.only(`Test describe`, () => {})
      const parent = PTE.getActiveParent()
      expect(parent.describes.length === 1).toBe(true)
    })

    it(`Should set the describes only property to true`, () => {
      const PTE = new ParkinTest()
      PTE.describe.only(`Test describe`, () => {})
      const parent = PTE.getActiveParent()
      const item = parent.describes[0]
      expect(item.only).toBe(true)
    })

    it(`Should set the private #describeOnly property to true`, async () => {
      const PTE = new ParkinTest({ autoClean: false })
      PTE.describe.only(`Test describe`, () => {})
      await PTE.run()
      const runProps = runMock.mock.calls[0][0]
      expect(runProps.describeOnly).toBe(true)
    })
  })

  describe(`Test.describe.skip`, () => {
    it(`Should register a new describe method when describe is called`, () => {
      const PTE = new ParkinTest()
      PTE.describe.skip(`Test describe`, () => {})
      const parent = PTE.getActiveParent()
      expect(parent.describes.length === 1).toBe(true)
    })

    it(`Should set the describes only property to true`, () => {
      const PTE = new ParkinTest()
      PTE.describe.skip(`Test describe`, () => {})
      const parent = PTE.getActiveParent()
      const item = parent.describes[0]
      expect(item.skip).toBe(true)
    })
  })

  describe(`Test.test`, () => {
    it(`Should register a new test method when test is called`, () => {
      const PTE = new ParkinTest()
      PTE.describe(`describe method`, () => {
        PTE.test(`test method`, () => {})
      })
      const parent = PTE.getActiveParent()
      const describeObj = parent.describes[0]
      expect(describeObj.tests.length === 1).toBe(true)
    })

    it(`Should add the correct properties to the register test method`, () => {
      const PTE = new ParkinTest()
      PTE.describe(`describe method`, () => {
        PTE.test(`test method`, () => {})
      })
      const parent = PTE.getActiveParent()
      const describeObj = parent.describes[0]
      const testObj = describeObj.tests[0]
      Object.entries({
        type: `string`,
        action: `function`,
        timeout: `undefined`,
        disabled: `function`,
        description: `string`,
      }).map(([ prop, type ]) => {
        type === 'array'
          ? expect(Array.isArray(testObj[prop])).toBe(true)
          : expect(typeof testObj[prop]).toBe(type)
      })
    })

    it(`Should add the passed in meta data object when passed as the third argument`, () => {
      const metadata = { timeout: 1000 }
      const PTE = new ParkinTest()
      PTE.describe(`describe method`, () => {
        PTE.test(`test method`, () => {}, metadata)
      })

      const parent = PTE.getActiveParent()
      const describeObj = parent.describes[0]
      const test = describeObj.tests[0]
      expect(test.action.metaData).toBe(metadata)
    })

    it(`Should set timeout from the metadata when it exists on the metadata object passed as the third argument`, () => {
      const metadata = { timeout: 1500 }
      const PTE = new ParkinTest()
      PTE.describe(`describe method`, () => {
        PTE.test(`test method`, () => {}, metadata)
      })

      const parent = PTE.getActiveParent()
      const describeObj = parent.describes[0]
      const test = describeObj.tests[0]
      expect(test.timeout).toBe(1500)
    })

    it(`Should add the passed in timeout when passed third argument is a number`, () => {
      const timeout = 2000
      const PTE = new ParkinTest()
      PTE.describe(`describe method`, () => {
        PTE.test(`test method`, () => {}, timeout)
      })

      const parent = PTE.getActiveParent()
      const describeObj = parent.describes[0]
      const test = describeObj.tests[0]
      expect(test.timeout).toBe(2000)
    })

    it(`Should not set a timeout when a timeout is not passed`, () => {
      const PTE = new ParkinTest()
      PTE.describe(`describe method`, () => {
        PTE.test(`test method`, () => {})
      })

      const parent = PTE.getActiveParent()
      const describeObj = parent.describes[0]
      const test = describeObj.tests[0]
      expect(test.timeout).toBe(undefined)
    })

    it(`Should throw an error when the test method is called outside of a describe method`, () => {
      expect(() => {
        const PTE = new ParkinTest()
        PTE.test(`test method`, () => {})
      }).toThrow()
    })

    it(`Should throw an error when a description is not passed to the Test.test method`, () => {
      expect(() => {
        const PTE = new ParkinTest()
        PTE.test(false, () => {})
      }).toThrow()
    })

    it(`Should throw an error when a function is not passed to the Test.test method`, () => {
      expect(() => {
        const PTE = new ParkinTest()
        PTE.xtest(`No function`)
      }).toThrow()
    })
  })

  describe(`Test.test.only`, () => {
    beforeEach(() => {
      runMock.mockClear()
    })

    it(`Should register a new test method when test.only is called`, () => {
      const PTE = new ParkinTest()
      PTE.describe(`describe method`, () => {
        PTE.test.only(`test method`, () => {})
      })
      const parent = PTE.getActiveParent()
      const describeObj = parent.describes[0]
      expect(describeObj.tests.length === 1).toBe(true)
    })

    it(`Should set the test only prop to true`, () => {
      const PTE = new ParkinTest()
      PTE.describe(`describe method`, () => {
        PTE.test.only(`test method`, () => {})
      })
      const parent = PTE.getActiveParent()
      const describeObj = parent.describes[0]
      const testObj = describeObj.tests[0]
      expect(testObj.only).toBe(true)
    })

    it(`Should set the private #testOnly property to true`, async () => {
      const PTE = new ParkinTest({ autoClean: false })
      PTE.describe(`Test describe`, () => {
        PTE.test.only(`test method`, () => {})
      })
      await PTE.run()
      const runProps = runMock.mock.calls[0][0]
      expect(runProps.testOnly).toBe(true)
    })
  })

  describe(`Test.test.skip`, () => {
    it(`Should register a new test method when test.skip is called`, () => {
      const PTE = new ParkinTest()
      PTE.describe(`describe method`, () => {
        PTE.test.skip(`test method`, () => {})
      })

      const parent = PTE.getActiveParent()
      const describeObj = parent.describes[0]
      expect(describeObj.tests.length === 1).toBe(true)
    })

    it(`Should set the test skip property to true`, () => {
      const PTE = new ParkinTest()
      PTE.describe(`describe method`, () => {
        PTE.test.skip(`test method`, () => {})
      })

      const parent = PTE.getActiveParent()
      const describeObj = parent.describes[0]
      const item = describeObj.tests[0]
      expect(item.skip).toBe(true)
    })
  })

  describe(`Test.xtest`, () => {
    it(`Should NOT throw an error when a function to it not passed to the Test.xtest method`, () => {
      expect(() => {
        const PTE = new ParkinTest()
        PTE.describe(`describe method`, () => {
          PTE.xtest(`test method`)
        })
      }).not.toThrow()
    })

    it(`Should not add an action to the Test.xtest method even when passed`, () => {
      const PTE = new ParkinTest()
      PTE.describe(`describe method`, () => {
        PTE.xtest(`test method`, () => {})
      })
      const parent = PTE.getActiveParent()
      const describeObj = parent.describes[0]
      const testObj = describeObj.tests[0]
      expect(testObj.action).toBe(undefined)
    })

    it(`Should throw an error when the xtest method is called outside of a describe method`, () => {
      expect(() => {
        const PTE = new ParkinTest()
        PTE.xtest(`test method`, () => {})
      }).toThrow()
    })

    it(`Should throw an error when a description is not passed to the Test.xtest method`, () => {
      expect(() => {
        const PTE = new ParkinTest()
        PTE.describe(`describe method`, () => {
          PTE.xtest()
        })
      }).toThrow()
    })
  })

  describe(`Test.beforeAll`, () => {
    it(`Should register with the closest describe method`, () => {
      const PTE = new ParkinTest()
      const beforeAll1 = jest.fn()
      const beforeAll2 = jest.fn()
      PTE.describe(`describe-1 method`, () => {})
      PTE.describe(`describe-2 method`, () => {
        PTE.describe(`describe-2-1 method`, () => {})
        PTE.beforeAll(beforeAll1)
        PTE.describe(`describe-2-2 child method`, () => {
          PTE.beforeAll(beforeAll2)
        })
      })
      PTE.describe(`describe-3 method`, () => {})

      const parent = PTE.getActiveParent()
      const describeObj = parent.describes[1]
      expect(describeObj.beforeAll[0]).toBe(beforeAll1)
      expect(describeObj.describes[1].beforeAll[0]).toBe(beforeAll2)
    })

    it(`Should not throw when called outside a describe method`, () => {
      expect(() => {
        const PTE = new ParkinTest()
        PTE.beforeAll(() => {})
      }).not.toThrow()
    })

    it(`Should throw when not passed a function`, () => {
      expect(() => {
        const PTE = new ParkinTest()
        PTE.describe(`describe method`, () => {
          PTE.beforeAll()
        })
      }).toThrow()
    })
  })

  describe(`Test.afterAll`, () => {
    it(`Should register with the closest describe method`, () => {
      const PTE = new ParkinTest()
      const afterAll1 = jest.fn()
      const afterAll2 = jest.fn()
      PTE.describe(`describe-1 method`, () => {})
      PTE.describe(`describe-2 method`, () => {
        PTE.describe(`describe-2-1 method`, () => {})
        PTE.afterAll(afterAll1)
        PTE.describe(`describe-2-2 child method`, () => {
          PTE.afterAll(afterAll2)
        })
      })
      PTE.describe(`describe-3 method`, () => {})

      const parent = PTE.getActiveParent()
      const describeObj = parent.describes[1]
      expect(describeObj.afterAll[0]).toBe(afterAll1)
      expect(describeObj.describes[1].afterAll[0]).toBe(afterAll2)
    })

    it(`Should not throw when called outside a describe method`, () => {
      expect(() => {
        const PTE = new ParkinTest()
        PTE.afterAll(() => {})
      }).not.toThrow()
    })

    it(`Should throw when not passed a function`, () => {
      expect(() => {
        const PTE = new ParkinTest()
        PTE.describe(`describe method`, () => {
          PTE.afterAll()
        })
      }).toThrow()
    })
  })

  describe(`Test.beforeEach`, () => {
    it(`Should register with the closest describe method`, () => {
      const PTE = new ParkinTest()
      const beforeEach1 = jest.fn()
      const beforeEach2 = jest.fn()
      PTE.describe(`describe-1 method`, () => {})
      PTE.describe(`describe-2 method`, () => {
        PTE.describe(`describe-2-1 method`, () => {})
        PTE.beforeEach(beforeEach1)
        PTE.describe(`describe-2-2 child method`, () => {
          PTE.beforeEach(beforeEach2)
        })
      })
      PTE.describe(`describe-3 method`, () => {})

      const parent = PTE.getActiveParent()
      const describeObj = parent.describes[1]
      expect(describeObj.beforeEach[0]).toBe(beforeEach1)
      expect(describeObj.describes[1].beforeEach[0]).toBe(beforeEach2)
    })

    it(`Should not throw when called outside a describe method`, () => {
      expect(() => {
        const PTE = new ParkinTest()
        PTE.beforeEach(() => {})
      }).not.toThrow()
    })

    it(`Should throw when not passed a function`, () => {
      expect(() => {
        const PTE = new ParkinTest()
        PTE.describe(`describe method`, () => {
          PTE.beforeEach()
        })
      }).toThrow()
    })
  })

  describe(`Test.afterEach`, () => {
    it(`Should register with the closest describe method`, () => {
      const PTE = new ParkinTest()
      const afterEach1 = jest.fn()
      const afterEach2 = jest.fn()
      PTE.describe(`describe-1 method`, () => {})
      PTE.describe(`describe-2 method`, () => {
        PTE.describe(`describe-2-1 method`, () => {})
        PTE.afterEach(afterEach1)
        PTE.describe(`describe-2-2 child method`, () => {
          PTE.afterEach(afterEach2)
        })
      })
      PTE.describe(`describe-3 method`, () => {})

      const parent = PTE.getActiveParent()
      const describeObj = parent.describes[1]
      expect(describeObj.afterEach[0]).toBe(afterEach1)
      expect(describeObj.describes[1].afterEach[0]).toBe(afterEach2)
    })

    it(`Should not throw when called outside a describe method`, () => {
      expect(() => {
        const PTE = new ParkinTest()
        PTE.afterEach(() => {})
      }).not.toThrow()
    })

    it(`Should throw when not passed a function`, () => {
      expect(() => {
        const PTE = new ParkinTest()
        PTE.describe(`describe method`, () => {
          PTE.afterEach()
        })
      }).toThrow()
    })
  })

  describe(`Test.clean`, () => {
    beforeEach(() => {
      runMock.mockClear()
    })

    it(`should clear out the current root`, () => {
      const PTE = new ParkinTest()

      PTE.beforeEach(() => {})
      PTE.describe(`describe-1 method`, () => {
        PTE.beforeEach(() => {})
        PTE.test('test method', () => {})
      })
      PTE.describe(`describe-2 method`, () => {
        PTE.describe(`describe-2-1 method`, () => {})
        PTE.afterAll(() => {})
        PTE.describe(`describe-2-2 child method`, () => {
          PTE.test('test method', () => {})
          PTE.afterAll(() => {})
        })
      })
      PTE.afterAll(() => {})
      PTE.describe(`describe-3 method`, () => {})

      const root = PTE.getActiveParent()

      expect(root.describes.length).toBe(3)
      expect(root.beforeEach.length).toBe(1)
      expect(root.afterAll.length).toBe(1)

      PTE.clean()
      const cleanRoot = PTE.getActiveParent()
      expect(cleanRoot).not.toEqual(root)

      expect(cleanRoot.describes.length).toBe(0)
      expect(cleanRoot.beforeEach.length).toBe(0)
      expect(cleanRoot.afterAll.length).toBe(0)
    })

    it(`should reset #testOnly, #describeOnly and timeout`, async () => {
      const PTE = new ParkinTest()

      PTE.describe.only(`Test describe`, () => {
        PTE.test(`test method`, () => {})
      })
      PTE.describe(`describe method`, () => {
        PTE.test.skip(`test method`, () => {})
      })
      PTE.describe(`Test describe`, () => {
        PTE.test.only(`test method`, () => {})
      })
      await PTE.run({ autoClean: false })
      const runProps = runMock.mock.calls[0][0]
      expect(runProps.testOnly).toBe(true)
      expect(runProps.describeOnly).toBe(true)

      PTE.clean()
      await PTE.run()
      const cleanRunProps = runMock.mock.calls[1][0]
      expect(cleanRunProps.testOnly).toBe(false)
      expect(cleanRunProps.describeOnly).toBe(false)
    })
  })

  describe(`Test.run`, () => {
    beforeEach(() => {
      runMock.mockClear()
    })

    it(`should call run module and clean method`, async () => {
      const PTE = new ParkinTest()
      PTE.clean = jest.fn()

      await PTE.run()

      expect(runMock).toHaveBeenCalled()
      expect(PTE.clean).toHaveBeenCalled()
    })

    it(`should allow overriding the existing config and description`, async () => {
      const PTE = new ParkinTest({
          suiteTimeout: 8543,
          description: `Should be overridden`,
      })
      
      PTE.clean = jest.fn()
      await PTE.run({
        autoClean: false,
        suiteTimeout: 3000,
        description: `Override description`,
      })

      const runProps = runMock.mock.calls[0][0]
      expect(runProps.root.description).toBe(`Override description`)
      expect(PTE.suiteTimeout).toBe(3000)
      expect(PTE.clean).not.toHaveBeenCalled()
    })

    it(`should fail when the suite timeout finishes before the the run module`, async () => {
      const PTE = new ParkinTest({ suiteTimeout: 10 })
      let caught:boolean = false

      try {
        await PTE.run()
      }
      catch(err){
        caught = true
        expect(err.name).toBe(`TimeoutError`)
        expect(err.message).toBe(`Test Execution failed, the suite timeout 10ms was exceeded`)
      }

      if(!caught)
        throw new Error(`PTE.run should have thrown a timeout error, but it did not`)

    })


    it(`should set the suiteRetry and testRetry values when passed`, async () => {
      const PTE = new ParkinTest({
        testRetry: 4,
        suiteRetry: 2,
      })
      
      expect(PTE.testRetry).toBe(4)
      expect(PTE.suiteRetry).toBe(2)
    
    })

    it(`should pass the testRetry and retry callbacks to the run method`, async () => {
      const onTestRetry = () => {}
      const PTE = new ParkinTest({
        onTestRetry,
        testRetry: 2,
      })

      await PTE.run()
      const args = runMock.mock.calls[0][0]
      expect(args.testRetry).toBe(2)
      expect(args.onTestRetry).toBe(onTestRetry)
    })


    it(`should allow overwriting the testRetry and onTestRetry when calling the run method`, async () => {
      const onTestRetry = () => {}
      const onTestRetry2 = () => {}
      const PTE = new ParkinTest({
        onTestRetry,
        testRetry: 2,
      })

      await PTE.run({
        testRetry: 0,
        onTestRetry: onTestRetry2,
      })
      const args = runMock.mock.calls[0][0]
      expect(args.testRetry).toBe(0)
      expect(args.onTestRetry).toBe(onTestRetry2)
    })

    it(`should retry a suite when suite retry is greater then 0`, async () => {

      const onSuiteRetry = jest.fn()
      const PTE = new ParkinTest({
        suiteRetry: 1,
        onSuiteRetry
      })

      failRunMock = true

      try {
        runMock.mockClear()
        await PTE.run()
      }
      catch(err){
        expect(err.name).toBe(`RetryError`)
        expect(runMock).toHaveBeenCalledTimes(2)
        expect(onSuiteRetry).toHaveBeenCalled()
      }

      failRunMock = false

    })

  })

})
