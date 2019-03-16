import { Router } from 'express'
import { catchErrors } from '../../modules/errorHandlers'
import controllers from './user.controllers'
import repoRouter from '../repo/repo.router'

const router = Router()

router.param('username', controllers.findBy)

// /api/user
router.route('/').get(catchErrors(controllers.findAll))

// /api/user/:username
router.route('/:username').get(catchErrors(controllers.getOne))

// /api/user/:username/info
router.route('/:username/info').get(catchErrors(controllers.getUserInfo))

// /api/user/:username
router.use('/:username/repo', repoRouter)

export default router
