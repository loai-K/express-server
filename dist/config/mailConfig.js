"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenvConfig_1 = __importDefault(require("./dotenvConfig"));
const mailConfig = {
    host: dotenvConfig_1.default.email.host,
    port: dotenvConfig_1.default.email.port || 587,
    secure: true,
    pool: true,
    from: dotenvConfig_1.default.email.from,
    sender: dotenvConfig_1.default.email.name,
    auth: {
        user: dotenvConfig_1.default.email.user,
        pass: dotenvConfig_1.default.email.password,
    },
    tls: {
        rejectUnauthorized: false,
    },
    logger: false,
};
exports.default = mailConfig;
//# sourceMappingURL=mailConfig.js.map