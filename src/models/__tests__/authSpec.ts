import db from '../../database'
import UserModel from '../user.model'
import User from '../../types/user.type'

const userModel = new UserModel()

describe('TEST: Authentication Module', () => {
	describe('Test Method exists', () => {
		it('should have an Authenticate User method', () => {
			expect(userModel.authenticate).toBeDefined()
		})
	})

	describe('Test Authentication Logic', () => {
		const user = {
			user_name: 'test',
			first_name: 'test',
			last_name: 'Any',
			email: 'test@test.test',
			mobile: '0000',
			password: 'secret',
		} as User

		beforeAll(async () => {
			const createdUser = await userModel.create(user)
			user.id = createdUser.id
		})

		afterAll(async () => {
			const connection = await db.connect()
			const sql = 'DELETE FROM users;'
			await connection.query(sql)
			connection.release()
		})

		it('Authentication method should return the authenticated user', async () => {
			const authenticatedUser = await userModel.authenticate(
				user.email,
				user.password as string,
			)

			expect(authenticatedUser?.user_name).toBe(user.user_name)
			expect(authenticatedUser?.first_name).toBe(user.first_name)
			expect(authenticatedUser?.last_name).toBe(user.last_name)
			expect(authenticatedUser?.email).toBe(user.email)
		})

		it('Authentication method should return NULL for wrong credentials', async () => {
			const authenticatedUser = await userModel.authenticate(
				user.email,
				'fake-password',
			)

			expect(authenticatedUser).toBeNull()
		})
	})
})
