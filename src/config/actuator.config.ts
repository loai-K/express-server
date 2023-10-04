import actuator, { Options } from 'express-actuator'
import { mainData } from '../controllers'

const actuatorOptions: Options = {
	basePath: '', // It will set /management/info instead of /info
	infoGitMode: 'full', // 'simple' or 'full',
	infoDateFormat: 'DD-MM-YYYY hh:mm:ss A',
	infoBuildOptions: {
		'server': {
			'health': process.connected,
			'path': process.title,
			'platform': process.platform,
			'node': process.version,
			'pid': process.pid,
			'uptime': process.uptime()
		},
		'resource': {
			'cpuUsage': process.cpuUsage(),
			'memory': process.memoryUsage(),
		},
	},
	customEndpoints: [
		{
			id: '',
			controller: mainData,
		},
		{
			id: 'check',
			controller: mainData,
		},
	],
}

export const actuatorApp = actuator(actuatorOptions)

export default actuatorApp
