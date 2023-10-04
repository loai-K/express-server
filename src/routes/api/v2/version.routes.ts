import { Request, Response, Router } from 'express'
import { appData } from '../../../controllers'

const router = Router()

router.get('/', (req: Request, res: Response) => {
	return res.json({
		message: 'App API Version Info',
		data: { api: 'v2', ...appData() },
	})
})

export default router
