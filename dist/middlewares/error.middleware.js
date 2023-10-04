"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (error, _request, response, next) => {
    if (error) {
        const status = error.code || 500;
        const message = error.message || 'Something went wrong';
        return response.status(status).json({ status, message });
    }
    return next();
};
exports.default = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map