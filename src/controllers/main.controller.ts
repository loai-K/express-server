import { Request, Response } from 'express'
import appDetails from '../application.json'

export function appData() {
	return appDetails
}

export async function mainData(_req: Request, res: Response) {
	return res.json({
		status: 'success',
		message: 'app info',
		body: appDetails,
	})
}
