"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_middleware_1 = __importDefault(require("../../middlewares/api.middleware"));
const v1_1 = __importDefault(require("./v1"));
const v2_1 = __importDefault(require("./v2"));
const router = (0, express_1.Router)({
    mergeParams: true,
});
router.use('/', v1_1.default);
router.use('/v1', (0, api_middleware_1.default)('v1'), v1_1.default);
router.use('/v2', (0, api_middleware_1.default)('v2'), v2_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map