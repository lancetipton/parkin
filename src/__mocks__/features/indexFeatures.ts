import { testUUid } from '../helpers'

export const noIndexFeature = {
  // index: 1,
  content: '@background\n' +
    'Feature: Background steps\n' +
    '  # This is a test comment\n' +
    '  Background:\n' +
    '    Given that background exists\n' +
    '    Then the background steps should be called before each scenario\n' +
    '\n' +
    '  Scenario: Run scenario after the background\n' +
    '    Given that this Feature has a background\n' +
    "    Then this scenario's steps should be run after the background's steps\n" +
    '\n' +
    '  Scenario: Run second scenario after a second background\n' +
    '    Given that a second scenario exists\n' +
    "    Then the second scenario's steps should be run after a second background's steps\n",
  feature: 'Background steps',
  tags: {
    index: 0,
    type: `tags`,
    uuid: testUUid,
    whitespace: ``,
    content: `@background`,
    tokens: [ `@background` ],
  },
  rules: [],
  empty: [
    {
      content: '',
      // index: 6
    },
    {
      content: '',
      // index: 10
    },
    {
      content: '',
      // index: 14
    }
  ],
  reason: [],
  comments: [
    {
      content: '  # This is a test comment',
      // index: 2
    }
  ],
  scenarios: [
    {
      // index: 7,
      scenario: 'Run scenario after the background',
      steps: [],
      uuid: 'run-scenario-after-the-background-33',
      whitespace: '  '
    },
    {
      // index: 11,
      scenario: 'Run second scenario after a second background',
      steps: [],
      uuid: 'run-second-scenario-after-a-second-background-45',
      whitespace: '  '
    }
  ],
  uuid: 'background-steps-16',
  background: {
    // index: 3,
    steps: [
      {
        type: 'given',
        // index: 4,
        step: 'that background exists',
        whitespace: '    ',
        uuid: 'given-that-background-exists-28'
      },
      {
        type: 'then',
        // index: 5,
        step: 'the background steps should be called before each scenario',
        whitespace: '    ',
        uuid: 'then-the-background-steps-should-be-called-before-each-scenario-63'
      }
    ],
    background: 'background-steps-16-background',
    uuid: 'background-steps-16-background-30',
    whitespace: '  '
  }
}



export const missingIndex = {
  index: 1,
  // The uuid is different every time, so comment it out for testing
  uuid: testUUid,
  content:
    '@search @google\n' +
    'Feature: Google Search\n' +
    '  As an internet user\n' +
    '  In order to find out more about Keg-Hub\n' +
    '  # Test comment in the feature meta\n' +
    '  I want to be able to search for information about the Keg-Hub\n' +
    '\n' +
    '  Scenario: Search the web for google\n' +
    '    Given I open the site https://www.google.com\n' +
    '    When I set keg-hub to the input .gLFyf\n' +
    '    When I press enter\n' +
    '    # comment for testing in the scenario steps\n' +
    '    When I wait for the page to load\n' +
    '    Then the element #search contains the text KegHub/keg-hub',
  feature: 'Google Search',
  tags: {
    index: 0,
    type: `tags`,
    uuid: testUUid,
    whitespace: ``,
    content: `@search @google`,
    tokens: [ `@search`, `@google` ],
  },
  empty: [
    {
      index: 6,
      content: '',
    },
  ],
  reason: [{ content: 'In order to find out more about Keg-Hub', index: 3 }],
  comments: [
    // Comments are stored globally, so we keep the full white space of it
    // This allows us to format it relative to adjoining lines
    { content: '  # Test comment in the feature meta', index: 4 },
    { content: '    # comment for testing in the scenario steps', index: 11 },
    // { content: 'Test comment in the feature meta', index: 4 },
    // { content: 'comment for testing in the scenario steps', index: 11 }
  ],
  perspective: { content: 'As an internet user', index: 2 },
  desire: {
    content: 'I want to be able to search for information about the Keg-Hub',
    index: 5,
  },
  rules: [],
  scenarios: [
    {
      index: 7,
      scenario: 'Search the web for google',
      uuid: 'f75d10d8-645c-4da0-b4b2-70696e3588b3',
      steps: [
        {
          step: 'I open the site https://www.google.com',
          type: 'given',
          uuid: 'c257a2b9-2f34-42ac-b7e2-da4a843bc8ef',
          // index: 8,
        },
        {
          step: 'I set keg-hub to the input .gLFyf',
          type: 'when',
          uuid: '2755d856-c6a9-41b2-bd63-508c2177011e',
          index: 9,
        },
        {
          step: 'I press enter',
          type: 'when',
          uuid: 'bb6b22bb-2555-49f6-8c5a-a0c1e8a22246',
          // index: 10,
        },
        {
          step: 'I wait for the page to load',
          type: 'when',
          uuid: '29ecb393-ec1c-407d-abbb-a6f82049a286',
          index: 12,
        },
        {
          step: 'the element #search contains the text KegHub/keg-hub',
          type: 'then',
          uuid: '22f11b4f-2c45-4599-842f-58454dab6a12',
          index: 13,
        },
      ],
    },
  ],
}


export const assembleBackAndEmptyRuleIndex = {
  uuid: "demo-4",
  feature: "demo",
  content: "Feature: demo\n  Background:\n  Rule: Rule: rule\n",
  path: "/demo-1.feature",
  parent: {
    uuid: "/goblet/repos/lancetipton/goblet/bdd/features/demo-1.feature",
    location: "/goblet/repos/lancetipton/goblet/bdd/features/demo-1.feature"
  },
  rules: [
    {
      index: 2,
      rule: "rule",
      scenarios: [],
      uuid: "rule--rule-10",
      whitespace: "  "
    }
  ],
  scenarios: [],
  index: 0,
  empty: [
    {
      content: "",
      index: 3
    }
  ],
  reason: [],
  comments: [],
  background: {
    index: 1,
    steps: [
      {
        step: "  ",
        uuid: "42f5842b-3c45-44fc-a16a-5fa55f4a1b73",
        type: "given",
        whitespace: "    "
      }
    ],
    background: "demo-4-background",
    uuid: "demo-4-background-17",
    whitespace: "  "
  }
}