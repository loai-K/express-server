import { Pool, Client } from 'pg'
import appConfig from '../config/dotenvConfig'

const dbConfig = {
	host: appConfig.database.host,
	port: appConfig.database.port,
	database: appConfig.database.name,
	user: appConfig.database.user,
	password: appConfig.database.password,
	connectionTimeoutMillis: 2000,
	idleTimeoutMillis: 1000,
	max: 4,
	allowExitOnIdle: true,
}

const db: Pool = new Pool(dbConfig)

db.on('error', (error: Error) => {
	console.log(error.message)
})

export const dbQuery = async (query: string, params?: Array<string>) => {
	const client = await db.connect()
	// const result = await client.query(query)
	const { rows } = await client.query(query, params).then()
	client.release()
	return rows //result.rows
}

export const dbClient = async (query: string, params?: string[]) => {
	const client = new Client(dbConfig)
	await client.connect()
	try {
		await client.query('BEGIN')
		const result = await client.query(query, params).then()
		await client.query('COMMIT')
		return result.rows
	} catch (error) {
		await client.query('ROLLBACK')
		// throw error
		// throw new Error(error)
	} finally {
		await client.end()
	}
}

export default db
