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

router.post('/confirm', errorHandlerAsync(userController.confirm as any))
router.delete(
	'/:id',
	verifyToken,
	verifyAdmin,
	errorHandlerAsync(userController.DeleteUser as any),
)
router.get('/:id', verifyToken, errorHandlerAsync(userController.getOne as any))

router.post(
	'/forgot-password',
	errorHandlerAsync(userController.sendEmail as any),
)
router.patch(
	'/update-password',
	errorHandlerAsync(userController.updatePassword as any),
)

router.patch(
	'/update/:id',
	verifyToken,
	verifyAdmin,
	errorHandlerAsync(userController.UpdateUser as any),
)

export default router
