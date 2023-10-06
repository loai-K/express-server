"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenvConfig_1 = __importDefault(require("../config/dotenvConfig"));
const handleUnauthorizedError = (next) => {
    const error = new Error('Authentication Error, Please login again');
    error.code = 401;
    next(error);
};
function AuthMiddleware(req, _res, next) {
    try {
        const authHeader = req.get('Authorization');
        const tokenType = authHeader && authHeader.split(' ')[0].toLowerCase().trim();
        let token = authHeader && authHeader.split(' ')[1].trim();
        if (!token) {
            token = req.signedCookies.access_token;
        }
        if (tokenType && tokenType !== 'bearer')
            return handleUnauthorizedError(next);
        if (!token)
            return handleUnauthorizedError(next);
        const decoded = jsonwebtoken_1.default.verify(token, dotenvConfig_1.default.tokenSecret, {
            issuer: dotenvConfig_1.default.name,
            subject: 'authToken',
        });
        if (decoded) {
            req.user = { id: decoded.toString() };
            next();
        }
        else {
            handleUnauthorizedError(next);
        }
    }
    catch (err) {
        handleUnauthorizedError(next);
    }
}
exports.default = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map