import { expressionDefs } from '../../__mocks__'
import {
  isArr,
  typeOf,
} from '@keg-hub/jsutils'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const mockParamType = jest.fn()
const mockMissingVal = jest.fn()

jest.setMock('../../utils/errors', {
  throwParamTypeExists: mockParamType,
  throwMissingWorldValue: mockMissingVal
})

const typeModel = {
  name: ['string'],
  regex: ['string', 'regexp'],
  type: ['string'],
  useForSnippets: ['boolean'],
  transformer: ['function'],
  preferForRegexpMatch: ['boolean'],
}

const {
  convertTypes,
  getParamTypes,
  registerParamType
} = require('../paramTypes')


const initialParamTypes = getParamTypes()

const convertTypeTests = {
  input: [
    [ '5', '4.5', 'something', '"A string"', 'any-match', 'mis-match-type', 'NO-MATCH' ],
    [
      initialParamTypes.int,
      initialParamTypes.float,
      initialParamTypes.word,
      initialParamTypes.string,
      initialParamTypes.any,
      initialParamTypes.float,
    ]
  ],
  output: [ 5, 4.5, 'something', 'A string', 'any-match', 'NO-MATCH' ]
}

const convertWorldTests = {
  input: [
    [
      '$world.value',
      '$world.first.value',
      '$world.first.second.0',
      '"$world.first.second.1.third"',
      '$world.first.second.2.forth'
    ],
    [
      initialParamTypes.string,
      initialParamTypes.string,
      initialParamTypes.word,
      initialParamTypes.int,
      initialParamTypes.int,
    ],
    {
      value: 'root-value',
      first: {
        value: 'first-value',
        second: [
          'second-value',
          { third: 'third-value-NOT-RETURNED-NOT-INTEGER' },
          { forth: 4 }
        ]
      }
    }
  ],
  output: [ 'root-value', 'first-value', 'second-value', 4 ]
}

const convertWorldMissingTests = {
  input: [
    [ '$world.value'],
    [],
    {}
  ],
  output: []
}


describe('paramTypes', () => {
  
  describe('getParamTypes', () => {

    afterEach(() => {
      mockParamType.mockClear()
      mockMissingVal.mockClear()
    })

    it('should return the registered paramTypes with the correct properties', () => {
      const paramTypes = getParamTypes()
      Object.entries(paramTypes).map(([type, meta]) => {
        Object.entries(meta).map(([key, value]) => {
          const mathTypes = typeModel[key]
          if(!mathTypes) throw new Error(`Extra key ${key} in param type "${type}"`)

          expect(isArr(mathTypes)).toBe(true)
          expect(mathTypes.includes(typeOf(value).toLowerCase())).toBe(true)
        })
      })
      expect(getParamTypes)
    })
  })
  
  describe('convertTypes', () => {

    afterEach(() => {
      mockParamType.mockClear()
      mockMissingVal.mockClear()
    })

    it('should convert types to the correct values, removing mis-matched types', () => {
      expect(convertTypes(...convertTypeTests.input)).toEqual(convertTypeTests.output)
    })

    it('should convert types to world values', () => {
      expect(convertTypes(...convertWorldTests.input)).toEqual(convertWorldTests.output)
    })
    
    it('should call throwMissingWorldValue when world value does not exist', () => {
      expect(mockMissingVal).not.toHaveBeenCalled()
      convertTypes(...convertWorldMissingTests.input)
      expect(mockMissingVal).toHaveBeenCalled()
    })
    
  })

  describe('registerParamType', () => {

    afterEach(() => {
      mockParamType.mockClear()
      mockMissingVal.mockClear()
    })

    it('should register a new type with the param types', () => {
      registerParamType({
        name: 'custom',
        transformer: (arg) => (arg)
      })
      const paramTypes = getParamTypes()
      expect(typeof paramTypes.custom).toBe('object')
      Object.entries(paramTypes.custom).map(([key, value]) => {
        const mathTypes = typeModel[key]
        if(!mathTypes) throw new Error(`Extra key ${key} in param type "custom"`)

        expect(isArr(mathTypes)).toBe(true)
        expect(mathTypes.includes(typeOf(value).toLowerCase())).toBe(true)
      })
    })

    it('should throw an error if registering a type that already exists', () => {
      expect(mockParamType).not.toHaveBeenCalled()
      registerParamType({
        name: 'any',
        transformer: (arg) => (arg)
      })
      expect(mockParamType).toHaveBeenCalled()
    })
    
    it('should wrap the registered transfrom with a world check helper method', () => {
      const custom2 = {
        name: 'custom2',
        transformer: (arg) => (arg)
      }
      registerParamType(custom2)
      const paramTypes = getParamTypes()
      expect(paramTypes.custom2.transformer).not.toBe(custom2.transformer)
    })

    it('should still call the orginal transformer method when wrapped transformer is called without a world value', () => {
      const custom3 = {
        name: 'custom3',
        transformer: jest.fn(),
      }
      registerParamType(custom3)
      const paramTypes = getParamTypes()
      const method = paramTypes.custom3.transformer
      method('test')
      expect(custom3.transformer).toHaveBeenCalled()
    })
  })

})