import { Request, Response, NextFunction } from 'express'
import Error from '../interfaces/error.interface'
import Logger from '../helpers/logger'

const errorMiddleware = (
	error: Error,
	_request: Request,
	response: Response,
	next: NextFunction,
) => {
	if (error) {
		const status = error.code || 500
		const message = error.message || 'Something went wrong'

		Logger.error(message, { code: status, title: error.title })

		return response.status(status).json({ status, message })
	}

	return next()
}

export default errorMiddleware
