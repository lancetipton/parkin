jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { hasTag } = require('../hasTag')

describe(`hasTag`, () => {

  it(`should return false when no tags match`, () => {
    expect(hasTag(`@tag1 @tag2`, `@tag3 @tag4`)).toBe(false)
  })


  it(`should return true when tags do match`, () => {
    expect(hasTag(`@tag1 @tag2`, `@tag1 @tag4`)).toBe(true)
  })


  it(`should work with both string arrays and strings`, () => {
    expect(hasTag(`@tag1 @tag2`, [`@tag1`])).toBe(true)
    expect(hasTag([`@tag1`], `@tag1 @tag2`)).toBe(true)
    expect(hasTag(`@tag1 @tag2`, [`@tag3`])).toBe(false)
    expect(hasTag([`@tag3`], `@tag1 @tag2`)).toBe(false)
  })


})
