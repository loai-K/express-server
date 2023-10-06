import { createServer } from 'http'
// import supertest from 'supertest'
import { WebSocket } from 'ws'
import app from '../../index'
import { appConfig } from '../../config'

const server = createServer(app)
describe('WebSocket Testing', () => {
	// supertest(app)
	let wsClient: WebSocket

	// beforeAll((done) => {
	beforeAll((done) => {
		server.listen(0, () => {
			wsClient = new WebSocket(`ws://localhost:${appConfig.port}/ws`)
			// wsClient = supertest(`ws://localhost:${appConfig.port}/ws`)

			done()
		})
	})

	afterAll(() => {
		server.close()
	})

	it('should open connection via WebSocket', async () => {
		wsClient.on('open', () => {
			wsClient.send('hello world')
		})
	})

	it('should send and receive messages via WebSocket', async () => {
		const messageToSend = 'Hello, WebSocket!'

		wsClient.on('message', (message: string) => {
			wsClient.send(messageToSend)

			expect(message).toBe(`Received: ${messageToSend}`)
		})
	})

	it('should close connection via WebSocket', async () => {
		wsClient.on('close', (message: string) => {
			wsClient.send('Bye, WebSocket')

			expect(message).toBe(`Client disconnected`)
		})
	})
})
