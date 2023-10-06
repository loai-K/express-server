import crypto from 'crypto'
import { realpath } from 'node:fs/promises'
import { string } from 'mathjs'

export const hashString = (text: string) => {
	crypto.createHash('md5').update(text).digest('hex')
}

export async function getAppPath() {
	return await realpath('./')
}

export function checkProperties(obj: { [x: string]: string }) {
	let key
	for (key in obj) {
		if (obj[key] !== null && obj[key] != '') return false
	}
	return true
}

export const stringPrototypes = {
	slugify(separator: string = '-') {
		return this.toString()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.replace(/[^a-z0-9 -]/g, '')
			.trim()
			.replace(/--+/g, separator)
	},
}

// string.prototype.slugify = stringPrototype
// Object.assign(Post.prototype, stringPrototypes)
