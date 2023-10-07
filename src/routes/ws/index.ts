import { Server as HTTPServer, IncomingMessage } from 'http'
import { WebSocketServer, ServerOptions, MessageEvent, RawData } from 'ws'
import { Client, Channel } from '../../interfaces/websocket.interface'

const clients = new Set<Client>()
const channels = new Set<Channel>()

function addClient(client: Client, req: IncomingMessage) {
	const authorizationHeader = req.headers['authorization']
	const websocketKey = req.headers['sec-websocket-key'] || ''
	// const decodedData = Buffer.from(websocketKey, 'base64').toString('utf-8')

	console.log(req.method)
	const url = new URL(req.url as string, `ws://${req.headers.host}`)
	const queryParams = url.searchParams
	const channel = queryParams.get('channel')
	console.log(queryParams)
	console.log(channel)

	console.log('Connected Clients Count: ', getConnectedClientCount())

	senMessage(client, 'Client Connected ' + client.readyState)
	clients.add({
		...client,
		id: authorizationHeader,
		socketId: websocketKey,
		status: true,
	} as Client)
}

function removeClient(client: Client) {
	senMessage(client, 'Client disconnected')
	clients.delete(client)
}

function broadcastMessage(sender: Client, message: RawData): void {
	clients.forEach((client: Client) => {
		if (client !== sender) {
			client.send(message.toString())
		}
	})
}

function senMessage(sender: Client, message: string): void {
	sender.send(message.toString())
}

function getConnectedClientCount(): number {
	return clients.size + 1
}

// Custom verification function
function verifyClientBasedOnInfo(info: {
	origin: string
	secure: boolean
	req: IncomingMessage
}) {
	// info.req is the HTTP request object
	// You can access headers, cookies, and other request information from info.req

	console.log(info.secure)
	// Implement your custom logic here, e.g., check authentication tokens or cookies
	// Return true if the client is valid or false if the connection should be rejected
	// Optionally, you can provide a response code and reason string for rejection
	return true // Accept all clients in this example
}

export default function webSocket(appServer: HTTPServer) {
	// const websocketServer = new Server({ server })
	const websocketServer = new WebSocketServer({
		noServer: false,
		server: appServer,
		path: '/ws',
		backlog: 1000,
		maxPayload: 104857600, // 100 MiB = (104857600 bytes)
		clientTracking: true,
		perMessageDeflate: false,
		verifyClient: (
			info: { origin: string; secure: boolean; req: IncomingMessage },
			cb,
		) => {
			// Implement your custom verification logic here
			const isValidClient = verifyClientBasedOnInfo(info)

			// Call the callback (cb) with the result of the verification
			// Pass true if the client is valid, or false to reject the connection
			cb(isValidClient, 401, 'Unauthorized')
		},
	} as ServerOptions)

	// Create a WebSocket route ('/ws')
	// connection is up, let's add a simple event
	websocketServer.on('connection', (ws: Client, req: IncomingMessage) => {
		addClient(ws, req)
		ws.send('Hi there, I am a WebSocket server')

		// Handle WebSocket messages
		ws.on('message', (message: RawData) => {
			broadcastMessage(ws, message)

			// You can send a response back to the client if needed
			ws.send('Message received: ' + message)
		})

		// Handle WebSocket disconnections
		ws.on('close', () => {
			removeClient(ws)
		})

		ws.on('error', console.error)
	})

	return websocketServer
}
