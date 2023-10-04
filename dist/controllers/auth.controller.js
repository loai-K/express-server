"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const userModel = new user_model_1.default();
async function authUser(req, res, next) {
    try {
        if (req.user) {
            const user = await userModel.find(req.user.id);
            return res.json({
                status: 'success',
                message: 'authenticated user',
                data: user,
            });
        }
    }
    catch (error) {
        return next(error);
    }
}
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await userModel.authenticate(email, password);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'your credentials are invalid, please try again',
            });
        }
        const token = userModel.generateAccessToken(user.id);
        const oneDay = 1000 * 60 * 60 * 24;
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            signed: true,
            expires: new Date(Date.now() + oneDay),
        });
        return res.json({
            status: 'success',
            message: 'authenticated successful',
            data: { ...user, token },
        });
    }
    catch (error) {
        return next(error);
    }
}
async function logout(req, res, next) {
    try {
        res.cookie('access_token', null).clearCookie('access_token');
    }
    catch (error) {
        return next(error);
    }
}
async function resetPassword(req, res, next) {
    try {
    }
    catch (error) {
        return next(error);
    }
}
async function register(req, res, next) {
    try {
        const user = await userModel.create(req.body);
        res.json({
            status: 'success',
            message: 'User created successfully',
            data: { ...user },
        });
    }
    catch (error) {
        return next(error);
    }
}
async function refreshToken(req, res, next) {
    try {
    }
    catch (error) {
        return next(error);
    }
}
exports.default = {
    authUser,
    login,
    logout,
    resetPassword,
    register,
    refreshToken,
};
//# sourceMappingURL=auth.controller.js.map