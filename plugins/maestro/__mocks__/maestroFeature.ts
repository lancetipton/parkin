
export const maestroSimpleFeature = `
Feature: Log into app

  Scenario:
    Given the app id is "my.app"
    And I launch the app
    When I tap the "Login" "text"
    Then the "text" "Username" is "visible"
`.trim()


export const maestroSimpleFlow = `
appId: "my.app"
name: "Log into app"
---
- launchApp
- tapOn:
    text: "Login"
- assertVisible:
    text: "Username"
`.trim()


export const maestroFeature = `
@appId=my.app @ENV_USER=me @ENV_PASS=123 @feature-to-flow
Feature: Log into app

  @before
  Scenario: Before running tests
    * I run the flow "setup.yaml"
    * I run the script "setup.js"

  Scenario:
    Given I launch the app
    When I tap the "Login" "text"
    Then the "text" "Username" is "visible"

  @after
  Scenario: After running tests
    * I run the flow "teardown.yaml"
    * I run the script "teardown.js"

`.trim()


export const maestroFlow = `
appId: "my.app"
name: "Log into app"
tags:
    - feature-to-flow
env:
    USER: me
    PASS: 123
onFlowStart:
    - runFlow: "setup.yaml"
    - runScript: "setup.js"
onFlowComplete:
    - runFlow: "teardown.yaml"
    - runScript: "teardown.js"
---
- launchApp
- tapOn:
    text: "Login"
- assertVisible:
    text: "Username"
`.trim()

