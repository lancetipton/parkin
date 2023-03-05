@rules @scenarios
Feature: Full set of functionality in feature files
  # This is a test comment
  Background:
    Given that background exists
    Then the background steps should be called before each rules scenario

  Scenario: Scenario before rules
    Given that a scenario exists before the rule
    Then it should not be part of any rules

  Rule: This is Rule 1
    Example: Run first rule - first scenario
      Given that this Feature has a background
      Then this rules scenario's steps should be run after the background's steps

    Scenario: Run first rule - second scenario
      Given that a second scenario exists
      Then the rules second scenario's steps should be run after a second background's steps

  Scenario: Scenario in-between rules
    Given that a scenario exists in-between the rules
    Then it should not be part of any rules

  Rule: This is Rule 2
    Background:
      Given that Rule 2 has a background
      Then the background steps should be in the second parsed rule

    Example: Run second rule first example
      Given that this Feature second rule
      Then this rules scenario's steps should be part of the second rules scenario

  Scenario: Scenario after rules
    Given that a scenario exists after the rules
    Then it should not be part any rules
