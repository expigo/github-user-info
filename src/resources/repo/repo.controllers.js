import Repo from './repo.model'

export const findAll = async (req, res) => {
  const { data } = await Repo.findAll(req.entityFromParam.repos_url)

  if (!data) {
    res.status(400).end()
  }

  res.status(200).json(data)
}
