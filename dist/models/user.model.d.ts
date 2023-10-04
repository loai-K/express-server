import Model from './Model';
import User from '../types/user.type';
declare class UserModel extends Model {
    hashPassword(password: string): string;
    generateAccessToken(userId: string): string;
    refreshAccessToken(userId: string): string;
    findAll(page?: number, perPage?: number): Promise<User[]>;
    find(id: string): Promise<User>;
    create(user: User): Promise<User>;
    update(user: User, id: string): Promise<User>;
    delete(id: string): Promise<User>;
    authenticate(email: string, password: string): Promise<User | null>;
}
export default UserModel;
//# sourceMappingURL=user.model.d.ts.map