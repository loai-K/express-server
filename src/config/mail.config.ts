// import nodemailer, { Transporter } from 'nodemailer'
// import SMTPConnection from 'nodemailer/lib/smtp-connection'
import appConfig from './dotenvConfig'

export const mailConfig: object = {
	host: appConfig.email.host,
	port: appConfig.email.port || 587,
	secure: true, // use TLS
	pool: true, // use pooled connection
	from: appConfig.email.from,
	sender: appConfig.email.name,
	auth: {
		user: appConfig.email.user,
		pass: appConfig.email.password,
	},
	tls: {
		// do not fail on invalid certs
		rejectUnauthorized: false,
	},
	logger: false,
}

export const poolConfig = `smtps://${appConfig.email.user}:${appConfig.email.password}@${appConfig.email.host}/?pool=true`
// export const SmtpConnection: SMTPConnection = new SMTPConnection(poolConfig)
// export const MailerTransporter: Transporter = nodemailer.createTransport(poolConfig)

export default mailConfig
