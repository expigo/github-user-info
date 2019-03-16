import { Router } from 'express'
import { catchErrors } from '../../modules/errorHandlers'
import { findAll } from './repo.controllers'

const router = Router({ mergeParams: true })

router.route('/').get(catchErrors(findAll))

export default router
