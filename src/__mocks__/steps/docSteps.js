export const registerDocSteps = PK => {
  PK.Given(
    'I have the following doc-string data in {word}',
    jest.fn((docString, { world }) => {
      world.docString = docString
    })
  )

  PK.Then(
    'the doc-string data should be {string}',
    jest.fn((docString, { world }) => {
      expect(world.docString).toBe(docString)
    })
  )
}
