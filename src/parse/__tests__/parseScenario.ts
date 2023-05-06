import { featureRulesScenarios } from '../../__mocks__'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { parseFeature } = require('../parseFeature')

describe(`parseScenario`, () => {

  describe(`Feature with Scenarios and Rules`, () => {

    it(`should parse the Scenarios and Rules correctly`, () => {
      const { rules, scenarios } = parseFeature(featureRulesScenarios)[0]
      const [rule1, rule2] = rules
      
      expect(rule1.rule).toBe(`This is Rule 1`)
      expect(rule1.scenarios.length).toBe(2)
      expect(rule1.scenarios[0].scenario).toBe(`Run first rule - first scenario`)
      expect(rule1.scenarios[1].scenario).toBe(`Run first rule - second scenario`)
      
      expect(rule2.rule).toBe(`This is Rule 2`)
      expect(rule2.scenarios.length).toBe(1)
      expect(rule2.scenarios[0].scenario).toBe(`Run second rule first example`)
      
      const [scenario1, scenario2, scenario3] = scenarios
      expect(scenario1.scenario).toBe(`Scenario before rules`)
      expect(scenario2.scenario).toBe(`Scenario in-between rules`)
      expect(scenario3.scenario).toBe(`Scenario after rules`)

    })

  })

})
