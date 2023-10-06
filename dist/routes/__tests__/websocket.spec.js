"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const ws_1 = require("ws");
const index_1 = __importDefault(require("../../index"));
const config_1 = require("../../config");
const server = (0, http_1.createServer)(index_1.default);
describe('WebSocket Testing', () => {
    let wsClient;
    beforeAll((done) => {
        server.listen(0, () => {
            wsClient = new ws_1.WebSocket(`ws://localhost:${config_1.appConfig.port}/ws`);
            done();
        });
    });
    afterAll(() => {
        server.close();
    });
    it('should open connection via WebSocket', async () => {
        wsClient.on('open', () => {
            wsClient.send('hello world');
        });
    });
    it('should send and receive messages via WebSocket', async () => {
        const messageToSend = 'Hello, WebSocket!';
        wsClient.on('message', (message) => {
            wsClient.send(messageToSend);
            expect(message).toBe(`Received: ${messageToSend}`);
        });
    });
    it('should close connection via WebSocket', async () => {
        wsClient.on('close', (message) => {
            wsClient.send('Bye, WebSocket');
            expect(message).toBe(`Client disconnected`);
        });
    });
});
//# sourceMappingURL=websocket.spec.js.map