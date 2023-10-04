"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('TEST: Server API Versions', () => {
    it('Test Server API v1 | should Return server info health', async () => {
        const response = await request.get('/api/v1');
        expect(response.status).toBe(200);
        expect(response.body.data.health).toBeTrue();
        expect(response.body.data.api).toEqual('v1');
        expect(response.get('api-version')).toEqual('v1');
    });
    it('Test Server API v2 | should Return server info health', async () => {
        const response = await request.get('/api/v2');
        expect(response.status).toBe(200);
        expect(response.body.data.health).toBeTrue();
        expect(response.body.data.api).toEqual('v2');
        expect(response.get('api-version')).toEqual('v2');
    });
});
//# sourceMappingURL=apiSpec.js.map