export const registerAliasSteps = PK => {
  PK.Given('that a world.$alias object exists', (ctx) => {
    const { world } = ctx
    expect(typeof world).toBe('object')
  })

  PK.Given('that the world.$alias.url is {string}', (url, ctx) => {
    const { world } = ctx
    expect(url).toBe(world.$alias.url)
  })

  PK.And('the alias element {string} exists', (element, ctx) => {
    const { world } = ctx
    expect(element).toBe(world.$alias.element)
  })

  PK.When('we set the world.$alias.status to {string}', (status, ctx) => {
    const { world } = ctx
    world.$alias.status = status
  })

  PK.Then(
    '{string} should be replaced with an alias value',
    (replaced, ctx) => {
      const { world } = ctx
      expect(replaced).toBe(world.$alias.background)
    }
  )

  PK.And(
    'this path $$doesNotExist alias should not be replaced',
    (ctx, notWorld) => {
      expect(notWorld).toBe(undefined)
    }
  )

  PK.Then(
    'this features status should be a dynamic alias of {string}',
    (status, ctx) => {
      const { world } = ctx
      expect(status).toBe(world.$alias.status)
    }
  )

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
