"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const userModel = new user_model_1.default();
async function getMany(req, res, next) {
    const { page, per_page } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const recordsInPage = parseInt(per_page, 10) || 10;
    try {
        const users = await userModel.findAll(pageNumber, recordsInPage);
        res.json({
            status: 'success',
            message: 'users retrieved successfully',
            data: users,
        });
    }
    catch (error) {
        next(error);
    }
}
async function getOne(req, res, next) {
    try {
        const user = await userModel.find(req.params.id);
        res.json({
            status: 'success',
            message: 'User find successfully',
            data: { ...user },
        });
    }
    catch (error) {
        next(error);
    }
}
async function createUser(req, res, next) {
    try {
        const user = await userModel.create(req.body);
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: { ...user },
        });
    }
    catch (error) {
        next(error);
    }
}
async function updateUser(req, res, next) {
    try {
        const user = await userModel.update(req.body, req.params.id);
        res.json({
            status: 'success',
            message: 'User updated successfully',
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
}
async function deleteUser(req, res, next) {
    try {
        const user = await userModel.delete(req.params.id);
        res.json({
            status: 'success',
            message: 'User deleted successfully',
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
}
exports.default = {
    getMany,
    getOne,
    createUser,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=user.controller.js.map