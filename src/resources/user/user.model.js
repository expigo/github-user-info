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
    const langStats = getLangStats(reposSummary)

    return { login, email: email || '🥔', reposListOfNames, langStats }
  }
}

// class-private methods
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

const getLangStats = rawData => {
  const { allTogether, ...langs } = groupByPropsAndSumValues(rawData)

  const getChunk = calcShares(allTogether)

  const langShares = immutableObjMapper(langs, ([k, v]) => ({
    [k]: getChunk(v).toFixed(2)
  }))

  return langShares
}

const groupByPropsAndSumValues = reposData =>
  reposData.reduce((prev, curr) => sumLangs(prev, curr.lang), {
    allTogether: 0
  })

const sumLangs = (prevArr = {}, currObj) => {
  for (let i in currObj) {
    if (prevArr.hasOwnProperty(i)) {
      prevArr[i] += Number(currObj[i])
    } else {
      prevArr[i] = Number(currObj[i])
    }

    prevArr['allTogether'] += currObj[i]
  }

  return prevArr
}

const calcShares = whole => x => (x * 100) / whole

/*
  Returns new object with the same property names but new values, mapped with the passed function
*/
const immutableObjMapper = (objectToMap, biConsumer) =>
  Object.assign(...Object.entries(objectToMap).map(biConsumer))
