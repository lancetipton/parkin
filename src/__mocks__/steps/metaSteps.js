export const registerMetaSteps = PK => {
  PK.Given(
    `I have {int} types`,
    (typeAmt, ctx) => {
      expect(typeAmt).not.toBe(undefined)
      expect(ctx).not.toBe(undefined)
    },
    {
      test: {
        retry: 2,
      },
    },
  )

  PK.Then(
    `there is a snake in my boots`,
    ctx => {
      expect(ctx).not.toBe(undefined)
    },
    {
      test: {
        timeout: 60000,
      },
    },
  )
}
