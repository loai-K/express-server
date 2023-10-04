import { CorsOptions } from 'cors'

export const corsOptions: CorsOptions = {
	origin: true, // 'http://example.com',
	methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
	credentials: true,
	preflightContinue: false,
	optionsSuccessStatus: 200,
	// maxAge: 3600
}

export default corsOptions
