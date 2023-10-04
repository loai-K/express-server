import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import appConfig from '../config/dotenvConfig'
import Error from '../interfaces/error.interface'
import { AppRequest } from 'interfaces'

const handleUnauthorizedError = (next: NextFunction) => {
	const error: Error = new Error('Authentication Error, Please login again')
	error.code = 401
	next(error)
}

function AuthMiddleware(req: Request, _res: Response, next: NextFunction) {
	try {
		// const authHeader = req.headers['Authorization']
		const authHeader = req.get('Authorization')
		const tokenType = authHeader && authHeader.split(' ')[0].toLowerCase().trim()
		let token = authHeader && authHeader.split(' ')[1].trim()

		// if token not find try to get it from cookie
		if (!token) {
			// token = req.cookies.access_token
			token = req.signedCookies.access_token
			// token = req.signedCookies.get('access_token')
		}

		// token type not bearer
		if (tokenType && tokenType !== 'bearer') return handleUnauthorizedError(next)
		// No Token Provided.
		if (!token) return handleUnauthorizedError(next)

		const decoded = jwt.verify(
			token,
			appConfig.tokenSecret as unknown as string,
			{
				issuer: appConfig.name as unknown as string,
				subject: 'authToken',
			},
		)
		if (decoded) {
			;(req as AppRequest).user = { decoded }
			// req.user.id = decode
			next()
		} else {
			// Failed to authenticate user.
			handleUnauthorizedError(next)
		}
	} catch (err) {
		handleUnauthorizedError(next)
	}
}

export default AuthMiddleware
