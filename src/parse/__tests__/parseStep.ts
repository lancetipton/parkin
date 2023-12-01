import { docAndDataFeature } from '../../__mocks__'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { parseFeature } = require('../parseFeature')

describe(`Feature Steps`, () => {
  describe(`doc-string`, () => {
    it(`should parse a step with a doc-string`, () => {
      const parsedFeature = parseFeature(docAndDataFeature)[0]
      expect(parsedFeature.scenarios[0].steps[0].doc).toEqual({
        index: 5,
        whitespace: `      `,
        type: `tick`,
        content: `Test tick data to be parsed`,
      })
      expect(parsedFeature.scenarios[2].steps[0].doc).toEqual({
        index: 22,
        whitespace: `      `,
        type: `quote`,
        content: `Test quote data to be parsed\nThat is two lines`,
      })
    })
  })

  describe(`data-table`, () => {
    it(`should parse a step with a data-table`, () => {
      const parsedFeature = parseFeature(docAndDataFeature)[0]
      expect(parsedFeature.scenarios[1].steps[0].table).toEqual({
        index: 12,
        whitespace: `      `,
        content: [
          [ `name`, `email`, `tag` ],
          [ `Jon`, `jon@parkin.io`, `@jon` ],
          [ `Jacob`, `jacob@parkin.io`, `@jacob` ],
          [ `Jingle`, `jingle@parkin.io`, `@jingle` ],
        ],
      })
      expect(parsedFeature.scenarios[3].steps[0].table).toEqual({
        index: 30,
        whitespace: `      `,
        content: [
          [ `first`, `Tom` ],
          [ `last`, `Jerry` ],
          [ `phone`, `123456789` ],
          [ `email`, `tomandjerry@cartoon.com` ],
        ],
      })
    })
  })
})
