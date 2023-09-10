jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { parseTags, hasTag } = require('../hasTag')

describe(`hasTag`, () => {

  describe(`hasTag`, () => {

    it(`should return true when both items and options have the same tag`, () => {
      const oneTag = [`@tag-1`]
      const twoTag = [`@tag-1`, `@tag-2`]

      expect(hasTag(oneTag, twoTag)).toBe(true)
      expect(hasTag(twoTag, oneTag)).toBe(true)

      const oneTagStr = oneTag.join(` `)
      const twoTagStr = twoTag.join(` `)

      expect(hasTag(oneTagStr, twoTagStr)).toBe(true)
      expect(hasTag(twoTagStr, oneTagStr)).toBe(true)

    })

    it(`should return false when the first argument is missing a tag from the second argument`, () => {
      const oneTag = [`@tag-1`]
      const twoTag = [`@tag-2`, `@tag-3`]
      const oneTagStr = oneTag.join(` `)
      const twoTagStr = twoTag.join(` `)

      expect(hasTag(oneTag, twoTag)).toBe(false)
      expect(hasTag(twoTag, oneTag)).toBe(false)
      expect(hasTag(oneTagStr, twoTagStr)).toBe(false)
      expect(hasTag(twoTagStr, oneTagStr)).toBe(false)

    })

    it(`should work with arrays of strings and strings`, () => {
      const string = `@tag-1`
      const arr = [`@tag-1`, `@tag-2`]

      expect(hasTag(string, arr)).toBe(true)
      expect(hasTag(arr, string)).toBe(true)
      expect(hasTag(string, string)).toBe(true)
      expect(hasTag(arr, arr)).toBe(true)
    })

    it(`should work even when invalid tags are passed`, () => {

      const oneTag = [`@tag-1`, `something`]
      const twoTag = [`@tag-1`, `@tag-2`, `item`]
      const oneTagStr = oneTag.join(` `)
      const twoTagStr = twoTag.join(` `)

      expect(hasTag(oneTag, twoTag)).toBe(true)
      expect(hasTag(twoTag, oneTag)).toBe(true)

      expect(hasTag(oneTagStr, twoTagStr)).toBe(true)
      expect(hasTag(twoTagStr, oneTagStr)).toBe(true)

      expect(hasTag(oneTag, twoTagStr)).toBe(true)
      expect(hasTag(twoTagStr, oneTag)).toBe(true)

    })

  })

  describe(`parseTags`, () => {

    it(`should properly parse the tag string or array`, () => {
      const tags = parseTags(`@tag-1 @t3`)
      const tagsArr = parseTags([`@tag-1`, `@t3`])

      expect(tags.includes(`@t3`)).toBe(true)
      expect(tags.includes(`@tag-1`)).toBe(true)
      expect(tagsArr.includes(`@t3`)).toBe(true)
      expect(tagsArr.includes(`@tag-1`)).toBe(true)

    })

    it(`should properly parse the tag string or array even with invalid tags`, () => {
      const tags = parseTags(`@tag-1 something tag-2 @t3`)
      const tagsArr = parseTags([`@tag-1`, `something`, `@t3`, `tag-2`])

      expect(tags.includes(`@t3`)).toBe(true)
      expect(tags.includes(`@tag-1`)).toBe(true)
      expect(tagsArr.includes(`@t3`)).toBe(true)
      expect(tagsArr.includes(`@tag-1`)).toBe(true)

      expect(tags.includes(`tag-2`)).toBe(false)
      expect(tags.includes(`something`)).toBe(false)
      expect(tagsArr.includes(`tag-2`)).toBe(false)
      expect(tagsArr.includes(`something`)).toBe(false)

    })


    it(`should returns only the correct tag types`, () => {
      const tags = parseTags(`@-1-valid @3_ #fail @1-pass,__@__pass`)

      expect(tags.includes(`@3_`)).toBe(true)
      expect(tags.includes(`@-1-valid`)).toBe(true)
      expect(tags.includes(`@1-pass`)).toBe(true)
      expect(tags.includes(`@__pass`)).toBe(true)
      
      const tagsArr = parseTags([`@-1-valid`, 143, {}, [`@valid-sub-array`]])
      expect(tagsArr.includes(`@-1-valid`)).toBe(true)
      expect(tagsArr.includes(`@valid-sub-array`)).toBe(false)

    })


  })

})
