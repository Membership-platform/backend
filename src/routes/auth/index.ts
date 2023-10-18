import { Router } from 'express'
import signupController from '../../controllers/auth'
import joiValidator from '../../middlewares/joiValidator'
import * as schema from '../../helpers/validation/joi-schemas'
import verifyToken from '../../middlewares/verifyToken'
import errorHandlerAsync from '../../middlewares/errorHandler'

const router = Router()

router.post(
	'/signup',
	joiValidator(schema.newUser),
	errorHandlerAsync(signupController.signup),
)
router.post('/login', errorHandlerAsync(signupController.login))
router.get('/logout', verifyToken, signupController.logout)

export default router
