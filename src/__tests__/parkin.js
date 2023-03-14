import {
  definition,
  feature,
  emptyScenario,
  parsedFeature,
  parsedDefinition,
  registerMockSteps,
  brokenFeatureScenario,
} from '../__mocks__'

import { constants } from '../constants'
const { REGEX_VARIANT, EXPRESSION_VARIANT } = constants

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const worldObj = {}
const { Parkin } = require('../parkin')

describe('Parkin', () => {
  it('should allow registering steps', () => {
    const PK = new Parkin(worldObj)

    PK.Given(`Given Step`, jest.fn())
    PK.When(`When Step`, jest.fn())
    PK.Then(`Then Step`, jest.fn())

    expect(PK.steps._given.length).toBe(1)
    expect(PK.steps._when.length).toBe(1)
    expect(PK.steps._then.length).toBe(1)
  })

  it('should set the correct properties of the registered step', () => {
    const PK = new Parkin(worldObj)
    registerMockSteps(PK)

    const givenDef = PK.steps._given[0]
    expect(givenDef.type).toBe('given')
    expect(givenDef.variant).toBe(REGEX_VARIANT)
    expect(typeof givenDef.content).toBe('string')

    const whenDef = PK.steps._when[0]
    expect(whenDef.type).toBe('when')
    expect(whenDef.variant).toBe(EXPRESSION_VARIANT)
    expect(typeof whenDef.content).toBe('string')

    const thenDef = PK.steps._then[0]
    expect(thenDef.type).toBe('then')
    expect(thenDef.variant).toBe(EXPRESSION_VARIANT)
    expect(typeof thenDef.content).toBe('string')
  })

  it('should parse feature text', () => {
    const PK = new Parkin(worldObj)
    // The uuid is different every time, so don't include it when testing
    // Scenarios can include function identity, so don't include it when testing
    const { uuid, scenarios, ...parsed } = PK.parse.feature(feature)[0]
    const { scenarios: parsedScenarios, ...featureWOScenarios } = parsedFeature

    expect(parsed).toEqual(featureWOScenarios)
    let scenarioWs
    let stepsWS = []

    // Remove the uuid from the scenarios so we can validate them
    const noUuidScenarios = scenarios.map(scenario => {
      const { uuid, whitespace, ...noUuidScenario } = scenario
      scenarioWs = whitespace
      noUuidScenario.steps = scenario.steps.map(step => {
        const { uuid, whitespace, ...noUuidStep } = step
        stepsWS.push(whitespace)
        return noUuidStep
      })
      return noUuidScenario
    })

    expect(scenarioWs).toEqual(`  `)
    expect(stepsWS).toEqual([ '    ', '    ', '    ', '    ', '    ' ])
    expect(noUuidScenarios).toEqual(parsedScenarios)
  })

  it(`should set the error array for malformed feature content`, () => {
    const PK = new Parkin(worldObj)

    const parsed = PK.parse.feature(brokenFeatureScenario)[0]

    expect(parsed.index).toBeUndefined()
    expect(parsed.feature).toBe(false)
    expect(Array.isArray(parsed.errors)).toBe(true)
    expect(parsed.errors.length).toBe(1)

    const [err] = parsed.errors
    expect(err).toEqual({
      index: 0,
      type: 'feature',
      content: 'Could not find Feature text in file',
    })
  })

  it(`should properly parse empty scenario text`, () => {
    const PK = new Parkin(worldObj)
    const parsed = PK.parse.feature(emptyScenario)[0]

    const rulesScenario = parsed.rules[0].scenarios[0]
    const featScenario = parsed.scenarios[0]

    expect(rulesScenario.steps?.length).toBe(0)
    expect(rulesScenario.scenario).toBe(``)

    expect(featScenario.steps?.length).toBe(1)
    expect(featScenario.scenario).toBe(`Navigate the Goblog`)
  })

  it('should parse step definition text when a definition parse method is passed', () => {
    const PK = new Parkin(worldObj)
    const parsed = PK.parse.definition(definition)

    const { method: givenMethod, ...givenDef } = parsed.Given[0]
    expect(typeof givenMethod).toBe('function')
    expect(givenDef).toEqual(parsedDefinition.Given[0])

    const { method: thenMethod, ...thenDef } = parsed.Then[0]
    expect(typeof thenMethod).toBe('function')
    expect(thenDef).toEqual(parsedDefinition.Then[0])
  })

  it('should register parsed step definitions from text', () => {
    const PK = new Parkin(worldObj)
    PK.parse.definition(definition)

    const { method: givenMethod, ...givenDef } = PK.steps._given[0]
    expect(givenDef).toEqual(parsedDefinition.Given[0])
    expect(typeof givenMethod).toBe('function')

    const { method: thenMethod, ...thenDef } = PK.steps._then[0]
    expect(typeof thenMethod).toBe('function')
    expect(thenDef).toEqual(parsedDefinition.Then[0])
  })

  it('finds matching definition from a parsed feature and calls the its method', () => {
    const PK = new Parkin(worldObj)
    registerMockSteps(PK)

    const parsed = PK.parse.feature(feature)[0]
    const givenStep = parsed.scenarios[0].steps[0]
    const whenStep = parsed.scenarios[0].steps[1]

    expect(PK.steps[`_${givenStep.type}`][0].method).not.toHaveBeenCalled()
    expect(PK.steps[`_${whenStep.type}`][2].method).not.toHaveBeenCalled()

    PK.steps.resolve(givenStep.step)
    PK.steps.resolve(whenStep.step)

    expect(PK.steps[`_${givenStep.type}`][0].method).toHaveBeenCalled()
    expect(PK.steps[`_${whenStep.type}`][2].method).toHaveBeenCalled()
  })

  it('should add an existing parsed step definition when passed to the register step method call', () => {
    const PK = new Parkin(worldObj)
    PK.parse.definition(definition)

    const stepDef = PK.steps._given[0]
    PK.steps.clear()
    expect(PK.steps._given.length).toBe(0)

    PK.registerSteps(stepDef)
    const addedDef = PK.steps._given[0]

    expect(addedDef).not.toBe(stepDef)
    expect(addedDef).toEqual(stepDef)
  })

  it('should add an existing parsed step definitions when passed to the register step method call as array', () => {
    const PK = new Parkin(worldObj)
    PK.parse.definition(definition)

    const givenDef = PK.steps._given[0]
    const thenDef = PK.steps._then[0]
    PK.steps.clear()
    expect(PK.steps._given.length).toBe(0)
    expect(PK.steps._then.length).toBe(0)

    PK.registerSteps([ givenDef, thenDef ])
    const addedGDef = PK.steps._given[0]
    const addedTDef = PK.steps._then[0]

    expect(addedGDef).not.toBe(givenDef)
    expect(addedGDef).toEqual(givenDef)

    expect(addedTDef).not.toBe(thenDef)
    expect(addedTDef).toEqual(thenDef)
  })

  it('should add an existing parsed step definitions when passed to the register step method call as object', () => {
    const PK = new Parkin(worldObj)
    PK.parse.definition(definition)

    const givenDef = PK.steps._given[0]
    const thenDef = PK.steps._then[0]
    PK.steps.clear()
    expect(PK.steps._given.length).toBe(0)
    expect(PK.steps._then.length).toBe(0)

    PK.registerSteps({
      [givenDef.uuid]: givenDef,
      [thenDef.uuid]: thenDef,
    })
    const addedGDef = PK.steps._given[0]
    const addedTDef = PK.steps._then[0]

    expect(addedGDef).not.toBe(givenDef)
    expect(addedGDef).toEqual(givenDef)

    expect(addedTDef).not.toBe(thenDef)
    expect(addedTDef).toEqual(thenDef)
  })

  it('should add an existing parsed step definition', () => {
    const PK = new Parkin(worldObj)
    PK.parse.definition(definition)

    const stepDef = PK.steps._given[0]
    PK.steps.clear()
    expect(PK.steps._given.length).toBe(0)

    PK.steps.add(stepDef)
    const addedDef = PK.steps._given[0]

    expect(addedDef).not.toBe(stepDef)
    expect(addedDef).toEqual(stepDef)
  })

  it('should add an array existing parsed step definition', () => {
    const PK = new Parkin(worldObj)
    PK.parse.definition(definition)

    const givenDef = PK.steps._given[0]
    const thenDef = PK.steps._then[0]

    PK.steps.clear()
    expect(PK.steps._given.length).toBe(0)
    expect(PK.steps._then.length).toBe(0)

    PK.steps.add([ givenDef, thenDef ])
    const addedGDef = PK.steps._given[0]
    const addedTDef = PK.steps._then[0]

    expect(addedGDef).not.toBe(givenDef)
    expect(addedGDef).toEqual(givenDef)

    expect(addedTDef).not.toBe(thenDef)
    expect(addedTDef).toEqual(thenDef)
  })

  it('should add an object of existing parsed step definition', () => {
    const PK = new Parkin(worldObj)
    PK.parse.definition(definition)

    const givenDef = PK.steps._given[0]
    const thenDef = PK.steps._then[0]

    PK.steps.clear()
    expect(PK.steps._given.length).toBe(0)
    expect(PK.steps._then.length).toBe(0)

    PK.steps.add({
      [givenDef.uuid]: givenDef,
      [thenDef.uuid]: thenDef,
    })

    const addedGDef = PK.steps._given[0]
    const addedTDef = PK.steps._then[0]

    expect(addedGDef).not.toBe(givenDef)
    expect(addedGDef).toEqual(givenDef)

    expect(addedTDef).not.toBe(thenDef)
    expect(addedTDef).toEqual(thenDef)
  })

  it(`should return added steps in the list call`, () => {
    const PK = new Parkin(worldObj)
    PK.parse.definition(definition)

    const givenDef = PK.steps._given[0]
    const thenDef = PK.steps._then[0]
    PK.steps.clear()
    PK.steps.add(givenDef, thenDef)

    const steps = PK.steps.list()
    expect(steps[0]).toEqual(givenDef)
    expect(steps[1]).toEqual(thenDef)
  })
})
