import { rateLimit, RateLimitRequestHandler } from 'express-rate-limit'

export const apiLimiter: RateLimitRequestHandler = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	message: 'too many requests',
	// store: ... , // Use an external store for more precise rate limiting
})

export default apiLimiter