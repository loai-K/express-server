import { Request, Response, NextFunction } from 'express'
import validator from 'validator'
import UserModel from '../models/user.model'
import AppRequest from '../interfaces/appRequest'
import { User, payloadType } from '../types'
import { Error } from '../interfaces'
import appConfig from '../config/dotenvConfig'

const userModel: UserModel = new UserModel()

const handleInputError = (next: NextFunction) => {
	const error: Error = new Error('Input Error, Please login again')
	error.code = 422
	next(error)
}

async function authUser(req: AppRequest, res: Response, next: NextFunction) {
	try {
		if (req.user?.id && validator.isUUID(req.user?.id, 4)) {
			const user = await userModel.find(req.user.id)

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

async function register(req: Request, res: Response, next: NextFunction) {
	try {
		const data = req.body as User
		if (appConfig.isProduction) {
			data.user_name = validator.isAlphanumeric(req.body.user_name)
				? req.body.user_name
				: null
			data.first_name = validator.isAlpha(req.body.first_name)
				? req.body.first_name
				: null
			data.last_name = validator.isAlpha(req.body.last_name)
				? req.body.last_name
				: null
			data.email = validator.isEmail(req.body.email) ? req.body.email : null
			data.mobile = validator.isNumeric(req.body.mobile) ? req.body.mobile : null
			data.password = validator.isStrongPassword(req.body.user_name)
				? req.body.user_name
				: null
		}

		if (!data.user_name || !data.email || !data.password)
			return handleInputError(next)

		const user = await userModel.create(data)
		res.json({
			status: 'success',
			message: 'User created successfully',
			data: { ...user },
		})
	} catch (error) {
		return next(error)
	}
}

async function login(req: Request, res: Response, next: NextFunction) {
	try {
		let { email, password } = req.body
		if (appConfig.isProduction) {
			email = validator.isEmail(req.body.email || '') ? req.body.email : null
			password = validator.isStrongPassword(req.body.password || '')
				? req.body.password
				: null
		}

		if (!email || !password) return handleInputError(next)

		const user = await userModel.authenticate(email, password)
		if (!user) {
			return res.status(401).json({
				status: 'error',
				message: 'your credentials are invalid, please try again',
			})
		}
		const token = userModel.generateAccessToken({
			user: user.id,
			type: 'user',
		} as payloadType)
		const oneDay = 1000 * 60 * 60 * 24
		res.cookie('access_token', token, {
			httpOnly: true,
			secure: true,
			signed: true,
			expires: new Date(Date.now() + oneDay),
		})
		// res.setHeader('Cookie-Set', token)
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
