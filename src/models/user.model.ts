import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { dbQuery } from '../database'
import appConfig from '../config/dotenvConfig'
import Model from './Model'
import User from '../types/user.type'

class UserModel extends Model {
	// hashing password
	hashPassword(password: string) {
		return bcrypt.hashSync(
			`${password}${appConfig.bcryptHash}`,
			appConfig.saltRounds,
		)
	}

	// Generate Access Token when user login success
	generateAccessToken(userId: string) {
		return jwt.sign({ userId }, appConfig.tokenSecret as unknown as string, {
			expiresIn: appConfig.tokenExpires,
			issuer: appConfig.name as unknown as string,
			subject: 'authToken',
			algorithm: 'HS256',
		})
	}

	// Generate Refresh Access Token to use it for renew expired token
	refreshAccessToken(userId: string) {
		return jwt.sign(
			{ userId },
			appConfig.tokenSecretRefresh as unknown as string,
			{
				expiresIn: appConfig.tokenExpires,
				issuer: appConfig.name as unknown as string,
				subject: 'refreshToken',
				algorithm: 'HS256',
			},
		)
	}

	// get all users
	async findAll(page: number = 1, perPage: number = 10): Promise<User[]> {
		try {
			const sqlQuery = `SELECT id, user_name, first_name, last_name, bio, email, mobile, status, last_login, registered_at FROM users ORDER BY id OFFSET ${
				(page - 1) * perPage
			} ROWS FETCH NEXT ${perPage} ROWS ONLY`
			return await dbQuery(sqlQuery)
		} catch (error) {
			throw new Error(`Error at retrieving users: ${(error as Error).message}`)
		}
	}

	// get one user by id
	async find(id: string): Promise<User> {
		try {
			const sqlQuery =
				'SELECT id, user_name, first_name, last_name, bio, email, mobile, status, last_login, registered_at FROM users WHERE id=$1 ORDER BY id LIMIT 1;'
			const result = await dbQuery(sqlQuery, [id])
			return result[0] as User
		} catch (error) {
			throw new Error(`could not find user (${id}): ${(error as Error).message}`)
		}
	}

	// create user
	async create(user: User): Promise<User> {
		try {
			// const connection = await db.connect()
			const sqlQuery = `INSERT INTO users (first_name, last_name, user_name, email, mobile, password) 
				values ($1, $2, $3, $4, $5, $6) 
				returning id, user_name, first_name, last_name, email, mobile`
			const result = await dbQuery(sqlQuery, [
				user.first_name,
				user.last_name || '',
				user.user_name,
				user.email,
				user.mobile || '',
				this.hashPassword(user.password as string),
			])
			// connection.release()
			return result[0]
		} catch (error) {
			throw new Error(
				`Unable to create (${user.user_name}): ${(error as Error).message}`,
			)
		}
	}

	// update user
	async update(user: User, id: string): Promise<User> {
		try {
			const sqlQuery = `UPDATE users SET first_name=$1, last_name=$2, user_name=$3, email=$4, mobile=$5, password=$6 
				WHERE id=($7) returning id, user_name, first_name, last_name, bio, email, mobile, status, last_login, registered_at`
			const result = await dbQuery(sqlQuery, [
				user.first_name,
				user.last_name || '',
				user.user_name,
				user.email,
				user.mobile || '',
				this.hashPassword(user.password as string),
				id,
			])
			return result[0]
		} catch (error) {
			throw new Error(
				`Unable to update (${user.user_name}): ${(error as Error).message}`,
			)
		}
	}

	// delete user
	async delete(id: string): Promise<User> {
		try {
			const sqlQuery = `DELETE FROM users WHERE id=($1) 
				returning id, user_name, first_name, last_name, bio, email, mobile, status, last_login, registered_at`
			const result = await dbQuery(sqlQuery, [id])
			return result[0]
		} catch (error) {
			throw new Error(`Unable to delete user (${id}): ${(error as Error).message}`)
		}
	}

	// authenticate user
	async authenticate(email: string, password: string): Promise<User | null> {
		try {
			const sqlQuery = 'SELECT password FROM users WHERE email=$1'
			const result = await dbQuery(sqlQuery, [email])
			if (result.length) {
				const { password: hashPassword } = result[0]
				const isPasswordValid = bcrypt.compareSync(
					`${password}${appConfig.bcryptHash}`,
					hashPassword,
				)
				if (isPasswordValid) {
					const userInfo = await dbQuery(
						'SELECT id, user_name, first_name, last_name, bio, email, mobile, status, last_login, registered_at FROM users WHERE email=($1) LIMIT 1',
						[email],
					)
					return userInfo[0]
				}
			}
			return null
		} catch (error) {
			throw new Error(`Unable to login: ${(error as Error).message}`)
		}
	}
}

export default UserModel
