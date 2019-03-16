import { Router } from 'express'
import { catchErrors } from '../../modules/errorHandlers'
import { getOne } from './user.controllers'

const router = Router()

// /api/user
router.route('/').get((req, res) => {
  res.json({ user: 'yup' })
})

// /api/user/:username
router.route('/:username').get(catchErrors(getOne))

export default router
