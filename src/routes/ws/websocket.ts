// import { Server as HTTPServer } from 'http'
// import { ClientOptions, ServerOptions, Server } from 'ws'
//
// declare interface appServerOptions extends ServerOptions {
// 	server: HTTPServer
// 	channels: Array<Channel>
// }
//
// declare interface Client extends ClientOptions {
// 	id: string
// 	socketId?: string
// 	status?: boolean
// }
//
// declare interface Channel {
// 	id: number
// 	isAlive: boolean
// 	name: string
// 	clientsCount?: number
// 	clients?: Set<Client>
// }
//
// declare interface Socket extends WebSocket {
// 	isAlive: boolean
// 	channels?: Array<Channel>
// 	clients?: Set<Client>
// }
//
// class WebSocket {
// 	private static instance: Socket | null = null
// 	private server: Server | null = null
// 	public isAlive: boolean
// 	public channels: Array<Channel>
// 	public clients: Set<Client>
//
// 	constructor() {
// 		WebSocket.instance = WebSocket.getInstance()
// 		this.isAlive = true
// 		this.channels = []
// 		this.clients = new Set()
// 	}
//
// 	public static getInstance(): Socket {
// 		if (!WebSocket.instance) {
// 			WebSocket.instance = new WebSocket()
// 		}
//
// 		return WebSocket.instance
// 	}
//
// 	start(appServer: HTTPServer): void {
// 		this.server = new Server({
// 			noServer: false,
// 			server: appServer,
// 			path: '/ws',
// 			backlog: 1000,
// 			maxPayload: 104857600, // 100 MiB = (104857600 bytes)
// 			clientTracking: true,
// 			perMessageDeflate: false,
// 			verifyClient: () => {},
// 		} as ServerOptions)
// 	}
//
// 	close(): void {
// 		this.server = null
// 		this.isAlive = false
// 		WebSocket.instance = null
// 	}
//
// 	getClientId() {
// 		const lastId = Array.from(this.clients).pop()
// 	}
//
// 	validateToken(token: string) {
// 		// Implement your token validation logic here
// 		// Return true if the token is valid, otherwise return false
// 	}
//
// 	connect(client: Client): void {
// 		client.id = this.getClientId()
// 		this.clients.add(client)
// 	}
//
// 	disconnect(client: Client): void {
// 		this.clients.delete(client)
// 	}
//
// 	addChannel(channel: Channel): void {
// 		this.channels.push(channel)
// 	}
//
// 	removeChannel(channel: Channel): void {
// 		this.channels = this.channels.filter(function (c) {
// 			return channel.id != c.id
// 		})
// 	}
//
// 	joinToChannel(channel: Channel, client: Client): void {
// 		// message.startsWith('/join ')
// 		// const channelName = message.substring(6).trim()
// 		this.channels[channel.id].clients.add(client)
// 	}
//
// 	broadcast(
// 		sender: Client,
// 		message: string,
// 		channel: string | null = null,
// 	): void {
// 		// Broadcast the message to all clients in the same channel
// 		WebSocket.instance.clients.forEach((client: Client) => {
// 			if (client !== sender && client.id === sender.id) {
// 				client.send(`${channel}: ${message}`)
// 			}
// 		})
// 	}
// }



// const clients = new Set() // Store connected clients
//
// function broadcastToChannel(sender, message) {
// 	// Broadcast the message to all clients in the same channel
// 	wss.clients.forEach((client) => {
// 		if (client !== sender && client.channel === sender.channel) {
// 			client.send(`${sender.channel}: ${message}`)
// 		}
// 	})
// }
