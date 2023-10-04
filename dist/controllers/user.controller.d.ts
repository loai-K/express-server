import { Request, Response, NextFunction } from 'express';
declare function getMany(req: Request, res: Response, next: NextFunction): Promise<void>;
declare function getOne(req: Request, res: Response, next: NextFunction): Promise<void>;
declare function createUser(req: Request, res: Response, next: NextFunction): Promise<void>;
declare function updateUser(req: Request, res: Response, next: NextFunction): Promise<void>;
declare function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void>;
declare const _default: {
    getMany: typeof getMany;
    getOne: typeof getOne;
    createUser: typeof createUser;
    updateUser: typeof updateUser;
    deleteUser: typeof deleteUser;
};
export default _default;
//# sourceMappingURL=user.controller.d.ts.map