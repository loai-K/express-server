"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const version_routes_1 = __importDefault(require("./version.routes"));
const test_routes_1 = __importDefault(require("./test.routes"));
const router = (0, express_1.Router)();
router.get('/', version_routes_1.default);
router.use('/test', test_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map