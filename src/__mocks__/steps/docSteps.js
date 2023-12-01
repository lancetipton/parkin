export const registerDocSteps = PK => {
  PK.Given(
    'I have the following doc-string data using type {word}',
    jest.fn((docStringType, { world, doc }) => {
      expect(docStringType).toBe(doc.type)
      world.docStringData = doc.content
    })
  )

  PK.Then(
    'the doc-string data should be {string}',
    jest.fn((docStringData, { world }) => {
      expect(world.docStringData.split(`\n`)).toEqual(
        docStringData.split(`\\n`)
      )
    })
  )

  PK.Given(
    'the following users exist',
    jest.fn(({ table, world }) => {
      expect(table.content).not.toBe(undefined)
      world.usersTable = table.content
    })
  )

  PK.Then(
    'the user table should should have user {word}',
    jest.fn((user, { world }) => {
      const found = world.usersTable.find(row => {
        const [ name, email, tag ] = row
        return user === name || user === email || user === tag
      })

      expect(found).not.toBe(undefined)
    })
  )
}
