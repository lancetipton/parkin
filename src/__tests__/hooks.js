jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { Hooks } = require('../hooks')
const { constants } = require('../constants')
const { HOOK_TYPES } = constants

describe('Hooks', () => {
  it('should register hooks', async () => {
    const hooks = new Hooks()
    const hookFunc = () => {}
    hooks.types.map(type => {
      hooks[type](!type.includes(`after`) ? hookFunc : null)
    })

    HOOK_TYPES.map(type =>
      !type.includes(`after`)
        ? expect(hooks._registeredHooks[type]).toBe(hookFunc)
        : expect(hooks._registeredHooks[type]).toBe(undefined)
    )
  })
})
