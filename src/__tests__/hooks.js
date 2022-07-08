jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { Hooks } = require('../hooks')
const { constants } = require('../constants')
const { HOOK_TYPES } = constants

describe('Hooks', () => {
  describe('registered hoook', () => {
    it('should register a hook', async () => {
      const hooks = new Hooks()
      const hookFunc = () => {}
      hooks.types.map(type => {
        hooks[type](!type.includes(`after`) ? hookFunc : null)
      })

      HOOK_TYPES.map(type =>
        !type.includes(`after`)
          ? expect(hooks._registeredHooks[type].includes(hookFunc)).toBe(true)
          : expect(hooks._registeredHooks[type]).toBe(undefined)
      )
    })

    it('should allow registering multiple hooks', async () => {
      const hooks = new Hooks()
      const hookFunc1 = () => {}
      const hookFunc2 = () => {}
      hooks.beforeAll(hookFunc1)
      hooks.beforeAll(hookFunc2)
      expect(hooks._registeredHooks.beforeAll.includes(hookFunc1)).toBe(true)
      expect(hooks._registeredHooks.beforeAll.includes(hookFunc2)).toBe(true)
    })
  })

  describe('getRegistered', () => {
    it('should return a single method when only one hooks is registered', async () => {
      const hooks = new Hooks()
      const hookFunc1 = () => {}
      hooks.beforeAll(hookFunc1)

      const registered = hooks.getRegistered(`beforeAll`)
      expect(typeof registered).toBe('function')
    })

    it('should return a single method when multiple hooks are registered', async () => {
      const hooks = new Hooks()
      const hookFunc1 = () => {}
      const hookFunc2 = () => {}
      hooks.beforeAll(hookFunc1)
      hooks.beforeAll(hookFunc2)

      const registered = hooks.getRegistered(`beforeAll`)
      expect(typeof registered).toBe('function')
    })

    it('should all registered hooks when multiple are registered', async () => {
      const hooks = new Hooks()
      const hookFunc1 = jest.fn()
      const hookFunc2 = jest.fn()
      hooks.beforeAll(hookFunc1)
      hooks.beforeAll(hookFunc2)

      const registered = hooks.getRegistered(`beforeAll`)
      await registered()
      expect(hookFunc1).toHaveBeenCalled()
      expect(hookFunc2).toHaveBeenCalled()
    })

    it('should call registered hooks in the order they were registered', async () => {
      const hooks = new Hooks()
      let calls = []
      const hookFunc1 = jest.fn(() => {
        calls.push(`hook1`)
      })
      const hookFunc2 = jest.fn(() => {
        calls.push(`hook2`)
      })
      hooks.beforeAll(hookFunc1)
      hooks.beforeAll(hookFunc2)

      const registered = hooks.getRegistered(`beforeAll`)
      await registered()
      expect(calls[0]).toBe(`hook1`)
      expect(calls[1]).toBe(`hook2`)

      calls = []
      const hooksAgain = new Hooks()
      hooksAgain.beforeAll(hookFunc2)
      hooksAgain.beforeAll(hookFunc1)
      const registeredAgain = hooksAgain.getRegistered(`beforeAll`)
      await registeredAgain()
      expect(calls[0]).toBe(`hook2`)
      expect(calls[1]).toBe(`hook1`)
    })
  })
})
