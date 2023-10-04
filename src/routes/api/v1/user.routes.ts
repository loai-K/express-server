import { Router } from 'express'
import UserController from '../../../controllers/user.controller'
import AuthMiddleware from '../../../middlewares/auth.middleware'

const router = Router({
	mergeParams: true,
})

router
	.route('/')
	.get(AuthMiddleware, UserController.getMany)
	.post(AuthMiddleware, UserController.createUser)
	.options()

router
	.route('/:id')
	.get(AuthMiddleware, UserController.getOne)
	.put(AuthMiddleware, UserController.updateUser)
	.patch(AuthMiddleware, UserController.updateUser)
	.delete(AuthMiddleware, UserController.deleteUser)

export default router
