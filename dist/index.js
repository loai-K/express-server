"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("./config");
const bootstrap_1 = require("./bootstrap");
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const app = (0, express_1.default)()
    .disable('x-powered-by')
    .use(express_1.default.json())
    .use('/', express_1.default.static(path.join(__dirname, 'public')))
    .use('/static', express_1.default.static(path.join(__dirname, 'uploads')))
    .use((0, cookie_parser_1.default)(config_1.appConfig.cookieSecret))
    .use((0, compression_1.default)())
    .use((0, cors_1.default)(config_1.corsOptions))
    .use((0, helmet_1.default)())
    .use('/api', config_1.actuatorApp)
    .use('/api', config_1.apiLimiter);
(0, routes_1.default)(app);
app.use(error_middleware_1.default).use((_req, res) => {
    return res.status(404).json({
        message: 'not found',
    });
});
const server = app.listen(config_1.appConfig.port, () => {
    bootstrap_1.lifecycle.init().then();
});
const exit = () => {
    process.exitCode = 128;
    server.close(async () => {
        server.closeAllConnections();
        await bootstrap_1.lifecycle.close();
    });
};
process
    .on('SIGQUIT', exit)
    .on('SIGTSTP', exit)
    .on('SIGTERM', exit)
    .on('SIGINT', exit)
    .on('uncaughtException', exit)
    .on('unhandledRejection', exit);
bootstrap_1.lifecycle.on('close', exit);
exports.default = server;
//# sourceMappingURL=index.js.map