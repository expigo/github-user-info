import controlllers from '../user.controllers'
import isFunction from 'lodash.isfunction'

describe('user controllers', () => {
  test('has dao controllers', () => {
    const daoMethods = ['getOne', 'findAll', 'findBy']
    daoMethods.forEach(name =>
      expect(isFunction(controlllers[name])).toBe(true)
    )
  })
})
