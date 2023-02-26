import type { TParkinWorld } from '../src/types'

export const world:TParkinWorld = {
  $alias: {
    int: 500,
    float: 3.14,
    word: 'PARKIN',
    status: `failed`,
    element: 'test-element',
    comment: 'is a comment',
    background: 'world path values',
    firstScenario: `First Scenario Text`,
    string: 'Stored in the world object',
    url: 'https://lancetipton.github.io/parkin',
  },
  testMethod: function() {
    this.calledTestMethod = this.called || 0
    this.calledTestMethod += 1
  },
  feature: {
    comment: 'is a comment',
    background: {
      then: 'world path values',
    },
    scenario: {
      first: 'First Scenario Text',
    },
    status: 'failed',
  },
  app: {
    url: 'https://lancetipton.github.io/parkin',
  },
  types: {
    int: 500,
    float: 3.14,
    word: 'PARKIN',
    string: 'Stored in the world object',
  },
}