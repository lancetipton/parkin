Feature: Parse Steps

  Scenario: Parse step with doc-string ticks
    Given I have the following doc-string data in ticks
      \`\`\`
        Test tick data to be parsed
      \`\`\`
    Then the doc-string data should be "Test tick data to be parsed"

  Scenario: Parse step with doc-table
    Given the following users exist:
      | name   | email            | tag     |
      | Jon    | jon@parkin.io    | @jon    |
      | Jacob  | jacob@parkin.io  | @jacob  |
      | Jingle | jingle@parkin.io | @jingle |

  Scenario: Parse step with doc-string quotes
    Given I have the following doc-string data in quotes
      """
      Test quote data to be parsed
      That is two lines
      """
    Then the doc-string data should be "Test quote data to be parsed"

  Scenario: Parse step with doc-table-2
    And I provide below information during registration
      | first | Tom                     |
      | last  | Jerry                   |
      | phone | 123456789               |
      | email | tomandjerry@cartoon.com |
