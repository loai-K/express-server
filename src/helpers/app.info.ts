import fs from 'node:fs/promises';

type Data = {
	health?: boolean
	name?: string
	version?: string
	description?: string
	keywords?: string[]
	author?: object
}

const AppInfo = async (): Promise<Data> => {
	const packageFile = await fs.readFile('package.json', 'utf-8')
	const packageJson = JSON.parse(packageFile.toString())
	const data = await fetch('https://api.github.com/users/loai-k').then(res => res.json())
	return {
		health: true,
		name: packageJson.name,
		version: packageJson.version,
		description: packageJson.description,
		keywords: packageJson.keywords,
		author: { name: data.name || packageJson.author.name, bio: data.bio, url: data.html_url || packageJson.author.url },
	}
}

const AppInit = async () => {
	const defaultData: Data = await AppInfo()
	const file = await fs.realpath('./src/application.json')
	await fs.writeFile(file, JSON.stringify(defaultData), 'utf-8')
	return
}

export default AppInit