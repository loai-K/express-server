import logger from './helpers/logger'
import db from './database'
import '../api/fixtures'

const handleProcessEvents = () => {
	try {
		process.on('exit', async () => {
			// check db connection
			if (db && db.totalCount > 0) {
				db.removeAllListeners()
			}
		})

		process.on('uncaughtException', (error) => {
			logger.error(error)
		})

		process.on('uncaughtException', async (error) => {
			logger.error(error)
		})

		process.on('unhandledRejection', async (error) => {
			logger.error(error)
		})
	} catch (exception) {
		throw new Error(
			`[startup.handleProcessEvents] ${exception.message || exception}`,
		)
	}
}

const startup = async (options: object, { resolve, reject }: any) => {
	try {
		handleProcessEvents()
		resolve()
	} catch (exception) {
		reject(`[startup] ${exception.message}`)
	}
}

export default (options: object) =>
	new Promise((resolve, reject) => {
		startup(options, {resolve, reject}).then()
	})
