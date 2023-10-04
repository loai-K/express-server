import { Request, Response, NextFunction } from 'express'
import UserModel from '../models/user.model'

const userModel: UserModel = new UserModel()

async function getMany(req: Request, res: Response, next: NextFunction) {
	const { page, per_page } = req.query
	const pageNumber = parseInt(page as string, 10) || 1
	const recordsInPage = parseInt(per_page as string, 10) || 10
	try {
		const users = await userModel.findAll(pageNumber, recordsInPage)
		res.json({
			status: 'success',
			message: 'users retrieved successfully',
			data: users,
		})
	} catch (error) {
		next(error)
	}
}

async function getOne(req: Request, res: Response, next: NextFunction) {
	try {
		const user = await userModel.find(req.params.id as unknown as string)
		res.json({
			status: 'success',
			message: 'User find successfully',
			data: { ...user },
		})
	} catch (error) {
		next(error)
	}
}

async function createUser(req: Request, res: Response, next: NextFunction) {
	try {
		const user = await userModel.create(req.body)
		res.status(201).json({
			status: 'success',
			message: 'User created successfully',
			data: { ...user },
		})
	} catch (error) {
		next(error)
	}
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
	try {
		const user = await userModel.update(
			req.body,
			req.params.id as unknown as string,
		)
		res.json({
			status: 'success',
			message: 'User updated successfully',
			data: user,
		})
	} catch (error) {
		next(error)
	}
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
	try {
		const user = await userModel.delete(req.params.id as unknown as string)
		res.json({
			status: 'success',
			message: 'User deleted successfully',
			data: user,
		})
	} catch (error) {
		next(error)
	}
}

export default {
	getMany,
	getOne,
	createUser,
	updateUser,
	deleteUser,
}
