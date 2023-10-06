"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = __importDefault(require("./authentication"));
const messages_1 = __importDefault(require("./messages"));
const connections = (ws, req) => {
    (0, authentication_1.default)(ws, req);
    ws.on('open', messages_1.default);
    ws.on('ping', messages_1.default);
    ws.on('pong', messages_1.default);
    ws.on('message', messages_1.default);
    ws.on('error', messages_1.default);
    ws.on('close', messages_1.default);
};
exports.default = connections;
//# sourceMappingURL=connections.js.map