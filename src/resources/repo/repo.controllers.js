import Repo from './repo.model'
import { addAuth } from '../../modules/helpers'

export const findAll = async (req, res) => {
  const { data } = await Repo.findAll(addAuth`${req.entityFromParam.repos_url}`)

  if (!data) {
    res.status(400).end()
  }

  res.status(200).json(data)
}
