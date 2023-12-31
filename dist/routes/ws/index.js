"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
function webSocket(appServer) {
    const websocketServer = new ws_1.WebSocketServer({
        noServer: false,
        server: appServer,
        path: '/ws',
        backlog: 1000,
        maxPayload: 104857600,
        clientTracking: true,
        perMessageDeflate: false,
    });
    websocketServer.on('connection', (ws, req) => {
        ws.send('Hi there, I am a WebSocket server');
        ws.on('message', (message) => {
            websocketServer.clients.forEach((client) => {
                client.send(`Received: ${message}`);
            });
            ws.send('Message received: ' + message);
        });
        ws.on('close', () => {
            ws.send('Client disconnected');
        });
        ws.on('error', console.error);
    });
    return websocketServer;
}
exports.default = webSocket;
//# sourceMappingURL=index.js.map