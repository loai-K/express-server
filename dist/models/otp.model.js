"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("./Model"));
const database_1 = require("../database");
class OtpModel extends Model_1.default {
    generateOTP() {
        const digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }
    get getExpirationDate() {
        return new Date(Date.now() + 5 * 60000);
    }
    cast(dbObject) {
        return {
            id: dbObject.id,
            userId: dbObject.user_id,
            otpType: dbObject.otp_type,
            otpCode: dbObject.otp_code,
            expiration: dbObject.expiration,
        };
    }
    validateExpiration(data) {
        return new Date(data) < new Date();
    }
    async findOne(otp) {
        try {
            const sqlQuery = 'SELECT id, user_id, otp_type, otp_code, expiration FROM otp WHERE user_id=$1 AND otp_code=$2 ORDER BY id DESC LIMIT 1;';
            const result = await (0, database_1.dbQuery)(sqlQuery, [otp.userId, otp.otpCode]);
            if (result.length > 0) {
                return this.cast(result[0]);
            }
            return null;
        }
        catch (error) {
            throw new Error(`Error at retrieving users: ${error.message}`);
        }
    }
    async createOne(otp) {
        try {
            const sqlQuery = `INSERT INTO otp (user_id, otp_type, otp_code, expiration) 
				values ($1, $2, $3, $4) 
				returning *;`;
            const result = await (0, database_1.dbQuery)(sqlQuery, [
                otp.userId,
                otp.otpType,
                otp.otpCode,
                this.getExpirationDate,
            ]);
            return this.cast(result[0]);
        }
        catch (error) {
            throw new Error(`Error at retrieving users: ${error.message}`);
        }
    }
    async check(otp_code) {
        try {
            const sqlQuery = 'SELECT * FROM otp WHERE otp_code=($1) ORDER BY id DESC LIMIT 1;';
            const result = await (0, database_1.dbQuery)(sqlQuery, [otp_code]);
            if (result.length === 0)
                return false;
            else {
                if (!this.validateExpiration(result[0].expiration)) {
                    return false;
                }
                return true;
            }
        }
        catch (error) {
            throw new Error(`Error at retrieving users: ${error.message}`);
        }
    }
}
exports.default = OtpModel;
//# sourceMappingURL=otp.model.js.map