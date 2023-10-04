import Model from './Model';
import { IOtp, IOtpDB } from '../interfaces/otp.interface';
declare class OtpModel extends Model {
    generateOTP(): string;
    get getExpirationDate(): Date;
    cast(dbObject: IOtpDB): IOtp;
    validateExpiration(data: Date): boolean;
    findOne(otp: IOtp): Promise<IOtp | null>;
    createOne(otp: IOtp): Promise<IOtp>;
    check(otp_code: string): Promise<boolean>;
}
export default OtpModel;
//# sourceMappingURL=otp.model.d.ts.map