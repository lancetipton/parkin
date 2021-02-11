



export const registerMockSteps = PH => {

  PH.Given(/I open the site (\S+)$/, jest.fn((world, url) => {
    console.log(`---------- url ----------`)
    console.log(url)
  }))

  PH.When(`I press {key}`, jest.fn((world, key) => {
    console.log(`---------- key ----------`)
    console.log(key)
  }))

  PH.When(`I wait for the page to load`, jest.fn((world) => {
    console.log(`---------- page to load ----------`)
  }))

  PH.When(`I set {input} to the input {selector}`, jest.fn((world, input, selector) => {
    console.log(`---------- input ----------`)
    console.log(input)
    console.log(`---------- selector ----------`)
    console.log(selector)
  }))

  PH.Then(`the element {selector} contains the text {text}`, jest.fn((world, selector, text) => {
    console.log(`---------- selector ----------`)
    console.log(selector)
    console.log(`---------- text ----------`)
    console.log(text)
  }))

}