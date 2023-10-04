import { Request, Response, NextFunction } from 'express'

const loggerMiddleware = (
	request: Request,
	_response: Response,
	next: NextFunction,
) => {
	console.log(
		'Log::',
		'Method: ' + request.method,
		'Route: ' + request.path,
		'IP: ' + request.ip,
		'Time: ' + Date.now(),
	)

	next()
}

export default loggerMiddleware
