@world
Feature: World Replace steps
  # This $world.feature.comment from the world object
  Background:
    Given that a world object exists
    Then "$world.feature.background.then" should be replaced

  Scenario: $world.feature.scenario.first
    Given that the app url is "$world.app.url"
    And the element "$world.alias.element" exists
    When we set the worlds feature status to "passing"
    Then this features status should be "$:world.feature.status"
    And this path $world.does.not.exist should not be replaced

  Scenario: Second Scenario Text
    Given that there are different replace types
    Then world replace should work with an integer $world.types.int
    And world replace should work with a float $world.types.float
    And world replace should work with a word $world.types.word
    And world replace should work with a string "$world.types.string"
