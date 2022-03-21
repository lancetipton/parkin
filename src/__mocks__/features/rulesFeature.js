export const rulesFeature = `@rules @background
Feature: Rules steps
  # This is a test comment
  Background:
    Given that background exists
    Then the background steps should be called before each rules scenario

  Rule: This is Rule 1
    Example: Run scenario after the first rule
      Given that this Feature has a background
      Then this rules scenario's steps should be run after the background's steps

    Scenario: Run second rule scenario after a second background
      Given that a second scenario exists
      Then the rules second scenario's steps should be run after a second background's steps

  Rule: This is Rule 2
    Scenario: Run scenario inside of Rule 2
      Given that this Feature has two rules
      Then this scenario's steps should be run after the the first rules steps

    Example: Run second scenario after the second rules first scenario 
      Given that a second scenario exists in the second rule
      Then the second scenario's steps should be run after a second rules scenario steps
`
