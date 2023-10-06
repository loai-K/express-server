"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages = (ws, message) => {
    ws.send('Message received: ' + message);
};
exports.default = messages;
//# sourceMappingURL=messages.js.map