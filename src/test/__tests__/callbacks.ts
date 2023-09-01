import { ParkinTest } from '../test'
import {
  EResultType,
  EResultAction,
  EResultStatus,
} from '../../types'

describe(`ParkinTest.run`, () => {

  it(`should always call the spec start and done callbacks when passed`, async () => {
    const onSpecStart = jest.fn()
    const onSpecDone = jest.fn()
    const test1 = jest.fn()
    const test2 = jest.fn(() => {
      throw new Error(`Failed Test`)
    })
    const test3 = jest.fn()

    const PTE = new ParkinTest({
      onSpecDone,
      onSpecStart,
    })

    PTE.describe(`describe-1`, () => {
      PTE.test(`test-1`, test1)
      PTE.test(`test-2`, test2)
      
      PTE.describe(`describe-1-1`, () => {
        PTE.test(`test-1-1-1`, test3)
      })
    })

    await PTE.run()
    expect(test1).toHaveBeenCalledTimes(1)
    expect(test2).toHaveBeenCalledTimes(1)
    expect(test3).toHaveBeenCalledTimes(1)
    expect(onSpecStart).toHaveBeenCalledTimes(3)
    expect(onSpecDone).toHaveBeenCalledTimes(3)
    
    onSpecStart.mock.calls.forEach((call:any) => {
      const result = call[0]
      expect(result.type).toBe(EResultType.test)
      expect(result.action).toBe(EResultAction.start)
      expect(result.failed).toBe(false)
      expect(result.passed).toBe(false)
    })

    onSpecDone.mock.calls.forEach((call:any, idx:number) => {
      const result = call[0]
      expect(result.type).toBe(EResultType.test)
      expect(result.action).toBe(EResultAction.end)

      if(idx === 1){
        expect(result.failed).toBe(true)
        expect(result.passed).toBe(false)
        expect(result.status).toBe(EResultStatus.failed)
      }
      else {
        expect(result.passed).toBe(true)
        expect(result.failed).toBe(false)
        expect(result.status).toBe(EResultStatus.passed)
      }
    })

  })

  it(`should always call the suit start and done callbacks when passed`, async () => {
    const onSuiteStart = jest.fn()
    const onSuiteDone = jest.fn()
    const test1 = jest.fn()
    const test2 = jest.fn(() => {
      throw new Error(`Failed Test`)
    })
    const test3 = jest.fn()

    const PTE = new ParkinTest({
      onSuiteDone,
      onSuiteStart,
    })

    PTE.describe(`describe-1`, () => {
      PTE.test(`test-1`, test1)
      PTE.test(`test-2`, test2)
      
      PTE.describe(`describe-1-1`, () => {
        PTE.test(`test-1-1-1`, test3)
      })
    })

    await PTE.run()

    expect(test1).toHaveBeenCalledTimes(1)
    expect(test2).toHaveBeenCalledTimes(1)
    expect(test3).toHaveBeenCalledTimes(1)
    expect(onSuiteStart).toHaveBeenCalledTimes(2)
    expect(onSuiteDone).toHaveBeenCalledTimes(2)

    onSuiteStart.mock.calls.forEach((call:any) => {
      const result = call[0]
      expect(result.type).toBe(EResultType.describe)
      expect(result.action).toBe(EResultAction.start)
      expect(result.failed).toBe(false)
      expect(result.passed).toBe(false)
    })

    onSuiteDone.mock.calls.forEach((call:any, idx:number) => {
      const result = call[0]
      expect(result.type).toBe(EResultType.describe)
      expect(result.action).toBe(EResultAction.end)

      if(idx === 1){
        expect(result.failed).toBe(true)
        expect(result.passed).toBe(false)
        expect(result.status).toBe(EResultStatus.failed)
      }
      else {
        expect(result.passed).toBe(true)
        expect(result.failed).toBe(false)
        expect(result.status).toBe(EResultStatus.passed)
      }
    })

  })

  it(`should always call the run start and done callbacks when passed`, async () => {
    const onRunStart = jest.fn()
    const onRunDone = jest.fn()
    const test1 = jest.fn()
    const test2 = jest.fn(() => {
      throw new Error(`Failed Test`)
    })
    const test3 = jest.fn()

    const PTE = new ParkinTest({
      onRunStart,
      onRunDone,
    })

    PTE.describe(`describe-1`, () => {
      PTE.test(`test-1`, test1)
      PTE.test(`test-2`, test2)
      
      PTE.describe(`describe-1-1`, () => {
        PTE.test(`test-1-1-1`, test3)
      })
    })

    await PTE.run()

    expect(test1).toHaveBeenCalledTimes(1)
    expect(test2).toHaveBeenCalledTimes(1)
    expect(test3).toHaveBeenCalledTimes(1)
    expect(onRunStart).toHaveBeenCalledTimes(1)
    expect(onRunDone).toHaveBeenCalledTimes(1)

    onRunStart.mock.calls.forEach((call:any) => {
      const result = call[0]
      expect(result.type).toBe(EResultType.root)
      expect(result.action).toBe(EResultAction.start)
      expect(result.failed).toBe(false)
      expect(result.passed).toBe(false)
    })

    onRunDone.mock.calls.forEach((call:any, idx:number) => {
      const result = call[0]
      expect(result.type).toBe(EResultType.root)
      expect(result.action).toBe(EResultAction.end)
      expect(result.failed).toBe(true)
      expect(result.passed).toBe(false)
      expect(result.status).toBe(EResultStatus.failed)
    })

  })

  it(`should always call all callbacks when not errors are thrown`, async () => {
    const onSpecStart = jest.fn()
    const onSpecDone = jest.fn()
    const onSuiteStart = jest.fn()
    const onSuiteDone = jest.fn()
    const onRunStart = jest.fn()
    const onRunDone = jest.fn()
    const test1 = jest.fn()
    const test2 = jest.fn()
    const test3 = jest.fn()

    const PTE = new ParkinTest({
      onSpecStart,
      onSpecDone,
      onSuiteStart,
      onSuiteDone,
      onRunStart,
      onRunDone,
    })

    PTE.describe(`describe-1`, () => {
      PTE.test(`test-1`, test1)
      PTE.test(`test-2`, test2)

      PTE.describe(`describe-1-1`, () => {
        PTE.test(`test-1-1-1`, test3)
      })
    })

    await PTE.run()

    expect(test1).toHaveBeenCalledTimes(1)
    expect(test2).toHaveBeenCalledTimes(1)
    expect(test3).toHaveBeenCalledTimes(1)
    expect(onSuiteStart).toHaveBeenCalledTimes(2)
    expect(onSuiteDone).toHaveBeenCalledTimes(2)
    expect(onRunStart).toHaveBeenCalledTimes(1)
    expect(onRunDone).toHaveBeenCalledTimes(1)
    expect(onSpecStart).toHaveBeenCalledTimes(3)
    expect(onSpecDone).toHaveBeenCalledTimes(3)

  })

  it(`should still call the suite and root callbacks if a spec callback throws`, async () => {
    const onSpecDone = () => {
      throw new Error(`On Spec Done Error`)
    }
    const onSuiteStart = jest.fn()
    const onSuiteDone = jest.fn()
    const onRunDone = jest.fn()
    const test1 = jest.fn()
    const test2 = jest.fn(() => {
      throw new Error(`Failed Test`)
    })
    const test3 = jest.fn()

    const PTE = new ParkinTest({
      onSpecDone,
      onSuiteDone,
      onSuiteStart,
      onRunDone,
    })

    PTE.describe(`describe-1`, () => {
      PTE.test(`test-1`, test1)
      
      PTE.test(`test-2`, test2)
      
      PTE.describe(`describe-1-1`, () => {
        PTE.test(`test-1-1-1`, test3)
      })
    })

    await PTE.run()

    expect(test1).toHaveBeenCalledTimes(1)
    expect(test2).not.toHaveBeenCalledTimes(1)
    expect(test3).not.toHaveBeenCalledTimes(1)
    expect(onSuiteDone).toHaveBeenCalledTimes(1)
    expect(onRunDone).toHaveBeenCalledTimes(1)

    onSuiteDone.mock.calls.forEach((call:any, idx:number) => {
      const result = call[0]
      expect(result.type).toBe(EResultType.describe)
      expect(result.action).toBe(EResultAction.end)
      expect(result.failed).toBe(true)
      expect(result.passed).toBe(false)
      expect(result.status).toBe(EResultStatus.failed)
    })

    onRunDone.mock.calls.forEach((call:any, idx:number) => {
      const result = call[0]
      expect(result.type).toBe(EResultType.root)
      expect(result.action).toBe(EResultAction.end)
      expect(result.failed).toBe(true)
      expect(result.passed).toBe(false)
      expect(result.status).toBe(EResultStatus.failed)
    })

  })

  it(`should still call the suite and root callbacks if a before hook callback throws`, async () => {

    const onSuiteDone = jest.fn()
    const onRunDone = jest.fn()
    const test1 = jest.fn()
    const test2 = jest.fn()
    const beforeEach = jest.fn(() => {
      throw new Error(`Failed beforeEach method`)
    })

    const PTE = new ParkinTest({
      onSuiteDone,
      onRunDone,
    })

    PTE.describe(`describe-1`, () => {
      PTE.test(`test-1`, test1)

      PTE.describe(`describe-1-1`, () => {
        
        PTE.beforeEach(beforeEach)
        
        PTE.test(`test-1-1-1`, test2)
      })
    })

    await PTE.run()

    expect(test1).toHaveBeenCalledTimes(1)
    expect(test2).not.toHaveBeenCalled()
    expect(beforeEach).toHaveBeenCalledTimes(1)
    expect(onSuiteDone).toHaveBeenCalledTimes(2)
    expect(onRunDone).toHaveBeenCalledTimes(1)

    onSuiteDone.mock.calls.forEach((call:any, idx:number) => {
      const result = call[0]
      expect(result.type).toBe(EResultType.describe)
      expect(result.action).toBe(EResultAction.end)
      expect(result.failed).toBe(true)
      expect(result.passed).toBe(false)
      expect(result.status).toBe(EResultStatus.failed)
    })

    onRunDone.mock.calls.forEach((call:any, idx:number) => {
      const result = call[0]
      expect(result.type).toBe(EResultType.root)
      expect(result.action).toBe(EResultAction.end)
      expect(result.failed).toBe(true)
      expect(result.passed).toBe(false)
      expect(result.status).toBe(EResultStatus.failed)
    })

  })

  it(`should still call the suite and root callbacks if a after hook callback throws`, async () => {

    const onSuiteDone = jest.fn()
    const onRunDone = jest.fn()
    const test1 = jest.fn()
    const test2 = jest.fn()
    const test3 = jest.fn()
    const afterEach = jest.fn(() => {
      throw new Error(`Failed afterEach method`)
    })

    const PTE = new ParkinTest({
      onSuiteDone,
      onRunDone,
    })

    PTE.describe(`describe-1`, () => {
      PTE.test(`test-1`, test1)

      PTE.describe(`describe-1-1`, () => {
        
        PTE.afterEach(afterEach)
        
        PTE.test(`test-1-1-1`, test2)
        PTE.test(`test-1-1-2`, test3)
      })
    })

    await PTE.run()

    expect(test1).toHaveBeenCalledTimes(1)
    expect(test2).toHaveBeenCalledTimes(1)
    expect(test3).not.toHaveBeenCalled()
    expect(afterEach).toHaveBeenCalledTimes(1)
    expect(onSuiteDone).toHaveBeenCalledTimes(2)
    expect(onRunDone).toHaveBeenCalledTimes(1)

    onSuiteDone.mock.calls.forEach((call:any, idx:number) => {
      const result = call[0]
      expect(result.type).toBe(EResultType.describe)
      expect(result.action).toBe(EResultAction.end)
      expect(result.failed).toBe(true)
      expect(result.passed).toBe(false)
      expect(result.status).toBe(EResultStatus.failed)
    })

    onRunDone.mock.calls.forEach((call:any, idx:number) => {
      const result = call[0]
      expect(result.type).toBe(EResultType.root)
      expect(result.action).toBe(EResultAction.end)
      expect(result.failed).toBe(true)
      expect(result.passed).toBe(false)
      expect(result.status).toBe(EResultStatus.failed)
    })

  })

  it(`should wait for the callback to resolve before proceeding with the tests`, async () => {

    const callorder = []
    const call1 = () => callorder.push(`call1`)
    const call2 = () => callorder.push(`call2`)
    const call3 = () => callorder.push(`call3`)
    const test1 = () => callorder.push(`test1`)
    const test2 = () => callorder.push(`test2`)
    const test3 = () => callorder.push(`test3`)

    const onSuiteStart = () => callorder.push(`onSuiteStart`)
    const onSuiteDone = () => {
      return new Promise((res, rej) => {
        setTimeout(() => {
          callorder.push(`onSuiteDone`)
          res(true)
        }, 1000)
      })
    }
    const onRunDone = () => callorder.push(`onRunDone`)

    const onSpecDone = async (evt:any) => {
      return new Promise((res, rej) => {
        setTimeout(() => {
          if(evt.id === `spec-0`) call1()
          else if(evt.id === `spec-1`) call2()
          else call3()

          res(true)
        }, 50)
      })
    }
  


    const PTE = new ParkinTest({
      onRunDone,
      onSpecDone,
      onSuiteDone,
      onSuiteStart,
    })

    PTE.describe(`describe-1`, () => {
      PTE.test(`test-1`, test1)
      PTE.test(`test-1-1-1`, test2)
      PTE.test(`test-1-1-2`, test3)
    })

    await PTE.run()
    expect(callorder).toEqual([
      `onSuiteStart`,
      `test1`,
      `call1`,
      `test2`,
      `call2`,
      `test3`,
      `call3`,
      `onSuiteDone`,
      `onRunDone`
    ])


  })


  it(`should wait for the callback to resolve before proceeding with the tests`, async () => {

    let called1 = false
    let called2 = false
    let called3 = false
    const onRunDone = () => {
      expect(called1).toBe(true)
      expect(called2).toBe(true)
      expect(called3).toBe(true)
    }
    const onSpecDone = async () => {
      return new Promise((res, rej) => {
        setTimeout(() => {
          if(!called1)
            called1 = true
          else if(!called2)
            called2 = true
          else called3 = true

          return res(true)
        }, 500)
      })
    }
  
    const test1 = () => {
      expect(called1).toBe(false)
      expect(called2).toBe(false)
      expect(called3).toBe(false)
    }
    const test2 = () => {
      expect(called1).toBe(true)
      expect(called2).toBe(false)
      expect(called3).toBe(false)
    }
    const test3 = () => {
      expect(called1).toBe(true)
      expect(called2).toBe(true)
      expect(called3).toBe(false)
    }
    

    const PTE = new ParkinTest({
      onSpecDone,
      onRunDone
    })

    PTE.describe(`describe-1`, () => {
      PTE.test(`test-1`, test1)
      PTE.test(`test-1-1-1`, test2)
      PTE.test(`test-1-1-2`, test3)
    })

    const resp = await PTE.run()
    expect(called1).toBe(true)
    expect(called2).toBe(true)
    expect(called3).toBe(true)
    
    expect(resp[0].passed).toBe(true)


  })


  it(`should fail the parkin test because the called values are incorrect`, async () => {

    let called1 = false
    let called2 = false
    let called3 = false
    const onRunDone = () => {
      expect(called1).toBe(true)
      expect(called2).toBe(true)
      expect(called3).toBe(true)
    }
    const onSpecDone = async () => {
      return new Promise((res, rej) => {
        setTimeout(() => {
          if(!called1)
            called1 = true
          else if(!called2)
            called2 = true
          else called3 = true

          return res(true)
        }, 500)
      })
    }
  
    const test1 = () => {
      expect(called1).toBe(false)
      expect(called2).toBe(false)
      expect(called3).toBe(false)
    }
    const test2 = () => {
      expect(called1).toBe(true)
      expect(called2).toBe(true)
      expect(called3).toBe(false)
    }
    const test3 = () => {
      expect(called1).toBe(true)
      expect(called2).toBe(true)
      expect(called3).toBe(true)
    }
    

    const PTE = new ParkinTest({
      onSpecDone,
      onRunDone
    })

    PTE.describe(`describe-1`, () => {
      PTE.test(`test-1`, test1)
      PTE.test(`test-1-1-1`, test2)
      PTE.test(`test-1-1-2`, test3)
    })

    const resp = await PTE.run()
    expect(called1).toBe(true)
    expect(called2).toBe(true)
    expect(called3).toBe(true)
    
    expect(resp[0].passed).toBe(false)


  })


})
