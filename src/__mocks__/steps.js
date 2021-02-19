export const registerMockSteps = (PK, withPromises) => {
  PK.Given(
    /I open the site (\S+)$/,
    jest.fn((url, world) => {})
  )

  PK.When(
    `I press {word}`,
    jest.fn((key, world) => {})
  )

  PK.When(
    `I wait for the page to load`,
    jest.fn(world => {})
  )

  PK.When(
    `I set {string} to the input {word}`,
    jest.fn((input, selector, world) => {})
  )

  PK.Then(
    `the element {word} contains the text {string}`,
    jest.fn((selector, text, world) => {})
  )

  if (!withPromises) return

  PK.Given(`I wait for {int}`, async (amount, world) => {
    const testPromise = new Promise((res, rej) => {
      setTimeout(() => {
        world.iWaited = true
        world.testMethod()
        res()
      }, amount)
    })
    return await testPromise
  })

  PK.Then(`the world test method should be called`, async world => {
    expect(world.iWaited).toBe(true)
    expect(world.testMethod).toHaveBeenCalled()
  })
}
