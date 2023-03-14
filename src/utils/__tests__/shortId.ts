jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

import { shortId } from '../shortId'

describe('shortId', () => {

  it('it should return the same id when same content is passed', () => {
    expect(shortId(`test-string`, 20)).toBe(shortId(`test-string`, 20))
    const str = `When I wait for {string} to attach`
    expect(shortId(str, 0)).not.toBe(shortId(str, 0))
  })

  it('should not return the same id when content is the same length', () => {
    const id1 = shortId(`When I wait for {string} to detach`, 20)
    const id2 = shortId(`When I wait for {string} to attach`, 20)
    expect(id1).not.toBe(id2)
  })

  it('should not return the same id when same content is not the same', () => {
    expect(shortId(`string-test`, 2)).not.toBe(shortId(`test-string`, 20))
  })


})

