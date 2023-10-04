"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../../controllers/user.controller"));
const auth_middleware_1 = __importDefault(require("../../../middlewares/auth.middleware"));
const router = (0, express_1.Router)({
    mergeParams: true,
});
router
    .route('/')
    .get(auth_middleware_1.default, user_controller_1.default.getMany)
    .post(auth_middleware_1.default, user_controller_1.default.createUser)
    .options();
router
    .route('/:id')
    .get(auth_middleware_1.default, user_controller_1.default.getOne)
    .put(auth_middleware_1.default, user_controller_1.default.updateUser)
    .patch(auth_middleware_1.default, user_controller_1.default.updateUser)
    .delete(auth_middleware_1.default, user_controller_1.default.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map