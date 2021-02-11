
export const registerMockSteps = PH => {

  PH.Given(/I open the site (\S+)$/, jest.fn((url, world) => {
    // console.log(`---------- url ----------`)
    // console.log(url)
  }))

  PH.When(`I press {key}`, jest.fn((key, world) => {
    // console.log(`---------- key ----------`)
    // console.log(key)
  }))

  PH.When(`I wait for the page to load`, jest.fn((world) => {
    // console.log(`---------- page to load ----------`)
  }))

  PH.When(`I set {input} to the input {selector}`, jest.fn((input, selector, world) => {
    // console.log(`---------- input ----------`)
    // console.log(input)
    // console.log(`---------- selector ----------`)
    // console.log(selector)
  }))

  PH.Then(`the element {selector} contains the text {text}`, jest.fn((selector, text, world) => {
    // console.log(`---------- selector ----------`)
    // console.log(selector)
    // console.log(`---------- text ----------`)
    // console.log(text)
  }))

}