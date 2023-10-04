import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
export interface AppRequest extends Request {
    user?: {
        id?: string;
        role?: string;
    } | JwtPayload;
    locale?: string;
}
export default AppRequest;
//# sourceMappingURL=request.interface.d.ts.map