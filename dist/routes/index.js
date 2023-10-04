"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("./api"));
const proxy_routes_1 = __importDefault(require("./proxy.routes"));
const mountRoutes = (app) => {
    app.use('/api', api_1.default);
    app.use('/proxy', proxy_routes_1.default);
};
exports.default = mountRoutes;
//# sourceMappingURL=index.js.map