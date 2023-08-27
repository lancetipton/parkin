
export const passResult1 = {
  id: `spec-0`,
  action: `test`,
  testPath: `/suite-0-0/spec-0`,
  fullName: `Background > $world.feature.scenario.first > Given that a world object exists`,
  type: `test`,
  failedExpectations: [],
  passedExpectations: [],
  failed: false,
  passed: true,
  description: `Given that a world object exists`,
  timestamp: 1693171266645,
  metaData: {
    disabled: false,
    uuid: `feature-796586501.background.0.given.0`,
    step: `that a world object exists`,
    index: 4,
    type: `given`
  },
  status: `passed`
}
export const passResult2 = {
  id: `spec-1`,
  action: `test`,
  testPath: `/suite-0-0/spec-1`,
  fullName: `Background > $world.feature.scenario.first > Then "$world.feature.background.then" should be replaced`,
  type: `test`,
  failedExpectations: [],
  passedExpectations: [],
  failed: false,
  passed: true,
  description: `Then "$world.feature.background.then" should be replaced`,
  timestamp: 1693171266646,
  metaData: {
    disabled: false,
    uuid: `feature-796586501.background.0.then.1`,
    step: `"$world.feature.background.then" should be replaced`,
    index: 5,
    type: `then`
  },
  status: `passed`
}

export const describePassResult = {
  tests: [
    passResult1,
    passResult2
  ],
  id: `suite-0-0`,
  action: `end`,
  testPath: `/suite-0-0`,
  fullName: `Background > $world.feature.scenario.first`,
  type: `describe`,
  failedExpectations: [],
  passedExpectations: [],
  failed: false,
  passed: true,
  description: `Background > $world.feature.scenario.first`,
  timestamp: 1693171266644,
  metaData: {
    disabled: false,
    index: 3,
    uuid: `feature-796586501.background.0`,
    type: `background`,
    background: ``
  },
}

export const suitePassResult = {
  id: `suite-0`,
  action: `end`,
  testPath: `/suite-0`,
  fullName: `Feature > World Replace steps`,
  type: `describe`,
  failedExpectations: [],
  passedExpectations: [],
  failed: false,
  passed: true,
  description: `Feature > World Replace steps`,
  timestamp: 1693171266644,
  metaData: {
    disabled: false,
    index: 1,
    uuid: `feature-796586501`,
    tags: {
      index: 0,
      tokens: [ `@world` ],
      content: `@world`,
      type: `tags`,
      uuid: `tags-1328805330`,
      whitespace: ``
    },
    feature: `World Replace steps`,
    type: `feature`
  },
  describes: [describePassResult],
  tests: []
}

export const failResult = {
  id: `spec-1`,
  action: `test`,
  testPath: `/suite-0-0/spec-1`,
  fullName: `Background > $world.feature.scenario.first > Then "$world.feature.background.then" should be replaced`,
  type: `test`,
  failedExpectations: [{
    status: `failed`,
    fullName: `Mock failed test`,
    description: `Failed test error`,
    error: {
      name: `Mock Error`,
      message: `Failed test error`,
      stack: `Failed test error\nMock Data\nAnother line`
    },
  }],
  passedExpectations: [],
  failed: true,
  passed: false,
  description: `Then "$world.feature.background.then" should be replaced`,
  timestamp: 1693171266646,
  metaData: {
    disabled: false,
    uuid: `feature-796586501.background.0.then.1`,
    step: `"$world.feature.background.then" should be replaced`,
    index: 5,
    type: `then`
  },
  status: `failed`
}

export const describeFailResult = {
  tests: [failResult],
  id: `suite-0-0`,
  action: `end`,
  testPath: `/suite-0-0`,
  fullName: `Background > $world.feature.scenario.first`,
  type: `describe`,
  failedExpectations: [],
  passedExpectations: [],
  failed: true,
  passed: false,
  description: `Background > $world.feature.scenario.first`,
  timestamp: 1693171266644,
  metaData: {
    disabled: false,
    index: 3,
    uuid: `feature-796586501.background.0`,
    type: `background`,
    background: ``
  },
}

export const suiteFailResult = {
  id: `suite-0`,
  action: `end`,
  testPath: `/suite-0`,
  fullName: `Feature > World Replace steps`,
  type: `describe`,
  failedExpectations: [],
  passedExpectations: [],
  failed: true,
  passed: false,
  description: `Feature > World Replace steps`,
  timestamp: 1693171266644,
  metaData: {
    disabled: false,
    index: 1,
    uuid: `feature-796586501`,
    tags: {
      index: 0,
      tokens: [ `@world` ],
      content: `@world`,
      type: `tags`,
      uuid: `tags-1328805330`,
      whitespace: ``
    },
    feature: `World Replace steps`,
    type: `feature`
  },
  describes: [describeFailResult],
  tests: []
}

export const testResults = [suitePassResult, suiteFailResult]
