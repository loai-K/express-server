"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const database_1 = __importDefault(require("../../database"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const userModel = new user_model_1.default();
const request = (0, supertest_1.default)(index_1.default);
let token = '';
describe('TEST: User API Endpoints', () => {
    const user = {
        user_name: 'test_user',
        first_name: 'Test',
        last_name: 'User',
        email: 'user@example.test',
        mobile: '1234000',
        password: 'secret',
    };
    beforeAll(async (done) => {
        const createdUser = await userModel.create(user);
        user.id = createdUser.id;
        done();
    });
    afterAll(async () => {
        const connection = await database_1.default.connect();
        const sql = 'DELETE FROM users;';
        await connection.query(sql);
        connection.release();
    });
    describe('Test Authenticate methods', () => {
        it('should be able to authenticate to get token', async () => {
            const res = await request
                .post('/api/v1/auth/login')
                .set('Content-type', 'application/json')
                .send({
                email: 'user@example.test',
                password: 'secret',
            });
            expect(res.status).toBe(200);
            const { id, email, token: userToken } = res.body.data;
            expect(id).toBe(user.id);
            expect(email).toBe(user.email);
            token = userToken;
        });
        it('should be failed to authenticate with wrong email', async () => {
            const res = await request
                .post('/api/v1/auth/login')
                .set('Content-type', 'application/json')
                .send({
                email: 'user@example.test',
                password: 'test123',
            });
            expect(res.status).toBe(401);
        });
    });
    describe('Test CRUD API methods', () => {
        it('should create new user', async () => {
            const res = await request
                .post('/api/v1/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                user_name: 'testUser2',
                first_name: 'Test2',
                last_name: 'User2',
                email: 'test2@test2.com',
                mobile: '33333',
                password: 'test123',
            });
            expect(res.status).toEqual(201);
            const { email, user_name, first_name, last_name } = res.body.data;
            expect(email).toBe('test2@test2.com');
            expect(user_name).toBe('testUser2');
            expect(first_name).toBe('Test2');
            expect(last_name).toBe('User2');
        });
        it('should get list of users', async () => {
            const res = await request
                .get('/api/v1/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(200);
            expect(res.body.data.length).toBeGreaterThanOrEqual(2);
        });
        it('should get user info', async () => {
            const res = await request
                .get(`/api/v1/users/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(200);
            const { email, user_name, first_name, last_name } = res.body.data;
            expect(user_name).toBe(user.user_name);
            expect(email).toBe(user.email);
            expect(first_name).toBe(user.first_name);
            expect(last_name).toBe(user.last_name);
        });
        it('should update user info', async () => {
            const res = await request
                .put(`/api/v1/users/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                ...user,
                user_name: 'demo',
                first_name: 'express',
                last_name: 'node',
            });
            expect(res.status).toEqual(200);
            const { id, email, user_name, first_name, last_name } = res.body.data;
            expect(id).toBe(user.id);
            expect(email).toBe(user.email);
            expect(user_name).toBe('demo');
            expect(first_name).toBe('express');
            expect(last_name).toBe('node');
        });
        it('should delete user', async () => {
            const res = await request
                .delete(`/api/v1/users/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(200);
            expect(res.body.data.id).toBe(user.id);
            expect(res.body.data.user_name).toBe('demo');
        });
    });
});
//# sourceMappingURL=api.users.pec.js.map