import { TFeatureAst, EAstObject, EStepType } from '../types'


export const dataMapperMocks = {
  tags: {
    current: { tokens: [`foo`] },
    updated: { tokens: [`foo`] }
  },
  steps: {
    current: [
      { uuid: `1`, step: `step 1`, type: `Given` },
      { uuid: `2`, step: `step 2`, type: `When` },
    ],
    updated: [
      { uuid: `1`, step: `step 1`, type: `Given` },
      { uuid: `2`, step: `updated step 2`, type: `When` },
      { uuid: `3`, step: `new step 3`, type: `Then` },
    ],
    expected: [
      { uuid: `1`, step: `step 1`, type: `Given` },
      { uuid: `2`, step: `updated step 2`, type: `When` },
      { uuid: `3`, step: `new step 3`, type: `Then` },
    ]
  },
  parentSteps: {
    exSteps: [{ uuid: `exUUID`, type: `given`, step: `Ex step` }],
    exTags: { uuid: `exUUID`, tokens: [`@ex`], content: `@ex` },
    uSteps: [{ uuid: `uUUID`, type: `given`, step: `Updated step` }],
    uTags: { uuid: `uUUID`, tokens: [`@u`], content: `@u` },
    expectedTags: { uuid: `uUUID`, content: `@ex @u`, tokens: [`@ex`, `@u`]},
    updatedTags: { uuid: `uUUID`, content: `@ex @u @new`, tokens: [`@ex`, `@u`, `@new`] },
  },
  scenarios: {
    current: [
      { uuid: `1`, scenario: `scenario 1` },
      { uuid: `2`, scenario: `scenario 2`, steps: [] },
    ],
    updated: [
      { uuid: `1`, scenario: `scenario 1` },
      { uuid: `2`, scenario: `scenario 2`, steps: [{uuid: `3`, step: `step 3`}] },
    ],
    expected: [
      { uuid: `1`, scenario: `scenario 1`, steps: [] },
      { uuid: `2`, scenario: `scenario 2`, steps: [] },
    ],
  },
  background: {
    current: {
      uuid: `background-uuid`,
      steps: [
        {
          uuid: `step-uuid-1`,
          type: `Given`,
          step: `a precondition`
        },
        {
          uuid: `step-uuid-2`,
          type: `When`,
          step: `an action is performed`
        }
      ]
    },
    updated: {
      uuid: `background-uuid`,
      steps: [
        {
          uuid: `step-uuid-1`,
          type: `Given`,
          step: `a precondition`
        },
        {
          uuid: `step-uuid-2`,
          type: `When`,
          step: `a different action is performed`
        },
        {
          uuid: `step-uuid-3`,
          type: `Then`,
          step: `an expected result is obtained`
        }
      ]
    },
    updatedWithoutSteps: {
      uuid: `background-uuid`,
      steps: [],
    },
    expected: {
        uuid: `background-uuid`,
        steps: [
          {
            uuid: `step-uuid-1`,
            type: `Given`,
            step: `a precondition`
          },
          {
            uuid: `step-uuid-2`,
            type: `When`,
            step: `a different action is performed`
          },
          {
            uuid: `step-uuid-3`,
            type: `Then`,
            step: `an expected result is obtained`
          }
        ]
    }
  },
  rules:{
    currentRule1: {
      uuid: `abc`,
      rule: `Rule 1`,
      scenarios: [{ uuid: `xyz`, scenario: `Scenario 1`, steps: [] }],
    },
    currentRule2: {
      uuid: `def`,
      rule: `Rule 2`,
      scenarios: [{ uuid: `uvw`, scenario: `Scenario 2`, steps: [] }],
    },
    updatedRule1: {
      uuid: `abc`,
      rule: `Updated Rule 1`,
      scenarios: [
        { uuid: `xyz`, scenario: `Updated Scenario 1`, steps: [] },
        { uuid: `pqr`, scenario: `New Scenario`, steps: [] },
      ],
    },
    updatedRule2: {
      uuid: `def`,
      rule: `Rule 2`,
      scenarios: [],
    },
    newRule: {
      uuid: `12345`,
      rule: `New Rule`,
      scenarios: [],
    }
  }
}


export const mockFeatToIdx:TFeatureAst = {
  index: 1,
  content: ``,
  type: EAstObject.feature,
  feature: `Mock Indexed Feature`,
  tags: {
    index: 0,
    uuid: `435`,
    type: EAstObject.tags,
    content: "tag1 tag2",
    tokens: ["tag1", "tag2"],
  },
  empty: [
    {
      index: 2,
      uuid: `4-0976`,
      content: ``,
      type: EAstObject.empty,
    },
  ],
  comments: [
    {
      index: 3,
      uuid: `1-0976`,
      content: `# comment`,
      type: EAstObject.comment,
    },
  ],
  desire: {
    index: 4,
    uuid: `0976`,
    content: `desire desire`,
    type: EAstObject.desire,
  },
  perspective: {
    index: 5,
    uuid: `125456`,
    content: `perspective perspective`,
    type: EAstObject.perspective,
  },
  reason: {
    index: 6,
    uuid: `1254`,
    content: `reason reason`,
    type: EAstObject.reason,
  },
  background: {
    index: 7,
    uuid: `back-7`,
    background: `background 7`,
    type: EAstObject.background,
    steps: [
      {
        index: 8,
        step: `Step`,
        uuid: `123`,
        whitespace: `    `,
        type: EStepType.given,
      },
    ],
  },
  rules: [
    {
      index: 9,
      rule: `rule 1`,
      uuid: `rule-1`,
      type: EAstObject.rule,
      tags: {
        index: 10,
        uuid: `435`,
        type: EAstObject.tags,
        content: "rule_tag1 rule_tag2",
        tokens: ["rule_tag1", "rule_tag2"],
      },
      scenarios: [
        {
          index: 11,
          uuid: `scen-1`,
          scenario: `scenario 1`,
          type: EAstObject.scenario,
          tags: {
            index: 12,
            uuid: `433`,
            type: EAstObject.tags,
            content: `scenario_tag1 scenario_tag2`,
            tokens: ["scenario_tag1", "scenario_tag2"],
          },
          steps: [
            {
              index: 13,
              uuid: `321`,
              step: `Some text`,
              whitespace: `  `,
              type: EStepType.given,
            },
          ],
        },
      ],
      background: {
        index: 14,
        uuid: `back-1`,
        background: `background 1`,
        type: EAstObject.background,
        steps: [
          {
            index: 15,
            uuid: `3321`,
            step: `Some text`,
            whitespace: `  `,
            type: EStepType.given,
          },
        ],
      },
    },
  ],
  scenarios: [
    {
      index: 16,
      uuid: `scen-45`,
      scenario: `scenario 45`,
      type: EAstObject.scenario,
      tags: {
        index: 17,
        uuid: `433`,
        type: EAstObject.tags,
        content: "scenario_tag1 scenario_tag2",
        tokens: ["scenario_tag1", "scenario_tag2"],
      },
      steps: [
        {
          index: 18,
          uuid: `9876`,
          step: `Some other text`,
          whitespace: `  `,
          type: EStepType.given,
        },
      ],
    },
  ],
}

export const indexesMocks = {
  feature: {
    type: EAstObject.feature,
    feature: `feature`,
    uuid: 'a',
    index: 1,
    empty: [],
    rules: [],
    comments:[],
    scenarios:[],
    whitespace: ``,
  },
  step: {
    index: 8,
    step: `step`,
    uuid: `uuid`,
    type: EAstObject.step,
  },
  rule: {
    index: 5,
    scenarios:[],
    rule: `rule`,
    whitespace: `  `,
    uuid: `rule-uuid`,
    type: EAstObject.rule,
  },
  scenario: {
    index: 7,
    steps: [],
    whitespace: `  `,
    scenario: `scenario`,
    uuid: `scenario-uuid`,
    type: EAstObject.scenario,
  },
  background: {
    index: 6,
    steps: [],
    uuid: `bg-uuid`,
    whitespace: `  `,
    background: `background`,
    type: EAstObject.background,
  },
  desire: {
    index: 3,
    content: `desire`,
    uuid: `desire-uuid`,
    type: EAstObject.desire,
  },
  perspective: {
    index: 2,
    content: `perspective`,
    uuid: `perspective-uuid`,
    type: EAstObject.perspective,
  },
  reason: {
    index: 4,
    content: `reason`,
    uuid: `reason-uuid`,
    type: EAstObject.reason,
  },
  tags: {
    index: 0,
    uuid: `tags`,
    type: EAstObject.tags,
    content: `@tag1 @tag2`,
    tokens: [`@tag1`, `@tag2`]
  },
}
