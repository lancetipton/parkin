@step @fail
Feature: Step Fails
  Scenario: Skip scenario steps when a step fails
    Given that the default describe is overwritten
    And this step fails
    Then this step should be skipped
    And this step should also be skipped
