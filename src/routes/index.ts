import { Application } from 'express'
import apiRoutes from './api'
import proxyRoutes from './proxy.routes'

const mountRoutes = (app: Application) => {
	app.use('/api', apiRoutes)
	app.use('/proxy', proxyRoutes)
	// app.use('/ws', proxyRoutes)
}

export default mountRoutes
