"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CorsMiddleware = (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', `${process.env.PATH},${process.env.PATH}`);
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Authorization,Content-Type,Accept');
    if (request.method === 'OPTIONS') {
        response.send(204);
    }
    else {
        next();
    }
};
exports.default = CorsMiddleware;
//# sourceMappingURL=cors.middleware.js.map