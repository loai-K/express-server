"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loggerMiddleware = (request, _response, next) => {
    console.log('Log::', 'Method: ' + request.method, 'Route: ' + request.path, 'IP: ' + request.ip, 'Time: ' + Date.now());
    next();
};
exports.default = loggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map