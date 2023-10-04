"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../../../controllers/auth.controller"));
const auth_middleware_1 = __importDefault(require("../../../middlewares/auth.middleware"));
const router = (0, express_1.Router)({
    mergeParams: true,
});
router.get('/', auth_middleware_1.default, auth_controller_1.default.authUser);
router.post('/login', auth_controller_1.default.login);
router.post('/register', auth_controller_1.default.register);
router.post('/logout', auth_middleware_1.default, auth_controller_1.default.logout);
router.post('/token', auth_middleware_1.default, auth_controller_1.default.refreshToken);
router.post('/reset', auth_controller_1.default.resetPassword);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map