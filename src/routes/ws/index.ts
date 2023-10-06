import { Server as appServer } from 'http'
import { WebSocketServer, WebSocket, ServerOptions } from 'ws'

declare interface Socket extends WebSocket {
	isAlive: boolean
}

export default function webSocket(appServer: appServer) {
	// const websocketServer = new Server({ server })
	const websocketServer = new WebSocketServer({
		noServer: false,
		server: appServer,
		path: '/ws',
		backlog: 1000,
		maxPayload: 104857600, // 100 MiB = (104857600 bytes)
		clientTracking: true,
		perMessageDeflate: false,
		// verifyClient: () => {},
	} as ServerOptions)

	// Create a WebSocket route ('/ws')
	// connection is up, let's add a simple event
	websocketServer.on('connection', (ws: Socket) => {
		ws.send('Hi there, I am a WebSocket server')

		// Handle WebSocket messages
		ws.on('message', (message) => {
			websocketServer.clients.forEach((client) => {
				client.send(`${message}`)
			})

			// You can send a response back to the client if needed
			ws.send('Message received: ' + message)
		})

		// Handle WebSocket disconnections
		ws.on('close', () => {
			// console.log('Client disconnected')
		})

		ws.on('error', console.error)
	})

	return websocketServer
}
