
export const brokenFeatureScenario = `Features: demos

Scenario:`


export const emptyFeatureStep = `@demo
Feature: Show demo of Goblet Platform
  As a creator of the Goblet Platform
  I want to show a demo of its functionality
  So that others can see how it works

  Scenario: Navigate the Goblog
    Given I navigate to "https://www.gobletqa.com"

    Given `
    

export const emptyScenario = `@demo
Feature: Show demo of Goblet Platform
  As a creator of the Goblet Platform
  I want to show a demo of its functionality
  So that others can see how it works
  Rule: rule
    Scenario:  
  Scenario: Navigate the Goblog
    Given I navigate to "https://www.gobletqa.com"`


export const malformedStep = `@broken
Feature: Steps with multiple params
  Scenario: Multi-step params
    I have 3 types of "apples" out of a total of 10

    # The text '3rd' should not be quoted because it's a word, not string
    And there are 3 "apples" in the '3rd' "barrel"`
