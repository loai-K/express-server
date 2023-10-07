import 'dotenv/config'
// import dotenv from 'dotenv'
// dotenv.config({})

export const appConfig = {
	name: process.env.NAME || 'Application',
	port: parseInt(process.env.PORT as string, 10) || 3000,
	path: process.env.PATH || 'http://localhost',
	environment: process.env.NODE_ENV || 'production',
	isProduction: (process.env.NODE_ENV === 'production') as boolean,
	logState: process.env.LOG_STATE || false,
	cookieSecret: process.env.COOKIE_SECRET as string,
	bcryptHash: process.env.BCRYPT_HASH as string,
	saltRounds: parseInt(process.env.SALT_ROUNDS as string, 10) || 10,
	tokenSecret: process.env.TOKEN_SECRET as string,
	tokenSecretRefresh: process.env.TOKEN_SECRET_REFRESH as string,
	tokenExpires: (process.env.ACCESS_TOKEN_EXPIRES as string) || '1h',
	database: {
		host: process.env.PG_HOST,
		port: parseInt(process.env.PG_PORT as string, 10) || 5432,
		name: process.env.PG_DATABASE,
		user: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
	},
	email: {
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		user: process.env.EMAIL_USER,
		password: process.env.EMAIL_PASSWORD,
		from: process.env.EMAIL_FROM,
		name: process.env.EMAIL_FROM_NAME,
	},
	twilio: {
		number: process.env.TWILIO_NUMBER as string,
		sid: process.env.TWILIO_SID as string,
		authToken: process.env.TWILIO_TOKEN as string,
	},
}

export default appConfig
