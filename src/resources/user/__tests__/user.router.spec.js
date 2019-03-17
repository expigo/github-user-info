import router from '../user.router'

describe('item router', () => {
  test('has routes', () => {
    const routes = ['/', '/:username', '/:username/info']
    routes.forEach(route => {
      const test = router.stack.find(
        s => s.route.path === route && s.route.methods['get']
      )

      expect(test).toBeTruthy()
    })
  })
})
