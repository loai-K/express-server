import { Request } from 'express';
export interface AppRequest extends Request {
    user?: {
        id?: string;
        role?: string;
    };
    locale?: string;
}
export default AppRequest;
//# sourceMappingURL=appRequest.d.ts.map