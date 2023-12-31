import { Request, Response, NextFunction } from 'express'
import Logger from '../helpers/logger'

const loggerMiddleware = (
	request: Request,
	_response: Response,
	next: NextFunction,
) => {
	console.error(
		'Log::',
		'Method: ' + request.method,
		'Route: ' + request.path,
		'IP: ' + request.ip,
		'Time: ' + Date.now(),
	)

	Logger.info(
		`Log:: Method: ${request.method}, Route: ${request.path}, IP: ${request.ip}, Time: ${Date.now()}`
	)

	next()
}

export default loggerMiddleware
