import { Router } from 'express'
import ApiMiddleware from '../../middlewares/api.middleware'
import apiV1Routes from './v1'
import apiV2Routes from './v2'

const router = Router({
	mergeParams: true,
})

// router.use('/', apiV1Routes)
router.use('/v1', ApiMiddleware('v1'), apiV1Routes)
router.use('/v2', ApiMiddleware('v2'), apiV2Routes)

export default router
