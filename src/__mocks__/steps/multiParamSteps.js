export const registerMultiParamSteps = PK => {
  PK.Given(
    `I have {int} types of {word} out of a total of {int}`,
    (typeAmt, type, totalAmt, ctx) => {
      expect(typeAmt).not.toBe(undefined)
      expect(type).not.toBe(undefined)
      expect(totalAmt).not.toBe(undefined)
      expect(ctx).not.toBe(undefined)
    },
  )

  PK.Then(
    `there are {int} {string} in the {word} {string}`,
    (num1, word1, word2, word3, ctx) => {
      expect(num1).not.toBe(undefined)
      expect(word1).not.toBe(undefined)
      expect(word2).not.toBe(undefined)
      expect(word3).not.toBe(undefined)
      expect(ctx).not.toBe(undefined)
    },
  )
}
