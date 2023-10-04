import crypto from 'crypto'
import { realpath } from 'node:fs/promises'

export const hashString = (text: string) => {
	crypto.createHash('md5').update(text).digest('hex')
}

export async function getAppPath() {
	return await realpath('./')
}
