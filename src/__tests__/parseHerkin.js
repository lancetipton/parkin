import { feature, parsedFeature, registerMockSteps } from '../__mocks__'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const worldObj = {}
const { ParseHerkin } = require('../parseHerkin')

describe('ReThemeContext', () => {

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

    expect(PH.steps._given[0].type).toBe('regex')
    expect(typeof PH.steps._given[0].content).toBe('string')

    expect(PH.steps._when[0].type).toBe('expression')
    expect(typeof PH.steps._when[0].content).toBe('string')

    expect(PH.steps._then[0].type).toBe('expression')
    expect(typeof PH.steps._then[0].content).toBe('string')
  })

  it('should parse a feature text', () => {
    const PH = new ParseHerkin(worldObj)
    // The uuid is different every time, so don't include it when testing
    // Scenarios can include function identity, so don't include it when testing
    const { uuid, scenarios, ...parsed } = PH.parse(feature)[0]
    
    expect(parsed).toEqual(parsedFeature)
  })

  it('Resolves a step definition from a parsed feature', () => {
    const PH = new ParseHerkin(worldObj)
    registerMockSteps(PH)

    const parsed = PH.parse(feature)[0]
    const givenStep = parsed.scenarios[0].steps[0]
    const whenStep = parsed.scenarios[0].steps[1]

    PH.steps.resolve(PH.steps[`_${givenStep.type}`], givenStep.step)
    PH.steps.resolve(PH.steps[`_${whenStep.type}`], whenStep.step)

  })

})
