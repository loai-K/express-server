import { Server as appServer } from 'http'
import { WebSocketServer, WebSocket, ServerOptions } from 'ws'

declare interface appServerOptions {
	server: appServer
	channels: Array<Channel>
}

declare interface Client {
	id: string
	socketId?: string
	status?: boolean
}

declare interface Channel {
	id: number
	isAlive: boolean
	name: string
	clientsCount?: number
	clients?: Array<Client>
}

declare interface Socket extends WebSocket {
	isAlive: boolean
	channels?: Array<Channel>
	clients?: Array<Client>
}

class WebSocket {
	private static instance: Socket | null = null
	private server: WebSocketServer | null = null
	public isAlive: boolean
	public channels: Array<Channel>
	public clients: Set<Client>

	constructor() {
		WebSocket.instance = WebSocket.getInstance()
		this.isAlive = true
		this.channels = []
		this.clients = new Set()
	}

	public static getInstance(): Socket {
		if (!WebSocket.instance) {
			WebSocket.instance = new WebSocket()
		}

		return WebSocket.instance
	}

	start(appServer: appServer): void {
		this.server = new WebSocketServer({
			noServer: false,
			server: appServer,
			path: '/ws',
			backlog: 1000,
			maxPayload: 104857600, // 100 MiB = (104857600 bytes)
			clientTracking: true,
			perMessageDeflate: false,
			// verifyClient: () => {},
		} as ServerOptions)
	}

	close(): void {
		this.server = null
		this.isAlive = false
		WebSocket.instance = null
	}

	connect(client: Client): void {
		this.clients.add(client)
	}

	disconnect(client: Client): void {
		this.clients.delete(client)
	}

	addChannel(channel: Channel): void {
		this.channels.push(channel)
	}

	removeChannel(channel: Channel): void {
		this.channels = this.channels.filter(function (c) {
			return channel.id != c.id
		})
	}

	joinToChannel(channel: string): void {
		// message.startsWith('/join ')
		const channelName = message.substring(6).trim()
		this.channels = channelName
	}

	broadcast(
		sender: Client,
		message: string,
		channel: string | null = null,
	): void {
		// Broadcast the message to all clients in the same channel
		this.clients.forEach((client: Client) => {
			if (client !== sender && client.id === sender.id) {
				client.send(`${channel}: ${message}`)
			}
		})
	}
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

const clients = new Set() // Store connected clients

function broadcastToChannel(sender, message) {
	// Broadcast the message to all clients in the same channel
	wss.clients.forEach((client) => {
		if (client !== sender && client.channel === sender.channel) {
			client.send(`${sender.channel}: ${message}`)
		}
	})
}
