import { docAndDataFeature } from '../../__mocks__'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { parseFeature } = require('../parseFeature')

describe('Feature Steps', () => {
  describe('doc-string', () => {
    it('should parse a step with a doc-string', () => {
      const parsedFeature = parseFeature(docAndDataFeature)[0]
      expect(parsedFeature.scenarios[0].steps[0].doc).toEqual({
        index: 5,
        whiteSpace: '      ',
        type: 'tick',
        content: '\n  Test tick data to be parsed\n',
      })
      expect(parsedFeature.scenarios[2].steps[0].doc).toEqual({
        index: 19,
        whiteSpace: '      ',
        type: 'quote',
        content: '\nTest quote data to be parsed\n',
      })
    })
  })

  describe('data-table', () => {
    it('should parse a step with a data-table', () => {
      const parsedFeature = parseFeature(docAndDataFeature)[0]
      expect(parsedFeature.scenarios[1].steps[0].table).toEqual({
        index: 12,
        content: [
          [ 'name', 'email', 'tag' ],
          [ 'Jon', 'jon@parkin.io', '@jon' ],
          [ 'Jacob', 'jacob@parkin.io', '@jacob' ],
          [ 'Jingle', 'jingle@parkin.io', '@jingle' ],
        ],
      })
      expect(parsedFeature.scenarios[3].steps[0].table).toEqual({
        index: 26,
        content: [
          [ 'first', 'Tom' ],
          [ 'last', 'Jerry' ],
          [ 'phone', '123456789' ],
          [ 'email', 'tomandjerry@cartoon.com' ],
        ],
      })
    })
  })
})
