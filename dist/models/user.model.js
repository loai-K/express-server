"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../database");
const dotenvConfig_1 = __importDefault(require("../config/dotenvConfig"));
const Model_1 = __importDefault(require("./Model"));
class UserModel extends Model_1.default {
    hashPassword(password) {
        return bcrypt_1.default.hashSync(`${password}${dotenvConfig_1.default.bcryptHash}`, dotenvConfig_1.default.saltRounds);
    }
    generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, dotenvConfig_1.default.tokenSecret, {
            expiresIn: dotenvConfig_1.default.tokenExpires,
            issuer: dotenvConfig_1.default.name,
            subject: 'authToken',
            algorithm: 'HS256',
        });
    }
    refreshAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, dotenvConfig_1.default.tokenSecretRefresh, {
            expiresIn: dotenvConfig_1.default.tokenExpires,
            issuer: dotenvConfig_1.default.name,
            subject: 'refreshToken',
            algorithm: 'HS256',
        });
    }
    async findAll(page = 1, perPage = 10) {
        try {
            const sqlQuery = `SELECT id, user_name, first_name, last_name, bio, email, mobile, status, last_login, registered_at FROM users ORDER BY id OFFSET ${(page - 1) * perPage} ROWS FETCH NEXT ${perPage} ROWS ONLY`;
            return await (0, database_1.dbQuery)(sqlQuery);
        }
        catch (error) {
            throw new Error(`Error at retrieving users: ${error.message}`);
        }
    }
    async find(id) {
        try {
            const sqlQuery = 'SELECT id, user_name, first_name, last_name, bio, email, mobile, status, last_login, registered_at FROM users WHERE id=$1 ORDER BY id LIMIT 1;';
            const result = await (0, database_1.dbQuery)(sqlQuery, [id]);
            return result[0];
        }
        catch (error) {
            throw new Error(`could not find user (${id}): ${error.message}`);
        }
    }
    async create(user) {
        try {
            const sqlQuery = `INSERT INTO users (first_name, last_name, user_name, email, mobile, password) 
				values ($1, $2, $3, $4, $5, $6) 
				returning id, user_name, first_name, last_name, email, mobile`;
            const result = await (0, database_1.dbQuery)(sqlQuery, [
                user.first_name,
                user.last_name || '',
                user.user_name,
                user.email,
                user.mobile || '',
                this.hashPassword(user.password),
            ]);
            return result[0];
        }
        catch (error) {
            throw new Error(`Unable to create (${user.user_name}): ${error.message}`);
        }
    }
    async update(user, id) {
        try {
            const sqlQuery = `UPDATE users SET first_name=$1, last_name=$2, user_name=$3, email=$4, mobile=$5, password=$6 
				WHERE id=($7) returning id, user_name, first_name, last_name, bio, email, mobile, status, last_login, registered_at`;
            const result = await (0, database_1.dbQuery)(sqlQuery, [
                user.first_name,
                user.last_name || '',
                user.user_name,
                user.email,
                user.mobile || '',
                this.hashPassword(user.password),
                id,
            ]);
            return result[0];
        }
        catch (error) {
            throw new Error(`Unable to update (${user.user_name}): ${error.message}`);
        }
    }
    async delete(id) {
        try {
            const sqlQuery = `DELETE FROM users WHERE id=($1) 
				returning id, user_name, first_name, last_name, bio, email, mobile, status, last_login, registered_at`;
            const result = await (0, database_1.dbQuery)(sqlQuery, [id]);
            return result[0];
        }
        catch (error) {
            throw new Error(`Unable to delete user (${id}): ${error.message}`);
        }
    }
    async authenticate(email, password) {
        try {
            const sqlQuery = 'SELECT password FROM users WHERE email=$1';
            const result = await (0, database_1.dbQuery)(sqlQuery, [email]);
            if (result.length > 0) {
                const { password: hashPassword } = result[0];
                const isPasswordValid = bcrypt_1.default.compareSync(`${password}${dotenvConfig_1.default.bcryptHash}`, hashPassword);
                if (isPasswordValid) {
                    const userInfo = await (0, database_1.dbQuery)('SELECT id, user_name, first_name, last_name, bio, email, mobile, status, last_login, registered_at FROM users WHERE email=($1) LIMIT 1', [email]);
                    return userInfo[0];
                }
            }
            return null;
        }
        catch (error) {
            throw new Error(`Unable to login: ${error.message}`);
        }
    }
}
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map