"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('TEST: Server Running', () => {
    it('should return Response with status 200', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    });
    it('should return Response with status 404', async () => {
        const response = await request.get('/undefined-route');
        expect(response.status).toBe(404);
    });
    it('should return Response and have some headers', async () => {
        const response = await request.get('/api');
        expect(response.get('x-powered-by')).toBeUndefined();
        expect(response.get('Content-Security-Policy')).toBeDefined();
        expect(response.get('Content-Type')).toBe('application/json; charset=utf-8');
    });
});
//# sourceMappingURL=indexSpec.js.map