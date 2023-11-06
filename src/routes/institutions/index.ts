import { Router } from 'express'
import InstitutionController from 'src/controllers/institutions'
import errorHandlerAsync from 'src/middlewares/errorHandler'

const router = Router()

router.get('/', errorHandlerAsync(InstitutionController.getAll))

export default router
