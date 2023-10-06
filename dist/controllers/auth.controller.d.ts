import { Request, Response, NextFunction } from 'express';
import AppRequest from '../interfaces/appRequest';
declare function authUser(req: AppRequest, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
declare function register(req: Request, res: Response, next: NextFunction): Promise<void>;
declare function login(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
declare function logout(req: Request, res: Response, next: NextFunction): Promise<void>;
declare function resetPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
declare function refreshToken(req: Request, res: Response, next: NextFunction): Promise<void>;
declare const _default: {
    authUser: typeof authUser;
    login: typeof login;
    logout: typeof logout;
    resetPassword: typeof resetPassword;
    register: typeof register;
    refreshToken: typeof refreshToken;
};
export default _default;
//# sourceMappingURL=auth.controller.d.ts.map