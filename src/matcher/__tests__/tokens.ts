import { tokenizeStep } from '../tokens'
import { TStepDef, EPartMatchTypes } from '../../types'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const matchTexts = [
  `I eat 4 from a total of {int} "green" apple(s)`,
  `I eat {int} from a total of {int} {word} apple(s)`,
  `I eat 4 from a total of {int} {word} apple(s)`,
  `I eat 4 from a total of 20 "red" apple(s)`,
  `I eat 1 from a total of 20 "red" apples`,
  `I eat 300 from a total of 1 "red" apple`
]

const outputs = [
  [
    { match: `4`, defIndex: 6, index: 6, type: `int` },
    { match: `{int}`, defIndex: 28, index: 24, type: `int` },
    { match: `"green"`, defIndex: 34, index: 30, type: `word` },
    { match: `apple(s)`, defIndex: 41, index: 38, type: EPartMatchTypes.optional }
  ],
  [
    { match: `{int}`, defIndex: 6, index: 6, type: `int` },
    { match: `{int}`, defIndex: 28, index: 28, type: `int` },
    { match: `{word}`, defIndex: 34, index: 34, type: `word` },
    { match: `apple(s)`, defIndex: 41, index: 41, type: EPartMatchTypes.optional, },
  ],
  [
    { match: `4`, defIndex: 6, index: 6, type: `int` },
    { match: `{int}`, defIndex: 28, index: 24, type: `int` },
    { match: `{word}`, defIndex: 34, index: 30, type: `word` },
    { match: `apple(s)`, defIndex: 41, index: 37, type: EPartMatchTypes.optional }
  ],
  [
    { match: `4`, defIndex: 6, index: 6, type: `int` },
    { match: `20`, defIndex: 28, index: 24, type: `int` },
    { match: `"red"`, defIndex: 34, index: 27, type: `word` },
    { match: `apple(s)`, defIndex: 41, index: 33, type: EPartMatchTypes.optional }
  ],
  [
    { match: `1`, defIndex: 6, index: 6, type: `int` },
    { match: `20`, defIndex: 28, index: 24, type: `int` },
    { match: `"red"`, defIndex: 34, index: 27, type: `word` }
  ],
  [
    { match: `300`, defIndex: 6, index: 6, type: `int` },
    { match: `1`, defIndex: 28, index: 26, type: `int` },
    { match: `"red"`, defIndex: 34, index: 28, type: `word` }
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


describe(`tokenizeStep`, () => {
  describe(`converts the step into expression tokens`, () => {

    it(`should convert the step into expression tokens`, () => {
      const tokens = []
      matchTexts.forEach(match => tokens.push(tokenizeStep(match, defOne)))
      expect(tokens).toEqual(outputs)
    })

    it(`should only options.include items passed in the options.include array`, () => {
      const resp = tokenizeStep(matchTexts[0], defOne, { include: [EPartMatchTypes.parameter] })
      resp.forEach(match => expect(match.type).not.toBe(EPartMatchTypes.optional))
    })

    it(`should only options.include items not in the options options.exclude array`, () => {
      const resp = tokenizeStep(matchTexts[0], defOne, { exclude: [EPartMatchTypes.parameter] })
      resp.forEach(match => expect(match.type).toBe(EPartMatchTypes.optional))
    })

    it(`should ignore options.exclude array when the options.include array exists`, () => {
      const resp = tokenizeStep(
        matchTexts[0],
        defOne,
        {
          include: [EPartMatchTypes.optional],
          exclude: [EPartMatchTypes.optional]
        }
      )
      resp.forEach(match => expect(match.type).toBe(EPartMatchTypes.optional))
    })

    it(`should allow including more than one type in the options.include array`, () => {
      const resp = tokenizeStep(
        matchTexts[0],
        defOne,
        {include: [EPartMatchTypes.parameter, EPartMatchTypes.optional]}
      )
      expect(resp).toEqual(outputs[0])
    })

    it(`should allow including more than one type in the options.exclude array`, () => {
      const resp = tokenizeStep(
        matchTexts[0],
        defOne,
        {exclude: [EPartMatchTypes.parameter, EPartMatchTypes.optional]}
      )
      expect(resp).toEqual([])
    })

  })
})