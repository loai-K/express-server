import { readFile, realpath } from 'node:fs/promises'

type Data = {
	health?: boolean
	name?: string
	version?: string
	description?: string
	keywords?: string[]
	author?: object
}

const AppInfo = async (): Promise<Data> => {
	const packageFile = await readFile('package.json', 'utf-8')
	const packageJson = JSON.parse(packageFile.toString())

	return {
		health: true,
		name: packageJson.name,
		version: packageJson.version,
		description: packageJson.description,
		keywords: packageJson.keywords,
		author: {
			name: packageJson.author.name,
			url: packageJson.author.url,
		},
	}
}

const AppInit = async () => {
	try {
		const defaultData: Data = await AppInfo()
		const file = await realpath('./src/application.json')
		// writeFile(file, JSON.stringify(defaultData), { encoding: 'utf8' }).then()

	} catch (error) {
		new Error(error.message)
	}
}

export default AppInit
