import { Application } from 'express'
import mainRoutes from './main.routes'
import apiRoutes from './api'
import proxyRoutes from './proxy.routes'

const mountRoutes = (app: Application) => {
	app.use('/', mainRoutes)
	app.use('/api', apiRoutes)
	app.use('/proxy', proxyRoutes)
}

export default mountRoutes
