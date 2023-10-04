import { OtpType } from '../helpers/enums';
export interface IOtp {
    id?: number;
    userId: string;
    otpType: OtpType;
    otpCode: string;
    expiration?: Date | null;
}
export interface IOtpDB {
    id: number;
    user_id: string;
    otp_type: OtpType;
    otp_code: string;
    expiration: Date | null;
}
export default IOtp;
//# sourceMappingURL=otp.interface.d.ts.map