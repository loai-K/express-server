"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbClient = exports.dbQuery = void 0;
const pg_1 = require("pg");
const dotenvConfig_1 = __importDefault(require("../config/dotenvConfig"));
const dbConfig = {
    host: dotenvConfig_1.default.database.host,
    port: dotenvConfig_1.default.database.port,
    database: dotenvConfig_1.default.database.name,
    user: dotenvConfig_1.default.database.user,
    password: dotenvConfig_1.default.database.password,
    connectionTimeoutMillis: 2000,
    idleTimeoutMillis: 1000,
    max: 4,
    allowExitOnIdle: true,
};
const db = new pg_1.Pool(dbConfig);
db.on('error', (error) => {
    console.log(error.message);
});
const dbQuery = async (query, params) => {
    const client = await db.connect();
    const { rows } = await client.query(query, params).then();
    client.release();
    return rows;
};
exports.dbQuery = dbQuery;
const dbClient = async (query, params) => {
    const client = new pg_1.Client(dbConfig);
    await client.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(query, params).then();
        await client.query('COMMIT');
        return result.rows;
    }
    catch (error) {
        await client.query('ROLLBACK');
    }
    finally {
        await client.end();
    }
};
exports.dbClient = dbClient;
exports.default = db;
//# sourceMappingURL=index.js.map