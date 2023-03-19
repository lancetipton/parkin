import { testUUid } from '../helpers'

export const parsedFeature = {
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
  type: `feature`,
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
      type: `empty`,
      uuid: testUUid,
      whitespace: ``,
    },
  ],
  reason: [
    {
      content: 'In order to find out more about Keg-Hub',
      index: 3,
      type: `reason`,
      uuid: testUUid,
      whitespace: `  `,
    },
  ],
  comments: [
    // Comments are stored globally, so we keep the full white space of it
    // This allows us to format it relative to adjoining lines
    {
      content: '# Test comment in the feature meta',
      index: 4,
      type: `comment`,
      uuid: testUUid,
      whitespace: `  `,
    },
    {
      content: '# comment for testing in the scenario steps',
      index: 11,
      type: `comment`,
      uuid: testUUid,
      whitespace: `    `,
    },
    // { content: 'Test comment in the feature meta', index: 4 },
    // { content: 'comment for testing in the scenario steps', index: 11 }
  ],
  perspective: {
    index: 2,
    uuid: testUUid,
    type: `perspective`,
    whitespace: `  `,
    content: 'As an internet user',
  },
  desire: {
    index: 5,
    type: `desire`,
    uuid: testUUid,
    whitespace: `  `,
    content: 'I want to be able to search for information about the Keg-Hub',
  },
  rules: [],
  scenarios: [
    {
      index: 7,
      type: `scenario`,
      scenario: 'Search the web for google',
      uuid: testUUid,
      steps: [
        {
          step: 'I open the site https://www.google.com',
          type: 'given',
          uuid: testUUid,
          index: 8,
        },
        {
          step: 'I set keg-hub to the input .gLFyf',
          type: 'when',
          uuid: testUUid,
          index: 9,
        },
        {
          step: 'I press enter',
          type: 'when',
          uuid: testUUid,
          index: 10,
        },
        {
          step: 'I wait for the page to load',
          type: 'when',
          uuid: testUUid,
          index: 12,
        },
        {
          step: 'the element #search contains the text KegHub/keg-hub',
          type: 'then',
          uuid: testUUid,
          index: 13,
        },
      ],
    },
  ],
}
