import { Test } from '../test'

describe(`Test`, () => {
  
  describe(`Test.constructor`, () => {

    it(`Should create a new instance of the Test class`, () => {
      const PKTest = new Test()
      ;([
        `it`,
        `xit`,
        `run`,
        `test`,
        `xtest`,
        `timeout`,
        `describe`,
        `afterAll`,
        `beforeAll`,
        `afterEach`,
        `beforeEach`,
      ]).map(prop => expect(typeof PKTest[prop]).not.toBe('undefined'))
    })

    it(`Should allow passing a config object to set option`, () => {
      expect(() => {
        const PKTest = new Test({
          timeout: 8543,
          specDone: jest.fn(),
          suiteDone: jest.fn(),
          specStarted: jest.fn(),
          suiteStarted: jest.fn()
        })
        expect(PKTest.timeout).toBe(8543)
      }).not.toThrow()
    })

  })

  describe(`Test.getActiveParent`, () => {

    it(`Should return the root object when calling Test.getActiveParent`, () => {
      const PKTest = new Test()
      const parent = PKTest.getActiveParent()
      expect(parent.type).toBe('root')
    })

  })

  describe(`Test.describe`, () => {

    it(`Should register a new describe method when describe is called`, () => {
      const PKTest = new Test()
      PKTest.describe(`Test describe`, () => {})
      const parent = PKTest.getActiveParent()
      expect(parent.describes.length === 1).toBe(true)
    })

    it(`Should call the second argument passed into the describe method`, () => {
      const PKTest = new Test()
      const describeFnc = jest.fn()
      PKTest.describe(`Test describe`, describeFnc)
      expect(describeFnc).toHaveBeenCalled()
    })

    it(`Should allow registering multi-level describe methods`, () => {
      const PKTest = new Test()
      PKTest.describe(`Top describe`, () => {
        PKTest.describe(`Primary describe`, () => {
          PKTest.describe(`Secondary describe`, () => {
          })
        })
      })
      const parent = PKTest.getActiveParent()
      expect(parent.describes.length === 1).toBe(true)
      const describeTop = parent.describes[0]
      expect(describeTop.describes.length === 1).toBe(true)
      const describePrimary = describeTop.describes[0]
      expect(describePrimary.describes.length === 1).toBe(true)
      const describeSecondary = describePrimary.describes[0]
      expect(describeSecondary.describes.length === 0).toBe(true)
    })

    it(`Should allow registering multiple top-level describe methods`, () => {
      const PKTest = new Test()
      PKTest.describe(`Top describe 1`, () => {
      })
      PKTest.describe(`Top describe 2`, () => {
      })
      const parent = PKTest.getActiveParent()
      expect(parent.describes.length === 2).toBe(true)
      const describeTop1 = parent.describes[0]
      expect(describeTop1.description).toBe(`Top describe 1`)
      const describeTop2 = parent.describes[1]
      expect(describeTop2.description).toBe(`Top describe 2`)
    })

    it(`Should add the correct properties to the register describe method`, () => {
      const PKTest = new Test()
      PKTest.describe(`Test describe`, () => {})
      const parent = PKTest.getActiveParent()
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
      }).map(([prop, type]) => {
        type === 'array'
          ? expect(Array.isArray(describeObj[prop])).toBe(true)
          : expect(typeof describeObj[prop]).toBe(type)
      })
    })

  })

  describe(`Test.test`, () => {

    it(`Should register a new test method when test is called`, () => {
      const PKTest = new Test()
      PKTest.describe(`describe method`, () => {
        PKTest.test(`test method`, () => {
        })
      })
      const parent = PKTest.getActiveParent()
      const describeObj = parent.describes[0]
      expect(describeObj.tests.length === 1).toBe(true)
    })

    it(`Should add the correct properties to the register test method`, () => {
      const PKTest = new Test()
      PKTest.describe(`describe method`, () => {
        PKTest.test(`test method`, () => {
        })
      })
      const parent = PKTest.getActiveParent()
      const describeObj = parent.describes[0]
      const testObj = describeObj.tests[0]
      Object.entries({
        type: `string`,
        action: `function`,
        timeout: `undefined`,
        disabled: `function`,
        description: `string`,
      }).map(([prop, type]) => {
        type === 'array'
          ? expect(Array.isArray(testObj[prop])).toBe(true)
          : expect(typeof testObj[prop]).toBe(type)
      })
    })

    it(`Should throw an error when the test method is called outside of a describe method`, () => {
      expect(() => {
        const PKTest = new Test()
        PKTest.test(`test method`, () => {})
      }).toThrow()
    })

    it(`Should throw an error when a description is not passed to the Test.test method`, () => {
      expect(() => {
        const PKTest = new Test()
        PKTest.test(false, () => {})
      }).toThrow()
    })

    it(`Should throw an error when a function is not passed to the Test.test method`, () => {
      expect(() => {
        const PKTest = new Test()
        PKTest.xtest(`No function`)
      }).toThrow()
    })

  })

  describe(`Test.xtest`, () => {

    it(`Should NOT throw an error when a function to it not passed to the Test.xtest method`, () => {
      expect(() => {
        const PKTest = new Test()
        PKTest.describe(`describe method`, () => {
          PKTest.xtest(`test method`)
        })
      }).not.toThrow()
    })

    it(`Should not add an action to the Test.xtest method even when passed`, () => {
      const PKTest = new Test()
      PKTest.describe(`describe method`, () => {
        PKTest.xtest(`test method`, () => {
        })
      })
      const parent = PKTest.getActiveParent()
      const describeObj = parent.describes[0]
      const testObj = describeObj.tests[0]
      expect(testObj.action).toBe(undefined)
    })

    it(`Should throw an error when the xtest method is called outside of a describe method`, () => {
      expect(() => {
        const PKTest = new Test()
        PKTest.xtest(`test method`, () => {})
      }).toThrow()
    })

    it(`Should throw an error when a description is not passed to the Test.xtest method`, () => {
      expect(() => {
        const PKTest = new Test()
        PKTest.xtest()
      }).toThrow()
    })

  })

  describe(`Test.beforeAll`, () => {

    it(`Should register with the closest describe method`, () => {
      const PKTest = new Test()
      const beforeAll1 = jest.fn()
      const beforeAll2 = jest.fn()
      PKTest.describe(`describe-1 method`, () => {})
      PKTest.describe(`describe-2 method`, () => {
        PKTest.describe(`describe-2-1 method`, () => {})
        PKTest.beforeAll(beforeAll1)
        PKTest.describe(`describe-2-2 child method`, () => {
          PKTest.beforeAll(beforeAll2)
        })
      })
      PKTest.describe(`describe-3 method`, () => {})
      
      const parent = PKTest.getActiveParent()
      const describeObj = parent.describes[1]
      expect(describeObj.beforeAll[0]).toBe(beforeAll1)
      expect(describeObj.describes[1].beforeAll[0]).toBe(beforeAll2)
    })

    it(`Should throw when called outside a describe method`, () => {
      expect(() => {
        const PKTest = new Test()
        PKTest.beforeAll(() => {})
      }).toThrow()
    })

    it(`Should throw when not passed a function`, () => {
      expect(() => {
        const PKTest = new Test()
        PKTest.describe(`describe method`, () => {
          PKTest.beforeAll()
        })
      }).toThrow()
    })

  })

  describe(`Test.afterAll`, () => {

    it(`Should register with the closest describe method`, () => {
      const PKTest = new Test()
      const afterAll1 = jest.fn()
      const afterAll2 = jest.fn()
      PKTest.describe(`describe-1 method`, () => {})
      PKTest.describe(`describe-2 method`, () => {
        PKTest.describe(`describe-2-1 method`, () => {})
        PKTest.afterAll(afterAll1)
        PKTest.describe(`describe-2-2 child method`, () => {
          PKTest.afterAll(afterAll2)
        })
      })
      PKTest.describe(`describe-3 method`, () => {})
      
      const parent = PKTest.getActiveParent()
      const describeObj = parent.describes[1]
      expect(describeObj.afterAll[0]).toBe(afterAll1)
      expect(describeObj.describes[1].afterAll[0]).toBe(afterAll2)
    })

    it(`Should throw when called outside a describe method`, () => {
      expect(() => {
        const PKTest = new Test()
        PKTest.afterAll(() => {})
      }).toThrow()
    })

    it(`Should throw when not passed a function`, () => {
      expect(() => {
        const PKTest = new Test()
        PKTest.describe(`describe method`, () => {
          PKTest.afterAll()
        })
      }).toThrow()
    })

  })

  describe(`Test.beforeEach`, () => {

    it(`Should register with the closest describe method`, () => {
      const PKTest = new Test()
      const beforeEach1 = jest.fn()
      const beforeEach2 = jest.fn()
      PKTest.describe(`describe-1 method`, () => {})
      PKTest.describe(`describe-2 method`, () => {
        PKTest.describe(`describe-2-1 method`, () => {})
        PKTest.beforeEach(beforeEach1)
        PKTest.describe(`describe-2-2 child method`, () => {
          PKTest.beforeEach(beforeEach2)
        })
      })
      PKTest.describe(`describe-3 method`, () => {})
      
      const parent = PKTest.getActiveParent()
      const describeObj = parent.describes[1]
      expect(describeObj.beforeEach[0]).toBe(beforeEach1)
      expect(describeObj.describes[1].beforeEach[0]).toBe(beforeEach2)
    })

    it(`Should throw when called outside a describe method`, () => {
      expect(() => {
        const PKTest = new Test()
        PKTest.beforeEach(() => {})
      }).toThrow()
    })

    it(`Should throw when not passed a function`, () => {
      expect(() => {
        const PKTest = new Test()
        PKTest.describe(`describe method`, () => {
          PKTest.beforeEach()
        })
      }).toThrow()
    })

  })

  describe(`Test.afterEach`, () => {

    it(`Should register with the closest describe method`, () => {
      const PKTest = new Test()
      const afterEach1 = jest.fn()
      const afterEach2 = jest.fn()
      PKTest.describe(`describe-1 method`, () => {})
      PKTest.describe(`describe-2 method`, () => {
        PKTest.describe(`describe-2-1 method`, () => {})
        PKTest.afterEach(afterEach1)
        PKTest.describe(`describe-2-2 child method`, () => {
          PKTest.afterEach(afterEach2)
        })
      })
      PKTest.describe(`describe-3 method`, () => {})
      
      const parent = PKTest.getActiveParent()
      const describeObj = parent.describes[1]
      expect(describeObj.afterEach[0]).toBe(afterEach1)
      expect(describeObj.describes[1].afterEach[0]).toBe(afterEach2)
    })

    it(`Should throw when called outside a describe method`, () => {
      expect(() => {
        const PKTest = new Test()
        PKTest.afterEach(() => {})
      }).toThrow()
    })

    it(`Should throw when not passed a function`, () => {
      expect(() => {
        const PKTest = new Test()
        PKTest.describe(`describe method`, () => {
          PKTest.afterEach()
        })
      }).toThrow()
    })

  })

})