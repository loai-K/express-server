import Model from './Model';
import { User, payloadType } from '../types';
declare class UserModel extends Model {
    hashPassword(password: string): string;
    generateAccessToken(payload: payloadType): string;
    refreshAccessToken(payload: payloadType): string;
    findAll(page?: number, perPage?: number): Promise<User[]>;
    find(id: string): Promise<User>;
    create(user: User): Promise<User>;
    update(user: User, id: string): Promise<User>;
    delete(id: string): Promise<User>;
    authenticate(email: string, password: string): Promise<User | null>;
}
export default UserModel;
//# sourceMappingURL=user.model.d.ts.map