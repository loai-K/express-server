import { Twilio, ClientOpts } from 'twilio'
import { appConfig } from '../config'

class TwilioService {
	private static instance: TwilioService
	protected client: Twilio | undefined

	constructor() {
		this.Initialize()
		TwilioService.instance = TwilioService.getInstance()
	}

	static getInstance() {
		if (!TwilioService.instance) {
			TwilioService.instance = new TwilioService()
		}
		return TwilioService.instance
	}

	Initialize() {
		this.client = new Twilio(appConfig.twilio.sid, appConfig.twilio.authToken, {
			lazyLoading: false,
			autoRetry: true,
			maxRetries: 3,
		} as ClientOpts)
	}

	async sendSMS(to: string, body: string) {
		this.client?.messages
			.create({
				body: body,
				from: appConfig.twilio.number, // Your Twilio phone number
				to: to,
			})
			.then((message) => {
				console.log(`Message sent with SID: ${message.sid}`)
			})
			.catch((error) => {
				console.error(`Error sending message: ${error}`)
			})
	}

	async sendWhatsAppMessage(to: string, body: string) {
		this.client?.messages
			.create({
				from: `whatsapp:${appConfig.twilio.authToken}`, // Your Twilio WhatsApp number
				body: body,
				to: `whatsapp:${to}`,
			})
			.then((message) => {
				console.log(`WhatsApp message sent with SID: ${message.sid}`)
			})
			.catch((error) => {
				console.error(`Error sending WhatsApp message: ${error}`)
			})
	}
}

export default TwilioService
