import { Router } from 'express'
import versionRoutes from './version.routes'
import testRoutes from './test.routes'

const router = Router()

router.get('/', versionRoutes)
router.use('/test', testRoutes)

export default router
