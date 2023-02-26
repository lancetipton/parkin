@world
Feature: Alias Replace steps
  # This $$comment from the world.$alias object
  Background:
    Given that a world.$alias object exists
    Then "$$background" should be replaced with an alias value

  Scenario: $$firstScenario
    Given that the world.$alias.url is "$$url"
    And the alias element "$$element" exists
    When we set the world.$alias.status to "passing"
    Then this features status should be a dynamic alias of "$$:status"
    And this path $$doesNotExist alias should not be replaced

  Scenario: Second Scenario Text
    Given that there are different replace types
    Then world replace should work with an integer $$int
    And world replace should work with a float $$float
    And world replace should work with a word $$word
    And world replace should work with a string "$$string"

