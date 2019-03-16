import User from './user.model'

export const getOne = async (req, res, next) => {
  const user = await User.findOneByName(req.params.username)

  if (!user) {
    return res.status(400).end()
  }

  res.status(200).json({ data: user })
}

export const getAll = async (req, res) => {
  const result = await User.findAll()

  if (!result) {
    return res.status(400).end()
  }
  res.status(200).json({ data: result })
}
