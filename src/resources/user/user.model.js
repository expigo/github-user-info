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

  static async getInfo({ login, email, repos_url: reposUrl }) {
    const reposSummary = await getReposSummary(reposUrl)
    const reposListOfNames = prepareReposData(reposSummary)

    return { login, email: email || '🥔', reposListOfNames }
  }
}
const getReposSummary = async reposUrl => {
  const userReposInfo = await axios(reposUrl, {
    validateStatus: status => (status >= 200 && status < 300) || 404
  })

  const filteredAndMapped = await extractNameLangAndUrl(userReposInfo.data)

  return filteredAndMapped
}

const extractNameLangAndUrl = async repos => {
  const promises = await repos
    .filter(repo => !(repo.fork || repo.private))
    .map(async repo => ({
      name: repo.name,
      lang: await getRepoLangInfo(`${repo.languages_url}`),
      url: repo.url
    }))

  return Promise.all(promises)
}

const getRepoLangInfo = async url => {
  const info = await axios(url, {
    validateStatus: status => (status >= 200 && status < 300) || 404
  })

  return info.data
}

const prepareReposData = rawData =>
  rawData.reduce(
    (prev, repo) => ({
      ...prev,
      [repo.name]: repo.url
    }),
    {}
  )
