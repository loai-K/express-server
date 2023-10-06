"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../helpers/logger"));
const loggerMiddleware = (request, _response, next) => {
    console.error('Log::', 'Method: ' + request.method, 'Route: ' + request.path, 'IP: ' + request.ip, 'Time: ' + Date.now());
    logger_1.default.info(`Log:: Method: ${request.method}, Route: ${request.path}, IP: ${request.ip}, Time: ${Date.now()}`);
    next();
};
exports.default = loggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map