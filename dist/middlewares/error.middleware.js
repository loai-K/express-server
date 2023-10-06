"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../helpers/logger"));
const errorMiddleware = (error, _request, response, next) => {
    if (error) {
        const status = error.code || 500;
        const message = error.message || 'Something went wrong';
        logger_1.default.error(message, { code: status, title: error.title });
        return response.status(status).json({ status, message });
    }
    return next();
};
exports.default = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map