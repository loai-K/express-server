"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
exports.corsOptions = {
    origin: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
};
exports.default = exports.corsOptions;
//# sourceMappingURL=cors.config.js.map