import { Router } from 'express'
import { catchErrors } from '../../modules/errorHandlers'
import { getAll, getOne } from './user.controllers'
import repoRouter from '../repo/repo.router'

const router = Router()

// /api/user
router.route('/').get(catchErrors(getAll))

// /api/user/:username
router.route('/:username').get(catchErrors(getOne))

// /api/user/:username
router.use('/:username/repo', repoRouter)

export default router
