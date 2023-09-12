export const flowAndContacts = `
  appId: com.android.contacts
  ---
  - launchApp
  - tapOn: "Create new contact"
  - tapOn: "First Name"
  - inputText: "John"
  - tapOn: "Last Name"
  - inputText: "Snow"
  - tapOn: "Save"
`

export const featureAndContacts = `
@appId=com.android.contacts
Feature: Create new contact
  Scenario:
    Given I launch the app
    When I tap "Create new contact"
    Then I tap "First Name"
    And I input "John"
    Then I tap "Last Name"
    And I input "Snow"
    Then I tap "Save"
`.trim()


export const flowWikiMedia = `
appId: org.wikimedia.wikipedia
name: Create new contact
tags:
  - advanced
---
- runFlow: "subflows/onboarding-ios.yaml"
- tapOn: "Search Wikipedia"
- runScript: "scripts/getSearchQuery.js"
- inputText: "{output.result}"
- assertVisible: "{output.result}"
`

export const featureWikiMedia = `
@appId=org.wikimedia.wikipedia @advanced
Feature: Create new contact
  Scenario:
    Given I run the flow "subflows/onboarding-ios.yaml"
    When I tap "Search Wikipedia"
    And I run the script "scripts/getSearchQuery.js"
    And I input "$world.output.searchQuery"
    Then the text "$world.output.searchQuery" is visible
`.trim()
