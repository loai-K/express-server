import nodemailer from 'nodemailer';
import { Mail } from '../interfaces';
export default class MailService {
    private static instance;
    private transporter;
    private constructor();
    static getInstance(): MailService;
    createLocalConnection(): Promise<void>;
    createConnection(): Promise<void>;
    sendMail(requestId: string | number | string[], options: Mail): Promise<any>;
    verifyConnection(): Promise<true | undefined>;
    closeConnection(): Promise<void | undefined>;
    getTransporter(): nodemailer.Transporter | undefined;
}
//# sourceMappingURL=mail.service.d.ts.map