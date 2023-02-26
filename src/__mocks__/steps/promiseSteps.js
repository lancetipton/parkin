export const registerPromiseSteps = PK => {
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
    expect(world.calledTestMethod).toBe(1)
  })
}
