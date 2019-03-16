import axios from 'axios'

const baseUrl = `https://api.github.com`

export default class User {
  static async findOneByName(username) {
    const result = await axios(`${baseUrl}/users/${username}`)
    return result.data
  }

  static async findAll() {
    const result = await axios(`${baseUrl}/users`, {
      validateStatus: status => (status >= 200 && status < 300) || 404
    })
    return result.data
  }
}
