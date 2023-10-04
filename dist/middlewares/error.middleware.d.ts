import { Request, Response, NextFunction } from 'express';
import Error from '../interfaces/error.interface';
declare const errorMiddleware: (error: Error, _request: Request, response: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export default errorMiddleware;
//# sourceMappingURL=error.middleware.d.ts.map