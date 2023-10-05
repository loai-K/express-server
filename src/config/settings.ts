import fs from 'fs'

const settings = JSON.parse(
	process.env.APP_SETTINGS ||
		fs.readFileSync(`settings-${process.env.NODE_ENV}.json`, 'utf-8') ||
		'{}',
)

export default settings
