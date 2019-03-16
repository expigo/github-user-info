import Repo from './repo.model'
import User from '../user/user.model'

export const findAll = async (req, res) => {
  const user = await User.findOneByName(req.params.username)

  if (!user) {
    res.status(400).end()
  }
  const { data } = await Repo.findAll(user.repos_url)

  if (!data) {
    res.status(400).end()
  }

  res.status(200).json(data)
}
