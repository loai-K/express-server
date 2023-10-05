import { createLogger, transports, format } from 'winston'
import appConfig from '../config/dotenvConfig'

const Logger = createLogger({
	level: 'info',
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		http: 3,
		verbose: 4,
		debug: 5,
		silly: 6,
	},
	format: format.json(),
	defaultMeta: { service: 'user-service' },
	transports: [
		//
		// - Write all logs with importance level of `error` or less to `error.log`
		// - Write all logs with importance level of `info` or less to `combined.log`
		//
		new transports.File({ filename: 'error.log', level: 'error' }),
		new transports.File({ filename: 'combined.log' }),
	],
	exitOnError: true,
	silent: !appConfig.logState,
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (appConfig.environment !== 'production') {
	Logger.add(
		new transports.Console({
			format: format.simple(),
		}),
	)
}

export default Logger
