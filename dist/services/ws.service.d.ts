/// <reference types="node" />
import WebSocket from 'ws';
export declare const wsServer: WebSocket.Server<typeof WebSocket, typeof import("http").IncomingMessage>;
export declare function webSocket(path_uri: string): WebSocket;
export default wsServer;
//# sourceMappingURL=ws.service.d.ts.map