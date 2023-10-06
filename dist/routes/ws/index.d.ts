/// <reference types="node" />
import { Server as appServer } from 'http';
import { Server } from 'ws';
export default function webSocket(appServer: appServer): Server<typeof import("ws"), typeof import("http").IncomingMessage>;
//# sourceMappingURL=index.d.ts.map