import User from './user.model'

export const getOne = async (req, res, next) => {
  const user = await User.findOneByName(req.params.username)
  res.status(200).json(user)
}
