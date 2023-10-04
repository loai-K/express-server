import db from '../../database'
import OtpModel from '../otp.model'
import { IOtp } from '../../interfaces'
import { OtpType } from '../../helpers/enums'

const otpModel = new OtpModel()

describe('TEST: OTP Module', () => {
	describe('Test Method exists', () => {
		it('should have an Generate OTP method', () => {
			expect(otpModel.generateOTP).toBeDefined()
		})

		it('should have an Create OTP method', () => {
			expect(otpModel.createOne).toBeDefined()
		})

		it('should have an Find OTP method', () => {
			expect(otpModel.findOne).toBeDefined()
		})

		it('should have an Check OTP method', () => {
			expect(otpModel.check).toBeDefined()
		})
	})

	describe('Test OTP Logic', () => {
		const otp = {
			userId: '123-123-123-123',
			otpType: OtpType.VERIFICATION,
			otpCode: otpModel.generateOTP(),
		} as IOtp

		beforeAll(async () => {
			const createdOtp = await otpModel.createOne(otp)
			otp.id = createdOtp.id
		})

		afterAll(async () => {
			const connection = await db.connect()
			const sql = 'DELETE FROM otp;'
			const resetSequence = 'ALTER SEQUENCE otp_id_seq RESTART WITH 1;'
			await connection.query(sql)
			await connection.query(resetSequence)
			connection.release()
		})

		it('should generate a new OTP Code contains 4 digits', () => {
			const otp = otpModel.generateOTP()

			expect(otp).toBeDefined()
			expect(otp.length).toEqual(4)
			expect(typeof otp).toBe('string')
		})

		it('Find method should return OTP Object', async () => {
			const foundedOtp = await otpModel.findOne(otp)

			expect(foundedOtp).toBeDefined()
			expect(foundedOtp?.userId).toBe(otp.userId)
			expect(foundedOtp?.otpCode.length).toEqual(4)
			expect(foundedOtp?.otpCode).toEqual(otp.otpCode)
			expect(foundedOtp?.otpType).toEqual(otp.otpType)
			expect(
				new Date(foundedOtp?.expiration as unknown as string) >=
					new Date(Date.now()),
			).toBeTrue()
			expect(
				new Date(foundedOtp?.expiration as unknown as string) <
					new Date(new Date(Date.now() + 6 * 60000)),
			).toBeTrue()
		})

		it('Find method should return null if OTP not valid', async () => {
			const foundedOtp = await otpModel.findOne({
				...otp,
				otpCode: otpModel.generateOTP(),
			})

			expect(foundedOtp).toBeNull()
		})

		it('Create method should generate a new OTP Object', async () => {
			const otp = otpModel.generateOTP()
			const generatedOtp = await otpModel.createOne({
				userId: '321-321-321-321',
				otpCode: otp,
				otpType: OtpType.CHECK,
			})

			expect(generatedOtp).toBeDefined()
			expect(generatedOtp.otpCode.length).toEqual(4)
			expect(generatedOtp.otpCode).toEqual(otp)
			expect(generatedOtp.otpType).toBe(OtpType.CHECK)
			expect(generatedOtp.userId).toBe('321-321-321-321')
			expect(
				new Date(generatedOtp.expiration as unknown as string) >=
					new Date(Date.now()),
			).toBeTrue()
			expect(
				new Date(generatedOtp.expiration as unknown as string) <
					new Date(new Date(Date.now() + 6 * 60000)),
			).toBeTrue()
		})
	})
})
