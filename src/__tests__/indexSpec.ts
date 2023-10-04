import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

describe('TEST: Server Running', () => {
	it('should return Response with status 200', async () => {
		const response = await request.get('/api')
		expect(response.status).toBe(200)
	})

	it('should return Response with status 404', async () => {
		const response = await request.get('/undefined-route')
		expect(response.status).toBe(404)
	})

	it('should return Response and have some headers', async () => {
		const response = await request.get('/api')

		expect(response.get('x-powered-by')).toBeUndefined()
		expect(response.get('Content-Security-Policy')).toBeDefined()
		expect(response.get('Content-Type')).toBe('application/json; charset=utf-8')
	})
})
