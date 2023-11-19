import { expressionDefs } from '../../__mocks__'
import { isInt } from '@keg-hub/jsutils'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { matchExpression } = require('../expression')

const testUrlDef = {
  type: `given`,
  match: `I open the site/url/uri {string}`,
  variant: `expression`,
  content: `I open the site/url/uri {string}`,
}

const testDecDef = {
  type: `given`,
  match: `the descendent {string} contains the text {string}`,
  variant: `expression`,
  content: `the descendent {string} contains the text {string}`,
}

describe(`Match matchExpression`, () => {
  it(`should match optional expression syntax`, () => {
    const optionalDef = expressionDefs[0]
    optionalDef.tests.pass.map(text => {
      const { definition } = matchExpression(optionalDef.step, text, {})
      expect(definition).not.toBe(undefined)
      expect(definition).toEqual(optionalDef.step)
    })
  })

  it(`should not match malformed optional expression syntax`, () => {
    const optionalDef = expressionDefs[0]
    optionalDef.tests.fail.map(text => {
      const { definition } = matchExpression(optionalDef.step, text)
      expect(definition).toBe(undefined)
      expect(definition).not.toEqual(optionalDef.step)
    })
  })

  it(`should match alternate expression syntax`, () => {
    const altDef = expressionDefs[1]
    altDef.tests.pass.map(text => {
      const { definition } = matchExpression(altDef.step, text)
      expect(definition).not.toBe(undefined)
      expect(definition).toEqual(altDef.step)
    })
  })

  it(`should not match malformed alternate expression syntax`, () => {
    const altDef = expressionDefs[0]
    altDef.tests.fail.map(text => {
      const { definition } = matchExpression(altDef.step, text)
      expect(definition).toBe(undefined)
      expect(definition).not.toEqual(altDef.step)
    })
  })

  it(`should convert a variable to the correct type`, () => {
    const optionalDef = expressionDefs[0]
    const { match } = matchExpression(
      optionalDef.step,
      `I have 1 item ready to go`
    )
    expect(match[0]).toBe(1)
    expect(isInt(match[0])).toBe(true)
  })

  it(`should convert many variables to the correct types`, () => {
    const convertDef = expressionDefs[2]
    const { match } = matchExpression(convertDef.step, convertDef.tests.pass[0])
    expect(match.length).toBe(4)
    match.map((item, index) =>
      expect(convertDef.tests.validate[index](item)).toBe(true)
    )
  })

  it(`should work with multiple optional text instances`, () => {
    const expressionDef = expressionDefs[3]
    expressionDef.tests.pass.map(test => {
      const { match } = matchExpression(expressionDef.step, test)
      expect(match).toBeDefined()
    })

    expressionDef.tests.fail.map(test => {
      const { match } = matchExpression(expressionDef.step, test)
      expect(match).toBeUndefined()
    })
  })

  it(`should work with single plural optionals`, () => {
    const expressionDef = expressionDefs[4]
    expressionDef.tests.pass.map(test => {
      const { match } = matchExpression(expressionDef.step, test)
      expect(match).toBeDefined()
    })

    expressionDef.tests.fail.map(test => {
      const { match } = matchExpression(expressionDef.step, test)
      expect(match).toBeUndefined()
    })
  })

  it(`should work with optionals nested between arguments`, () => {
    const expressionDef = expressionDefs[5]
    expressionDef.tests.pass.map(test => {
      const { match } = matchExpression(expressionDef.step, test)
      expect(match).toBeDefined()
      expect(match).toHaveLength(2) // should not include the optional text as arguments
    })

    expressionDef.tests.fail.map(test => {
      const { match } = matchExpression(expressionDef.step, test)
      expect(match).toBeUndefined()
    })
  })

  it(`should match string types correctly`, () => {
    const expressionDef = expressionDefs[6]
    expressionDef.tests.pass.map(test => {
      const { match } = matchExpression(expressionDef.step, test)
      expect(match).toBeDefined()
    })

    expressionDef.tests.fail.map(test => {
      const { match } = matchExpression(expressionDef.step, test)
      expect(match).toBeUndefined()
    })
  })

  it(`should match word types correctly`, () => {
    const expressionDef = expressionDefs[7]
    expressionDef.tests.pass.map(test => {
      const { match } = matchExpression(expressionDef.step, test)
      expect(match).toBeDefined()
    })

    expressionDef.tests.fail.map(test => {
      const { match } = matchExpression(expressionDef.step, test)
      expect(match).toBeUndefined()
    })
  })

  it(`should work with symbols`, () => {
    const { match } = matchExpression(
      testUrlDef,
      `I open the site "$myUrl"`
    )

    expect(match).toEqual(expect.arrayContaining([`$myUrl`]))
  })

  it(`should replace $world values with world values`, () => {
    const { match } = matchExpression(
      testUrlDef,
      `I open the site "$world.app.url"`,
      {app: { url: `http://google.com` }}
    )

    expect(match).toEqual(expect.arrayContaining([`http://google.com`]))
  })

  it(`should replace $$alias values with world.$alias values`, () => {
    const { match } = matchExpression(
      testUrlDef,
      `I open the site "$$url"`,
      {$alias: {url: `http://google.com`}}
    )

    expect(match).toEqual(expect.arrayContaining([`http://google.com`]))
  })


  it(`should not replace world alias values when worldReplace option is false`, () => {

    const { match } = matchExpression(
      testUrlDef,
      `I open the site "$world.app.url"`,
      { $alias: {} },
      { worldReplace: false }
    )

    expect(match).toEqual(expect.arrayContaining([`$world.app.url`]))

  })

  it(`should not replace world alias values when worldReplace option is false`, () => {

    const { match } = matchExpression(
      testUrlDef,
      `I open the site "$$url"`,
      { $alias: {}},
      {worldReplace: false}
    )

    expect(match).toEqual(expect.arrayContaining([`$$url`]))

  })

  it(`should work with string types with single and double quotes`, () => {
    const selector = `.ef-action-button-selected`
    const textContent = `SELECTED`
    const stepText = `the descendent '${selector}' contains the text "${textContent}"`

    const { match } = matchExpression(testDecDef, stepText)

    expect(match).toEqual(expect.arrayContaining([ selector, textContent ]))
  })

  it(`should work with optionals on the start of a word`, () => {
    const def = {
      type: `given`,
      variant: `expression`,
      match: `I (do not )love regex`,
      content: `I (do not )love regex`,
    }

    const { definition:doNot } = matchExpression(def, `I do not love regex`)

    expect(doNot).not.toBe(undefined)
    expect(doNot).toEqual(def)

    const { definition:doDef } = matchExpression(def, `I love regex`)
    expect(doDef).not.toBe(undefined)
    expect(doDef).toEqual(def)
  })

  it(`should not match word with step def expecting number`, () => {
    const { match } = matchExpression(
      {
        type: `given`,
        match: `I eat {int} apples`,
        variant: `expression`,
        content: `I eat {int} apples`,
      },
      `I eat tasty apples`
    )

    expect(match).toBeUndefined()
  })

})
