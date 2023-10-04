import { Request, Response, NextFunction } from 'express';
declare function ApiMiddleware(api_version?: string): (_request: Request, response: Response, next: NextFunction) => void;
export default ApiMiddleware;
//# sourceMappingURL=api.middleware.d.ts.map