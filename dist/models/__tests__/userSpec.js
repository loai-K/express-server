"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const user_model_1 = __importDefault(require("../user.model"));
const userModel = new user_model_1.default();
describe('TEST: User Model', () => {
    describe('Test methods exists', () => {
        it('should have a Get Many Users method', () => {
            expect(userModel.findAll).toBeDefined();
        });
        it('should have a Get One User method', () => {
            expect(userModel.find).toBeDefined();
        });
        it('should have a Create User method', () => {
            expect(userModel.create).toBeDefined();
        });
        it('should have a Update User method', () => {
            expect(userModel.update).toBeDefined();
        });
        it('should have a Delete User method', () => {
            expect(userModel.delete).toBeDefined();
        });
    });
    describe('Test User Model Logic', () => {
        const user = {
            user_name: 'testuser',
            first_name: 'test',
            last_name: 'Any',
            email: 'user@test.test',
            mobile: '1234',
            password: 'secret',
        };
        beforeAll(async () => {
            const createdUser = await userModel.create(user);
            user.id = createdUser.id;
        });
        afterAll(async () => {
            const connection = await database_1.default.connect();
            const sql = 'DELETE FROM users;';
            await connection.query(sql);
            connection.release();
        });
        it('Create method should return a created user', async () => {
            const createdUser = await userModel.create({
                user_name: 'user_test',
                first_name: 'User',
                last_name: 'Test',
                email: 'user_test@test.test',
                mobile: '12345',
                password: 'secret',
            });
            expect(createdUser).toEqual({
                id: createdUser.id,
                user_name: 'user_test',
                first_name: 'User',
                last_name: 'Test',
                email: 'user_test@test.test',
                mobile: '12345',
            });
        });
        it('Get Many Method should return all available users in DB', async () => {
            const users = await userModel.findAll();
            expect(users.length).toBe(2);
        });
        it('Get One Method should return user by ID', async () => {
            const returnedUser = await userModel.find(user.id);
            expect(returnedUser.id).toBe(user.id);
            expect(returnedUser.email).toBe(user.email);
            expect(returnedUser.user_name).toBe(user.user_name);
            expect(returnedUser.first_name).toBe(user.first_name);
            expect(returnedUser.last_name).toBe(user.last_name);
            expect(returnedUser.mobile).toBe(user.mobile);
        });
        it('Update Method should return updated user with edited properties', async () => {
            const updatedUser = await userModel.update({
                ...user,
                user_name: 'testuser_update',
                first_name: 'test_update',
                last_name: 'Any_update',
            }, user.id);
            expect(updatedUser.id).toBe(user.id);
            expect(updatedUser.email).toBe(user.email);
            expect(updatedUser.user_name).toBe('testuser_update');
            expect(updatedUser.first_name).toBe('test_update');
            expect(updatedUser.last_name).toBe('Any_update');
        });
        it('Delete Method should delete user from db', async () => {
            const deletedUser = await userModel.delete(user.id);
            expect(deletedUser.id).toBe(user.id);
        });
    });
});
//# sourceMappingURL=userSpec.js.map