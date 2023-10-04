import { Response, NextFunction } from 'express'
import { AppRequest } from '../interfaces'

const LocaleMiddleware = (
	request: AppRequest,
	_response: Response,
	next: NextFunction,
) => {
	const { LANGUAGES, FALLBACK_LANGUAGE } = process.env
	// const language = req.headers['accept-language']
	const language = request.headers['content-language'] || FALLBACK_LANGUAGE
	const locales = LANGUAGES?.split(',')

	if (locales?.includes(language as unknown as string)) {
		request.locale = language as unknown as string
	}

	next()
}

export default LocaleMiddleware
