export const backgroundFeature = `@background
Feature: Background steps
  # This is a test comment
  Background:
    Given that background exists
    Then the background steps should be called before each scenario

  Scenario: Run scenario after the background
    Given that this Feature has a background
    Then this scenario's steps should be run after the background's steps

  Scenario: Run second scenario after a second background
    Given that a second scenario exists
    Then the second scenario's steps should be run after a second background's steps
`
