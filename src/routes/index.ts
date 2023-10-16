import { Router } from 'express'

import api from './api'
import auth from './auth'
import users from './users'

const router = Router()

router.use('/auth', auth)
router.use('/users', users)
router.use(api)

export default router
