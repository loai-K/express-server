import { Response } from '../types';
declare const jsonAll: <Res>(res: any, status: number, data: Res | Res[], meta: object) => Response<Res>;
declare const jsonOne: <Res>(res: any, status: number, data: Res) => Res;
export { jsonAll, jsonOne };
//# sourceMappingURL=general.d.ts.map