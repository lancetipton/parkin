
export const featDupStepIdxsStr = `
Feature: Wait

  @goblet-simple-steps
  Scenario: Steps
    When I wait 2 second
    When I wait 2 second
    Given I navigate to 'https://docs.gobletqa.app/'
    When I wait 2 second
    When I wait 2 second
    Given I navigate to 'https://www.google.com/'
    When I wait 1 seconds
    When I wait 1 seconds
    Given I navigate to 'https://www.gobletqa.com/'
    When I wait 22 second

    When I wait 33 second
`

export const featDupStepIdxs = {
  index: 0,
  content: `Feature: Wait\n\n  @goblet-simple-steps\n  Scenario: Steps\n    When I wait 2 second\n    When I wait 2 second\n    Given I navigate to 'https://docs.gobletqa.app/'\n    When I wait 2 second\n    When I wait 2 second\n    Given I navigate to 'https://www.google.com/'\n    When I wait 1 seconds\n    When I wait 1 seconds\n    When I wait 2 second\n    When I wait 2 second\n\n    Given I navigate to 'https://www.gobletqa.com/' \n`,
  feature: `Wait`,
  rules: [],
  empty: [
    {
      index: 1,
      content: ``,
      whitespace: ``,
      type: `empty`,
      uuid: `feature-3559755.empty.0`
    },
    {
      index: 14,
      content: ``,
      whitespace: ``,
      type: `empty`,
      uuid: `feature-3559755.empty.1`
    },
    {
      index: 16,
      content: ``,
      whitespace: ``,
      type: `empty`,
      uuid: `feature-3559755.empty.2`
    }
  ],
  reason: [],
  comments: [],
  scenarios: [
    {
      type: `scenario`,
      index: 3,
      scenario: `Steps`,
      whitespace: `  `,
      uuid: `feature-3559755.scenario.0`,
      tags: {
        index: 2,
        tokens: [`@goblet-simple-steps`],
        content: `@goblet-simple-steps`,
        type: `tags`,
        uuid: `tags-2117646448`,
        whitespace: `  `
      },
      steps: [
        {
          type: `when`,
          index: 4,
          step: `I wait 2 second`,
          whitespace: `    `,
          uuid: `feature-3559755.scenario.0.when.0`,
          definition: `def-951442171`
        },
        {
          type: `when`,
          index: 5,
          step: `I wait 2 second`,
          whitespace: `    `,
          uuid: `feature-3559755.scenario.0.when.1`,
          definition: `def-951442171`
        },
        {
          type: `given`,
          index: 6,
          step: `I navigate to 'https://docs.gobletqa.app/'`,
          whitespace: `    `,
          uuid: `feature-3559755.scenario.0.given.2`,
          definition: `def-1719751716`
        },
        {
          type: `when`,
          index: 7,
          step: `I wait 2 second`,
          whitespace: `    `,
          uuid: `feature-3559755.scenario.0.when.3`,
          definition: `def-951442171`
        },
        {
          type: `when`,
          index: 8,
          step: `I wait 2 second`,
          whitespace: `    `,
          uuid: `feature-3559755.scenario.0.when.4`,
          definition: `def-951442171`
        },
        {
          type: `given`,
          index: 9,
          step: `I navigate to 'https://www.google.com/'`,
          whitespace: `    `,
          uuid: `feature-3559755.scenario.0.given.5`,
          definition: `def-1719751716`
        },
        {
          type: `when`,
          index: 10,
          step: `I wait 1 seconds`,
          whitespace: `    `,
          uuid: `feature-3559755.scenario.0.when.6`,
          definition: `def-951442171`
        },
        {
          type: `when`,
          index: 11,
          step: `I wait 1 seconds`,
          whitespace: `    `,
          uuid: `feature-3559755.scenario.0.when.7`,
          definition: `def-951442171`
        },
        {
          type: `given`,
          index: 12,
          step: `I navigate to 'https://www.gobletqa.com/'`,
          whitespace: `    `,
          uuid: `feature-3559755.scenario.0.given.10`,
          definition: `def-1719751716`
        },
        {
          type: `when`,
          index: 12,
          step: `I wait 22 second`,
          whitespace: `    `,
          uuid: `feature-3559755.scenario.0.when.8`,
          definition: `def-951442171`
        },
        {
          type: `when`,
          index: 13,
          step: `I wait 33 second`,
          whitespace: `    `,
          uuid: `feature-3559755.scenario.0.when.9`,
          definition: `def-951442171`
        }
      ],
    }
  ],
  type: `feature`,
  uuid: `feature-3559755`,
  path: `/Steps/Wait.feature`,
  parent: {
    uuid: `/goblet/repos/lancetipton/goblet/bdd/features/Steps/Wait.feature`,
    location: `/goblet/repos/lancetipton/goblet/bdd/features/Steps/Wait.feature`
  }
}