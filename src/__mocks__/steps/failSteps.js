export const registerFailSteps = PK => {
  PK.Given(
    `that this step fails`,
    jest.fn(world => {
      throw new Error(`This Step Failed!`)
    })
  )

  PK.Then(
    `this step should be skipped`,
    jest.fn(world => {})
  )

  PK.And(
    `this step should also be skipped`,
    jest.fn(world => {})
  )
}
