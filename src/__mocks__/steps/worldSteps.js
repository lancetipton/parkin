

export const registerWorldSteps = (PK) => {
  PK.Given(
    'that a world object exists',
    (world) => {
      expect(typeof world).toBe('object')
    }
  )

  PK.Given(
    'that the app url is {string}',
    (url, world) => {
      expect(url).toBe(world.app.url)
    }
  )

  PK.Given(
    'that there are different replace types',
    () => {}
  )

  PK.And(
    'the element {string} exists',
    (element, world) => {
      expect(element).toBe(world.alias.element)
    }
  )

  PK.When(
    'we set the worlds feature status to {string}',
    (status, world) => {
      world.feature.status = status
    }
  )

  PK.Then(
    '{string} should be replaced',
    (replaced, world) => {
      expect(replaced).toBe(world.feature.background.then)
    }
  )

  PK.And(
    'this path $world.does.not.exist should not be replaced',
    (world, notWorld) => {
      expect(notWorld).toBe(undefined)
    }
  )

  PK.Then(
    'this features status should be {string}',
    (status, world) => {
      expect(status).toBe(world.feature.status)
    }
  )

  PK.Then(
    `world replace should work with an integer {int}`,
    (data, world) => {
      expect(typeof data).toBe('number')
    }
  )
  PK.And(
    'world replace should work with a float {float}',
    (data, world) => {
      expect(typeof data).toBe('number')
    }
  )
  PK.And(
    'world replace should work with a string {string}',
    (data, world) => {
      expect(typeof data).toBe('string')
    }
  )
  PK.And(
    'world replace should work with a word {word}',
    (data, world) => {
      expect(typeof data).toBe('string')
    }
  )
}