import { Request, Response, NextFunction } from 'express'
import UserModel from '../models/user.model'
import { AppRequest } from '../interfaces'

const userModel: UserModel = new UserModel()

async function authUser(req: AppRequest, res: Response, next: NextFunction) {
	try {
		if (req.user) {
			const user = await userModel.find(req.user.id as string)

			return res.json({
				status: 'success',
				message: 'authenticated user',
				data: user,
			})
		}
	} catch (error) {
		return next(error)
	}
}

async function login(req: Request, res: Response, next: NextFunction) {
	try {
		const { email, password } = req.body
		const user = await userModel.authenticate(email, password)
		if (!user) {
			return res.status(401).json({
				status: 'error',
				message: 'your credentials are invalid, please try again',
			})
		}
		const token = userModel.generateAccessToken(user.id as unknown as string)
		const oneDay = 1000 * 60 * 60 * 24
		res.cookie('access_token', token, {
			httpOnly: true,
			secure: true,
			signed: true,
			expires: new Date(Date.now() + oneDay),
		})
		return res.json({
			status: 'success',
			message: 'authenticated successful',
			data: { ...user, token },
		})
	} catch (error) {
		return next(error)
	}
}

async function logout(req: Request, res: Response, next: NextFunction) {
	try {
		//TODO:: handle logout Logic
		res.cookie('access_token', null).clearCookie('access_token')
	} catch (error) {
		return next(error)
	}
}

async function resetPassword(req: Request, res: Response, next: NextFunction) {
	try {
		//TODO:: handle Reset Password Logic
	} catch (error) {
		return next(error)
	}
}

async function register(req: Request, res: Response, next: NextFunction) {
	try {
		const user = await userModel.create(req.body)
		res.json({
			status: 'success',
			message: 'User created successfully',
			data: { ...user },
		})
	} catch (error) {
		return next(error)
	}
}

async function refreshToken(req: Request, res: Response, next: NextFunction) {
	try {
		//TODO:: handle Refresh Token Logic
	} catch (error) {
		return next(error)
	}
}

export default {
	authUser,
	login,
	logout,
	resetPassword,
	register,
	refreshToken,
}
