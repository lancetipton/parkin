import {
  definition,
  feature,
  parsedFeature,
  parsedDefinition,
  registerMockSteps
} from '../__mocks__'

import { constants } from '../constants'
const { REGEX_VARIANT, EXPRESSION_VARIANT } = constants

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const worldObj = {}
const { ParseHerkin } = require('../parseHerkin')

describe('ParseHerkin', () => {

  it('should allow registering steps', () => {
    const PH = new ParseHerkin(worldObj)

    PH.Given(`Given Step`, jest.fn())
    PH.When(`When Step`, jest.fn())
    PH.Then(`Then Step`, jest.fn())

    expect(PH.steps._given.length).toBe(1)
    expect(PH.steps._when.length).toBe(1)
    expect(PH.steps._then.length).toBe(1)
  })

  it('should set the correct properties of the registered step', () => {
    const PH = new ParseHerkin(worldObj)
    registerMockSteps(PH)

    const givenDef = PH.steps._given[0]
    expect(givenDef.type).toBe('given')
    expect(givenDef.variant).toBe(REGEX_VARIANT)
    expect(typeof givenDef.content).toBe('string')

    const whenDef = PH.steps._when[0]
    expect(whenDef.type).toBe('when')
    expect(whenDef.variant).toBe(EXPRESSION_VARIANT)
    expect(typeof whenDef.content).toBe('string')

    const thenDef = PH.steps._then[0]
    expect(thenDef.type).toBe('then')
    expect(thenDef.variant).toBe(EXPRESSION_VARIANT)
    expect(typeof thenDef.content).toBe('string')
  })

  it('should parse feature text', () => {
    const PH = new ParseHerkin(worldObj)
    // The uuid is different every time, so don't include it when testing
    // Scenarios can include function identity, so don't include it when testing
    const { uuid, scenarios, ...parsed } = PH.parse.feature(feature)[0]
    
    expect(parsed).toEqual(parsedFeature)
  })

  it('should parse step definition text', () => {
    const PH = new ParseHerkin(worldObj)
    const parsed = PH.parse.definition(definition)

    expect(parsed).toEqual(parsedDefinition)
  })

  it('should register parsed step definitions from text', () => {
    const PH = new ParseHerkin(worldObj)
    const parsed = PH.parse.definition(definition)

    PH.steps.register(parsed)

    // Parsed definition does not have the name or method properties added to it
    // match property could be regex based on the variant, but the parsed version is a string
    // So extract them when testing
    const { name, method, match, ...givenDef } = PH.steps._given[0]
    const { match:parsedMatch, ...parsedDef } = parsedDefinition[0]

    expect(givenDef).toEqual(parsedDef)
    expect(typeof method).toBe('function')
    expect(typeof name).toBe('string')
    // Convert the both matches to string so they can be compared
    expect(`/${parsedMatch.toString()}/`).toEqual(match.toString())

    // Parsed definition does not have the name or method properties added to it
    // So extract them when testing
    const { name:thenName, method:thenMethod, ...thenDef } = PH.steps._then[0]
    const { ...parsedThenDef } = parsedDefinition[1]

    expect(thenDef).toEqual(parsedThenDef)
    expect(typeof thenMethod).toBe('function')
    expect(typeof thenName).toBe('string')
  })

  it('finds matching definition from a parsed feature and calls the its method', () => {
    const PH = new ParseHerkin(worldObj)
    registerMockSteps(PH)

    const parsed = PH.parse.feature(feature)[0]
    const givenStep = parsed.scenarios[0].steps[0]
    const whenStep = parsed.scenarios[0].steps[1]

    expect(PH.steps[`_${givenStep.type}`][0].method).not.toHaveBeenCalled()
    expect(PH.steps[`_${whenStep.type}`][2].method).not.toHaveBeenCalled()

    PH.steps.resolve(PH.steps[`_${givenStep.type}`], givenStep.step)
    PH.steps.resolve(PH.steps[`_${whenStep.type}`], whenStep.step)
    
    expect(PH.steps[`_${givenStep.type}`][0].method).toHaveBeenCalled()
    expect(PH.steps[`_${whenStep.type}`][2].method).toHaveBeenCalled()
  })

})
