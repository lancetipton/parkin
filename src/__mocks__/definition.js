export const definition = `const { Given } = require("cucumber")
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

Given(/I am on (\S+)$/, async url => {
  const page = await getPage()
  await page.goto(url)
})

Then("The word of the day is {word}", async word => {
  expect(word).toBe("test")
})`

export const parsedDefinition = [
  {
    type: 'given',
    match: 'I am on (\S+)$',
    variant: 'regex',
    content: 'Given(/I am on (\S+)$/, async url => {\n' +
      '  const page = await getPage()\n' +
      '  await page.goto(url)\n' +
      '})'
  },
  {
    type: 'then',
    match: 'The word of the day is {word}',
    variant: 'expression',
    content: 'Then("The word of the day is {word}", async word => {\n' +
      '  expect(word).toBe("test")\n' +
      '})'
  }
]