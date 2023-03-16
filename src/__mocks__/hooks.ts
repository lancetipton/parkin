import { constants } from '../constants'

const { HOOK_TYPES } = constants

/**
 * Mocks out the jest global hooks, like `beforeAll`
 * @return {Function} a function to reset them
 */
export const mockHooks = () => {
  // jest functions to reset to when done mocking
  const orig = HOOK_TYPES.reduce(
    (state:any, type:string) => ({
      ...state,
      [type]: global[type],
    }),
    {}
  )

  // mock each type using jest.fn
  HOOK_TYPES.map((type:string) => {
    global[type] = jest.fn((hook:any) => hook(type))
  })

  // reset function
  return () => {
    HOOK_TYPES.map((type:string) => {
      global[type] = orig[type]
    })
  }
}
