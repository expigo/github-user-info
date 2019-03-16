import axios from 'axios'

const baseUrl = `https://api.github.com`

export default class User {
  static async findOneByName(username) {
    const result = await axios(`${baseUrl}/users/${username}`)
    return result.data
  }
}
