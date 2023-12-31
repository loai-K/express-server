import MailService from '../mail.service'

const mailService = MailService.getInstance()

describe('Test Email Service', () => {
	describe('Test Email Service Methods exists', () => {
		it('should have an SendMail method', () => {
			expect(mailService.sendMail).toBeDefined()
		})

		it('should have an Create Connection method', () => {
			expect(mailService.createConnection).toBeDefined()
		})
	})

	describe('Test Send Mail Method Logic', () => {
		it('should success send email and return mail object', async () => {
			const mailService = MailService.getInstance()
			await mailService.createLocalConnection()
			const result = await mailService.sendMail(Math.random() * 1000, {
				to: 'test@example.com',
				subject: 'Verify OTP',
				text: 'Hello world?',
				html: '<p>Verify OTP 1234</p>',
			})
			await mailService.closeConnection()

			expect(result.messageId).toBeDefined()
			expect(result.response).toContain('250 Accepted ')
			expect(result.accepted[0]).toBe('test@example.com')
			expect(result.rejected.length).toEqual(0)
		})
	})
})
