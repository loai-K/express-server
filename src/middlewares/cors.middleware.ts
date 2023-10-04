import { Request, Response, NextFunction } from 'express'

const CorsMiddleware = (request: Request, response: Response, next: NextFunction) => {
	response.setHeader(
		'Access-Control-Allow-Origin',
		`${process.env.PATH},${process.env.PATH}`,
	)
	response.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE',
	)
	response.setHeader(
		'Access-Control-Allow-Headers',
		'Origin,X-Requested-With,Authorization,Content-Type,Accept',
	)
	// response.setHeader('Access-Control-Allow-Credentials', true)

	// intercept OPTIONS method
	if (request.method === 'OPTIONS') {
		// response.end();
		response.send(204)
	} else {
		next()
	}
}

export default CorsMiddleware
