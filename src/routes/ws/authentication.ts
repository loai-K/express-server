import { Request } from 'express'
import { WebSocket } from 'ws'
import jwt from "jsonwebtoken";
import appConfig from "@config/dotenvConfig";

const handleUnauthorizedError = (ws: WebSocket) => {
	ws.close(1008, 'Unauthorized, Please login')
	return
}

const authentication = (ws: WebSocket, req: Request) => {
	const authorizationHeader = req.headers['authorization']
	const tokenType =
		authorizationHeader && authorizationHeader.split(' ')[0].toLowerCase().trim()
	let token = authorizationHeader && authorizationHeader.split(' ')[1].trim()

	// if token not find try to get it from cookie
	if (!token) {
		// token = req.cookies.access_token
		token = req.signedCookies.access_token
	}

	// token type not bearer
	if (tokenType && tokenType !== 'bearer') return handleUnauthorizedError(ws)
	// No Token Provided.
	if (!token) return handleUnauthorizedError(ws)

	// const decoded = jwt.verify(token, appConfig.tokenSecret, {
	// 	issuer: appConfig.name as unknown as string,
	// 	subject: 'authToken',
	// })

}

export default authentication
