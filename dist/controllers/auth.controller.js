"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const user_model_1 = __importDefault(require("../models/user.model"));
const dotenvConfig_1 = __importDefault(require("../config/dotenvConfig"));
const userModel = new user_model_1.default();
const handleInputError = (next) => {
    const error = new Error('Input Error, Please login again');
    error.code = 422;
    next(error);
};
async function authUser(req, res, next) {
    try {
        if (req.user?.id && validator_1.default.isUUID(req.user?.id, 4)) {
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
async function register(req, res, next) {
    try {
        const data = req.body;
        if (dotenvConfig_1.default.isProduction) {
            data.user_name = validator_1.default.isAlphanumeric(req.body.user_name)
                ? req.body.user_name
                : null;
            data.first_name = validator_1.default.isAlpha(req.body.first_name)
                ? req.body.first_name
                : null;
            data.last_name = validator_1.default.isAlpha(req.body.last_name)
                ? req.body.last_name
                : null;
            data.email = validator_1.default.isEmail(req.body.email) ? req.body.email : null;
            data.mobile = validator_1.default.isNumeric(req.body.mobile) ? req.body.mobile : null;
            data.password = validator_1.default.isStrongPassword(req.body.user_name)
                ? req.body.user_name
                : null;
        }
        if (!data.user_name || !data.email || !data.password)
            return handleInputError(next);
        const user = await userModel.create(data);
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
async function login(req, res, next) {
    try {
        let { email, password } = req.body;
        if (dotenvConfig_1.default.isProduction) {
            email = validator_1.default.isEmail(req.body.email || '') ? req.body.email : null;
            password = validator_1.default.isStrongPassword(req.body.password || '')
                ? req.body.password
                : null;
        }
        if (!email || !password)
            return handleInputError(next);
        const user = await userModel.authenticate(email, password);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'your credentials are invalid, please try again',
            });
        }
        const token = userModel.generateAccessToken({
            user: user.id,
            type: 'user',
        });
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