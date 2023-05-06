export const featureRulesScenarios = `@rules @scenarios
Feature: Full set of functionality in feature files
  # This is a test comment
  Background:
    Given that background exists
    Then the background steps should be called before each rules scenario

  @scenario-before-rules-tag
  Scenario: Scenario before rules
    Given that a scenario exists before the rule
    Then it should not be part of any rules

  @rule-1-tag
  Rule: This is Rule 1
    Example: Run first rule - first scenario
      Given that this Feature has a background
      Then this rules scenario's steps should be run after the background's steps

    @rule-1-scenario-tag
    Scenario: Run first rule - second scenario
      Given that a second scenario exists
      Then the rules second scenario's steps should be run after a second background's steps

  @scenario-in-between-rules-tag
  Scenario: Scenario in-between rules
    Given that a scenario exists in-between the rules
    Then it should not be part of any rules

  @rule-2-tag @extra-rule-2-tag
  Rule: This is Rule 2
    Background:
      Given that Rule 2 has a background
      Then the background steps should be in the second parsed rule

    @example-tag @extra-example-tag
    Example: Run second rule first example
      Given that this Feature second rule
      Then this rules scenario's steps should be part of the second rules scenario

  @scenario-after-rules-tag @last-scenario-tag
  Scenario: Scenario after rules
    Given that a scenario exists after the rules
    Then it should not be part any rules`
