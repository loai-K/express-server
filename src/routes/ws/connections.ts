import { Request } from 'express'
import { WebSocket } from 'ws'
import authentication from './authentication'
import messages from './messages'

const connections = (ws: WebSocket, req: Request) => {
	// Authentication logic goes here
	authentication(ws, req)

	// Client is authenticated, handle WebSocket communication
	ws.on('open', messages)
	ws.on('ping', messages)
	ws.on('pong', messages)
	ws.on('message', messages)
	ws.on('error', messages)
	ws.on('close', messages)
	// ws.on('message', (message: RawData) => {
	// 	// Handle messages from authenticated client
	// 	messages(ws, message)
	// })
}

export default connections
