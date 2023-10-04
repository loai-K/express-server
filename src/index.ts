import * as path from 'path'
import express, { Application, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import { appConfig, corsOptions, apiLimiter, actuatorApp } from './config'
import { lifecycle } from './bootstrap'
import mountRoutes from './routes'
import errorMiddleware from './middlewares/error.middleware'
// import Logger from './middlewares/logger.middleware'
// import morgan from 'morgan'

// app instance
const app: Application = express()
	.disable('x-powered-by')
	.use(express.json())
	.use('/', express.static(path.join(__dirname, 'public')))
	.use('/static', express.static(path.join(__dirname, 'uploads')))
	.use(cookieParser(appConfig.cookieSecret))
	.use(compression())
	.use(cors(corsOptions))
	.use(helmet())
	.use('/api', actuatorApp)
	.use('/api', apiLimiter)

//// logging requests
// app.use(morgan('common'))
// app.use(Logger)

// app routes
mountRoutes(app)

// error handling
app.use(errorMiddleware).use((_req: Request, res: Response) => {
	return res.status(404).json({
		message: 'not found',
	})
})

const server = app.listen(appConfig.port, () => {
	lifecycle.init().then()
})

// // in case server error happened
// server.on('error', (error) => {
// 	new Error(error.message)
// })

// Ensure signal/process events are lifecycle-managed.
const exit = () => {
	server.close(async () => {
		server.closeAllConnections()
		await lifecycle.close()
		await lifecycle.exit()
	})
}

process
	.on('SIGQUIT', exit)
	.on('SIGTSTP', exit)
	.on('SIGTERM', exit)
	.on('SIGINT', exit)
	.on('uncaughtException', exit)
	.on('unhandledRejection', exit)

// This prevents close connection.
lifecycle.on('close', exit)

export default server
