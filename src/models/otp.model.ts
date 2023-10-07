import Model from './Model'
import { dbQuery } from '../database'
import { IOtp, IOtpDB } from '../interfaces/otp.interface'
// import { OtpType } from '../helpers/enums'

// export interface IOtpModel extends IOtp {}

class OtpModel extends Model {
	// Function to generate OTP
	generateOTP(): string {
		// Declare a digits variable, which stores all digits
		const digits = '0123456789'
		let OTP = ''
		for (let i = 0; i < 4; i++) {
			OTP += digits[Math.floor(Math.random() * 10)]
		}

		return OTP
	}

	get getExpirationDate(): Date {
		return new Date(Date.now() + 5 * 60000)
	}

	cast(dbObject: IOtpDB): IOtp {
		return {
			id: dbObject.id,
			userId: dbObject.user_id,
			otpType: dbObject.otp_type,
			otpCode: dbObject.otp_code,
			expiration: dbObject.expiration,
		} as IOtp
	}

	validateExpiration(data: Date): boolean {
		// Date.parse(data.toString()) < Date.parse(Date.now().toString())
		return new Date(data) < new Date()
	}

	async findOne(otp: IOtp): Promise<IOtp | null> {
		try {
			const sqlQuery =
				'SELECT id, user_id, otp_type, otp_code, expiration FROM otp WHERE user_id=$1 AND otp_code=$2 ORDER BY id DESC LIMIT 1;'
			const result = await dbQuery(sqlQuery, [otp.userId, otp.otpCode])
			if (result.length > 0) {
				return this.cast(result[0] as IOtpDB)
			}
			return null
		} catch (error) {
			throw new Error(`Error at retrieving users: ${(error as Error).message}`)
		}
	}

	async createOne(otp: IOtp): Promise<IOtp> {
		try {
			const sqlQuery = `INSERT INTO otp (user_id, otp_type, otp_code, expiration) 
				values ($1, $2, $3, $4) 
				returning *;`
			const result = await dbQuery(sqlQuery, [
				otp.userId as unknown as string,
				otp.otpType as unknown as string,
				otp.otpCode as unknown as string,
				this.getExpirationDate as unknown as string,
			])

			return this.cast(result[0] as IOtpDB)
		} catch (error) {
			throw new Error(`Error at retrieving users: ${(error as Error).message}`)
		}
	}

	async check(otp_code: string): Promise<boolean> {
		try {
			const sqlQuery =
				'SELECT * FROM otp WHERE otp_code=($1) ORDER BY id DESC LIMIT 1;'
			const result = await dbQuery(sqlQuery, [otp_code])

			if (result.length === 0) return false
			else {
				if (!this.validateExpiration(result[0].expiration)) {
					return false
				}

				// TODO:: check user_id in otp data
				// result[0].userId === authUser.id
				return true
			}
		} catch (error) {
			throw new Error(`Error at retrieving users: ${(error as Error).message}`)
		}
	}
}

export default OtpModel
