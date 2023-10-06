"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const logger_1 = __importDefault(require("./logger"));
exports.default = (callback = null) => {
    const cpus = os_1.default.cpus().length;
    if (cluster_1.default.isMaster) {
        for (let i = 0; i < cpus; i++) {
            const worker = cluster_1.default.fork();
            worker.on('message', (message) => {
                if (process.send) {
                    process.send(message);
                }
            });
            process.on('message', (message) => {
                worker.send(message);
            });
        }
        cluster_1.default.on('exit', (worker) => {
            logger_1.default.error(`Worker ${worker.process.pid} died.`);
        });
    }
    else {
        callback();
    }
};
//# sourceMappingURL=cluster.js.map