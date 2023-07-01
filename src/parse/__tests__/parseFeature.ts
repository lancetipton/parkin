import {
  rulesFeature,
  worldFeature,
  backgroundFeature,
  bgStepTagsFeature,
  featureRulesScenarios,
} from '../../__mocks__'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { parseFeature } = require('../parseFeature')

describe(`parseFeature`, () => {
  describe(`Feature Tags`, () => {

    it(`should parse a Features tags`, () => {
      const { tags } = parseFeature(backgroundFeature)[0]
      expect(tags.index).toBe(0)
      expect(Array.isArray(tags.tokens)).toBe(true)
      expect(tags.tokens[0]).toBe(`@background`)
    })

    it(`should parse tags for Top level Tags, Rules, and Scenarios`, () => {
      const { tags, rules, scenarios } = parseFeature(featureRulesScenarios)[0]

      expect(tags.index).toBe(0)
      expect(Array.isArray(tags.tokens)).toBe(true)
      expect(tags.tokens).toEqual([`@rules`, `@scenarios`])

      const r1 = rules[0]
      expect(r1.tags.index < r1.index).toBe(true)
      expect(r1.tags.tokens).toEqual([`@rule-1-tag`])
      expect(r1.tags.whitespace).toBe(r1.whitespace)

      const r2 = rules[1]
      expect(r2.tags.index < r2.index).toBe(true)
      expect(r2.tags.tokens).toEqual([`@rule-2-tag`, `@extra-rule-2-tag`])
      expect(r2.tags.whitespace).toBe(r2.whitespace)

      const s1 = scenarios[0]
      expect(s1.tags.index < s1.index).toBe(true)
      expect(s1.tags.tokens).toEqual([`@scenario-before-rules-tag`])
      expect(s1.tags.whitespace).toBe(s1.whitespace)

      const s2 = scenarios[1]
      expect(s2.tags.index < s2.index).toBe(true)
      expect(s2.tags.tokens).toEqual([`@scenario-in-between-rules-tag`])
      expect(s2.tags.whitespace).toBe(s2.whitespace)

      const s3 = scenarios[2]
      expect(s3.tags.index < s3.index).toBe(true)
      expect(s3.tags.tokens).toEqual([`@scenario-after-rules-tag`, `@last-scenario-tag`])
      expect(s3.tags.whitespace).toBe(s3.whitespace)

    })
    
    it(`should parse tags for Scenarios under Rules`, () => {

      const { rules } = parseFeature(featureRulesScenarios)[0]

      const rs1 = rules[1].scenarios[0]
      expect(rs1.tags.index < rs1.index).toBe(true)
      expect(rs1.tags.tokens).toEqual([`@example-tag`, `@extra-example-tag`])
      expect(rs1.tags.whitespace).toBe(rs1.whitespace)

    })

    it(`should parse background and step tags`, () => {
      const { background } = parseFeature(bgStepTagsFeature)[0]

      expect(background.tags.content).toBe(`@bg-tag @bg-tag-2`)
      expect(background.steps[0].tags).toBe(undefined)
      expect(background.steps[1]?.tags?.content).toBe(`@bg-step-tag @bg-step-tag-2`)
    })

    it(`should parse scenario step tags`, () => {
      const { scenarios } = parseFeature(bgStepTagsFeature)[0]

      expect(scenarios[0].tags).toBe(undefined)
      expect(scenarios[0].steps[0]?.tags?.content).toBe(`@sc1-step-tag @sc1-step-tag-2`)
      expect(scenarios[0].steps[1]?.tags).toBe(undefined)

      expect(scenarios[1]?.tags?.content).toBe(`@sc2-tag @sc2-tag-2`)
      expect(scenarios[1].steps[0]?.tags?.content).toBe(`@sc2-step-tag @sc2-step-tag-2`)
      expect(scenarios[1].steps[1]?.tags).toBe(undefined)

      expect(scenarios[2]?.tags?.content).toBe(`@sc3-tag @sc3-tag-2`)
      expect(scenarios[2].steps[0]?.tags?.content).toBe(`@sc3-step-tag @sc3-step-tag-2`)
      expect(scenarios[2].steps[1]?.tags?.content).toBe(`@sc3-step2-tag @sc3-step2-tag-2`)
    })

    it(`should add the tags to the correct step`, () => {
      const { scenarios } = parseFeature(bgStepTagsFeature)[0]

      expect(scenarios[3]?.tags?.content).toBe(`@sc4-tag @sc4-tag-2`)
      expect(scenarios[3].steps[0]?.tags?.content).toBe(`@sc4-step-tag @sc4-step-tag-2`)
      expect(scenarios[3].steps[1]?.tags?.content).toBe(undefined)
      expect(scenarios[3].steps[2]?.tags?.content).toBe(`@sc4-step3-tag @sc4-step3-tag-2`)
      expect(scenarios[3].steps[3]?.tags?.content).toBe(undefined)

    })

  })

  describe(`Feature Comments`, () => {
    it(`should parse comments within a Feature`, () => {
      const { comments } = parseFeature(backgroundFeature)[0]
      expect(Array.isArray(comments)).toBe(true)
      const { uuid, ...comment } = comments[0]
      expect(typeof uuid).toBe(`string`)
      expect(comment).toEqual({
        index: 2,
        type: `comment`,
        whitespace: `  `,
        content: `# This is a test comment`,
      })
    })
  })

  describe(`Feature Rule`, () => {
    it(`should parse the rules of a feature`, () => {
      const { rules } = parseFeature(rulesFeature)[0]
      expect(rules.length).toBe(2)
      expect(rules[0].rule).toBe(`This is Rule 1`)
      expect(rules[1].rule).toBe(`This is Rule 2`)
    })

    it(`should add the parsed steps to the correct rule scenarios`, () => {
      const { rules } = parseFeature(rulesFeature)[0]
      const { scenarios } = rules[0]
      const { scenarios: scenarios2 } = rules[1]

      expect(scenarios[0].steps.length).toBe(2)
      expect(scenarios[0].steps[0].type).toBe(`given`)
      expect(scenarios[0].steps[0].step).toBe(
        `that this Feature has a background`
      )
      expect(scenarios[0].steps[1].type).toBe(`then`)
      expect(scenarios[0].steps[1].step).toBe(
        `this rules scenario's steps should be run after the background's steps`
      )
      expect(scenarios[1].steps.length).toBe(2)
      expect(scenarios[1].steps[0].type).toBe(`given`)
      expect(scenarios[1].steps[0].step).toBe(`that a second scenario exists`)
      expect(scenarios[1].steps[1].type).toBe(`then`)
      expect(scenarios[1].steps[1].step).toBe(
        `the rules second scenario's steps should be run after a second background's steps`
      )

      expect(scenarios2[0].steps.length).toBe(2)
      expect(scenarios2[0].steps[0].type).toBe(`given`)
      expect(scenarios2[0].steps[0].step).toBe(
        `that this Feature has two rules`
      )
      expect(scenarios2[0].steps[1].type).toBe(`then`)
      expect(scenarios2[0].steps[1].step).toBe(
        `this scenario's steps should be run after the the first rules steps`
      )
      expect(scenarios2[1].steps.length).toBe(2)
      expect(scenarios2[1].steps[0].type).toBe(`given`)
      expect(scenarios2[1].steps[0].step).toBe(
        `that a second scenario exists in the second rule`
      )
      expect(scenarios2[1].steps[1].type).toBe(`then`)
      expect(scenarios2[1].steps[1].step).toBe(
        `the second scenario's steps should be run after a second rules scenario steps`
      )
    })
  })

  describe(`Feature Scenario`, () => {
    it(`should parse the Scenarios of a feature`, () => {
      const { scenarios } = parseFeature(backgroundFeature)[0]
      expect(scenarios.length).toBe(2)
      expect(scenarios[0].scenario).toBe(`Run scenario after the background`)
      expect(scenarios[1].scenario).toBe(
        `Run second scenario after a second background`
      )
    })

    it(`should add the parsed steps to the correct Scenarios`, () => {
      const { scenarios } = parseFeature(backgroundFeature)[0]

      expect(scenarios[0].steps.length).toBe(2)
      expect(scenarios[0].steps[0].type).toBe(`given`)
      expect(scenarios[0].steps[0].step).toBe(
        `that this Feature has a background`
      )
      expect(scenarios[0].steps[1].type).toBe(`then`)
      expect(scenarios[0].steps[1].step).toBe(
        `this scenario's steps should be run after the background's steps`
      )

      expect(scenarios[1].steps.length).toBe(2)
      expect(scenarios[1].steps[0].type).toBe(`given`)
      expect(scenarios[1].steps[0].step).toBe(`that a second scenario exists`)
      expect(scenarios[1].steps[1].type).toBe(`then`)
      expect(scenarios[1].steps[1].step).toBe(
        `the second scenario's steps should be run after a second background's steps`
      )
    })
  })

  describe(`Feature Background`, () => {
    it(`should parse a background and its steps when it exists`, () => {
      const feature = parseFeature(backgroundFeature)[0]
      expect(feature.background).not.toBe(undefined)
      expect(feature.background.background).toBe(``)
    })

    it(`should parse a background's steps`, () => {
      const feature = parseFeature(backgroundFeature)[0]
      expect(Array.isArray(feature.background.steps)).toBe(true)

      const [ givenStep, thenStep ] = feature.background.steps

      expect(givenStep.type).toBe(`given`)
      expect(givenStep.step).toBe(`that background exists`)
      expect(givenStep.uuid).not.toBe(undefined)
      expect(givenStep.index).not.toBe(undefined)

      expect(thenStep.type).toBe(`then`)
      expect(thenStep.step).toBe(
        `the background steps should be called before each scenario`
      )
      expect(thenStep.uuid).not.toBe(undefined)
      expect(thenStep.index).not.toBe(undefined)
    })
  })

  describe(`options.worldReplace`, () => {
    it(`should not replace world refs when worldReplace is false`, () => {
      const feature = parseFeature(worldFeature, { worldReplace: false })[0]
      expect(feature.scenarios[0].scenario).toBe(`$world.feature.scenario.first`)
      expect(feature.comments[0].content).toBe(`# This $world.feature.comment from the world object`)
      expect(feature.background.steps[1].step).toBe(`"$world.feature.background.then" should be replaced`)
      expect(feature.scenarios[0].steps[3].step).toBe(`this features status should be "$:world.feature.status"`)
    })
  })

  

})
