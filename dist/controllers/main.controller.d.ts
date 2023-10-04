import { Request, Response } from 'express';
export declare function appData(): {
    health: boolean;
    name: string;
    version: string;
    description: string;
    keywords: string[];
    author: {
        name: string;
        bio: string;
        url: string;
    };
};
export declare function mainData(_req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=main.controller.d.ts.map