Feature: Test
  # This is a test comment
  Background:
    Given I open the site "https://www.google.com"
    # This is another comment

  Scenario: Search the google for keg-hub
    When I set "keg-hub" to the input ".gLFyf"
    # Comment in the first Scenario
    When I press the key "enter"
    When I wait for the page to load
    Then the element "#search" contains the text "KegHub/keg-hub"
# Comment in-between Scenarios
  Scenario: Search the google for parkin
    When I set "@ltipton/parkin" to the input ".gLFyf"
    When I press the key "enter"
    When I wait for the page to load
    Then the element "#search" contains the text "parkin"
        # Comment at end of Scenarios
