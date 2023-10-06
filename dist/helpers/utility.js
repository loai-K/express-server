"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringPrototypes = exports.checkProperties = exports.getAppPath = exports.hashString = void 0;
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
function checkProperties(obj) {
    let key;
    for (key in obj) {
        if (obj[key] !== null && obj[key] != '')
            return false;
    }
    return true;
}
exports.checkProperties = checkProperties;
exports.stringPrototypes = {
    slugify(separator = '-') {
        return this.toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .trim()
            .replace(/--+/g, separator);
    },
};
//# sourceMappingURL=utility.js.map