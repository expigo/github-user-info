import { url, addAuth } from '../helpers'

describe('helpers', () => {
  test('should should add authentication to path', () => {
    const mockVar = 'mock'
    const args = [`path`, `path/${mockVar}`, `path/${mockVar}/anotherPath`]

    const desired = [
      `path?client_id=${process.env.CLIENT_ID}&client_secret=${
        process.env.CLIENT_SECRET
      }`,
      `path/mock?client_id=${process.env.CLIENT_ID}&client_secret=${
        process.env.CLIENT_SECRET
      }`,
      `path/mock/anotherPath?client_id=${process.env.CLIENT_ID}&client_secret=${
        process.env.CLIENT_SECRET
      }`
    ]

    const actual = args.map(a => addAuth`${a}`)

    actual.forEach((a, i) => expect(a).toBe(desired[i]))
  })
})
