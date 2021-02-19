
// The uuid is different every time, so comment it out for testing
export const parsedScenarios = [
  {
    index: 7,
    scenario: 'Search the web for google',
    // uuid: 'f75d10d8-645c-4da0-b4b2-70696e3588b3',
    steps: [
      {
        step: 'I open the site https://www.google.com',
        type: 'given',
        // uuid: 'c257a2b9-2f34-42ac-b7e2-da4a843bc8ef',
        index: 8
      },
      {
        step: 'I set keg-hub to the input .gLFyf',
        type: 'when',
        // uuid: '2755d856-c6a9-41b2-bd63-508c2177011e',
        index: 9
      },
      {
        step: 'I press enter',
        type: 'when',
        // uuid: 'bb6b22bb-2555-49f6-8c5a-a0c1e8a22246',
        index: 10
      },
      {
        step: 'I wait for the page to load',
        type: 'when',
        // uuid: '29ecb393-ec1c-407d-abbb-a6f82049a286',
        index: 12
      },
      {
        step: 'the element #search contains the text simpleviewinc/keg-hub',
        type: 'then',
        // uuid: '22f11b4f-2c45-4599-842f-58454dab6a12',
        index: 13
      }
    ]
  }
]