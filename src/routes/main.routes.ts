import { Router } from 'express'
import { mainData } from '../controllers'
import loggerMiddleware from '../middlewares/logger.middleware'
const router = Router()

router.get('/', loggerMiddleware, mainData)

export default router
