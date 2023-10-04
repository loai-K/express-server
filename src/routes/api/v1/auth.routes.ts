import { Router } from 'express'
import AuthController from '../../../controllers/auth.controller'
import AuthMiddleware from '../../../middlewares/auth.middleware'

const router = Router({
	mergeParams: true,
})

router.get('/', AuthMiddleware, AuthController.authUser)
router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.post('/logout', AuthMiddleware, AuthController.logout)
router.post('/token', AuthMiddleware, AuthController.refreshToken)
router.post('/reset', AuthController.resetPassword)

export default router
