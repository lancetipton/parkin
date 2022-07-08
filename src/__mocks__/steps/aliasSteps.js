export const registerAliasSteps = PK => {
  PK.Given('that a world.$alias object exists', world => {
    expect(typeof world).toBe('object')
  })

  PK.Given('that the world.$alias.url is {string}', (url, world) => {
    expect(url).toBe(world.$alias.url)
  })

  PK.And('the alias element {string} exists', (element, world) => {
    expect(element).toBe(world.$alias.element)
  })

  PK.When('we set the world.$alias.status to {string}', (status, world) => {
    world.$alias.status = status
  })

  PK.Then(
    '{string} should be replaced with an alias value',
    (replaced, world) => {
      expect(replaced).toBe(world.$alias.background)
    }
  )

  PK.And(
    'this path $$doesNotExist alias should not be replaced',
    (world, notWorld) => {
      expect(notWorld).toBe(undefined)
    }
  )

  PK.Then(
    'this features status should be a dynamic alias of {string}',
    (status, world) => {
      expect(status).toBe(world.$alias.status)
    }
  )

  PK.Then(`world replace should work with an integer {int}`, (data, world) => {
    expect(typeof data).toBe('number')
  })
  PK.And('world replace should work with a float {float}', (data, world) => {
    expect(typeof data).toBe('number')
  })
  PK.And('world replace should work with a string {string}', (data, world) => {
    expect(typeof data).toBe('string')
  })
  PK.And('world replace should work with a word {word}', (data, world) => {
    expect(typeof data).toBe('string')
  })
}
