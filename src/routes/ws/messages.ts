import { WebSocket, RawData } from 'ws'

const messages = (ws: WebSocket, message: RawData) => {
	// Handle messages from authenticated client
	ws.send('Message received: ' + message)
}

export default messages
