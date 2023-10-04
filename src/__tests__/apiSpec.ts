import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

describe('TEST: Server API Versions', () => {
	it('Test Server API v1 | should Return server info health', async () => {
		const response = await request.get('/api/v1')

		expect(response.status).toBe(200)
		expect(response.body.data.health).toBeTrue()
		expect(response.body.data.api).toEqual('v1')
		expect(response.get('api-version')).toEqual('v1')
	})

	it('Test Server API v2 | should Return server info health', async () => {
		const response = await request.get('/api/v2')

		expect(response.status).toBe(200)
		expect(response.body.data.health).toBeTrue()
		expect(response.body.data.api).toEqual('v2')
		expect(response.get('api-version')).toEqual('v2')
	})
})
