export const registerMockSteps = PK => {
  PK.Given(
    /I open the site (\S+)$/,
    jest.fn((url, world) => {
      // console.log(`---------- url ----------`)
      // console.log(url)
    })
  )

  PK.When(
    `I press {key}`,
    jest.fn((key, world) => {
      // console.log(`---------- key ----------`)
      // console.log(key)
    })
  )

  PK.When(
    `I wait for the page to load`,
    jest.fn(world => {
      // console.log(`---------- page to load ----------`)
    })
  )

  PK.When(
    `I set {input} to the input {selector}`,
    jest.fn((input, selector, world) => {
      // console.log(`---------- input ----------`)
      // console.log(input)
      // console.log(`---------- selector ----------`)
      // console.log(selector)
    })
  )

  PK.Then(
    `the element {selector} contains the text {text}`,
    jest.fn((selector, text, world) => {
      // console.log(`---------- selector ----------`)
      // console.log(selector)
      // console.log(`---------- text ----------`)
      // console.log(text)
    })
  )
}
