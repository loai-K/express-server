"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const logger_middleware_1 = __importDefault(require("../middlewares/logger.middleware"));
const router = (0, express_1.Router)();
router.get('/', logger_middleware_1.default, controllers_1.mainData);
exports.default = router;
//# sourceMappingURL=main.routes.js.map