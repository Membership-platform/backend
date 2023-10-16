import { Router } from 'express'
import userController from 'src/controllers/users'
import errorHandlerAsync from 'src/middlewares/errorHandler'
import verifyAdmin from 'src/middlewares/verifyAdmin'
import verifyToken from 'src/middlewares/verifyToken'

const router = Router()

router.get(
	'/',
	verifyToken,
	verifyAdmin,
	errorHandlerAsync(userController.getAll),
)

export default router
