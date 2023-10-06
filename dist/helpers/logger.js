"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const dotenvConfig_1 = __importDefault(require("../config/dotenvConfig"));
const Logger = (0, winston_1.createLogger)({
    level: 'info',
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
    },
    format: winston_1.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.transports.File({ filename: 'combined.log' }),
    ],
    exitOnError: true,
    silent: !dotenvConfig_1.default.logState,
});
if (dotenvConfig_1.default.environment !== 'production') {
    Logger.add(new winston_1.transports.Console({
        format: winston_1.format.simple(),
    }));
}
exports.default = Logger;
//# sourceMappingURL=logger.js.map