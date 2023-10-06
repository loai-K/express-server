/// <reference types="node" />
/// <reference types="ws" />
import { Server as HTTPServer } from 'http';
export default function webSocket(appServer: HTTPServer): import("ws").Server<typeof import("ws"), typeof import("http").IncomingMessage>;
//# sourceMappingURL=index.d.ts.map