import { Router } from 'express'
import versionRoutes from './version.routes'
import authRoutes from './auth.routes'
import userRoutes from './user.routes'

const router = Router({
	mergeParams: true,
})

router.use('/', versionRoutes)
router.use('/auth', authRoutes)
router.use('/users', userRoutes)

export default router
