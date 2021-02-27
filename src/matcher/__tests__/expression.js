import { expressionDefs } from '../../__mocks__'
import { isInt } from '@keg-hub/jsutils'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { matchExpression } = require('../expression')

describe('Match matchExpression', () => {
  it('should match optional expression syntax', () => {
    const optionalDef = expressionDefs[0]
    optionalDef.tests.pass.map(text => {
      const { step } = matchExpression(optionalDef.step, text)
      expect(step).not.toBe(undefined)
      expect(step).toEqual(optionalDef.step)
    })
  })

  it('should not match malformed optional expression syntax', () => {
    const optionalDef = expressionDefs[0]
    optionalDef.tests.fail.map(text => {
      const { step } = matchExpression(optionalDef.step, text)
      expect(step).toBe(undefined)
      expect(step).not.toEqual(optionalDef.step)
    })
  })

  it('should match alternate expression syntax', () => {
    const altDef = expressionDefs[1]
    altDef.tests.pass.map(text => {
      const { step } = matchExpression(altDef.step, text)
      expect(step).not.toBe(undefined)
      expect(step).toEqual(altDef.step)
    })
  })

  it('should not match malformed alternate expression syntax', () => {
    const altDef = expressionDefs[0]
    altDef.tests.fail.map(text => {
      const { step } = matchExpression(altDef.step, text)
      expect(step).toBe(undefined)
      expect(step).not.toEqual(altDef.step)
    })
  })

  it('should convert a variable to the correct type', () => {
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

  it ('should work with multiple optional text instances', () => {
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
})
