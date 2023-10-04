import { Request, Response, Router } from 'express'
import { appData } from '../../../controllers'

const router = Router({
	mergeParams: true,
})

router.get('/', (req: Request, res: Response) => {
	return res.json({
		message: 'App API Version Info',
		data: { api: 'v1', ...appData() },
	})
})

export default router
