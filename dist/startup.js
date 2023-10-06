"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./helpers/logger"));
const database_1 = __importDefault(require("./database"));
require("../api/fixtures");
const handleProcessEvents = () => {
    try {
        process.on('exit', async () => {
            if (database_1.default && database_1.default.totalCount > 0) {
                database_1.default.removeAllListeners();
            }
        });
        process.on('uncaughtException', (error) => {
            logger_1.default.error(error);
        });
        process.on('uncaughtException', async (error) => {
            logger_1.default.error(error);
        });
        process.on('unhandledRejection', async (error) => {
            logger_1.default.error(error);
        });
    }
    catch (exception) {
        throw new Error(`[startup.handleProcessEvents] ${exception.message || exception}`);
    }
};
const startup = async (options, { resolve, reject }) => {
    try {
        handleProcessEvents();
        resolve();
    }
    catch (exception) {
        reject(`[startup] ${exception.message}`);
    }
};
exports.default = (options) => new Promise((resolve, reject) => {
    startup(options, { resolve, reject }).then();
});
//# sourceMappingURL=startup.js.map