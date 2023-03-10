import { TStepDef } from '../../types'
import { tokenizeStep } from '../tokens'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const matchTexts = [
  `I eat 4 from a total of {int} "green" apple(s)`,
  `I eat {int} from a total of {int} {word} apple(s)`,
  `I eat 4 from a total of {int} {word} apple(s)`,
  `I eat 4 from a total of 20 "red" apple(s)`,
  `I eat {string} from the {word}`,
  `I eat "all the apples" from the {word}`,
  `I eat {string} from the "bin"`,
]

const outputs = [
  [
    { match: '4', defIndex: 6, index: 6, type: 'int' },
    { match: '{int}', defIndex: 28, index: 24, type: 'int' },
    { match: '"green"', defIndex: 34, index: 30, type: 'word' }
  ],
  [
    { match: '{int}', defIndex: 6, index: 6, type: 'int' },
    { match: '{int}', defIndex: 28, index: 28, type: 'int' },
    { match: '{word}', defIndex: 34, index: 34, type: 'word' }
  ],
  [
    { match: '4', defIndex: 6, index: 6, type: 'int' },
    { match: '{int}', defIndex: 28, index: 24, type: 'int' },
    { match: '{word}', defIndex: 34, index: 30, type: 'word' }
  ],
  [
    { match: '4', defIndex: 6, index: 6, type: 'int' },
    { match: '20', defIndex: 28, index: 24, type: 'int' },
    { match: '"red"', defIndex: 34, index: 27, type: 'word' }
  ],
  [
    { match: '{string}', defIndex: 6, index: 6, type: 'string' },
    { match: '{word}', defIndex: 28, index: 24, type: 'word' }
  ],
  [
    { match: '"all the apples"', defIndex: 6, index: 6, type: 'int' },
    { match: '{word}', defIndex: 28, index: 32, type: 'word' }
  ],
  [
    { match: '{string}', defIndex: 6, index: 6, type: 'string' },
    { match: '"bin"', defIndex: 28, index: 24, type: 'int' }
  ]
]

const defOne:TStepDef = {
  type: `Given`,
  variant: `expression`,
  method: () => {},
  name: `I eat {int} from a total of {int} {word} apple(s)`,
  uuid: `12345-test`,
  content: `some content`,
  location: `test/path`,
  meta: {},
  match: `I eat {int} from a total of {int} {word} apple(s)`,
  parent: {
    uuid: `test-parent`,
    location: `test/parent/location`
  },
  tokens: []
} 


describe('tokenizeStep', () => {
  describe('converts the step into expression tokens', () => {
    it(`should convert the step into expression tokens`, () => {
      const tokens = []
      matchTexts.forEach(match => tokens.push(tokenizeStep(match, defOne)))
      expect(tokens).toEqual(outputs)
    })
  })
})