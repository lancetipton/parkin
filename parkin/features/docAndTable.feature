Feature: docs-and-tables

  Scenario: Parse step with doc-string ticks
    Given I have the following doc-string data using type tick
      ```
        Test tick data to be parsed
      ```
    Then the doc-string data should be "Test tick data to be parsed"

  Scenario: Parse step with doc-table
    Given the following users exist
      | name   | email            | tag     |
      | Jon    | jon@parkin.io    | @jon    |
      | Jacob  | jacob@parkin.io  | @jacob  |
      | Jingle | jingle@parkin.io | @jingle |
    Then the user table should should have user @jon
    And the user table should should have user Jacob
    And the user table should should have user jingle@parkin.io

  Scenario: Parse step with doc-string quotes
    Given I have the following doc-string data using type quote
      """
      Test quote data to be parsed
      That is two lines
      """
    Then the doc-string data should be "Test quote data to be parsed\nThat is two lines"
