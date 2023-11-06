import { Router } from 'express'

import api from './api'
import auth from './auth'
import users from './users'
import institutions from './institutions'

const router = Router()

router.use('/auth', auth)
router.use('/users', users)
router.use('/institutions', institutions)
router.use(api)

export default router
