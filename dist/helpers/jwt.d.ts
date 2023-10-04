import * as jwt from 'jsonwebtoken';
import { IOtp } from '../interfaces';
declare const generateJWT: (payload?: object, options?: object) => string;
declare const generateForgotPasswordJWT: (password: string, payload?: object, options?: object) => string;
declare const validateToken: (token: string) => string | jwt.JwtPayload;
declare const validateForgotPasswordJWT: (password: string, token: string) => string | jwt.JwtPayload;
declare const extractToken: (token: string) => string | null;
declare const generateRandomPassword: (len: number) => string;
declare const generateOtp: (len: number) => string;
declare const verifyOtp: (otp: IOtp) => Promise<any>;
export { generateJWT, generateForgotPasswordJWT, validateToken, validateForgotPasswordJWT, extractToken, generateRandomPassword, generateOtp, verifyOtp, };
//# sourceMappingURL=jwt.d.ts.map