export const maestroFeature = `
  @appId=my.app @ENV_USER=me @ENV_PASS=123
  Feature: Log into app

  @before
  Scenario: Before running tests
    * run the flow "setup.yaml"
    * run the script "setup.js"

  Scenario:
    Given I launch the app
    When I tap the "Login" "text"
    Then the "text" "Username" is "visible"

  @after
  Scenario: After running tests
    * run flow "teardown.yaml"
    * run script "teardown.js"

`.trim()


export const maestroFlow = `
appId: "my.app"
name: "Log into app"
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

