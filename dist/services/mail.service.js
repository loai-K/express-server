"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importStar(require("nodemailer"));
const config_1 = require("../config");
class MailService {
    static instance;
    transporter;
    constructor() { }
    static getInstance() {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }
    async createLocalConnection() {
        const account = await (0, nodemailer_1.createTestAccount)();
        this.transporter = nodemailer_1.default.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });
    }
    async createConnection() {
        this.transporter = nodemailer_1.default.createTransport(config_1.mailConfig);
    }
    async sendMail(requestId, options) {
        return await this.transporter
            ?.sendMail({
            from: `"${config_1.appConfig.email.name}" ${config_1.appConfig.email.from || options.from}`,
            to: options.to,
            cc: options.cc,
            bcc: options.bcc,
            subject: options.subject,
            text: options.text,
            html: options.html,
        })
            .then((info) => {
            this.transporter?.close();
            return info;
        });
    }
    async verifyConnection() {
        return this.transporter?.verify();
    }
    async closeConnection() {
        return this.transporter?.close();
    }
    getTransporter() {
        return this.transporter;
    }
}
exports.default = MailService;
//# sourceMappingURL=mail.service.js.map