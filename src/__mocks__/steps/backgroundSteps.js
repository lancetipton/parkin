const setCallOrder = (world, name) => {
  world.callOrder = world.callOrder || []
  world.callOrder.push(name)
  // Uncomment to print the array to the terminal and visually validate call order
  // console.log(world.callOrder)
}

const BACKGROUND_GIVEN = 'background step - Given'
const BACKGROUND_THEN = 'background step - Then'
const SCENARIO_GIVEN = 'scenario step - Given'

export const registerBackgroundSteps = PK => {
  PK.Given(
    `that background exists`,
    world => {
      expect(world.callOrder).toBe(undefined)
      setCallOrder(world, BACKGROUND_GIVEN)
    }
  )

  PK.Then(
    `the background steps should be called before each scenario`,
    world => {
      expect(world.callOrder.length).toBe(1)
      expect(world.callOrder[0]).toBe(BACKGROUND_GIVEN)
      setCallOrder(world, BACKGROUND_THEN)
    }
  )

  PK.Given(
    `that this Feature has a background`,
    world => {
      expect(world.callOrder.length).toBe(2)
      expect(world.callOrder[0]).toBe(BACKGROUND_GIVEN)
      expect(world.callOrder[1]).toBe(BACKGROUND_THEN)
      setCallOrder(world, SCENARIO_GIVEN)
    }
  )

  PK.Then(
    `this scenario's steps should be run after the background's steps`,
    world => {
      expect(world.callOrder.length).toBe(3)
      expect(world.callOrder[0]).toBe(BACKGROUND_GIVEN)
      expect(world.callOrder[1]).toBe(BACKGROUND_THEN)
      expect(world.callOrder[2]).toBe(SCENARIO_GIVEN)
    }
  )
}
