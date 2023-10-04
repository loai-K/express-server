"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ApiMiddleware(api_version = 'v1') {
    return (_request, response, next) => {
        response.setHeader('Api-Version', api_version);
        response.setHeader('Accept-Language', 'ar;q=1, en;q=0.8');
        response.setHeader('Content-Type', 'application/json; charset=utf-8');
        response.setHeader('X-XSS-Protection', '1; mode=block');
        next();
    };
}
exports.default = ApiMiddleware;
//# sourceMappingURL=api.middleware.js.map