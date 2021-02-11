export const feature = `@search @google
Feature: Google Search
  As an internet user
  In order to find out more about Keg-Hub
  I want to be able to search for information about the Keg-Hub
  
  Scenario: Search the web for google
    Given I open the site https://www.google.com
    When I set keg-hub to the input .gLFyf
    When I press enter
    When I wait for the page to load
    Then the element #search contains the text simpleviewinc/keg-hub
`

export const parsedFeature = {
  feature: 'Google Search',
  // The uuid is different every time, so just comment it out for testing
  // uuid: 'b33c24bf-3b5d-4375-9853-600b1a3c383e',
  // Scenarios can include function identity, so comment out for testing
  // scenarios: [],
  tags: [ '@search', '@google' ],
  comments: {},
  text:
    '@search @google\n' +
    'Feature: Google Search\n' +
    '  As an internet user\n' +
    '  In order to find out more about Keg-Hub\n' +
    '  I want to be able to search for information about the Keg-Hub\n' +
    '  \n' +
    '  Scenario: Search the web for google\n' +
    '    Given I open the site https://www.google.com\n' +
    '    When I set keg-hub to the input .gLFyf\n' +
    '    When I press enter\n' +
    '    When I wait for the page to load\n' +
    '    Then the element #search contains the text simpleviewinc/keg-hub\n',
  perspective: 'As an internet user',
  reason: 'In order to find out more about Keg-Hub',
  desire: 'I want to be able to search for information about the Keg-Hub',
}
