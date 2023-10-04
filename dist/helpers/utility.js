"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppPath = exports.hashString = void 0;
const crypto_1 = __importDefault(require("crypto"));
const promises_1 = require("node:fs/promises");
const hashString = (text) => {
    crypto_1.default.createHash('md5').update(text).digest('hex');
};
exports.hashString = hashString;
async function getAppPath() {
    return await (0, promises_1.realpath)('./');
}
exports.getAppPath = getAppPath;
//# sourceMappingURL=utility.js.map