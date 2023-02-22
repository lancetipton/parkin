export const featureFull = `@rules @background
Feature: Full set of functionality in feature files
  # This is a test comment
  Background:
    Given that background exists
    Then the background steps should be called before each rules scenario

  Rule: This is Rule 1
    Example: Run scenario after the first rule
      Given that this Feature has a background
      Then this rules scenario's steps should be run after the background's steps

    Scenario: Run second rule scenario after a second background
      Given that a second scenario exists
      Then the rules second scenario's steps should be run after a second background's steps

  Scenario: Scenario after rule
    Given that a scenario exists after the rule
    Then it should not be part of the rule

`

export const parsedFeatureFull = {
  index: 1,
  content: '@rules @background\n' +
    'Feature: Full set of functionality in feature files\n' +
    '  # This is a test comment\n' +
    '  Background:\n' +
    '    Given that background exists\n' +
    '    Then the background steps should be called before each rules scenario\n' +
    '\n' +
    '  Rule: This is Rule 1\n' +
    '    Example: Run scenario after the first rule\n' +
    '      Given that this Feature has a background\n' +
    "      Then this rules scenario's steps should be run after the background's steps\n" +
    '\n' +
    '    Scenario: Run second rule scenario after a second background\n' +
    '      Given that a second scenario exists\n' +
    "      Then the rules second scenario's steps should be run after a second background's steps\n" +
    '\n',
  feature: 'Full set of functionality in feature files',
  tags: [ '@rules', '@background' ],
  rules: [
    {
      index: 7,
      rule: 'This is Rule 1',
      tags: [],
      scenarios: [
        {
          index: 8,
          scenario: 'Run scenario after the first rule',
          tags: [],
          steps: [
            {
              type: 'given',
              index: 9,
              step: 'that this Feature has a background',
              uuid: 'given-that-this-feature-has-a-background-40'
            },
            {
              type: 'then',
              index: 10,
              step: "this rules scenario's steps should be run after the background's steps",
              uuid: 'then-this-rules-scenario-s-steps-should-be-run-after-the-background-s-steps-75'
            }
          ],
          uuid: 'run-scenario-after-the-first-rule-33'
        },
        {
          index: 12,
          scenario: 'Run second rule scenario after a second background',
          tags: [],
          steps: [
            {
              type: 'given',
              index: 13,
              step: 'that a second scenario exists',
              uuid: 'given-that-a-second-scenario-exists-35'
            },
            {
              type: 'then',
              index: 14,
              step: "the rules second scenario's steps should be run after a second background's steps",
              uuid: 'then-the-rules-second-scenario-s-steps-should-be-run-after-a-second-background-s-steps-86'
            }
          ],
          uuid: 'run-second-rule-scenario-after-a-second-background-50'
        }
      ],
      uuid: 'this-is-rule-1-14'
    }
  ],
  reason: [],
  comments: [ { content: '  # This is a test comment', index: 2 } ],
  scenarios: [],
  uuid: 'full-set-of-functionality-in-feature-files-42',
  background: {
    index: 3,
    steps: [
      {
        type: 'given',
        index: 4,
        step: 'that background exists',
        uuid: 'given-that-background-exists-28'
      },
      {
        type: 'then',
        index: 5,
        step: 'the background steps should be called before each rules scenario',
        uuid: 'then-the-background-steps-should-be-called-before-each-rules-scenario-69'
      }
    ],
    background: 'full-set-of-functionality-in-feature-files-42-background',
    uuid: 'full-set-of-functionality-in-feature-files-42-background-56'
  }
}