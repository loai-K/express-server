import { Request, Response, NextFunction } from 'express'

function ApiMiddleware(api_version: string = 'v1') {
	return (_request: Request, response: Response, next: NextFunction): void => {
		response.setHeader('Api-Version', api_version)
		response.setHeader('Accept-Language', 'ar;q=1, en;q=0.8')
		response.setHeader('Content-Type', 'application/json; charset=utf-8')
		response.setHeader('X-XSS-Protection', '1; mode=block')

		next()
	}
}

export default ApiMiddleware
