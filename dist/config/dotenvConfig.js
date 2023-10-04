"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
require("dotenv/config");
exports.appConfig = {
    name: process.env.NAME || 'Application',
    port: parseInt(process.env.PORT, 10) || 3000,
    path: process.env.PATH || 'http://localhost',
    environment: process.env.NODE_ENV || 'production',
    cookieSecret: process.env.COOKIE_SECRET,
    bcryptHash: process.env.BCRYPT_HASH,
    saltRounds: parseInt(process.env.SALT_ROUNDS, 10) || 10,
    tokenSecret: process.env.TOKEN_SECRET,
    tokenSecretRefresh: process.env.TOKEN_SECRET_REFRESH,
    tokenExpires: process.env.ACCESS_TOKEN_EXPIRES,
    database: {
        host: process.env.PG_HOST,
        port: parseInt(process.env.PG_PORT, 10) || 5432,
        name: process.env.PG_DATABASE,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
    },
    email: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
        from: process.env.EMAIL_FROM,
        name: process.env.EMAIL_FROM_NAME,
    },
};
exports.default = exports.appConfig;
//# sourceMappingURL=dotenvConfig.js.map