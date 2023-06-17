global.jest = global.jest || {}

jest.fn = jest.fn || (fn => fn)

export const registerBasicSteps = PK => {
  PK.Given(
    /I open the site (\S+)$/,
    jest.fn((url, ctx) => {})
  )

  PK.When(
    `I press {word}`,
    jest.fn((key, ctx) => {})
  )

  PK.When(
    `I wait for the page to load`,
    jest.fn(ctx => {})
  )

  PK.When(
    `I set {word} to the input {word}`,
    jest.fn((input, selector, ctx) => {})
  )

  PK.Then(
    `the element {word} contains the text {string}`,
    jest.fn((selector, text, ctx) => {})
  )
}
