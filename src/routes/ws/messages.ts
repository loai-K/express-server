import { WebSocket, RawData } from 'ws'
import moment from 'moment'
import UserType from '../../types/user.type'

function formatMessage(user: UserType, message: string): object {
	return {
		userId: user.id,
		userName: user.user_name,
		message: message,
		time: moment().format('h:mm:ss A'),
	}
}

const messages = (ws: WebSocket, message: RawData) => {
	// Handle messages from authenticated client
	ws.send('Message received: ' + message, (error: Error | undefined) => {
		console.error('WebSocket: ', error)
	})
}

export default messages
