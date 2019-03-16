import axios from 'axios'

export default class Repo {
  static async findAll(ownerUrl) {
    const result = await axios(ownerUrl, {
      validateStatus: status => (status >= 200 && status < 300) || 404
    })

    return result
  }
}
