import nodemailer, { Transporter, createTestAccount } from 'nodemailer'
import { Mail } from '../interfaces'
import mailConfig from '../config/mailConfig'
import appConfig from '../config/dotenvConfig'

export default class MailService {
	private static instance: MailService
	private transporter: Transporter | undefined

	private constructor() {}

	//INSTANCE CREATE FOR MAIL
	static getInstance() {
		if (!MailService.instance) {
			MailService.instance = new MailService()
		}
		return MailService.instance
	}

	//CREATE CONNECTION FOR LOCAL Test
	async createLocalConnection() {
		const account = await createTestAccount()
		this.transporter = nodemailer.createTransport({
			host: account.smtp.host,
			port: account.smtp.port,
			secure: account.smtp.secure,
			auth: {
				user: account.user,
				pass: account.pass,
			},
		})
	}

	//CREATE A CONNECTION FOR LIVE
	async createConnection() {
		this.transporter = nodemailer.createTransport(mailConfig)
	}

	//SEND MAIL
	async sendMail(requestId: string | number | string[], options: Mail) {
		return await this.transporter
			?.sendMail({
				from: `"${appConfig.email.name}" ${appConfig.email.from || options.from}`,
				to: options.to,
				cc: options.cc,
				bcc: options.bcc,
				subject: options.subject,
				text: options.text,
				html: options.html,
			})
			.then((info) => {
				// console.log(`${requestId} - Mail sent successfully!!`)
				this.transporter?.close()
				return info
			})
	}

	//VERIFY CONNECTION
	async verifyConnection() {
		return this.transporter?.verify()
	}

	async closeConnection() {
		return this.transporter?.close()
	}

	//CREATE TRANSPORTER
	getTransporter() {
		return this.transporter
	}
}
