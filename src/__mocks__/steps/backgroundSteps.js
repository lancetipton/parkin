const setCallOrder = (world, name) => {
  world.callOrder = world.callOrder || []
  world.callOrder.push(name)
  // Uncomment to print the array to the terminal and visually validate call order
  // console.log(world.callOrder)
}

const BACKGROUND_GIVEN = 'background step - Given'
const BACKGROUND_THEN = 'background step - Then'
const SCENARIO_GIVEN = 'scenario step - Given'
const SCENARIO_THEN = 'scenario step - Then'
const SCENARIO2_GIVEN = 'scenario 2 step - Given'
const SCENARIO2_THEN = 'scenario 2 step - Then'

export const registerBackgroundSteps = PK => {
  PK.Given(`that background exists`, ({ world }) => {
    expect(world.callOrder === undefined || world.callOrder.length === 4).toBe(
      true,
    )
    setCallOrder(world, BACKGROUND_GIVEN)
  })

  PK.Then(
    `the background steps should be called before each scenario`,
    ({ world }) => {
      expect(world.callOrder.length === 1 || world.callOrder.length === 5).toBe(
        true,
      )
      expect(world.callOrder[0]).toBe(BACKGROUND_GIVEN)
      setCallOrder(world, BACKGROUND_THEN)
    },
  )

  PK.Given(`that this Feature has a background`, ({ world }) => {
    expect(world.callOrder.length).toBe(2)
    expect(world.callOrder[0]).toBe(BACKGROUND_GIVEN)
    expect(world.callOrder[1]).toBe(BACKGROUND_THEN)
    setCallOrder(world, SCENARIO_GIVEN)
  })

  PK.Then(
    `this scenario's steps should be run after the background's steps`,
    ({ world }) => {
      expect(world.callOrder.length).toBe(3)
      expect(world.callOrder[0]).toBe(BACKGROUND_GIVEN)
      expect(world.callOrder[1]).toBe(BACKGROUND_THEN)
      expect(world.callOrder[2]).toBe(SCENARIO_GIVEN)
      setCallOrder(world, SCENARIO_THEN)
    },
  )

  PK.Given(`that a second scenario exists`, ({ world }) => {
    expect(world.callOrder.length).toBe(6)
    expect(world.callOrder[0]).toBe(BACKGROUND_GIVEN)
    expect(world.callOrder[1]).toBe(BACKGROUND_THEN)
    expect(world.callOrder[2]).toBe(SCENARIO_GIVEN)
    expect(world.callOrder[3]).toBe(SCENARIO_THEN)
    expect(world.callOrder[4]).toBe(BACKGROUND_GIVEN)
    expect(world.callOrder[5]).toBe(BACKGROUND_THEN)
    setCallOrder(world, SCENARIO2_GIVEN)
  })

  PK.Then(
    `the second scenario's steps should be run after a second background's steps`,
    ({ world }) => {
      expect(world.callOrder.length).toBe(7)
      expect(world.callOrder[0]).toBe(BACKGROUND_GIVEN)
      expect(world.callOrder[1]).toBe(BACKGROUND_THEN)
      expect(world.callOrder[2]).toBe(SCENARIO_GIVEN)
      expect(world.callOrder[3]).toBe(SCENARIO_THEN)
      expect(world.callOrder[4]).toBe(BACKGROUND_GIVEN)
      expect(world.callOrder[5]).toBe(BACKGROUND_THEN)
      expect(world.callOrder[6]).toBe(SCENARIO2_GIVEN)
    },
  )
}
