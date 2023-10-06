/// <reference types="express" />
declare module 'express' {
	interface Request {
		user?: { id?: string; role?: string }
		locale?: string
	}
}
