import { Router } from 'express'

const router = Router()

router.get('/', (_, res) => res.send('Welcome to our Membership Platform'))

export default router
