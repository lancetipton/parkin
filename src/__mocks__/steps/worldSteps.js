export const registerWorldSteps = PK => {
  PK.Given('that a world object exists', ({ world }) => {
    expect(typeof world).toBe('object')
  })

  PK.Given('that the app url is {string}', (url, ctx) => {
    const { world } = ctx
    expect(url).toBe(world.app.url)
  })

  PK.Given('that there are different replace types', () => {})

  PK.And('the element {string} exists', (element, ctx) => {
    const { world } = ctx
    expect(element).toBe(world.$alias.element)
  })

  PK.When('we set the worlds feature status to {string}', (status, ctx) => {
    const { world } = ctx
    world.feature.status = status
  })

  PK.Then('{string} should be replaced', (replaced, ctx) => {
    const { world } = ctx
    expect(replaced).toBe(world.feature.background.then)
  })

  PK.And(
    'this path $world.does.not.exist should not be replaced',
    (ctx, notWorld) => {
      expect(notWorld).toBe(undefined)
    },
  )

  PK.Then('this features status should be {string}', (status, ctx) => {
    const { world } = ctx
    expect(status).toBe(world.feature.status)
  })

  PK.Then(`world replace should work with an integer {int}`, (data, ctx) => {
    expect(typeof data).toBe('number')
  })
  PK.And('world replace should work with a float {float}', (data, ctx) => {
    expect(typeof data).toBe('number')
  })
  PK.And('world replace should work with a string {string}', (data, ctx) => {
    expect(typeof data).toBe('string')
  })
  PK.And('world replace should work with a word {word}', (data, ctx) => {
    expect(typeof data).toBe('string')
  })
}
