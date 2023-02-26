global.jest = global.jest || {}

jest.fn = jest.fn || ((fn) => fn)

export const registerBasicSteps = PK => {
  PK.Given(
    /I open the site (\S+)$/,
    jest.fn((url, world) => {})
  )

  PK.When(
    `I press {word}`,
    jest.fn((key, world) => {})
  )

  PK.When(
    `I wait for the page to load`,
    jest.fn(world => {})
  )

  PK.When(
    `I set {word} to the input {word}`,
    jest.fn((input, selector, world) => {})
  )

  PK.Then(
    `the element {word} contains the text {string}`,
    jest.fn((selector, text, world) => {})
  )
}
