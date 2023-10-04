"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.generateOtp = exports.generateRandomPassword = exports.extractToken = exports.validateForgotPasswordJWT = exports.validateToken = exports.generateForgotPasswordJWT = exports.generateJWT = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const otp_model_1 = __importDefault(require("../models/otp.model"));
const dotenvConfig_1 = __importDefault(require("../config/dotenvConfig"));
const generateJWT = function (payload = {}, options = {}) {
    const privateKey = dotenvConfig_1.default.tokenSecret;
    const defaultOptions = {
        expiresIn: '1h',
    };
    return jwt.sign(payload, privateKey, Object.assign(defaultOptions, options));
};
exports.generateJWT = generateJWT;
const generateForgotPasswordJWT = function (password, payload = {}, options = {}) {
    const privateKey = dotenvConfig_1.default.tokenSecret + password;
    const defaultOptions = {
        expiresIn: '1h',
    };
    return jwt.sign(payload, privateKey, Object.assign(defaultOptions, options));
};
exports.generateForgotPasswordJWT = generateForgotPasswordJWT;
const validateToken = function (token) {
    try {
        const publicKey = dotenvConfig_1.default.tokenSecret;
        return jwt.verify(token, publicKey);
    }
    catch (e) {
        throw new Error('Invalid token');
    }
};
exports.validateToken = validateToken;
const validateForgotPasswordJWT = function (password, token) {
    try {
        const publicKey = dotenvConfig_1.default.tokenSecret + password;
        return jwt.verify(token, publicKey);
    }
    catch (e) {
        throw new Error('Password reset link was expired');
    }
};
exports.validateForgotPasswordJWT = validateForgotPasswordJWT;
const extractToken = function (token) {
    if (token?.startsWith('Bearer ')) {
        return token.slice(7, token.length);
    }
    return null;
};
exports.extractToken = extractToken;
const generateRandomPassword = function (len) {
    const randomString = 'abcdefghijklmnopqrstuvwxyzBCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let index = 0; index < len; index++) {
        password += randomString[Math.ceil(Math.random() * (randomString.length - 1))];
    }
    return password;
};
exports.generateRandomPassword = generateRandomPassword;
const generateOtp = function (len) {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < len; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};
exports.generateOtp = generateOtp;
const verifyOtp = async function (otp) {
    const otpModel = new otp_model_1.default();
    const existOtp = await otpModel.findOne(otp);
    const currentDate = new Date();
    if (!existOtp)
        return null;
    if (existOtp.expiration &&
        new Date(new Date(existOtp.expiration).getTime() - 5 * 60000) < currentDate) {
        return null;
    }
    return existOtp.id;
};
exports.verifyOtp = verifyOtp;
//# sourceMappingURL=jwt.js.map