import * as jwt from 'jsonwebtoken'
import { IOtp } from '../interfaces'
import OtpModel from '../models/otp.model'
import appConfig from '../config/dotenvConfig'

// USED TO GENERATE JWT WITH PAYLOAD AND OPTIONS AS PARAMETERS.
// THE PAYLOAD CONTAINS THE DATA WHICH WILL BE SET AS JWT PAYLOAD.
// OPTIONS CONTAIN JWT OPTIONS
const generateJWT = function (
	payload: object = {},
	options: object = {},
): string {
	const privateKey: any = appConfig.tokenSecret
	const defaultOptions: object = {
		expiresIn: '1h',
	}

	return jwt.sign(payload, privateKey, Object.assign(defaultOptions, options))
}

// USED TO GENERATE JWT WITH PAYLOAD AND OPTIONS AS PARAMETERS.
// THE PAYLOAD CONTAINS THE DATA WHICH WILL BE SET AS JWT PAYLOAD.
// OPTIONS CONTAIN JWT OPTIONS
const generateForgotPasswordJWT = function (
	password: string,
	payload: object = {},
	options: object = {},
): string {
	const privateKey: any = appConfig.tokenSecret + password
	const defaultOptions: object = {
		expiresIn: '1h',
	}

	return jwt.sign(payload, privateKey, Object.assign(defaultOptions, options))
}

//VALIDATE ACCESS/REFRESH TOKEN
const validateToken = function (token: string) {
	try {
		const publicKey: any = appConfig.tokenSecret
		return jwt.verify(token, publicKey)
	} catch (e) {
		throw new Error('Invalid token')
	}
}

//VALIDATE FORGOT PASSWORD ACCESS TOKEN
const validateForgotPasswordJWT = function (password: string, token: string) {
	try {
		const publicKey: any = appConfig.tokenSecret + password
		return jwt.verify(token, publicKey)
	} catch (e) {
		throw new Error('Password reset link was expired')
	}
}

//USED TO GENERATE JWT WITH PAYLOAD AND OPTIONS AS PARAMETERS.
const extractToken = function (token: string): string | null {
	if (token?.startsWith('Bearer ')) {
		return token.slice(7, token.length)
	}
	return null
}

//GENERATE RANDOM PASSWORD
const generateRandomPassword = function (len: number): string {
	const randomString =
		'abcdefghijklmnopqrstuvwxyzBCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

	let password: string = ''
	for (let index = 0; index < len; index++) {
		password += randomString[Math.ceil(Math.random() * (randomString.length - 1))]
	}

	return password
}

//GENERATE OTP
const generateOtp = function (len: number): string {
	const digits = '0123456789'
	let OTP = ''
	for (let i = 0; i < len; i++) {
		OTP += digits[Math.floor(Math.random() * 10)]
	}

	return OTP
}

//VERIFY GENERATED OTP
const verifyOtp = async function (otp: IOtp): Promise<any> {
	const otpModel = new OtpModel()
	const existOtp = await otpModel.findOne(otp)
	const currentDate = new Date()
	if (!existOtp) return null

	if (
		existOtp.expiration &&
		new Date(new Date(existOtp.expiration).getTime() - 5 * 60000) < currentDate
	) {
		return null
	}

	return existOtp.id
}

//EXPORT
export {
	generateJWT,
	generateForgotPasswordJWT,
	validateToken,
	validateForgotPasswordJWT,
	extractToken,
	generateRandomPassword,
	generateOtp,
	verifyOtp,
}
