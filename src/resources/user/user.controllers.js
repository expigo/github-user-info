import User from './user.model'
import { createDaoFor } from '../../modules/dao'

export const getUserInfo = async (req, res, next) => {
  const userInfo = await User.getInfo(req.entityFromParam)
  res.json(userInfo)
}

export default createDaoFor(User, { getUserInfo })
