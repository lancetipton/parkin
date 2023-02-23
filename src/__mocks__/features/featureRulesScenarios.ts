export const featureRulesScenarios = `@rules @scenarios
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
    Then it should not be part any rules`

export const parsedFeatureRulesScenarios = {
  index: 1,
  content: '...',
  feature: 'Full set of functionality in feature files',
  tags: [ '@rules', '@scenarios' ],
  rules: [
    {
      index: 11,
      rule: 'This is Rule 1',
      tags: [],
      scenarios: [
        {
          index: 12,
          scenario: "Run first rule - first scenario",
          alias: "Example",
          tags: [],
          steps: [
            {
              type: "given",
              index: 13,
              step: "that this Feature has a background",
              whitespace: "      ",
              uuid: "given-that-this-feature-has-a-background-40"
            },
            {
              type: "then",
              index: 14,
              step: "this rules scenario's steps should be run after the background's steps",
              whitespace: "      ",
              uuid: "then-this-rules-scenario-s-steps-should-be-run-after-the-background-s-steps-75"
            }
          ],
          uuid: "run-scenario-after-the-first-rule-33",
          whitespace: "    "
        },
        {
          index: 16,
          scenario: "Run first rule - second scenario",
          tags: [],
          steps: [
            {
              type: "given",
              index: 17,
              step: "that a second scenario exists",
              whitespace: "      ",
              uuid: "given-that-a-second-scenario-exists-35"
            },
            {
              type: "then",
              index: 18,
              step: "the rules second scenario's steps should be run after a second background's steps",
              whitespace: "      ",
              uuid: "then-the-rules-second-scenario-s-steps-should-be-run-after-a-second-background-s-steps-86"
            }
          ],
          uuid: "run-second-rule-scenario-after-a-second-background-50",
          whitespace: "    "
        }
      ],
      uuid: 'this-is-rule-1-14',
      whitespace: '  '
    },
    {
      index: 24,
      rule: 'This is Rule 2',
      tags: [],
      background: {
        index: 25,
        steps: [
          {
            type: 'given',
            index: 26,
            step: 'that Rule 2 has a background',
            whitespace: '      ',
            uuid: 'given-that-rule-2-has-a-background-34'
          },
          {
            type: 'then',
            index: 27,
            step: 'the background steps should be in the second parsed rule',
            whitespace: '      ',
            uuid: 'then-the-background-steps-should-be-in-the-second-parsed-rule-61'
          }
        ],
        background: 'this-is-rule-2-14-background',
        uuid: 'this-is-rule-2-14-background-28',
        whitespace: '    '
      },
      scenarios: [
        {
          index: 25,
          alias: "Example",
          scenario: "Run second rule first example",
          tags: [],
          steps: [
            {
              type: "given",
              index: 26,
              step: "that this Feature second rule",
              whitespace: "      ",
              uuid: "given-that-this-feature-second-rule-35"
            },
            {
              type: "then",
              index: 27,
              step: "this rules scenario's steps should be part of the second rules scenario",
              whitespace: "      ",
              uuid: "then-this-rules-scenario-s-steps-should-be-part-of-the-second-rules-scenario-76"
            }
          ],
          uuid: "run-scenario-after-in-between-rule-34",
          whitespace: "    "
        }
      ],
      uuid: 'this-is-rule-2-14',
      whitespace: '  '
    }
  ],
  reason: [],
  comments: [ { content: '  # This is a test comment', index: 2 } ],
  scenarios: [
    {
      index: 7,
      scenario: "Scenario before rules",
      tags: [],
      steps: [
        {
          type: "given",
          index: 8,
          step: "that a scenario exists before the rule",
          whitespace: "    ",
          uuid: "given-that-a-scenario-exists-before-the-rule-44"
        },
        {
          type: "then",
          index: 9,
          step: "it should not be part of any rules",
          whitespace: "    ",
          uuid: "then-it-should-not-be-part-of-any-rules-39"
        }
      ],
      uuid: "scenario-before-rule-20",
      whitespace: "  "
    },
    {
      index: 20,
      scenario: "Scenario in-between rules",
      tags: [],
      steps: [
        {
          type: "given",
          index: 21,
          step: "that a scenario exists in-between the rules",
          whitespace: "    ",
          uuid: "given-that-a-scenario-exists-in-between-the-rules-49"
        },
        {
          type: "then",
          index: 22,
          step: "it should not be part of any rules",
          whitespace: "    ",
          uuid: "then-it-should-not-be-part-of-any-rules-39"
        }
      ],
      uuid: "scenario-in-between-rules-25",
      whitespace: "  "
    },
    {
      index: 29,
      scenario: "Scenario after rules",
      tags: [],
      steps: [
        {
          type: "given",
          index: 30,
          step: "that a scenario exists after the rules",
          whitespace: "    ",
          uuid: "given-that-a-scenario-exists-after-the-rules-44"
        },
        {
          type: "then",
          index: 31,
          step: "it should not be part any rules",
          whitespace: "    ",
          uuid: "then-it-should-not-be-part-any-rules-36"
        }
      ],
      uuid: "scenario-after-rule-19",
      whitespace: "  "
    }
  ],
  uuid: 'full-set-of-functionality-in-feature-files-42',
  background: {
    index: 3,
    steps: [
      {
        type: "given",
        index: 4,
        step: "that background exists",
        whitespace: "    ",
        uuid: "given-that-background-exists-28"
      },
      {
        type: "then",
        index: 5,
        step: "the background steps should be called before each rules scenario",
        whitespace: "    ",
        uuid: "then-the-background-steps-should-be-called-before-each-rules-scenario-69"
      }
    ],
    background: 'full-set-of-functionality-in-feature-files-42-background',
    uuid: 'full-set-of-functionality-in-feature-files-42-background-56',
    whitespace: '  '
  }
}