import { Router } from 'express'
import { catchErrors } from '../../modules/errorHandlers'

const router = Router()

// /api/user
router.route('/').get((req, res) => {
  res.json({ user: 'yup' })
})

export default router
