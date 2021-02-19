export const feature = `@search @google
Feature: Google Search
  As an internet user
  In order to find out more about Keg-Hub
  # Test comment in the feature meta
  I want to be able to search for information about the Keg-Hub
  
  Scenario: Search the web for google
    Given I open the site https://www.google.com
    When I set keg-hub to the input .gLFyf
    When I press enter
    # comment for testing in the scenario steps
    When I wait for the page to load
    Then the element #search contains the text simpleviewinc/keg-hub
`

export const parsedFeature = {
  index: 1,
  // The uuid is different every time, so comment it out for testing
  // uuid: 'b33c24bf-3b5d-4375-9853-600b1a3c383e',
  // Scenarios can include function identity, so comment out for testing
  // scenarios: [],
  content: '@search @google\n' +
    'Feature: Google Search\n' +
    '  As an internet user\n' +
    '  In order to find out more about Keg-Hub\n' +
    '  # Test comment in the feature meta\n' +
    '  I want to be able to search for information about the Keg-Hub\n' +
    '  \n' +
    '  Scenario: Search the web for google\n' +
    '    Given I open the site https://www.google.com\n' +
    '    When I set keg-hub to the input .gLFyf\n' +
    '    When I press enter\n' +
    '    # comment for testing in the scenario steps\n' +
    '    When I wait for the page to load\n' +
    '    Then the element #search contains the text simpleviewinc/keg-hub\n',
  feature: 'Google Search',
  tags: [ '@search', '@google' ],
  reason: [ { content: 'In order to find out more about Keg-Hub', index: 3 } ],
  comments: [
    { content: 'Test comment in the feature meta', index: 4 },
    { content: 'comment for testing in the scenario steps', index: 11 }
  ],
  perspective: { content: 'As an internet user', index: 2 },
  desire: {
    content: 'I want to be able to search for information about the Keg-Hub',
    index: 5
  }
}

export const promiseFeature = `@promises
Feature: Test Promises
  Scenario: Test definitions with promises 
    Given I wait for 1000
    Then the world test method should be called
`
