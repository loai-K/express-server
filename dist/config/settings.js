"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const settings = JSON.parse(process.env.APP_SETTINGS ||
    fs_1.default.readFileSync(`settings-${process.env.NODE_ENV}.json`, 'utf-8') ||
    '{}');
exports.default = settings;
//# sourceMappingURL=settings.js.map