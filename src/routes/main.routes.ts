import { Router, Request, Response } from 'express'
import { appData, mainData } from '../controllers'
// import loggerMiddleware from '../middlewares/logger.middleware'
const router = Router()

// middleware that is specific to this router
// router.use(loggerMiddleware)
// router.all('/api', loggerMiddleware)

router.get('/', (req: Request, res: Response) => {
	return res.json({
		message: 'app info',
		body: appData(),
	})
})

router.get('/app', async (req: Request, res: Response) => {
	return res.json({
		message: 'app info',
		body: await mainData(),
	})
})

export default router