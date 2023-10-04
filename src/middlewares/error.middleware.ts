import { Request, Response, NextFunction } from 'express'
import Error from '../interfaces/error.interface'

const errorMiddleware = (
	error: Error,
	_request: Request,
	response: Response,
	next: NextFunction,
) => {
	if (error) {
		const status = error.code || 500
		const message = error.message || 'Something went wrong'
		return response.status(status).json({ status, message })
	}

	return next()
}

export default errorMiddleware
