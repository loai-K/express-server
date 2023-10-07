import { ServerOptions, WebSocket } from 'ws'
import { Server as HTTPServer } from 'http'

interface wsServerOptions extends ServerOptions {
	httpServer: HTTPServer
	status?: boolean
	channels?: Array<Channel>
}

interface Client extends WebSocket {
	id: string
	socketId?: string
	status?: boolean
}

interface Channel {
	id: number
	isAlive: boolean
	name: string
	clientsCount?: number
	clients?: Set<Client>
}

export { wsServerOptions, Client, Channel }
