"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLimiter = void 0;
const express_rate_limit_1 = require("express-rate-limit");
exports.apiLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: 'too many requests',
});
exports.default = exports.apiLimiter;
//# sourceMappingURL=rateLimitConfig.js.map