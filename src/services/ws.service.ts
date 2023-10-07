import { Server as HTTPServer, IncomingMessage } from 'http'
import { Server, ClientOptions, ServerOptions } from 'ws'
import {
	wsServerOptions,
	Client,
	Channel,
} from '../interfaces/websocket.interface'

class WebSocketServer {
	private static instance: WebSocketServer | undefined
	private static appServer: HTTPServer | undefined
	private webSocket: Server | undefined
	public isAlive: boolean
	public channels: Set<Channel>
	public clients: Set<Client>

	constructor(httpServer: HTTPServer) {
		// super()
		WebSocketServer.instance = this.getInstance(httpServer)
		this.isAlive = true
		this.channels = new Set<Channel>()
		this.clients = new Set<Client>()
	}

	public getInstance(httpServer: HTTPServer): WebSocketServer {
		if (!WebSocketServer.instance) {
			WebSocketServer.appServer = httpServer
			WebSocketServer.instance = new WebSocketServer(httpServer)
			this.Initialize()
		}

		return WebSocketServer.instance
	}

	private Initialize(): void {
		this.webSocket = new Server(
			{
				noServer: false,
				server: WebSocketServer.appServer,
				path: '/ws',
				backlog: 1000,
				maxPayload: 104857600, // 100 MiB = (104857600 bytes)
				clientTracking: true,
				perMessageDeflate: false,
				skipUTF8Validation: false,
				verifyClient: () => {},
			} as ServerOptions,
			() => {
				// console.log('WebSocketServer::Initial')
			},
		)

		this.loadDefaultChannels()
	}

	private loadDefaultChannels() {
		this.channels
			.add({
				id: 1,
				isAlive: true,
				name: 'chat',
				clientsCount: 0,
			} as Channel)
			.add({
				id: 2,
				isAlive: true,
				name: 'support',
				clientsCount: 0,
			} as Channel)
			.add({
				id: 3,
				isAlive: true,
				name: 'other',
				clientsCount: 0,
			} as Channel)
	}

	close(): void {
		this.isAlive = false
		this.webSocket = undefined
		WebSocketServer.appServer = undefined
		WebSocketServer.instance = undefined
	}
}

export default WebSocketServer
