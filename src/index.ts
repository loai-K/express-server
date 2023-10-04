import * as path from 'path'
import express, { Application, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import { appConfig, corsOptions, apiLimiter } from './config'
import mountRoutes from './routes'
import errorMiddleware from './middlewares/error.middleware'
// import Logger from './middlewares/logger.middleware'
// import morgan from 'morgan'

// app instance
const app: Application = express()

// app middlewares
app.disable('x-powered-by')
app.use(express.json())
app.use(cookieParser(appConfig.cookieSecret))
app.use(cors(corsOptions))
app.use(helmet())
//// logging requests
// app.use(morgan('common'))
// app.use(Logger)
// Apply the rate limiting middleware to all requests
// app.all('/api', apiLimiter)
app.use(apiLimiter)

app.use(express.static(path.join(__dirname, 'public')))

// app routes
mountRoutes(app)

// error handling
app.use(errorMiddleware)
app.use((_req: Request, res: Response) => {
	return res.status(404).json({
		message: 'not found',
	})
})

const server = app.listen(appConfig.port)

// app.on('listening', function () {})
process.on('SIGINT', () => server.close())
process.on('SIGTERM', () => server.close())

export default app
