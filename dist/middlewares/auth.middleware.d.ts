import { Response, NextFunction } from 'express';
import { AppRequest } from 'interfaces';
declare function AuthMiddleware(req: AppRequest, _res: Response, next: NextFunction): void;
export default AuthMiddleware;
//# sourceMappingURL=auth.middleware.d.ts.map