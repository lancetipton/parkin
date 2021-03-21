import { isFloat, isInt, isStr } from '@keg-hub/jsutils'

export const definition = `
Given(/I am on (\S+)$/, async url => {
  const internalMethod = data => { return data }
  const data = internalMethod ({
    test: "test-method"
  })

  const page = await getPage()
  await page.goto(url)
})

const customMethod = async () => {
  console.log('custom method')
  await page.goto({ url })
}

Then("The word of the day is {word}", async word => {
  customMethod({})
  expect(word).toBe("test")
  expect({}).toEqual({})
})
`

export const parsedDefinition = [
  {
    type: 'given',
    // TODO: validate this works
    // match: 'I am on (S+)$',
    match: /I am on (S+)$/,
    variant: 'regex',
    content: 'Given(/I am on (S+)$/, async url => {\n' +
      '  const internalMethod = data => { return data }\n' +
      '  const data = internalMethod ({\n' +
      '    test: "test-method"\n' +
      '  })\n' +
      '\n' +
      '  const page = await getPage()\n' +
      '  await page.goto(url)\n' +
      '})'
  },
  {
    type: 'then',
    match: 'The word of the day is {word}',
    variant: 'expression',
    content: 'Then("The word of the day is {word}", async word => {\n' +
      '  customMethod({})\n' +
      '  expect(word).toBe("test")\n' +
      '  expect({}).toEqual({})\n' +
      '})'
  }
]

export const expressionDefs = [
  {
    step: {
      type: 'then',
      match: 'I have {int} item(s) ready to go',
      variant: 'expression',
      content: 'Then("I have {int} item(s) ready to go", ()=>{})',
    },
    tests: {
      pass: [ `I have 1 item ready to go`, `I have 2 items ready to go` ],
      fail: [ `I have 1 item`, `I have 1 items ready`, `I have 1 ready to go` ],
    },
  },
  {
    step: {
      type: 'then',
      match:
        'The number {int} is optional/required for {word} as {word} by law',
      variant: 'expression',
      content:
        'Then("The number {int} is optional/required for {word} as {word} by law", ()=>{})',
    },
    tests: {
      pass: [
        `The number 5 is optional for entry as optional by law`,
        `The number 6 is required for entry as required by law`,
      ],
      fail: [
        `The number 5 is needed for entry as optional`,
        `The number 6 is required as optional`,
        `The number 6 is for entry as optional`,
      ],
    },
  },
  {
    step: {
      type: 'then',
      match: 'Convert {int} and {float} and {word} and {string} properly',
      variant: 'expression',
      content: 'Convert {int} and {float} and {word} and {string} properly',
    },
    tests: {
      validate: [
        isInt,
        isFloat,
        arg => isStr(arg) && !arg.includes(' '),
        arg => isStr(arg) && arg.includes(' '),
      ],
      pass: [`Convert 5 and 4.5 and something and "A string" properly`],
    },
  },
  {
    step: {
      type: 'then',
      match: 'I have (some )apple(s) to eat( and savor)',
      variant: 'expression',
      content: 'Then("I have (some )apple(s) to eat( and savor)", ()=>{})',
    },
    tests: {
      pass: [
        `I have some apples to eat`,
        `I have apples to eat`,
        `I have apples to eat and savor`,
        `I have some apples to eat and savor`,
        `I have some apple to eat`,
        `I have apple to eat`,
        `I have apple to eat and savor`,
        `I have some apple to eat and savor`,
      ],
      fail: [
        `I have many apples to eat`,
        `I have apples to eat and spit out`,
        `I have some apples`,
      ],
    },
  },
  {
    step: {
      type: 'given',
      match: 'I wait {float} second(s)',
      variant: 'expression',
      content: 'Then("I wait {float} second(s)", ()=>{})',
    },
    tests: {
      pass: [ 'I wait 1.0 second', 'I wait 0.0 seconds' ],
      fail: [
        'I wait 2 seconds',
        'I wait some seconds',
        'I wait 1',
        'I wait 0 minutes',
        'I wait 3 seconds tomorrow',
      ],
    },
  },
  {
    step: {
      type: 'given',
      match: 'I do the thing {int} time(s) and I say {string}',
      variant: 'expression',
      content: 'I do the thing {int} time(s) and I say {string}',
    },
    tests: {
      pass: [
        'I do the thing 3 times and I say "wow"',
        'I do the thing 1 time and I say "okay"',
      ],
      fail: [
        'I do the thing some time',
        'I do the thing 3 times and I say',
        'I do the thing 1 time and I sing',
      ],
    },
  },
  {
    step: {
      type: 'given',
      match: 'I click the button {string}',
      variant: 'expression',
      content: 'I click the button {string}',
    },
    tests: {
      pass: ['I click the button "hey-123"'],
      fail: [
        'I click the button hey-123',
        'I click the button 34',
        'I click the button 34.3',
      ],
    },
  },
  {
    step: {
      type: 'given',
      match: 'I navigate to {word}',
      variant: 'expression',
      content: 'I navigate to {word}',
    },
    tests: {
      pass: [ 'I navigate to google', 'I navigate to .google' ],
      fail: ['I navigate to "google"'],
    },
  },
]
