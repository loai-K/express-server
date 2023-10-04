"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lifecycle = void 0;
const app_info_1 = __importDefault(require("./helpers/app.info"));
let running = true;
const closeListeners = [];
exports.lifecycle = {
    isOpen: () => running,
    on: (_, listener) => closeListeners.push(listener),
    close: async () => {
        if (running) {
            running = false;
            await Promise.all(closeListeners.map((listener) => listener()));
        }
    },
    delay: async (ms, timer) => {
        let remaining = ms;
        while (running && remaining > 0) {
            const step = Math.min(remaining, 200);
            await timer(step);
            remaining -= step;
        }
    },
    init: async () => {
        if (running) {
            await (0, app_info_1.default)();
            console.log('running', running);
        }
    },
};
exports.default = exports.lifecycle;
//# sourceMappingURL=bootstrap.js.map