

export const bgStepTagsFeature = `@has-bg-tags-n-step-tags
Feature: Background steps
  # This is a test comment

  @bg-tag @bg-tag-2
  Background:
    Given that background has steps with tags exists
    @bg-step-tag @bg-step-tag-2
    Then the background steps should be parsed with tags

  Scenario: Run scenario with step tags
    @sc1-step-tag @sc1-step-tag-2
    Given that this Feature has a background
    # Not a tag, this is a comment
    Then this scenario's steps should be run

  @sc2-tag @sc2-tag-2
  Scenario: Run second scenario with tags and step tags
    @sc2-step-tag @sc2-step-tag-2
    Given that a second scenario exists
    Then the second scenario's steps should be run

  @sc3-tag @sc3-tag-2
  Scenario: Run second scenario with multiple steps with tags
    @sc3-step-tag @sc3-step-tag-2
    Given that a third scenario exists
    @sc3-step2-tag @sc3-step2-tag-2
    Then the third scenario's steps should be run

  @sc4-tag @sc4-tag-2
  Scenario: Run second scenario with multiple steps with tags
    @sc4-step-tag @sc4-step-tag-2
    Given that a forth scenario exists
    When I have a step with no tags
    @sc4-step3-tag @sc4-step3-tag-2
    And the next step has tags
    Then the And step should have the tags

`