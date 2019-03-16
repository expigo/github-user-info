export const url = (parts, ...params) => {
  const baseUrl = `https://api.github.com`

  const urlEndings = buildEndingsFromParts(parts, params)

  const urlToHit = `${baseUrl}/${urlEndings}`
  const urlWithAuth = addAuth`${urlToHit}`

  console.log(urlWithAuth)

  return urlWithAuth
}

export const addAuth = (_, ...url) => {
  const authorizedUrl = `${url.join()}?client_id=${
    process.env.CLIENT_ID
  }&client_secret=${process.env.CLIENT_SECRET}`

  console.log(authorizedUrl)
  return authorizedUrl
}

const buildEndingsFromParts = (base, params) => {
  const rrur = concatenateAlternately(base, params)
  const comps = flattenDeep(rrur)
    .join('')
    .replace(/\/+$/, '') // remove trailing slashes

  return comps
}

const concatenateAlternately = (arr1 = [], arr2 = []) => [
  arr1[0] + '/',
  arr2.length ? concatenateAlternately(arr2, arr1.slice(1)) : arr1.slice(1)
]

const flattenDeep = arr =>
  arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  )
