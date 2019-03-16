import { Router } from 'express'
import { catchErrors } from '../../modules/errorHandlers'
import { getAll, getOne } from './user.controllers'

const router = Router()

// /api/user
router.route('/').get(catchErrors(getAll))

// /api/user/:username
router.route('/:username').get(catchErrors(getOne))

export default router
